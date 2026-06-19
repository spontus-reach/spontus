const QUALITY_ISSUE_TITLE = "Weekly codebase quality review";

function statusIcon(status) {
  return status === 0 ? "PASS" : "FAIL";
}

function formatQualityIssueBody({ runUrl = "", results = [], generatedAt = "" }) {
  const failed = results.filter((result) => result.status !== 0);
  const lines = [
    "## Weekly codebase quality review",
    "",
    `Generated: ${generatedAt || new Date().toISOString()}`,
    runUrl ? `Run: ${runUrl}` : "",
    "",
    "## Check Summary",
    "",
    "| Check | Status |",
    "| --- | --- |",
    ...results.map((result) => `| \`${result.name}\` | ${statusIcon(result.status)} |`),
    "",
    "## Review Notes",
    "",
  ].filter((line) => line !== "");

  if (failed.length === 0) {
    lines.push("All scheduled quality checks passed.");
  } else {
    lines.push(
      ...failed.map(
        (result) =>
          `- \`${result.name}\` failed. Open the workflow run logs for details.`,
      ),
    );
  }

  lines.push("", "_This issue is updated by the Codebase Quality Review workflow._");

  return lines.join("\n");
}

module.exports = {
  QUALITY_ISSUE_TITLE,
  formatQualityIssueBody,
};
