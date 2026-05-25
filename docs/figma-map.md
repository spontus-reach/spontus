# Figma Map

**Status:** Draft
**Owner:** Brian + Joshua
**Last reviewed:** 2026-05-24
**Source:** Connected Figma prototype, [UX Walkthrough](./product/ux-walkthrough.md), [MVP Build Slices](./product/mvp-build-slices.md)
**Use this for:** Mapping Figma frames to implementation routes and components before Cursor writes app code.

Back to [Documentation Hub](./README.md).

## Summary

Cursor should use the connected Figma MCP server to inspect the relevant frame before building any screen. This document is the bridge between product docs, Figma frames, and implementation routes.

Add direct Figma frame links in the `Figma frame` column as the prototype is finalized.

## Naming Rule

Use **Team + Sponsor** as product language. Use **Brand** only for public-facing sponsor identity. Avoid making **Clubs + Brands** the primary implementation language.

## Route And Frame Map

| Product area | Figma frame | MVP route | Main components | Build slice |
| --- | --- | --- | --- | --- |
| Landing page | TODO: paste frame link | `/` | `LandingHero`, `RoleCta`, `TeamPreviewCard`, `HowItWorks` | Marketing / pre-slice |
| Team signup | TODO: paste frame link | `/signup/team` | `TeamSignupForm`, `EduEmailField`, `RoleSelect` | Slice 1 |
| Team profile builder | TODO: paste frame link | `/team/onboarding` | `ProfileBuilderShell`, `ProfileProgressSidebar`, `TeamBasicsForm`, `SocialReachForm`, `CompetitionEventsForm`, `SponsorshipAssetMenu`, `HostedEventsForm`, `LookingForForm`, `MediaUploadForm` | Slice 1 |
| Published team profile | TODO: paste frame link | `/teams/[slug]` | `TeamProfileHero`, `TeamStats`, `AssetGrid`, `HostedEventsSection`, `PastSponsorsSection`, `MediaGallery` | Slice 1 |
| Sponsor signup | TODO: paste frame link | `/signup/sponsor` | `SponsorSignupForm`, `WorkEmailField`, `CompanyWebsiteField` | Slice 2 |
| Sponsor profile builder | TODO: paste frame link | `/sponsor/onboarding` | `SponsorProfileForm`, `BrandIdentitySection`, `SponsorshipPreferencesSection` | Slice 2 |
| Sponsorship listing composer | TODO: paste frame link | `/sponsor/listings/new` | `ListingComposer`, `OfferTypeSelector`, `RequestedAssetsSelector`, `EligibilityCriteriaForm`, `ListingPreview` | Slice 2 |
| Team listings feed | TODO: paste frame link | `/team/listings` | `ListingsFeed`, `ListingCard`, `ListingFilters`, `MatchBadge` | Slice 3 |
| Sponsorship listing detail | TODO: paste frame link | `/listings/[id]` or drawer from feed | `ListingDetail`, `OfferSummary`, `RequestedAssets`, `ApplyCta` | Slice 3 |
| Team application modal | TODO: paste frame link | Modal from listing detail | `ApplicationModal`, `TeamProfilePreview`, `FitNoteField` | Slice 3 |
| Sponsor applicants grid | TODO: paste frame link | `/sponsor/listings/[id]/applicants` | `ApplicantsGrid`, `ApplicantCard`, `ApplicantCompareDrawer`, `ApplicantDecisionActions` | Slice 4 |
| Sponsor applicant team view | TODO: paste frame link | `/sponsor/applications/[id]` | `ApplicantProfileView`, `AcceptAction`, `DeclineAction`, `MessageAction` | Slice 4 |
| Manual verification queue | TODO: paste frame link or internal placeholder | `/admin/verification` | `VerificationQueue`, `VerificationCard`, `VerificationDecisionForm` | Slice 5 |
| Lightweight marketplace thread | TODO: paste frame link | `/messages/[threadId]` | `MessageThread`, `DealContextPanel`, `SimpleMessageInput` | Later slice |
| Deal checklist and proof | TODO: paste frame link | `/deals/[id]` | `DealChecklist`, `DeliverableItem`, `ProofUpload`, `SponsorReviewStatus` | Later slice |

## First Cursor Build Target

Start with Slice 1:

1. Team signup route.
2. Team profile builder route.
3. Sponsorship asset menu component.
4. Published team profile route.
5. Manual verification status in mock data.

Do not start by building the full marketplace. The first product loop is a team creating a sponsor-ready profile.

## Figma Handoff Expectations

Before implementation, Cursor should inspect:

- Layout hierarchy.
- Component variants.
- Token usage.
- Spacing and breakpoints.
- Empty, loading, and validation states when present.
- Interactions for selected assets and profile completeness.

If a frame is missing, Cursor should create a simple implementation based on the repo docs and mark the Figma gap in its summary.
