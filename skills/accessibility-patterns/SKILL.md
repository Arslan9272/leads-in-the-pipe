---
name: accessibility-patterns
description: WCAG 2.1 AA patterns for the Leads In The Pipe site — focus management, form a11y, focus trap, reduced motion, contrast. Read when building any interactive element or running QA.
---

# Accessibility Patterns — WCAG 2.1 AA

This site must clear WCAG 2.1 AA + Lighthouse Accessibility ≥ 95. Patterns below are project-specific and battle-tested.

## Skip-to-Content Link

Top of `<body>`, visually hidden until focused:

```tsx
// src/components/ui/SkipLink.tsx
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-bg"
    >
      Skip to content
    </a>
  );
}
```

Wrap page content in `<main id="main">`.

## Focus Rings

Every interactive element gets a visible focus ring. Standard pattern:

```
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg
```

**Never** apply `outline: none` without replacing the ring.

## Focus Trap (Mobile Menu)

Use the `useFocusTrap` hook. Pattern:

```tsx
const { ref } = useFocusTrap(isOpen);

useEffect(() => {
  if (!isOpen) return;
  const handler = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };
  document.addEventListener('keydown', handler);
  return () => document.removeEventListener('keydown', handler);
}, [isOpen, onClose]);

// On close: restore focus to the trigger button (handled by the hook)
```

Requirements:
- Tab cycles forward through focusable elements only
- Shift+Tab cycles backward
- Escape closes the menu
- Focus returns to the hamburger trigger on close

## Form Accessibility

```tsx
<label htmlFor="hero-email" className="sr-only">Your email address</label>
<Input
  id="hero-email"
  type="email"
  aria-invalid={hasError}
  aria-describedby={hasError ? 'hero-email-error' : undefined}
  required
/>
{hasError && (
  <p id="hero-email-error" role="alert" className="text-tier-bespoke">
    Please enter a valid email address.
  </p>
)}
```

Rules:
- Every input has an associated `<label>` (visible or `sr-only`)
- Errors announced via `role="alert"` and linked via `aria-describedby`
- `aria-invalid` reflects current validity
- Never rely on color alone for error state — pair with icon or message

## Icon Buttons

```tsx
<button aria-label="Open menu" onClick={open}>
  <MenuIcon className="h-6 w-6" aria-hidden="true" />
</button>
```

- Icon-only button → `aria-label` required
- Decorative SVG inside → `aria-hidden="true"` (so SR doesn't double-read)

## Reduced Motion

```tsx
import { useReducedMotion } from 'framer-motion';

const prefersReduced = useReducedMotion();

<motion.div
  initial={prefersReduced ? false : { opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
/>
```

For CSS animations:

```css
@media (prefers-reduced-motion: reduce) {
  .animate-marquee-vertical,
  .animate-spin-slow,
  .animate-pulse-glow {
    animation: none !important;
  }
}
```

## Color Contrast

Verify before shipping a component:

| Pair | Min ratio | Tool |
|---|---|---|
| Body text on bg | 4.5:1 | axe DevTools |
| Large text (≥18px or ≥14px bold) | 3:1 | axe DevTools |
| UI components (buttons, focus rings) | 3:1 | axe DevTools |

Project pre-verified pairs:
- `text-text-primary` on `bg-bg` → ~21:1 ✅
- `text-text-secondary` (#A1A1A1) on `bg-bg` → ~7.5:1 ✅
- `text-text-muted` (#6B6B6B) on `bg-bg` → ~4.1:1 — **borderline; only use for captions ≥14 px**
- `text-accent` on `bg-bg` → ~14:1 ✅

## Keyboard Navigation Checklist

Per component:

- [ ] Tab order matches visual order
- [ ] All interactive elements reachable
- [ ] No keyboard traps (except intentional menu trap with Escape exit)
- [ ] Enter / Space activate buttons
- [ ] Escape closes overlays
- [ ] Custom interactive widgets have appropriate ARIA role

## Testing

Every section gets a `vitest-axe` assertion:

```tsx
import { axe } from 'vitest-axe';

it('has no accessibility violations', async () => {
  const { container } = render(<MySection />);
  expect(await axe(container)).toHaveNoViolations();
});
```

Plus a manual keyboard sweep before declaring a section done.

See [[component-patterns]] for the standard test skeleton.
