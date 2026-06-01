---
name: performance-budget
description: Performance budgets and inspection workflow for the Leads In The Pipe site. Read before adding a dependency, committing assets, or when Lighthouse drops.
---

# Performance Budget

Lighthouse Performance must stay ≥ 90 (block merge below). These budgets keep us there.

## Budgets

| Resource | Budget | Notes |
|---|---|---|
| Initial JS (gzipped) | < 150 KB | React + Framer Motion alone is ~60 KB — leaves ~90 KB for app code |
| Initial CSS (gzipped) | < 30 KB | Tailwind purged + globals |
| Total first-load page weight | < 500 KB | Including LCP image |
| LCP image | < 100 KB | Modern formats (WebP/AVIF) preferred |
| Custom font file | < 50 KB each | Latin subset only; max 4 files (2 families × 2 weights critical) |

## Bundle Inspection

After `pnpm build`, Vite prints per-chunk sizes. Sanity-check on every PR:

```
dist/assets/index-*.js   132.4 KB │ gzip: 42.1 KB
dist/assets/index-*.css   18.2 KB │ gzip:  5.4 KB
```

If gzip JS approaches 150 KB, run `pnpm dlx vite-bundle-visualizer` (no install required) to see what's heavy.

## Adding a Dependency — Checklist

Before `pnpm add <thing>`:

1. **Gzipped size?** Check on [bundlephobia.com](https://bundlephobia.com). Reject if it pushes us over budget.
2. **Tree-shakable?** Named exports only. Avoid `lodash`, prefer `lodash-es` or one-off helpers.
3. **Alternative in stack?** Tailwind + Framer Motion + clsx cover most needs.
4. **Update `TRD.md` §1?** Yes — every new dep is listed.
5. **PM approval?** Per `frontend-developer.md` hard rules.

Default answer for any new dep is **no, until proven necessary.**

## Asset Rules

### Images

- **Format:** SVG for icons & flat illustrations; WebP/AVIF for photos
- **Sizing:** Always include explicit `width` and `height` to prevent CLS
- **Loading:** `loading="lazy"` for below-fold; `fetchpriority="high"` for hero LCP image

### Fonts

- **Self-host** via `@fontsource/*` packages — no Google Fonts CDN (CDN cost on LCP)
- **Subset to Latin** — `@fontsource/{name}/400.css` loads only one weight
- **`font-display: swap`** — system fallback first, swap when web font loads (avoids invisible-text flash)
- **Preload critical weights** in `index.html`:
  ```html
  <link rel="preload" as="font" type="font/woff2" href="/fonts/geist-sans-600.woff2" crossorigin />
  ```

## Code-Splitting

Single-page site → no route-based splitting. But if Lighthouse mobile dips:

```tsx
const Articles = lazy(() => import('@/components/sections/Articles'));

<Suspense fallback={null}>
  <Articles />
</Suspense>
```

Best targets for lazy: below-the-fold sections (Articles, LetsTalk, Footer).

## Lighthouse Workflow

```bash
pnpm build
pnpm preview &
npx lighthouse http://localhost:4173 --view --preset=desktop
npx lighthouse http://localhost:4173 --view --preset=mobile
```

Thresholds (per QA agent):
- Performance ≥ 90
- Accessibility ≥ 95
- Best Practices ≥ 90
- SEO ≥ 95

## Common Regressions

| Symptom | Cause | Fix |
|---|---|---|
| LCP > 2.5 s | Hero image / font blocks | Preload critical font + WebP hero |
| CLS > 0.1 | Font loading shifts layout | `font-display: swap` + `size-adjust` |
| JS bundle > 150 KB | New heavy dep | Remove or lazy-load; see bundle visualizer |
| Mobile Perf < 90 | Animations on low-end | Verify all loops are CSS not Framer; gate with `whileInView` |

See [[animation-patterns]] for motion perf rules and [[seo-optimization]] for Core Web Vitals context.
