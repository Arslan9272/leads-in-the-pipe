import { motion, useReducedMotion } from 'framer-motion';

import { Container } from '@/components/ui/Container';
import { PipeFitting } from '@/components/icons/PipeFitting';

export function QualityLeads() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="quality-leads"
      aria-labelledby="quality-leads-heading"
      className="py-20 md:py-28 lg:py-32"
    >
      <Container>
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16"
        >
          <div className="relative mx-auto aspect-square w-full max-w-sm">
            <PipeFitting />
          </div>
          <div>
            <h2
              id="quality-leads-heading"
              className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-text-primary md:text-5xl lg:text-6xl"
            >
              Non-Stop Flow of <span className="text-accent">Quality Leads</span>
            </h2>
            <p className="mt-6 max-w-xl text-base text-text-secondary md:text-lg">
              We ensure your sales funnel is never dry, and the lead flow is never slow by bringing
              the right people at the right time to the right place for you.
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
