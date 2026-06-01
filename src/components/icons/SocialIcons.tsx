import { cn } from '@/lib/utils';
import type { SocialPlatform } from '@/data/social';

interface IconProps {
  className?: string;
}

const COMMON = {
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn('h-5 w-5', className)} {...COMMON}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn('h-5 w-5', className)} {...COMMON}>
      <path d="M15 3h-3a4 4 0 0 0-4 4v3H5v4h3v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function PinterestIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn('h-5 w-5', className)} {...COMMON}>
      <circle cx="12" cy="12" r="9" />
      <path d="M11 21 L13 13" />
      <path d="M9 15 c1.5 1.5 4 1 5-1 c1-2 0-4-2-4 c-2 0-3 2-2 4" />
    </svg>
  );
}

export function TwitterIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn('h-5 w-5', className)} {...COMMON}>
      <path d="M4 4 L11 13 L4 20" />
      <path d="M20 4 L13 13 L20 20" />
      <path d="M4 4 H8 L20 20 H16 Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SocialIcon({
  platform,
  className,
}: {
  platform: SocialPlatform;
  className?: string;
}) {
  switch (platform) {
    case 'instagram':
      return <InstagramIcon className={className} />;
    case 'facebook':
      return <FacebookIcon className={className} />;
    case 'pinterest':
      return <PinterestIcon className={className} />;
    case 'twitter':
      return <TwitterIcon className={className} />;
  }
}
