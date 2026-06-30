# Leads In The Pipe — Redesign Design Spec (weegrow-inspired, multi-page)

> Implementation-ready notes for the frontend-developer agent. Dark theme only (`#000`). Dual-accent system: **mint `#9EFB9C` = primary identity**, **orange heat = secondary interactive/energy accent**. Mint stays the brand; orange is the "things are happening" signal (hover, active, momentum). Do not invert this hierarchy.

Reusable easing throughout: `cubic-bezier(0.16, 1, 0.3, 1)`. Default reveal duration 0.6s, stagger 0.08s.

---

## 1. Orange "heat" token family

Contrast-verified against `#000000`. Heat orange is warm but not red, distinct from the Bespoke pricing coral (`#FF6B5C`).

| Token | Hex | Role | Contrast on `#000` |
|---|---|---|---|
| `accent-heat` (DEFAULT) | `#FF7A1A` | Hover text, active state, icon fill on hover, funnel "active" segment, cycling tool-chip highlight, CTA hover bg | **8.0:1** — AA all sizes |
| `accent-heat-dim` | `#E0631A` | Hover **border**, pressed/active CTA, chip border on hover | **5.6:1** — AA all sizes |
| `accent-heat-glow` | `rgba(255,122,26,0.28)` | Soft outer glow shadow on hover (alpha only, never text/border) | decorative |

On the **light alternate surface** (`#F4F2EC`, §5): use `accent-heat-dim` only for large text (≥24px / ≥19px bold) or borders. Small body copy on light uses near-black `#0A0A0A`.

Orange glow shadow (`boxShadow.heat`): `0 0 0 1px #E0631A, 0 8px 30px -6px rgba(255,122,26,0.28)` — ring + soft bloom, used on card/CTA hover.

---

## 2. Hover semantics (interactive cards + primary CTA)

### Interactive card (service / pricing / tool-stack panel / FAQ row)
- **Base:** `bg-card` (`#111`), `border-border`, icon + label mint `#9EFB9C` (or white for neutral cards).
- **Hover / focus-visible:** border → `accent-heat-dim`; icon + key label/number → `accent-heat`; `scale 1.02` (origin center); `shadow heat`; transition `transform/border-color/color/box-shadow 0.3s` standard easing.
- **Focus-visible:** same border + glow as hover (keyboard users get the heat signal).
- **Reduced motion:** drop scale + bloom; keep color change only (border → heatDim, icon/label → heat), 0.2s. Ring may stay.

### Primary CTA button
- **Base:** solid mint `bg-accent`, text `#000`, `font-semibold`, `rounded-full`.
- **Hover:** bg animates mint→`accent-heat`, text stays `#000`, lift `translateY(-2px)`, add `shadow heat`.
- **Active:** `accent-heat-dim` bg, no lift.
- **Reduced motion:** color shift only, no translate/bloom.
- **Secondary/ghost:** transparent + `border-border`, white text → hover border `accent-heat-dim`, text `accent-heat`.

---

## 3. Per-page header ("page hero")

Every non-home page opens with a tall, quiet hero. Home keeps its existing hero.

- **Layout:** full-width black, `pt-32 pb-16` mobile / `md:pt-40 md:pb-24` / `lg:pb-32`, left-aligned, `max-w-3xl`. Stack: eyebrow → H1 → optional dek (`text-secondary`, `max-w-xl`).
- **Eyebrow:** JetBrains Mono, `text-xs`, `uppercase`, `tracking-[0.2em]`, color `accent` mint, prefixed by a 24px mint hairline tick (`bg-accent`, 1px tall). Services/Pricing may use a `accent-heat` tick.
- **H1 (Geist):** `text-5xl` / `md:text-6xl` / `lg:text-7xl`, `font-medium`, `leading-[1.02]`, `tracking-tight`. One highlighted word max.
- **Dek:** `text-lg md:text-xl`, `text-secondary`, `leading-relaxed`, `mt-6`.
- **Motion:** eyebrow fade+rise (0.5s) → H1 per-line clip reveal (y 100%→0, 0.7s, stagger 0.08s) → dek fade (delay 0.3s). Reduced motion: single opacity fade 0.3s.
- Props: `eyebrow`, `title` (optional highlighted segment), `dek`.

---

## 4. Funnel strip (horizontal marquee)

Thin always-moving band under the home hero (optionally atop Services/Pricing heroes).

- **Content:** `COLD → ENGAGED → MEETING → OPPORTUNITY → DEAL` interleaved with stat chips (`+38% reply rate`, `12 days to first meeting`). Duplicate track for seamless loop.
- **Type:** stage labels JetBrains Mono `uppercase text-sm tracking-[0.18em]`; stat chips mono `text-xs` in a pill (`border-border rounded-full px-3 py-1`, number mint, unit `text-muted`).
- **Separators:** `→` / rotated `ArrowUpRight` at `text-muted`, `mx-4`.
- **Color logic (heat sweep):** base stages `text-secondary`; one "active" stage at a time in `accent-heat`, advancing left→right (~1.4s/step); `DEAL` lands in mint `#9EFB9C` (closed/won = brand color) before reset.
- **Track motion:** ~40s linear loop; `mask-image` fade both edges (~64px); `py-4`, `border-y border-border`.
- **Reduced motion:** stop marquee AND stage cycling; show `DEAL` as the lone mint-highlighted stage.

---

## 5. Tool-stack + "We don't run campaigns. We build revenue systems."

These two sections share the **light alternate surface** — the only inversion on the site, giving the page weegrow-like texture.

- **Surface:** warm off-white `#F4F2EC` (paper). Heading `#0A0A0A` (~18:1), body `#3A3A3A`. Mint only as fill/shape (dots, underline bars, icon bg), not text. Accent text on light = `accent-heat-dim` large only, else near-black. Rounded slab (`rounded-[2rem]` / inset `rounded-3xl`) dropped onto black.
- **Statement:** Geist `text-4xl md:text-6xl font-medium leading-[1.05] tracking-tight` near-black; "**revenue systems**" highlighted via `accent-heat-dim` (large) or a mint underline bar (`h-1 bg-accent`).
- **Tool chips:** `inline-flex items-center gap-2 rounded-full border border-[#D8D5CC] bg-white/60 px-4 py-2`, label `#0A0A0A` mono `text-sm`, optional glyph `currentColor`. Layout: `flex flex-wrap gap-3` or two opposite-drift marquee rows (~50s).
- **Cycling highlight:** one chip lights up at a time (border `accent-heat-dim`, label `accent-heat-dim`, faint mint dot, `scale 1.04`), holds ~1.6s, passes to next (wrapping). 0.4s transitions. Reduced motion: no cycling/scale; optional single static highlight.

---

## 6. FAQ accordion · Pipeline-audit form · Footer

### FAQ accordion (dark)
Rows split by `border-b border-border`. Question `py-6`, Geist `text-lg md:text-xl font-medium` white, with `+`/`−` mint toggle rotating 45°→0 on open. Open: question → mint, answer `text-secondary text-base leading-relaxed pb-6 max-w-2xl`. Hover closed row: question + glyph → `accent-heat` (no scale). Motion: `AnimatePresence` height auto, 0.35s; reduced motion = instant + color only.

### Pipeline-audit form (Contact)
Single column `space-y-6 max-w-xl`. Labels mono `text-xs uppercase tracking-[0.15em] text-secondary`. Inputs `bg-card border-border rounded-xl px-4 py-3` white text, placeholder `text-muted`; focus = `border-accent` mint + 1px mint ring (mint = trust on conversion surface). Submit = primary CTA (mint→heat hover). Success: mint check + line. Error: coral (`tier-bespoke`) border + message — NOT heat. Motion: fields fade/rise 0.06s stagger on scroll-in; reduced motion = opacity only.

### Footer (dark)
Oversized wordmark watermark up top (Geist `text-5xl md:text-7xl`, low-opacity white). Sitemap columns `text-secondary`, hover → `accent-heat`. Social icons `currentColor` base `text-secondary` hover `accent-heat` (color only). Hairline `border-t border-border`; bottom row copyright `text-muted text-xs` mono.

---

## Token additions (applied to `tailwind.config.ts`)
- `colors.accent.heat` → `#FF7A1A`
- `colors.accent.heatDim` → `#E0631A` (class `accent-heatDim`)
- `colors.accent.heatGlow` → `rgba(255,122,26,0.28)`
- `colors.surface.light` → `#F4F2EC` (class `bg-surface-light`, `text-surface-light`)
- `boxShadow.heat` → `0 0 0 1px #E0631A, 0 8px 30px -6px rgba(255,122,26,0.28)`

Orange verified ≥4.5:1 on `#000` for text and ≥3:1 for UI. On light `#F4F2EC`, orange restricted to large text/borders.
