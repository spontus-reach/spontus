const fs = require("node:fs");

const LABELS = {
  BUG: "bug",
  COMPETITOR: "competitor",
  DECISION: "decision",
  GTM: "gtm",
  LEAD: "lead",
  NEEDS_TRIAGE: "needs-triage",
  PRODUCT: "product",
  RESEARCH: "research",
  REVENUE: "revenue",
  SPONSOR: "sponsor",
  SPONSOR_SIDE: "sponsor-side",
  TEAM_SIDE: "team-side",
};

function includesAny(text, terms) {
  return terms.some((term) => text.includes(term));
}

function inferIssueLabels({ title = "", body = "", existingLabels = [] }) {
  const labels = new Set(existingLabels);
  const text = `${title}\n${body}`.toLowerCase();

  labels.add(LABELS.NEEDS_TRIAGE);

  if (
    title.toLowerCase().startsWith("sponsor:") ||
    text.includes("sponsor or brand name")
  ) {
    labels.add(LABELS.SPONSOR);
    labels.add(LABELS.SPONSOR_SIDE);
    labels.add(LABELS.LEAD);
    labels.add(LABELS.GTM);
  }

  if (
    title.toLowerCase().startsWith("interview:") ||
    text.includes("team or organization")
  ) {
    labels.add(LABELS.TEAM_SIDE);
    labels.add(LABELS.RESEARCH);
  }

  if (
    title.toLowerCase().startsWith("research:") ||
    text.includes("research area")
  ) {
    labels.add(LABELS.RESEARCH);
  }

  if (
    title.toLowerCase().startsWith("feat:") ||
    text.includes("proposed solution")
  ) {
    labels.add(LABELS.PRODUCT);
  }

  if (
    title.toLowerCase().startsWith("fix:") ||
    text.includes("actual behavior")
  ) {
    labels.add(LABELS.BUG);
  }

  if (
    includesAny(text, [
      "competitive landscape",
      "competitor",
      "campuslink",
      "teamsnap",
    ])
  ) {
    labels.add(LABELS.COMPETITOR);
  }

  if (includesAny(text, ["go-to-market", "gtm", "outreach", "pipeline"])) {
    labels.add(LABELS.GTM);
  }

  if (includesAny(text, ["pricing", "revenue", "take rate", "subscription"])) {
    labels.add(LABELS.REVENUE);
  }

  if (
    includesAny(text, ["decision", "decide", "choose", "alternatives rejected"])
  ) {
    labels.add(LABELS.DECISION);
  }

  return [...labels].sort();
}

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
