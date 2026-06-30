export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    id: 'what-you-do',
    question: 'What exactly do you do?',
    answer:
      'We build and run outbound revenue systems — ICP research, infrastructure, messaging, multi-channel outreach, and CRM — and book qualified meetings straight onto your calendar.',
  },
  {
    id: 'different',
    question: 'How are you different from other agencies?',
    answer:
      'Most agencies run disconnected campaigns. We build a system: data, deliverability, messaging, and pipeline reporting that compounds over time instead of resetting every month.',
  },
  {
    id: 'who-for',
    question: 'Who is this a good fit for?',
    answer:
      'B2B teams with a defined offer and a sales motion that can handle more qualified meetings — founders validating a pitch through to growth-stage teams scaling outbound.',
  },
  {
    id: 'timeline',
    question: 'How quickly do we see results?',
    answer:
      'Infrastructure and warm-up take the first few weeks. Most clients see their first qualified meetings within four to six weeks, with volume building from there.',
  },
  {
    id: 'audit',
    question: 'What does the free pipeline audit include?',
    answer:
      'A review of your ICP, current outbound, deliverability, and messaging, plus a short questionnaire and a clear picture of where pipeline is leaking — no commitment.',
  },
  {
    id: 'not-do',
    question: 'What do you not do?',
    answer:
      'We focus on outbound revenue systems. We do not run paid ads, SEO, or content marketing — if that is what you need, we will tell you honestly.',
  },
];

/** Shorter slice for the home-page teaser. */
export const faqHomeItems: FaqItem[] = faqItems.slice(0, 4);
