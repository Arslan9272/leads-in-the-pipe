import { cn } from '@/lib/utils';

interface PipeBubbleProps {
  className?: string;
}

export function PipeBubble({ className }: PipeBubbleProps) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden="true"
      className={cn('h-full w-full', className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="pb-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#9EFB9C" stopOpacity="0.35" />
          <stop offset="60%" stopColor="#9EFB9C" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#9EFB9C" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pb-pipe" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9EFB9C" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#7DD97B" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      <circle cx="200" cy="200" r="180" fill="url(#pb-glow)" />

      <circle
        cx="200"
        cy="200"
        r="130"
        stroke="url(#pb-pipe)"
        strokeWidth="18"
        strokeLinecap="round"
        strokeDasharray="60 14 30 20 80 16"
      />

      <circle cx="200" cy="200" r="100" stroke="#1F1F1F" strokeWidth="1" strokeDasharray="2 6" />

      <g fill="#9EFB9C">
        <circle cx="120" cy="110" r="6" opacity="0.85" />
        <circle cx="300" cy="140" r="4" opacity="0.7" />
        <circle cx="320" cy="260" r="7" opacity="0.9" />
        <circle cx="100" cy="280" r="5" opacity="0.6" />
        <circle cx="220" cy="80" r="3" opacity="0.55" />
        <circle cx="80" cy="200" r="4" opacity="0.5" />
      </g>

      <g stroke="#9EFB9C" strokeWidth="2" fill="none" opacity="0.4">
        <circle cx="200" cy="200" r="60" />
        <circle cx="200" cy="200" r="40" />
      </g>

      <circle cx="200" cy="200" r="10" fill="#9EFB9C" />
    </svg>
  );
}
