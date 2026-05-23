const fs = require("node:fs");

const REQUIRED_SECTIONS = [
  {
    key: "decision",
    label: "Decision",
    pattern: /(^|\n)#+\s*decision\b|(^|\n)decision\s*:/i,
  },
  { key: "why", label: "Why", pattern: /(^|\n)#+\s*why\b|(^|\n)why\s*:/i },
  {
    key: "alternatives",
    label: "Alternatives rejected",
    pattern:
      /(^|\n)#+\s*alternatives rejected\b|(^|\n)alternatives rejected\s*:/i,
  },
  {
    key: "notion",
    label: "Notion page updated?",
    pattern:
      /(^|\n)#+\s*notion page updated\??\b|(^|\n)notion page updated\??\s*:/i,
  },
];

const BOT_MARKER = "<!-- spontus-decision-log -->";

function analyzeDecisionLog({ body = "", comments = [], labels = [] }) {
  const labelNames = labels.map((label) => label.name || label);
  const hasDecisionLabel = labelNames.includes("decision");

  if (!hasDecisionLabel) {
    return {
      applies: false,
      complete: true,
      missing: [],
      needsComment: false,
      labelsToAdd: [],
      labelsToRemove: [],
    };
  }

  const searchable = [
    body,
    ...comments.map((comment) => comment.body || ""),
  ].join("\n\n");
  const missing = REQUIRED_SECTIONS.filter(
    (section) => !section.pattern.test(searchable),
  ).map((section) => section.label);
  const hasPriorComment = comments.some((comment) =>
    (comment.body || "").includes(BOT_MARKER),
  );
  const complete = missing.length === 0;

  return {
    applies: true,
    complete,
    missing,
    needsComment: !complete && !hasPriorComment,
    labelsToAdd: complete ? [] : ["needs-decision-log"],
    labelsToRemove: complete ? ["needs-decision-log"] : [],
  };
}

function formatDecisionLogComment(missing) {
  return `${BOT_MARKER}
This issue is labeled \`decision\`, so it needs a decision log before it is closed or treated as settled.

Please add a comment or update the issue body with:

## Decision

## Why

## Alternatives rejected

## Notion page updated?

Missing right now: ${missing.join(", ")}`;
}

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
