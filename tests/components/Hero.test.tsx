import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { axe } from 'vitest-axe';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { Hero } from '@/components/sections/Hero';
import { renderWithProviders } from '../test-utils';

describe('Hero', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
    vi.stubEnv('VITE_FORMSPREE_ENDPOINT', 'https://formspree.io/f/test123');
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it('renders the locked PRD headline as the page h1', () => {
    renderWithProviders(<Hero />);
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1.textContent).toBe('Leads In The Pipe');
  });

  it('renders the PRD subhead verbatim', () => {
    renderWithProviders(<Hero />);
    expect(
      screen.getByText(
        /Fueling your business growth with high-quality leads delivered straight to your pipeline\./,
      ),
    ).toBeInTheDocument();
  });

  it('disables the submit button until a valid email is entered', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Hero />);
    const submit = screen.getByRole('button', { name: /get a quote/i });
    expect(submit).toBeDisabled();

    const input = screen.getByLabelText(/your work email/i);
    await user.type(input, 'not-an-email');
    expect(submit).toBeDisabled();

    await user.clear(input);
    await user.type(input, 'founder@company.com');
    expect(submit).toBeEnabled();
  });

  it('posts the email to Formspree on submit', async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockResolvedValueOnce(new Response('{}', { status: 200 }));
    const user = userEvent.setup();
    renderWithProviders(<Hero />);

    await user.type(screen.getByLabelText(/your work email/i), 'founder@company.com');
    await user.click(screen.getByRole('button', { name: /get a quote/i }));

    expect(fetchMock).toHaveBeenCalledWith(
      'https://formspree.io/f/test123',
      expect.objectContaining({ method: 'POST' }),
    );
  });

  it('has no accessibility violations', async () => {
    const { container } = renderWithProviders(<Hero />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
