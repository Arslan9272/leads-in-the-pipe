export interface Symptom {
  id: string;
  title: string;
  body: string;
}

/** Common pipeline problems B2B teams recognise — the "sound familiar?" list. */
export const symptoms: Symptom[] = [
  {
    id: 'dry-pipeline',
    title: 'Pipeline runs dry between referrals',
    body: 'Growth stalls the moment word-of-mouth slows, and there is no predictable system to fall back on.',
  },
  {
    id: 'reps-prospecting',
    title: 'Reps prospect more than they close',
    body: 'Your closers burn hours building lists and chasing cold contacts instead of selling.',
  },
  {
    id: 'spam',
    title: 'Outreach lands in spam',
    body: 'Burned domains and cold inboxes quietly kill deliverability before a single buyer reads you.',
  },
  {
    id: 'unqualified',
    title: 'Leads show up unqualified',
    body: 'Calendars fill with meetings that were never a fit, and win rates pay the price.',
  },
  {
    id: 'ignored',
    title: 'Messaging gets ignored',
    body: 'Generic, templated sequences blend into the noise and never earn a reply.',
  },
  {
    id: 'unpredictable',
    title: 'No predictable meeting volume',
    body: 'Some months are flooded, others are empty — you cannot forecast pipeline with any confidence.',
  },
];
