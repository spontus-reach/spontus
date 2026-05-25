# Discord Server Setup Guide

**Status:** Reference
**Owner:** Brian + Joshua
**Last reviewed:** 2026-05-24
**Source:** Internal team workflow and documentation structure
**Use this for:** Setting up and maintaining the internal Spontus Discord server.

Back to [Documentation Hub](../README.md).

---

## Purpose

This guide defines the internal Discord server for Spontus. Discord is the team's real-time coordination layer while the [documentation hub](../README.md) remains the source of truth for durable knowledge.

Use Discord for:
- Daily coordination and quick decisions
- Interview updates, sponsor outreach status, and competitive alerts
- Engineering discussion and GitHub activity
- Meeting scheduling and action-item follow-up

Use the documentation system for:
- Canonical product, strategy, and research writeups
- Decision records and meeting summaries
- Templates, specs, and long-form context

---

## Server Identity

| Setting | Value |
| --- | --- |
| **Server name** | Spontus HQ |
| **Description** | Internal workspace for Spontus — the sponsorship operating system for grassroots teams and the brands that want to reach them. |
| **Audience** | Internal team only (founders, engineering, advisors) |
| **Visibility** | Private invite-only server |

Suggested welcome message for `#announcements`:

> Spontus HQ is our internal coordination space. Docs live in GitHub under `docs/`. Use Discord for fast updates; use the documentation hub for anything that should survive beyond this week.

---

## Roles

Create these roles in order from highest to lowest permission:

| Role | Who | Purpose |
| --- | --- | --- |
| **Founder** | Brian, Joshua | Full server admin, channel management, integrations |
| **Engineering** | Technical contributors | Access to dev channels, GitHub feed, bug triage |
| **Advisor** | Kyle and future advisors | Read/post in strategy, research, and product channels |
| **Bot** | GitHub/webhook bots | Post-only access to `#github-feed` |

Permission notes:
- Founders manage categories, roles, and integrations.
- Advisors should not have admin permissions.
- Keep role count minimal until the team grows.

---

## Recommended Server Settings

| Setting | Recommendation | Why |
| --- | --- | --- |
| Verification level | Low or Medium | Internal team server; avoid friction for cofounders |
| Default notifications | Only `@mentions` | Prevent channel noise during class/work |
| System messages channel | `#announcements` | Join/leave and major server events stay visible |
| Explicit content filter | Disable or Members without roles | Internal server; not needed |
| 2FA for moderation | Required for admins | Protect server settings and webhooks |

---

## Channel Structure

Create five categories in this order.

### GENERAL

| Channel | Type | Topic / Description | Objective |
| --- | --- | --- | --- |
| `#announcements` | Announcement | Decisions, milestones, deadlines, and links to canonical docs. | Keep the team aligned on what changed and what matters this week. |
| `#daily-standup` | Text | Async updates: done / doing / blocked. | Replace daily sync meetings while the team is small and async-first. |
| `#random` | Text | Off-topic, memes, team bonding. | Keep non-work chatter out of execution channels. |

**Pinned in `#announcements`:**
- Link to [Documentation Hub](../README.md)
- Link to [Decision Log](../decision-log.md)
- Link to [Progress Log](../strategy/progress-log.md)

---

### STRATEGY & RESEARCH

Maps to [Strategy](../strategy/index.md), [Market](../market/index.md), and [Research Index](../research-index.md).

| Channel | Type | Topic / Description | Objective |
| --- | --- | --- | --- |
| `#interviews` | Text | Notes, quotes, and takeaways from team officers, sponsors, and advisors. | Capture live interview signal before it gets written into the docs. |
| `#competitive-intel` | Text | Competitor updates, new entrants, funding news, CampusLink/TapSponsor alerts. | Monitor the window closing on college club sports sponsorship. |
| `#sponsor-pipeline` | Text | Live outreach tracking: contact found, email sent, response received, next follow-up. | Operate the pipeline defined in [Sponsor Pipeline](../business/sponsor-pipeline.md). |

**How to post in `#sponsor-pipeline`:**

Use this lightweight format:

```
Brand:
Team:
Stage: Lead identified | Contact found | Outreach sent | Discovery call | Offer discussed | Deal agreed | Deliverables in progress | Proof submitted | Renewal candidate
Contact:
Next action:
Due:
Link: docs/business/sponsor-pipeline.md or GitHub issue
```

**How to post in `#interviews`:**

```
Who:
Role / team:
Date:
Key quote:
Insight:
Vault doc to update:
Follow-up:
```

---

### PRODUCT & DESIGN

Maps to [Product](../product/index.md) and design docs.

| Channel | Type | Topic / Description | Objective |
| --- | --- | --- | --- |
| `#product-ideas` | Text | Feature ideas, user feedback, MVP scope questions, "why not now" debates. | Capture product thinking before it becomes a spec or decision. |
| `#ux-design` | Text | Figma links, screen reviews, prototype feedback, user-test notes. | Coordinate design work against [UX Walkthrough](../product/ux-walkthrough.md). |
| `#copy-and-content` | Text | Pitch language, YC drafts, landing page copy, one-liners. | Iterate on messaging without polluting product/engineering channels. |

Reference docs:
- [MVP Overview](../product/mvp-overview.md)
- [UX Walkthrough](../product/ux-walkthrough.md)
- [Spacing System](../product/spacing-system.md)
- [Conversational Onboarding](../product/conversational-onboarding.md)
- [Teams And Sponsors Definitions](../strategy/clubs-and-brands-definitions.md)

---

### ENGINEERING

Maps to [Engineering](../engineering/index.md).

| Channel | Type | Topic / Description | Objective |
| --- | --- | --- | --- |
| `#dev-general` | Text | Architecture, stack choices, data model, build-vs-buy, implementation tradeoffs. | Discuss engineering direction against [Tech Stack](./tech-stack.md). |
| `#github-feed` | Text | Webhook feed for commits, PRs, issues, and CI results. | Keep code activity visible without manual status updates. |
| `#bugs-and-issues` | Text | Repro steps, screenshots, suspected causes, fix status. | Triage bugs before they become lost threads. |

Build principle from docs: do not overbuild before marketplace liquidity exists. Use `#dev-general` to pressure-test whether a feature deserves code yet.

---

### OPERATIONS

Maps to [Meetings](../meetings/index.md), [Decision Log](../decision-log.md), and founder priorities.

| Channel | Type | Topic / Description | Objective |
| --- | --- | --- | --- |
| `#meetings` | Text | Scheduling, agendas, links to meeting notes, pre-read requests. | Coordinate working sessions without using DMs. |
| `#tasks` | Text | Action items, owners, due dates, blockers. | Track short-horizon execution; durable decisions still go to the docs. |
| `#resources` | Text | Links to tools, accounts, templates, references. Pin the important ones. | One place for "where is X?" questions. |

Suggested pins for `#resources`:
- [Documentation Hub](../README.md)
- [GTM Overview](../business/gtm-overview.md)
- [Sponsor Pipeline](../business/sponsor-pipeline.md)
- [Feature Spec Template](../_templates/feature-spec.md)
- [Meeting Note Template](../_templates/meeting-note.md)
- [Decision Record Template](../_templates/decision-record.md)

---

## Setup Checklist

### 1. Create the server

1. In Discord: **Add a Server** → **Create My Own** → **For me and my friends**
2. Name it **Spontus HQ**
3. Upload logo/icon if available

### 2. Create roles

1. Server Settings → Roles
2. Create `Founder`, `Engineering`, `Advisor`, and `Bot`
3. Assign Founder to Brian and Joshua

### 3. Create categories and channels

Create the five categories and channels listed above. For each text channel:
1. Edit Channel → Overview
2. Paste the **Topic / Description** from this guide
3. Set slow mode only if a channel gets noisy (usually not needed yet)

For `#announcements`:
1. Edit Channel → Permissions
2. Deny `Send Messages` for `@everyone`
3. Allow `Send Messages` for `Founder`

### 4. Configure server settings

1. Set system messages channel to `#announcements`
2. Set default notifications to `@mentions` only
3. Require 2FA for moderation actions

### 5. Post starter pins

Pin in `#announcements`:
- Docs hub link
- Current priorities from [Documentation Hub](../README.md)
- This guide

Pin in `#resources`:
- Tool links
- Template links
- Repo link

### 6. GitHub → Discord (`#github-feed`)

Do **not** point a GitHub repo webhook directly at a Discord webhook URL. GitHub sends raw JSON; Discord expects `{ "content": "..." }` or `{ "embeds": [...] }` and will return `400 Cannot send an empty message`.

Use the repo workflow instead:

1. In Discord: `#github-feed` → **Edit Channel → Integrations → Webhooks → New Webhook**
2. Copy the webhook URL
3. In GitHub: **Settings → Secrets and variables → Actions → New repository secret**
   - Name: `DISCORD_WEBHOOK_URL`
   - Value: the Discord webhook URL
4. Remove any broken repo webhook under **Settings → Webhooks** (the one pointing at `discord.com/api/webhooks/...`)
5. Push to `main` or open a PR — [`.github/workflows/discord-notify.yml`](../../.github/workflows/discord-notify.yml) posts formatted updates

Security notes:
- Treat Discord webhook URLs like passwords.
- If a webhook URL is pasted into chat, regenerate it in Discord and update the `DISCORD_WEBHOOK_URL` GitHub secret.
- Add `[skip discord]` to a commit message when you need to push workflow changes without sending a Discord notification.

Events posted today:
- Push to `main`
- PR opened, ready for review, closed, merged
- Issues opened and closed

| Integration | Channel | Notes |
| --- | --- | --- |
| GitHub Actions → Discord webhook | `#github-feed` | Uses `DISCORD_WEBHOOK_URL` secret |
| Calendar reminders | `#meetings` | Manual for now |
| GitHub docs | `#resources` | Link to repo docs folder, not live sync |

---

## Operating Rules

### What belongs in Discord

- "Jack from rugby replied — scheduling a call Thursday"
- "CampusLink added a sports filter — worth reviewing"
- "Blocked on brand contact list from PR manager"
- "PR #12 ready for review"

### What belongs in the documentation system

- Interview summaries that will be referenced later
- Product decisions and rationale
- Competitive analysis updates
- Meeting notes with action items
- Sponsor pipeline state that needs history

Rule of thumb: if you'd want an advisor or future teammate to read it in a month, write it in `docs/`.

### Weekly hygiene

- Move important Discord threads into the docs every few days
- Archive stale sponsor-pipeline updates after they are reflected in [Sponsor Pipeline](../business/sponsor-pipeline.md)
- Log durable decisions in [Decision Log](../decision-log.md)
- Use `#tasks` for accountability, not permanent recordkeeping

---

## Mapping: Discord → Docs

| Discord channel | Canonical docs location |
| --- | --- |
| `#interviews` | [Progress Log](../strategy/progress-log.md), [Research Index](../research-index.md), [Meetings](../meetings/index.md) |
| `#competitive-intel` | [Competitive Research](../strategy/competitive-research.md), [Competitive Analysis](../market/competitive-analysis.md) |
| `#sponsor-pipeline` | [Sponsor Pipeline](../business/sponsor-pipeline.md) |
| `#product-ideas` | [MVP Overview](../product/mvp-overview.md), [Product Vision](../strategy/product-vision.md), [Decision Log](../decision-log.md) |
| `#ux-design` | [UX Walkthrough](../product/ux-walkthrough.md), [Spacing System](../product/spacing-system.md) |
| `#copy-and-content` | [Product Description](../market/product-description.md), [GTM Overview](../business/gtm-overview.md) |
| `#dev-general` | [Tech Stack](./tech-stack.md), [Decision Log](../decision-log.md) |
| `#meetings` | [Meetings](../meetings/index.md) |
| `#tasks` | GitHub issues/PRs; durable outcomes in docs |

---

## Current Team Priorities (seed content)

Use these as the first pinned message in `#announcements`:

- Finish team-side interviews with rugby, soccer, water polo, and swim contacts
- Convert sponsor research into a live pipeline in `#sponsor-pipeline` and [Sponsor Pipeline](../business/sponsor-pipeline.md)
- Define the manual deal facilitation workflow before marketplace automation
- Draft the first reusable team profile and sponsorship listing templates
- Track every real sponsorship conversation in [Progress Log](../strategy/progress-log.md)

---

## Future Expansion (do not create yet)

When Spontus adds external users, create a separate community server or a clearly separated community category. Do not mix early user support into this internal server.

Potential future channels:
- `#team-support`
- `#brand-support`
- `#feedback`
- `#releases`

For now, keep this server internal only.
