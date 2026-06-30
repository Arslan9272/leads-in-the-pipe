import { cn } from '@/lib/utils';
import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  interactive?: boolean;
  className?: string;
}

export function Card({ children, interactive = false, className, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-border bg-bg-card p-6 md:p-8',
        interactive &&
          'group/card transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02] hover:border-accent-dim hover:bg-bg-elevated hover:shadow-glow focus-within:border-accent-dim focus-within:shadow-glow motion-reduce:hover:scale-100 motion-reduce:hover:shadow-none',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
