---
name: leadsinthepipe-brand
description: Brand identity for Leads In The Pipe — voice, tone, color tokens, logo rules, motion specs, and copy do/don'ts. Read before any design or copy work.
---

# Leads In The Pipe — Brand Identity

The product is a **hybrid B2B lead-gen agency + sales/CRM software**. Audience is growth-hungry founders and SDR managers. The brand sells **credibility** through design quality, not hype.

## Positioning

- **What we are:** A team that delivers quality B2B leads, on time, every time
- **What we are not:** A "growth hacker" agency, a vibes-only brand, a SaaS-buzzword shop
- **One-line promise:** "Quality B2B leads, delivered."

## Voice & Tone

- **Confident, never cocky.** "We deliver quality leads" — not "We're crushing it!"
- **Direct.** Short headlines. Subheads under 140 chars.
- **You-addressed.** Talk to the reader: "Fueling **your** business growth."
- **No exclamation marks.** Ever.
- **No buzzwords.** Avoid "synergy", "10x", "game-changer", "disruptive", "revolutionize", "leverage".
- **Active voice.** "We source data" not "Data is sourced".

### Examples

| ✅ Good | ❌ Avoid |
|---|---|
| "Quality leads, delivered." | "10x your pipeline, fast!" |
| "We ensure your sales funnel is never dry." | "Crush your sales goals with us!" |
| "Get a quote" | "Get started now ⚡" |
| "Non-stop flow of quality leads" | "Never-ending lead waterfall 🚀" |

## Color Tokens (Canonical)

These mirror `tailwind.config.ts` — keep both in sync.

| Token | Hex | Use |
|---|---|---|
| `bg.DEFAULT` | `#000000` | Page background |
| `bg.surface` | `#0A0A0A` | Hero / section dividers |
| `bg.card` | `#111111` | Service / tier cards |
| `bg.elevated` | `#1A1A1A` | Card hover |
| `accent.DEFAULT` | `#9EFB9C` | Mint — primary accent |
| `accent.dim` | `#7DD97B` | Hover for mint accents |
| `tier.basic` | `#9EFB9C` | Basic pricing tier heading |
| `tier.standard` | `#4FB6E8` | Standard pricing tier heading |
| `tier.bespoke` | `#FF6B5C` | Bespoke pricing tier heading |
| `text.primary` | `#FFFFFF` | Body / heading copy |
| `text.secondary` | `#A1A1A1` | Sub-copy, muted |
| `text.muted` | `#8A8A8A` | Captions, footer fine print (AA-passing on `bg.DEFAULT`) |
| `border.subtle` | `#1F1F1F` | Section dividers |
| `border.DEFAULT` | `#2A2A2A` | Card borders |

## Typography (Locked)

- **Display:** Geist (via `@fontsource/geist-sans`) — weights 400, 500, 600, 700
- **Body:** Manrope (via `@fontsource/manrope`) — weights 400, 500, 600

Reference [[frontend-design]] for the type scale and spacing rules.

## Logo Rules

**Concept A — Wordmark with droplet-dot:** "Leads In The Pipe" in Geist 600. The dot of the lowercase "i" in "Pipe" is replaced with a flowing mint-green droplet shape, signaling pipeline flow.

- Minimum render size: 120 px wide
- Clear space: 1× cap-height on all sides
- Allowed colors: white wordmark + mint droplet (primary); all-white (monochrome); all-mint (single-color)
- **Never:** stretch, recolor the wordmark, rotate, add effects, place on busy backgrounds, replace the droplet with another shape

## Brand-Specific Motion

| Element | Behavior | Period |
|---|---|---|
| Hero pipe-bubble | Subtle pulse (scale 1.0 → 1.05) | 3 s |
| Sun-star (Let's Talk) | Linear rotation | 12 s |
| "OFFERING" marquee | Vertical scroll, top-to-bottom loop | 15 s |
| Stat counters | Count 0 → target on viewport entry | 1.5 s |

All paused on `prefers-reduced-motion: reduce` — show the end state immediately.

## Copy Source

All section copy lives verbatim in `PRD.md` §5. Do not paraphrase. If the copy needs revising, update PRD first, then the data module in `src/data/`.

## Contact

Placeholder until user provides real address: `hello@leadsinthepipe.com` (also exposed via `VITE_CONTACT_EMAIL` env var). See [[../docs/decisions.md]] for context.

## Reference Files

- Figma source: file `groykhF4z4pReIxDon9oG6`
- Brand-relevant decisions: `docs/decisions.md`
- Acceptance criteria for design fidelity: `docs/acceptance-criteria.md`
