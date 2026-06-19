const fs = require("node:fs");
const {
  classifyPullRequest,
  formatReviewHintsComment,
} = require("./lib/pr-review-hints");

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function readLines(file) {
  return fs
    .readFileSync(file, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function main() {
  const [, , prFile, filesFile] = process.argv;
  const pr = readJson(prFile);
  const files = readLines(filesFile);
  const result = classifyPullRequest({
    body: pr.body || "",
    changedFiles: pr.changedFiles,
    files,
  });

  process.stdout.write(
    JSON.stringify(
      {
        ...result,
        comment: formatReviewHintsComment(result),
      },
      null,
      2,
    ),
  );
}

if (require.main === module) {
  main();
}

module.exports = {
  main,
};
