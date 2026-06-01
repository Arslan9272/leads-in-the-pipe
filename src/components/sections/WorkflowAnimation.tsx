import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState, type ReactElement } from 'react';

import { cn } from '@/lib/utils';

type StepIcon = (props: { className?: string }) => ReactElement;

interface Step {
  id: string;
  label: string;
  detail: string;
  Icon: StepIcon;
}

const SVG_PROPS = {
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const ProspectIcon: StepIcon = ({ className }) => (
  <svg viewBox="0 0 40 40" className={className} aria-hidden="true" {...SVG_PROPS}>
    <circle cx="20" cy="20" r="13" />
    <circle cx="20" cy="20" r="8" />
    <circle cx="20" cy="20" r="3" />
    <circle cx="20" cy="20" r="1" fill="currentColor" />
  </svg>
);

const OutreachIcon: StepIcon = ({ className }) => (
  <svg viewBox="0 0 40 40" className={className} aria-hidden="true" {...SVG_PROPS}>
    <path d="M6 10 H34 a2 2 0 0 1 2 2 v12 a2 2 0 0 1 -2 2 H18 l-6 5 v-5 H6 a2 2 0 0 1 -2 -2 V12 a2 2 0 0 1 2 -2 Z" />
    <circle cx="14" cy="18" r="1.2" fill="currentColor" />
    <circle cx="20" cy="18" r="1.2" fill="currentColor" />
    <circle cx="26" cy="18" r="1.2" fill="currentColor" />
  </svg>
);

const QualifyIcon: StepIcon = ({ className }) => (
  <svg viewBox="0 0 40 40" className={className} aria-hidden="true" {...SVG_PROPS}>
    <path d="M6 8 H34 L24 22 V32 L16 34 V22 Z" />
  </svg>
);

const BookIcon: StepIcon = ({ className }) => (
  <svg viewBox="0 0 40 40" className={className} aria-hidden="true" {...SVG_PROPS}>
    <rect x="6" y="8" width="28" height="26" rx="2.5" />
    <path d="M6 16 H34" />
    <path d="M14 4 V12" />
    <path d="M26 4 V12" />
    <path d="M15 24 l3 3 l7-7" />
  </svg>
);

const HandoffIcon: StepIcon = ({ className }) => (
  <svg viewBox="0 0 40 40" className={className} aria-hidden="true" {...SVG_PROPS}>
    <circle cx="14" cy="14" r="5" />
    <path d="M4 32 c2-5 6-7 10-7 s8 2 10 7" />
    <path d="M26 20 H36" />
    <path d="M32 16 L36 20 L32 24" />
  </svg>
);

const STEPS: Step[] = [
  { id: 'prospect', label: 'Prospect', detail: 'ICP-matched targets', Icon: ProspectIcon },
  { id: 'outreach', label: 'Outreach', detail: 'Email, LinkedIn, phone', Icon: OutreachIcon },
  { id: 'qualify', label: 'Qualify', detail: 'Score & verify intent', Icon: QualifyIcon },
  { id: 'book', label: 'Book', detail: 'Meetings scheduled', Icon: BookIcon },
  { id: 'handoff', label: 'Hand-off', detail: 'Sales takes over', Icon: HandoffIcon },
];

const CYCLE_MS = 1600;

export function WorkflowAnimation() {
  const prefersReduced = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (prefersReduced) return;
    const id = window.setInterval(() => {
      setActiveIdx((i) => (i + 1) % STEPS.length);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [prefersReduced]);

  return (
    <div
      className="relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-2xl border border-accent/25 bg-gradient-to-br from-accent/8 via-bg-card to-bg-card p-6 md:p-8 lg:p-10"
      role="figure"
      aria-label="Lead-generation pipeline: prospect, outreach, qualify, book, hand-off"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="relative">
        <p className="text-xs uppercase tracking-[0.25em] text-accent">The pipeline</p>
        <h3 className="mt-2 max-w-md font-display text-2xl font-semibold tracking-tight text-text-primary md:text-3xl">
          How a lead moves through the pipe
        </h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-text-secondary">
          Every prospect we touch flows through the same disciplined five-stage process.
        </p>
      </div>

      <div className="relative mt-8 flex flex-1 items-center justify-center md:mt-10">
        {/* Desktop / tablet: horizontal flow */}
        <div className="hidden w-full md:block">
          <HorizontalFlow activeIdx={activeIdx} prefersReduced={!!prefersReduced} />
        </div>

        {/* Mobile: vertical flow */}
        <div className="w-full md:hidden">
          <VerticalFlow activeIdx={activeIdx} prefersReduced={!!prefersReduced} />
        </div>
      </div>

      <div className="relative mt-6 flex items-center justify-between border-t border-border-subtle pt-4 text-xs">
        <span className="text-text-muted">
          Stage{' '}
          <span className="font-mono text-accent">
            {String(activeIdx + 1).padStart(2, '0')}
          </span>{' '}
          / 05
        </span>
        <span className="font-mono uppercase tracking-[0.2em] text-text-muted">
          {STEPS[activeIdx].label}
        </span>
      </div>
    </div>
  );
}

function HorizontalFlow({
  activeIdx,
  prefersReduced,
}: {
  activeIdx: number;
  prefersReduced: boolean;
}) {
  return (
    <div className="relative">
      {/* Connecting track */}
      <div
        aria-hidden="true"
        className="absolute left-[10%] right-[10%] top-7 h-px bg-border"
      />
      <motion.div
        aria-hidden="true"
        className="absolute left-[10%] top-7 h-px origin-left bg-accent"
        style={{ right: '10%' }}
        initial={false}
        animate={{
          scaleX: prefersReduced ? 1 : (activeIdx + 1) / STEPS.length,
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />

      <ul className="relative grid grid-cols-5 gap-2">
        {STEPS.map((step, idx) => {
          const active = idx === activeIdx;
          const reached = idx <= activeIdx;
          return (
            <li key={step.id} className="flex flex-col items-center text-center">
              <div className="relative flex h-14 w-14 items-center justify-center">
                {active && !prefersReduced && (
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-accent/30"
                    initial={{ scale: 0.8, opacity: 0.6 }}
                    animate={{ scale: 1.4, opacity: 0 }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  />
                )}
                <motion.div
                  className={cn(
                    'relative flex h-14 w-14 items-center justify-center rounded-full border transition-colors',
                    reached
                      ? 'border-accent bg-accent/15 text-accent'
                      : 'border-border bg-bg-elevated text-text-muted',
                  )}
                  animate={{ scale: active && !prefersReduced ? 1.08 : 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <step.Icon className="h-6 w-6" />
                </motion.div>
              </div>
              <p
                className={cn(
                  'mt-3 font-display text-sm font-semibold transition-colors',
                  reached ? 'text-text-primary' : 'text-text-muted',
                )}
              >
                {step.label}
              </p>
              <p className="mt-1 hidden text-[11px] leading-snug text-text-secondary lg:block">
                {step.detail}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function VerticalFlow({
  activeIdx,
  prefersReduced,
}: {
  activeIdx: number;
  prefersReduced: boolean;
}) {
  return (
    <ul className="relative space-y-3">
      {STEPS.map((step, idx) => {
        const active = idx === activeIdx;
        const reached = idx <= activeIdx;
        return (
          <li key={step.id} className="flex items-center gap-4">
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
              {active && !prefersReduced && (
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-accent/30"
                  initial={{ scale: 0.8, opacity: 0.6 }}
                  animate={{ scale: 1.4, opacity: 0 }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
              )}
              <motion.div
                className={cn(
                  'relative flex h-12 w-12 items-center justify-center rounded-full border transition-colors',
                  reached
                    ? 'border-accent bg-accent/15 text-accent'
                    : 'border-border bg-bg-elevated text-text-muted',
                )}
                animate={{ scale: active && !prefersReduced ? 1.08 : 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <step.Icon className="h-5 w-5" />
              </motion.div>
            </div>
            <div>
              <p
                className={cn(
                  'font-display text-sm font-semibold transition-colors',
                  reached ? 'text-text-primary' : 'text-text-muted',
                )}
              >
                {step.label}
              </p>
              <p className="text-[11px] leading-snug text-text-secondary">{step.detail}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
