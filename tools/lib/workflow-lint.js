const fs = require("node:fs");
const path = require("node:path");

/**
 * Collect all workflow YAML files from a repository root.
 * Returns sorted absolute paths to .yml and .yaml files in .github/workflows/.
 */
function collectWorkflowFiles(root) {
  const workflowDir = path.join(root, ".github", "workflows");

  if (!fs.existsSync(workflowDir)) {
    return [];
  }

  return fs
    .readdirSync(workflowDir)
    .filter((file) => /\.ya?ml$/.test(file))
    .sort()
    .map((file) => path.join(workflowDir, file));
}

/**
 * Run a linter function against each workflow file.
 * The linter receives (fileContent, filePath) and returns an array of issues.
 * Returns a flat array of all issues across all files.
 */
function lintWorkflowFiles(files, linter) {
  const issues = [];

  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    const fileIssues = linter(content, file);
    issues.push(...fileIssues);
  }

  return issues;
}

/**
 * Format lint results into a human-readable string.
 * Each issue is formatted as: file:line:column: [kind] message
 * Returns "Workflow lint passed.\n" when there are no issues.
 */
function formatWorkflowLintResults(results) {
  if (results.length === 0) {
    return "Workflow lint passed.\n";
  }

  return results
    .map(
      (issue) =>
        `${issue.file}:${issue.line}:${issue.column}: [${issue.kind}] ${issue.message}`,
    )
    .join("\n")
    .concat("\n");
}

module.exports = {
  collectWorkflowFiles,
  formatWorkflowLintResults,
  lintWorkflowFiles,
};
