export type ServiceIconName =
  | 'targeted-prospecting'
  | 'multi-channel-outreach'
  | 'appointments'
  | 'account-mgmt'
  | 'database'
  | 'campaign-optimization';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: ServiceIconName;
}

export const services: Service[] = [
  {
    id: 'targeted-prospecting',
    title: 'Targeted Prospecting',
    description: 'Identify and prioritize the decision-makers that matter most.',
    icon: 'targeted-prospecting',
  },
  {
    id: 'multi-channel-outreach',
    title: 'Multi-Channel Outreach',
    description: 'Engage prospects via email, LinkedIn, and phone campaigns.',
    icon: 'multi-channel-outreach',
  },
  {
    id: 'appointment-setting',
    title: 'Appointment Setting',
    description: 'Schedule qualified meetings directly for your sales team.',
    icon: 'appointments',
  },
  {
    id: 'account-management',
    title: 'Account Management',
    description:
      'Strengthen client relationships with our expert Account Management services.',
    icon: 'account-mgmt',
  },
  {
    id: 'corporate-contact-database',
    title: 'Corporate Contact Database',
    description:
      'With the help of our data-extraction professionals, we source data tailored to your ideal customer profile.',
    icon: 'database',
  },
  {
    id: 'campaign-optimization',
    title: 'Campaign Optimization',
    description: 'Test messaging, timing, and channels for maximum ROI.',
    icon: 'campaign-optimization',
  },
];
