# Domain Glossary

**Status:** Canonical
**Owner:** Brian + Joshua
**Last reviewed:** 2026-05-24
**Source:** [MVP Overview](./product/mvp-overview.md), [Teams And Sponsors Definitions](./strategy/clubs-and-brands-definitions.md), [Product Vision](./strategy/product-vision.md)
**Use this for:** Shared product, design, engineering, and GTM language before development starts.

Back to [Documentation Hub](./README.md).

## Summary

Use **Teams + Sponsors** as the canonical marketplace language. A team seeks support. A sponsor provides support. A brand is the public identity of a sponsor, not the primary marketplace side.

This glossary should guide issue titles, feature specs, UI labels, data model names, and GTM notes unless a migrated source is being quoted directly.

## Canonical Terms

| Term | Definition | Use this for | Avoid |
| --- | --- | --- | --- |
| Team | A college club sports organization seeking sponsorship support. | Account side, profile owner, applicant, deal participant. | Club as the primary account type. |
| Sponsor | A company or organization that provides cash, product, discounts, services, or access in exchange for sponsorship value. | Account side, listing owner, reviewer, deal participant. | Brand as the primary account type. |
| Brand | The sponsor's public-facing identity, product line, or marketing name. | Display names, sponsor positioning, brand safety, category conflicts. | Using brand when the object is really a sponsor account. |
| Sponsorship Listing | A sponsor-created opportunity that describes what the sponsor offers, who should apply, and what the sponsor expects in return. | Marketplace supply, browse pages, application targets. | Calling this a deal before a team is accepted. |
| Application | A team's request to be considered for a specific sponsorship listing. | Team submission, sponsor review, applicant status. | Treating application and deal as the same object. |
| Deal | An accepted sponsorship relationship between one sponsor and one team. | Post-acceptance coordination, deliverables, proof, renewal. | Calling an open listing a deal. |
| Deliverable | A promised action or asset the team owes the sponsor. | Social post, logo placement, booth access, product photo, event activation. | Proof; proof verifies a deliverable but is not the deliverable. |
| Proof | Evidence submitted to show a deliverable happened. | Uploaded photo, post URL, metric screenshot, event recap. | Deliverable. |
| Verification | A trust check that confirms a team or sponsor is legitimate enough to use the marketplace. | Manual review, account status, trust badges, admin workflow. | Full compliance automation in MVP. |
| Asset | Something a team can offer or a sponsor can request as part of a sponsorship. | Jersey logo, social post, event booth, hosted event, sampling, discount code. | File upload unless the context is specifically media. |
| Contact | A person connected to a team, sponsor, or pipeline lead. | Officer, sponsor manager, founder relationship, outreach owner. | Account; contacts belong to accounts or leads. |
| Pipeline Stage | The current GTM/outreach state of a sponsor or team lead. | Manual sales and research tracking. | Product application status. |
| Marketplace Side | One side of the two-sided marketplace: Team or Sponsor. | Permissions, onboarding, navigation, analytics segmentation. | User role when the distinction is account-side behavior. |

## Ambiguous Terms

### Sponsor vs Brand

Use **Sponsor** when describing the account, company, decision-maker, listing owner, or deal participant.

Use **Brand** when describing public identity, consumer perception, product category, brand safety, or marketing fit.

Example: "A sponsor creates a listing under the Fluid Nutrition brand."

### Team vs Club

Use **Team** as the product term. Use **club sports** only when describing the market category or university context.

Example: "The Cal Poly Triathlon team is a college club sports team."

### Listing vs Deal

Use **Sponsorship Listing** before a team has been accepted. Use **Deal** after a sponsor accepts a team and both sides need to coordinate delivery.

Example: "A sponsor posts a listing. A team applies. If accepted, that application becomes a deal."

### Deliverable vs Proof

Use **Deliverable** for the promised action. Use **Proof** for evidence that the action happened.

Example: "One Instagram post is the deliverable. The post URL and screenshot are proof."

## MVP Status Language

| Object | MVP statuses |
| --- | --- |
| Team profile | Draft, Submitted for verification, Verified, Needs changes, Suspended |
| Sponsor profile | Draft, Submitted for verification, Verified, Needs changes, Suspended |
| Sponsorship listing | Draft, Open, Paused, Closed |
| Application | Draft, Submitted, Under review, Accepted, Declined, Withdrawn |
| Deal | Pending kickoff, Active, Completed, Canceled |
| Deliverable | Not started, In progress, Submitted, Approved, Needs revision |
| Proof | Uploaded, Approved, Rejected |
| Pipeline lead | Identified, Contacted, Responded, Meeting scheduled, Qualified, Not now, Closed |

## Writing Rules

- Use **team** and **sponsor** for the two marketplace sides.
- Use **brand** only when public-facing identity matters.
- Use **club sports** for the category, not as the account object.
- Use **listing** for open opportunities and **deal** for accepted relationships.
- Use **deliverable** for obligations and **proof** for evidence.
- Keep implementation names close to these terms unless there is a strong technical reason not to.
