const assert = require("node:assert/strict");
const test = require("node:test");

const { analyzeDecisionLog } = require("./lib/decision-log");
const { inferIssueLabels } = require("./lib/issue-labels");

test("triage labels sponsor leads for sponsor-side GTM follow-up", () => {
  const labels = inferIssueLabels({
    title: "sponsor: Fluid Nutrition",
    body: "### Sponsor or brand name\nFluid\n\n### Pipeline stage\nLead identified",
  });

  assert.deepEqual(
    ["gtm", "lead", "needs-triage", "sponsor", "sponsor-side"].every((label) =>
      labels.includes(label),
    ),
    true,
  );
});

test("triage labels team interview issues as team-side research", () => {
  const labels = inferIssueLabels({
    title: "interview: Cal Poly Triathlon",
    body: "### Team or organization\nCal Poly Triathlon",
  });

  assert.equal(labels.includes("research"), true);
  assert.equal(labels.includes("team-side"), true);
});

test("triage detects decision-heavy research issues", () => {
  const labels = inferIssueLabels({
    title: "research: pricing model",
    body: "Need to decide pricing and take rate alternatives.",
  });

  assert.equal(labels.includes("decision"), true);
  assert.equal(labels.includes("revenue"), true);
});

test("decision log does not apply without decision label", () => {
  const result = analyzeDecisionLog({
    body: "No decision here.",
    labels: ["research"],
  });

  assert.equal(result.applies, false);
  assert.equal(result.complete, true);
});

test("decision log reports missing sections for decision issues", () => {
  const result = analyzeDecisionLog({
    body: "We need to choose a pricing model.",
    labels: ["decision"],
    comments: [],
  });

  assert.equal(result.applies, true);
  assert.equal(result.complete, false);
  assert.deepEqual(result.labelsToAdd, ["needs-decision-log"]);
  assert.equal(result.needsComment, true);
  assert.deepEqual(result.missing, [
    "Decision",
    "Why",
    "Alternatives rejected",
    "Notion page updated?",
  ]);
});

test("decision log passes when required sections exist in comments", () => {
  const result = analyzeDecisionLog({
    body: "Pricing decision issue.",
    labels: ["decision", "needs-decision-log"],
    comments: [
      {
        body: `## Decision
Use sponsor listing fees first.

## Why
It matches near-term sponsor intent.

## Alternatives rejected
Take rate only.

## Notion page updated?
Yes.`,
      },
    ],
  });

  assert.equal(result.complete, true);
  assert.deepEqual(result.labelsToRemove, ["needs-decision-log"]);
});
