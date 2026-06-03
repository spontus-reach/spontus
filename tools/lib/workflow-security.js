function lineColumn(content, index) {
  const before = content.slice(0, index);
  const lines = before.split(/\r?\n/);
  return {
    line: lines.length,
    column: lines[lines.length - 1].length + 1,
  };
}

function addIssue(issues, content, index, file, kind, message) {
  const location = lineColumn(content, index);
  issues.push({
    file,
    line: location.line,
    column: location.column,
    kind,
    message,
  });
}

function hasExplicitTopLevelPermissions(content) {
  return /^permissions:\s*$/m.test(content);
}

function isTrustedTaggedAction(action) {
  return (
    action.startsWith("actions/") ||
    action === "github/codeql-action/init" ||
    action === "github/codeql-action/analyze"
  );
}

function checksOutPullRequestBaseSha(content) {
  return (
    /uses:\s*actions\/checkout@/m.test(content) &&
    /ref:\s*\$\{\{\s*github\.event\.pull_request\.base\.sha\s*\}\}/m.test(
      content,
    )
  );
}

function lintWorkflowSecurity(content, file = "workflow.yml") {
  const issues = [];

  if (!hasExplicitTopLevelPermissions(content)) {
    addIssue(
      issues,
      content,
      0,
      file,
      "permissions",
      "workflow should declare explicit top-level GITHUB_TOKEN permissions",
    );
  }

  const writeAll = content.match(/^permissions:\s*write-all\s*$/m);
  if (writeAll) {
    addIssue(
      issues,
      content,
      writeAll.index,
      file,
      "permissions",
      "avoid permissions: write-all; declare only the write scopes this workflow needs",
    );
  }

  const readAll = content.match(/^permissions:\s*read-all\s*$/m);
  if (readAll) {
    addIssue(
      issues,
      content,
      readAll.index,
      file,
      "permissions",
      "avoid permissions: read-all; declare explicit read scopes instead",
    );
  }

  const pullRequestTarget = content.match(/^\s*pull_request_target:\s*$/m);
  if (
    pullRequestTarget &&
    /uses:\s*actions\/checkout@/m.test(content) &&
    !checksOutPullRequestBaseSha(content)
  ) {
    addIssue(
      issues,
      content,
      pullRequestTarget.index,
      file,
      "pull-request-target",
      "pull_request_target workflows must not check out PR code",
    );
  }

  if (
    pullRequestTarget &&
    /\brun:\s*(?:\||[^\n]*)/m.test(content) &&
    !checksOutPullRequestBaseSha(content) &&
    !/gh api --paginate "repos\/\$\{GH_REPO\}\/pulls\/\$\{PR_NUMBER\}\/files"/.test(
      content,
    )
  ) {
    addIssue(
      issues,
      content,
      pullRequestTarget.index,
      file,
      "pull-request-target",
      "pull_request_target workflows should avoid shell execution unless they only read trusted GitHub API metadata",
    );
  }

  const unsafePrExpression =
    /\$\{\{\s*github\.event\.pull_request\.(title|body|head\.ref|head\.label)\s*\}\}/;
  const lines = content.split(/\r?\n/);
  let offset = 0;
  for (const line of lines) {
    const match = line.match(unsafePrExpression);
    const insideShell =
      match &&
      !/^\s*[A-Z0-9_]+:\s*\$\{\{\s*github\.event\.pull_request\./.test(line);

    if (insideShell) {
      addIssue(
        issues,
        content,
        offset + match.index,
        file,
        "pr-metadata",
        `do not interpolate pull request ${match[1]} directly into shell context; pass it through env or GitHub API JSON`,
      );
    }

    offset += line.length + 1;
  }

  const actionRef = /uses:\s*([^\s@]+)@([^\s#]+)/g;
  for (const match of content.matchAll(actionRef)) {
    const action = match[1];
    const ref = match[2];

    if (action.startsWith("docker://")) {
      continue;
    }

    const isFullSha = /^[a-f0-9]{40}$/.test(ref);
    const isVersionTag = /^v?\d+(?:\.\d+){0,2}$/.test(ref);

    if (!isFullSha && !(isVersionTag && isTrustedTaggedAction(action))) {
      addIssue(
        issues,
        content,
        match.index,
        file,
        "action-ref",
        `action ${action}@${ref} should use a full commit SHA unless it is a trusted first-party action`,
      );
    }
  }

  return issues;
}

module.exports = {
  checksOutPullRequestBaseSha,
  isTrustedTaggedAction,
  lintWorkflowSecurity,
};
