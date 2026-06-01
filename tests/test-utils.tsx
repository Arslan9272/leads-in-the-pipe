import { render, type RenderOptions, type RenderResult } from '@testing-library/react';
import type { ReactElement } from 'react';
import { ToastProvider } from '@/components/ui/Toast';

export function renderWithProviders(
  ui: ReactElement,
  options?: RenderOptions,
): RenderResult {
  return render(<ToastProvider>{ui}</ToastProvider>, options);
}

export * from '@testing-library/react';
