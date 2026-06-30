import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { MemoryRouter } from 'react-router-dom';
import { Footer } from '@/components/sections/Footer';
import { socialLinks } from '@/data/social';
import { CONTACT_EMAIL } from '@/lib/constants';

function renderFooter() {
  return render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>,
  );
}

describe('Footer', () => {
  it('renders the address from PRD §5.10', () => {
    renderFooter();
    expect(screen.getByText(/14 New South Head Rd/i)).toBeInTheDocument();
    expect(screen.getByText(/Triple Bay 3148/i)).toBeInTheDocument();
  });

  it('renders the contact email as a mailto link', () => {
    renderFooter();
    const mail = screen.getByRole('link', { name: new RegExp(CONTACT_EMAIL, 'i') });
    expect(mail.getAttribute('href')).toBe(`mailto:${CONTACT_EMAIL}`);
  });

  it('renders an icon link for each social platform with an accessible name', () => {
    renderFooter();
    for (const social of socialLinks) {
      expect(screen.getAllByRole('link', { name: social.label }).length).toBeGreaterThan(0);
    }
  });

  it('has no accessibility violations', async () => {
    const { container } = renderFooter();
    expect(await axe(container)).toHaveNoViolations();
  });
});
