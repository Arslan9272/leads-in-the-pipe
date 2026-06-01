import { cn } from '@/lib/utils';

interface SunStarProps {
  className?: string;
}

export function SunStar({ className }: SunStarProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={cn('h-full w-full text-accent', className)}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M50 0 C50 32, 50 32, 100 50 C50 68, 50 68, 50 100 C50 68, 50 68, 0 50 C50 32, 50 32, 50 0 Z" />
    </svg>
  );
}
