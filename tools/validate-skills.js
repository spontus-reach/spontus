const fs = require("node:fs");
const path = require("node:path");

function parseFrontMatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) return null;

  const fields = {};
  for (const line of match[1].split(/\r?\n/)) {
    const field = line.match(/^([A-Za-z0-9_-]+):\s*(.+)$/);
    if (field) {
      fields[field[1]] = field[2].trim();
    }
  }

  return fields;
}

function validateSkills(root = ".agents/skills") {
  const rows = [];
  const failures = [];
  const names = new Map();

  if (!fs.existsSync(root)) {
    return {
      ok: false,
      rows,
      failures: [`Missing skills directory: ${root}`],
    };
  }

  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;

    const skillDir = path.join(root, entry.name);
    const skillFile = path.join(skillDir, "SKILL.md");

    if (!fs.existsSync(skillFile)) {
      failures.push(`Missing ${skillFile}`);
      rows.push({
        directory: entry.name,
        name: "",
        status: "missing SKILL.md",
      });
      continue;
    }

    const content = fs.readFileSync(skillFile, "utf8");
    const fields = parseFrontMatter(content);

    if (!fields) {
      failures.push(`${skillFile} is missing YAML front matter`);
      rows.push({
        directory: entry.name,
        name: "",
        status: "missing front matter",
      });
      continue;
    }

    const missing = [];
    if (!fields.name) missing.push("name");
    if (!fields.description) missing.push("description");

    if (fields.name) {
      const duplicate = names.get(fields.name);
      if (duplicate) {
        failures.push(
          `Duplicate skill name "${fields.name}" in ${duplicate} and ${skillFile}`,
        );
      } else {
        names.set(fields.name, skillFile);
      }
    }

    if (missing.length > 0) {
      failures.push(`${skillFile} is missing ${missing.join(", ")}`);
    }

    rows.push({
      directory: entry.name,
      name: fields.name || "",
      status: missing.length > 0 ? `missing ${missing.join(", ")}` : "ok",
    });
  }

  rows.sort((a, b) => a.directory.localeCompare(b.directory));

  return {
    ok: failures.length === 0,
    rows,
    failures,
  };
}

function formatSummary(result) {
  return [
    "# Skill Inventory",
    "",
    `Checked ${result.rows.length} skill directories.`,
    "",
    "| Directory | Skill name | Status |",
    "| --- | --- | --- |",
    ...result.rows.map(
      (row) => `| ${row.directory} | ${row.name} | ${row.status} |`,
    ),
    "",
  ].join("\n");
}

function main() {
  const root = process.argv[2] || ".agents/skills";
  const result = validateSkills(root);
  const summary = formatSummary(result);

  if (process.env.GITHUB_STEP_SUMMARY) {
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary);
  } else {
    process.stdout.write(summary);
  }

  if (!result.ok) {
    process.stderr.write(`${result.failures.join("\n")}\n`);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  formatSummary,
  validateSkills,
};
