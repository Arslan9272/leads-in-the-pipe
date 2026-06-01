import { motion, useReducedMotion } from 'framer-motion';

import { Container } from '@/components/ui/Container';
import { SunStar } from '@/components/icons/SunStar';
import { ArrowUpRight } from '@/components/icons/ArrowUpRight';
import { CONTACT_EMAIL } from '@/lib/constants';

export function LetsTalk() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="lets-talk"
      aria-labelledby="lets-talk-heading"
      className="relative overflow-hidden py-24 md:py-32 lg:py-40"
    >
      <Container>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          aria-labelledby="lets-talk-heading"
          className="group block focus-visible:rounded-3xl"
        >
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative grid items-center gap-10 md:grid-cols-[2fr_1fr]"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-text-muted">Stay in touch</p>
              <h2
                id="lets-talk-heading"
                className="mt-4 flex flex-wrap items-baseline gap-x-6 font-display text-6xl font-semibold leading-[0.95] tracking-tightest text-text-primary md:text-8xl lg:text-[140px]"
              >
                Let&apos;s Talk
                <ArrowUpRight className="h-12 w-12 text-accent transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 md:h-16 md:w-16" />
              </h2>
              <p className="mt-6 text-base text-text-secondary md:text-lg">
                Feel free to contact us.
              </p>
            </div>

            <div className="flex justify-center md:justify-end">
              <div className="relative h-40 w-40 md:h-56 md:w-56 lg:h-64 lg:w-64">
                <div className="absolute inset-0 animate-spin-slow motion-reduce:animate-none">
                  <SunStar />
                </div>
              </div>
            </div>
          </motion.div>
        </a>
      </Container>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-accent/10 blur-[140px]"
      />
    </section>
  );
}
