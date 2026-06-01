# Product Requirements Document (PRD)
## Leads In The Pipe — Marketing Website

**Version:** 1.0
**Date:** May 2026
**Owner:** Product Manager (Claude subagent)
**Status:** Draft for Development

---

## 1. Executive Summary

Leads In The Pipe is a hybrid B2B lead-generation **agency** and **sales/CRM software product**. This document specifies the requirements for a single-page marketing website that serves as the company's primary digital presence — communicating the value proposition, showcasing services, presenting pricing tiers, and capturing inbound quote requests.

The site is being built from a finalized Figma design (`groykhF4z4pReIxDon9oG6`) with selective modernization improvements (new logo, refined minimalist aesthetic, motion design).

---

## 2. Goals & Success Metrics

### Primary Goals
1. **Lead capture** — Convert visitors into quote requests via the hero email form (Formspree integration).
2. **Brand positioning** — Establish Leads In The Pipe as a credible, modern B2B partner that combines agency services with software.
3. **Service clarity** — Communicate the six core services and three pricing tiers without friction.

### Success Metrics (post-launch tracking)
| Metric | Target |
|---|---|
| Page Lighthouse Performance | ≥ 90 |
| Page Lighthouse Accessibility | ≥ 95 |
| Time to Interactive (TTI) | < 3s on 4G |
| Form submission rate | ≥ 3% of unique visitors |
| Mobile bounce rate | < 50% |
| Cross-browser compatibility | Last 2 versions of Chrome, Safari, Firefox, Edge |

---

## 3. Target Audience

### Primary Persona — "Growth-Hungry Founder"
- B2B SaaS or service business founder, 28–45 years old
- Frustrated with inconsistent lead flow
- Considering outsourcing lead gen vs. building in-house
- Evaluates vendors based on credibility signals (stats, design quality, clarity of offering)
- **Decision driver:** Does this team look like they can deliver?

### Secondary Persona — "Sales Operations Manager"
- Established mid-market company
- Looking for tools + services to augment internal SDR team
- Cares about the "Standard" and "Bespoke" tiers

---

## 4. Scope

### In Scope (v1.0)
- Single-page responsive website (mobile-first)
- 10 sections: Header, Hero, Quality Leads, Services, Recipe for Success, What We Do, Offering/Pricing, Articles & News (placeholder), Let's Talk, Footer
- Hero email capture form → Formspree
- Pricing tier CTAs → `mailto:` links
- New logo design (3 concepts proposed by Designer agent, user picks one)
- Custom SVG icon system recreated from Figma
- Medium-level scroll & entry animations
- SEO meta tags, Open Graph image, favicon
- Dark theme only (no light mode)

### Out of Scope (v1.0)
- User authentication / dashboard
- Real article content & individual article pages (placeholders only)
- Analytics (Google Analytics, Meta Pixel) — deferred
- Multi-language support
- Blog CMS
- Backend API (form handled by Formspree)
- Light theme toggle
- E-commerce / payment flow

### Future Considerations (v2.0+)
- Article CMS (Contentful or Sanity)
- Analytics integration
- Calendly embed in "Let's Talk" section
- Live chat widget (Intercom or Crisp)
- Multi-page expansion (About, Case Studies, Blog)

---

## 5. Page Sections & Requirements

### 5.1 Header
- **Logo** (new design — proposed by Designer agent)
- Hamburger menu icon on right (mobile + desktop)
- Sticky on scroll with subtle background blur on scroll-down
- Menu opens overlay with anchor links to each section + social icons

### 5.2 Hero
- Headline: **"Leads In The Pipe"**
- Subhead: "Fueling your business growth with high-quality leads delivered straight to your pipeline"
- Email input + "Get a Quote" button (primary CTA)
- Animated circular pipe-bubble graphic (right side desktop, below text on mobile)
- Form submits to Formspree endpoint
- Inline validation (valid email regex), success/error toast feedback

### 5.3 Non-Stop Flow of Quality Leads
- Pipe-fitting illustration (left) — recreated as animated SVG
- Heading: "Non-Stop Flow of Quality Leads"
- Body: "We ensure your sales funnel is never dry, and the lead flow is never slow by bringing the right people at the right time to the right place for you."

### 5.4 Services We Provide
- Section heading: "Services we provide"
- 6 service cards in responsive grid (3-2-1 layout: desktop / tablet / mobile)
- Central tile features the brand mark/logo
- Each card: icon + title + 1-line description
- Cards:
  1. **Targeted Prospecting** — Identify and prioritize the decision-makers that matter most
  2. **Multi-Channel Outreach** — Engage prospects via email, LinkedIn, and phone campaigns
  3. **Appointment Setting** — Schedule qualified meetings directly for your sales team
  4. **Account Management** — Strengthen client relationships with our expert Account Management services
  5. **Corporate Contact Database** — With the help of our data-extraction professionals, we source data tailored to your ideal customer profile
  6. **Campaign Optimization** — Test messaging, timing, and channels for maximum ROI
- Hover state: subtle lift + green accent border

### 5.5 Our Recipe for Success
- Heading: "Our recipe for success"
- Body paragraph about targeted SEO, visual appeal, content & distribution
- 3 stat counters (animate on scroll into view):
  - **1200+** Happy Clients
  - **300+** Finished Projects
  - **230%** Average yearly growth rate

### 5.6 What We Do
- Heading on left (sticky on scroll, desktop): "What we do"
- Right column: 6 capability blocks
  1. ICP & TAM Mapping
  2. Infrastructure & Data
  3. Messaging & Sequences
  4. Outreach at Scale
  5. Optimization
  6. Qualified Meetings
- Each block: custom SVG icon + title + 2-line description

### 5.7 Offering (Pricing)
- Left side: vertical "OFFERING OFFERING OFFERING" marquee text (animated, scrolls slowly)
- Right side: 3 pricing tiers stacked
  - **Basic** (mint green heading) — bullet list of features + "Get a Quote" button (mailto)
  - **Standard** (cyan/blue heading) — extended feature list + "Get a Quote" button (mailto)
  - **Bespoke** (red/orange heading) — "Our solutions will be tailored around your individual sales objectives" + "Get a Quote" button (mailto)
- Mailto target: `hello@leadsinthepipe.com` (placeholder — see `docs/decisions.md` #3; centrally swappable via `VITE_CONTACT_EMAIL`)

### 5.8 Articles & News
- Heading: "Articles & News" + "Browse all" link (left side)
- 3 article preview cards (right side)
- Each card: "Articles" tag · Date · Headline · "Learn more →" link
- Placeholder content from Figma:
  1. Sep 24, 2023 — "How to raise capital: 5 fundraising strategies for your startup"
  2. Sep 24, 2023 — "'Wash your hands' is the new idea"
  3. Sep 24, 2023 — "Positioning can make or break a new product, yet it rarely gets the attention it deserves. In this talk."
- All "Learn more" links are non-functional in v1.0 (href="#")

### 5.9 Let's Talk (CTA)
- "Stay in touch" small label
- Large heading: "Let's Talk" + arrow icon
- Subtext: "Feel free to contact us"
- Animated green sun/star graphic (rotates slowly)
- Whole section acts as link to contact (mailto)

### 5.10 Footer
- Logo (top-left)
- **Address column:** 14 New South Head Rd, Triple Bay 3148
- **Contact column:** P: 3340413 301 · E: hello@leadsinthepipe.com
- **Sitemap column:** Intro, About, Pricing, Guide (anchor links)
- **Social icons row:** Instagram, Facebook, Pinterest, Twitter (href="#")
- Copyright line at bottom

---

## 6. Design Direction (User-Approved)

- **Aesthetic:** Modern minimalist — clean, generous whitespace, refined typography
- **Theme:** Dark only (matches Figma exactly)
- **Palette:**
  - Background: `#000000` (pure black)
  - Surface: `#0A0A0A` / `#111111` (card surfaces)
  - Primary accent: mint green — exact hex to be confirmed by Designer agent (target: `#9EFB9C` or similar)
  - Text primary: `#FFFFFF`
  - Text secondary: `#A1A1A1`
  - Standard tier accent: cyan/blue
  - Bespoke tier accent: red/coral
- **Typography:** Distinctive display font + refined body font (Designer agent to propose)
- **Logo:** New design — 3 concepts proposed by Designer agent, user picks final

---

## 7. Functional Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-1 | Hero email form submits to Formspree on valid input | P0 |
| FR-2 | Form shows success/error toast after submission | P0 |
| FR-3 | All "Get a Quote" tier buttons open `mailto:` link with prefilled subject | P0 |
| FR-4 | Stat counters animate from 0 → target value when scrolled into view | P1 |
| FR-5 | "OFFERING" text marquee scrolls continuously | P1 |
| FR-6 | Service cards have hover lift + accent border | P1 |
| FR-7 | Mobile menu opens overlay with anchor navigation | P0 |
| FR-8 | All anchor links smooth-scroll to their section | P0 |
| FR-9 | Pipe-bubble hero graphic has subtle ambient animation | P2 |
| FR-10 | All sections fade in on scroll into view | P1 |

---

## 8. Non-Functional Requirements

- **Performance:** First Contentful Paint < 1.5s on 4G; Largest Contentful Paint < 2.5s
- **Accessibility:** WCAG 2.1 AA — keyboard navigation, ARIA labels, focus rings, color contrast ≥ 4.5:1
- **SEO:** Semantic HTML5, meta title + description, Open Graph tags, favicon, sitemap.xml, robots.txt
- **Browser Support:** Chrome, Safari, Firefox, Edge (last 2 versions); iOS Safari 15+; Chrome Android 100+
- **Responsive Breakpoints:** 360px (mobile), 768px (tablet), 1024px (laptop), 1280px (desktop), 1536px (wide)
- **No tracking/cookies in v1.0**

---

## 9. Open Issues & Decisions Log

| # | Item | Status | Owner |
|---|---|---|---|
| 1 | Final logo concept (3 to be proposed) | Pending user pick | Designer |
| 2 | Final hosting platform (GoDaddy vs Vercel vs Netlify) | Deferred to deploy phase | User |
| 3 | Email `contact@uspIease.com` typo — replaced with placeholder | Resolved (see `docs/decisions.md`) | PM |
| 4 | Article links non-functional in v1.0 — acceptable | Resolved | PM |
| 5 | Social links use `#` placeholders | Resolved | PM |

---

## 10. Approval Criteria

The site is considered "Done for v1.0" when:
- All sections match Figma layout with approved modernization tweaks
- All form interactions work end-to-end (Formspree confirmed receiving)
- Lighthouse scores meet thresholds defined in §2
- QA checklist + automated component tests (Vitest) all green; Lighthouse + axe-core audits pass
- Site deploys cleanly to chosen hosting platform with custom domain
- Mobile, tablet, desktop layouts verified on real devices
