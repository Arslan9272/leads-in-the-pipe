import { SECTION_IDS } from '@/lib/constants';

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: 'Intro', href: `#${SECTION_IDS.hero}` },
  { label: 'About', href: `#${SECTION_IDS.whatWeDo}` },
  { label: 'Pricing', href: `#${SECTION_IDS.offering}` },
  { label: 'Guide', href: `#${SECTION_IDS.articles}` },
];

export const footerNavLinks: NavLink[] = navLinks;
