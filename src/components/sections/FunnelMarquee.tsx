import { useReducedMotion } from 'framer-motion';

import { ToolLogo } from '@/components/icons/tools/ToolLogo';
import { TOOLS } from '@/data/tools';
import { cn } from '@/lib/utils';

interface FunnelMarqueeProps {
  reverse?: boolean;
}

export function FunnelMarquee({ reverse = false }: FunnelMarqueeProps) {
  const prefersReduced = useReducedMotion();

  const sequence = (
    <div className="flex shrink-0 items-center gap-8 pr-8 md:gap-12 md:pr-12" aria-hidden="true">
      {TOOLS.map((tool) => (
        <div key={tool.id} className="flex items-center gap-2.5">
          <ToolLogo id={tool.id} name={tool.name} className="h-6 w-6 md:h-7 md:w-7" />
          <span className="font-display text-sm font-medium tracking-tight text-text-secondary md:text-base">
            {tool.name}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <section
      aria-label="Tools we operate"
      className="relative border-y border-border-subtle bg-bg-surface py-4 md:py-5"
    >
      <div
        className="flex overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
      >
        <div
          className={cn(
            'marquee-track flex',
            !prefersReduced && (reverse ? 'animate-marquee-h-rev' : 'animate-marquee-h'),
          )}
        >
          {sequence}
          {sequence}
        </div>
      </div>
    </section>
  );
}
