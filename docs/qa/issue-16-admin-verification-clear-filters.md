# Issue 16 Admin Verification Clear Filters QA

**Status:** Reference
**Owner:** Engineering
**Date:** 2026-05-30
**Issue:** [spontus-reach/spontus#16](https://github.com/spontus-reach/spontus/issues/16)
**Route:** `/admin/verification`

## Environment

- Worktree: `C:\Users\brian\Documents\GitHub\spontus\.worktrees\admin-verification-clear-filters`
- Branch: `fix/admin-verification-clear-filters`
- Server: `npm run dev -- --port 3106`
- Browser: Microsoft Edge via Playwright, headless, desktop viewport `1280x900`
- URL: `http://localhost:3106/admin/verification`

## Manual Verification

| Step | Filters exercised | Expected result | Observed result |
| --- | --- | --- | --- |
| Open admin queue | Type `all`, Status `all`, Search empty | Queue starts from the broad all-status view. | Status control showed `all`; visible results included verified, submitted for verification, and needs changes teams/sponsors. |
| Filter to submitted | Status `submitted_for_verification` | Only submitted teams/sponsors are shown. | Cal Poly Men's Soccer and SLO Roasters were visible; verified Cal Poly Triathlon was hidden. |
| Clear submitted filter | Click `Clear filters` | Status resets to `all`; verified, submitted, and needs changes entities are visible again. | Status returned to `all`; Cal Poly Triathlon, Cal Poly Club Swim, and SLO Roasters were visible. |
| Search after reset | Search `soccer` | Search still narrows the all-status queue. | Cal Poly Men's Soccer was visible; Cal Poly Triathlon was hidden. |
| Verify suspended team visibility | Suspended Cal Poly Men's Soccer from the review panel, then clicked `Clear filters` | A suspended team remains findable after clearing filters. | Status returned to `all`; Cal Poly Men's Soccer appeared with `Suspended` alongside other statuses. |
| Side and search filters after reset | Type `sponsor`, Search `nutrition` | Sponsor-side search still works after reset. | Fluid Nutrition and Gnarly Nutrition were visible; team results were hidden. |
| Verify suspended sponsor visibility | Type `sponsor`, Search `running`, suspended On Running from the review panel, then clicked `Clear filters` | A suspended sponsor remains findable after clearing filters. | Status returned to `all`; On Running appeared with `Suspended` alongside Fluid Nutrition, SLO Roasters, and Central Coast PT. |

## Result

Pass. Clear filters resets the admin verification queue to the broad all-status view, and status, side, and search filters continue to work after reset.

## Rebase Validation

**Date:** 2026-06-02
**Base:** `origin/main` at `3736a394`

After rebasing `fix/admin-verification-clear-filters` onto the latest `origin/main`, the focused verification-filter test coverage still passes and confirms:

- The default filter state uses status `all`.
- Verified, submitted for verification, needs changes, and suspended entities remain included in the broad queue.
- Status, marketplace-side, and search filters continue to narrow the queue after reset.

Interactive browser QA was not rerun during this rebase validation because browser automation was unavailable in the session. The original manual QA pass above remains the recorded route-level browser verification for this issue.
