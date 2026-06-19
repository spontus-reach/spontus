const fs = require("node:fs");
const { analyzeStaleWork } = require("./lib/stale-work-review");

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function main() {
  const [, , prsFile, issuesFile] = process.argv;
  const prs = readJson(prsFile);
  const issues = readJson(issuesFile);
  process.stdout.write(JSON.stringify(analyzeStaleWork({ prs, issues }), null, 2));
}

if (require.main === module) {
  main();
}

module.exports = {
  main,
};
