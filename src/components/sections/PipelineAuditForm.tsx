import { useEffect, useState, type ReactElement } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import { Container } from '@/components/ui/Container';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuditForm } from '@/hooks/useAuditForm';
import type { AuditTextField } from '@/hooks/useAuditForm';
import { useToast } from '@/hooks/useToast';
import { cn } from '@/lib/utils';

/**
 * Demo walkthrough video. Drop a real file in /public (e.g. /demo.mp4) or paste
 * a hosted URL here and the player renders automatically; until then a polished
 * placeholder is shown.
 */
const DEMO_VIDEO_URL = '';
const DEMO_POSTER_URL = '';

const REVENUE_OPTIONS = ['Pre-revenue', 'Under $1M', '$1M–$5M', '$5M–$20M', '$20M+'];
const MEETING_OPTIONS = ['0–5 / month', '5–15 / month', '15–40 / month', '40+ / month'];
const CHANNEL_OPTIONS = ['Email', 'LinkedIn', 'Cold calling', 'Paid ads', 'Referrals'];

const labelClass = 'font-mono text-xs uppercase tracking-[0.15em] text-text-secondary';
const fieldClass =
  'h-11 w-full rounded-full border border-border bg-bg-card px-5 text-sm text-text-primary placeholder:text-text-muted focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40';

export function PipelineAuditForm() {
  const { values, errors, status, isSubmitting, setField, toggleChannel, blurField, submit } =
    useAuditForm();
  const { show } = useToast();

  useEffect(() => {
    if (status === 'success') {
      show('success', 'Thanks — we will reply shortly with your audit questionnaire.');
    } else if (status === 'error') {
      show('error', 'Something went wrong. Please try again.');
    } else if (status === 'pending-setup') {
      show('info', 'Form setup pending. Please try again shortly.');
    }
  }, [status, show]);

  function textField(field: AuditTextField, label: string, props: { type?: string; placeholder?: string } = {}) {
    return (
      <div>
        <label htmlFor={`audit-${field}`} className={labelClass}>
          {label}
        </label>
        <Input
          id={`audit-${field}`}
          className="mt-2"
          type={props.type ?? 'text'}
          placeholder={props.placeholder}
          value={values[field]}
          errorMessage={errors[field]}
          onChange={(e) => setField(field, e.target.value)}
          onBlur={() => blurField(field)}
        />
        {errors[field] && (
          <p className="mt-1.5 text-xs text-tier-bespoke">{errors[field]}</p>
        )}
      </div>
    );
  }

  return (
    <section aria-labelledby="audit-heading" className="py-16 md:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-16">
          <div className="max-w-xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">No commitment</p>
          <h2
            id="audit-heading"
            className="mt-4 font-display text-3xl font-medium tracking-tight text-text-primary md:text-4xl"
          >
            Book your free pipeline audit
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Tell us where you are. We will reply shortly with a short questionnaire and a calendar
            link.
          </p>

          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              void submit();
            }}
            className="mt-10 space-y-6"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              {textField('name', 'Name')}
              {textField('email', 'Work email', { type: 'email', placeholder: 'you@company.com' })}
              {textField('company', 'Company')}
              {textField('website', 'Website', { placeholder: 'company.com' })}
              {textField('role', 'Your role')}
              <div>
                <label htmlFor="audit-revenue" className={labelClass}>
                  Revenue range
                </label>
                <select
                  id="audit-revenue"
                  className={cn(fieldClass, 'mt-2')}
                  value={values.revenue}
                  onChange={(e) => setField('revenue', e.target.value)}
                >
                  <option value="">Select…</option>
                  {REVENUE_OPTIONS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="audit-meetings" className={labelClass}>
                Meetings booked now
              </label>
              <select
                id="audit-meetings"
                className={cn(fieldClass, 'mt-2')}
                value={values.meetings}
                onChange={(e) => setField('meetings', e.target.value)}
              >
                <option value="">Select…</option>
                {MEETING_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>

            <fieldset>
              <legend className={labelClass}>Active channels</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {CHANNEL_OPTIONS.map((channel) => {
                  const checked = values.channels.includes(channel);
                  return (
                    <label
                      key={channel}
                      className={cn(
                        'cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors',
                        checked
                          ? 'border-accent bg-accent/10 text-accent'
                          : 'border-border text-text-secondary hover:border-accent-dim hover:text-accent',
                      )}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={checked}
                        onChange={() => toggleChannel(channel)}
                      />
                      {channel}
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div>
              <label htmlFor="audit-challenge" className={labelClass}>
                Primary challenge
              </label>
              <textarea
                id="audit-challenge"
                rows={3}
                placeholder="What is the biggest gap in your pipeline right now?"
                className={cn(
                  fieldClass,
                  'mt-2 h-auto resize-none rounded-2xl py-3 leading-relaxed',
                )}
                value={values.challenge}
                onChange={(e) => setField('challenge', e.target.value)}
              />
            </div>

            <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
              {isSubmitting ? 'Sending…' : 'Book my pipeline audit'}
            </Button>
          </form>
          </div>

          <DemoAside />
        </div>
      </Container>
    </section>
  );
}

const STEPS = [
  'Tell us about your company and where pipeline is leaking.',
  'We review your outbound and reply with a short questionnaire.',
  'Pick a slot from the calendar link — no commitment.',
];

function DemoAside() {
  return (
    <div className="lg:pt-9">
      <div className="rounded-2xl border border-border bg-bg-card p-2">
        <div className="relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-bg-elevated via-bg-card to-bg">
          {DEMO_VIDEO_URL ? (
            <video
              className="h-full w-full object-cover"
              src={DEMO_VIDEO_URL}
              poster={DEMO_POSTER_URL || undefined}
              controls
              preload="metadata"
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <DemoFlow />
          )}
        </div>
      </div>

      <h3 className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-text-muted">
        How it works
      </h3>
      <ol className="mt-4 space-y-4">
        {STEPS.map((step, i) => (
          <li key={i} className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-accent/40 font-mono text-xs text-accent">
              {i + 1}
            </span>
            <span className="text-sm leading-relaxed text-text-secondary">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Animated "how it works" flow — a lightweight looping explainer that stands  */
/* in for a demo video.                                                        */
/* -------------------------------------------------------------------------- */

const SVG = {
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

type FlowIcon = (props: { className?: string }) => ReactElement;

const FormGlyph: FlowIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...SVG}>
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <path d="M8 8h8M8 12h8M8 16h5" />
  </svg>
);

const ReviewGlyph: FlowIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...SVG}>
    <circle cx="11" cy="11" r="6" />
    <path d="M20 20l-4.3-4.3" />
  </svg>
);

const ChecklistGlyph: FlowIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...SVG}>
    <path d="M4 6l1.5 1.5L8 5M4 12l1.5 1.5L8 11M4 18l1.5 1.5L8 17" />
    <path d="M12 6h8M12 12h8M12 18h6" />
  </svg>
);

const CalendarGlyph: FlowIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...SVG}>
    <rect x="4" y="5" width="16" height="16" rx="2" />
    <path d="M4 9h16M8 3v4M16 3v4M9 15l2 2 4-4" />
  </svg>
);

const FLOW_STEPS: { label: string; Icon: FlowIcon }[] = [
  { label: 'Fill the form', Icon: FormGlyph },
  { label: 'We review', Icon: ReviewGlyph },
  { label: 'Questionnaire', Icon: ChecklistGlyph },
  { label: 'Book a call', Icon: CalendarGlyph },
];

function DemoFlow() {
  const prefersReduced = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (prefersReduced) return;
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % FLOW_STEPS.length);
    }, 1400);
    return () => window.clearInterval(id);
  }, [prefersReduced]);

  return (
    <div className="flex h-full w-full flex-col justify-center gap-6 p-5 sm:p-7">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-accent/15 blur-3xl"
      />

      <div className="relative flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
          Workflow
        </span>
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-1.5 w-1.5 rounded-full bg-tier-bespoke/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-accent/40" />
          <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
        </span>
      </div>

      <div className="relative" role="img" aria-label="From filling the form to booking a call">
        {/* Track + animated progress */}
        <div aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-5 h-px bg-border" />
        <motion.div
          aria-hidden="true"
          className="absolute left-[12.5%] top-5 h-px origin-left bg-accent"
          style={{ right: '12.5%' }}
          initial={false}
          animate={{ scaleX: prefersReduced ? 1 : (active + 1) / FLOW_STEPS.length }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />

        <ul className="relative grid grid-cols-4 gap-1">
          {FLOW_STEPS.map((step, i) => {
            const reached = i <= active;
            const isActive = i === active;
            return (
              <li key={step.label} className="flex flex-col items-center gap-2 text-center">
                <div className="relative flex h-10 w-10 items-center justify-center">
                  {isActive && !prefersReduced && (
                    <motion.span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-accent/30"
                      initial={{ scale: 0.8, opacity: 0.6 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    />
                  )}
                  <motion.div
                    className={cn(
                      'relative flex h-10 w-10 items-center justify-center rounded-full border transition-colors',
                      reached
                        ? 'border-accent bg-accent/15 text-accent'
                        : 'border-border bg-bg-elevated text-text-muted',
                    )}
                    animate={{ scale: isActive && !prefersReduced ? 1.1 : 1 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <step.Icon className="h-5 w-5" />
                  </motion.div>
                </div>
                <span
                  className={cn(
                    'text-[10px] font-medium leading-tight transition-colors sm:text-[11px]',
                    reached ? 'text-text-primary' : 'text-text-muted',
                  )}
                >
                  {step.label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="relative text-center text-[11px] text-text-muted">
        A simple, no-commitment path to a booked audit.
      </p>
    </div>
  );
}
