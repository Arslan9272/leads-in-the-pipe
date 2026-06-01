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
          'transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:bg-bg-elevated',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
