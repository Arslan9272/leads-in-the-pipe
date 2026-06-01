import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Offering } from '@/components/sections/Offering';
import { pricingTiers } from '@/data/pricing';

describe('Offering', () => {
  it('renders the three pricing tiers in order', () => {
    render(<Offering />);
    const tiers = pricingTiers.map((t) => t.name);
    expect(tiers).toEqual(['Basic', 'Standard', 'Bespoke']);
    for (const name of tiers) {
      expect(screen.getByRole('heading', { level: 3, name })).toBeInTheDocument();
    }
  });

  it('renders a mailto Get-a-Quote link per tier with subject "Quote Request - {Tier}"', () => {
    render(<Offering />);
    const quoteLinks = screen.getAllByRole('link', { name: /get a quote/i });
    expect(quoteLinks).toHaveLength(3);

    for (let i = 0; i < pricingTiers.length; i++) {
      const tier = pricingTiers[i];
      const link = quoteLinks[i];
      const href = link.getAttribute('href') ?? '';
      expect(href.startsWith('mailto:')).toBe(true);
      const subject = decodeURIComponent(href.split('?subject=')[1] ?? '');
      expect(subject).toBe(`Quote Request - ${tier.name}`);
    }
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Offering />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
