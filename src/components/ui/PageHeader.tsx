import { motion, useReducedMotion } from 'framer-motion';

import { Container } from '@/components/ui/Container';

export interface PageHeaderMetric {
  value: string;
  label: string;
}

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  /** Optional word/phrase inside `title` to highlight in mint. */
  highlight?: string;
  dek?: string;
  metrics?: PageHeaderMetric[];
}

const EASE = [0.16, 1, 0.3, 1] as const;

export function PageHeader({ eyebrow, title, highlight, dek, metrics }: PageHeaderProps) {
  const prefersReduced = useReducedMotion();

  const titleNode = highlight ? renderHighlighted(title, highlight) : title;

  return (
    <section className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40 lg:pb-28">
      <Container>
        <div className="max-w-3xl">
          <motion.p
            initial={prefersReduced ? false : { opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-accent"
          >
            <span aria-hidden="true" className="h-px w-6 bg-accent" />
            {eyebrow}
          </motion.p>

          <motion.h1
            initial={prefersReduced ? false : { opacity: 0, x: -48 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
            className="mt-6 font-display text-5xl font-medium leading-[1.02] tracking-tight text-text-primary md:text-6xl lg:text-7xl"
          >
            {titleNode}
          </motion.h1>

          {dek && (
            <motion.p
              initial={prefersReduced ? false : { opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary md:text-xl"
            >
              {dek}
            </motion.p>
          )}
        </div>

        {metrics && metrics.length > 0 && (
          <motion.dl
            initial={prefersReduced ? false : { opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.45 }}
            className="mt-12 grid grid-cols-2 gap-6 border-t border-border-subtle pt-8 md:mt-16 md:grid-cols-4"
          >
            {metrics.map((m) => (
              <div key={m.label}>
                <dt className="sr-only">{m.label}</dt>
                <dd>
                  <span className="block font-display text-3xl font-semibold text-accent md:text-4xl">
                    {m.value}
                  </span>
                  <span className="mt-1 block text-sm text-text-secondary">{m.label}</span>
                </dd>
              </div>
            ))}
          </motion.dl>
        )}
      </Container>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-accent/5 blur-[140px]"
      />
    </section>
  );
}

function renderHighlighted(title: string, highlight: string) {
  const idx = title.indexOf(highlight);
  if (idx === -1) return title;
  return (
    <>
      {title.slice(0, idx)}
      <span className="text-accent">{highlight}</span>
      {title.slice(idx + highlight.length)}
    </>
  );
}
