# Spontus Obsidian Vault

This folder is the shared Spontus knowledge base. Open `docs/` as an Obsidian vault, then use Git to collaborate on notes, specs, research, and decisions.

## Setup

1. Clone or pull the `spontus` repository.
2. Open Obsidian.
3. Select **Open folder as vault**.
4. Choose the repository's `docs/` folder.
5. Start from [[home]].

## Collaboration Workflow

1. Pull the latest changes before editing.
2. Edit markdown files in Obsidian or your code editor.
3. Commit focused changes with a clear message.
4. Push your branch and open a pull request for shared review.

Keep durable decisions, product direction, research, and technical notes in this vault. Use Slack or texts for fast coordination, but move important outcomes back here.

## Folder Map

- `product/` - UX walkthroughs, onboarding, design systems, and feature concepts.
- `strategy/` - product vision, positioning, audits, progress logs, and definitions.
- `engineering/` - architecture, stack decisions, and technical planning.
- `business/` - customer segments, GTM, sponsor pipeline, and sales process.
- `market/` - market research, competitor analysis, and category notes.
- `meetings/` - meeting notes, brainstorms, and dated working sessions.
- `_templates/` - reusable Obsidian templates.

## Source Of Truth Rules

- Use [[decision-log]] for accepted product and technical decisions.
- Use [[notion-migration]] when moving or reconciling Notion pages.
- Prefer wikilinks for internal vault references, such as `[[product-vision]]`.
- Keep filenames lowercase and dash-separated.
- Do not commit per-user Obsidian workspace state.
