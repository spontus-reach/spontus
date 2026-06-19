import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  acceptMockApplication,
  createMockApplication,
  declineMockApplication,
  getSeedApplications,
} from "../applications-mock.ts";
import {
  ACTIVE_TEAM_ID,
  getSeedListingById,
  getSeedSponsorById,
  MOCK_SEED_APPLICATIONS,
} from "../mock-data.ts";

describe("applications-mock helpers", () => {
  it("returns seeded applications from the provider data source", () => {
    const seed = getSeedApplications();

    assert.deepEqual(seed, MOCK_SEED_APPLICATIONS);
    assert.notEqual(seed[0], MOCK_SEED_APPLICATIONS[0]);
  });

  it("includes seeded applications for the offline demo routes", () => {
    const seed = getSeedApplications();
    const teamApplications = seed.filter((app) => app.teamId === "cp-tri");
    const fluidApplicants = seed.filter(
      (app) => app.listingId === "lst-fluid-fall"
    );
    const fluidTriDetail = seed.find((app) => app.id === "app-seed-fluid-tri");

    assert.ok(teamApplications.length > 0);
    assert.equal(fluidApplicants.length, 3);
    assert.equal(fluidTriDetail?.teamId, "cp-tri");
    assert.equal(fluidTriDetail?.listingId, "lst-fluid-fall");
  });

  it("keeps a reachable offline create path for the active team", () => {
    const listing = getSeedListingById("lst-slo-coffee");
    const sponsor = listing ? getSeedSponsorById(listing.sponsorId) : undefined;
    const existingApplication = getSeedApplications().find(
      (app) =>
        app.teamId === ACTIVE_TEAM_ID && app.listingId === "lst-slo-coffee"
    );

    assert.equal(listing?.status, "open");
    assert.equal(sponsor?.verificationStatus, "verified");
    assert.equal(existingApplication, undefined);
  });

  it("prevents duplicate team+listing applications", () => {
    const duplicate = createMockApplication(
      getSeedApplications(),
      "lst-fluid-fall",
      "cp-tri"
    );
    assert.equal(duplicate, null);
  });

  it("creates a new application when none exists", () => {
    const created = createMockApplication(
      getSeedApplications(),
      "lst-new-listing",
      "cp-tri",
      "Hello"
    );
    assert.ok(created);
    assert.equal(created?.status, "submitted");
    assert.equal(created?.fitNote, "Hello");
  });

  it("accepts and declines in memory", () => {
    const accepted = acceptMockApplication(
      getSeedApplications(),
      "app-seed-fluid-tri"
    );
    assert.equal(
      accepted.find((a) => a.id === "app-seed-fluid-tri")?.status,
      "accepted"
    );

    const declined = declineMockApplication(
      getSeedApplications(),
      "app-seed-fluid-rugby",
      "not_right_fit_this_season"
    );
    const rugby = declined.find((a) => a.id === "app-seed-fluid-rugby");
    assert.equal(rugby?.status, "declined");
    assert.equal(rugby?.declineReason, "not_right_fit_this_season");
  });
});
