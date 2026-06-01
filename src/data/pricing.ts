export type TierId = 'basic' | 'standard' | 'bespoke';

export interface PricingTier {
  id: TierId;
  name: string;
  accentClass: string;
  description: string;
  features: string[];
}

export const pricingTiers: PricingTier[] = [
  {
    id: 'basic',
    name: 'Basic',
    accentClass: 'text-tier-basic',
    description:
      'For founders who need a steady flow of qualified meetings to validate their pitch.',
    features: [
      'ICP definition workshop',
      'Up to 1,500 verified contacts/month',
      'Multi-channel outreach (email + LinkedIn)',
      'Qualified meetings booked to your calendar',
      'Monthly performance report',
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    accentClass: 'text-tier-standard',
    description:
      'For growth-stage teams scaling outbound alongside an internal SDR function.',
    features: [
      'Everything in Basic',
      'Up to 4,000 verified contacts/month',
      'Email, LinkedIn, and cold-call cadences',
      'A/B tested messaging + iteration',
      'Dedicated account manager',
      'CRM integration and pipeline reporting',
    ],
  },
  {
    id: 'bespoke',
    name: 'Bespoke',
    accentClass: 'text-tier-bespoke',
    description:
      'Our solutions will be tailored around your individual sales objectives.',
    features: [
      'Custom playbook designed to your funnel',
      'Unlimited verified contacts',
      'Full-cycle SDR team, white-labelled',
      'Bespoke CRM and analytics setup',
      'Strategic quarterly business reviews',
    ],
  },
];
