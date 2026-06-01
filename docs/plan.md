# Sprint Plan — Leads In The Pipe v1.0

**Owner:** PM agent. Adjust as needed based on user pace.

## Phase 1 — Sequential Kickoff (Day 1–5)

| Day | Owner | Deliverables |
|---|---|---|
| Day 1 | Designer | Color tokens locked, font pairing locked (Geist + Manrope), 3 logo concepts → Concept A wordmark chosen, motion direction doc |
| Day 1–2 | PM | PRD review + decisions log closed, acceptance criteria (`docs/acceptance-criteria.md`), scope confirmation |
| Day 2–4 | Frontend Dev | Scaffold + Tailwind tokens + icons + UI primitives + sections (top → bottom of page) + mobile menu + form integration + animations + SEO meta |
| Day 4–5 | QA | Vitest tests for all sections + hooks, Lighthouse desktop + mobile audit, manual cross-browser checklist, accessibility audit |
| Day 5 | All | Sign-off + deploy decision (Vercel / Netlify / GoDaddy) |

## Phase 2 — On-Demand Iterations

After Phase 1 ships, work happens on user request. Example invocations:

- "Designer, suggest a better hero animation"
- "Frontend Dev, refactor the Offering section to use a single map"
- "QA, add a component test for the mobile menu Escape-key behavior"
- "PM, what's the priority on adding a Calendly embed?"

## Critical Path

1. Designer must lock tokens before Frontend Dev scaffolds Tailwind config
2. PM must close PRD decisions log before QA writes acceptance criteria off it
3. Frontend Dev must finish a section before QA writes its component test
4. QA must sign off before deploy

## Risks (Active)

| Risk | Owner | Mitigation |
|---|---|---|
| Formspree endpoint not provisioned in time | User | Form gracefully no-ops with "setup pending" toast |
| Real contact email not provided | User | Placeholder `hello@leadsinthepipe.com` used |
| Hosting decision unmade | User | Build output is static `dist/` — portable to Vercel / Netlify / GoDaddy |

## Out of Scope (Confirmed)

See `PRD.md` §4. v2 candidates: article CMS, analytics, Calendly embed, live chat, multi-page expansion.
