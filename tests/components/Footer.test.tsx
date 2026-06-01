import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Footer } from '@/components/sections/Footer';
import { socialLinks } from '@/data/social';

describe('Footer', () => {
  it('renders the address from PRD §5.10', () => {
    render(<Footer />);
    expect(screen.getByText(/14 New South Head Rd/i)).toBeInTheDocument();
    expect(screen.getByText(/Triple Bay 3148/i)).toBeInTheDocument();
  });

  it('renders the contact email as a mailto link', () => {
    render(<Footer />);
    const mail = screen.getByRole('link', { name: /hello@leadsinthepipe\.com/i });
    expect(mail.getAttribute('href')).toBe('mailto:hello@leadsinthepipe.com');
  });

  it('renders an icon link for each social platform with an accessible name', () => {
    render(<Footer />);
    for (const social of socialLinks) {
      expect(screen.getAllByRole('link', { name: social.label }).length).toBeGreaterThan(0);
    }
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Footer />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
