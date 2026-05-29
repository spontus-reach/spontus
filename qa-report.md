# Spontus MVP QA Report

## Date
May 28, 2026

## Environment
- Local URL: `http://localhost:3000` (`npm run dev`)
- Branch: `main` (`3c297fb`, synced with `origin/main`)
- QA branch: `chore/qa-full-pass-main-20260528` (report + artifacts only)
- Browser: Playwright MCP, desktop viewport `1440x1000`
- Test method: Playwright MCP browser automation plus static checks
- Supabase: **not configured locally** (no `.env.local`; only `.env.example` present)

## Summary
- **Passed:** Landing/nav, most route loads, team/sponsor onboarding surfaces, public team profiles, listings feed (verified-sponsor gating + count), listing detail UI, admin verification dashboard shell, 404 handling, lint, typecheck, and production build (after `npm install`).
- **Failed / blocked:** Application and sponsor-review flows that depend on `ApplicationsProvider` → Supabase. Without env vars, applications never load, applicant pages are empty, and seeded application URLs return “Application not found.”
- **Blockers for local demo / deploy:** `ApplicationsProvider` calls `supabase.from(...)` when the client is `null`, logging `Cannot read properties of null (reading 'from')` and leaving applications empty. Demo requires either Supabase env + seeded DB or a mock fallback when Supabase is unavailable.
- **Not re-verified this pass:** Team verification gating vs. existing application (prior demo blocker). No seeded/existing application exists without Supabase, so that regression scenario could not be exercised end-to-end.

## Static checks

| Check | Result | Notes |
| --- | --- | --- |
| `npm run lint` | Pass | No errors reported |
| `npm run typecheck` | Pass | After `npm install` (includes `@supabase/supabase-js`) |
| `npm run build` | Pass | After `npm install` |
| `npm ci` (clean) | Not run | Prior QA used `npm install` when `node_modules` was stale |

**Note:** First attempt on this machine failed typecheck/build until `npm install` was run (missing `@supabase/supabase-js`). CI with install step should be fine.

## Route results

| Route | Result | Notes |
| --- | --- | --- |
| `/` | Pass | Headline, CTAs, featured team, active teams grid load |
| `/signup/team` | Pass with note | Form renders; full submit flow not completed (disabled submit until all fields valid). Email validation covered by unit tests in repo |
| `/team/onboarding` | Pass | Active team (`cp-tri`) shows **Verified** |
| `/teams/cal-poly-triathlon` | Pass | Public profile loads |
| `/teams/cal-poly-mens-rugby` | Pass | Public profile loads |
| `/team/listings` | Pass | Header shows **1 open listing** (matches visible card; prior count mismatch appears fixed) |
| `/team/listings/lst-fluid-fall` | Pass with note | Detail loads; shows **Apply to this listing** (no existing app without Supabase) |
| `/team/applications` | Fail | All columns empty — no applications loaded |
| `/signup/sponsor` | Pass | Form loads |
| `/sponsor/onboarding` | Pass | Active sponsor shows **Verified** |
| `/sponsor/listings/new` | Pass | Listing composer loads |
| `/sponsor/listings/lst-fluid-fall` | Pass | Preview loads; stale “Slice 3” copy **not** present |
| `/sponsor/listings/lst-fluid-fall/applicants` | Fail | **0 applications** — “No teams have applied yet” |
| `/sponsor/applications/app-seed-fluid-tri` | Fail | **Application not found** (seed IDs not in client state) |
| `/sponsor/applications/app-seed-fluid-rugby` | Not run | Blocked by empty applications state |
| `/admin/verification` | Pass with note | Stats, filters, queue, Review buttons work for submitted entities. **Clear filters** resets status to `submitted_for_verification`, not “all” — verified teams (e.g. Cal Poly Triathlon) hidden until status filter set to `all` or search used |
| `/team/listings/lst-does-not-exist` | Pass | Next.js 404 |
| `/sponsor/listings/lst-does-not-exist` | Pass | Next.js 404 |
| `/teams/not-a-real-team` | Pass | Next.js 404 |
| `/sponsor/applications/app-does-not-exist` | Pass | Graceful “Application not found.” |

## Flow results

| Flow | Result | Notes |
| --- | --- | --- |
| 1. Landing and navigation | Pass | Nav links work; Browse Listings, Admin present |
| 2. Team signup | Partial | Form UI OK; automated full submit not completed |
| 3. Team onboarding / profile builder | Pass | Verified badge; provider-driven status |
| 4. Public team profile | Pass | Multiple slugs checked |
| 5. Team listings feed | Pass | Verified-sponsor gating; count matches visible listings |
| 6. Team listing detail + apply | Fail | Apply button visible but applications layer broken without Supabase; modal submit not validated |
| 7. Team application board | Fail | Empty — no data |
| 8. Sponsor signup | Pass | Form loads |
| 9. Sponsor onboarding | Pass | Verified sponsor state |
| 10. Sponsor listing creation | Pass | Composer route loads |
| 11. Sponsor listing preview | Pass | Back to profile / View applicants links present |
| 12. Sponsor applicants grid | Fail | Zero applicants |
| 13. Sponsor applicant detail + accept/decline | Fail | Seeded application URLs not found |
| 14. Admin verification dashboard | Pass | Queue, stats, detail panel pattern intact |
| 15. Admin verification decisions | Partial | Review flow works for visible queue items; full gating regression on `cp-tri` not completed (verified team hidden under default/cleared filters) |
| 16. Verification gating (team listing detail) | Not verified | Prior fix remains in code (`teamStatus` before `existingApp`), but scenario needs existing application + admin status change — requires Supabase or mock fallback |
| 17. Direct route / 404 checks | Pass | No app crash |
| 18. Build and static checks | Pass | After dependency install |

## Bugs found

### Blockers
1. **Applications require Supabase; no local fallback**  
   - **Symptom:** Console error `Failed to fetch applications: Cannot read properties of null (reading 'from')` on every page using `ApplicationsProvider`.  
   - **Impact:** `/team/applications` empty; sponsor applicants empty; `/sponsor/applications/app-seed-*` not found; apply/create/accept/decline flows non-functional in local demo without `.env.local`.  
   - **Artifact:** `qa-artifacts/supabase-missing-applications.png`, `qa-artifacts/browser-console-errors-20260528.log`  
   - **Suggested fix:** Guard `supabase` null → seed from `MOCK_SEED_APPLICATIONS` (or skip fetch and use in-memory mock) until backend is configured.

### Non-blocking
1. **Admin “Clear filters” does not show all entities** — resets to `status: submitted_for_verification`, so verified teams/sponsors disappear from queue until status is set to `all` manually.  
2. **Team signup automated E2E** — submit button stays disabled until all fields valid; manual QA still recommended for happy path.  
3. **Apply modal** — not fully exercised in this pass (depends on working applications layer).

### Fixed since May 24, 2026 report
- Listings feed header count vs. visible cards (now **1** / **1**).  
- Stale “Slice 3” copy on sponsor listing preview (removed).  
- `npm run typecheck` script present in `package.json`.  
- Team verification gating order in `listing-detail.tsx` (code present; E2E not re-run without applications).

## Screenshots / artifacts
- `qa-artifacts/supabase-missing-applications.png` — empty applicant grid + console issue context  
- `qa-artifacts/browser-console-errors-20260528.log` — Supabase null client errors  
- `qa-artifacts/team-gating-existing-application.png` — prior run (May 24 blocker; kept for history)  
- `qa-artifacts/decline-reason-missing.png` — prior run (not re-tested; blocked by empty applications)  
- `qa-artifacts/admin-snapshot.md` — admin queue snapshot (Playwright accessibility export)

## Recommendation
- **Ready for Netlify deploy:** **No** — not until applications work in the target environment (Supabase env vars + seeded `applications` table) **or** code falls back to mock data when Supabase is unset.  
- **Required before demo:** Configure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`, run `supabase/schema.sql` + `insert_mock_data.sql`, **or** restore in-memory mock applications for offline demo.  
- **Optional polish:** Fix admin “Clear filters” to reset status to `all`; re-run gating regression once applications load; show decline reason on applicant detail (prior non-blocker).

## QA branch
Full pass run on `chore/qa-full-pass-main-20260528`. Use this branch for any follow-up fixes found during QA without touching `main` until reviewed.
