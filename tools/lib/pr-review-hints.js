const REVIEW_MARKER = "<!-- spontus-pr-review-hints -->";

const LABELS = {
  AUTH: "auth",
  DEPENDENCIES: "dependencies",
  DOCS_IMPACT: "docs-impact",
  LARGE_PR: "large-pr",
  NEEDS_REVIEW_FOCUS: "needs-review-focus",
  SCHEMA_IMPACT: "schema-impact",
  SECURITY_REVIEW: "security-review",
  WORKFLOW_RISK: "workflow-risk",
};

function normalizePath(file) {
  return String(file || "").replace(/\\/g, "/");
}

function sectionText(body, heading) {
  const lines = String(body || "").split(/\r?\n/);
  const start = lines.findIndex(
    (line) => line.trim().toLowerCase() === `## ${heading.toLowerCase()}`,
  );

  if (start === -1) {
    return "";
  }

  const rest = lines.slice(start + 1);
  const end = rest.findIndex((line) => /^##\s+/.test(line));
  return (end === -1 ? rest : rest.slice(0, end)).join("\n").trim();
}

function hasVerificationEvidence(body) {
  const verification = sectionText(body, "Verification");
  if (!verification) {
    return false;
  }

  if (/list the checks you ran/i.test(verification)) {
    return false;
  }

  return /(npm run|manual|build|test|lint|typecheck|security:workflows|verified|not needed|n\/a)/i.test(
    verification,
  );
}

function classifyPullRequest({ files = [], body = "", changedFiles } = {}) {
  const labels = new Set();
  const hints = [];
  const normalizedFiles = files.map(normalizePath);
  const fileCount =
    typeof changedFiles === "number" ? changedFiles : normalizedFiles.length;

  if (fileCount >= 25) {
    labels.add(LABELS.LARGE_PR);
    labels.add(LABELS.NEEDS_REVIEW_FOCUS);
    hints.push(
      `Large PR: ${fileCount} files changed. Reviewers should check scope boundaries and consider whether follow-up slices are needed.`,
    );
  }

  if (
    normalizedFiles.some((file) =>
      /^(package\.json|package-lock\.json|npm-shrinkwrap\.json|pnpm-lock\.yaml|yarn\.lock|bun\.lockb|renovate\.json)$/.test(
        file,
      ),
    )
  ) {
    labels.add(LABELS.DEPENDENCIES);
    labels.add(LABELS.NEEDS_REVIEW_FOCUS);
    hints.push(
      "Dependency changes detected. Review lockfile changes, runtime scope, and dependency-review output.",
    );
  }

  if (normalizedFiles.some((file) => file.startsWith(".github/"))) {
    labels.add(LABELS.WORKFLOW_RISK);
    labels.add(LABELS.SECURITY_REVIEW);
    labels.add(LABELS.NEEDS_REVIEW_FOCUS);
    hints.push(
      "GitHub automation changed. Review token permissions, trigger type, action pinning, and PR metadata handling.",
    );
  }

  if (
    normalizedFiles.some((file) =>
      /^(SECURITY\.md|\.gitleaks\.toml|\.env\.example|next\.config\.ts)$/.test(
        file,
      ),
    )
  ) {
    labels.add(LABELS.SECURITY_REVIEW);
    labels.add(LABELS.NEEDS_REVIEW_FOCUS);
    hints.push(
      "Security-sensitive configuration changed. Confirm secret handling, runtime exposure, and deployment impact.",
    );
  }

  if (
    normalizedFiles.some(
      (file) =>
        file.startsWith("src/lib/supabase") ||
        file.startsWith("src/lib/auth") ||
        file.startsWith("src/app/api/"),
    )
  ) {
    labels.add(LABELS.AUTH);
    labels.add(LABELS.SECURITY_REVIEW);
    labels.add(LABELS.NEEDS_REVIEW_FOCUS);
    hints.push(
      "Auth or backend access code changed. Review authorization boundaries and server/client data exposure.",
    );
  }

  if (
    normalizedFiles.some(
      (file) =>
        file.startsWith("supabase/") ||
        file.endsWith("schema.sql") ||
        file.includes("/schema/") ||
        file.includes("/migrations/"),
    )
  ) {
    labels.add(LABELS.SCHEMA_IMPACT);
    labels.add(LABELS.NEEDS_REVIEW_FOCUS);
    hints.push(
      "Schema-impacting changes detected. Review migration order, RLS/access rules, and compatibility with mock data.",
    );
  }

  if (normalizedFiles.some((file) => file.endsWith(".md") || file.startsWith("docs/"))) {
    labels.add(LABELS.DOCS_IMPACT);
    hints.push(
      "Documentation changed. Check whether product terminology, decision logs, and implementation docs stay aligned.",
    );
  }

  if (!hasVerificationEvidence(body)) {
    labels.add(LABELS.NEEDS_REVIEW_FOCUS);
    hints.push(
      "Verification evidence is missing or still placeholder text. Ask for exact checks run or why none were needed.",
    );
  }

  return {
    hints,
    labels: [...labels].sort(),
  };
}

function formatReviewHintsComment({ hints = [], labels = [] } = {}) {
  const lines = [
    REVIEW_MARKER,
    "## Advisory PR review hints",
    "",
  ];

  if (hints.length === 0) {
    lines.push("No extra review focus areas detected.");
  } else {
    lines.push(...hints.map((hint) => `- ${hint}`));
  }

  lines.push("", `Labels: ${labels.length ? labels.map((label) => `\`${label}\``).join(", ") : "none"}`);
  lines.push("", "_Advisory only: this comment does not block merge._");

  return lines.join("\n");
}

module.exports = {
  LABELS,
  REVIEW_MARKER,
  classifyPullRequest,
  formatReviewHintsComment,
  hasVerificationEvidence,
};
