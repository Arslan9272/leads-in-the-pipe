# CLAUDE.md — Leads In The Pipe

> This file is read automatically by Claude Code at the start of every session. It defines how Claude works on this project: the goals, the rules, the workflow, and which subagents to invoke for which tasks.

---

## 🎯 Project at a Glance

**What we're building:** A single-page marketing website for **Leads In The Pipe** — a B2B lead-generation agency + sales/CRM software product.

**Source of truth for design:** Figma file `groykhF4z4pReIxDon9oG6` (user provided screenshots in `docs/figma-reference/` if available).

**Source of truth for product scope:** `PRD.md`
**Source of truth for technical decisions:** `TRD.md`

Always read PRD.md and TRD.md before starting any non-trivial task.

---

## 🛠 Tech Stack (Locked)

- **Vite** + **React 18** + **TypeScript** (strict mode)
- **Tailwind CSS** (design tokens in `tailwind.config.ts`)
- **Framer Motion** for animations
- **Formspree** for the hero email form
- **Vitest** + **React Testing Library** + **vitest-axe** (component-level testing only — no E2E)
- **pnpm** as package manager
- **GitHub** for source control

**Do not introduce new major dependencies without updating TRD.md and asking the user.**

---

## 📐 Skills to Use

This project includes a local `skills/` folder at the repo root with:
- **Anthropic built-in skills** copied locally so Claude Code can read them offline (`skills/frontend-design/`, `skills/file-reading/`, `skills/pdf-reading/`)
- **Project-specific custom skills** (`skills/leadsinthepipe-brand/`, `skills/component-patterns/`)

### Always Read First (Required)
- **`skills/frontend-design/SKILL.md`** — Read this **before writing any UI code**. It defines aesthetics, motion, typography, and design quality standards.
- **`skills/leadsinthepipe-brand/SKILL.md`** — Project brand identity, color tokens, voice/tone, do's and don'ts. Read before any design or copy work.

### Read When Relevant
- **`skills/component-patterns/SKILL.md`** — Patterns for sections, forms, animations, accessibility used in this project. Read before building/refactoring a component.
- **`skills/file-reading/SKILL.md`** — If the user uploads design references, brand assets, or copy documents.
- **`skills/pdf-reading/SKILL.md`** — If the user provides a brand guide PDF or similar.

### Read When Relevant — Effectiveness
- **`skills/seo-optimization/SKILL.md`** — When editing `index.html`, hero copy, or articles. Meta tags, OG/Twitter cards, JSON-LD schema, Core Web Vitals.
- **`skills/accessibility-patterns/SKILL.md`** — When building any interactive element or running QA. WCAG 2.1 AA patterns: focus trap, skip link, form a11y, reduced motion.
- **`skills/animation-patterns/SKILL.md`** — When implementing motion. Framer Motion vs CSS, scroll reveals, marquee, useCountUp, performance rules.
- **`skills/performance-budget/SKILL.md`** — Before adding a dependency, committing assets, or when Lighthouse drops. Budgets, bundle inspection.

### Skip
- Anything not in `skills/` — not relevant to this project unless explicitly added.

---

## 🤝 The 4 Subagents

This project uses **4 specialized subagents** in `.claude/agents/`. Each has its own system prompt and focus area:

1. **`designer`** — Visual design, color, typography, layout, logo proposals, modernization tweaks
2. **`product-manager`** — Scope, priorities, decision logs, stakeholder questions, acceptance criteria
3. **`frontend-developer`** — Writes React/TS/Tailwind code, integrates Framer Motion, handles forms
4. **`qa`** — Reviews code, writes Vitest component tests, runs Lighthouse, accessibility audits

### Workflow Mode: **Hybrid (sequential first, then on-demand)**

**Phase 1 — Sequential kickoff (first run only):**
```
designer  →  product-manager  →  frontend-developer  →  qa
```
- **Designer** first: confirms tokens, proposes 3 logo concepts, locks aesthetic
- **PM** next: confirms scope from PRD, opens any blocker questions
- **Frontend Dev** then: scaffolds project, implements sections in order
- **QA** last: writes tests, runs full checks, signs off

**Phase 2 — On-demand iterations (everything after):**
The user (or main Claude thread) invokes whichever agent fits the task. Examples:
- "Designer, suggest a better hero animation"
- "Frontend Dev, refactor the Offering section to use a single map"
- "QA, add a component test for the mobile menu Escape-key behavior"
- "PM, what's the priority on adding a Calendly embed?"

### How to invoke a subagent
Use Claude Code's Task tool with the agent name. Each subagent file in `.claude/agents/` defines its own behavior.

---

## 📋 Build Order (Phase 1 Sequential)

Follow this order for the initial build:

1. **Designer** confirms:
   - Logo direction (3 concepts → user picks one)
   - Exact mint green hex (sample from Figma screenshot)
   - Font pairing (display + body)
   - Any modernization tweaks beyond the Figma baseline

2. **PM** confirms:
   - PRD scope is correct
   - Open issues from PRD §9 resolved or deferred
   - Acceptance criteria checklist created

3. **Frontend Dev** scaffolds + builds in this order:
   1. Project init (`pnpm create vite`, install deps, configure Tailwind/ESLint/Prettier/Vitest)
   2. Tailwind config with design tokens (from TRD §3)
   3. Custom SVG icon components in `src/components/icons/`
   4. UI primitives in `src/components/ui/`
   5. Section components (top to bottom of page):
      - Header → Hero → QualityLeads → Services → RecipeForSuccess → WhatWeDo → Offering → Articles → LetsTalk → Footer
   6. Mobile menu overlay
   7. Form integration (Formspree)
   8. Animations (Framer Motion + CSS)
   9. SEO meta + favicon + Open Graph

4. **QA** runs:
   - Vitest component tests written + passing (with `vitest-axe` for a11y)
   - Lighthouse audit on production build (desktop + mobile)
   - Manual cross-browser/cross-device checklist (see `qa.md`)
   - Acceptance criteria checklist signed off

---

## 🚦 Hard Rules

1. **Mobile-first.** Always write the mobile layout first, then scale up with `md:`/`lg:` prefixes. Never the reverse.
2. **TypeScript strict.** No `any`. Use `unknown` + type narrowing.
3. **No new dependencies** without updating TRD.md and getting user approval.
4. **Respect `prefers-reduced-motion`.** Every animation must have a no-motion fallback.
5. **Accessibility is non-negotiable.** WCAG 2.1 AA. Test with keyboard before merging.
6. **Lighthouse Performance ≥ 90, Accessibility ≥ 95** are merge gates.
7. **Never commit secrets.** `.env.local` is gitignored. Use `.env.example` for shape.
8. **Run tests before declaring done.** `pnpm lint && pnpm typecheck && pnpm test:run && pnpm build` must all pass.
9. **Pure dark theme.** No light mode in v1.0. Don't add toggle logic.
10. **Logo work goes through the Designer agent.** Don't substitute a different logo without proposing it through the design process.

---

## 🎨 Design Direction (Locked with User)

- **Aesthetic:** Modern minimalist — clean lines, generous whitespace, refined typography
- **Theme:** Dark only (`#000000` background, mint green accent)
- **Logo:** New design — Designer agent proposes 3 concepts, user picks
- **Animations:** Medium level — stat counter animations, "OFFERING" marquee, scroll-triggered fades, hero pipe-bubble ambient motion
- **Icons:** All custom SVGs recreated from Figma (not from a library)

---

## 📞 Form & CTA Behavior

| Element | Behavior |
|---|---|
| Hero email + "Get a Quote" button | Submits to Formspree (`VITE_FORMSPREE_ENDPOINT`) |
| Basic / Standard / Bespoke "Get a Quote" buttons | `mailto:hello@leadsinthepipe.com` with `?subject=Quote%20Request%20-%20[Tier]` (centrally swappable via `VITE_CONTACT_EMAIL`) |
| Header menu (hamburger) | Opens fullscreen overlay with anchor links + social icons |
| Article "Learn more →" links | `href="#"` (non-functional in v1.0) |
| Social icons in footer | `href="#"` (placeholders) |
| Footer sitemap links | Anchor links to in-page sections |

---

## 🌍 Environment

- `VITE_FORMSPREE_ENDPOINT` — required for form to work in production
- `.env.example` is committed showing required vars
- `.env.local` is user-owned and gitignored

---

## 🚀 Deploy

Hosting decision is deferred (user will pick at the end). The build output is a standard static `dist/` folder that works on:
- **Vercel** (recommended — point GoDaddy DNS to Vercel)
- **Netlify** (similar)
- **GoDaddy hosting** (FTP the `dist/` contents to `public_html/`)

When the user picks, the **Frontend Dev** and **QA** agents help with:
- DNS configuration
- Environment variable setup
- Smoke test post-deploy

---

## 📚 Reference Files in This Repo

| File | Purpose |
|---|---|
| `CLAUDE.md` | This file — master instructions |
| `PRD.md` | Product requirements (what we're building & why) |
| `TRD.md` | Technical requirements (how we're building it) |
| `README.md` | Developer setup instructions |
| `.claude/agents/designer.md` | Designer subagent spec |
| `.claude/agents/product-manager.md` | PM subagent spec |
| `.claude/agents/frontend-developer.md` | Frontend Dev subagent spec |
| `.claude/agents/qa.md` | QA subagent spec |
| `docs/acceptance-criteria.md` | PM-owned per-section checklist (QA checks items off) |
| `docs/plan.md` | Sprint plan |
| `docs/decisions.md` | Decision log (canonical) |
| `docs/qa-log.md` | QA issue log |
| `skills/*/SKILL.md` | 9 skill files — see Skills to Use section above |

---

## ⚙️ Common Commands

```bash
# Setup (first time)
pnpm install
cp .env.example .env.local      # then fill in VITE_FORMSPREE_ENDPOINT

# Development
pnpm dev                        # Vite dev server (http://localhost:5173)
pnpm test                       # Vitest in watch mode
pnpm test:run                   # Vitest once (CI mode)
pnpm typecheck                  # tsc --noEmit
pnpm lint                       # ESLint
pnpm format                     # Prettier write

# Production
pnpm build                      # → dist/
pnpm preview                    # serve dist/ at localhost:4173
```

---

## 🧭 When in doubt

1. Re-read `PRD.md` and `TRD.md`
2. Pick the right subagent for the task and invoke it
3. If still unclear, ask the user a focused yes/no question — don't guess on scope

---

**Last updated:** May 2026 — v1.0 spec
