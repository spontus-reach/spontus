# UX Walkthrough

**Status:** Canonical
**Owner:** Brian + Joshua
**Last reviewed:** 2026-05-24
**Source:** Migrated Notion UX walkthrough and Figma planning notes
**Use this for:** Detailed product flows, screen inventory, state coverage, and design handoff.

Back to [Documentation Hub](../README.md).

## Summary / Why This Matters

This is the most detailed MVP interaction blueprint. Use [MVP Overview](./mvp-overview.md) for the short product scope, then use this page when designing or building screens, flows, empty states, verification paths, and the team/brand sponsorship workflow.

> User Flow Plan — restructured via the Figma User Flow Planner skill. The narrative walkthrough below is preserved as reference; the plan here is the authoritative pre-design blueprint.

---

## 1. Flow Overview

**Feature:** Spontus MVP — two-sided sponsorship marketplace (club sports teams ↔ brands)
**User types:** (A) Team officer (student, .edu verified) · (B) Brand marketer
**Platform:** Web (responsive, desktop-first; mobile-friendly for teams browsing post-practice)
**Starting point:** Marketing landing page (`/`) with two CTAs
**Success exits:**
- Team: Signed sponsorship agreement + uploaded proof of performance
- Brand: Signed agreement with a verified team matching their listing criteria

**Failure exits:**
- Non-.edu signup blocked → educational redirect
- Verification rejected → remediation path (re-link socials / re-submit club directory)
- No matches found → saved search + email alert
- Application declined → team returns to feed with similar listings surfaced

---

## 2. Screen Map

### A. Shared / Entry

| # | Screen | Type | Triggered by | Notes |
|---|--------|------|-------------|-------|
| 0.1 | Landing page | New | Direct / referral | Two CTAs + live social proof + 3-4 real team cards |
| 0.2 | Role picker confirm | Modal | CTA click | Prevents accidental wrong-side signup |
| 0.3 | Login | New | "Sign in" link | Email magic-link primary, password fallback |
| 0.4 | Forgot / resend verification | New | Email failure | Resends .edu link |

### B. Team Side

| # | Screen | Type | Triggered by | Notes |
|---|--------|------|-------------|-------|
| T1 | Team signup form | New | Landing CTA | .edu validation inline |
| T2 | "Check your email" | New | Submit T1 | Polling for verification; resend CTA |
| T3 | Email-blocked error | New | Non-.edu domain | Shows allowed examples + waitlist |
| T4 | Profile builder shell | New | Email confirmed | Stepper: Basics → Social → Events → Assets → Hosted → Looking-for → Media |
| T4a | Section: Basics | Step | T4 enter | Auto-fill from signup |
| T4b | Section: Social & Reach | Step | T4a complete | OAuth connect → loading → fetched stats |
| T4b-err | Social fetch failed | Inline error | API failure | Manual entry fallback |
| T4c | Section: Competition & Events | Step | T4b complete | Add-row pattern for events |
| T4d | Section: Sponsorship Asset Menu | Step | T4c complete | Checklist + per-asset note |
| T4e | Section: Hosted Events | Step | T4d complete | Skippable if "no" |
| T4f | Section: What you're looking for | Step | T4e complete | Include exclusion categories |
| T4g | Section: Photos & Media | Step | T4f complete | Min 1 photo to publish |
| T5 | Profile preview | New | T4g complete | "This is what brands see" |
| T6 | Verification status | New | Profile published | Pending / Verified / Action-needed states |
| T7 | Team dashboard (home) | New | Post-verification | Listings feed default |
| T8 | Listing detail | Drawer | Card tap | Apply CTA + note field |
| T9 | Application submitted | Toast + state | Apply submit | Card flips to "Applied" |
| T10 | Inbox / messages | New | Nav | Threads grouped by brand |
| T11 | Application status board | New | Nav | Columns: Applied · In conversation · Accepted · Declined |
| T12 | Contract review | New | Brand accepts | Inline comments, sign |
| T13 | Active deal dashboard | New | Contract signed | Deliverables checklist + upload |
| T14 | Proof upload | Modal | Deliverable tap | Screenshot/photo + auto-detect tags |

### C. Brand Side

| # | Screen | Type | Triggered by | Notes |
|---|--------|------|-------------|-------|
| B1 | Brand signup form | New | Landing CTA | Work email + website |
| B2 | Domain verification pending | New | Submit B1 | Auto-checks email/website domain parity |
| B3 | Brand profile builder | New | B2 verified | Single-page, not stepped (shorter) |
| B4 | Brand dashboard (home) | New | Profile complete | Two-path: Post listing · Browse teams |
| B5 | Listing composer | New | "Post listing" | Mirrors team asset taxonomy |
| B5-preview | Listing preview | Modal | Composer "Preview" | Shows team-side rendering |
| B6 | My listings | New | Nav | States: Draft · Live · Paused · Closed |
| B7 | Applicants grid | New | Listing tap | Match score sort, compare drawer |
| B8 | Team profile (brand view) | New | Applicant tap | Accept · Decline · Message |
| B9 | Recruiter search | New | "Browse teams" | Filters + saved searches |
| B10 | Saved teams | New | Bookmark | List view with notes |
| B11 | Outreach composer | Modal | "Reach out" | Templates + personalization |
| B12 | Contract draft | New | Accept applicant | Same as T12, brand POV |
| B13 | Active deals dashboard | New | Contract signed | Proof feed, reach metrics |

### D. Cross-cutting states (apply to every list/detail screen)

| State | When |
|-------|------|
| Skeleton loading | Initial fetch |
| Empty (first-time) | No data ever |
| Empty (filtered) | Filters return zero |
| Network error | API failure → retry CTA |
| Permission error | Unverified user hits gated screen |
| Stale / outdated | Auto-pulled social data > 30 days |

---

## 3. State Matrix (key screens)

### Landing page (0.1)

| State | Trigger | Visual change | Action |
|-------|---------|--------------|--------|
| Default | Load | Hero + two CTAs + live counters | Choose path |
| Counters loading | First paint | Skeleton numbers | None |
| Logged-in re-entry | Session detected | "Continue as [name]" replaces CTAs | Resume |

### Profile builder — Social & Reach (T4b)

| State | Trigger | Visual | Action |
|-------|---------|--------|--------|
| Disconnected | Step enter | Connect buttons | OAuth |
| Connecting | OAuth click | Spinner in card | Cancel |
| Connected | OAuth success | Follower count + last-pulled timestamp | Refresh / disconnect |
| Fetch failed | API error | Red border + retry + manual entry link | Retry / type manually |
| Rate-limited | IG/TikTok throttle | Yellow notice "Try again in N min" | Skip for now |

### Listings feed (T7)

| State | Trigger | Visual | Action |
|-------|---------|--------|--------|
| Default | Load | Card grid sorted by match score | Tap card |
| Empty — no matches | Filter / no listings | Illustration + "Save search" CTA | Save search / clear filters |
| Empty — first-time | New verified team | Onboarding tour overlay | Dismiss |
| Loading more | Scroll | Skeleton cards at bottom | None |
| Applied marker | Already applied | Card shows badge + dimmed | View status |
| Closed listing | Spots filled | Greyed + "Spots filled" | Browse similar |

### Applicants grid (B7)

| State | Trigger | Visual | Action |
|-------|---------|--------|--------|
| Default | Open listing | Grid sorted by match % | Tap team |
| Empty | No applicants yet | "Share this listing" CTA | Copy link / boost |
| Reviewing | Accept/decline in flight | Optimistic check / dimmed | Undo within 5s |
| Closed | Listing closed | Read-only banner | Reopen |

### Verification status (T6)

| State | Trigger | Visual | Action |
|-------|---------|--------|--------|
| Pending | Submitted | Yellow badge, "Review in <48h" | Edit links |
| Verified | Staff approval | Green badge | Continue |
| Action needed | Mismatch found | Red banner + specifics | Fix & resubmit |
| Rejected | Failed twice | Support contact CTA | Email founder |

---

## 4. Decision Points

**D1 — Email domain check (T1):** .edu? → T2 verify · else → T3 blocked + waitlist.

**D2 — Profile completeness gate (T4g → T5):** All required + ≥1 photo? → T5 preview · else → return to incomplete section with inline highlight.

**D3 — Verification result (T6):** Verified? → T7 feed unlocks with badge · Pending? → T7 with "Pending" badge, can browse but not apply · Rejected? → remediation flow.

**D4 — Brand path choice (B4):** "I know what I want" → B5 listing · "Show me teams" → B9 recruiter.

**D5 — Application disposition (B7 → team):** Accept → T12/B12 contract · Decline → polite notification + similar listings · Message → opens B11/T10 thread.

**D6 — Social auto-pull (T4b):** API success → display + cache · Failure → manual entry permitted, flagged "self-reported" on profile.

**D7 — Hosted events (T4e):** Hosts events? → expanded activation menu · else → skip section, profile annotated.

**D8 — Exclusion category match (B7 ranking):** Brand category in team's excluded list? → team auto-hidden from that listing's applicants, with team override option.

**D9 — Contract edit suggested (T12/B12):** Both signed? → T13/B13 active · Edits pending? → diff view, re-sign required.

---

## 5. Suggested Figma File Structure

```
Spontus MVP/
├─ 00 Cover & Changelog
├─ 01 Flow Map (this doc, visualized)
├─ 02 Design System
│  ├─ Tokens (green/gold, dark mode)
│  ├─ Typography (jersey-feel display + clean body)
│  ├─ Components (Team Card, Listing Card, Asset Chip, Match Score, Verification Badge)
├─ 03 Shared / Entry
│  ├─ Landing
│  ├─ Auth (signup variants, login, magic link)
├─ 04 Team — Happy Path
│  ├─ Signup → Verify → Profile Builder (T4a–g)
│  ├─ Preview → Verification → Feed → Apply → Contract → Active deal
├─ 05 Brand — Happy Path
│  ├─ Signup → Profile → Dashboard
│  ├─ Path A: Listing composer → Applicants → Accept → Contract
│  ├─ Path B: Recruiter search → Outreach → Contract
├─ 06 Loading States
├─ 07 Error States (network, validation, permission, verification reject)
├─ 08 Empty States (first-time, filtered, no-match)
├─ 09 Edge Cases
│  ├─ Social fetch failure / manual entry
│  ├─ Officer transition (account handoff)
│  ├─ Excluded brand category collision
│  ├─ Stale auto-pulled data
│  ├─ Listing closes mid-application
├─ 10 Proof of Performance
├─ 11 Mobile responsive specs
└─ 12 Handoff (specs, prototypes, redlines)
```

---

## 6. What NOT to Design Yet (explicit out of scope)

- Payment / escrow UI (Phase 2 — stub "Payments coming soon" on contracts)
- AI matching score *explanation* surface (show score, don't explain it yet)
- AI contract drafting UI (use template fill-in for MVP)
- Officer transition / account handoff (Phase 2)
- Brand analytics dashboard beyond delivery checklist
- Native mobile app screens (responsive web only)
- Multi-language / i18n
- Admin / staff verification tooling (internal Notion-based for first 100)
- Public team directory SEO pages
- Notifications center beyond email + in-app inbox

---

## 7. Quality Checks

- [x] Loading, error, empty covered for every list/detail screen (§ Cross-cutting + state matrix)
- [x] All 9 decision points mapped with both branches
- [x] Entry points: direct landing, referral, returning session, deep-link from email
- [x] Out-of-scope explicit (§ 6)
- [x] Figma structure matches screen map sections
- [x] **Open question:** Do brands need a paused/draft state on profiles, or only on listings? (Recommend: listings only for MVP.)
- [x] **Open question:** Should declined applicants see *why*? (Recommend: optional canned reasons, no free-text for MVP.)

---

# Original Narrative Walkthrough (reference)

## Philosophy

Every screen should answer one question: "What do I do next?" No dead ends, no confusion, no features that exist because competitors have them. Every element earns its place by moving a team closer to a sponsor or a brand closer to a team.

Design principles:
- **Speed to value:** A team should have a complete profile in under 5 minutes. A brand should see relevant teams in under 60 seconds.
- **Trust through verification:** Both sides need to believe the other is real. Verification badges, real data, and social proof everywhere.
- **Simplicity over features:** CampusLink has event calendars, ambassador programs, UGC campaigns, tablings, playbooks. That's feature bloat for a startup. You need: profiles, listings, applications, messaging, contracts. That's it for MVP.

---

## The Landing Page

Two clear paths. Nothing else.

"I'm a team looking for sponsors" → Team signup
"I'm a brand looking to sponsor teams" → Brand signup

Below: social proof. "X teams. X brands. X deals facilitated." Even if the numbers are small (4 teams, 0 brands), showing real numbers builds more trust than showing nothing. Below that: 3-4 team profile cards showing real Cal Poly teams with real follower counts and real sports. A brand lands on this page and immediately sees the product.

Reference: Airbnb's early landing page showed real listings with real photos before they had thousands. Faire (wholesale marketplace) shows real brands on their homepage. You show real teams.

---

## TEAM SIDE

### Step 1: Signup (30 seconds)

Sign up with .edu email. This is your first verification layer — only real students at real universities can create team profiles. No .edu, no account.

Fields:
- Your name
- Your .edu email
- Your university (dropdown, autocomplete)
- Your club sport
- Your role (President, Sponsorship Coordinator, Treasurer, etc.)

That's it. No password creation screen, no terms of service wall, no onboarding survey. Send a verification email, confirm, move to profile creation.

Reference: LinkedIn lets you sign up with just name + email + password. The profile building comes after.

### Step 2: Build Team Profile (3-5 minutes)

This is the core product. The team profile IS what brands evaluate. It needs to be dead simple to fill out and impressive to look at.

**Section 1: Basics (auto-fill what you can)**
- Team name (pre-filled from signup: "Cal Poly Men's Soccer")
- Sport
- University
- Location (city, state)
- Team size (number on roster)
- Year founded
- One-line description ("Division I club soccer competing in the West Coast Soccer Association")

**Section 2: Social & Reach (connect accounts)**
- Instagram handle → auto-pull follower count, post frequency, engagement rate
- TikTok handle → same
- YouTube/streaming → link to channel, subscriber count
- Website URL
- Combined reach auto-calculates and displays prominently: "12,400 combined followers"

Reference: Linktree auto-pulls social stats. OpenSponsorship auto-pulls athlete social data. Don't make teams type their follower count — pull it.

**Section 3: Competition & Events**
- What league/conference are you in?
- How many competitions per season?
- Upcoming events (add dates, locations, expected attendance)
- Do you host events? (like tri's MTS in March)
- Do you livestream? How many viewers per stream?

This section matters because brands buy exposure at events. A team that competes at 15 tournaments in 5 states is more valuable than a team that plays 3 home games.

**Section 4: Sponsorship Menu (THE KEY FEATURE)**

This is where you differentiate from everything else. Every team defines what they can offer a sponsor, organized into customizable assets:

- [ ] Jersey/kit logo placement
- [ ] Warm-up/practice gear logo
- [ ] Banner at events
- [ ] Social media posts (Instagram, TikTok, etc.)
- [ ] Story mentions
- [ ] Highlight video logo/intro
- [ ] Livestream ad placement (pre-roll, banner overlay)
- [ ] Product sampling at events
- [ ] Brand table/booth at hosted events
- [ ] On-course/in-game product placement (e.g. nutrition at aid stations)
- [ ] Athlete packet stuffing (gels, coupons, samples in event packets)
- [ ] Podium/prize sponsorship (brand provides prizes for winners)
- [ ] Packet pickup hosting (brand's store hosts pre-event pickup)
- [ ] Website logo placement
- [ ] Email newsletter mention
- [ ] Custom (describe)

Teams check what they're willing to offer. Each asset can have a note: Soccer checks "Highlight video logo/intro" and "Livestream ad placement" but NOT "Jersey/kit logo placement" with a note: "We prefer to keep jerseys clean."

This directly solves the problem you discovered — soccer hates jersey logos but loves livestream placement. Rugby loves jersey logos. Tri wants brands at their hosted event selling products and providing services. Every team is different and the profile reflects that.

**Section 4b: Hosted Events (NEW — from tri research)**

Teams that host events are dramatically more valuable to brands. Tri's MTS had 8 brand activations at one race. This needs its own section:

- Do you host any events? (yes/no)
- Event name, date, location
- Expected number of athletes/attendees
- What can sponsors do at your event? (select multiple):
    - [ ] Set up a booth/table
    - [ ] Provide on-course products (nutrition, hydration)
    - [ ] Sponsor prizes for podium finishers
    - [ ] Stuff athlete packets with product/coupons
    - [ ] Host pre-event activities (packet pickup, bike mechanic, etc.)
    - [ ] Banner placement at venue
    - [ ] Custom activation (describe)

Reference: Tri's MTS had Sailfish (350 swim caps), 100% (free sunglasses for 1st), Voler (free jersey for 2nd), Carbs ($50 gift card for 3rd), Fluid (on-course nutrition), Cambria Bike (mechanic booth), Running Warehouse (24 gift cards), GH Sports (packet stuffing + pickup hosting). That's 8 different activation types at one event.

**Section 5: What You're Looking For**

- Preferred sponsor categories (select multiple): Nutrition, Beverage, Apparel, Equipment, Recovery/Fitness, Local Business, Food/Restaurant, Technology, Financial Services, Other
- Categories you DON'T want: (Soccer would check "Energy Drinks" here)
- What types of deals interest you? (select multiple):
    - [ ] Cash sponsorship
    - [ ] Free product for team use
    - [ ] Discount codes for team members
    - [ ] Group ordering account access
    - [ ] Gift cards
    - [ ] Event prizes (podium awards, raffle items)
    - [ ] On-site services (mechanic, physio, etc.)
    - [ ] Product for event packets/goody bags
- Estimated sponsorship value range: (helps brands know the ballpark)

**Section 6: Photos & Media**

- Team photo (required — this is the first thing brands see)
- Action shots from competitions
- Photos showing existing sponsor placements (if any)
- Livestream/highlight reel clips

Minimum 1 photo to publish profile. But prompt teams to add more: "Teams with 5+ photos get 3x more brand interest."

### Step 3: Verification

After profile is complete, team enters verification:
- .edu email already confirmed ✓
- Link to official university club directory listing (like [clubs.calpoly.edu](http://clubs.calpoly.edu)) → staff reviews and confirms the team is real
- Instagram account matches team name and shows real activity

Verified teams get a badge on their profile. Brands can filter to show only verified teams. This is your trust layer and your moat — CampusLink doesn't verify athletic teams against university directories.

### Step 4: Browse & Apply

Once profile is live, teams see a feed of brand listings:

"Fluid Nutrition is looking for 3 club sports teams in California. Offering: product allocation + $300 cash per team. Wants: social media posts, event sampling. Duration: Fall 2026 season."

Each listing shows:
- Brand name + logo + verified badge
- What they're offering (cash, product, both + amount)
- What they want (which sponsorship assets)
- Geographic preference
- Sport preference (or "any")
- Team size minimum
- Duration
- Number of spots remaining
- Number of teams that have already applied

Teams click "Apply" → their profile is sent to the brand. No cover letter needed — the profile IS the application. But teams can add a short note: "We host MTS in March with 500+ attendees — great sampling opportunity."

Reference: AngelList (now Wellfound) job applications work this way. Your profile is your resume. You click apply, add a short note, done.

---

## BRAND SIDE

### Step 1: Signup (30 seconds)

Brand signs up with:
- Company name
- Your name + role ("Marketing Manager")
- Work email
- Company website URL
- Industry/category (dropdown: Nutrition, Beverage, Apparel, etc.)

### Step 2: Brand Profile (2 minutes)

- Company name + logo upload
- One-line description ("Performance nutrition for endurance athletes")
- Website
- Instagram handle (auto-pull follower count)
- Industry category
- What you typically offer in sponsorships: Cash, Product, Both
- Typical deal size range
- Geographic focus (national, regional, specific states)
- Target demographics (college athletes, specific sports, etc.)
- Previous sponsorships (optional — builds credibility: "We've sponsored 12 club teams across 5 universities")

Reference: Faire's brand profiles show product photos, company story, and wholesale terms. Clean and professional.

### Step 3: Verification

- Website domain matches email domain
- Real Instagram account with real followers
- Manual review for first 100 brands (you personally check each one)

Verified badge on profile. Teams see it and trust the brand is real.

### Step 4: Two Paths — Post a Listing OR Browse Teams

**Path A: Post a Sponsorship Listing**

Brand creates a listing:
- Title: "Fall 2026 Campus Ambassador Program"
- What you're offering (select all that apply):
    - [ ] Cash ($X amount)
    - [ ] Free product for team use (describe)
    - [ ] Discount codes (percentage off)
    - [ ] Group ordering account access
    - [ ] Gift cards ($X value)
    - [ ] Event prizes for podium/winners
    - [ ] On-site services at events (describe: mechanic, physio, etc.)
    - [ ] Product for event packets/goody bags
- What you want in return: (select from the same asset checklist teams use — jersey logos, social posts, event sampling, etc.)
- How many teams you want to sponsor: (1, 3, 5, 10, unlimited)
- Geographic preference: National / specific states / specific universities
- Sport preference: Any / specific sports
- Team size minimum: (e.g., 15+ athletes)
- Social media minimum: (e.g., 500+ followers)
- Duration: One event / One season / Academic year / Ongoing
- Application deadline

Once posted, matching teams see the listing in their feed. Teams apply. Brand reviews applications.

**Path B: Browse Teams Directly (Recruiter Mode)**

Brand searches and filters team profiles:
- Filter by sport, university, state, team size, follower count
- Sort by: relevance, follower count, competition level
- View full profiles
- Click "Reach Out" to message a team directly

This is LinkedIn Recruiter for sponsorships. Some brands know exactly what they want and don't need to post a listing. They want to find the right team and reach out.

Reference: LinkedIn has both — companies post jobs (listings) AND use Recruiter to find candidates (browse). Both paths should exist.

### Step 5: Review Applications

Brand clicks on a listing and sees all applicant teams in a grid:
- Team photo, name, sport, university
- Roster size, follower count, competitions per season
- Which sponsorship assets they offer (matched against what the brand asked for)
- Compatibility score (auto-calculated: "85% match")

Brand clicks into a team profile, reviews full details, and either:
- "Accept" → moves to contract stage
- "Decline" → team gets a polite notification
- "Message" → asks questions before deciding

Reference: Airbnb hosts review guest profiles before accepting. Same pattern — brand reviews team profile before accepting.

---

## THE DEAL FLOW

### Contract Generation

When a brand accepts a team (or a team accepts a brand's direct outreach), the platform auto-generates a sponsorship agreement:

Pre-filled from both profiles:
- Brand name, team name
- What brand provides (cash amount, product description)
- What team delivers (specific assets they checked)
- Duration (from the listing)
- Delivery timeline ("Team will post 3 Instagram posts by [date]")
- Termination clause (standard: either side can cancel with 14 days notice)

Both sides review, can suggest edits (like Google Docs commenting), and sign digitally. This is where the AI contract generation feature lives eventually — but for MVP, use templates with auto-filled fields.

Reference: Gusto auto-generates employment contracts from profile data. Same concept.

### Payment (Phase 2, not MVP)

For cash deals: Brand pays through the platform. You hold funds until team delivers first proof of performance. Then release. You take 10-15% as a platform fee.

For product deals: Brand confirms shipment through platform. Team confirms receipt. No money flows through you, but you could charge brands a flat listing/matching fee ($50-100 per deal).

---

## PROOF OF PERFORMANCE

After a deal is active, teams upload proof:
- Screenshots of Instagram posts with tags
- Photos of logo on jerseys/banners at events
- Livestream clips showing brand placement
- Event attendance numbers

Brand sees a dashboard: "Cal Poly Soccer — 3/5 Instagram posts delivered. 2 events completed. Estimated reach: 8,400."

This is the accountability layer that currently doesn't exist ANYWHERE. Jason said brands just trust it's happening. Your platform makes it visible.

Reference: Influencer marketing platforms like AspireIQ show brands a dashboard of delivered content. Same concept adapted for team sponsorships.

---

## WHAT MAKES THIS BETTER THAN CAMPUSLINK

| Feature | Spontus | CampusLink |
|---------|---------|------------|
| Focus | Club sports specifically | All student orgs broadly |
| Profiles | Persistent team profiles with athletic data | Event-centric listings |
| Sponsorship types | Season-long partnerships with customizable assets | Event sponsorships |
| Team data | Auto-pulled social stats, competition schedules, roster size | Basic org info |
| Verification | .edu email + university club directory cross-reference | Unknown |
| Sponsorship assets | Customizable menu (jersey, livestream, events, social) | Event presence |
| Proof of performance | Dashboard with delivered content and reach metrics | None visible |
| Relationship management | Multi-season renewals, officer transition tools | One-off transactions |
| AI features | Contract generation, brand-team matching | None visible |

---

## MVP FEATURE PRIORITY

### Must build (Week 1-2)

1. Landing page with two paths (team/brand)
2. Team signup + profile builder with sponsorship asset menu
3. Brand signup + profile builder
4. Brand listing creation
5. Team browse + apply flow
6. Basic messaging between matched teams and brands

### Should build (Week 3-4)

1. Brand browse/search teams (recruiter mode)
2. Auto-pull Instagram follower counts
3. Contract template generation
4. Verification badge system

### Build later

1. Payment processing
2. Proof of performance dashboard
3. AI matching/scoring
4. AI contract drafting
5. Officer transition tools
6. Analytics for brands
7. Mobile app

---

## UI DIRECTION

Don't copy LinkedIn's corporate blue aesthetic. Don't copy Airbnb's rounded-everything softness. You're building for college athletes and young brand marketers. The design should feel:

- Clean and modern but with energy
- Dark mode option (athletes browse at night after practice)
- Bold typography — team names and numbers should feel like jersey fonts
- Green and gold palette ties to athletics without being generic
- Card-based layouts for team profiles (think trading cards)
- Photos prominent everywhere — this is a visual product about real athletes

The team profile card should feel like looking at a sports card: photo, stats, key numbers. Not like reading a resume.

---

*Created: May 21, 2026*

---

# Figma Prototype Plan (applied skill: prototype-plan)

> Defines exactly what to build interactively, what to fake, and how to run the test. Edit the research questions below if they don't match the current goal.

## 0. Research Questions

**Primary (Team side):** Can a Cal Poly club sports officer complete a sponsor-ready profile in under 5 minutes — and do they understand the sponsorship asset menu well enough to differentiate their team (e.g., excluding jerseys, including livestream)?

**Primary (Brand side):** Can a brand marketer go from sign-in to either (a) posting a listing or (b) finding 3 candidate teams via recruiter search in under 60 seconds, and do they trust the verification signal?

**Secondary:**
- Do users notice and read the verification badge?
- Does the match-score nudge brands toward better-fit teams vs follower-count alone?
- Do teams understand "proof of performance" obligations before signing?

**Prototype fidelity:** Mid-functional (real type, real components, placeholder photos, no live data; key states designed)
**Testing method:** Moderated remote (Zoom + Figma share link), 5 teams + 5 brands
**Number of test tasks:** 4 per persona

---

## 1. Prototype Scope

**In scope — fully interactive:**

*Team*
- T1 Signup form (.edu validation visible)
- T2 "Check your email" → tap "I verified" hotspot to advance
- T4 Profile builder (T4a Basics, T4b Social connect *faked success*, T4d Asset menu *full interactivity — checkboxes + per-asset note*, T4g Photos *upload tap → preset image inserted*)
- T5 Profile preview
- T6 Verification status (Verified state only for happy path; Action-needed branch as alt)
- T7 Listings feed (3 seeded brand listings)
- T8 Listing detail drawer
- Apply flow → T9 toast → T11 status board

*Brand*
- B1 Signup + B2 domain verification (faked instant pass)
- B3 Brand profile (Path A entry)
- B4 Dashboard with two paths
- B5 Listing composer (asset selection mirroring team menu)
- B7 Applicants grid with match scores
- B8 Team profile (brand view) → Accept → B12 contract draft
- B9 Recruiter search with filters → B11 outreach composer

*Shared*
- 0.1 Landing → role split
- Verification badge tooltip
- One empty state (filtered listings feed)
- One error state (social fetch failed → manual fallback)

**Out of scope — static / linked stubs:**
- Login / forgot password
- Messaging inbox beyond a single thread preview
- Active deal dashboard (T13/B13)
- Proof upload modal (show as locked CTA)
- Payment screens
- Officer transition
- Mobile breakpoints (desktop only for first round)
- Settings, billing, admin

**Rationale:** Cuts ~40% of mapped screens. Each cut screen either doesn't serve the two primary research questions or duplicates an interaction already covered (e.g., second messaging thread tests nothing new).

---

## 2. Interaction Specification

**I1 — Landing → Team signup**
- Trigger: Tap · Element: `btn/landing-team-cta` · Dest: `T1 Team signup` · Animation: Push left · Timing: 200ms · Reset: No

**I2 — Email field validation (.edu)**
- Trigger: Field blur · Element: `input/email` · Dest: same frame, variant `T1/email-valid` or `T1/email-blocked` · Animation: Smart animate · 150ms · Reset: Yes on edit

**I3 — Submit signup**
- Trigger: Tap `btn/continue` (enabled only when valid variant) · Dest: `T2 Check email` · Push left · 200ms

**I4 — Email verified (faked)**
- Trigger: Tap `link/i-verified-test-shortcut` · Dest: `T4a Basics` · Dissolve · 150ms

**I5 — Step navigation (Basics → Social)**
- Trigger: Tap `btn/next` · Dest: `T4b Social` · Push left · 200ms

**I6 — Connect Instagram (faked OAuth)**
- Trigger: Tap `btn/connect-ig` · Dest: `T4b/connecting` (1s delay) → `T4b/connected` · Smart animate · 1000ms+200ms

**I6-alt — Social fetch failed branch**
- Trigger: Tap `btn/connect-tiktok` · Dest: `T4b/tiktok-error` · Smart animate · 200ms · "Enter manually" link → `T4b/tiktok-manual`

**I7 — Asset menu toggle**
- Trigger: Tap row in `list/asset-menu` · Dest: same frame, smart-animate variants for checked/unchecked + expanded note field · 120ms · Reset: No (persist within session)

**I8 — Add asset note**
- Trigger: Focus `input/asset-note-{id}` · Element expands inline · Smart animate · 150ms

**I9 — Publish profile**
- Trigger: Tap `btn/publish` on `T4g Photos` · Dest: `T5 Preview` · Push up · 250ms

**I10 — Continue to verification**
- Trigger: Tap `btn/looks-good` · Dest: `T6/verified` (happy) — alt prototype link to `T6/action-needed` for branch test · Dissolve · 200ms

**I11 — Open listing detail**
- Trigger: Tap `card/listing-{id}` · Dest: `T8 Listing detail drawer` · Slide left (40% width) · 250ms

**I12 — Apply**
- Trigger: Tap `btn/apply` · Dest: `T8/applied` variant with toast overlay · Smart animate · 200ms · Reset: Yes on flow restart

**I13 — Brand path: Post listing**
- Trigger: Tap `btn/post-listing` on `B4 Dashboard` · Dest: `B5 Composer` · Push left · 200ms

**I14 — Listing composer submit**
- Trigger: Tap `btn/publish-listing` · Dest: `B6 My listings` with new row highlighted · Smart animate · 250ms

**I15 — Open applicants grid**
- Trigger: Tap `row/listing-live` · Dest: `B7 Applicants` · Push left · 200ms

**I16 — Sort by match score**
- Trigger: Tap `chip/sort-match` · Dest: same frame, variant `B7/sorted-match` · Smart animate · 150ms

**I17 — Accept applicant**
- Trigger: Tap `btn/accept` on `B8 Team profile` · Dest: `B12 Contract draft` · Push up · 250ms

**I18 — Brand path: Recruiter search**
- Trigger: Tap `btn/browse-teams` on `B4` · Dest: `B9 Recruiter` · Push left · 200ms

**I19 — Filter application**
- Trigger: Tap filter chip `chip/sport-soccer` · Dest: `B9/filtered` · Smart animate · 150ms

**I20 — Reach out**
- Trigger: Tap `btn/reach-out` on team card · Dest: `B11 Outreach modal` · Slide up · 250ms

**I21 — Verification badge tooltip**
- Trigger: Hover `badge/verified` · Dest: tooltip overlay · Dissolve · 100ms

**I22 — Empty-state fallback**
- Trigger: Apply filter combination with no results · Dest: `T7/empty-filtered` · Smart animate · 150ms · "Save search" CTA → toast

**I23 — Back / cancel (global)**
- Trigger: Tap `btn/back` · Dest: previous frame · Push right · 200ms

**Reset:** Esc or "Restart" button on every frame → `0.1 Landing` (reset variants).

---

## 3. Prototype Flow Diagram

```
[0.1 Landing]
  ├─ Team CTA ──► [T1 Signup]
  │                ├─ valid .edu ──► [T2 Check email]
  │                │                    └─ "I verified" ──► [T4a Basics]
  │                │                                            ──► [T4b Social]
  │                │                                                   ├─ connect ──► [T4b connected]
  │                │                                                   └─ fail ──► [T4b error] ──► [T4b manual]
  │                │                                            ──► [T4d Assets] ──► [T4g Photos] ──► [T5 Preview]
  │                │                                                                                       └─► [T6 Verified] ──► [T7 Feed]
  │                │                                                                                                                ├─ tap card ──► [T8 Detail]
  │                │                                                                                                                │                └─ Apply ──► [T8 Applied + toast] ──► [T11 Status]
  │                │                                                                                                                └─ over-filter ──► [T7 Empty]
  │                └─ non-.edu ──► [T3 Blocked]
  │
  └─ Brand CTA ──► [B1 Signup] ──► [B2 Domain check] ──► [B3 Profile] ──► [B4 Dashboard]
                                                                            ├─ Path A: [B5 Composer] ──► [B6 My listings] ──► [B7 Applicants]
                                                                            │                                                       └─ tap team ──► [B8 Team profile]
                                                                            │                                                                          ├─ Accept ──► [B12 Contract]
                                                                            │                                                                          └─ Decline ──► back to [B7]
                                                                            └─ Path B: [B9 Recruiter] ──► filter ──► [B9 Filtered] ──► [B11 Outreach]
```

---

## 4. Test Task Scripts

### Team persona (Cal Poly club officer)

**Task T-1 — Sign up and start a profile**
Scenario: *"You're the sponsorship coordinator for your club soccer team and a teammate sent you Spontus saying it could help find sponsors. You're sitting down after practice to check it out."*
Observing: Do they notice the .edu requirement? Hesitation on role field? Time to reach the profile builder?
Success when: Lands on `T4a Basics` frame.

**Task T-2 — Build a profile that reflects your team**
Scenario: *"Your team really doesn't want logos on jerseys, but you're open to almost everything else, especially livestream and event banners. Set up your profile to reflect that."*
Observing: Do they find the asset menu? Do they use the note field? Do they uncheck jersey explicitly or just not check it? Do they understand "excluded categories"?
Success when: Profile published, asset menu shows jersey unchecked WITH a note, livestream + banner checked. Reaches `T5 Preview`.

**Task T-3 — Find a sponsor and apply**
Scenario: *"A nutrition brand is looking for soccer teams in California. Find their listing and apply."*
Observing: How do they parse the listings feed? Do they read details before applying? Do they add a note in the apply step?
Success when: Reaches `T8 Applied` variant with toast.

**Task T-4 — Recover from a problem**
Scenario: *"Imagine TikTok wouldn't connect when you were setting up your profile. Walk me through what you'd do."* (Start from a checkpoint with `T4b/tiktok-error` showing.)
Observing: Do they try manual entry? Do they skip it? Do they assume the whole signup is broken?
Success when: Either manual entry submitted OR they articulate they would skip and continue.

### Brand persona (marketing manager at a regional nutrition brand)

**Task B-1 — Sign up and decide an approach**
Scenario: *"You manage marketing for a sports nutrition brand and you have a $5K Q3 budget for college club sports. You just heard about Spontus from a colleague."*
Observing: Do they understand the two paths on `B4`? Which do they pick first and why?
Success when: They commit to either `B5` or `B9`.

**Task B-2 — Post a listing**
Scenario: *"You want to sponsor 3 endurance-sport teams in California for the Fall 2026 season. You can offer product allocation and $300 cash per team. In return, you want social posts and event sampling."*
Observing: Can they translate cash + product into the listing UI? Do they set geographic and sport filters? Do they preview before publishing?
Success when: Listing reaches `B6 My listings` with required fields populated.

**Task B-3 — Review applicants**
Scenario: *"It's a week later, your listing got 6 applicants. Pick the one you'd accept and why."*
Observing: Do they use match score? Do they open team profiles? Do they notice verification badges? Do they look at the asset overlap?
Success when: They reach `B12 Contract draft` having articulated their reasoning.

**Task B-4 — Find a specific team directly**
Scenario: *"Your CMO just said 'I want us on a Cal Poly team's livestream this fall.' Find them without posting a listing."*
Observing: Do they find recruiter mode? Do they filter by university and asset type? Do they reach out vs save?
Success when: `B11 Outreach modal` opened for a Cal Poly team.

---

## 5. Figma Setup Guide

- **Starting frame:** `0.1 Landing` (one canonical entry — research moderator starts every task by tapping "Restart")
- **Device preview:** Desktop 1440 × 900, browser chrome hidden, prototype background `#0B0F0E` (matches dark-mode brand)
- **Prototype settings:** Flow name = "Spontus MVP – User Test v1" · Show prototype URL only · Hotspot hints OFF (we want raw discoverability)
- **Sharing:** "Anyone with the link can view" · Embed kiosk mode for unmoderated fallback
- **Between participants:**
    1. Click prototype "Restart" (resets variants)
    2. Clear any typed input via component reset
    3. Re-load tab if a step variant got stuck
    4. Confirm 0.1 Landing is the active frame
- **Checkpoints:** Build alternate starting frames for tasks T-4, B-3, B-4 so the moderator can jump in mid-flow without making the participant re-do prior steps.

---

## 6. Build vs Fake Table

| Element | Build | Fake | Notes |
|---------|-------|------|-------|
| .edu validation | ✅ | | Core to trust hypothesis |
| Email verification link | | ✅ | "I verified" shortcut button |
| Instagram OAuth | | ✅ | Tap → 1s spinner → preset stats |
| TikTok OAuth failure | ✅ | | Testing recovery |
| Asset menu interactions | ✅ | | This IS the differentiator |
| Per-asset note field | ✅ | | Soccer/jersey insight depends on it |
| Photo upload | | ✅ | Tap → preset image inserted |
| Verification badge tooltip | ✅ | | Trust signal under test |
| Listings feed sorting | | ✅ | Pre-sort the 3 cards once |
| Match score number | | ✅ | Hard-coded per team |
| Apply toast | ✅ | | Confirms applied state |
| Application status board | ✅ | | Closes the team loop |
| Brand domain verification | | ✅ | Instant pass |
| Listing composer | ✅ | | Mirror of asset menu — direct comparison |
| Listing preview modal | ✅ | | Brands wanted to see team-side view |
| Applicants grid sort | ✅ | | Match-score hypothesis |
| Team profile (brand view) | ✅ | | Decision-making screen |
| Contract draft | | ✅ | Static screen, no editing |
| Recruiter search filters | ✅ | | Path B core |
| Saved search / bookmarks | | ✅ | Static button, toast only |
| Outreach composer | ✅ | | Templates visible |
| Messaging inbox | | ✅ | Single static thread preview |
| Active deal dashboard | | ✅ | Locked CTA on contract screen |
| Proof upload | | ✅ | Locked CTA — out of scope this round |
| Payment flow | | ✅ | "Coming soon" banner |
| Empty filtered state | ✅ | | Edge case under test |
| Mobile layouts | | ✅ | Defer to round 2 |

---

## 7. Quality Checks

- [x] Scope limited to two research questions; ~40% of mapped screens cut
- [x] Every interaction (I1–I23) names a destination frame
- [x] All 8 task scripts are scenario-based (no "click X" language)
- [x] Success criteria are specific frame/variant triggers
- [x] Reset process defined (§ 5)
- [x] Build vs Fake table covers every interactive element from the screen map
- [ ] **Action item:** Confirm research questions with founder before locking scope
- [ ] **Action item:** Recruit 5 team officers + 5 brand marketers; pre-screen brand participants for actual sponsorship budget authority
- [ ] **Action item:** Prepare incentive ($25 gift card) and consent form before sessions

---

# Figma Design Brief — Spontus MVP (applied skill: design-brief)

## 1. Brief Header

| | |
|---|---|
| **Feature** | Spontus MVP — two-sided sponsorship marketplace |
| **PM / Founder** | TBD (Spontus founder) |
| **Designer** | TBD |
| **Engineering lead** | TBD |
| **Platform** | Responsive web. Desktop-first for brand side, mobile-first for team side. No native app this round. |
| **Design due** | TBD — recommend 2 weeks from kickoff for v1 ready-to-test prototype |
| **Dev handoff** | TBD — recommend 1 week after user test results land |
| **Source docs** | This page (UX walkthrough + user flow plan + prototype plan), Cal Poly Sponsorship Audit, Product Vision: LinkedIn for Sponsorships |

---

## 2. What We Are Designing and Why

- **The goal:** Help club sports officers land real sponsors without cold emailing, and help brand marketers find verified, real teams that match their activation needs — in minutes, not weeks.
- **Context:** 2M college club athletes across 800+ campuses operate with zero sponsorship infrastructure. Teams cold-email from Gmail; brands have no discovery surface. Competitors (CampusLink, TeamSnap, TapSponsor) miss this segment — they sell event ads, require massive rosters, or are event-centric only. Research with Cal Poly soccer, rugby, and triathlon teams surfaced specific design-shaping insights (soccer hates jersey logos but wants livestream; tri hosts events with 8 distinct sponsor activation types; officer turnover kills relationships).
- **Success looks like:**
    - Team officer publishes a complete, verified profile in **< 5 min** (90th percentile in usability test)
    - Brand marketer either posts a listing or reaches out to a team in **< 60s** from dashboard
    - User test shows ≥4/5 brand participants articulate trust in verification badges without prompting
    - Asset menu shows clear differentiation per team in test outputs (e.g., a participant uncheck-with-note pattern, not blanket selection)

---

## 3. User Flows to Design

### Flow 1 — Team signup → published profile → first application

- **Entry:** Landing `0.1` → "I'm a team" CTA
- **Steps:**
    1. Signup form (.edu validation inline)
    2. Email verification (link or "I verified" shortcut)
    3. Profile builder stepper: Basics → Social → Events → Asset menu → Hosted Events → Looking For → Photos
    4. Profile preview
    5. Verification status (Pending → Verified)
    6. Listings feed
    7. Listing detail → Apply (with optional note)
- **Exit:** Application submitted, status board reflects "Applied"
- **Edge cases:**
    - Non-.edu email → blocked screen + waitlist
    - Social fetch fails → manual entry with "self-reported" flag
    - Profile incomplete on publish → field-level highlight
    - Verification rejected → remediation path
    - Listing closes between view and apply → graceful re-route to similar listings
    - Empty filtered feed → save-search CTA

### Flow 2 — Brand signup → listing creation → applicant review → accept

- **Entry:** Landing `0.1` → "I'm a brand" CTA
- **Steps:**
    1. Signup (work email + website)
    2. Domain verification (auto)
    3. Brand profile (single-page, ~2 min)
    4. Dashboard with two-path picker
    5. Listing composer (asset selection mirroring team menu) → preview → publish
    6. Applicants grid with match scores
    7. Team profile (brand view) → Accept
    8. Contract draft (template-filled)
- **Exit:** Contract draft generated and waiting for both signatures
- **Edge cases:**
    - Domain mismatch → manual review queue
    - Listing with zero applicants after 7 days → boost / share suggestions
    - Excluded brand category overlap → team auto-hidden, brand sees count of suppressed teams
    - Listing edited after applicants apply → diff banner shown to applied teams

### Flow 3 — Brand recruiter mode (direct outreach)

- **Entry:** Brand dashboard → "Browse teams"
- **Steps:**
    1. Filter (sport, university, state, roster, followers, asset offered)
    2. Open team profile
    3. Save or "Reach out"
    4. Outreach composer (templates + personalization tokens)
- **Exit:** Message sent → thread in inbox
- **Edge cases:** Brand category excluded by team → "This team doesn't accept your category" inline message before send.

### Flow 4 — Messaging (lightweight)

- **Entry:** Inbox or "Message" CTA on profile
- **Steps:** Open thread → send → reply
- **Exit:** Continued conversation; from thread, either side can escalate to "Send contract"
- **Edge cases:** Unverified user attempts to message → upgrade-to-verify prompt; message to declined applicant → labeled "Closed loop, re-open?"

### Flow 5 — Verification (cross-cutting)

- **Entry:** Profile published OR brand profile saved
- **Steps:** Auto-checks (email/website parity, IG existence) → staff review (first 100) → badge
- **Exit:** Verified badge applied; brand/team filter respects it
- **Edge cases:** Pending state must still allow browsing but block apply/post.

---

## 4. Screens Required

| Screen | New / Update | Notes |
|--------|-------------|-------|
| 0.1 Landing | New | Two-path, real team cards, social-proof counter |
| 0.2 Role picker confirm | New | Modal — prevents wrong-side signup |
| 0.3 Login | New | Magic-link primary |
| T1 Team signup | New | Inline .edu validation |
| T2 Check email | New | Resend + "I verified" |
| T3 Non-.edu blocked | New | Waitlist capture |
| T4a Basics | New | Auto-fills from signup |
| T4b Social & Reach | New | OAuth + manual fallback variant |
| T4c Competition & Events | New | Add-row pattern |
| T4d Asset menu | New | Checkboxes + per-asset notes — **core differentiator** |
| T4e Hosted Events | New | Skippable; expanded activation menu |
| T4f Looking For | New | Include exclusion categories |
| T4g Photos | New | Min 1 photo to publish |
| T5 Profile preview | New | "This is what brands see" framing |
| T6 Verification status | New | Pending / Verified / Action-needed |
| T7 Listings feed | New | Card grid + empty / filtered-empty states |
| T8 Listing detail drawer | New | Apply CTA + optional note |
| T9 Application submitted toast | New | Smart-animate variant on T8 |
| T10 Inbox | New | Threads grouped by counterpart |
| T11 Application status board | New | Columns: Applied · In conversation · Accepted · Declined |
| T12 Contract review | New | Inline comments + sign |
| T13 Active deal dashboard | New (Phase 2 stub) | Locked CTA for MVP |
| B1 Brand signup | New | Work email + website |
| B2 Domain verification | New | Auto + pending state |
| B3 Brand profile | New | Single-page |
| B4 Brand dashboard | New | Two-path picker |
| B5 Listing composer | New | Mirrors team asset taxonomy |
| B5-preview Listing preview | New | Shows team-side rendering |
| B6 My listings | New | States: Draft · Live · Paused · Closed |
| B7 Applicants grid | New | Match-score sort + compare drawer |
| B8 Team profile (brand view) | New | Accept · Decline · Message |
| B9 Recruiter search | New | Filters + saved searches |
| B10 Saved teams | New | Notes column |
| B11 Outreach composer | New | Templates |
| B12 Contract draft (brand) | New | Same pattern as T12 |
| B13 Active deals dashboard | New (Phase 2 stub) | Locked for MVP |
| Cross — skeletons, empty, error, permission, stale-data states | New | One pattern per type, reused |

---

## 5. Components Needed

| Component | In library? | Action |
|-----------|------------|--------|
| Button (primary/secondary/destructive/ghost) | No | Create — accent color drives primary |
| Input (text/email/number/textarea) | No | Create with validation variants (default/focus/valid/error/disabled) |
| Stepper / progress indicator | No | Create — used in T4 builder |
| Card — Team profile (trading-card aesthetic) | No | Create — load-bearing brand moment |
| Card — Brand listing | No | Create |
| Card — Applicant (team in brand context) | No | Extend Team card, add match-score chip |
| Verified badge | No | Create — two sizes (sm inline, lg on profile), tooltip on hover |
| Match-score chip | No | Create — color-graded |
| Asset chip (sponsorship asset tag) | No | Create — variants for offered/required/matched |
| Checkbox row with inline note expander | No | Create — used in asset menu and listing composer (shared) |
| Filter chip / chip-group | No | Create |
| Empty state | No | Create — illustration slot + CTA |
| Toast | No | Create — success / info / warning |
| Modal / Drawer | No | Create both — drawer for listing detail (40% width) |
| Avatar / team-photo frame | No | Create — square trading-card style, not LinkedIn circle |
| Stat block (label + big number) | No | Create — jersey-number typography |
| Tooltip | No | Create |
| Inline social-account card | No | Create — connected / connecting / failed / manual variants |
| File-uploader (photos) | No | Create |
| Auto-complete dropdown (university) | No | Create |
| Application status column (kanban) | No | Create — reused on T11 |
| Skeleton loader | No | Create — per card type |
| Lock/coming-soon CTA | No | Create — used on T13/B13/payments |

---

## 6. Constraints and Requirements

### Must haves

- Two-path landing — single primary action per side, no third CTA above the fold
- .edu email enforcement on team side, work-email domain match on brand side
- Sponsorship asset menu identical taxonomy across team profile and brand listing — components must be shared
- Verified badge visible on every card surface (feed, applicants grid, profile, search results)
- Per-asset note field on team side — surfaces in brand view alongside the asset chip
- Dark mode parity — every screen designed for both modes; tokens not hard-coded
- Officer transition assumption: profile belongs to the team entity, not the user — design must not surface "owner" as a single-name attribution; show "team account, current officer: [name]" pattern
- Empty / loading / error states for every list and detail screen
- "Spots remaining" + "Teams applied" visible on every brand listing card
- Hosted-events block is structurally distinct from regular events (research insight — tri's MTS)

### Must avoid

- Generic LinkedIn corporate blue
- Airbnb-style rounded-everything softness
- Gradients, drop shadows, glassmorphism, decorative effects
- Three+ CTAs on landing page
- "Connect 5 socials to continue" gating — every social is optional
- Free-text everywhere — use chips/taxonomy so brand search works
- Treating small teams (20-person rosters) as second-class — no minimum to publish
- Surfacing per-individual ownership in a way that breaks when officers graduate

### Accessibility

- Target WCAG 2.2 AA
- Color contrast ≥ 4.5:1 for text, 3:1 for large text and UI components — verify accent green and accent on dark
- Verification badge: never color-only — must include icon + label on screen-reader
- Touch targets ≥ 44×44px on mobile
- Keyboard navigable: stepper (T4) must support Tab/Shift+Tab and Esc to exit
- All form inputs labeled (no placeholder-as-label)
- Status announced via aria-live for verification state changes and async social fetches
- Asset menu (T4d) must be keyboard-operable; note expander reachable without mouse
- Respect `prefers-reduced-motion` for the smart-animate transitions in the prototype

### Visual direction (locked from brief)

- Flat, no gradients/shadows/effects
- Dark charcoal or navy base; bright green or electric blue accent; two-weight sans-serif (400/500); jersey-number stat typography
- Card-based layouts; team cards lean trading-card not LinkedIn-profile
- References to study: Linear (typography/spacing), Wellfound (two-path landing), Faire (browse cards), Contra (profiles), Stripe (calm complex flows)

### Platform constraints

- Desktop-first design for brand surfaces (B4, B5, B7, B9)
- Mobile-first for team surfaces (T1–T9, T11)
- Both sides must function on the opposite device — design responsive breakpoints at 1440 / 1024 / 768 / 375

---

## 7. Open Questions

- [ ] **Locked accent: green or electric blue?** — Owner: Founder. Needed before token system locks (Day 2).
- [ ] **Brand profile pause/draft state — do we need it for MVP?** Recommend listings-only. — Owner: Founder.
- [ ] **Decline reason: canned options vs free text?** Recommend ≤4 canned options, optional. — Owner: Founder + Designer.
- [ ] **Match-score formula — what factors and weights?** Designer needs at least the inputs (asset overlap %, geography match, social reach band, category match) to design the chip. — Owner: Founder/Eng.
- [ ] **Officer transition surface — for MVP do we show a banner, or rely purely on "team owns profile" semantics?** — Owner: Founder.
- [ ] **Messaging — threaded or simple list?** Recommend simple list, no nesting, no read receipts MVP. — Owner: Designer.
- [ ] **Listing edit semantics — re-notify applied teams?** Recommend yes, with diff banner. — Owner: PM.
- [ ] **University autocomplete data source** — IPEDS list or hand-curated? — Owner: Eng.
- [ ] **Social auto-pull provider and rate-limit behavior** — affects how often we show "stale data" UI. — Owner: Eng.
- [ ] **Are exclusion categories shown publicly on team profile, or used only as a filter behind the scenes?** Recommend behind the scenes — Owner: Founder.

---

## Quality Checks

- [x] Goal is outcome-focused (officer publishes profile under 5 min; brand acts under 60s)
- [x] All flows include edge cases (5 flows, edge cases enumerated per flow)
- [x] Components table identifies create vs reuse — every component marked Create with shared-component notes
- [x] Constraints include accessibility (WCAG 2.2 AA, touch targets, keyboard nav, reduced motion, ARIA for async states)
- [x] Open questions have owners (10 questions, each assigned)

---

# Figma Prototype Spec — Spontus

Create a high-fidelity Figma prototype for Spontus, a two-sided sponsorship marketplace for college club sports.

Do not create another strategy document or written plan. Start designing actual screens.

## Product one-liner

Spontus is LinkedIn for sponsorships — brands post sponsorship opportunities, verified college club sports teams apply, and both sides manage sponsorship fit, deliverables, and proof.

## Design direction

Clean, modern, premium, and athletic. Use a dark charcoal/navy base with a bright green accent. Avoid generic SaaS gradients. The product should feel like Linear + Wellfound + Faire + sports trading cards. Use generous spacing, simple typography, strong cards, clear stats, and one obvious primary action per screen.

## Primary users

1. **College club sports team leaders**: presidents, sponsorship coordinators, treasurers, PR managers. They are 19–22, mostly mobile-first, not highly technical, and need profile creation to feel fast and low-friction.
2. **Brand marketing managers and sponsorship coordinators**. They are 25–40, mostly desktop-first, and need to evaluate teams quickly using verified data.

## Core product principles

- Every team profile belongs to the team, not one officer, so sponsor history survives graduation.
- Small teams should feel welcome, not filtered out.
- Brands need standardized team data so they can compare teams side by side.
- The sponsorship asset menu is the core differentiator.
- Different teams offer different assets: rugby may offer jersey logos, soccer may offer livestream/highlight placement, triathlon may offer hosted event booths and packet stuffing.
- Keep messaging simple. Do not design a complex chat platform. Basic marketplace messaging is enough.

## Screens (in order)

### 1. Landing page

Dark mode default. Top nav with Spontus logo, "For Teams," "For Brands," and "Sign in." Hero headline: "The sponsorship marketplace for college club sports." Subtitle: "Brands post opportunities. Verified teams apply. No cold emails. No guesswork." Two CTA buttons: "I'm a team" as primary and "I'm a brand" as secondary.

Below hero, show a 2x2 grid of real-looking team cards:
- **Cal Poly Men's Soccer**: 50 athletes, 100K+ highlight views, assets: livestream ads, highlight logo placement, social posts.
- **Cal Poly Triathlon**: 80+ athletes, hosted race, assets: jersey logos, event booths, packet stuffing, podium prizes.
- **Cal Poly Men's Rugby**: 45 athletes, assets: jersey logos, banners, social posts.
- **Cal Poly Club Swim**: 40 athletes, 20 past product sponsors, assets: social posts, event photos, nationals exposure.

Below cards, show "How it works" in 3 steps: Brands post, Teams apply, Deals happen.

### 2. Team signup

Single clean form. Fields: full name, .edu email, university autocomplete, club sport name, role on team dropdown. Roles: president, sponsorship coordinator, treasurer, PR manager, other. One primary button: "Create team profile." Make it feel like it takes under 30 seconds.

### 3. Team profile builder

The most important team-side screen. Multi-section layout with a left sidebar progress checklist and main form area. Show profile completeness percentage.

Sections: Basics, Social & reach, Competition & events, Sponsorship asset menu, Hosted events, What we're looking for, Photos & media.

The Sponsorship Asset Menu section should be visually prominent. Use toggles or checkboxes grouped by category:

**Brand visibility:** Jersey logo, Warm-up gear logo, Banner at games/events, Website logo, Newsletter mention

**Social/content:** Instagram post, Instagram story, TikTok/Reel, Highlight video logo, Livestream ad placement

**Product/event activation:** Product sampling, Brand booth, On-course product placement, Athlete packet stuffing, Podium prize sponsorship, Packet pickup hosting, Custom activation

For each selected asset, allow the team to add notes like "preferred," "available for hosted events only," or "not available during league games."

### 4. Published team profile

Design like a polished athletic profile card/page. Hero area with team photo, sport, university, verified badge, roster size, follower count, location, season, and primary assets.

Sections: About the team, Audience & reach, Competition schedule, Sponsorship assets, Hosted events, Past sponsors, Photos/media.

Primary CTA for brands: "Contact team" or "Invite to listing."

### 5. Brand signup

Single clean form. Fields: company name, your name, role, work email, company website, industry category. One primary button: "Create brand profile."

### 6. Brand profile

Show company logo, verified badge, description, website, Instagram/social handles, industry category, target audience, geographic focus, typical sponsorship types, and past sponsorships. Keep it professional and brand-manager friendly.

### 7. Brand listing creation

Core brand-side workflow. Form fields: Listing title; What you're offering (cash, free product, discount codes, group account access, gift cards, event prizes, on-site services, packet products); What you want in return (same sponsorship asset menu as teams); Number of teams wanted; Geography; Sport preferences; Team size minimum; Social reach minimum; Duration; Application deadline; Listing status (draft, active, paused, closed).

Use draft/paused states only for listings, not brand profiles.

### 8. Team browse listings

A feed of active brand sponsorship listings. Filters: sport, geography, offer type, required assets, duration, deadline. Listing cards should show brand logo, verified badge, what they offer, what they want, location, spots remaining, deadline, and match score. Primary CTA: "Apply."

### 9. Team apply flow

Simple application modal. Show the team's profile preview, matched assets, and one optional short note. Button: "Send application." Make it feel lightweight, not like a college application.

### 10. Brand review applications

Dashboard for a brand listing. Show applicant team cards in a grid or table. Each card should show team photo, verified badge, sport, university, roster size, followers/views, offered assets, and match score. Actions: Accept, Message, Decline. Decline uses optional canned reasons only:
- Looking for a different sport
- Need larger team size
- Filled all spots
- Not the right fit this season
- Other

No free-text decline message.

### 11. Basic messaging

Simple marketplace thread between a brand and a team. No complex Slack/WhatsApp clone. Show participants, listing context, message history, and a simple input. Include a right-side deal summary panel with offer, requested deliverables, and status.

### 12. Deal/proof screen

After a match is accepted, show a simple deal checklist:
- [ ] Product/cash sent
- [ ] Deliverables agreed
- [ ] Social posts uploaded
- [ ] Photos uploaded
- [ ] Proof submitted
- [ ] Brand reviewed

This screen should make sponsorships feel more professional than cold email.

## Notes

Use real sample data from Cal Poly teams. Prioritize the team profile builder, brand listing creation, team browse/apply, and brand review applications — these are the core MVP screens.

> One honest warning: don't let Figma Make turn this into a massive enterprise dashboard. The product should feel simple enough for a club president to finish after practice and credible enough for a brand manager to trust during work. That tension is the whole design challenge.
