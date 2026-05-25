const fs = require("node:fs");
const { inferIssueLabels } = require("./lib/issue-labels");

function main() {
  const issue = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
  const labels = inferIssueLabels({
    title: issue.title,
    body: issue.body,
    existingLabels: issue.labels?.map((label) => label.name || label) || [],
  });

  process.stdout.write(`${labels.join(",")}\n`);
}

if (require.main === module) {
  main();
}

module.exports = {
  inferIssueLabels,
};
