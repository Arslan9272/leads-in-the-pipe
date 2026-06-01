# QA Issue Log — Leads In The Pipe

QA agent logs bugs and verification findings here. Each entry is actionable: file + line + steps + expected vs actual.

## How to Use

- **Add an entry** when QA finds a regression, accessibility violation, or unmet acceptance criterion
- **Severity:** `critical` (blocks ship), `serious` (must fix before ship), `moderate` (fix before v1.1), `minor` (nice-to-fix)
- **Status:** `open`, `in_progress`, `fixed`, `wontfix`
- **Close** by editing the entry's status field — do not delete (keep history)

## Format

```
## [#NNN] Brief title — file:line — severity

**Status:** open
**Reported:** YYYY-MM-DD by QA
**Component:** ComponentName

**Steps to reproduce:**
1. ...
2. ...

**Expected:** ...
**Actual:** ...

**Suggested fix:** ...
```

---

## Build 1 — Initial v1.0 verification (2026-05-12)

**Gate run:** `tsc -b` ✓ · `eslint . --max-warnings 0` ✓ · `vitest run` 32/32 ✓ · `vite build` ✓

**Bundle:** JS 365.3 KB raw / **114.2 KB gzip** (budget 150 KB ✓) · CSS 46.3 KB / **17.5 KB gzip** (budget 30 KB ✓).

**Lighthouse — production preview at `http://127.0.0.1:4173/`:**

| Preset | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Desktop | **100** | **100** | **100** | **100** |
| Mobile | **92** | **100** | **100** | **100** |

All four categories clear merge gates on both presets (TRD §5.3: Perf ≥ 90, A11y ≥ 95, BP ≥ 90, SEO ≥ 95).

**Test coverage written this pass (32 tests across 8 files):**
- `tests/hooks/useFormspree.test.ts` — idle state, regex validation, pending-setup path, success path (200), error path (500)
- `tests/hooks/useCountUp.test.tsx` — counts up to target on IntersectionObserver entry
- `tests/components/Hero.test.tsx` — h1 verbatim, subhead verbatim, submit disabled until valid, posts to Formspree, axe clean
- `tests/components/Services.test.tsx` — heading, all 6 cards rendered from data, axe clean
- `tests/components/Offering.test.tsx` — three tiers, each Get-a-Quote `mailto:` link has `Quote Request - {Tier}` subject (FR-3), axe clean
- `tests/components/Footer.test.tsx` — address, mailto, named social icon links, axe clean
- `tests/components/MobileMenu.test.tsx` — closed-state hidden, accessible dialog, Escape closes, button closes, focus moves into dialog, axe clean when open
- `tests/components/Sections.a11y.test.tsx` — vitest-axe assertions for QualityLeads, RecipeForSuccess, WhatWeDo, Articles, LetsTalk

---

## [#001] `text.muted` (#6B6B6B) fails WCAG AA contrast on `bg.DEFAULT` — `tailwind.config.ts:166` — serious

**Status:** fixed
**Reported:** 2026-05-12 by QA
**Component:** WhatWeDo, Articles, Footer, Offering marquee
**Detector:** Lighthouse 12 desktop accessibility audit (initial run: 96/100)

**Steps to reproduce:**
1. `pnpm build && pnpm preview`
2. Run Lighthouse desktop on `http://localhost:4173/`
3. Open `Accessibility → Background and foreground colors do not have a sufficient contrast ratio`

**Expected:** All non-decorative text ≥ 4.5:1 against `bg.DEFAULT` (`#000000`).
**Actual:** 6 instances of `text-text-muted` (`#6B6B6B`, ratio 4.0:1) + 2 instances of the OFFERING marquee (`text-border` `#2A2A2A`, ratio 1.4:1) flagged.

**Fix applied:**
- Bumped `text.muted` token from `#6B6B6B` to `#8A8A8A` (~6.2:1) in `tailwind.config.ts`. Mirror updates: `skills/leadsinthepipe-brand/SKILL.md` token table, `docs/decisions.md` row #9.
- Switched OFFERING marquee text from `text-border` to `text-text-muted/70` and added `aria-hidden="true"` at the span level (existed at parent only).

**Re-verified:** Lighthouse a11y → 100/100 (desktop and mobile).

---

## [#002] `tsc -b` flagged `test:` key in `vite.config.ts` — `vite.config.ts:13` — moderate

**Status:** fixed
**Reported:** 2026-05-12 by QA

**Cause:** Vite 8's `UserConfigExport` doesn't expose `test`; Vitest 2 pins a vite@5 type internally that conflicts with vite@8's `proxy.configure` signature when merged.

**Fix applied:** Split Vitest config into `vitest.config.ts` (using `defineConfig` from `vitest/config`), kept `vite.config.ts` clean for the production build, and excluded `vitest.config.ts` from `tsconfig.node.json` so the vite/vitest internal proxy-type conflict doesn't break `pnpm build`. Vitest loads its own config file at runtime, so this is sound.

---

## Open items / manual checks still owed before launch

- **Cross-browser/cross-device:** Visual pass on real Chrome (latest), Safari macOS, Firefox, Edge, iOS Safari, Chrome Android. Not runnable in this CI sandbox.
- **`og-image.png`:** Referenced in `index.html` and `package.json` but not generated. Designer to produce a 1200×630 PNG; falls back to 404 right now without breaking the page.
- **`VITE_FORMSPREE_ENDPOINT`:** Not set yet. Hero form correctly shows the "Form setup pending" toast (verified by `useFormspree` test). User to provision a Formspree endpoint and add to `.env.local` + hosting platform env vars.
- **Real contact email (`CONTACT_EMAIL`):** Defaults to `hello@leadsinthepipe.com` per decision #3. User to confirm the canonical address before DNS cutover.
- **Hosting decision (decision #2):** Still deferred. Build output is portable static `dist/`.
