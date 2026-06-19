const path = require("node:path");
const {
  collectWorkflowFiles,
  formatWorkflowLintResults,
  lintWorkflowFiles,
} = require("./lib/workflow-lint");
const { lintWorkflowSecurity } = require("./lib/workflow-security");

function main() {
  const root = path.resolve(__dirname, "..");
  const files = collectWorkflowFiles(root);
  const results = lintWorkflowFiles(files, lintWorkflowSecurity);
  const output = formatWorkflowLintResults(results);

  process.stdout.write(output);

  if (results.length > 0) {
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  main,
};
