import { CONTACT_LINKEDIN } from '@/lib/constants';

export type SocialPlatform = 'linkedin' | 'instagram' | 'facebook' | 'pinterest' | 'twitter';

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
}

export const socialLinks: SocialLink[] = [
  { platform: 'linkedin', label: 'LinkedIn', href: CONTACT_LINKEDIN },
];
