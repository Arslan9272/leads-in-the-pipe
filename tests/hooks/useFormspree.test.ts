import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useFormspree } from '@/hooks/useFormspree';

describe('useFormspree', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it('starts idle with an empty email and isValid=false', () => {
    const { result } = renderHook(() => useFormspree());
    expect(result.current.email).toBe('');
    expect(result.current.isValid).toBe(false);
    expect(result.current.status).toBe('idle');
  });

  it('rejects malformed emails and accepts well-formed ones', () => {
    const { result } = renderHook(() => useFormspree());
    act(() => result.current.setEmail('not-an-email'));
    expect(result.current.isValid).toBe(false);
    act(() => result.current.setEmail('founder@company.com'));
    expect(result.current.isValid).toBe(true);
  });

  it('transitions to pending-setup when the endpoint env var is missing', async () => {
    vi.stubEnv('VITE_FORMSPREE_ENDPOINT', '');
    const { result } = renderHook(() => useFormspree());
    act(() => result.current.setEmail('founder@company.com'));
    await act(async () => {
      await result.current.submit();
    });
    expect(result.current.status).toBe('pending-setup');
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('posts to the endpoint and transitions to success on 200', async () => {
    vi.stubEnv('VITE_FORMSPREE_ENDPOINT', 'https://formspree.io/f/test123');
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockResolvedValueOnce(new Response('{}', { status: 200 }));

    const { result } = renderHook(() => useFormspree());
    act(() => result.current.setEmail('founder@company.com'));
    await act(async () => {
      await result.current.submit();
    });

    expect(fetchMock).toHaveBeenCalledWith(
      'https://formspree.io/f/test123',
      expect.objectContaining({
        method: 'POST',
        body: expect.stringContaining('founder@company.com'),
      }),
    );
    expect(result.current.status).toBe('success');
    expect(result.current.email).toBe('');
  });

  it('sets status to error when the request fails', async () => {
    vi.stubEnv('VITE_FORMSPREE_ENDPOINT', 'https://formspree.io/f/test123');
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockResolvedValueOnce(new Response('nope', { status: 500 }));

    const { result } = renderHook(() => useFormspree());
    act(() => result.current.setEmail('founder@company.com'));
    await act(async () => {
      await result.current.submit();
    });

    expect(result.current.status).toBe('error');
    expect(result.current.errorMessage).toMatch(/Request failed/);
  });
});
