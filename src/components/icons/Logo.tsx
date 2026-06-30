import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'mark';
}

/** Brand green sampled from the official logo mark (medium leaf green). */
const LOGO_GREEN = '#5BB85F';
const LOGO_WHITE = '#FFFFFF';

/**
 * The "stacked bars" brand mark — a vector recreation of the official logo so
 * it scales to any size without pixel breakdown. The three rows step down and
 * to the left (top bar longest & furthest right, bottom green bar shortest &
 * furthest left) with white/green dots descending left:
 *   • row 1: white dot  + long white pill
 *   • row 2: green dot  + white pill (further left)
 *   • row 3:            green pill (furthest left, no dot)
 */
function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 154 108"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('inline-block', className)}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Row 1 — white dot + long white pill */}
      <circle cx="47" cy="16" r="13" fill={LOGO_WHITE} />
      <rect x="64" y="5" width="86" height="22" rx="11" fill={LOGO_WHITE} />

      {/* Row 2 — green dot + white pill, stepped left */}
      <circle cx="29" cy="58" r="13" fill={LOGO_GREEN} />
      <rect x="48" y="47" width="93" height="22" rx="11" fill={LOGO_WHITE} />

      {/* Row 3 — green pill, furthest left */}
      <rect x="2" y="85" width="123" height="22" rx="11" fill={LOGO_GREEN} />
    </svg>
  );
}

/** Two-line wordmark with the official colour split. */
function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'font-display font-bold leading-[0.92] tracking-tight',
        className,
      )}
    >
      <span className="block">
        <span className="text-text-primary">Leads</span>
        <span style={{ color: LOGO_GREEN }}>In</span>
      </span>
      <span className="block">
        <span style={{ color: LOGO_GREEN }}>The</span>
        <span className="text-text-primary">Pipe</span>
      </span>
    </span>
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
        <Mark className="h-8 w-auto" />
      </span>
    );
  }

  return (
    <span
      role="img"
      aria-label="Leads In The Pipe"
      className={cn('inline-flex items-center gap-2.5', className)}
    >
      <Mark className="h-9 w-auto shrink-0" />
      <Wordmark className="text-lg md:text-xl" />
    </span>
  );
}
