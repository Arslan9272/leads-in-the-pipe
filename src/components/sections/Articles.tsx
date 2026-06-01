import { motion, useReducedMotion } from 'framer-motion';

import { Container } from '@/components/ui/Container';
import { ArrowUpRight } from '@/components/icons/ArrowUpRight';
import { articles } from '@/data/articles';

export function Articles() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="articles"
      aria-labelledby="articles-heading"
      className="border-y border-border-subtle bg-bg-surface py-20 md:py-28 lg:py-32"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs uppercase tracking-[0.25em] text-text-muted">Insights</p>
            <h2
              id="articles-heading"
              className="mt-3 font-display text-4xl font-semibold tracking-tight text-text-primary md:text-5xl lg:text-6xl"
            >
              Articles &amp; News
            </h2>
            <a
              href="#"
              className="group mt-6 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent"
            >
              Browse all
              <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight />
              </span>
            </a>
          </motion.div>

          <ul className="space-y-2">
            {articles.map((article, i) => (
              <motion.li
                key={article.id}
                initial={prefersReduced ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative border-t border-border-subtle"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100"
                />
                <a
                  href={article.href}
                  className="block rounded-lg py-6 transition-transform duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 motion-safe:group-hover:translate-x-1"
                >
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-text-muted">
                    <span className="rounded-full border border-border px-3 py-1 transition-colors duration-300 group-hover:border-accent/40 group-hover:text-accent">
                      {article.tag}
                    </span>
                    <span>{article.date}</span>
                  </div>
                  <h3 className="mt-4 max-w-3xl font-display text-2xl font-medium text-text-primary transition-colors duration-300 group-hover:text-accent md:text-3xl">
                    {article.title}
                  </h3>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors duration-300 group-hover:text-accent">
                    Learn more
                    <span className="transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-0.5">
                      <ArrowUpRight />
                    </span>
                  </span>
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
