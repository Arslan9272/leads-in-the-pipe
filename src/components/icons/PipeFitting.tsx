import { cn } from '@/lib/utils';

interface PipeFittingProps {
  className?: string;
}

export function PipeFitting({ className }: PipeFittingProps) {
  return (
    <svg
      viewBox="0 0 320 320"
      aria-hidden="true"
      className={cn('h-full w-full', className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="pf-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9EFB9C" />
          <stop offset="100%" stopColor="#7DD97B" />
        </linearGradient>
      </defs>

      <rect x="20" y="140" width="120" height="40" rx="6" stroke="url(#pf-grad)" strokeWidth="6" />
      <rect x="180" y="140" width="120" height="40" rx="6" stroke="url(#pf-grad)" strokeWidth="6" />
      <rect x="140" y="20" width="40" height="120" rx="6" stroke="url(#pf-grad)" strokeWidth="6" />
      <rect x="140" y="180" width="40" height="120" rx="6" stroke="url(#pf-grad)" strokeWidth="6" />

      <circle cx="160" cy="160" r="34" stroke="url(#pf-grad)" strokeWidth="6" fill="#0A0A0A" />
      <circle cx="160" cy="160" r="14" fill="#9EFB9C" />

      <g fill="#9EFB9C">
        <circle cx="60" cy="160" r="3" />
        <circle cx="80" cy="160" r="3" opacity="0.7" />
        <circle cx="240" cy="160" r="3" />
        <circle cx="260" cy="160" r="3" opacity="0.7" />
        <circle cx="160" cy="60" r="3" />
        <circle cx="160" cy="260" r="3" />
      </g>
    </svg>
  );
}
