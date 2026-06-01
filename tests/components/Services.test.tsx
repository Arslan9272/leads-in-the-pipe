import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Services } from '@/components/sections/Services';
import { services } from '@/data/services';

describe('Services', () => {
  it('renders the section heading from PRD §5.4', () => {
    render(<Services />);
    expect(
      screen.getByRole('heading', { level: 2, name: /services we provide/i }),
    ).toBeInTheDocument();
  });

  it('renders all 6 service cards from the data module', () => {
    render(<Services />);
    for (const service of services) {
      expect(screen.getByRole('heading', { level: 3, name: service.title })).toBeInTheDocument();
    }
    expect(services).toHaveLength(6);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Services />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
