const assert = require("node:assert/strict");
const test = require("node:test");

const { lintWorkflowSecurity } = require("./lib/workflow-security");

test("passes a least-privilege workflow", () => {
  const issues = lintWorkflowSecurity(`name: CI

on:
  pull_request:

permissions:
  contents: read

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - run: npm test
`);

  assert.deepEqual(issues, []);
});

test("allows tagged trusted first-party actions", () => {
  const issues = lintWorkflowSecurity(`name: Trusted

on:
  pull_request:

permissions:
  contents: read

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: github/codeql-action/init@v4
`);

  assert.deepEqual(issues, []);
});

test("flags missing explicit permissions", () => {
  const issues = lintWorkflowSecurity(`name: CI

on:
  pull_request:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
`);

  assert.equal(issues.some((issue) => issue.kind === "permissions"), true);
});

test("flags broad permissions", () => {
  const issues = lintWorkflowSecurity(`name: CI

on:
  pull_request:

permissions: write-all

jobs:
  build:
    runs-on: ubuntu-latest
`);

  assert.equal(issues.some((issue) => issue.message.includes("write-all")), true);
});

test("flags unsafe pull_request_target checkout", () => {
  const issues = lintWorkflowSecurity(`name: Risky

on:
  pull_request_target:

permissions:
  contents: read
  issues: write

jobs:
  risky:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
`);

  assert.equal(
    issues.some((issue) => issue.kind === "pull-request-target"),
    true,
  );
});

test("allows pull_request_target checkout of the trusted base commit", () => {
  const issues = lintWorkflowSecurity(`name: Metadata

on:
  pull_request_target:

permissions:
  contents: read
  issues: write
  pull-requests: read

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
        with:
          ref: \${{ github.event.pull_request.base.sha }}
      - run: node tools/pr-review-hints.js pr.json changed-files.txt
`);

  assert.deepEqual(issues, []);
});

test("allows pull_request_target metadata-only advisory workflow", () => {
  const issues = lintWorkflowSecurity(`name: Advisory

on:
  pull_request_target:

permissions:
  contents: read
  issues: write
  pull-requests: read

jobs:
  advisory:
    runs-on: ubuntu-latest
    steps:
      - run: |
          gh api --paginate "repos/\${GH_REPO}/pulls/\${PR_NUMBER}/files"
`);

  assert.deepEqual(issues, []);
});

test("flags direct pull request metadata interpolation", () => {
  const issues = lintWorkflowSecurity(`name: Risky

on:
  pull_request:

permissions:
  contents: read

jobs:
  risky:
    runs-on: ubuntu-latest
    steps:
      - run: echo "\${{ github.event.pull_request.title }}"
`);

  assert.equal(issues.some((issue) => issue.kind === "pr-metadata"), true);
});

test("flags floating action refs", () => {
  const issues = lintWorkflowSecurity(`name: Risky

on:
  pull_request:

permissions:
  contents: read

jobs:
  risky:
    runs-on: ubuntu-latest
    steps:
      - uses: owner/action@main
`);

  assert.equal(issues.some((issue) => issue.kind === "action-ref"), true);
});

test("flags tagged third-party actions", () => {
  const issues = lintWorkflowSecurity(`name: Risky

on:
  pull_request:

permissions:
  contents: read

jobs:
  risky:
    runs-on: ubuntu-latest
    steps:
      - uses: owner/action@v1
`);

  assert.equal(issues.some((issue) => issue.kind === "action-ref"), true);
});

test("allows third-party actions pinned to a full SHA", () => {
  const issues = lintWorkflowSecurity(`name: Pinned

on:
  pull_request:

permissions:
  contents: read

jobs:
  pinned:
    runs-on: ubuntu-latest
    steps:
      - uses: owner/action@0123456789abcdef0123456789abcdef01234567
`);

  assert.deepEqual(issues, []);
});
