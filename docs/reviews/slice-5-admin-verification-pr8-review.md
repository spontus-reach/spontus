# Code Review: PR #8 — Manual Verification Workflow

**PR:** [spontus-reach/spontus#8](https://github.com/spontus-reach/spontus/pull/8)  
**Branch:** `feat/slice-5-admin-verification` → `feat/slice-4-sponsor-review`  
**Author:** joshnaim1  
**Scope:** Slice 5 (+ stacked Slices 2–4, docs, QA artifacts) — 65 files, +5,905 / −29  
**Date:** 2026-05-24

---

## Summary

PR #8 delivers Slice 5 (admin verification dashboard, `VerificationProvider`, marketplace gating) on top of the full MVP stack. The architecture is sound for a mock MVP demo.

**Verdict:** **Approve with changes** — merge conflict with base branch must be resolved first; several QA findings needed fixes before deploy.

**CI status at review:** Only `Apply labels` ran. PR marked **CONFLICTING** with base. Local `npm run build`, `npm run lint`, and `npm run typecheck` pass after fixes.

---

## Critical

### 1. Merge conflict with base branch

PR base is `feat/slice-4-sponsor-review`, status **CONFLICTING**. Must rebase/merge before GitHub runs full CI (build, docs, dependency review).

---

### 2. QA blocker: team gating vs existing application — **fixed in PR #8**

`qa-report.md` (run on Slice 4) reported that admin downgrade to `needs_changes` still showed "Application submitted." Current `listing-detail.tsx` checks team verification **before** `existingApp` — blocker appears resolved. Re-verify manually after merge.

---

## High

### 3. Listing feed count mismatch — **fixed**

Header used `getOpenListings().length` (2) while feed hid unverified sponsors (1 visible). Count now uses verified-only listings in `ListingsFeed`.

### 4. Decline reason not surfaced — **fixed**

`declineReason` stored but not shown on sponsor detail or team application board. Added `getDeclineReasonLabel()` and display in `applicant-detail.tsx` and `application-card.tsx`.

### 5. Dual data sources (provider vs static mock-data) — **partially fixed**

| Component | Before | After |
|-----------|--------|-------|
| `listing-card.tsx` | static `getSponsorById` | `useVerification()` |
| `applicants-grid.tsx` | static `getTeamById` | `useVerification()` |
| Public `/teams/[slug]` | static `MOCK_TEAMS` | unchanged (acceptable for MVP) |

Admin sponsor status changes now reflect in listing cards and applicant filters in-session.

### 6. Sponsor applicant detail route bypass — **fixed**

`/sponsor/applications/[id]` lacked sponsor ownership/verification gate. Added checks in `ApplicantDetail`; converted page to server component with `await params`.

### 7. Client pages using `use(params)` — **fixed**

`sponsor/applications/[id]/page.tsx` and `sponsor/listings/[id]/applicants/page.tsx` converted to server pages where appropriate; sponsor verification gate moved to client `ApplicantsGrid`.

### 8. Application create race + false success — **fixed**

Restored functional `setState` duplicate guard + `useRef` return pattern in `ApplicationsProvider`. `ApplicationModal` now handles failed create with error UI; `handleApply` returns boolean.

---

## Medium

### 9. No auth on `/admin/verification`

Public route with "Internal demo" label only. Acceptable for mock MVP; must not ship as production admin without auth/RLS.

### 10. Gating is client-side only

`VerificationProvider` state resets on refresh. Documented on admin page — OK for demo.

### 11. `createApplication` has no provider-level verification guard

UI gates apply flow; provider still accepts calls without verification checks. `handleApply` now guards `teamStatus === "verified"` and `sponsorVerified` before calling provider.

### 12. Application lifecycle skips `under_review`

Sponsor accept/decline goes `submitted` → terminal. Domain model includes `under_review` but it's never set by sponsor actions. Document as MVP simplification.

### 13. PR scope mixes slices 2–5 + docs

Single PR contains entire MVP stack + Netlify docs + QA artifacts. Hard to review/revert incrementally. Consider splitting before merge to `main`.

### 14. Onboarding edits not synced to VerificationProvider

Team/sponsor onboarding edits stay in local draft state; only `submitForVerification` updates provider. Profile changes from admin decisions reflect; user edits during onboarding do not persist to shared state until submit.

---

## Low

### 15. Missing `npm run typecheck` — **fixed**

Added `"typecheck": "tsc --noEmit"` to `package.json`.

### 16. Stale Slice 3 preview copy — **fixed**

Updated sponsor listing preview helper text.

### 17. `<img>` lint warnings (3 files)

`verification-queue-card.tsx`, `applicant-card.tsx`, `team-profile-preview.tsx` — warnings only, not errors.

### 18. No automated tests for verification workflow

Zero tests for `VerificationProvider`, admin decisions, or gating. Existing lib tests pass.

### 19. Geography eligibility substring hack

`geoLower.includes("national")` matches "Nationwide" accidentally. Fine for demo.

---

## Slice 5 "Done When" Assessment

| Criterion | Status |
|-----------|--------|
| Internal view of submitted team/sponsor profiles | Yes — admin dashboard with filters |
| Verification decisions: Verified, Needs changes, Suspended | Yes — with required notes |
| Only verified teams/sponsors in public MVP flow | **Partial** — listings/applicants gated; public team pages use static mock |
| Manual verification without founder for every action | Yes — admin UI self-service in demo |

---

## Fixes Applied During Review (local, not yet on remote PR)

1. Verified-only listing count in feed header
2. Decline reason display (sponsor detail + team board)
3. Server pages for sponsor application routes
4. Sponsor access/verification gates on applicant detail
5. `useVerification()` in listing cards and applicants grid
6. Application create race + modal error handling
7. `getDeclineReasonLabel()` helper + `typecheck` script
8. Stale listing preview copy update

---

## Recommended Pre-Merge Checklist

1. Resolve merge conflict with `feat/slice-4-sponsor-review`
2. Rebase entire stack onto `main` in order (Slices 2 → 3 → 4 → 5)
3. Re-run QA scenarios from `qa-report.md` on this branch
4. Push review fixes to PR branch
5. Confirm full CI (build, lint, docs, gitleaks) passes after conflict resolution
6. Split or squash commits before merge to `main` if possible

---

## What Looks Good

- **`VerificationProvider`** cleanly centralizes team/sponsor status + review notes
- **Admin dashboard** is usable: stats, filters, checklist, decision modal with note requirements
- **Gating chain** on listing detail: sponsor verified → team status → listing open → existing app
- **Provider nesting** order (`VerificationProvider` > `ApplicationsProvider`) enables cross-route updates
- **Seed data** covers varied verification statuses for demo
- **QA report + artifacts** document manual test coverage thoroughly
