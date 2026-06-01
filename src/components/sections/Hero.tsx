import { motion, useReducedMotion } from 'framer-motion';

import { Container } from '@/components/ui/Container';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { PipeBubble } from '@/components/icons/PipeBubble';
import { useFormspree } from '@/hooks/useFormspree';
import { useToast } from '@/hooks/useToast';
import { useEffect } from 'react';

export function Hero() {
  const prefersReduced = useReducedMotion();
  const { email, setEmail, isValid, isSubmitting, status, submit } = useFormspree();
  const { show } = useToast();

  useEffect(() => {
    if (status === 'success') {
      show('success', 'Thanks — we will be in touch soon.');
    } else if (status === 'error') {
      show('error', 'Something went wrong. Please try again.');
    } else if (status === 'pending-setup') {
      show('info', 'Form setup pending. Reach us at hello@leadsinthepipe.com.');
    }
  }, [status, show]);

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40 lg:pb-32 lg:pt-44"
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-bg-card/60 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-text-secondary">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              B2B Lead Generation
            </p>
            <h1
              id="hero-heading"
              className="font-display text-5xl font-semibold leading-[0.95] tracking-tightest text-text-primary md:text-7xl lg:text-[88px]"
            >
              Leads In The Pipe
            </h1>
            <p className="mt-6 max-w-xl text-base text-text-secondary md:text-lg">
              Fueling your business growth with high-quality leads delivered straight to your
              pipeline.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                void submit();
              }}
              className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row"
              noValidate
            >
              <label htmlFor="hero-email" className="sr-only">
                Your work email
              </label>
              <Input
                id="hero-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" disabled={!isValid || isSubmitting} size="md">
                {isSubmitting ? 'Sending…' : 'Get a Quote'}
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={prefersReduced ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="relative mx-auto aspect-square w-full max-w-md lg:max-w-none"
          >
            <div className="absolute inset-0 animate-pulse-glow motion-reduce:animate-none">
              <PipeBubble />
            </div>
          </motion.div>
        </div>
      </Container>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-accent/10 blur-[120px]"
      />
    </section>
  );
}
