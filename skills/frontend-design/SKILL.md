---
name: frontend-design
description: Aesthetic standards, motion quality bar, typography and spacing rules, and anti-patterns for the Leads In The Pipe site. Read before writing any UI code or proposing visual changes.
---

# Frontend Design — Quality Bar

This skill defines the bar for visual craft on Leads In The Pipe. Read it before writing or reviewing any UI code. Pair it with `leadsinthepipe-brand` (brand identity) and `component-patterns` (project patterns).

## Aesthetic Principles

- **Modern minimalist.** Generous whitespace, refined typography, motion that supports hierarchy. No decoration for decoration's sake.
- **One accent per viewport.** Mint green is the only chromatic accent on Basic + general UI. Use Standard (cyan) and Bespoke (coral) **only** inside the Offering section.
- **Hierarchy is the design.** Size, weight, and spacing carry the layout. Borders and gradients are last resorts.
- **Dark surface elevation:** `#000` (page) → `#0A0A0A` (surface) → `#111` (card) → `#1A1A1A` (elevated/hover). Never lighter than `#1A1A1A`.

## Anti-Patterns (Reject on Sight)

- Inter, Roboto, Arial, or `system-ui` as the primary display face
- Purple/pink gradients, glassmorphism, neumorphism, sticker emojis
- Drop shadows on dark backgrounds (use border + slight elevation color instead)
- More than two font families on the page
- Animating `top` / `left` / `width` / `height` — only `transform` and `opacity` (performance + jitter)
- Hover-only critical information
- Centered body copy longer than one line
- Letter-spacing on body text below 16px
- More than 3 font weights in active use

## Typography Rules

- **Display** (Geist): tracking tight (`-0.02em` to `-0.04em`), line-height 1.0–1.1 at large sizes
- **Body** (Manrope): tracking normal, line-height 1.5–1.6
- **Scale (mobile / desktop):**
  - h1: 40 / 64 px
  - h2: 32 / 48 px
  - h3: 24 / 32 px
  - body-lg: 18 / 20 px
  - body: 16 / 16 px
  - caption: 13 / 14 px
- One `<h1>` per page. Never skip heading levels.

## Spacing Scale

Use Tailwind's 4-step scale: `1 / 2 / 3 / 4 / 6 / 8 / 12 / 16 / 24 / 32` (px = ×4).

- **Section vertical rhythm:** 96 px desktop / 64 px mobile between sections
- **Card padding:** 24–32 px (`p-6` to `p-8`)
- **Inline gaps:** prefer `gap-3` / `gap-4` / `gap-6` — avoid odd values

## Motion Quality Bar

- **Easing:** Entries use `cubic-bezier(0.16, 1, 0.3, 1)` (out-expo-ish). Continuous loops use `linear`.
- **Duration:** Entry reveals 400–600 ms. Hover micro-interactions ≤ 200 ms.
- **Stagger:** Max 80 ms between siblings. More feels slow.
- **Reduced motion:** Every animation has a no-motion fallback. Test with `prefers-reduced-motion: reduce`.
- **Continuous loops:** Marquee 15 s, sun-star rotation 12 s, hero pipe-bubble pulse 3 s.

See [[animation-patterns]] for implementation recipes.

## Color & Contrast

- Verify every text/background pair against WCAG AA: ≥ 4.5:1 for body, ≥ 3:1 for large text (≥18 px or ≥14 px bold)
- Mint accent `#9EFB9C` on `#000` is ~14:1 — safe
- Tier colors on `#111` card surface — verify each before shipping
- Never use color alone to convey state (pair with icon or text)

See [[accessibility-patterns]] for keyboard, focus, and screen-reader patterns.

## Component "Done" Checklist

Before declaring a component done:

- [ ] Mobile layout (360 px) verified first
- [ ] Tablet (768 px) and desktop (1280 px) verified
- [ ] Focus-visible ring on every interactive element
- [ ] Reduced-motion fallback present
- [ ] Contrast checked against axe DevTools
- [ ] No magic strings — copy from `src/data/`
- [ ] No inline styles unless dynamically computed
- [ ] One reason per Tailwind class — no `mt-4 mt-6` leftovers

## When to Push Back

If a request would violate these rules — "add a purple gradient", "use Inter", "make this section animate on every scroll" — push back with the specific principle and offer one alternative. Aesthetic discipline > novelty.
