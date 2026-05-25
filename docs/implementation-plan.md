# Implementation Plan

**Status:** Draft
**Owner:** Brian + Joshua
**Last reviewed:** 2026-05-24
**Source:** [MVP Overview](./product/mvp-overview.md), [Domain Model](./product/domain-model.md), [MVP Build Slices](./product/mvp-build-slices.md), [Figma Map](./figma-map.md)
**Use this for:** Guiding Cursor from documentation and Figma into app implementation.

Back to [Documentation Hub](./README.md).

## Summary

Build Spontus as a small sequence of vertical marketplace slices. The first release should prove the core loop: a verified team can create a sponsor-ready profile, a verified sponsor can create a listing, and a team can apply with structured data.

Do not build the full future platform before the first loop works.

## Product Language

Use these implementation names unless there is a strong technical reason not to:

- `Team`
- `TeamProfile`
- `Sponsor`
- `SponsorProfile`
- `BrandIdentity`
- `SponsorshipListing`
- `Application`
- `Deal`
- `Deliverable`
- `Proof`
- `SponsorshipAsset`
- `Contact`
- `VerificationStatus`

Avoid:

- `Club` as the account object.
- `Brand` as the primary sponsor account object.
- `Opportunity` when the product term should be `SponsorshipListing`.
- `Partnership` when the product term should be `Deal`.

## Recommended Initial Stack

Unless the team decides otherwise:

- Next.js
- TypeScript
- Tailwind
- shadcn/ui
- Supabase-ready data model
- Vercel
- GitHub issues and PRs for execution tracking

The first scaffold may use local mock data. Keep the mock data shaped like future database tables.

## Slice 1: Team Profile Foundation

Goal: Let a team create the minimum credible profile a sponsor can review.

Routes:

- `/signup/team`
- `/team/onboarding`
- `/teams/[slug]`

Core components:

- `TeamSignupForm`
- `ProfileBuilderShell`
- `ProfileProgressSidebar`
- `TeamBasicsForm`
- `SocialReachForm`
- `CompetitionEventsForm`
- `SponsorshipAssetMenu`
- `HostedEventsForm`
- `LookingForForm`
- `MediaUploadForm`
- `TeamProfileHero`
- `AssetGrid`
- `VerificationBadge`

Core data:

```ts
export type VerificationStatus =
  | 'draft'
  | 'submitted_for_verification'
  | 'verified'
  | 'needs_changes'
  | 'suspended';

export type SponsorshipAssetCategory =
  | 'brand_visibility'
  | 'social_content'
  | 'product_event_activation';

export type SponsorshipAsset = {
  id: string;
  label: string;
  category: SponsorshipAssetCategory;
  notes?: string;
  selected: boolean;
};

export type TeamProfile = {
  id: string;
  slug: string;
  name: string;
  university: string;
  sport: string;
  location: string;
  rosterSize: number;
  socialLinks: Array<{ platform: string; url: string; followerCount?: number }>;
  competitionSummary?: string;
  hostedEvents: Array<{ name: string; date?: string; expectedAttendance?: number }>;
  sponsorshipAssets: SponsorshipAsset[];
  preferredSponsorCategories: string[];
  excludedSponsorCategories: string[];
  verificationStatus: VerificationStatus;
};
```

Acceptance checks:

- A team can enter basic profile information.
- A team can select sponsorship assets and add notes per asset.
- The profile has a visible verification status.
- A published profile displays team stats and selected assets clearly.
- Cursor inspected the relevant Figma frames before implementation.

## Slice 2: Sponsor Profile And Listing Foundation

Goal: Let a sponsor describe itself and create a sponsorship listing.

Routes:

- `/signup/sponsor`
- `/sponsor/onboarding`
- `/sponsor/listings/new`
- `/sponsor/listings/[id]`

Core components:

- `SponsorSignupForm`
- `SponsorProfileForm`
- `BrandIdentitySection`
- `ListingComposer`
- `OfferTypeSelector`
- `RequestedAssetsSelector`
- `EligibilityCriteriaForm`
- `ListingPreview`

Acceptance checks:

- A sponsor can create a profile with brand display identity.
- A sponsor can create a draft listing.
- A sponsor can publish an open listing.
- A listing states what the sponsor offers and what assets it requests.

## Slice 3: Team Application Flow

Goal: Let a team apply to a listing using its existing profile.

Routes:

- `/team/listings`
- `/listings/[id]`

Core components:

- `ListingsFeed`
- `ListingCard`
- `ListingFilters`
- `ListingDetail`
- `ApplicationModal`
- `TeamProfilePreview`

Acceptance checks:

- A verified team can browse open listings.
- A team can submit one application to one listing.
- The application includes structured team profile context and one optional short note.
- Applied listings show an applied state.

## Slice 4: Sponsor Review Flow

Goal: Let a sponsor compare applicants and make a decision.

Routes:

- `/sponsor/listings/[id]/applicants`
- `/sponsor/applications/[id]`

Core components:

- `ApplicantsGrid`
- `ApplicantCard`
- `ApplicantCompareDrawer`
- `ApplicantDecisionActions`
- `DeclineReasonSelect`

Acceptance checks:

- A sponsor can view applicants for a listing.
- Applicant cards display standardized team data.
- A sponsor can accept, decline, or request more information.
- Decline reasons use canned options only for MVP.

## Slice 5: Manual Verification And Admin Workflow

Goal: Keep marketplace trust high while avoiding premature automation.

Routes:

- `/admin/verification`

Core components:

- `VerificationQueue`
- `VerificationCard`
- `VerificationDecisionForm`

Acceptance checks:

- Internal users can see submitted team and sponsor profiles.
- Internal users can mark profiles verified, needs changes, or suspended.
- Public marketplace flows can gate actions by verification status.

## Explicit Non-Goals For Initial Build

Do not build these unless explicitly requested:

- Payments or escrow.
- AI-generated contracts.
- Advanced sponsor analytics.
- Automated matching weights.
- Full CRM.
- Native mobile app.
- D1/NIL workflows.
- Youth sports compliance workflows.

## Cursor Prompt Template

Use this when starting a feature:

```text
Read docs/README.md, docs/domain-glossary.md, docs/product/mvp-overview.md, docs/product/domain-model.md, docs/product/mvp-build-slices.md, docs/product/ux-walkthrough.md, docs/engineering/development-readiness.md, docs/engineering/tech-stack.md, docs/figma-map.md, and docs/implementation-plan.md.

Use Figma MCP to inspect the relevant frame for [SCREEN OR COMPONENT].

Implement only [SLICE OR COMPONENT]. Match Figma for layout and visual hierarchy, but follow repo docs for product logic and terminology. Use Team + Sponsor language. Do not implement out-of-scope features.

After coding, summarize changed files, Figma deviations, open questions, and the next smallest slice.
```
