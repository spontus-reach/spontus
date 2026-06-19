const fs = require("node:fs");
const { formatQualityIssueBody } = require("./lib/codebase-quality-report");

function main() {
  const [, , resultsFile] = process.argv;
  const report = JSON.parse(fs.readFileSync(resultsFile, "utf8"));
  process.stdout.write(formatQualityIssueBody(report));
}

if (require.main === module) {
  main();
}

module.exports = {
  main,
};
