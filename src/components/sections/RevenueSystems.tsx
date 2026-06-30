import { useEffect, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

import { Container } from '@/components/ui/Container';
import { ToolLogo } from '@/components/icons/tools/ToolLogo';
import { TOOLS } from '@/data/tools';
import { cn } from '@/lib/utils';

const PILLARS = [
  {
    id: 'outbound',
    title: 'Targeted outbound',
    body: 'Verified contacts matched to your ICP, sequenced across email at volume.',
  },
  {
    id: 'linkedin',
    title: 'LinkedIn positioning',
    body: 'Warm, relevant touches that build familiarity before the ask.',
  },
  {
    id: 'messaging',
    title: 'Messaging that converts',
    body: 'Angles tested weekly and written the way your buyers actually buy.',
  },
  {
    id: 'crm',
    title: 'Pipeline & CRM',
    body: 'Replies scored, qualified, and booked straight onto your calendar.',
  },
];

// A curated subset of tool logos to animate as accents.
const ACCENT_IDS = [
  'instantly',
  'clay',
  'apollo',
  'sales-navigator',
  'ai-ark',
  'linkedin',
  'smartlead',
  'heyreach',
];
const ACCENT_TOOLS = ACCENT_IDS.map((id) => TOOLS.find((t) => t.id === id)).filter(
  (t): t is (typeof TOOLS)[number] => Boolean(t),
);
const EASE = [0.16, 1, 0.3, 1] as const;

export function RevenueSystems() {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-10%' });
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (prefersReduced) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % ACCENT_TOOLS.length);
    }, 1200);
    return () => window.clearInterval(id);
  }, [prefersReduced]);

  return (
    <section aria-labelledby="revenue-heading" className="px-4 pb-16 md:px-8 md:pb-24 lg:px-12">
      <div
        ref={sectionRef}
        className="mx-auto max-w-7xl rounded-3xl border border-accent/10 bg-surface-slab px-6 py-14 text-[#F2F5F0] shadow-glow md:px-12 md:py-20"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <motion.h2
              id="revenue-heading"
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.7, ease: EASE }}
              className="font-display text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl"
            >
              We don&apos;t run campaigns.{' '}
              <span className="relative whitespace-nowrap">
                We build
                <span className="ml-3 inline-block border-b-4 border-accent">revenue systems.</span>
              </span>
            </motion.h2>

            {/* Animated tool accents */}
            <div className="flex flex-wrap content-start items-start gap-3">
              {ACCENT_TOOLS.map((tool, i) => {
                const isActive = i === active;
                return (
                  <span
                    key={tool.id}
                    className={cn(
                      'inline-flex cursor-default items-center gap-2 rounded-full border bg-surface-slabCard px-3 py-2 text-sm transition-all duration-300 hover:border-accent/60 hover:text-accent motion-safe:hover:scale-[1.06]',
                      isActive
                        ? 'border-accent/60 text-accent'
                        : 'border-[#9EFB9C]/12 text-[#C2CBC1]',
                      isActive && !prefersReduced && 'scale-[1.04]',
                    )}
                  >
                    <ToolLogo
                      id={tool.id}
                      name={tool.name}
                      className={cn('h-5 w-5 transition-opacity duration-300', isActive ? 'opacity-100' : 'opacity-70')}
                    />
                    {tool.name}
                  </span>
                );
              })}
            </div>
          </div>

          <dl className="mt-14 grid gap-x-10 gap-y-10 border-t border-[#9EFB9C]/12 pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.id}
                initial={prefersReduced ? false : { opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.5, ease: EASE, delay: 0.1 + i * 0.08 }}
                className="group cursor-default rounded-2xl border border-transparent p-4 -m-4 transition-colors duration-200 hover:border-accent/25 hover:bg-accent/[0.04]"
              >
                <dt className="font-display text-lg font-semibold text-[#F2F5F0] transition-colors duration-200 group-hover:text-accent">
                  {p.title}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-[#C2CBC1]">{p.body}</dd>
              </motion.div>
            ))}
          </dl>
        </Container>
      </div>
    </section>
  );
}
