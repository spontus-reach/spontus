# MVP Build Slices

**Status:** Canonical
**Owner:** Brian + Joshua
**Last reviewed:** 2026-05-24
**Source:** [MVP Overview](./mvp-overview.md), [Domain Model](./domain-model.md), [UX Walkthrough](./ux-walkthrough.md)
**Use this for:** Sequencing MVP development into small vertical slices.

Back to [Documentation Hub](../README.md).

## Summary

Build Spontus as a sequence of marketplace learning loops. The first slice should prove that teams and sponsors can create structured profiles, a sponsor can publish an opportunity, and a team can apply.

## Slice 1: Team Profile Foundation

Goal: Let a team create the minimum credible profile a sponsor can review.

Includes:

- Team account-side onboarding.
- Team profile draft and edit flow.
- Core fields: team name, school, sport, location, officer contact, roster size, social links, sponsorship interests, assets offered.
- Manual verification status.

Done when:

- A team can submit a profile for verification.
- An internal reviewer can identify whether the profile is complete enough for sponsor review.

## Slice 2: Sponsor Profile And Listing Foundation

Goal: Let a sponsor describe itself and create a sponsorship listing.

Includes:

- Sponsor account-side onboarding.
- Sponsor profile draft and edit flow, including brand display identity where needed.
- Sponsorship listing creation.
- Core listing fields: offer type, geography, sport preferences, timeline, requested assets, eligibility criteria, application deadline.
- Listing statuses: Draft, Open, Paused, Closed.

Done when:

- A verified sponsor can publish an open listing.
- A team can understand what the sponsor offers and expects.

## Slice 3: Team Application Flow

Goal: Let a team apply to a listing using its existing profile.

Includes:

- Listing browse page.
- Listing detail page.
- Application form with short fit response.
- Application statuses: Draft, Submitted, Under review, Accepted, Declined, Withdrawn.

Done when:

- A team can submit one application to one listing.
- The application includes enough structured context for sponsor review.

## Slice 4: Sponsor Review Flow

Goal: Let a sponsor compare applicants and make a decision.

Includes:

- Sponsor application inbox.
- Applicant profile summary.
- Accept, decline, and request-more-info actions.
- Basic notification or visible status change.

Done when:

- A sponsor can review submitted applications.
- A sponsor can accept or decline an application without founder intervention.

## Slice 5: Manual Verification And Admin Workflow

Goal: Keep marketplace trust high while avoiding premature automation.

Includes:

- Internal view of submitted team profiles.
- Internal view of submitted sponsor profiles.
- Verification decisions: Verified, Needs changes, Suspended.
- Notes for why a profile needs changes.

Done when:

- Spontus can manually approve or block teams and sponsors.
- Only verified teams and sponsors can participate in the public MVP flow.

## Later Slices

- Basic marketplace messaging.
- Deal checklist.
- Deliverable and proof tracking.
- Sponsor pipeline import or CRM-lite tooling.
- Matching score and recommendations.
- Payments, contracts, renewals, and analytics.

## Related Docs

- [Domain Glossary](../domain-glossary.md)
- [Domain Model](./domain-model.md)
- [MVP Overview](./mvp-overview.md)
- [Development Readiness](../engineering/development-readiness.md)
- [Decision Log](../decision-log.md)
