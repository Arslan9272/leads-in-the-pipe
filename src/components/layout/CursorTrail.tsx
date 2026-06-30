import { useEffect, useRef } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  t: number;
}

/** How long (ms) a segment stays visible before it has fully faded. */
const LIFETIME = 420;
const ACCENT = '158, 251, 156'; // #9EFB9C

/**
 * A soft green line that follows the cursor and fades out behind it.
 * Mouse / fine-pointer only, and disabled under prefers-reduced-motion.
 */
export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (reduceMotion || !finePointer) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const points: TrailPoint[] = [];
    let rafId = 0;
    let running = false;

    const draw = () => {
      const now = performance.now();
      // Drop fully-faded points off the tail.
      while (points.length && now - points[0].t > LIFETIME) points.shift();

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (points.length >= 2) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowColor = `rgba(${ACCENT}, 0.9)`;
        ctx.shadowBlur = 8;
        for (let i = 1; i < points.length; i++) {
          const p0 = points[i - 1];
          const p1 = points[i];
          const age = (now - p1.t) / LIFETIME; // 0 = fresh, 1 = gone
          const k = 1 - age;
          ctx.strokeStyle = `rgba(${ACCENT}, ${k})`;
          ctx.lineWidth = 1.5 + 5 * k;
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.stroke();
        }
        ctx.shadowBlur = 0;
      }

      if (points.length) {
        rafId = window.requestAnimationFrame(draw);
      } else {
        running = false;
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      points.push({ x: e.clientX, y: e.clientY, t: performance.now() });
      if (!running) {
        running = true;
        rafId = window.requestAnimationFrame(draw);
      }
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100]"
    />
  );
}
