import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { parseInstagramUsername } from "../instagram.ts";

describe("parseInstagramUsername", () => {
  it("extracts the handle from a full instagram.com URL", () => {
    assert.equal(
      parseInstagramUsername("https://www.instagram.com/cptri/"),
      "cptri"
    );
  });

  it("handles URLs without a trailing slash or scheme", () => {
    assert.equal(parseInstagramUsername("instagram.com/calpolyrugby"), "calpolyrugby");
  });

  it("ignores query strings and fragments", () => {
    assert.equal(
      parseInstagramUsername("https://instagram.com/cpswimclub/?hl=en"),
      "cpswimclub"
    );
  });

  it("strips a leading @ from a bare handle", () => {
    assert.equal(parseInstagramUsername("@calpolymsoccer"), "calpolymsoccer");
  });

  it("accepts a bare handle and lowercases it", () => {
    assert.equal(parseInstagramUsername("CalPolyMSoccer"), "calpolymsoccer");
  });

  it("returns null for empty or missing input", () => {
    assert.equal(parseInstagramUsername(""), null);
    assert.equal(parseInstagramUsername(undefined), null);
    assert.equal(parseInstagramUsername(null), null);
  });
});
