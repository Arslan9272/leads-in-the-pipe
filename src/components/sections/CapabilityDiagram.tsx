import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

import type { CapabilityIconName } from '@/data/capabilities';

interface Props {
  name: CapabilityIconName;
}

export function CapabilityDiagram({ name }: Props) {
  switch (name) {
    case 'icp':
      return <IcpDiagram />;
    case 'infrastructure':
      return <InfrastructureDiagram />;
    case 'messaging':
      return <MessagingDiagram />;
    case 'outreach':
      return <OutreachDiagram />;
    case 'optimization':
      return <OptimizationDiagram />;
    case 'meetings':
      return <MeetingsDiagram />;
  }
}

/* -------------------------------------------------------------------------- */
/* 1. ICP & TAM — concentric targeting rings with accounts filtering inward    */
/* -------------------------------------------------------------------------- */

function IcpDiagram() {
  const prefersReduced = useReducedMotion();
  const dots = [
    { x: 30, y: 40 },
    { x: 200, y: 50 },
    { x: 180, y: 200 },
    { x: 40, y: 180 },
    { x: 220, y: 130 },
  ];

  return (
    <Frame label="Targeting">
      <div className="flex justify-center">
      <svg viewBox="0 0 240 240" className="h-44 w-44 sm:h-52 sm:w-52" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs>
          <radialGradient id="icp-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#9EFB9C" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#9EFB9C" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="120" cy="120" r="70" fill="url(#icp-glow)" />
        {[90, 65, 40, 18].map((r, i) => (
          <motion.circle
            key={r}
            cx="120"
            cy="120"
            r={r}
            fill="none"
            stroke="#9EFB9C"
            strokeWidth="1"
            strokeOpacity={0.25 + i * 0.15}
            initial={false}
            animate={
              prefersReduced
                ? undefined
                : { scale: [1, 1.04, 1], opacity: [0.4, 0.8, 0.4] }
            }
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.25 }}
            style={{ transformOrigin: '120px 120px' }}
          />
        ))}
        <circle cx="120" cy="120" r="4" fill="#9EFB9C" />
        <line x1="120" y1="100" x2="120" y2="140" stroke="#9EFB9C" strokeWidth="1" />
        <line x1="100" y1="120" x2="140" y2="120" stroke="#9EFB9C" strokeWidth="1" />

        {dots.map((d, i) => (
          <motion.circle
            key={i}
            r="3"
            fill="#9EFB9C"
            initial={{ cx: d.x, cy: d.y, opacity: 0.4 }}
            animate={
              prefersReduced
                ? { cx: d.x, cy: d.y, opacity: 0.6 }
                : { cx: [d.x, 120], cy: [d.y, 120], opacity: [0.4, 0.9, 0] }
            }
            transition={{
              duration: 2.4,
              delay: i * 0.6,
              repeat: Infinity,
              repeatDelay: 1.4,
              ease: 'easeInOut',
            }}
          />
        ))}
      </svg>
      </div>
      <StatRow
        items={[
          { value: '4,200', label: 'Accounts mapped' },
          { value: '312', label: 'In ICP' },
        ]}
      />
    </Frame>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. Infrastructure & Data — inboxes warming up with progress bars            */
/* -------------------------------------------------------------------------- */

function InfrastructureDiagram() {
  const prefersReduced = useReducedMotion();
  const inboxes = [
    { domain: 'sales.yourbrand.io', warmth: 0.95 },
    { domain: 'team.yourbrand.io', warmth: 0.72 },
    { domain: 'go.yourbrand.io', warmth: 0.48 },
  ];

  return (
    <Frame label="Warming up">
      <div className="flex flex-col gap-3">
        {inboxes.map((inbox, i) => (
          <div
            key={inbox.domain}
            className="flex cursor-default items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-3 transition-colors duration-200 hover:border-accent/40 hover:bg-accent/[0.06]"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent/15 text-accent">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="6" width="18" height="13" rx="1.5" />
                <path d="M3 7 L12 14 L21 7" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-mono text-[11px] text-text-secondary">{inbox.domain}</p>
              <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/5">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-accent/60 to-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${inbox.warmth * 100}%` }}
                  transition={{
                    duration: prefersReduced ? 0 : 1.6,
                    delay: prefersReduced ? 0 : i * 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              </div>
            </div>
            <span className="font-mono text-[10px] text-accent">
              {Math.round(inbox.warmth * 100)}%
            </span>
          </div>
        ))}
      </div>
      <StatRow
        items={[
          { value: '12', label: 'Domains' },
          { value: '98.4%', label: 'Inbox rate' },
        ]}
      />
    </Frame>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. Messaging & Sequences — multi-channel chat threads                       */
/* -------------------------------------------------------------------------- */

function MessagingDiagram() {
  const prefersReduced = useReducedMotion();
  const channels = [
    { label: 'Email', bubbles: ['Subject: A quick idea for {{company}}', 'Hey {{first}} — saw your team is hiring...'] },
    { label: 'LinkedIn', bubbles: ['Connect →', 'Loved your post on RevOps...'] },
  ];

  return (
    <Frame label="Sequences">
      <div className="mx-auto grid w-full max-w-sm grid-cols-2 gap-3">
        {channels.map((channel, ci) => (
          <div key={channel.label} className="space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
              {channel.label}
            </p>
            {channel.bubbles.map((text, bi) => (
              <motion.div
                key={bi}
                className="cursor-default rounded-lg border border-white/10 bg-white/[0.04] p-2.5 text-[11px] leading-snug text-text-secondary transition-colors duration-200 hover:border-accent/40 hover:bg-accent/[0.06] hover:text-text-primary"
                initial={prefersReduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: prefersReduced ? 0 : ci * 0.3 + bi * 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {text}
              </motion.div>
            ))}
            {!prefersReduced && (
              <motion.div
                className="inline-flex items-center gap-1 rounded-lg border border-accent/30 bg-accent/10 px-2.5 py-1.5"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.6, repeat: Infinity, delay: ci * 0.3 }}
              >
                <span className="block h-1 w-1 rounded-full bg-accent" />
                <span className="block h-1 w-1 rounded-full bg-accent" />
                <span className="block h-1 w-1 rounded-full bg-accent" />
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. Outreach at Scale — hub with pulses radiating to nodes                   */
/* -------------------------------------------------------------------------- */

function OutreachDiagram() {
  const prefersReduced = useReducedMotion();
  const nodes = [
    { x: 40, y: 50 },
    { x: 200, y: 60 },
    { x: 220, y: 170 },
    { x: 50, y: 190 },
    { x: 140, y: 30 },
    { x: 30, y: 130 },
  ];

  return (
    <Frame label="At scale">
      <div className="flex justify-center">
      <svg viewBox="0 0 240 220" className="h-44 w-auto sm:h-52" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs>
          <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#9EFB9C" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#9EFB9C" stopOpacity="0" />
          </radialGradient>
        </defs>

        {nodes.map((n, i) => (
          <line
            key={`line-${i}`}
            x1="120"
            y1="110"
            x2={n.x}
            y2={n.y}
            stroke="#9EFB9C"
            strokeOpacity="0.15"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
        ))}

        {nodes.map((n, i) => (
          <motion.circle
            key={`pulse-${i}`}
            r="3"
            fill="#9EFB9C"
            initial={{ cx: 120, cy: 110, opacity: 0 }}
            animate={
              prefersReduced
                ? { cx: n.x, cy: n.y, opacity: 0.8 }
                : { cx: [120, n.x], cy: [110, n.y], opacity: [0, 1, 0] }
            }
            transition={{
              duration: 1.6,
              delay: i * 0.25,
              repeat: Infinity,
              repeatDelay: 1.2,
              ease: 'easeOut',
            }}
          />
        ))}

        <circle cx="120" cy="110" r="40" fill="url(#hub-glow)" />
        <circle cx="120" cy="110" r="14" fill="#0A0A0A" stroke="#9EFB9C" strokeWidth="1.5" />
        <circle cx="120" cy="110" r="3" fill="#9EFB9C" />

        {nodes.map((n, i) => (
          <circle
            key={`node-${i}`}
            cx={n.x}
            cy={n.y}
            r="4"
            fill="#1A1A1A"
            stroke="#9EFB9C"
            strokeWidth="1"
            strokeOpacity="0.5"
            className="cursor-default transition-all duration-200 hover:[fill:#0A0A0A] hover:[r:7] hover:[stroke-width:2]"
          />
        ))}
      </svg>
      </div>
      <StatRow
        items={[
          { value: '14k', label: 'Touches / mo' },
          { value: '3.2%', label: 'Reply rate' },
        ]}
      />
    </Frame>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. Optimization — A/B test bars, winner highlighted                         */
/* -------------------------------------------------------------------------- */

function OptimizationDiagram() {
  const prefersReduced = useReducedMotion();
  const [winner, setWinner] = useState(1);

  useEffect(() => {
    if (prefersReduced) return;
    const id = window.setInterval(() => {
      setWinner((w) => (w + 1) % 3);
    }, 2400);
    return () => window.clearInterval(id);
  }, [prefersReduced]);

  const variants = [
    { id: 'A', value: 38 },
    { id: 'B', value: 72 },
    { id: 'C', value: 54 },
  ];

  return (
    <Frame label="Iteration">
      <div className="space-y-3">
        <div className="flex h-32 items-end gap-3">
          {variants.map((v, i) => {
            const isWin = i === winner;
            return (
              <div
                key={v.id}
                className="group flex flex-1 cursor-default flex-col items-center gap-2 rounded-lg px-1 py-1 transition-colors duration-200 hover:bg-accent/[0.06]"
              >
                <span
                  className={
                    'font-mono text-[10px] transition-colors ' +
                    (isWin ? 'text-accent' : 'text-text-muted')
                  }
                >
                  {v.value}%
                </span>
                <motion.div
                  className={
                    'w-full rounded-t-md transition-colors duration-200 ' +
                    (isWin ? 'bg-accent' : 'bg-white/15 group-hover:bg-accent/40')
                  }
                  initial={{ height: 0 }}
                  animate={{ height: `${v.value}%` }}
                  transition={{
                    duration: prefersReduced ? 0 : 0.8,
                    delay: prefersReduced ? 0 : i * 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
                <span
                  className={
                    'font-mono text-[11px] ' +
                    (isWin ? 'text-text-primary' : 'text-text-muted')
                  }
                >
                  {v.id}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-between rounded-lg border border-accent/30 bg-accent/10 px-3 py-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
            Winner
          </span>
          <span className="font-display text-sm font-semibold text-text-primary">
            Variant {variants[winner].id} · +
            {variants[winner].value - Math.min(...variants.map((v) => v.value))}%
          </span>
        </div>
      </div>
    </Frame>
  );
}

/* -------------------------------------------------------------------------- */
/* 6. Qualified Meetings — calendar slots filling                              */
/* -------------------------------------------------------------------------- */

function MeetingsDiagram() {
  const prefersReduced = useReducedMotion();
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const booked = [
    [0, 1],
    [1, 0],
    [2, 2],
    [3, 1],
    [4, 0],
    [0, 3],
    [2, 0],
  ];

  return (
    <Frame label="Calendar">
      <div className="space-y-2">
        <div className="grid grid-cols-5 gap-1.5">
          {days.map((d) => (
            <span
              key={d}
              className="text-center font-mono text-[10px] uppercase text-text-muted"
            >
              {d.slice(0, 1)}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-5 gap-1.5">
          {Array.from({ length: 20 }).map((_, idx) => {
            const col = idx % 5;
            const row = Math.floor(idx / 5);
            const slotIdx = booked.findIndex(([c, r]) => c === col && r === row);
            const isBooked = slotIdx >= 0;
            return (
              <motion.div
                key={idx}
                className={
                  'h-7 cursor-default rounded-md border transition-colors duration-200 hover:border-accent/60 hover:bg-accent/30 ' +
                  (isBooked
                    ? 'border-accent/40 bg-accent/20'
                    : 'border-white/10 bg-white/[0.02]')
                }
                initial={isBooked ? { opacity: 0, scale: 0.8 } : false}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: prefersReduced || !isBooked ? 0 : slotIdx * 0.18,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            );
          })}
        </div>
      </div>
      <StatRow
        items={[
          { value: '23', label: 'Booked / wk' },
          { value: '82%', label: 'Show-up rate' },
        ]}
      />
    </Frame>
  );
}

/* -------------------------------------------------------------------------- */
/* Shared chrome                                                               */
/* -------------------------------------------------------------------------- */

function Frame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="relative h-full overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-bg-elevated via-bg-card to-bg p-6 md:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-accent/15 blur-3xl"
      />
      <div className="relative flex items-center justify-end">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
          {label}
        </span>
      </div>
      <div className="relative mt-5 flex flex-col gap-4">{children}</div>
    </div>
  );
}

function StatRow({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-2 border-t border-border-subtle pt-4">
      {items.map((item) => (
        <div key={item.label} className="rounded-lg bg-white/[0.03] p-2.5">
          <p className="font-display text-lg font-semibold text-accent">{item.value}</p>
          <p className="mt-0.5 text-[10px] uppercase tracking-wide text-text-muted">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}
