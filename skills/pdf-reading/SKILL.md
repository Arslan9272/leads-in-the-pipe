---
name: pdf-reading
description: How to read PDFs (brand guides, contracts, decks) safely. Use page ranges for long PDFs.
---

# PDF Reading

PDFs in this project will usually be **brand guides, decks, or spec documents**. The `Read` tool handles them, with caveats.

## Rules

- **≤ 10 pages:** `Read` the file directly with no `pages:` parameter
- **> 10 pages:** **must** pass `pages:` parameter (e.g., `pages: "1-5"`)
- **Maximum 20 pages per request.** For longer PDFs, call `Read` multiple times with non-overlapping ranges

```
Read({ file_path: "/abs/path/brand-guide.pdf", pages: "1-10" })
Read({ file_path: "/abs/path/brand-guide.pdf", pages: "11-20" })
```

## What to Extract

Same as [[file-reading]] — durable facts only. For a brand PDF, look for:

- Color tokens (with exact hex / CMYK values)
- Type system (font names, weights, scale)
- Logo do/don't rules
- Voice & tone examples
- Spacing or grid rules

Save what's durable to `skills/leadsinthepipe-brand/SKILL.md` and `docs/brand-notes.md`. Don't re-read the PDF every session.

## When to Convert PDF Diagrams to Code

If the PDF contains a diagram you need to recreate (e.g., a logo, an icon):

1. Note the page and a one-line description in `docs/brand-notes.md`
2. Recreate in SVG (`src/components/icons/`)
3. Don't reference the PDF inside the code — the SVG is now the source of truth
