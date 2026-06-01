import { cn } from '@/lib/utils';
import type { ServiceIconName } from '@/data/services';

interface ServiceIconProps {
  name: ServiceIconName;
  className?: string;
}

const COMMON = {
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function ServiceIcon({ name, className }: ServiceIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className={cn('h-10 w-10 text-accent', className)}
      xmlns="http://www.w3.org/2000/svg"
      {...COMMON}
    >
      {renderPath(name)}
    </svg>
  );
}

function renderPath(name: ServiceIconName) {
  switch (name) {
    case 'targeted-prospecting':
      return (
        <>
          <circle cx="24" cy="24" r="16" />
          <circle cx="24" cy="24" r="10" />
          <circle cx="24" cy="24" r="4" />
          <circle cx="24" cy="24" r="1.5" fill="currentColor" />
        </>
      );
    case 'multi-channel-outreach':
      return (
        <>
          <path d="M10 12 H38 a2 2 0 0 1 2 2 v16 a2 2 0 0 1 -2 2 H22 l-7 6 v-6 H10 a2 2 0 0 1 -2 -2 V14 a2 2 0 0 1 2 -2 Z" />
          <circle cx="18" cy="22" r="1.4" fill="currentColor" />
          <circle cx="24" cy="22" r="1.4" fill="currentColor" />
          <circle cx="30" cy="22" r="1.4" fill="currentColor" />
        </>
      );
    case 'appointments':
      return (
        <>
          <rect x="8" y="10" width="32" height="30" rx="3" />
          <path d="M8 18 H40" />
          <path d="M16 6 V14" />
          <path d="M32 6 V14" />
          <path d="M18 28 l4 4 l8-8" />
        </>
      );
    case 'account-mgmt':
      return (
        <>
          <circle cx="24" cy="18" r="6" />
          <path d="M10 38 c2-7 8-10 14-10 s12 3 14 10" />
          <path d="M34 14 l3 3 l5-5" />
        </>
      );
    case 'database':
      return (
        <>
          <ellipse cx="24" cy="12" rx="14" ry="4" />
          <path d="M10 12 V36 c0 2.2 6.3 4 14 4 s14-1.8 14-4 V12" />
          <path d="M10 22 c0 2.2 6.3 4 14 4 s14-1.8 14-4" />
        </>
      );
    case 'campaign-optimization':
      return (
        <>
          <path d="M8 36 L20 24 L28 30 L40 14" />
          <path d="M40 22 V14 H32" />
          <circle cx="8" cy="36" r="1.5" fill="currentColor" />
        </>
      );
  }
}
