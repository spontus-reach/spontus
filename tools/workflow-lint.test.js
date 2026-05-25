const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");

const {
  collectWorkflowFiles,
  formatWorkflowLintResults,
  lintWorkflowFiles,
} = require("./lib/workflow-lint");

test("collectWorkflowFiles returns sorted workflow YAML files", (t) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "spontus-workflows-"));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));

  const workflows = path.join(root, ".github", "workflows");
  fs.mkdirSync(workflows, { recursive: true });
  fs.writeFileSync(path.join(workflows, "b.yaml"), "name: B\n");
  fs.writeFileSync(path.join(workflows, "a.yml"), "name: A\n");
  fs.writeFileSync(path.join(workflows, "notes.md"), "# Notes\n");

  assert.deepEqual(collectWorkflowFiles(root), [
    path.join(workflows, "a.yml"),
    path.join(workflows, "b.yaml"),
  ]);
});

test("lintWorkflowFiles runs the provided linter for each workflow file", (t) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "spontus-workflows-"));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const files = [path.join(root, "a.yml"), path.join(root, "b.yml")];
  fs.writeFileSync(files[0], "name: A\n");
  fs.writeFileSync(files[1], "name: B\n");

  const result = lintWorkflowFiles(files, (content, file) => [
    {
      file,
      line: 1,
      column: content.length,
      message: "invalid workflow",
      kind: "syntax-check",
    },
  ]);

  assert.deepEqual(
    result.map((issue) => issue.file),
    files,
  );
});

test("formatWorkflowLintResults produces actionable output", () => {
  assert.equal(formatWorkflowLintResults([]), "Workflow lint passed.\n");
  assert.equal(
    formatWorkflowLintResults([
      {
        file: ".github/workflows/ci.yml",
        line: 3,
        column: 5,
        message: "unexpected key",
        kind: "syntax-check",
      },
    ]),
    ".github/workflows/ci.yml:3:5: [syntax-check] unexpected key\n",
  );
});
