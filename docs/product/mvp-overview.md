# MVP Overview

**Status:** Canonical
**Owner:** Brian + Joshua
**Last reviewed:** 2026-05-24
**Source:** [Product Vision](../strategy/product-vision.md), [UX Walkthrough](./ux-walkthrough.md), [Domain Glossary](../domain-glossary.md), [Teams And Sponsors Definitions](../strategy/clubs-and-brands-definitions.md)
**Use this for:** Current MVP scope, user workflows, and product non-goals.

Back to [Documentation Hub](../README.md).

## Summary

The Spontus MVP is a two-sided sponsorship marketplace for college club sports. Verified teams create standardized profiles, sponsors create sponsorship listings, teams apply, and both sides manage the relationship through basic messaging and deal/proof workflows.

The first wedge is Cal Poly club sports. The immediate operating strategy is manual deal facilitation first, then productizing the repeatable workflow.

## Canonical Development References

- [Domain Glossary](../domain-glossary.md) defines Teams + Sponsors terminology.
- [Domain Model](./domain-model.md) defines conceptual MVP entities and lifecycle statuses.
- [MVP Build Slices](./mvp-build-slices.md) defines the first implementation sequence.
- [Development Readiness](../engineering/development-readiness.md) summarizes what engineers should read before coding.

## Primary Users

| User | Need | MVP job |
| --- | --- | --- |
| Team officer | Find sponsors without cold-email chaos. | Build a verified team profile and apply to relevant listings. |
| Sponsor marketer | Find legitimate grassroots teams quickly. | Post a listing, review standardized applicants, and start a deal. |

## Core Workflows

1. Team signs up with `.edu` email and builds a verified profile.
2. Sponsor signs up with work email and creates a verified sponsor profile.
3. Sponsor posts a sponsorship listing with offer, geography, sport preferences, and requested assets.
4. Team browses listings and applies with its existing profile.
5. Sponsor reviews applicant profiles and accepts, messages, or declines.
6. Accepted match moves into basic deal checklist and proof collection.

## MVP Must Have

- Team profiles with verification.
- Sponsor profiles with verification.
- Shared sponsorship asset taxonomy.
- Sponsorship listing creation.
- Team application flow.
- Brand applicant review.
- Basic marketplace messaging.
- Deal/proof checklist.

## Explicit Non-Goals

- Native mobile app.
- Full payments or escrow.
- Complex CRM.
- AI-generated contract drafting.
- Advanced sponsor analytics.
- Fully automated matching before manual patterns are proven.

## Reference Docs

- [Product Vision](../strategy/product-vision.md)
- [Domain Glossary](../domain-glossary.md)
- [Domain Model](./domain-model.md)
- [MVP Build Slices](./mvp-build-slices.md)
- [UX Walkthrough](./ux-walkthrough.md)
- [Teams And Sponsors Definitions](../strategy/clubs-and-brands-definitions.md)
- [GTM Overview](../business/gtm-overview.md)
- [Decision Log](../decision-log.md)
