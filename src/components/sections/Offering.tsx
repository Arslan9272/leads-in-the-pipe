import { motion, useReducedMotion } from 'framer-motion';

import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { LinkButton } from '@/components/ui/Button';
import { ArrowUpRight } from '@/components/icons/ArrowUpRight';
import { pricingTiers } from '@/data/pricing';
import { mailtoQuote } from '@/lib/constants';
import { cn } from '@/lib/utils';

function MarqueeColumn() {
  const word = 'OFFERING';
  const items = Array.from({ length: 14 }, (_, i) => `${word}-${i}`);

  return (
    <div
      aria-hidden="true"
      className="relative hidden h-[640px] w-[120px] overflow-hidden lg:block xl:w-[160px]"
    >
      <div className="marquee-track flex flex-col gap-6 py-2 will-change-transform animate-marquee-vertical motion-reduce:animate-none">
        {items.map((id) => (
          <span
            key={id}
            aria-hidden="true"
            className="block rotate-0 font-display text-3xl font-semibold uppercase tracking-tightest text-text-muted/70 xl:text-4xl"
            style={{ writingMode: 'vertical-rl' }}
          >
            {word}
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg to-transparent" />
    </div>
  );
}

export function Offering() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="offering"
      aria-labelledby="offering-heading"
      className="py-20 md:py-28 lg:py-32"
    >
      <Container>
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 max-w-2xl md:mb-16"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-text-muted">Pricing</p>
          <h2
            id="offering-heading"
            className="mt-3 font-display text-4xl font-semibold tracking-tight text-text-primary md:text-5xl lg:text-6xl"
          >
            Choose your offering
          </h2>
        </motion.div>

        <div className="flex gap-8 lg:gap-12">
          <MarqueeColumn />

          <ul className="flex-1 space-y-5">
            {pricingTiers.map((tier, i) => (
              <motion.li
                key={tier.id}
                initial={prefersReduced ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <Card className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-10">
                  <div className="md:max-w-md">
                    <h3
                      className={cn(
                        'font-display text-4xl font-semibold tracking-tightest md:text-5xl',
                        tier.accentClass,
                      )}
                    >
                      {tier.name}
                    </h3>
                    <p className="mt-3 text-sm text-text-secondary">{tier.description}</p>
                  </div>

                  <div className="flex flex-1 flex-col gap-6">
                    <ul className="space-y-2 text-sm text-text-secondary">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <span
                            aria-hidden="true"
                            className={cn(
                              'mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full',
                              tier.id === 'basic' && 'bg-tier-basic',
                              tier.id === 'standard' && 'bg-tier-standard',
                              tier.id === 'bespoke' && 'bg-tier-bespoke',
                            )}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <LinkButton
                      href={mailtoQuote(tier.name)}
                      variant="secondary"
                      size="md"
                      className="self-start"
                    >
                      Get a Quote
                      <ArrowUpRight />
                    </LinkButton>
                  </div>
                </Card>
              </motion.li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
