import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import { Container } from '@/components/ui/Container';
import { ToolLogo } from '@/components/icons/tools/ToolLogo';
import { TOOLS, TOOL_CATEGORIES } from '@/data/tools';
import type { ToolCategory } from '@/data/tools';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

// Each category node sits on one point of the diamond.
const NODE_POS: Record<ToolCategory, string> = {
  Outbound: 'left-1/2 top-0 -translate-x-1/2',
  LinkedIn: 'right-0 top-1/2 -translate-y-1/2',
  Messaging: 'left-1/2 bottom-0 -translate-x-1/2',
  'Pipeline & CRM': 'left-0 top-1/2 -translate-y-1/2',
};

const toolsByCategory = (category: ToolCategory) => TOOLS.filter((t) => t.category === category);

export function ToolStack() {
  const prefersReduced = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (prefersReduced) return;
    const id = window.setInterval(() => setStep((s) => s + 1), 2600);
    return () => window.clearInterval(id);
  }, [prefersReduced]);

  const activeIndex = step % TOOL_CATEGORIES.length;

  return (
    <section
      aria-labelledby="toolstack-heading"
      className="px-4 py-10 md:px-8 md:py-14 lg:px-12"
    >
      <div className="mx-auto max-w-6xl rounded-3xl border border-accent/10 bg-surface-slab px-6 py-10 shadow-glow md:px-10 md:py-12">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
            {/* Text — left */}
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                Your sales stack, operated
              </p>
              <h2
                id="toolstack-heading"
                className="mt-4 font-display text-3xl font-medium leading-[1.1] tracking-tight text-[#F2F5F0] md:text-5xl"
              >
                We operate your B2B sales stack end to end.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-[#C2CBC1]">
                Outbound, LinkedIn, messaging, and pipeline — the best-in-class tools, run by our
                team as one connected system so you never have to wire it together yourself.
              </p>

              <ul className="mt-8 flex flex-wrap gap-2">
                {TOOL_CATEGORIES.map((category, i) => (
                  <li key={category}>
                    <span
                      className={cn(
                        'inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] transition-colors duration-300',
                        i === activeIndex
                          ? 'border-accent/50 text-accent'
                          : 'border-[#9EFB9C]/15 text-[#8A938A]',
                      )}
                    >
                      {category}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Diamond — right */}
            <DiamondStack
              step={step}
              activeIndex={activeIndex}
              prefersReduced={Boolean(prefersReduced)}
            />
          </div>
        </Container>
      </div>
    </section>
  );
}

interface DiamondStackProps {
  step: number;
  activeIndex: number;
  prefersReduced: boolean;
}

function DiamondStack({ step, activeIndex, prefersReduced }: DiamondStackProps) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[24rem]">
      {/* Diamond frame + travelling node */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        fill="none"
      >
        <polygon
          points="50,16 84,50 50,84 16,50"
          stroke="#9EFB9C"
          strokeOpacity="0.18"
          strokeWidth="0.5"
        />
        {!prefersReduced && (
          <motion.circle
            r="1.8"
            fill="#9EFB9C"
            initial={false}
            animate={{ cx: [50, 84, 50, 16, 50], cy: [16, 50, 84, 50, 16] }}
            transition={{ duration: 10.4, ease: 'linear', repeat: Infinity }}
          />
        )}
      </svg>

      {/* Category nodes — each holds a shifting tool logo */}
      {TOOL_CATEGORIES.map((category, i) => {
        const tools = toolsByCategory(category);
        const tool = tools[(step + i) % tools.length];
        const isActive = i === activeIndex;
        return (
          <div
            key={category}
            className={cn('absolute z-10 w-24 md:w-28', NODE_POS[category])}
          >
            <div
              className={cn(
                'flex flex-col items-center gap-1.5 rounded-2xl border bg-surface-slabCard px-2.5 py-3 text-center transition-all duration-500',
                isActive
                  ? 'border-accent/60 shadow-[0_0_0_4px_rgba(158,251,156,0.10)]'
                  : 'border-[#9EFB9C]/12',
                isActive && !prefersReduced && 'scale-105',
              )}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#8A938A]">
                {category}
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={tool.id}
                  initial={prefersReduced ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReduced ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="flex flex-col items-center gap-1.5"
                >
                  <ToolLogo
                    id={tool.id}
                    name={tool.name}
                    className={cn(
                      'h-8 w-8 transition-opacity duration-500',
                      isActive ? 'opacity-100' : 'opacity-60',
                    )}
                  />
                  <span
                    className={cn(
                      'font-display text-xs font-semibold',
                      isActive ? 'text-[#F2F5F0]' : 'text-[#C2CBC1]',
                    )}
                  >
                    {tool.name}
                  </span>
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        );
      })}

      {/* Quiet centre label */}
      <div className="absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 text-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8A938A]">
          One system
        </span>
      </div>
    </div>
  );
}
