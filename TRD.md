# Technical Requirements Document (TRD)
## Leads In The Pipe — Marketing Website

**Version:** 1.0
**Date:** May 2026
**Owner:** Frontend Developer (Claude subagent)
**Companion to:** PRD.md

---

## 1. Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Build tool | **Vite 5+** | Fast HMR, modern, simple config |
| Framework | **React 18** | Component model, ecosystem |
| Language | **TypeScript 5+** | Type safety, maintainability |
| Styling | **Tailwind CSS 3+** | Utility-first, fast iteration, design tokens via config |
| Animation | **Framer Motion 11+** | Best-in-class React motion library |
| Routing | **react-router-dom 6** | Multi-page site (Home / Services / About / Pricing / Contact) with clean URLs and per-page SEO. v6 chosen over v7 for stable, complete type declarations. SPA deep-links handled via `vercel.json` rewrite. |
| Form backend | **FastAPI email service** (`backend/`) — Formspree fallback | Forms POST to a tiny FastAPI app that emails submissions via SMTP (no data stored). Falls back to Formspree when `VITE_API_BASE_URL` is unset. See `backend/README.md`. Python deps: `fastapi`, `uvicorn`, `pydantic[email]`. |
| Icons | **Custom SVG components** (recreated from Figma) + **Lucide React** for utility icons (menu, social) |
| Fonts | Self-hosted via `@fontsource` or Google Fonts (choices set by Designer agent) |
| Testing | **Vitest** + **React Testing Library** + **vitest-axe** (component-level + a11y) | Simple, fast, no E2E framework needed for v1.0 |
| Linting | **ESLint** + **Prettier** + **typescript-eslint** |
| Git hooks | **Husky** + **lint-staged** (pre-commit linting) |
| Package manager | **pnpm** (faster, disk-efficient) — fallback to npm if user prefers |
| Hosting | TBD (Vercel / Netlify / GoDaddy static) — build output is portable `dist/` |
| Domain | GoDaddy (user-owned) |

---

## 2. Project Structure

```
leadsinthepipe/
├── .claude/
│   └── agents/
│       ├── designer.md
│       ├── product-manager.md
│       ├── frontend-developer.md
│       └── qa.md
├── .github/
│   └── workflows/
│       └── ci.yml                # GitHub Actions: lint + test + build
├── docs/
│   ├── acceptance-criteria.md    # PM-owned, QA-checked
│   ├── plan.md                   # Sprint plan
│   ├── decisions.md              # Decision log
│   └── qa-log.md                 # QA issue log
├── skills/
│   ├── frontend-design/SKILL.md
│   ├── leadsinthepipe-brand/SKILL.md
│   ├── component-patterns/SKILL.md
│   ├── file-reading/SKILL.md
│   ├── pdf-reading/SKILL.md
│   ├── seo-optimization/SKILL.md
│   ├── accessibility-patterns/SKILL.md
│   ├── animation-patterns/SKILL.md
│   └── performance-budget/SKILL.md
├── public/
│   ├── favicon.svg
│   ├── og-image.png              # 1200×630 Open Graph preview
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── assets/
│   │   └── fonts/                # Self-hosted font files
│   ├── components/
│   │   ├── ui/                   # Reusable primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Container.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Toast.tsx
│   │   ├── icons/                # Custom SVG icons recreated from Figma
│   │   │   ├── Logo.tsx
│   │   │   ├── PipeBubble.tsx
│   │   │   ├── PipeFitting.tsx
│   │   │   ├── ServiceIcon.tsx   # Variants: lead-gen, account-mgmt, etc.
│   │   │   ├── CapabilityIcon.tsx
│   │   │   ├── SunStar.tsx
│   │   │   └── SocialIcons.tsx
│   │   ├── sections/             # Page sections
│   │   │   ├── Header.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── QualityLeads.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── RecipeForSuccess.tsx
│   │   │   ├── WhatWeDo.tsx
│   │   │   ├── Offering.tsx
│   │   │   ├── Articles.tsx
│   │   │   ├── LetsTalk.tsx
│   │   │   └── Footer.tsx
│   │   └── MobileMenu.tsx
│   ├── data/
│   │   ├── services.ts           # Service card content
│   │   ├── capabilities.ts       # What-we-do content
│   │   ├── pricing.ts            # Pricing tier content
│   │   └── articles.ts           # Placeholder articles
│   ├── hooks/
│   │   ├── useCountUp.ts         # Animated counter for stats
│   │   ├── useScrollDirection.ts # Header background fade trigger
│   │   └── useFormspree.ts       # Form submission handler
│   ├── lib/
│   │   └── utils.ts              # cn() helper, classnames merger
│   ├── styles/
│   │   └── globals.css           # Tailwind base + CSS variables
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── tests/
│   ├── setup.ts
│   └── components/
│       ├── Hero.test.tsx
│       ├── Offering.test.tsx
│       └── Services.test.tsx
├── .env.example                  # VITE_FORMSPREE_ENDPOINT
├── .env.local                    # User-supplied, gitignored
├── .eslintrc.cjs
├── .gitignore
├── .prettierrc
├── index.html
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
├── CLAUDE.md
├── PRD.md
├── TRD.md
└── README.md
```

---

## 3. Design Tokens (Tailwind Config)

```ts
// tailwind.config.ts
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#000000',
          surface: '#0A0A0A',
          card: '#111111',
          elevated: '#1A1A1A',
        },
        accent: {
          DEFAULT: '#9EFB9C',   // Designer to confirm exact hex
          dim: '#7DD97B',
          glow: '#9EFB9C',
        },
        tier: {
          basic: '#9EFB9C',
          standard: '#4FB6E8',
          bespoke: '#FF6B5C',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#A1A1A1',
          muted: '#6B6B6B',
        },
        border: {
          subtle: '#1F1F1F',
          DEFAULT: '#2A2A2A',
        },
      },
      fontFamily: {
        display: ['"DISPLAY_FONT"', 'system-ui', 'sans-serif'], // Designer to set
        body: ['"BODY_FONT"', 'system-ui', 'sans-serif'],       // Designer to set
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      screens: {
        xs: '360px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      animation: {
        'marquee-vertical': 'marquee-v 15s linear infinite',
        'spin-slow': 'spin 12s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
      },
      keyframes: {
        'marquee-v': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(-50%)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
};
```

---

## 4. Key Implementation Notes

### 4.1 Mobile-First Responsive Strategy
- Default styles target mobile (360px+)
- Use Tailwind responsive prefixes (`md:`, `lg:`) to scale up
- Test at 360, 768, 1024, 1280, 1536 breakpoints
- Touch targets minimum 44×44px (Apple HIG)
- No hover-only interactions critical to functionality

### 4.2 Custom SVG Icons
- Recreate all custom Figma icons as React SVG components
- Use `currentColor` for fills/strokes so they inherit from Tailwind text classes
- Keep viewBox normalized (e.g., 0 0 24 24 or 0 0 64 64)
- Make pipe-bubble and sun-star animatable (rotate, pulse) via Framer Motion

### 4.3 Form Handling (Formspree)
```ts
// src/hooks/useFormspree.ts
const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;

export async function submitToFormspree(email: string) {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ email, source: 'hero-form' }),
  });
  if (!res.ok) throw new Error('Submission failed');
  return res.json();
}
```
- User signs up at formspree.io, gets an endpoint like `https://formspree.io/f/xxxxxxxx`
- Endpoint stored in `.env.local` as `VITE_FORMSPREE_ENDPOINT`
- Free tier: 50 submissions/month — sufficient for v1.0

### 4.4 Animation Strategy (Medium Level)
- **Framer Motion** for component-level animations
- Use `motion.div` with `whileInView` for scroll-triggered reveals
- Stagger children for grouped reveals (service cards, capability blocks)
- **CSS-only** for marquee + sun-star rotation (better performance)
- Stat counters: custom `useCountUp` hook with `IntersectionObserver`
- Respect `prefers-reduced-motion` — all animations disabled if user requests

```ts
// Example: respect prefers-reduced-motion
const prefersReducedMotion = useReducedMotion();
const transition = prefersReducedMotion ? { duration: 0 } : { duration: 0.6 };
```

### 4.5 Accessibility Checklist (WCAG 2.1 AA)
- All interactive elements keyboard-navigable
- Visible focus rings (`focus-visible:ring-2 focus-visible:ring-accent`)
- ARIA labels on icon-only buttons (menu, social icons)
- Form input has associated `<label>` (visually hidden if needed)
- Color contrast: text on `#000` ≥ 4.5:1
- `<main>`, `<section>`, `<header>`, `<footer>` semantic landmarks
- Heading hierarchy: one `<h1>`, then `<h2>` per section, no skipping levels
- Skip-to-content link at top

### 4.6 SEO Setup
```html
<!-- index.html -->
<title>Leads In The Pipe — Quality B2B Leads, Delivered</title>
<meta name="description" content="We fuel business growth with high-quality leads delivered straight to your pipeline. Lead generation, account management, and digital marketing." />
<meta property="og:title" content="Leads In The Pipe — Quality B2B Leads, Delivered" />
<meta property="og:description" content="..." />
<meta property="og:image" content="/og-image.png" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
```

Plus a `sitemap.xml` and `robots.txt` in `public/`.

---

## 5. Testing Strategy

### 5.1 Unit/Component Tests (Vitest + React Testing Library + vitest-axe)
Coverage target: **≥ 70%** for components in `src/components/`

Key test cases:
- `Hero.test.tsx` — form validates email; shows error for invalid input; calls submission handler on valid submit
- `Offering.test.tsx` — renders 3 tiers; mailto link has correct format with subject
- `Services.test.tsx` — renders 6 service cards with correct titles
- `useCountUp.test.ts` — counts from 0 to target on intersection
- `Footer.test.tsx` — renders correct address/contact/social
- `MobileMenu.test.tsx` — opens, traps focus, closes on Escape
- Every section component also gets a `vitest-axe` accessibility assertion

### 5.2 Manual cross-browser/device QA (no E2E framework)
QA agent maintains a manual checklist (see `qa.md` §5). Tested manually in:
- Chrome desktop (latest)
- Safari macOS (latest)
- Firefox (latest)
- Edge (latest)
- iOS Safari + Chrome Android (latest 2 versions)

### 5.3 Lighthouse CI
- Run on every PR via GitHub Actions
- Thresholds: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95, Best Practices ≥ 90

---

## 6. Build & Deployment

### 6.1 Local Development
```bash
pnpm install
cp .env.example .env.local      # Add VITE_FORMSPREE_ENDPOINT
pnpm dev                        # Vite dev server at localhost:5173
pnpm test                       # Vitest in watch mode
pnpm test:run                   # Vitest once (CI mode)
pnpm build                      # Production build → dist/
pnpm preview                    # Preview production build locally
```

### 6.2 CI/CD (GitHub Actions)
```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm typecheck
      - run: pnpm test:run
      - run: pnpm build
```

### 6.3 Deployment (Decision Pending)
**Output:** static `dist/` folder (HTML + JS + CSS + assets)

**Option A — Vercel (recommended):**
1. Push repo to GitHub
2. Import in Vercel dashboard
3. Add environment variable `VITE_FORMSPREE_ENDPOINT`
4. Auto-deploys on every push to `main`
5. In GoDaddy DNS: set A record to `76.76.21.21` (Vercel IP) and CNAME `www` → `cname.vercel-dns.com`

**Option B — Netlify:** Similar workflow, point GoDaddy DNS to Netlify nameservers

**Option C — GoDaddy hosting:** Run `pnpm build`, FTP `dist/` contents to `public_html/`. No CDN, no auto-deploy.

---

## 7. Environment Variables

| Variable | Purpose | Required |
|---|---|---|
| `VITE_API_BASE_URL` | Base URL of the FastAPI email backend. When set, the audit form POSTs to `/api/audit` and the hero form to `/api/lead`. | No — falls back to Formspree, then to a "setup pending" toast |
| `VITE_FORMSPREE_ENDPOINT` | Formspree form endpoint URL (fallback when `VITE_API_BASE_URL` is unset) | No — form gracefully no-ops if missing (shows "setup pending" toast) |
| `VITE_CONTACT_EMAIL` | Email used in mailto links | No — defaults to `hello@leadsinthepipe.com` per `docs/decisions.md` #3 |

Stored in `.env.local` (gitignored) and `.env.example` (committed).

**Backend env vars** (`backend/.env`, see `backend/.env.example`): `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `SMTP_USE_TLS`, `MAIL_FROM`, `MAIL_TO`, `ALLOWED_ORIGINS`. With `SMTP_HOST` blank the backend logs submissions instead of sending (dev mode).

---

## 8. Performance Budget

| Resource | Budget |
|---|---|
| Initial JS bundle | < 150 KB gzipped |
| Initial CSS | < 30 KB gzipped |
| Total page weight (first load) | < 500 KB |
| LCP image | < 100 KB (use modern format: WebP/AVIF) |
| Custom fonts | < 50 KB each, subset to Latin |

Use Vite's automatic code-splitting, lazy-load non-critical sections with `React.lazy` if needed.

---

## 9. Code Quality Standards

- **TypeScript strict mode** enabled (`strict: true` in tsconfig)
- **ESLint** with `eslint-plugin-react-hooks` and `@typescript-eslint`
- **Prettier** formatting (config: 2-space tabs, single quotes, trailing commas)
- **Component naming:** PascalCase (e.g., `Hero.tsx`)
- **Hook naming:** camelCase, prefixed `use` (e.g., `useCountUp.ts`)
- **No `any` types** in production code (use `unknown` + narrowing)
- **No inline styles** unless dynamically computed; prefer Tailwind utilities
- **Magic strings** for repeated values go in `src/data/` modules

---

## 10. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Formspree free tier exceeded (50/mo) | Document upgrade path; consider EmailJS fallback |
| Custom font licensing | Use Google Fonts or open-source via @fontsource |
| Icon recreation time | Designer agent prioritizes hero + service icons first; others can iterate |
| Animation performance on low-end mobile | Respect `prefers-reduced-motion`; gate heavy animations to viewport-only |
| Browser compatibility regressions | Manual cross-browser checklist in QA agent; Lighthouse audits in CI |
