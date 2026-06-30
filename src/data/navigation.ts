import { ROUTES } from '@/lib/constants';

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: 'Home', href: ROUTES.home },
  { label: 'Services', href: ROUTES.services },
  { label: 'About', href: ROUTES.about },
  { label: 'Pricing', href: ROUTES.pricing },
  { label: 'Contact', href: ROUTES.contact },
];

export const NAV_CTA: NavLink = { label: 'Book a free audit', href: ROUTES.contact };

export const footerNavLinks: NavLink[] = navLinks;
