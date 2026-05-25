# Code Review: Docs + GitHub Retooling

**Reviewed:** PR #9 ([feat/github-security-tooling](https://github.com/spontus-reach/spontus/pull/9)) and uncommitted WIP on `refactor/team-profile-domain-modules` (`tools/lib/*`, `automation-modules.test.js`, `workflow-lint.test.js`).

**Date:** 2026-05-24

---

## Summary

CI on PR #9 is green; local `npm test` fails because of untracked WIP.

| Scope | Status |
|-------|--------|
| **PR #9** (committed GitHub security + docs) | **Approve with changes** — resolve Dependabot/Renovate overlap, restore contributor secret-scanning docs, clarify dependency-review scope vs PR description |
| **Uncommitted tools WIP** | **Not merge-ready** — fix missing `workflow-lint` module before committing; update CI path filters; dedupe tests |

---

## Critical

### 1. Dependabot + Renovate will duplicate dependency PRs

Both tools are configured for the same ecosystems on the same schedule:

- `.github/dependabot.yml` — weekly npm + github-actions
- `renovate.json` — weekly npm + github-actions (Monday grouping)

PR #9 notes say they "coexist" but don't prevent overlap. Expect duplicate/conflicting update PRs, label noise, and reviewer fatigue.

**Recommendation:** Pick one primary updater. Either disable overlapping ecosystems in Dependabot, or remove/disable Renovate for npm/actions.

---

### 2. Uncommitted `workflow-lint.test.js` breaks `npm test`

`tools/workflow-lint.test.js` imports `./lib/workflow-lint`, which does not exist. Result:

```
Error: Cannot find module './lib/workflow-lint'
```

`.github/workflows/skills.yml` runs `npm test` on PRs touching skills/tools — this WIP would fail CI once committed. Either add `tools/lib/workflow-lint.js` or drop/rename the test until the module exists.

---

## High

### 3. `SECURITY.md` drops contributor-facing secret-scanning guidance

The rewrite is good for **external vulnerability disclosure**, but it **fully replaces** operational docs that were in the old file:

- Gitleaks CI workflow reference
- Local pre-push check: `gitleaks git --config .gitleaks.toml --redact .`
- GitHub push protection enablement steps

`.github/workflows/secrets.yml` still runs Gitleaks; contributors no longer have documented local workflow.

**Recommendation:** Add a "Secret scanning (contributors)" section rather than replacing that content entirely.

---

### 4. `fail-on-severity: low` does not match PR #9's stated intent

PR body says "all vulnerability severities cause the check to fail." Config is:

```yaml
fail-on-severity: low
fail-on-scopes:
  - runtime
  - unknown
```

`fail-on-scopes` limits failures to **runtime** and **unknown** scope only. Low-severity issues in **development** dependencies may not fail the check. If the goal is strict gating, document the scope limitation or expand scopes intentionally.

Lowering from `high` → `low` will also increase PR friction on transitive low CVEs — reasonable for pre-launch hardening, but worth acknowledging for MVP velocity.

---

### 5. Committed SLA promises in `SECURITY.md` without operational backing

Response timelines (3 / 5 / 10 business days) are public commitments with no linked on-call, alerting, or issue routing. Fine for launch optics; risky if unstaffed. Consider softening language or adding a maintainer contact / security@ email.

---

## Medium

### 6. Branch mixes unrelated work

`refactor/team-profile-domain-modules` includes:

- GitHub security tooling commits (`07640335`, `b89b1591`)
- Four team profile refactor commits

These should land as separate PRs (#9 is already scoped correctly to `main`). Mixing makes review and rollback harder.

---

### 7. Automation refactor WIP is incomplete

Uncommitted changes extract logic into `tools/lib/` — good direction — but:

| Gap | Detail |
|-----|--------|
| Missing module | `workflow-lint.js` referenced but not created |
| Duplicate tests | `automation-modules.test.js` partially overlaps `issue-automation.test.js` with weaker assertions |
| Stale CI path filters | `skills.yml` watches `tools/validate-skills.js` but not `tools/lib/**` |
| Unused script | WIP adds `lint:workflows` + npm `actionlint`, but `.github/workflows/actionlint.yml` uses Docker — two ways to lint, neither wired to the npm script in CI |

Thin CLI wrappers re-exporting lib modules preserve workflow compatibility — that part looks correct.

---

### 8. Dependabot config gaps

`.github/dependabot.yml` has no:

- `open-pull-requests-limit` (Renovate has `prConcurrentLimit: 5`)
- Labels / reviewers / assignees (Renovate adds `dependencies`)
- Major-version grouping strategy (minors grouped; majors will be individual PRs — OK, but noisy alongside Renovate)

---

## Low

### 9. PR #9 body typo

`\fail-on-severity` (stray backslash)

### 10. `SECURITY.md` uses emoji in tables

Passes markdownlint; fine unless you want stricter doc style.

### 11. Absolute Security Advisories URL fix (`b89b1591`)

Correct fix for lychee; link check passes on PR #9.

---

## What Looks Good

- **Dependabot v2 YAML** is valid; weekly grouped minor/patch updates is sensible
- **`SECURITY.md` disclosure policy** is complete (reporting, timeline, supported versions, disclosure rules)
- **Absolute URL** for Security Advisories fixes Documentation CI link checking
- **PR #9 metadata** passes `Validate metadata` (`## Summary` + `## Verification`)
- **Lib extraction** (`decision-log`, `issue-labels`, `skill-inventory`) is a clean refactor; existing workflows keep working via thin CLI entrypoints
- **Existing automation tests** (`issue-automation.test.js`, `validate-skills.test.js`) still pass after lib extraction

---

## Suggested Pre-Merge Checklist

1. Decide Dependabot **or** Renovate for npm/actions — disable the other
2. Merge Gitleaks contributor docs back into `SECURITY.md`
3. Align dependency-review config/docs with actual `fail-on-scopes` behavior
4. Finish or drop `workflow-lint` WIP; ensure `npm test` passes clean
5. Update `skills.yml` paths to include `tools/lib/**`
6. Land PR #9 to `main` separately from team profile refactors
