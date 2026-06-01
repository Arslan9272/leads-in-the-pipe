import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { createRef } from 'react';
import { MobileMenu } from '@/components/MobileMenu';

function setup(open: boolean) {
  const onClose = vi.fn();
  const triggerRef = createRef<HTMLButtonElement>();
  const triggerHost = document.createElement('button');
  triggerHost.textContent = 'Open menu';
  document.body.appendChild(triggerHost);
  (triggerRef as { current: HTMLButtonElement | null }).current = triggerHost;

  const result = render(
    <MobileMenu open={open} onClose={onClose} triggerRef={triggerRef} />,
  );

  return { ...result, onClose, triggerHost };
}

describe('MobileMenu', () => {
  it('does not render the dialog when closed', () => {
    setup(false);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders an accessible dialog with the close button when open', () => {
    setup(true);
    const dialog = screen.getByRole('dialog', { name: /site navigation/i });
    expect(dialog).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close menu/i })).toBeInTheDocument();
  });

  it('calls onClose when Escape is pressed', async () => {
    const user = userEvent.setup();
    const { onClose } = setup(true);
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when the close button is clicked', async () => {
    const user = userEvent.setup();
    const { onClose } = setup(true);
    await user.click(screen.getByRole('button', { name: /close menu/i }));
    expect(onClose).toHaveBeenCalled();
  });

  it('moves focus into the dialog when opened', async () => {
    setup(true);
    await waitFor(() => {
      expect(document.activeElement?.closest('[role="dialog"]')).not.toBeNull();
    });
  });

  it('has no accessibility violations when open', async () => {
    const { container } = setup(true);
    expect(await axe(container)).toHaveNoViolations();
  });
});
