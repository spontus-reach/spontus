# Decision Log

**Status:** Canonical
**Owner:** Brian + Joshua
**Last reviewed:** 2026-05-24
**Source:** Founder decisions, migrated Notion notes, and current documentation structure
**Use this for:** Accepted and open decisions that guide product, GTM, engineering, and operations.

Back to [Documentation Hub](./README.md).

## Product Decisions

| Decision | Status | Evidence | Notes |
| --- | --- | --- | --- |
| Build a two-sided sponsorship marketplace for college club sports | Accepted | [Product Vision](./strategy/product-vision.md), [MVP Overview](./product/mvp-overview.md) | Brands post opportunities; verified teams apply. |
| Start with standardized team and brand profiles | Accepted | [Clubs & Brands Definitions](./strategy/clubs-and-brands-definitions.md), [UX Walkthrough](./product/ux-walkthrough.md) | Profiles create trust and make comparison possible. |
| Use a shared sponsorship asset taxonomy | Accepted | [UX Walkthrough](./product/ux-walkthrough.md), [Clubs & Brands Definitions](./strategy/clubs-and-brands-definitions.md) | Team profiles and brand listings should use matching asset language. |
| Keep MVP messaging lightweight | Accepted | [MVP Overview](./product/mvp-overview.md), [UX Walkthrough](./product/ux-walkthrough.md) | Marketplace thread, not a full chat product. |

## GTM Decisions

| Decision | Status | Evidence | Notes |
| --- | --- | --- | --- |
| Start with Cal Poly club sports | Accepted | [Cal Poly Audit](./strategy/cal-poly-audit.md), [GTM Overview](./business/gtm-overview.md) | Local wedge with accessible teams and sponsor pain. |
| Facilitate deals manually before automating the marketplace | Accepted | [Product Vision](./strategy/product-vision.md), [GTM Overview](./business/gtm-overview.md) | Learn repeatable workflows before building too much software. |
| Use sponsor pipeline hygiene as an operating discipline | Accepted | [Sponsor Pipeline](./business/sponsor-pipeline.md), [GTM Overview](./business/gtm-overview.md) | Every sponsor conversation should have stage, owner, value, and next follow-up. |

## Engineering Decisions

| Decision | Status | Evidence | Notes |
| --- | --- | --- | --- |
| Keep project knowledge in repo-based Markdown docs | Accepted | [Documentation Hub](./README.md), [Notion Migration](./notion-migration.md) | Standard Markdown keeps docs readable in GitHub, editors, and documentation tooling. |
| Use GitHub issues and PRs as the execution layer | Accepted | [Documentation Hub](./README.md) | Docs store context; GitHub tracks implementation. |

## Operations Decisions

| Decision | Status | Evidence | Notes |
| --- | --- | --- | --- |
| Use status labels consistently across docs | Accepted | [README](./README.md), [Notion Migration](./notion-migration.md) | Canonical, Reference, Draft, Superseded. |
| Keep migrated Notion content intact unless readability is blocked | Accepted | [Notion Migration](./notion-migration.md) | Add summaries and structure around imports instead of rewriting everything. |

## Open Decisions

| Decision | Owner | Needed by | Evidence |
| --- | --- | --- | --- |
| MVP scope: exact first build slice after profile, listing, and application flow | Brian + Joshua | Before implementation planning | [MVP Overview](./product/mvp-overview.md), [UX Walkthrough](./product/ux-walkthrough.md) |
| Visual direction: green or electric blue accent | Brian | Before design system lock | [Spacing System](./product/spacing-system.md), [UX Walkthrough](./product/ux-walkthrough.md) |
| Matching logic: first match-score inputs and weights | Brian + Joshua | Before brand review UI build | [UX Walkthrough](./product/ux-walkthrough.md), [Clubs & Brands Definitions](./strategy/clubs-and-brands-definitions.md) |
| Sponsor pipeline ownership and weekly hygiene cadence | Brian + Joshua | Before active outbound sprint | [Sponsor Pipeline](./business/sponsor-pipeline.md), [GTM Overview](./business/gtm-overview.md) |
| Which proof-of-performance requirements are MVP-critical | Brian + Joshua | Before deal/proof workflow build | [MVP Overview](./product/mvp-overview.md), [UX Walkthrough](./product/ux-walkthrough.md) |

## How To Add A Decision

1. Create a new decision record from [Decision Record](./_templates/decision-record.md).
2. Use a filename like `YYYY-MM-DD-short-decision.md`.
3. Fill in context, options considered, decision, rationale, and consequences.
4. Add the record to the relevant section above.
