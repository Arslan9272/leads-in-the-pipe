# Leads In The Pipe — Marketing Website

A single-page React marketing website for **Leads In The Pipe**, a B2B lead-generation agency + sales/CRM software product.

Built with **Vite + React 18 + TypeScript + Tailwind CSS + Framer Motion**. Deployed as a static site.

---

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# → Edit .env.local and add your Formspree endpoint

# Start dev server
pnpm dev
# → Opens at http://localhost:5173
```

---

## 📂 Project Documentation

| File | Purpose |
|---|---|
| [`CLAUDE.md`](./CLAUDE.md) | Master instructions for Claude Code (read this first if AI-assisted) |
| [`PRD.md`](./PRD.md) | Product Requirements Document (what we're building) |
| [`TRD.md`](./TRD.md) | Technical Requirements Document (how we're building it) |
| [`docs/acceptance-criteria.md`](./docs/acceptance-criteria.md) | Per-section checklist (PM-owned, QA-checked) |
| [`docs/plan.md`](./docs/plan.md) | Sprint plan |
| [`docs/decisions.md`](./docs/decisions.md) | Canonical decision log |
| [`docs/qa-log.md`](./docs/qa-log.md) | QA issue log |
| [`.claude/agents/`](./.claude/agents/) | 4 specialist subagents: designer, PM, frontend dev, QA |
| [`skills/`](./skills/) | 9 skill files (see Skills below) |

## 📐 Skills

Claude Code reads these `skills/*/SKILL.md` files for specialist context.

| Skill | When to read |
|---|---|
| [`frontend-design`](./skills/frontend-design/SKILL.md) | Before writing any UI code (required) |
| [`leadsinthepipe-brand`](./skills/leadsinthepipe-brand/SKILL.md) | Before any design or copy work (required) |
| [`component-patterns`](./skills/component-patterns/SKILL.md) | Before building/refactoring a component |
| [`file-reading`](./skills/file-reading/SKILL.md) | When the user uploads design references or assets |
| [`pdf-reading`](./skills/pdf-reading/SKILL.md) | When handling PDFs (brand guides, decks) |
| [`seo-optimization`](./skills/seo-optimization/SKILL.md) | When editing meta tags, hero copy, or articles |
| [`accessibility-patterns`](./skills/accessibility-patterns/SKILL.md) | When building interactive elements or running QA |
| [`animation-patterns`](./skills/animation-patterns/SKILL.md) | When implementing motion |
| [`performance-budget`](./skills/performance-budget/SKILL.md) | Before adding deps or when Lighthouse drops |

---

## 🛠 Common Commands

```bash
pnpm dev              # Vite dev server (http://localhost:5173)
pnpm build            # Production build → dist/
pnpm preview          # Serve production build locally

pnpm lint             # ESLint
pnpm format           # Prettier
pnpm typecheck        # TypeScript no-emit check

pnpm test             # Vitest in watch mode
pnpm test:run         # Vitest once (CI mode)
```

---

## 🌍 Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `VITE_FORMSPREE_ENDPOINT` | No | Formspree endpoint for hero email form. If missing, form gracefully no-ops with "setup pending" toast. |
| `VITE_CONTACT_EMAIL` | No | Email used in `mailto:` links. Defaults to `hello@leadsinthepipe.com` (placeholder — see `docs/decisions.md` #3) |

Sign up at [formspree.io](https://formspree.io) → create a form → copy the endpoint URL → paste into `.env.local`.

---

## 🎨 Design

- Design source: Figma file `groykhF4z4pReIxDon9oG6`
- Theme: **dark only** (`#000000` background, mint green accent)
- Aesthetic: modern minimalist
- New logo: Designer agent proposes 3 concepts at project kickoff
- All icons are custom SVG components in `src/components/icons/`

---

## 🤖 AI-Assisted Workflow

This project is designed to be built with **Claude Code**. The `.claude/agents/` folder contains 4 specialist subagents:

| Agent | Use for |
|---|---|
| **Designer** | Visual design, color, typography, logo, icons, motion direction |
| **Product Manager** | Scope, priorities, acceptance criteria, decision logs |
| **Frontend Developer** | Writing React/TS/Tailwind code, animations, forms |
| **QA** | Tests (Vitest + vitest-axe), Lighthouse, manual cross-browser/device, sign-off |

**Workflow mode:** Hybrid — sequential at kickoff (Designer → PM → Frontend Dev → QA), then on-demand for iterations.

Start a Claude Code session in this repo root, and Claude Code will automatically read `CLAUDE.md`.

---

## 📦 Build & Deploy

```bash
pnpm build
# → dist/ contains the static site (HTML + JS + CSS + assets)
```

Deploy options:
- **Vercel** (recommended): Import the repo, set `VITE_FORMSPREE_ENDPOINT` in dashboard, point GoDaddy DNS to Vercel
- **Netlify**: Similar workflow
- **GoDaddy hosting**: FTP the contents of `dist/` to `public_html/`

The hosting choice is deferred to the deploy phase — the build output is fully portable.

---

## 🧪 Testing

- **Vitest** + **React Testing Library** for component tests in `tests/components/`
- **vitest-axe** for automated component-level accessibility checks
- **Lighthouse CI** for performance + SEO + best-practices audits
- **Manual cross-browser/cross-device QA** via the checklist in `.claude/agents/qa.md`

CI runs lint, typecheck, tests, and build on every push (see `.github/workflows/ci.yml`).

---

## ♿ Accessibility

Target: **WCAG 2.1 AA**

- Keyboard navigable
- ARIA labels on all icon-only buttons
- Color contrast ≥ 4.5:1
- Respects `prefers-reduced-motion`
- Tested with axe-core in CI

---

## 📜 License

Proprietary — © Leads In The Pipe
