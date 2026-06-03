const assert = require("node:assert/strict");
const test = require("node:test");

const {
  classifyPullRequest,
  hasVerificationEvidence,
} = require("./lib/pr-review-hints");
const { formatQualityIssueBody } = require("./lib/codebase-quality-report");
const { analyzeStaleWork } = require("./lib/stale-work-review");

test("PR hints label dependency changes", () => {
  const result = classifyPullRequest({
    files: ["package.json", "package-lock.json"],
    body: "## Verification\nnpm run test",
  });

  assert.equal(result.labels.includes("dependencies"), true);
});

test("PR hints label workflow risk for GitHub automation", () => {
  const result = classifyPullRequest({
    files: [".github/workflows/ci.yml"],
    body: "## Verification\nnpm run security:workflows",
  });

  assert.equal(result.labels.includes("workflow-risk"), true);
  assert.equal(result.labels.includes("security-review"), true);
});

test("PR hints label schema-impacting changes", () => {
  const result = classifyPullRequest({
    files: ["supabase/schema.sql"],
    body: "## Verification\nnpm run typecheck",
  });

  assert.equal(result.labels.includes("schema-impact"), true);
});

test("PR hints label large pull requests", () => {
  const result = classifyPullRequest({
    changedFiles: 25,
    files: ["src/app/page.tsx"],
    body: "## Verification\nnpm run build",
  });

  assert.equal(result.labels.includes("large-pr"), true);
});

test("PR hints label docs impact", () => {
  const result = classifyPullRequest({
    files: ["docs/engineering/deployment.md"],
    body: "## Verification\nManual review",
  });

  assert.equal(result.labels.includes("docs-impact"), true);
});

test("PR hints detect missing verification evidence", () => {
  assert.equal(hasVerificationEvidence("## Verification\nnpm run test"), true);
  assert.equal(hasVerificationEvidence("## Verification\nList the checks you ran"), false);
});

test("quality issue body summarizes passing and failing checks", () => {
  const body = formatQualityIssueBody({
    generatedAt: "2026-06-03T00:00:00.000Z",
    runUrl: "https://github.com/example/actions/runs/1",
    results: [
      { name: "npm run lint", status: 0 },
      { name: "npm run build", status: 1 },
    ],
  });

  assert.match(body, /npm run lint/);
  assert.match(body, /FAIL/);
});

test("stale work review finds old PRs and needs-triage issues", () => {
  const result = analyzeStaleWork({
    now: new Date("2026-06-20T00:00:00Z"),
    prs: [
      {
        number: 1,
        title: "Old PR",
        updatedAt: "2026-06-01T00:00:00Z",
        isDraft: false,
      },
    ],
    issues: [
      {
        number: 2,
        title: "Old issue",
        updatedAt: "2026-06-01T00:00:00Z",
        labels: [{ name: "needs-triage" }],
      },
    ],
  });

  assert.deepEqual(
    result.items.map((item) => item.number),
    [1, 2],
  );
});
