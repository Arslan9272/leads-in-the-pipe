import { motion, useReducedMotion } from 'framer-motion';

import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { symptoms } from '@/data/symptoms';

const EASE = [0.16, 1, 0.3, 1] as const;

export function CommonSymptoms() {
  const prefersReduced = useReducedMotion();

  return (
    <section aria-labelledby="symptoms-heading" className="py-20 md:py-28">
      <Container>
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.5, ease: EASE }}
          className="max-w-2xl"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Sound familiar?</p>
          <h2
            id="symptoms-heading"
            className="mt-4 font-display text-3xl font-medium tracking-tight text-text-primary md:text-5xl"
          >
            The symptoms of a leaking pipeline
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            If two or more of these sound like your team, the problem is not effort — it is the
            absence of a system.
          </p>
        </motion.div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {symptoms.map((symptom, i) => (
            <motion.li
              key={symptom.id}
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.06 }}
            >
              <Card interactive className="flex h-full flex-col">
                <span
                  aria-hidden="true"
                  className="font-mono text-sm text-text-muted transition-colors duration-300 group-hover/card:text-accent"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-text-primary transition-colors duration-300 group-hover/card:text-accent">
                  {symptom.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{symptom.body}</p>
              </Card>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
