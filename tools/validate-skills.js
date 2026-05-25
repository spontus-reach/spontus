const fs = require("node:fs");
const { formatSummary, validateSkills } = require("./lib/skill-inventory");

function main() {
  const root = process.argv[2] || ".agents/skills";
  const result = validateSkills(root);
  const summary = formatSummary(result);

  if (process.env.GITHUB_STEP_SUMMARY) {
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary);
  } else {
    process.stdout.write(summary);
  }

  if (!result.ok) {
    process.stderr.write(`${result.failures.join("\n")}\n`);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  formatSummary,
  validateSkills,
};
