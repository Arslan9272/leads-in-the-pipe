import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { useCountUp } from '@/hooks/useCountUp';

function Counter({ target }: { target: number }) {
  const { ref, value } = useCountUp({ target, duration: 50 });
  return (
    <div ref={ref} data-testid="counter">
      {value}
    </div>
  );
}

describe('useCountUp', () => {
  it('counts up to the target after the element intersects', async () => {
    render(<Counter target={1200} />);
    await waitFor(
      () => {
        expect(screen.getByTestId('counter').textContent).toBe('1200');
      },
      { timeout: 1500 },
    );
  });
});
