import { describe, it } from "node:test";
import assert from "node:assert/strict";
import type { Application, DeclineReason } from "../types";

// Inline minimal fixtures so node --test does not need TS path aliases.
const SEED: Application[] = [
  {
    id: "app-seed-fluid-tri",
    listingId: "lst-fluid-fall",
    teamId: "cp-tri",
    status: "submitted",
    submittedAt: "2026-05-22",
  },
  {
    id: "app-seed-fluid-rugby",
    listingId: "lst-fluid-fall",
    teamId: "cp-rugby",
    status: "submitted",
    submittedAt: "2026-05-23",
  },
];

function createMockApplication(
  applications: Application[],
  listingId: string,
  teamId: string,
  fitNote?: string
): Application | null {
  if (
    applications.some((a) => a.teamId === teamId && a.listingId === listingId)
  ) {
    return null;
  }
  return {
    id: "app-test-new",
    listingId,
    teamId,
    status: "submitted",
    fitNote,
    submittedAt: "2026-05-28",
  };
}

function acceptMockApplication(
  applications: Application[],
  applicationId: string
): Application[] {
  return applications.map((app) =>
    app.id === applicationId
      ? { ...app, status: "accepted", reviewedAt: "2026-05-28" }
      : app
  );
}

function declineMockApplication(
  applications: Application[],
  applicationId: string,
  reason: DeclineReason
): Application[] {
  return applications.map((app) =>
    app.id === applicationId
      ? {
          ...app,
          status: "declined",
          declineReason: reason,
          reviewedAt: "2026-05-28",
        }
      : app
  );
}

describe("applications-mock helpers", () => {
  it("prevents duplicate team+listing applications", () => {
    const duplicate = createMockApplication(SEED, "lst-fluid-fall", "cp-tri");
    assert.equal(duplicate, null);
  });

  it("creates a new application when none exists", () => {
    const created = createMockApplication(
      SEED,
      "lst-new-listing",
      "cp-tri",
      "Hello"
    );
    assert.ok(created);
    assert.equal(created?.status, "submitted");
    assert.equal(created?.fitNote, "Hello");
  });

  it("accepts and declines in memory", () => {
    const accepted = acceptMockApplication(SEED, "app-seed-fluid-tri");
    assert.equal(
      accepted.find((a) => a.id === "app-seed-fluid-tri")?.status,
      "accepted"
    );

    const declined = declineMockApplication(
      SEED,
      "app-seed-fluid-rugby",
      "not_right_fit_this_season"
    );
    const rugby = declined.find((a) => a.id === "app-seed-fluid-rugby");
    assert.equal(rugby?.status, "declined");
    assert.equal(rugby?.declineReason, "not_right_fit_this_season");
  });
});
