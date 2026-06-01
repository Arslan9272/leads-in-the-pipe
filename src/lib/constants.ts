export const SITE_NAME = 'Leads In The Pipe';
export const SITE_TAGLINE = 'Quality B2B Leads, Delivered';

export const CONTACT_EMAIL =
  import.meta.env.VITE_CONTACT_EMAIL ?? 'hello@leadsinthepipe.com';

export const CONTACT_PHONE = '+1 (334) 041-3301';
export const ADDRESS_LINE_1 = '14 New South Head Rd';
export const ADDRESS_LINE_2 = 'Triple Bay 3148';

export const SECTION_IDS = {
  hero: 'hero',
  qualityLeads: 'quality-leads',
  services: 'services',
  recipe: 'recipe',
  whatWeDo: 'what-we-do',
  offering: 'offering',
  articles: 'articles',
  letsTalk: 'lets-talk',
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

export function mailtoQuote(tier: string): string {
  const subject = encodeURIComponent(`Quote Request - ${tier}`);
  return `mailto:${CONTACT_EMAIL}?subject=${subject}`;
}
