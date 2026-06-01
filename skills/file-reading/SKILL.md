---
name: file-reading
description: How to handle user-uploaded design references, brand assets, copy documents, or screenshots. Persist key facts to docs/ rather than re-reading on every turn.
---

# File Reading

When the user uploads or references a file outside the codebase, your job is to **extract the durable facts** and persist them so they survive future sessions.

## Workflow

1. **Read the file once** with the appropriate tool:
   - Text / markdown: `Read` tool
   - PDFs: `Read` with `pages:` parameter — see [[pdf-reading]]
   - Images / screenshots: `Read` (multimodal — Claude Code sees images directly)

2. **Extract the durable facts.** What matters for future work?
   - Brand colors / fonts → update `skills/leadsinthepipe-brand/SKILL.md` and `tailwind.config.ts`
   - Copy → update `PRD.md` §5 and `src/data/*.ts`
   - Decisions → log in `docs/decisions.md`
   - Acceptance criteria → update `docs/acceptance-criteria.md`

3. **Save screenshots to `docs/figma-reference/`** (create if needed) so future sessions can re-look without re-uploads.

## What Counts as "Durable"

| Save | Don't save |
|---|---|
| Exact hex codes | "It's kind of green" |
| Font name + weights | "A clean sans" |
| Direct quote copy | Paraphrased summary |
| Decisions ("user picked Concept A") | Conversation about Concept A |

## File Naming

- `docs/figma-reference/hero.png` — section screenshot
- `docs/figma-reference/full-page-desktop.png` — full-page mockup
- `docs/figma-reference/full-page-mobile.png` — mobile mockup
- `docs/brand-notes.md` — distilled brand facts from external sources

## When the File Is a PDF

Use [[pdf-reading]] — long PDFs require page ranges.

## After Reading

Reference the extracted facts in your reply. Don't dump the full file content back. Example: "Saved the mint hex from your screenshot (`#9EFB9C`) to `tailwind.config.ts` and confirmed it matches our existing token. Saved the screenshot to `docs/figma-reference/hero.png`."
