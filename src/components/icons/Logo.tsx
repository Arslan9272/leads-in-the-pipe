import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'mark';
}

function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('inline-block', className)}
    >
      <rect x="12" y="20" width="20" height="4" rx="2" fill="#FFFFFF" fillOpacity="0.4" />
      <rect x="12" y="30" width="30" height="4" rx="2" fill="#FFFFFF" fillOpacity="0.7" />
      <rect x="12" y="40" width="40" height="4" rx="2" fill="#9EFB9C" />
    </svg>
  );
}

export function Logo({ className, variant = 'full' }: LogoProps) {
  if (variant === 'mark') {
    return (
      <span
        role="img"
        aria-label="Leads In The Pipe"
        className={cn('inline-flex items-center', className)}
      >
        <Mark className="h-8 w-8" />
      </span>
    );
  }

  return (
    <span
      role="img"
      aria-label="Leads In The Pipe"
      className={cn('inline-flex items-center gap-2.5', className)}
    >
      <Mark className="h-7 w-7" />
      <span className="font-display text-xl font-semibold tracking-tight text-text-primary">
        Leads In The Pipe
      </span>
    </span>
  );
}
