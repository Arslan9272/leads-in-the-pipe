import { useCallback, useMemo, useState } from 'react';

import type { FormStatus } from '@/hooks/useFormspree';

const EMAIL_RE = /^.+@.+\..+$/;

export interface AuditFormValues {
  name: string;
  email: string;
  company: string;
  website: string;
  role: string;
  revenue: string;
  meetings: string;
  channels: string[];
  challenge: string;
}

export type AuditTextField = Exclude<keyof AuditFormValues, 'channels'>;

const INITIAL: AuditFormValues = {
  name: '',
  email: '',
  company: '',
  website: '',
  role: '',
  revenue: '',
  meetings: '',
  channels: [],
  challenge: '',
};

const REQUIRED: AuditTextField[] = ['name', 'email', 'company'];

export type AuditErrors = Partial<Record<AuditTextField, string>>;

interface UseAuditFormResult {
  values: AuditFormValues;
  errors: AuditErrors;
  status: FormStatus;
  isSubmitting: boolean;
  setField: (field: AuditTextField, value: string) => void;
  toggleChannel: (channel: string) => void;
  blurField: (field: AuditTextField) => void;
  submit: () => Promise<void>;
}

function validate(values: AuditFormValues): AuditErrors {
  const errors: AuditErrors = {};
  for (const field of REQUIRED) {
    if (!values[field].trim()) {
      errors[field] = 'This field is required.';
    }
  }
  if (values.email.trim() && !EMAIL_RE.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }
  return errors;
}

export function useAuditForm(): UseAuditFormResult {
  const [values, setValues] = useState<AuditFormValues>(INITIAL);
  const [touched, setTouched] = useState<Partial<Record<AuditTextField, boolean>>>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [showAll, setShowAll] = useState(false);

  const allErrors = useMemo(() => validate(values), [values]);

  const errors = useMemo<AuditErrors>(() => {
    const visible: AuditErrors = {};
    for (const key of Object.keys(allErrors) as AuditTextField[]) {
      if (showAll || touched[key]) visible[key] = allErrors[key];
    }
    return visible;
  }, [allErrors, touched, showAll]);

  const setField = useCallback((field: AuditTextField, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
  }, []);

  const toggleChannel = useCallback((channel: string) => {
    setValues((v) => ({
      ...v,
      channels: v.channels.includes(channel)
        ? v.channels.filter((c) => c !== channel)
        : [...v.channels, channel],
    }));
  }, []);

  const blurField = useCallback((field: AuditTextField) => {
    setTouched((t) => ({ ...t, [field]: true }));
  }, []);

  const submit = useCallback(async () => {
    if (Object.keys(allErrors).length > 0) {
      setShowAll(true);
      return;
    }

    const apiBase = import.meta.env.VITE_API_BASE_URL;
    const formspree = import.meta.env.VITE_FORMSPREE_ENDPOINT;
    const endpoint = apiBase ? `${apiBase.replace(/\/$/, '')}/api/audit` : formspree;
    if (!endpoint) {
      setStatus('pending-setup');
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...values, source: 'pipeline-audit' }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus('success');
      setValues(INITIAL);
      setTouched({});
      setShowAll(false);
    } catch {
      setStatus('error');
    }
  }, [allErrors, values]);

  return {
    values,
    errors,
    status,
    isSubmitting: status === 'submitting',
    setField,
    toggleChannel,
    blurField,
    submit,
  };
}
