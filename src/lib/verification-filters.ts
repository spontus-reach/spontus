import type {
  SponsorProfile,
  TeamProfile,
  VerificationEntityType,
  VerificationStatus,
} from "./types";

export type VerificationFilterStatus = VerificationStatus | "";

export type VerificationFilterState = {
  entityType: VerificationEntityType | "all";
  status: VerificationFilterStatus;
  search: string;
};

export const DEFAULT_VER_FILTERS: VerificationFilterState = {
  entityType: "all",
  status: "",
  search: "",
};

export function filterVerificationTeams(
  teams: TeamProfile[],
  filters: VerificationFilterState
): TeamProfile[] {
  if (filters.entityType === "sponsor") return [];

  return teams.filter((team) => {
    if (filters.status && team.verificationStatus !== filters.status) {
      return false;
    }

    if (filters.search) {
      const query = filters.search.toLowerCase();
      if (
        !team.name.toLowerCase().includes(query) &&
        !team.university.toLowerCase().includes(query) &&
        !team.sport.toLowerCase().includes(query)
      ) {
        return false;
      }
    }

    return true;
  });
}

export function filterVerificationSponsors(
  sponsors: SponsorProfile[],
  filters: VerificationFilterState
): SponsorProfile[] {
  if (filters.entityType === "team") return [];

  return sponsors.filter((sponsor) => {
    if (filters.status && sponsor.verificationStatus !== filters.status) {
      return false;
    }

    if (filters.search) {
      const query = filters.search.toLowerCase();
      if (
        !sponsor.companyName.toLowerCase().includes(query) &&
        !(sponsor.brandName ?? "").toLowerCase().includes(query) &&
        !(sponsor.industryCategory ?? "").toLowerCase().includes(query)
      ) {
        return false;
      }
    }

    return true;
  });
}
