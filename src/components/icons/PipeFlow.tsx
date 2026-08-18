import { useReducedMotion } from 'framer-motion';

import { cn } from '@/lib/utils';

interface PipeFlowProps {
  className?: string;
}

/**
 * Four intake pipes arranged as a pinwheel, each running tangentially into a
 * closed ring around the pipeline core. Leads travel down the pipes and settle
 * as a pool of qualified contacts that simmers and bubbles inside the core.
 */

// One pipe: straight tangent run, then a quarter wrap around the core. The
// other three are this same path rotated 90/180/270, so the four wraps meet
// end to end and close the ring.
const PIPE = 'M310.8 -98.1 L127.1 164 A150 150 0 0 0 164 372.9';
const ROTATIONS = [0, 90, 180, 270];

const TRAVEL_DUR = 7;
// Resting points on the pipe for the reduced-motion fallback.
const STATIC_AT = [
  { x: 219, y: 33 },
  { x: 164, y: 112 },
];
// Per-pipe drop timings — green = qualified lead, grey = raw contact.
const DROPS = [
  { fill: '#9EFB9C', r: 5, offset: 0 },
  { fill: '#5A5A5A', r: 4.2, offset: 0.9 },
];

// Settled pool of leads inside the core — jittered grid, deterministic seed.
const POOL = (() => {
  let seed = 1337;
  const rnd = () => (seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296;
  const pts: { x: number; y: number; r: number; rise: number; dur: number; delay: number }[] = [];
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 13; col++) {
      const x = 152 + col * 16 + (row % 2) * 8 + (rnd() - 0.5) * 7;
      const y = 268 + row * 17 + (rnd() - 0.5) * 7;
      if (Math.hypot(x - 250, y - 250) > 138) continue;
      pts.push({
        x,
        y,
        r: 3.4 + rnd() * 1.5,
        rise: 5 + rnd() * 9,
        dur: 2.4 + rnd() * 2.6,
        delay: rnd() * 4,
      });
    }
  }
  return pts;
})();

// Bubbles breaking off the pool and rising through the core.
const BUBBLES = [
  { x: 250, r: 4.6, dur: 6.5, delay: 0 },
  { x: 206, r: 3.4, dur: 7.4, delay: 2.1 },
  { x: 292, r: 3.8, dur: 8.1, delay: 4.3 },
  { x: 232, r: 3, dur: 7, delay: 5.6 },
];
const EASE = { calcMode: 'spline', keyTimes: '0;0.5;1', keySplines: '.4 0 .6 1;.4 0 .6 1' } as const;

export function PipeFlow({ className }: PipeFlowProps) {
  const prefersReduced = useReducedMotion();

  return (
    <svg
      viewBox="0 0 500 500"
      role="img"
      aria-label="Four pipes feeding leads into a pipeline core where qualified contacts collect"
      className={cn('h-full w-full', className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <path id="pf-pipe" d={PIPE} />
        <radialGradient id="pf-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#9EFB9C" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#9EFB9C" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="pf-disc" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.05" />
          <stop offset="86%" stopColor="#FFFFFF" stopOpacity="0.035" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="pf-core" cx="50%" cy="32%" r="46%">
          <stop offset="0%" stopColor="#9EFB9C" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#9EFB9C" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Core */}
      <circle cx="250" cy="250" r="215" fill="url(#pf-halo)" />
      <circle cx="250" cy="250" r="155" fill="url(#pf-disc)" />
      <circle cx="250" cy="250" r="155" fill="url(#pf-core)" />

      {/* Pipes + the leads travelling down them */}
      {ROTATIONS.map((angle, pipe) => (
        <g key={angle} transform={`rotate(${angle} 250 250)`}>
          <use href="#pf-pipe" stroke="#2A2A2A" strokeWidth="13" strokeLinecap="round" />
          {DROPS.map((drop, i) => {
            const begin = `${pipe * 1.4 + drop.offset}s`;
            return prefersReduced ? (
              <circle key={i} cx={STATIC_AT[i].x} cy={STATIC_AT[i].y} r={drop.r} fill={drop.fill} />
            ) : (
              <circle key={i} r={drop.r} fill={drop.fill} opacity="0">
                <animateMotion dur={`${TRAVEL_DUR}s`} begin={begin} repeatCount="indefinite">
                  <mpath href="#pf-pipe" />
                </animateMotion>
                <animate
                  attributeName="opacity"
                  dur={`${TRAVEL_DUR}s`}
                  begin={begin}
                  repeatCount="indefinite"
                  values="0;1;1;0"
                  keyTimes="0;0.06;0.82;1"
                />
              </circle>
            );
          })}
        </g>
      ))}

      {/* Bubbles rising off the pool */}
      {prefersReduced ? (
        <circle cx="250" cy="215" r="4.6" fill="#9EFB9C" opacity="0.8" />
      ) : (
        BUBBLES.map((b) => (
          <circle key={b.x} cx={b.x} cy="330" r={b.r} fill="#9EFB9C" opacity="0">
            <animate
              attributeName="cy"
              dur={`${b.dur}s`}
              begin={`${b.delay}s`}
              repeatCount="indefinite"
              values="330;160"
            />
            <animate
              attributeName="opacity"
              dur={`${b.dur}s`}
              begin={`${b.delay}s`}
              repeatCount="indefinite"
              values="0;0.9;0"
              keyTimes="0;0.25;1"
            />
          </circle>
        ))
      )}

      {/* Pool of collected leads, simmering */}
      {POOL.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={p.r} fill="#9EFB9C">
          {!prefersReduced && (
            <>
              <animate
                attributeName="cy"
                dur={`${p.dur}s`}
                begin={`${p.delay}s`}
                repeatCount="indefinite"
                values={`${p.y};${p.y - p.rise};${p.y}`}
                {...EASE}
              />
              <animate
                attributeName="opacity"
                dur={`${p.dur}s`}
                begin={`${p.delay}s`}
                repeatCount="indefinite"
                values="0.55;1;0.55"
                {...EASE}
              />
            </>
          )}
        </circle>
      ))}
    </svg>
  );
}
