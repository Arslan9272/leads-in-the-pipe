import { useReducedMotion } from 'framer-motion';

import { cn } from '@/lib/utils';

interface PipeFlowProps {
  className?: string;
}

/**
 * Three intake pipes (your outbound, LinkedIn and messaging channels) that
 * interconnect at a junction and feed one trunk pipe down into the pipeline.
 * Drops of light = leads flowing through the system.
 */

// Visual tube segments.
const INTAKE_L = 'M44 26 C44 96 120 92 120 156';
const INTAKE_M = 'M120 20 L120 156';
const INTAKE_R = 'M196 26 C196 96 120 92 120 156';
const TRUNK = 'M120 156 C120 214 120 236 120 300';

// Full motion paths the drops travel (intake + trunk), one per channel.
const FLOW_L = `${INTAKE_L} C120 214 120 236 120 300`;
const FLOW_M = `${INTAKE_M} C120 214 120 236 120 300`;
const FLOW_R = `${INTAKE_R} C120 214 120 236 120 300`;

const TUBES = [INTAKE_L, INTAKE_M, INTAKE_R, TRUNK];
const INTAKE_MOUTHS = [
  { cx: 44, cy: 26 },
  { cx: 120, cy: 20 },
  { cx: 196, cy: 26 },
];

const DROP_DUR = 4.6;
const FLOWS = [
  { id: 'l', path: FLOW_L, drops: [{ begin: '0s', r: 6 }, { begin: '2.3s', r: 4.5 }] },
  { id: 'm', path: FLOW_M, drops: [{ begin: '0.9s', r: 6.5 }, { begin: '3.2s', r: 5 }] },
  { id: 'r', path: FLOW_R, drops: [{ begin: '1.7s', r: 6 }, { begin: '3.9s', r: 4.5 }] },
];

// Resting positions for the reduced-motion fallback.
const STATIC_DROPS = [
  { cx: 70, cy: 70 },
  { cx: 120, cy: 60 },
  { cx: 170, cy: 70 },
  { cx: 120, cy: 200 },
  { cx: 120, cy: 270 },
];

function Tube({ d }: { d: string }) {
  return (
    <>
      <path d={d} stroke="url(#pf-glass)" strokeWidth="26" strokeLinecap="round" fill="none" />
      <path d={d} stroke="#04140A" strokeOpacity="0.35" strokeWidth="16" strokeLinecap="round" fill="none" />
      <path
        d={d}
        stroke="#FFFFFF"
        strokeOpacity="0.16"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
        transform="translate(-4 0)"
      />
    </>
  );
}

export function PipeFlow({ className }: PipeFlowProps) {
  const prefersReduced = useReducedMotion();

  return (
    <svg
      viewBox="0 0 240 320"
      role="img"
      aria-label="Three interconnected pipes carrying glowing leads into your pipeline"
      className={cn('h-full w-full', className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="pf-ambient" cx="50%" cy="45%" r="58%">
          <stop offset="0%" stopColor="#9EFB9C" stopOpacity="0.26" />
          <stop offset="55%" stopColor="#9EFB9C" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#9EFB9C" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pf-glass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#9EFB9C" stopOpacity="0.06" />
          <stop offset="50%" stopColor="#9EFB9C" stopOpacity="0.20" />
          <stop offset="100%" stopColor="#9EFB9C" stopOpacity="0.06" />
        </linearGradient>
        <radialGradient id="pf-drop" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#F4FFF2" />
          <stop offset="45%" stopColor="#C7FFC5" />
          <stop offset="100%" stopColor="#9EFB9C" />
        </radialGradient>
        <filter id="pf-glow" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="3.4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Ambient halo */}
      <rect x="0" y="0" width="240" height="320" fill="url(#pf-ambient)" />

      {/* Tubes */}
      {TUBES.map((d) => (
        <Tube key={d} d={d} />
      ))}

      {/* Junction where the channels interconnect */}
      <circle cx="120" cy="156" r="14" fill="#04140A" />
      <circle cx="120" cy="156" r="14" fill="url(#pf-ambient)" />
      <circle cx="120" cy="156" r="6" fill="#9EFB9C" fillOpacity="0.7" filter="url(#pf-glow)" />

      {/* Intake mouths */}
      {INTAKE_MOUTHS.map((m) => (
        <ellipse
          key={`${m.cx}-${m.cy}`}
          cx={m.cx}
          cy={m.cy}
          rx="14"
          ry="5"
          fill="#9EFB9C"
          fillOpacity="0.16"
          stroke="#9EFB9C"
          strokeOpacity="0.45"
          strokeWidth="1.6"
        />
      ))}

      {/* Pipeline collection glow (outlet) */}
      <ellipse cx="120" cy="304" rx="34" ry="10" fill="url(#pf-ambient)" />
      <ellipse cx="120" cy="300" rx="18" ry="5" fill="#9EFB9C" fillOpacity="0.28" />

      {/* Hidden reference paths for animateMotion */}
      {!prefersReduced && (
        <>
          <path id="pf-mpath-l" d={FLOW_L} fill="none" stroke="none" />
          <path id="pf-mpath-m" d={FLOW_M} fill="none" stroke="none" />
          <path id="pf-mpath-r" d={FLOW_R} fill="none" stroke="none" />
        </>
      )}

      {/* Travelling drops of light */}
      {prefersReduced
        ? STATIC_DROPS.map((p, i) => (
            <circle key={i} cx={p.cx} cy={p.cy} r="5.5" fill="url(#pf-drop)" filter="url(#pf-glow)" />
          ))
        : FLOWS.map((flow) =>
            flow.drops.map((d, i) => (
              <g key={`${flow.id}-${i}`} filter="url(#pf-glow)">
                <circle r={d.r} fill="url(#pf-drop)">
                  <animateMotion dur={`${DROP_DUR}s`} begin={d.begin} repeatCount="indefinite">
                    <mpath href={`#pf-mpath-${flow.id}`} />
                  </animateMotion>
                  <animate
                    attributeName="opacity"
                    dur={`${DROP_DUR}s`}
                    begin={d.begin}
                    repeatCount="indefinite"
                    values="0;1;1;1;0"
                    keyTimes="0;0.08;0.5;0.9;1"
                  />
                </circle>
              </g>
            )),
          )}
    </svg>
  );
}
