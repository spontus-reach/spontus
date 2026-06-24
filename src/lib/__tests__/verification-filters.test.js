import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  DEFAULT_VER_FILTERS,
  filterVerificationSponsors,
  filterVerificationTeams,
} from "../verification-filters.ts";

const teams = [
  {
    id: "team-submitted",
    name: "Submitted Rowing",
    university: "State University",
    sport: "Rowing",
    verificationStatus: "submitted_for_verification",
  },
  {
    id: "team-verified",
    name: "Verified Triathlon",
    university: "Cal Poly",
    sport: "Triathlon",
    verificationStatus: "verified",
  },
  {
    id: "team-needs-changes",
    name: "Needs Changes Rugby",
    university: "Central College",
    sport: "Rugby",
    verificationStatus: "needs_changes",
  },
  {
    id: "team-suspended",
    name: "Suspended Soccer",
    university: "North Campus",
    sport: "Soccer",
    verificationStatus: "suspended",
  },
];

const sponsors = [
  {
    id: "sponsor-submitted",
    companyName: "Submitted Snacks",
    industryCategory: "Food and beverage",
    typicalOfferTypes: [],
    verificationStatus: "submitted_for_verification",
  },
  {
    id: "sponsor-verified",
    companyName: "Verified Hydration",
    brandName: "Hydra Pro",
    industryCategory: "Nutrition",
    typicalOfferTypes: [],
    verificationStatus: "verified",
  },
  {
    id: "sponsor-needs-changes",
    companyName: "Needs Changes Apparel",
    industryCategory: "Apparel",
    typicalOfferTypes: [],
    verificationStatus: "needs_changes",
  },
  {
    id: "sponsor-suspended",
    companyName: "Suspended Recovery",
    industryCategory: "Recovery",
    typicalOfferTypes: [],
    verificationStatus: "suspended",
  },
];

describe("verification filters", () => {
  it("defaults to the broad all-status queue", () => {
    const expectedStatuses = [
      "submitted_for_verification",
      "verified",
      "needs_changes",
      "suspended",
    ];

    assert.equal(DEFAULT_VER_FILTERS.status, "");

    const teamStatuses = new Set(
      filterVerificationTeams(teams, DEFAULT_VER_FILTERS).map(
        (team) => team.verificationStatus
      )
    );
    const sponsorStatuses = new Set(
      filterVerificationSponsors(sponsors, DEFAULT_VER_FILTERS).map(
        (sponsor) => sponsor.verificationStatus
      )
    );

    for (const status of expectedStatuses) {
      assert.equal(teamStatuses.has(status), true);
      assert.equal(sponsorStatuses.has(status), true);
    }
  });

  it("continues to apply status, side, and search filters", () => {
    const verifiedFilter = {
      ...DEFAULT_VER_FILTERS,
      status: "verified",
    };
    assert.deepEqual(
      filterVerificationTeams(teams, verifiedFilter).map((team) => team.id),
      ["team-verified"]
    );

    const teamOnlySearch = {
      ...DEFAULT_VER_FILTERS,
      entityType: "team",
      search: "rugby",
    };
    assert.deepEqual(
      filterVerificationTeams(teams, teamOnlySearch).map((team) => team.id),
      ["team-needs-changes"]
    );
    assert.deepEqual(filterVerificationSponsors(sponsors, teamOnlySearch), []);

    const sponsorOnlySearch = {
      ...DEFAULT_VER_FILTERS,
      entityType: "sponsor",
      search: "hydration",
    };
    assert.deepEqual(filterVerificationTeams(teams, sponsorOnlySearch), []);
    assert.deepEqual(
      filterVerificationSponsors(sponsors, sponsorOnlySearch).map(
        (sponsor) => sponsor.id
      ),
      ["sponsor-verified"]
    );
  });
});
