export interface Article {
  id: string;
  date: string;
  tag: string;
  title: string;
  href: string;
}

export const articles: Article[] = [
  {
    id: 'fundraising-strategies',
    date: 'Sep 24, 2023',
    tag: 'Articles',
    title: 'How to raise capital: 5 fundraising strategies for your startup',
    href: '#',
  },
  {
    id: 'wash-your-hands',
    date: 'Sep 24, 2023',
    tag: 'Articles',
    title: '“Wash your hands” is the new idea',
    href: '#',
  },
  {
    id: 'positioning',
    date: 'Sep 24, 2023',
    tag: 'Articles',
    title:
      'Positioning can make or break a new product, yet it rarely gets the attention it deserves. In this talk.',
    href: '#',
  },
];
