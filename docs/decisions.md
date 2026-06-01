# Decision Log — Leads In The Pipe

Canonical home for all project decisions. Update on every "should we do X?" with status, owner, and resolution.

| # | Item | Status | Owner | Resolution |
|---|---|---|---|---|
| 1 | Final logo concept (3 to be proposed by Designer) | **Resolved** | Designer | Concept A — wordmark with droplet-dot on "i" in "Pipe". Mint accent. Swappable via `src/components/icons/Logo.tsx`. |
| 2 | Final hosting platform (GoDaddy / Vercel / Netlify) | **Deferred** | User | Decision at deploy phase. Build output (`dist/`) is portable. |
| 3 | Email `contact@uspIease.com` typo (PRD §5.7, §5.10) | **Resolved** | PM | Replaced with placeholder `hello@leadsinthepipe.com`. Centrally swappable via `VITE_CONTACT_EMAIL` env var (defaults in `src/lib/constants.ts`). User to confirm real address before launch. |
| 4 | Article links non-functional in v1.0 | **Resolved** | PM | `href="#"` placeholders acceptable per PRD §4. Real articles deferred to v2 (Article CMS). |
| 5 | Social links use `#` placeholders | **Resolved** | PM | Acceptable for v1.0 launch. User will provide real URLs post-launch. |
| 6 | Display + body font pairing | **Resolved** | Designer | Geist (display) + Manrope (body) via `@fontsource/*` packages. |
| 7 | Mint green exact hex | **Resolved** | Designer | `#9EFB9C` (matches TRD §3 target). |
| 8 | Tier accent colors | **Resolved** | Designer | Basic `#9EFB9C` / Standard `#4FB6E8` / Bespoke `#FF6B5C` per TRD §3. |
| 9 | `text.muted` color bumped from `#6B6B6B` to `#8A8A8A` | **Resolved** | QA | Lighthouse a11y audit flagged 6 contrast failures (4.0:1 vs WCAG AA's 4.5:1 for normal text). New value gives ~6.2:1 on `bg.DEFAULT`. Brand skill + Tailwind config updated. |

## Open

_None as of v1.0 build start._

## How to Use This Log

- **New decision:** add a row with status `Open`, owner, and the question
- **Decision made:** flip to `Resolved`, fill in resolution + date if helpful
- **Decision deferred:** mark `Deferred`, name the trigger condition (e.g., "at deploy phase")
- **Decision reversed:** add a new row referencing the original by # — do not delete history
