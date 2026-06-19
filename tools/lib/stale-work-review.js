const STALE_MARKER = "<!-- spontus-stale-work-review -->";

function daysAgo(days, now = new Date()) {
  const date = new Date(now);
  date.setUTCDate(date.getUTCDate() - days);
  return date;
}

function isOlderThan(dateString, cutoff) {
  return new Date(dateString).getTime() < cutoff.getTime();
}

function labelNames(item) {
  return (item.labels || []).map((label) =>
    typeof label === "string" ? label : label.name,
  );
}

function stalePullRequests(prs = [], now = new Date()) {
  const cutoff = daysAgo(7, now);
  return prs
    .filter((pr) => !pr.isDraft)
    .filter((pr) => isOlderThan(pr.updatedAt, cutoff))
    .map((pr) => ({
      number: pr.number,
      title: pr.title,
      type: "pr",
      comment: formatStaleComment("PR", pr.title),
    }));
}

function staleIssues(issues = [], now = new Date()) {
  const cutoff = daysAgo(14, now);
  return issues
    .filter((issue) => labelNames(issue).includes("needs-triage"))
    .filter((issue) => isOlderThan(issue.updatedAt, cutoff))
    .map((issue) => ({
      number: issue.number,
      title: issue.title,
      type: "issue",
      comment: formatStaleComment("issue", issue.title),
    }));
}

function formatStaleComment(kind, title) {
  return [
    STALE_MARKER,
    `This ${kind} has not had recent activity: **${title}**.`,
    "",
    "Please add the next action, update the owner/status, or close it if it is no longer relevant.",
    "",
    "_Advisory only: this automation does not close work automatically._",
  ].join("\n");
}

function analyzeStaleWork({ prs = [], issues = [], now = new Date() } = {}) {
  return {
    items: [...stalePullRequests(prs, now), ...staleIssues(issues, now)],
  };
}

module.exports = {
  STALE_MARKER,
  analyzeStaleWork,
  daysAgo,
  staleIssues,
  stalePullRequests,
};
