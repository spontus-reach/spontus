# Backend Plan

**Status:** Draft
**Owner:** Brian + Joshua
**Last reviewed:** 2026-05-24
**Source:** [Domain Glossary](../domain-glossary.md), [Domain Model](../product/domain-model.md), [MVP Build Slices](../product/mvp-build-slices.md), [Implementation Plan](../implementation-plan.md)
**Use this for:** Backend architecture, Supabase schema planning, auth boundaries, storage, and implementation sequencing.

Back to [Engineering Index](./index.md).

## Summary

The backend should support the smallest useful marketplace loop first:

1. A team officer signs up.
2. The officer creates a team profile.
3. The team selects sponsorship assets.
4. The profile can be submitted for manual verification.
5. A verified team profile can be viewed publicly by sponsors.

Do not build payments, contracts, advanced analytics, automated matching, or a full CRM in the first backend pass.

## Backend Principles

- Use **Team + Sponsor** as the primary account sides.
- Use **Brand** only as sponsor display identity.
- Keep data structures simple and inspectable until real usage proves more abstraction is needed.
- Prefer explicit tables over overly generic polymorphic tables in the MVP.
- Keep manual verification in the MVP.
- Make mock data match the future database shape so the frontend can migrate without a rewrite.
- Build the backend in vertical slices, matching [MVP Build Slices](../product/mvp-build-slices.md).

## Recommended Backend Stack

- Supabase Postgres for data.
- Supabase Auth for users and sessions.
- Supabase Storage for team media, sponsor logos, and proof uploads later.
- Next.js server actions or route handlers for write flows that need validation.
- Row Level Security from the beginning, even if policies are simple.

## Account Model

### `profiles`

One row per authenticated user.

Purpose: store user-level metadata that is not specific to a team or sponsor.

Suggested fields:

```sql
id uuid primary key references auth.users(id) on delete cascade,
full_name text not null,
email text not null unique,
primary_side text not null check (primary_side in ('team', 'sponsor', 'internal')),
created_at timestamptz not null default now(),
updated_at timestamptz not null default now()
```

Notes:

- Use `profiles.id = auth.users.id`.
- `primary_side` controls the first post-signup path, not all permissions forever.
- Do not store passwords or auth credentials here.

## Team-Side Tables

### `teams`

The durable team account object. This should survive officer turnover.

Suggested fields:

```sql
id uuid primary key default gen_random_uuid(),
name text not null,
university text not null,
sport text not null,
location text,
slug text not null unique,
verification_status text not null default 'draft'
  check (verification_status in ('draft', 'submitted_for_verification', 'verified', 'needs_changes', 'suspended')),
created_by uuid not null references profiles(id),
created_at timestamptz not null default now(),
updated_at timestamptz not null default now()
```

### `team_memberships`

Connects users to teams and preserves officer handoff.

Suggested fields:

```sql
id uuid primary key default gen_random_uuid(),
team_id uuid not null references teams(id) on delete cascade,
profile_id uuid not null references profiles(id) on delete cascade,
role text not null check (role in ('owner', 'president', 'sponsorship_coordinator', 'treasurer', 'pr_manager', 'member')),
status text not null default 'active' check (status in ('active', 'invited', 'inactive')),
created_at timestamptz not null default now(),
unique(team_id, profile_id)
```

Notes:

- A team can have multiple officers.
- Use this instead of making the team depend on one graduating student.

### `team_profiles`

The editable/published profile content sponsors review.

Suggested fields:

```sql
id uuid primary key default gen_random_uuid(),
team_id uuid not null unique references teams(id) on delete cascade,
one_liner text,
description text,
roster_size integer,
year_founded integer,
league text,
competition_summary text,
season text,
website_url text,
instagram_url text,
tiktok_url text,
youtube_url text,
livestream_url text,
combined_reach integer,
profile_completeness integer not null default 0,
submitted_at timestamptz,
published_at timestamptz,
created_at timestamptz not null default now(),
updated_at timestamptz not null default now()
```

Notes:

- Keep reach fields self-reported at first.
- Auto-pulled social data can come later.

### `team_events`

Competitions, hosted events, and event inventory.

Suggested fields:

```sql
id uuid primary key default gen_random_uuid(),
team_id uuid not null references teams(id) on delete cascade,
name text not null,
event_type text not null check (event_type in ('competition', 'hosted_event', 'fundraiser', 'other')),
starts_on date,
location text,
expected_attendance integer,
notes text,
created_at timestamptz not null default now()
```

## Sponsorship Asset Tables

### `sponsorship_asset_definitions`

Canonical asset menu used by both team profiles and sponsor listings.

Suggested fields:

```sql
id text primary key,
label text not null,
category text not null check (category in ('brand_visibility', 'social_content', 'product_event_activation')),
description text,
sort_order integer not null default 0,
is_active boolean not null default true
```

Seed examples:

- `jersey_logo`
- `warmup_gear_logo`
- `banner_at_games`
- `website_logo`
- `newsletter_mention`
- `instagram_post`
- `instagram_story`
- `tiktok_reel`
- `highlight_video_logo`
- `livestream_ad_placement`
- `product_sampling`
- `brand_booth`
- `on_course_product_placement`
- `athlete_packet_stuffing`
- `podium_prize_sponsorship`
- `packet_pickup_hosting`
- `custom_activation`

### `team_sponsorship_assets`

Assets a team is willing to offer.

Suggested fields:

```sql
id uuid primary key default gen_random_uuid(),
team_id uuid not null references teams(id) on delete cascade,
asset_id text not null references sponsorship_asset_definitions(id),
status text not null default 'available' check (status in ('available', 'preferred', 'limited', 'unavailable')),
notes text,
created_at timestamptz not null default now(),
updated_at timestamptz not null default now(),
unique(team_id, asset_id)
```

Notes:

- This is the core backend support for the sponsorship asset menu.
- Use notes for team-specific context, such as "available for hosted events only" or "not available on jerseys."

## Sponsor-Side Tables

### `sponsors`

The durable sponsor account object.

Suggested fields:

```sql
id uuid primary key default gen_random_uuid(),
company_name text not null,
website_url text,
industry_category text,
verification_status text not null default 'draft'
  check (verification_status in ('draft', 'submitted_for_verification', 'verified', 'needs_changes', 'suspended')),
created_by uuid not null references profiles(id),
created_at timestamptz not null default now(),
updated_at timestamptz not null default now()
```

### `sponsor_memberships`

Connects users to sponsors.

Suggested fields:

```sql
id uuid primary key default gen_random_uuid(),
sponsor_id uuid not null references sponsors(id) on delete cascade,
profile_id uuid not null references profiles(id) on delete cascade,
role text not null check (role in ('owner', 'admin', 'marketing_manager', 'viewer')),
status text not null default 'active' check (status in ('active', 'invited', 'inactive')),
created_at timestamptz not null default now(),
unique(sponsor_id, profile_id)
```

### `sponsor_profiles`

Sponsor display identity and fit criteria.

Suggested fields:

```sql
id uuid primary key default gen_random_uuid(),
sponsor_id uuid not null unique references sponsors(id) on delete cascade,
brand_name text,
one_liner text,
description text,
logo_url text,
instagram_url text,
target_audience text,
geographic_focus text,
typical_offer_types text[],
past_sponsorships text,
created_at timestamptz not null default now(),
updated_at timestamptz not null default now()
```

Notes:

- `brand_name` may differ from `company_name`.
- This is why Brand is a display identity, not the account object.

## Marketplace Tables

### `sponsorship_listings`

Sponsor-created opportunities teams can apply to.

Suggested fields:

```sql
id uuid primary key default gen_random_uuid(),
sponsor_id uuid not null references sponsors(id) on delete cascade,
title text not null,
description text,
status text not null default 'draft' check (status in ('draft', 'open', 'paused', 'closed')),
offer_types text[] not null default '{}',
offer_summary text,
number_of_teams integer,
geography text,
sport_preferences text[],
team_size_min integer,
social_reach_min integer,
duration text,
application_deadline date,
created_at timestamptz not null default now(),
updated_at timestamptz not null default now(),
published_at timestamptz
```

### `listing_requested_assets`

Assets requested by a sponsor listing.

```sql
id uuid primary key default gen_random_uuid(),
listing_id uuid not null references sponsorship_listings(id) on delete cascade,
asset_id text not null references sponsorship_asset_definitions(id),
required boolean not null default false,
notes text,
unique(listing_id, asset_id)
```

### `applications`

A team's application to a sponsorship listing.

```sql
id uuid primary key default gen_random_uuid(),
listing_id uuid not null references sponsorship_listings(id) on delete cascade,
team_id uuid not null references teams(id) on delete cascade,
status text not null default 'submitted'
  check (status in ('draft', 'submitted', 'under_review', 'accepted', 'declined', 'withdrawn')),
fit_note text,
decline_reason text,
submitted_at timestamptz,
reviewed_at timestamptz,
created_at timestamptz not null default now(),
updated_at timestamptz not null default now(),
unique(listing_id, team_id)
```

## Deal And Proof Tables

These are later-slice tables. Define them early, but do not fully build the UI until after applications/review work.

### `deals`

```sql
id uuid primary key default gen_random_uuid(),
application_id uuid not null unique references applications(id) on delete cascade,
team_id uuid not null references teams(id),
sponsor_id uuid not null references sponsors(id),
status text not null default 'pending_kickoff'
  check (status in ('pending_kickoff', 'active', 'completed', 'canceled')),
starts_on date,
ends_on date,
created_at timestamptz not null default now(),
updated_at timestamptz not null default now()
```

### `deliverables`

```sql
id uuid primary key default gen_random_uuid(),
deal_id uuid not null references deals(id) on delete cascade,
asset_id text references sponsorship_asset_definitions(id),
title text not null,
description text,
due_on date,
status text not null default 'not_started'
  check (status in ('not_started', 'in_progress', 'submitted', 'approved', 'needs_revision')),
created_at timestamptz not null default now(),
updated_at timestamptz not null default now()
```

### `proofs`

```sql
id uuid primary key default gen_random_uuid(),
deliverable_id uuid not null references deliverables(id) on delete cascade,
team_id uuid not null references teams(id),
proof_type text not null check (proof_type in ('image', 'url', 'screenshot', 'note')),
url text,
notes text,
status text not null default 'uploaded' check (status in ('uploaded', 'approved', 'rejected')),
created_at timestamptz not null default now()
```

## Contacts And Relationship Memory

### `contacts`

Use this to preserve relationship context across officer turnover.

```sql
id uuid primary key default gen_random_uuid(),
team_id uuid references teams(id) on delete cascade,
sponsor_id uuid references sponsors(id) on delete cascade,
name text not null,
email text,
role text,
notes text,
created_at timestamptz not null default now(),
updated_at timestamptz not null default now(),
check (team_id is not null or sponsor_id is not null)
```

Notes:

- Do not turn this into a full CRM in v1.
- Use it for sponsor handoff memory, not complex sales automation.

## Storage Buckets

Start with these buckets:

| Bucket | Access | Use |
| --- | --- | --- |
| `team-media` | public read, team write | Team photos and action shots. |
| `sponsor-logos` | public read, sponsor write | Sponsor logos and brand identity assets. |
| `proof-assets` | private or signed read | Proof uploads after deals exist. |

Slice 1 only needs `team-media`, and even that can be mocked if storage setup slows the first build.

## Row Level Security Direction

Enable RLS on all app tables.

Initial policy intent:

- Public users can read verified/published team profiles.
- Team members can read and update their own team and team profile.
- Team members can manage their team's sponsorship assets and events.
- Sponsor members can read and update their own sponsor profile and listings.
- Verified teams can read open listings.
- Teams can create applications for open listings.
- Sponsors can read applications for their own listings.
- Internal users can read submitted profiles and update verification status.

Do not rely on frontend checks for access control.

## Slice 1 Backend Tasks

Build only what is needed for team profile foundation:

1. Create Supabase project and local environment variables.
2. Create `profiles`, `teams`, `team_memberships`, `team_profiles`, `team_events`, `sponsorship_asset_definitions`, and `team_sponsorship_assets`.
3. Seed the canonical sponsorship asset definitions.
4. Add simple RLS policies for team ownership and public verified profile reads.
5. Wire the frontend to mock data first or Supabase if ready.
6. Keep profile submission as a status transition, not a full admin workflow yet.

## Slice 2 Backend Tasks

1. Add `sponsors`, `sponsor_memberships`, and `sponsor_profiles`.
2. Add `sponsorship_listings` and `listing_requested_assets`.
3. Add RLS for sponsor ownership and public/open listing reads.
4. Support draft/open/paused/closed listing statuses.

## Slice 3 Backend Tasks

1. Add `applications`.
2. Enforce one application per team per listing.
3. Allow verified teams to apply to open listings.
4. Allow sponsors to read applications for their own listings.

## Slice 4 Backend Tasks

1. Add application review status transitions.
2. Add canned decline reasons.
3. Create a deal when an application is accepted, or stub deal creation until Slice 5/later.

## Slice 5 Backend Tasks

1. Add an internal verification queue.
2. Add internal role support.
3. Add admin policies for verification status updates.
4. Track verification notes and change history if needed.

## Migration Order

1. Auth/profile foundation.
2. Team foundation.
3. Sponsorship asset taxonomy.
4. Sponsor foundation.
5. Listings.
6. Applications.
7. Deals, deliverables, and proofs.
8. Admin verification depth.

## Open Decisions

- Whether to use Supabase Auth magic links only or also password auth.
- Whether internal users are represented by `profiles.primary_side = 'internal'` or a separate `internal_roles` table.
- Whether public team profile reads require `teams.verification_status = 'verified'`, `team_profiles.published_at is not null`, or both.
- Whether proof assets should be private signed URLs or visible to both sides by default.
- Whether to create `deals` automatically on accepted application in the MVP or manually after founder review.

## Backend Non-Goals

- Payment processing.
- Escrow.
- Tax documents.
- Contract generation.
- Automated matching weights.
- Social API ingestion.
- Multi-school compliance engine.
- Full CRM.
- Notification system beyond minimal in-app status changes or email stubs.
