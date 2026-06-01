# Acceptance Criteria — Leads In The Pipe v1.0

**Owner:** PM agent (`product-manager`) maintains; QA agent (`qa`) checks items off only when verified.

Derived from `PRD.md` §5 (Page Sections) and §7 (Functional Requirements). Each item references the relevant PRD section or FR-ID.

---

## Header (PRD §5.1)

- [ ] Logo renders top-left (links to `#hero`)
- [ ] Hamburger menu icon visible on right at all viewports
- [ ] Sticky on scroll
- [ ] Background fades in on scroll-down (subtle blur)
- [ ] Hamburger opens `MobileMenu` overlay
- [ ] Layout works at 360 / 768 / 1024 / 1280 px

## Hero (PRD §5.2)

- [ ] Headline "Leads In The Pipe" matches display typography (`h1`)
- [ ] Subhead copy matches PRD verbatim
- [ ] Email input validates with regex `/^.+@.+\..+$/`
- [ ] "Get a Quote" button disabled until input valid
- [ ] Form submits to `VITE_FORMSPREE_ENDPOINT` (FR-1)
- [ ] Success toast appears 4 s on success (FR-2)
- [ ] Error toast appears 4 s on failure (FR-2)
- [ ] Pipe-bubble graphic animates on page load (FR-9)
- [ ] Graceful no-op when `VITE_FORMSPREE_ENDPOINT` missing (shows "setup pending" toast)
- [ ] Layout works at 360 / 768 / 1024 / 1280 px

## Non-Stop Flow of Quality Leads (PRD §5.3)

- [ ] Pipe-fitting illustration renders left (desktop) / above (mobile)
- [ ] Heading "Non-Stop Flow of Quality Leads" matches PRD
- [ ] Body copy matches PRD verbatim

## Services We Provide (PRD §5.4)

- [ ] Section heading "Services we provide"
- [ ] 6 service cards render with correct titles + descriptions
- [ ] Central tile features brand mark/logo
- [ ] Each card has icon + title + 1-line description
- [ ] Hover lift + accent border (FR-6)
- [ ] Grid: 3-cols desktop, 2-cols tablet, 1-col mobile

## Our Recipe for Success (PRD §5.5)

- [ ] Heading "Our recipe for success"
- [ ] Body paragraph matches PRD
- [ ] 3 stat counters animate from 0 → target on scroll into view (FR-4): 1200, 300, 230
- [ ] Counters snap to target when `prefers-reduced-motion` enabled

## What We Do (PRD §5.6)

- [ ] Sticky heading on desktop (`lg:`)
- [ ] 7 capability blocks render with correct titles
- [ ] Each block: icon + title + 2-line description

## Offering (PRD §5.7)

- [ ] Vertical "OFFERING" marquee scrolls continuously (FR-5)
- [ ] Marquee paused on `prefers-reduced-motion`
- [ ] 3 pricing tiers render: Basic / Standard / Bespoke
- [ ] Tier headings use correct accent colors (mint / cyan / coral)
- [ ] All 3 "Get a Quote" buttons are `mailto:` with `?subject=` (FR-3)
- [ ] Subject format: `Quote Request - [Tier]`

## Articles & News (PRD §5.8)

- [ ] Heading "Articles & News" + "Browse all" link
- [ ] 3 article preview cards with date / headline / "Learn more →"
- [ ] All "Learn more" links are `href="#"` (placeholders)

## Let's Talk (PRD §5.9)

- [ ] "Stay in touch" small label
- [ ] Large heading "Let's Talk" + arrow icon
- [ ] Subtext "Feel free to contact us"
- [ ] Animated green sun/star rotates (paused on reduced motion)
- [ ] Whole section is `mailto:` link

## Footer (PRD §5.10)

- [ ] Logo top-left
- [ ] Address column: `14 New South Head Rd, Triple Bay 3148`
- [ ] Contact column: phone + email (`hello@leadsinthepipe.com`)
- [ ] Sitemap column: anchor links (Intro / About / Pricing / Guide)
- [ ] 4 social icons (Instagram / Facebook / Pinterest / Twitter) — all `href="#"`
- [ ] Copyright line

## Mobile Menu

- [ ] Opens on hamburger click
- [ ] Full-screen overlay with anchor links + social icons
- [ ] Traps focus (Tab cycles within overlay)
- [ ] Escape closes
- [ ] Click on anchor link closes + scrolls
- [ ] Focus returns to hamburger on close

## Non-Functional (PRD §8)

- [ ] Lighthouse Performance ≥ 90 (desktop + mobile)
- [ ] Lighthouse Accessibility ≥ 95
- [ ] Lighthouse Best Practices ≥ 90
- [ ] Lighthouse SEO ≥ 95
- [ ] Zero axe-core serious/critical violations
- [ ] Tab through entire page — focus rings visible everywhere
- [ ] Skip-to-content link works
- [ ] All anchor links smooth-scroll (FR-8)
- [ ] All scroll-fade reveals work (FR-10)
- [ ] No console errors / warnings in production build
