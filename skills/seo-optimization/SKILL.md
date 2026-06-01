---
name: seo-optimization
description: SEO patterns for a single-page marketing site — meta tags, OG/Twitter cards, JSON-LD schema, sitemap/robots, and Core Web Vitals targets. Read when editing index.html, hero copy, or articles.
---

# SEO Optimization — Single-Page Marketing Site

A single-page site has different SEO needs than a multi-page site. The whole page is one URL — every signal must fit in `index.html` plus the JSON-LD block.

## Required Meta Tags

```html
<title>Leads In The Pipe — Quality B2B Leads, Delivered</title>
<meta name="description" content="We fuel business growth with high-quality B2B leads delivered straight to your pipeline. Lead generation, account management, and digital marketing services." />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="theme-color" content="#000000" />
<link rel="canonical" href="https://leadsinthepipe.com/" />
```

- **Title:** ≤ 60 characters (60 max for Google SERP)
- **Description:** 150–160 characters
- **Canonical:** absolute URL of the production domain

## Open Graph + Twitter Card (Required)

```html
<meta property="og:type" content="website" />
<meta property="og:title" content="Leads In The Pipe — Quality B2B Leads, Delivered" />
<meta property="og:description" content="..." />
<meta property="og:image" content="https://leadsinthepipe.com/og-image.svg" />
<meta property="og:url" content="https://leadsinthepipe.com/" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="..." />
<meta name="twitter:description" content="..." />
<meta name="twitter:image" content="https://leadsinthepipe.com/og-image.svg" />
```

- **og:image** must be 1200×630 (Twitter accepts the same). SVG keeps size under 100KB.

## JSON-LD (Organization Schema)

Inject as a static `<script type="application/ld+json">` in `index.html`:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Leads In The Pipe",
  "url": "https://leadsinthepipe.com",
  "logo": "https://leadsinthepipe.com/favicon.svg",
  "description": "B2B lead generation agency and sales CRM software.",
  "sameAs": ["#instagram", "#facebook", "#twitter", "#pinterest"]
}
```

When real social URLs land, swap the `#` placeholders.

## Semantic HTML

- **One `<h1>`** per page (in Hero)
- `<h2>` per section, no skipping levels
- `<main>` wraps the section content
- `<header>` / `<footer>` for site chrome
- `<section id="...">` for each top-level section — IDs match nav anchor hrefs

## Anchor Links

- Nav `href="#services"` → matching `<section id="services">`
- IDs should match nav labels in `src/data/nav.ts`
- Smooth-scroll behavior set on `html { scroll-behavior: smooth; scroll-padding-top: 80px; }` for sticky-header offset

## `sitemap.xml` and `robots.txt`

`public/robots.txt`:
```
User-agent: *
Allow: /

Sitemap: https://leadsinthepipe.com/sitemap.xml
```

`public/sitemap.xml` (single URL for a single-page site):
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://leadsinthepipe.com/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

## Core Web Vitals (SEO Signals)

Google ranks on these. Block on regressions.

| Metric | Threshold | Hot spot |
|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5 s | Hero pipe-bubble SVG, hero text |
| INP (Interaction to Next Paint) | < 200 ms | Form submission, menu open |
| CLS (Cumulative Layout Shift) | < 0.1 | Custom fonts (use `font-display: swap` + preload) |

See [[performance-budget]] for budgets and inspection.

## Common SEO Regressions

- Removing `aria-label` from icon-only links (Lighthouse SEO check fails)
- Adding a second `<h1>` somewhere
- Linking with empty / unclear anchor text ("click here", `href="#"` without `aria-label`)
- Loading fonts without `font-display: swap` (causes CLS)
