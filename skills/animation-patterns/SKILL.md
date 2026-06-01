---
name: animation-patterns
description: Motion implementation recipes for Leads In The Pipe — Framer Motion vs CSS, scroll reveals, marquee, useCountUp, performance rules. Read when implementing any animation.
---

# Animation Patterns

Choose the right tool and avoid the common traps.

## Framer Motion vs CSS — Decision Tree

| Use case | Tool |
|---|---|
| Scroll-triggered reveal | **Framer Motion** (`whileInView`) |
| Component-level interactive (hover, tap) | **Framer Motion** or Tailwind `hover:` |
| Continuous infinite loop (marquee, rotation) | **CSS keyframes** (Tailwind `animate-*`) |
| Layout-affecting (height: auto, accordion) | **Framer Motion** `AnimatePresence` |
| Single-property hover on a static element | **CSS transition** |

**Why CSS for continuous loops:** Framer Motion runs on JS — it can stutter on low-end devices. CSS animations run on the compositor and stay smooth.

## Reveal Variants

Standard fadeUp:

```ts
// src/lib/motion.ts
export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

export const staggerChildren = {
  animate: { transition: { staggerChildren: 0.08 } },
};
```

Usage:

```tsx
<motion.div
  initial={prefersReduced ? false : fadeUp.initial}
  whileInView={fadeUp.animate}
  viewport={{ once: true, margin: '-10%' }}
  transition={fadeUp.transition}
/>
```

`viewport={{ once: true }}` prevents re-fire flicker when the user scrolls back up.

## Stagger Children

```tsx
<motion.ul
  initial="initial"
  whileInView="animate"
  viewport={{ once: true }}
  variants={staggerChildren}
>
  {items.map((item) => (
    <motion.li key={item.id} variants={fadeUp}>
      {item.label}
    </motion.li>
  ))}
</motion.ul>
```

Max stagger: 80 ms. More feels slow.

## `useCountUp` (Stat Counters)

```ts
// src/hooks/useCountUp.ts — sketch
export function useCountUp(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLElement | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      setCount(target);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3); // cubic ease-out
        setCount(Math.round(target * eased));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      observer.disconnect();
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, prefersReduced]);

  return { count, ref };
}
```

## Marquee (Vertical Scroll Text)

CSS-only. Duplicate the content for seamless loop:

```tsx
<div className="h-[600px] overflow-hidden">
  <div className="animate-marquee-vertical">
    <span>OFFERING</span>
    <span>OFFERING</span>
    <span>OFFERING</span>
    {/* duplicate ↓ */}
    <span aria-hidden="true">OFFERING</span>
    <span aria-hidden="true">OFFERING</span>
    <span aria-hidden="true">OFFERING</span>
  </div>
</div>
```

`tailwind.config.ts`:

```ts
animation: {
  'marquee-vertical': 'marquee-v 15s linear infinite',
},
keyframes: {
  'marquee-v': {
    from: { transform: 'translateY(0)' },
    to:   { transform: 'translateY(-50%)' },
  },
},
```

Reduced-motion: globally pause via the CSS rule in [[accessibility-patterns]].

## Pipe-Bubble Ambient Motion

Low-amplitude pulse on `transform: scale()` and `opacity`. Period 3 s, ease-in-out. CSS-only via `animate-pulse-glow` (defined in tailwind.config.ts).

## Performance Rules

- **Animate `transform` and `opacity` only.** Never animate `top`/`left`/`width`/`height` — they trigger layout
- **`will-change` sparingly** — only on elements that are about to animate, remove after
- **`whileInView` gates heavy animations** to the visible viewport
- **`once: true`** for entry reveals (no re-fire cost)
- **Continuous loops via CSS** (compositor) — Framer Motion's JS tick can stutter on low-end mobile
- **Sun-star** and **pipe-bubble** are below the fold for most viewports — they don't impact LCP

See [[performance-budget]] for budget impact.

## Reduced-Motion Fallback

Every animation has one:
- Framer Motion: short-circuit `initial` to `false` so the end state renders immediately
- CSS: media query in `globals.css` sets `animation: none !important` on `.animate-*` classes

Test by toggling DevTools → Rendering → Emulate CSS media feature `prefers-reduced-motion: reduce`.
