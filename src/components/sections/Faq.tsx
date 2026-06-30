import { useId, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import { Container } from '@/components/ui/Container';
import type { FaqItem } from '@/data/faq';
import { faqItems } from '@/data/faq';
import { cn } from '@/lib/utils';

interface FaqProps {
  items?: FaqItem[];
  eyebrow?: string;
  title?: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export function Faq({
  items = faqItems,
  eyebrow = 'FAQ',
  title = 'Common questions',
}: FaqProps) {
  return (
    <section aria-labelledby="faq-heading" className="py-20 md:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
            <h2
              id="faq-heading"
              className="mt-4 font-display text-3xl font-medium tracking-tight text-text-primary md:text-5xl"
            >
              {title}
            </h2>
          </div>

          <ul className="border-t border-border">
            {items.map((item) => (
              <FaqRow key={item.id} item={item} />
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

function FaqRow({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);
  const prefersReduced = useReducedMotion();
  const panelId = useId();
  const buttonId = useId();

  return (
    <li className="border-b border-border">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
          className="group flex w-full items-center justify-between gap-6 py-6 text-left"
        >
          <span
            className={cn(
              'font-display text-lg font-medium transition-colors md:text-xl',
              open ? 'text-accent' : 'text-text-primary group-hover:text-accent',
            )}
          >
            {item.question}
          </span>
          <span
            aria-hidden="true"
            className={cn(
              'shrink-0 text-2xl leading-none transition-all duration-300',
              open ? 'rotate-45 text-accent' : 'text-text-muted group-hover:text-accent',
            )}
          >
            +
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={prefersReduced ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={prefersReduced ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-6 text-base leading-relaxed text-text-secondary">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
