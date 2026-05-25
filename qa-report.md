# Spontus MVP QA Report

## Date
May 24, 2026

## Environment
- Local URL: `http://localhost:3000`
- Branch: `feat/slice-4-sponsor-review`
- Browser: Playwright MCP browser, desktop viewport `1440x1000`
- Test method: Playwright MCP browser automation plus static checks

## Summary
- Passed: Landing/nav, team signup, sponsor signup, profile pages, listing feed gating, application board grouping, sponsor applicant review, admin decisions, sponsor verification gating, direct route safety, lint, TypeScript substitute check, and build.
- Failed: Active team verification gating is bypassed on a listing where the active team already has an application.
- Blockers: Team gating after admin status change is not correct for the already-applied active team/listing demo path.
- Non-blocking visual/issues: Listing feed count includes an unverified sponsor listing, declined application detail does not display the selected canned reason, sponsor listing preview still shows stale "Team application flow coming in Slice 3" copy, `npm run typecheck` script is missing, and known `<img>` lint warnings remain.

## Route Results

| Route | Result | Notes |
| --- | --- | --- |
| `/` | Pass | Landing page loads, headline visible, team and sponsor CTAs navigate correctly. |
| `/signup/team` | Pass | Form loads, non-`.edu` email rejected, valid `.edu` submit goes to `/team/onboarding`. |
| `/team/onboarding` | Pass | Verified `cp-tri` state visible, asset menu toggles, preview and browse links work. |
| `/teams/cal-poly-triathlon` | Pass | Public profile loads with verification, stats, assets, reach, sponsors, and events. |
| `/team/listings` | Pass with note | Verified sponsor listing appears and SLO Roasters is hidden, but header count says `2 open listings matched` while only one card is visible. |
| `/team/listings/lst-fluid-fall` | Fail after gating change | Normal submitted state works, but after changing `cp-tri` to needs changes it still shows `Application submitted` instead of a verification block. |
| `/team/applications` | Pass | Status columns render and sponsor accept reflects in board during client-side navigation. |
| `/signup/sponsor` | Pass | Form loads, role/category dropdowns work, submit goes to `/sponsor/onboarding`. |
| `/sponsor/onboarding` | Pass | Active sponsor status renders and does not downgrade when verified; needs-changes state also renders when admin changes status. |
| `/sponsor/listings/new` | Pass | Composer loads; offer and requested asset selections work; publish navigates to listing preview. |
| `/sponsor/listings/lst-fluid-fall` | Pass with note | Listing preview renders with Back to profile and View applicants. Stale disabled Apply copy remains. |
| `/sponsor/listings/lst-fluid-fall/applicants` | Pass | Applicant cards, search filter, review links, quick action modals, sponsor gating all work. |
| `/sponsor/applications/app-seed-fluid-tri` | Pass | Detail loads; accept modal updates status; team board reflects accepted via client-side navigation. |
| `/sponsor/applications/app-seed-fluid-rugby` | Pass with note | Decline requires canned reason and updates status, but selected reason is not displayed after decline. |
| `/admin/verification` | Pass | Internal warning, stats, filters, queue, detail panel, checklist, notes, and decisions work. |
| `/team/listings/lst-does-not-exist` | Pass | Graceful 404 page; browser logs expected 404 resource error. |
| `/sponsor/listings/lst-does-not-exist` | Pass with note | Graceful 404 page; dev console also logged a Next performance `measure` TypeError. |
| `/sponsor/listings/lst-does-not-exist/applicants` | Pass | Graceful access/not-found message. |
| `/sponsor/applications/app-does-not-exist` | Pass | Graceful `Application not found.` message. |
| `/teams/not-a-real-team` | Pass | Graceful 404 page; browser logs expected 404 resource error. |

## Flow Results

| Flow | Result | Notes |
| --- | --- | --- |
| 1. Landing and navigation | Pass | Main nav links work. `My Applications` appears in team context, not on the landing page. |
| 2. Team signup | Pass | Invalid non-`.edu` email shows validation and valid form submits. |
| 3. Team onboarding/profile builder | Pass | Verified state remains verified; asset toggle works; preview and browse links work. |
| 4. Public team profile | Pass | Profile is sponsor-readable and complete enough for demo. |
| 5. Team listings feed | Pass with note | Sponsor verification gating works; count is misleading. Filters and empty states work. |
| 6. Team listing detail + apply | Pass with limitation | Seed application correctly prevents duplicate apply. Could not create a new application for `cp-tri -> lst-fluid-fall` because it is already seeded. |
| 7. Team application board | Pass | Applications are grouped and client-side sponsor decisions reflect in the board. |
| 8. Sponsor signup | Pass | Required fields and dropdowns work; submit reaches onboarding. |
| 9. Sponsor onboarding/profile | Pass | Verified and needs-changes sponsor states render correctly. |
| 10. Sponsor listing creation | Pass | Composer interactions work and publish reaches preview. |
| 11. Sponsor listing preview/detail | Pass with note | Listing renders and View applicants works; stale disabled Apply copy is confusing. |
| 12. Sponsor applicants grid | Pass | Cards show team, sport, reach, verification status, fit notes, overlap, and actions. Search filter works. |
| 13. Sponsor applicant detail + decision | Pass with note | Accept and decline update state; decline reason is selected but not shown afterward. |
| 14. Admin verification dashboard | Pass | Stats, filters, queue, detail panel, checklist, and notes render. |
| 15. Admin verification decisions | Pass | Verify note optional; needs changes and suspend require notes; stats update immediately. |
| 16. Verification gating after admin change | Fail for team, pass for sponsor | Sponsor gating blocks applicant review. Team gating does not override existing application state on detail page. |
| 17. Direct route and 404-ish checks | Pass with note | No app crash; expected 404s render. One dev console TypeError appeared on invalid sponsor listing route. |
| 18. Build and static checks | Pass with note | `npm run lint`, `npx tsc --noEmit`, and `npm run build` pass. `npm run typecheck` is missing. |

## Bugs Found
### Blockers
- Active team verification gating is bypassed when an existing application exists. After changing `cp-tri` to `needs_changes`, `/team/listings/lst-fluid-fall` still shows `Application submitted` instead of a blocking message such as "Your profile needs changes before you can apply." Artifact: `qa-artifacts/team-gating-existing-application.png`.

### Non-blocking
- Declined application detail does not display the selected canned decline reason after decline. Artifact: `qa-artifacts/decline-reason-missing.png`.
- `/team/listings` header says `2 open listings matched to your team`, but only the verified Fluid Nutrition listing is shown after sponsor gating.
- Sponsor listing preview shows stale disabled copy: `Team application flow coming in Slice 3`.
- `npm run typecheck` is missing from `package.json`; `npx tsc --noEmit` passed as a QA substitute.
- Invalid sponsor listing 404 produced a dev console TypeError: `Performance: 'ListingPreviewPage' cannot have a negative time stamp.`

### Visual polish later
- Existing ESLint warnings for `<img>` usage remain in `verification-queue-card.tsx`, `applicant-card.tsx`, and `team-profile-preview.tsx`.
- No major desktop usability or layout issues found during the pass.

## Screenshots / Artifacts
- `qa-artifacts/team-gating-existing-application.png`
- `qa-artifacts/decline-reason-missing.png`
- `qa-artifacts/browser-console-errors.log`

## Recommendation
- Ready for Netlify deploy: no.
- Required fixes before deploy: Fix team verification gating on listing detail so admin status changes are respected even when an existing application exists.
- Optional polish after deploy: Show declined reason on application detail, fix listing feed count to use gated/visible listings, remove stale Slice 3 preview copy, add an `npm run typecheck` script, and decide whether to replace remaining `<img>` tags with `next/image`.
