import { useCallback, useMemo, useState } from 'react';

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error' | 'pending-setup';

const EMAIL_RE = /^.+@.+\..+$/;

interface UseFormspreeResult {
  email: string;
  setEmail: (value: string) => void;
  isValid: boolean;
  isSubmitting: boolean;
  status: FormStatus;
  errorMessage: string | null;
  submit: () => Promise<void>;
  reset: () => void;
}

export function useFormspree(): UseFormspreeResult {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isValid = useMemo(() => EMAIL_RE.test(email.trim()), [email]);

  const reset = useCallback(() => {
    setStatus('idle');
    setErrorMessage(null);
  }, []);

  const submit = useCallback(async () => {
    if (!isValid) return;
    const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
    if (!endpoint) {
      setStatus('pending-setup');
      return;
    }

    setStatus('submitting');
    setErrorMessage(null);

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email: email.trim(), source: 'hero-form' }),
      });

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }

      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Submission failed');
    }
  }, [email, isValid]);

  return {
    email,
    setEmail,
    isValid,
    isSubmitting: status === 'submitting',
    status,
    errorMessage,
    submit,
    reset,
  };
}
