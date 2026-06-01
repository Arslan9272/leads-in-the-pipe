import { useEffect, useRef, useState } from 'react';

interface UseCountUpOptions {
  target: number;
  duration?: number;
  start?: number;
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export function useCountUp({ target, duration = 1500, start = 0 }: UseCountUpOptions) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState(() => (prefersReducedMotion() ? target : start));
  const startedRef = useRef(prefersReducedMotion());

  useEffect(() => {
    const node = ref.current;
    if (!node || startedRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const startTime = performance.now();

            const tick = () => {
              const progress = Math.min((performance.now() - startTime) / duration, 1);
              const eased = easeOut(progress);
              setValue(Math.round(start + (target - start) * eased));
              if (progress < 1) {
                requestAnimationFrame(tick);
              }
            };

            requestAnimationFrame(tick);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target, duration, start]);

  return { ref, value };
}
