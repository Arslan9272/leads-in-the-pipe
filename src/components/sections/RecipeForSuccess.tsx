import { motion, useReducedMotion } from 'framer-motion';

import { Container } from '@/components/ui/Container';
import { useCountUp } from '@/hooks/useCountUp';

interface Stat {
  id: string;
  target: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { id: 'clients', target: 60, suffix: '+', label: 'Happy clients' },
  { id: 'projects', target: 100, suffix: '+', label: 'Finished projects' },
  { id: 'growth', target: 230, suffix: '%', label: 'Average yearly growth rate' },
];

function StatBlock({ stat }: { stat: Stat }) {
  const { ref, value } = useCountUp({ target: stat.target });
  return (
    <div ref={ref} className="border-t border-border-subtle pt-8 md:border-l md:border-t-0 md:pl-8 md:pt-0">
      <div className="font-display text-5xl font-semibold tracking-tightest text-accent md:text-6xl lg:text-7xl">
        {value}
        <span aria-hidden="true">{stat.suffix}</span>
      </div>
      <p className="mt-3 text-sm uppercase tracking-[0.18em] text-text-secondary">{stat.label}</p>
    </div>
  );
}

export function RecipeForSuccess() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="recipe"
      aria-labelledby="recipe-heading"
      className="py-20 md:py-28 lg:py-32"
    >
      <Container>
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-text-muted">Results that compound</p>
          <h2
            id="recipe-heading"
            className="mt-3 font-display text-4xl font-semibold tracking-tight text-text-primary md:text-5xl lg:text-6xl"
          >
            Our recipe for success
          </h2>
          <p className="mt-6 text-base text-text-secondary md:text-lg">
            A tight loop of targeted SEO, considered visual design, and consistent content
            distribution — engineered to turn attention into pipeline.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-8 md:mt-20 md:grid-cols-3 md:gap-0">
          {stats.map((stat) => (
            <StatBlock key={stat.id} stat={stat} />
          ))}
        </div>
      </Container>
    </section>
  );
}
