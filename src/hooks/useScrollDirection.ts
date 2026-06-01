import { useEffect, useState } from 'react';

type Direction = 'up' | 'down' | 'idle';

interface ScrollState {
  direction: Direction;
  scrollY: number;
  isScrolled: boolean;
}

const THRESHOLD = 16;

export function useScrollDirection(): ScrollState {
  const [state, setState] = useState<ScrollState>({
    direction: 'idle',
    scrollY: typeof window === 'undefined' ? 0 : window.scrollY,
    isScrolled: false,
  });

  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY;
        let direction: Direction = 'idle';
        if (Math.abs(delta) > 2) {
          direction = delta > 0 ? 'down' : 'up';
        }
        setState({
          direction,
          scrollY: y,
          isScrolled: y > THRESHOLD,
        });
        lastY = y;
        raf = 0;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return state;
}
