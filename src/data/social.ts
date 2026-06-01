export type SocialPlatform = 'instagram' | 'facebook' | 'pinterest' | 'twitter';

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
}

export const socialLinks: SocialLink[] = [
  { platform: 'instagram', label: 'Instagram', href: '#' },
  { platform: 'facebook', label: 'Facebook', href: '#' },
  { platform: 'pinterest', label: 'Pinterest', href: '#' },
  { platform: 'twitter', label: 'Twitter', href: '#' },
];
