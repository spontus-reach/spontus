# Development Readiness

**Status:** Canonical
**Owner:** Brian + Joshua
**Last reviewed:** 2026-05-24
**Source:** [MVP Overview](../product/mvp-overview.md), [Domain Glossary](../domain-glossary.md), [Domain Model](../product/domain-model.md), [MVP Build Slices](../product/mvp-build-slices.md)
**Use this for:** Pre-development alignment before creating implementation issues or writing app code.

Back to [Documentation Hub](../README.md).

## Summary

Spontus is ready to begin development once implementation issues are cut from the first MVP build slices. The docs now define the core domain language, conceptual model, and first product loops clearly enough for engineering work to start.

## Required Reading Before Coding

1. [Domain Glossary](../domain-glossary.md)
2. [MVP Overview](../product/mvp-overview.md)
3. [Domain Model](../product/domain-model.md)
4. [MVP Build Slices](../product/mvp-build-slices.md)
5. [UX Walkthrough](../product/ux-walkthrough.md)
6. [Decision Log](../decision-log.md)

## Engineering Defaults

- Use **Team** and **Sponsor** as the two marketplace sides.
- Treat **Brand** as sponsor-facing display identity, not the core account type.
- Build the first product loop before adding advanced matching, payments, analytics, or full messaging.
- Keep manual verification in the MVP.
- Prefer simple, inspectable data structures until real team and sponsor usage proves what needs abstraction.

## First Implementation Track

Start with these slices in order:

1. Team profile foundation.
2. Sponsor profile and listing foundation.
3. Team application flow.
4. Sponsor review flow.
5. Manual verification/admin workflow.

Each slice should become one or more GitHub issues with clear acceptance checks.

## Open Decisions To Respect

These are not blockers for the first scaffold, but they affect later implementation:

- Visual direction and accent color.
- Matching score inputs and weights.
- Proof-of-performance requirements.
- Sponsor pipeline ownership and weekly hygiene cadence.

## Non-Goals For Initial Development

- Native mobile app.
- Payments, escrow, invoicing, or tax workflows.
- AI-generated contracts.
- Automated matching.
- Advanced sponsor analytics.
- Multi-school expansion tooling.
- Complex CRM features.

## Acceptance Criteria For Development Kickoff

- Every implementation issue links to the relevant build slice.
- Product terms match the [Domain Glossary](../domain-glossary.md).
- User-facing flows map back to [Domain Model](../product/domain-model.md).
- New decisions are recorded in [Decision Log](../decision-log.md).
