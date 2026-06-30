import { motion, useReducedMotion } from 'framer-motion';

import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { ServiceIcon } from '@/components/icons/ServiceIcon';
import { WorkflowAnimation } from '@/components/sections/WorkflowAnimation';
import { services } from '@/data/services';

export function Services() {
  const prefersReduced = useReducedMotion();

  const parentVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08 },
    },
  };

  const childVariants = {
    hidden: prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  const leftColumn = services.slice(0, 3);
  const bottomRow = services.slice(3, 6);

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="border-y border-border-subtle bg-bg-surface py-20 md:py-28 lg:py-32"
    >
      <Container>
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.5 }}
          className="mb-12 max-w-2xl md:mb-16"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-text-muted">What we deliver</p>
          <h2
            id="services-heading"
            className="mt-3 font-display text-4xl font-semibold tracking-tight text-text-primary md:text-5xl lg:text-6xl"
          >
            Services we provide
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-text-secondary md:text-base">
            Our services form an{' '}
            <span className="font-display font-semibold text-accent">L</span> — every stage of
            lead generation, working in sequence.
          </p>
        </motion.div>

        {/* Mobile: workflow first, then stacked services */}
        <motion.div
          variants={parentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-5%' }}
          className="space-y-4 lg:hidden"
        >
          <motion.div variants={childVariants}>
            <WorkflowAnimation />
          </motion.div>
          {services.map((service) => (
            <motion.div key={service.id} variants={childVariants}>
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>

        {/* Desktop: L-shape grid */}
        <motion.div
          variants={parentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-5%' }}
          className="hidden lg:grid lg:grid-cols-4 lg:gap-4"
          aria-label="Services arranged in an L shape with animated pipeline"
        >
          {/* Left column (rows 1-3): services 1-3 */}
          <div className="contents">
            {leftColumn.map((service, idx) => (
              <motion.div
                key={service.id}
                variants={childVariants}
                className="col-start-1"
                style={{ gridRowStart: idx + 1 }}
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </div>

          {/* Workflow box (cols 2-4, rows 1-3) */}
          <motion.div
            variants={childVariants}
            className="col-start-2 col-end-5 row-start-1 row-end-4"
          >
            <WorkflowAnimation />
          </motion.div>

          {/* Bottom row (row 4): services 4-6 */}
          <div className="contents">
            {bottomRow.map((service, idx) => (
              <motion.div
                key={service.id}
                variants={childVariants}
                className="row-start-4"
                style={{ gridColumnStart: idx + 2 }}
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}

            {/* Corner cap (col 1, row 4) — completes the L visually */}
            <motion.div
              variants={childVariants}
              className="col-start-1 row-start-4 flex items-center justify-center rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/15 via-bg-card to-bg-card p-6"
              aria-hidden="true"
            >
              <span className="font-display text-7xl font-semibold leading-none tracking-tighter text-accent">
                L
              </span>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

function ServiceCard({ service }: { service: (typeof services)[number] }) {
  return (
    <Card interactive className="flex h-full flex-col">
      <ServiceIcon
        name={service.icon}
        className="mb-5 h-10 w-10 text-accent transition-colors duration-300 group-hover/card:text-accent"
      />
      <h3 className="font-display text-lg font-semibold text-text-primary transition-colors duration-300 group-hover/card:text-accent">
        {service.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">{service.description}</p>
    </Card>
  );
}
