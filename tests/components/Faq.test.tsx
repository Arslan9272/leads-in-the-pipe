import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Faq } from '@/components/sections/Faq';
import { faqItems } from '@/data/faq';

describe('Faq', () => {
  it('renders a collapsed disclosure button for each question', () => {
    render(<Faq />);
    for (const item of faqItems) {
      const button = screen.getByRole('button', { name: item.question });
      expect(button).toHaveAttribute('aria-expanded', 'false');
    }
  });

  it('expands and collapses a question on click', async () => {
    const user = userEvent.setup();
    render(<Faq />);
    const first = faqItems[0];
    const button = screen.getByRole('button', { name: first.question });

    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(first.answer)).toBeInTheDocument();

    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Faq />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
