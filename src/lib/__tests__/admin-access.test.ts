import assert from "node:assert/strict";
import { describe, it, afterEach } from "node:test";
import {
  getPlatformAdminEmails,
  isPlatformAdminEmail,
} from "../admin-access.ts";

describe("admin-access", () => {
  const original = process.env.ADMIN_EMAILS;

  afterEach(() => {
    if (original === undefined) {
      delete process.env.ADMIN_EMAILS;
    } else {
      process.env.ADMIN_EMAILS = original;
    }
  });

  it("returns empty allowlist when ADMIN_EMAILS is unset", () => {
    delete process.env.ADMIN_EMAILS;
    assert.deepEqual(getPlatformAdminEmails(), []);
    assert.equal(isPlatformAdminEmail("admin@example.com"), false);
  });

  it("matches emails case-insensitively with whitespace trimmed", () => {
    process.env.ADMIN_EMAILS = " Admin@Example.com , other@test.io ";
    assert.equal(isPlatformAdminEmail("admin@example.com"), true);
    assert.equal(isPlatformAdminEmail("other@test.io"), true);
    assert.equal(isPlatformAdminEmail("stranger@example.com"), false);
  });
});
