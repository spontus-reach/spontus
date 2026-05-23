const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");

const { validateSkills } = require("./validate-skills");

function makeFixture() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "spontus-skills-"));
}

function writeSkill(root, directory, content) {
  const skillDir = path.join(root, directory);
  fs.mkdirSync(skillDir, { recursive: true });
  fs.writeFileSync(path.join(skillDir, "SKILL.md"), content);
}

test("valid skill directories pass and produce inventory rows", () => {
  const root = makeFixture();

  writeSkill(
    root,
    "alpha",
    "---\r\nname: alpha\r\ndescription: Alpha skill\r\n---\r\nBody\r\n",
  );
  writeSkill(
    root,
    "beta",
    "---\nname: beta\ndescription: Beta skill\n---\nBody\n",
  );

  const result = validateSkills(root);

  assert.equal(result.ok, true);
  assert.deepEqual(
    result.rows.map((row) => [row.directory, row.name, row.status]),
    [
      ["alpha", "alpha", "ok"],
      ["beta", "beta", "ok"],
    ],
  );
});

test("missing SKILL.md fails", () => {
  const root = makeFixture();
  fs.mkdirSync(path.join(root, "empty"), { recursive: true });

  const result = validateSkills(root);

  assert.equal(result.ok, false);
  assert.match(result.failures.join("\n"), /Missing .*SKILL\.md/);
});

test("missing front matter fails", () => {
  const root = makeFixture();
  writeSkill(root, "alpha", "# Alpha\n");

  const result = validateSkills(root);

  assert.equal(result.ok, false);
  assert.match(result.failures.join("\n"), /missing YAML front matter/);
});

test("missing required front matter fields fail", () => {
  const root = makeFixture();
  writeSkill(root, "alpha", "---\nname: alpha\n---\nBody\n");

  const result = validateSkills(root);

  assert.equal(result.ok, false);
  assert.match(result.failures.join("\n"), /missing description/);
});

test("duplicate skill names fail", () => {
  const root = makeFixture();
  writeSkill(
    root,
    "alpha",
    "---\nname: duplicate\ndescription: Alpha skill\n---\nBody\n",
  );
  writeSkill(
    root,
    "beta",
    "---\nname: duplicate\ndescription: Beta skill\n---\nBody\n",
  );

  const result = validateSkills(root);

  assert.equal(result.ok, false);
  assert.match(result.failures.join("\n"), /Duplicate skill name "duplicate"/);
});
