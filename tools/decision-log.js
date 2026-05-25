const fs = require("node:fs");
const {
  BOT_MARKER,
  analyzeDecisionLog,
  formatDecisionLogComment,
} = require("./lib/decision-log");

function main() {
  const issue = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
  const result = analyzeDecisionLog(issue);
  process.stdout.write(
    JSON.stringify(
      {
        ...result,
        comment: result.needsComment
          ? formatDecisionLogComment(result.missing)
          : "",
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
  BOT_MARKER,
  analyzeDecisionLog,
  formatDecisionLogComment,
};
