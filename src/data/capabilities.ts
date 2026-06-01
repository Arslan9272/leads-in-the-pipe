export type CapabilityIconName =
  | 'icp'
  | 'infrastructure'
  | 'messaging'
  | 'outreach'
  | 'optimization'
  | 'meetings';

export interface Capability {
  id: string;
  title: string;
  description: string;
  icon: CapabilityIconName;
}

export const capabilities: Capability[] = [
  {
    id: 'icp-tam-mapping',
    title: 'ICP & TAM Mapping',
    description:
      'We define your ideal customer profile and size the market around it — so you know exactly who to chase, in what order, and why.',
    icon: 'icp',
  },
  {
    id: 'infrastructure-data',
    title: 'Infrastructure & Data',
    description:
      'Dedicated domains, warmed-up inboxes, and verified contact lists built to your ICP. The foundation that keeps you out of spam and in front of buyers.',
    icon: 'infrastructure',
  },
  {
    id: 'messaging-sequences',
    title: 'Messaging & Sequences',
    description:
      'Multi-channel campaigns across email and LinkedIn, written to mirror how your best customers actually buy — not how marketers wish they did.',
    icon: 'messaging',
  },
  {
    id: 'outreach-at-scale',
    title: 'Outreach at Scale',
    description:
      'Personalised, sequenced touches that feel one-to-one, executed at the volume needed to fill a pipeline.',
    icon: 'outreach',
  },
  {
    id: 'optimization',
    title: 'Optimization',
    description:
      'Weekly iteration on subject lines, angles, and segments. What works gets scaled; what doesn’t gets cut.',
    icon: 'optimization',
  },
  {
    id: 'qualified-meetings',
    title: 'Qualified Meetings',
    description:
      'Replies are scored, qualified, and booked straight onto your calendar — ready to close.',
    icon: 'meetings',
  },
];
