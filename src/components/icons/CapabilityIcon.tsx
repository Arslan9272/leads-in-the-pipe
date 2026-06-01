import { cn } from '@/lib/utils';
import type { CapabilityIconName } from '@/data/capabilities';

interface CapabilityIconProps {
  name: CapabilityIconName;
  className?: string;
}

const COMMON = {
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function CapabilityIcon({ name, className }: CapabilityIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className={cn('h-8 w-8 text-accent', className)}
      xmlns="http://www.w3.org/2000/svg"
      {...COMMON}
    >
      {renderPath(name)}
    </svg>
  );
}

function renderPath(name: CapabilityIconName) {
  switch (name) {
    case 'icp':
      return (
        <>
          <circle cx="24" cy="24" r="16" />
          <circle cx="24" cy="24" r="10" />
          <circle cx="24" cy="24" r="4" />
          <circle cx="24" cy="24" r="1.5" fill="currentColor" />
        </>
      );
    case 'infrastructure':
      return (
        <>
          <rect x="8" y="10" width="32" height="10" rx="2" />
          <rect x="8" y="28" width="32" height="10" rx="2" />
          <circle cx="13" cy="15" r="1" fill="currentColor" />
          <circle cx="13" cy="33" r="1" fill="currentColor" />
          <path d="M19 15 H35" />
          <path d="M19 33 H35" />
          <path d="M24 20 V28" />
        </>
      );
    case 'messaging':
      return (
        <>
          <path d="M10 12 H34 a2 2 0 0 1 2 2 v12 a2 2 0 0 1 -2 2 H22 l-6 5 v-5 H10 a2 2 0 0 1 -2 -2 V14 a2 2 0 0 1 2 -2 Z" />
          <path d="M16 20 H28" />
          <path d="M16 24 H24" />
          <path d="M30 38 H40" />
          <path d="M30 34 H38" />
        </>
      );
    case 'outreach':
      return (
        <>
          <rect x="8" y="14" width="32" height="22" rx="3" />
          <path d="M8 16 L24 28 L40 16" />
          <path d="M28 6 L36 6 L36 14" />
          <path d="M28 14 L36 6" />
        </>
      );
    case 'optimization':
      return (
        <>
          <path d="M8 36 H40" />
          <path d="M14 36 V20" />
          <path d="M24 36 V12" />
          <path d="M34 36 V24" />
          <path d="M10 14 L18 18 L28 8 L40 14" />
          <circle cx="14" cy="20" r="1.5" fill="currentColor" />
          <circle cx="24" cy="12" r="1.5" fill="currentColor" />
          <circle cx="34" cy="24" r="1.5" fill="currentColor" />
        </>
      );
    case 'meetings':
      return (
        <>
          <rect x="8" y="10" width="32" height="30" rx="3" />
          <path d="M8 18 H40" />
          <path d="M16 6 V14" />
          <path d="M32 6 V14" />
          <path d="M18 28 l4 4 l8-8" />
        </>
      );
  }
}
