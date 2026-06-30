import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { PipelineAuditForm } from '@/components/sections/PipelineAuditForm';
import { renderWithProviders } from '../test-utils';

describe('PipelineAuditForm', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
    vi.stubEnv('VITE_API_BASE_URL', '');
    vi.stubEnv('VITE_FORMSPREE_ENDPOINT', 'https://formspree.io/f/test123');
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it('shows validation errors when submitting empty required fields', async () => {
    const user = userEvent.setup();
    renderWithProviders(<PipelineAuditForm />);

    await user.click(screen.getByRole('button', { name: /book my pipeline audit/i }));

    expect(screen.getAllByText(/this field is required/i).length).toBeGreaterThan(0);
    expect(fetch).not.toHaveBeenCalled();
  });

  it('posts to Formspree when required fields are valid', async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockResolvedValueOnce(new Response('{}', { status: 200 }));
    const user = userEvent.setup();
    renderWithProviders(<PipelineAuditForm />);

    await user.type(screen.getByLabelText(/^name$/i), 'Dana Lead');
    await user.type(screen.getByLabelText(/work email/i), 'dana@company.com');
    await user.type(screen.getByLabelText(/^company$/i), 'Acme Co');
    await user.click(screen.getByRole('button', { name: /book my pipeline audit/i }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        'https://formspree.io/f/test123',
        expect.objectContaining({ method: 'POST' }),
      );
    });
  });

  it('has no accessibility violations', async () => {
    const { container } = renderWithProviders(<PipelineAuditForm />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
