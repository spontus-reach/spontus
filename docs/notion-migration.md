# Notion Migration Guide

**Status:** Canonical
**Owner:** Brian + Joshua
**Last reviewed:** 2026-05-24
**Source:** Notion migration process
**Use this for:** Moving future Notion pages into the documentation system consistently.

Back to [Documentation Hub](./README.md).

Use this guide when moving future Notion pages into the repository documentation.

## Target Folders

| Notion content | Documentation folder |
| --- | --- |
| Product requirements, UX flows, onboarding, design systems | `product/` |
| Product vision, positioning, definitions, audits, progress logs | `strategy/` |
| Tech stack, architecture, implementation notes | `engineering/` |
| Customer segments, GTM, sponsor pipeline, sales operations | `business/` |
| Market research, competitive analysis, category notes | `market/` |
| Brainstorms, meeting notes, research sessions | `meetings/` |

## Migration Steps

1. Export or fetch the Notion page content.
2. Convert content to clean markdown.
3. Remove Notion UUIDs from filenames.
4. Use lowercase dash-separated filenames.
5. Convert internal Notion links to standard relative Markdown links.
6. Keep tables as markdown tables when possible.
7. Convert callouts into blockquotes or short sections.
8. Add the migrated page to [Documentation Hub](./README.md) or another relevant index.
9. Run markdown and link checks before merging.

## Cleanup Rules

- Remove empty Notion wrapper text and duplicated titles.
- Prefer human-readable filenames over exported names.
- Keep source links only when they help future verification.
- Do not preserve Notion-specific metadata unless it is operationally useful.
- Keep one page per concept unless a page is clearly too large to navigate.

## Post-Migration Checklist

- [ ] File lives in the right folder.
- [ ] Filename has no UUID.
- [ ] Top heading matches the page title.
- [ ] Internal references use standard relative Markdown links.
- [ ] Tables render cleanly.
- [ ] [Documentation Hub](./README.md) or another index links to the page.
- [ ] Markdown and link checks pass.
