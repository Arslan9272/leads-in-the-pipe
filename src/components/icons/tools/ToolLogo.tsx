import type { ReactElement } from 'react';

import { cn } from '@/lib/utils';

interface ToolLogoProps {
  /** Tool id from src/data/tools.ts */
  id: string;
  name: string;
  className?: string;
}

/** A mark renderer. `uid` namespaces gradient ids so several logos can share a page. */
type MarkFn = (uid: string) => ReactElement;

/**
 * Recognisable brand logos for the tools we operate, hand-built as compact SVGs
 * (viewBox 0 0 32 32). These are render-functions (not components) so they can be
 * called inline without remounting on every render.
 */

/** Brand-coloured rounded tile + bold lettermark, used where a full glyph would
 * not read at this size. */
function letterTile(letter: string, bg: string, fg = '#FFFFFF'): ReactElement {
  return (
    <>
      <rect width="32" height="32" rx="8" fill={bg} />
      <text
        x="16"
        y="22"
        textAnchor="middle"
        fontFamily="'Plus Jakarta Sans', 'Inter', system-ui, sans-serif"
        fontSize="16"
        fontWeight="800"
        fill={fg}
      >
        {letter}
      </text>
    </>
  );
}

const linkedInMark: MarkFn = () => (
  <>
    <rect width="32" height="32" rx="7" fill="#0A66C2" />
    <circle cx="9.2" cy="9.5" r="2.2" fill="#fff" />
    <rect x="7" y="13" width="4.3" height="11.5" rx="0.4" fill="#fff" />
    <path
      d="M14 13h4.1v1.7h.06c.6-1 1.9-1.9 3.7-1.9 3.3 0 4.1 2 4.1 4.9v6.8h-4.3v-6c0-1.4-.5-2.4-1.8-2.4-1.1 0-1.7.7-1.96 1.5-.1.27-.1.66-.1 1v5.9H14z"
      fill="#fff"
    />
  </>
);

const pipedriveMark: MarkFn = () => (
  <>
    <rect width="32" height="32" rx="8" fill="#1F7A3D" />
    <rect x="11.5" y="8" width="4" height="17" rx="0.5" fill="#fff" />
    <circle cx="18" cy="14" r="5.4" fill="#fff" />
    <circle cx="18" cy="14" r="2.4" fill="#1F7A3D" />
  </>
);

const hubspotMark: MarkFn = () => (
  <>
    <circle cx="21" cy="12.5" r="5" fill="none" stroke="#FF7A59" strokeWidth="2.6" />
    <rect x="11" y="12.8" width="2.6" height="11.5" rx="1.3" fill="#FF7A59" />
    <rect x="12" y="11.5" width="8" height="2.6" rx="1.3" fill="#FF7A59" />
    <circle cx="12.3" cy="24" r="3.1" fill="#FF7A59" />
    <circle cx="21" cy="6.5" r="2.2" fill="#FF7A59" />
  </>
);

const salesforceMark: MarkFn = () => (
  <g fill="#00A1E0">
    <circle cx="12.5" cy="18.5" r="5" />
    <circle cx="19.5" cy="15.5" r="6.5" />
    <circle cx="24" cy="19" r="4.5" />
    <rect x="10" y="18.5" width="15" height="5.5" rx="2.7" />
  </g>
);

const gongMark: MarkFn = () => (
  <g stroke="#8246FA" fill="none">
    <circle cx="16" cy="16" r="10.5" strokeWidth="2.4" />
    <circle cx="16" cy="16" r="6" strokeWidth="2.4" />
    <circle cx="16" cy="16" r="1.9" fill="#8246FA" stroke="none" />
  </g>
);

const apolloMark: MarkFn = (uid) => (
  <>
    <defs>
      <linearGradient id={`${uid}-apollo`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#7C5CFF" />
        <stop offset="100%" stopColor="#4429B4" />
      </linearGradient>
    </defs>
    <circle cx="16" cy="16" r="11" fill={`url(#${uid}-apollo)`} />
    <path d="M16 9c-3.8 0-7 3.1-7 7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    <circle cx="16" cy="16" r="2.6" fill="#fff" />
  </>
);

const claudeMark: MarkFn = () => {
  // Anthropic / Claude sunburst, simplified to radiating tapered spokes.
  const spokes = Array.from({ length: 12 }, (_, i) => i * 30);
  return (
    <g transform="translate(16 16)" fill="#D97757">
      {spokes.map((deg) => (
        <rect key={deg} x="-1.1" y="-11" width="2.2" height="7" rx="1.1" transform={`rotate(${deg})`} />
      ))}
    </g>
  );
};

const instantlyMark: MarkFn = (uid) => (
  <>
    <defs>
      <linearGradient id={`${uid}-inst`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#5B7CFA" />
        <stop offset="100%" stopColor="#3D4EE8" />
      </linearGradient>
    </defs>
    <rect width="32" height="32" rx="8" fill={`url(#${uid}-inst)`} />
    <path d="M18 7 9 18h6l-1 7 9-11h-6z" fill="#fff" />
  </>
);

const smartleadMark: MarkFn = () => (
  <>
    <rect width="32" height="32" rx="8" fill="#0E1730" />
    <path d="M7 22 25 8l-6 17-3.5-6z" fill="#FF8A4C" />
    <path d="M15.5 19 25 8l-9.5 6z" fill="#FFB27A" />
  </>
);

const clayMark: MarkFn = (uid) => (
  <>
    <defs>
      <linearGradient id={`${uid}-clay`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#F8C66B" />
        <stop offset="45%" stopColor="#EF7D7D" />
        <stop offset="100%" stopColor="#7C5CFF" />
      </linearGradient>
    </defs>
    <rect width="32" height="32" rx="9" fill={`url(#${uid}-clay)`} />
    <circle cx="16" cy="16" r="5.5" fill="#fff" fillOpacity="0.92" />
  </>
);

const salesNavigatorMark: MarkFn = () => (
  <>
    <rect width="32" height="32" rx="7" fill="#0A66C2" />
    <path d="M16 7 25 16 16 25 7 16Z" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinejoin="round" />
    <circle cx="16" cy="16" r="2.4" fill="#fff" />
  </>
);

const linkedHelperMark: MarkFn = () => (
  <>
    <rect width="32" height="32" rx="8" fill="#1B79E6" />
    <rect x="8.5" y="11" width="15" height="11" rx="3" fill="#fff" />
    <circle cx="13" cy="16.5" r="1.8" fill="#1B79E6" />
    <circle cx="19" cy="16.5" r="1.8" fill="#1B79E6" />
    <rect x="14.7" y="6.5" width="2.6" height="4" rx="1.3" fill="#fff" />
    <circle cx="16" cy="6" r="1.8" fill="#fff" />
  </>
);

const millionVerifierMark: MarkFn = () => (
  <>
    <rect width="32" height="32" rx="8" fill="#1E9E5A" />
    <path d="M9 16.5 L14 21.5 L24 10.5" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </>
);

const aiArkMark: MarkFn = (uid) => (
  <>
    <defs>
      <linearGradient id={`${uid}-aiark`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#1F2937" />
        <stop offset="100%" stopColor="#0B1220" />
      </linearGradient>
    </defs>
    <rect width="32" height="32" rx="8" fill={`url(#${uid}-aiark)`} />
    <path d="M11 23 L16 9 L21 23" fill="none" stroke="#9EFB9C" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13 18 H19" stroke="#9EFB9C" strokeWidth="2.4" strokeLinecap="round" />
  </>
);

const MARKS: Record<string, MarkFn> = {
  linkedin: linkedInMark,
  pipedrive: pipedriveMark,
  hubspot: hubspotMark,
  salesforce: salesforceMark,
  gong: gongMark,
  apollo: apolloMark,
  claude: claudeMark,
  instantly: instantlyMark,
  smartlead: smartleadMark,
  clay: clayMark,
  'sales-navigator': salesNavigatorMark,
  linkedhelper: linkedHelperMark,
  millionverifier: millionVerifierMark,
  'ai-ark': aiArkMark,
  heyreach: () => letterTile('h', '#6B4EFF'),
  expandi: () => letterTile('E', '#FF5C39'),
  lavender: () => letterTile('L', '#8B7BF7'),
};

export function ToolLogo({ id, name, className }: ToolLogoProps) {
  const uid = `tl-${id}`;
  const render = MARKS[id];
  const content = render ? render(uid) : letterTile(name.charAt(0).toUpperCase(), '#2A2F2A', '#9EFB9C');
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn('shrink-0', className)}
      role="img"
      aria-label={name}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {content}
    </svg>
  );
}
