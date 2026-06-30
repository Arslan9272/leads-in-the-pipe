import { motion, useReducedMotion } from 'framer-motion';

import { Container } from '@/components/ui/Container';
import { CapabilityDiagram } from '@/components/sections/CapabilityDiagram';
import { capabilities } from '@/data/capabilities';

export function WhatWeDo() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="what-we-do"
      aria-labelledby="what-we-do-heading"
      className="border-y border-border-subtle bg-bg-surface py-20 md:py-28 lg:py-32"
    >
      <Container>
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.5 }}
          className="mb-16 max-w-2xl md:mb-20"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-text-muted">Our process</p>
          <h2
            id="what-we-do-heading"
            className="mt-3 font-display text-4xl font-semibold tracking-tight text-text-primary md:text-5xl lg:text-6xl"
          >
            What we do
          </h2>
          <p className="mt-6 max-w-md text-base text-text-secondary">
            Six capabilities from data to a meeting on your calendar — every one of them ours.
          </p>
        </motion.div>

        <ol className="space-y-16 md:space-y-24">
          {capabilities.map((cap, i) => {
            const reverse = i % 2 === 1;
            return (
              <li key={cap.id}>
                <div
                  className={
                    'grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ' +
                    (reverse ? 'lg:[&>*:first-child]:order-2' : '')
                  }
                >
                  <motion.div
                    initial={prefersReduced ? false : { opacity: 0, x: reverse ? 24 : -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-10%' }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs text-accent">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="h-px flex-1 bg-border-subtle" />
                      <span className="font-mono text-xs text-text-muted">
                        / {String(capabilities.length).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
                      {cap.title}
                    </h3>
                    <p className="mt-5 max-w-lg text-base leading-relaxed text-text-secondary">
                      {cap.description}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={prefersReduced ? false : { opacity: 0, x: reverse ? -24 : 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-10%' }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="lg:min-h-[380px]"
                  >
                    <CapabilityDiagram name={cap.icon} />
                  </motion.div>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
