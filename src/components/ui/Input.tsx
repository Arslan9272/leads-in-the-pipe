import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  errorMessage?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, errorMessage, ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      aria-invalid={errorMessage ? 'true' : undefined}
      className={cn(
        'h-11 w-full rounded-full border border-border bg-bg-card px-5 text-sm text-text-primary placeholder:text-text-muted focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40',
        errorMessage && 'border-tier-bespoke focus-visible:border-tier-bespoke',
        className,
      )}
      {...rest}
    />
  );
});
