import type { SponsorProfile, TeamProfile } from "@/lib/types";

const TEAMS_KEY = "spontus.marketplace.teams";
const SPONSORS_KEY = "spontus.marketplace.sponsors";

function canUseStorage(): boolean {
  return typeof window !== "undefined";
}

export function loadPersistedTeams(fallback: TeamProfile[]): TeamProfile[] {
  if (!canUseStorage()) return fallback;
  try {
    const raw = localStorage.getItem(TEAMS_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as TeamProfile[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export function persistTeams(teams: TeamProfile[]): void {
  if (!canUseStorage()) return;
  try {
    localStorage.setItem(TEAMS_KEY, JSON.stringify(teams));
  } catch {
    // Ignore quota errors during local testing.
  }
}

export function loadPersistedSponsors(fallback: SponsorProfile[]): SponsorProfile[] {
  if (!canUseStorage()) return fallback;
  try {
    const raw = localStorage.getItem(SPONSORS_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as SponsorProfile[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export function persistSponsors(sponsors: SponsorProfile[]): void {
  if (!canUseStorage()) return;
  try {
    localStorage.setItem(SPONSORS_KEY, JSON.stringify(sponsors));
  } catch {
    // Ignore quota errors during local testing.
  }
}

export const ACTIVE_TEAM_ID_KEY = "spontus.activeTeamId";

export function readActiveTeamIdOverride(): string | null {
  if (!canUseStorage()) return null;
  return sessionStorage.getItem(ACTIVE_TEAM_ID_KEY);
}

export function writeActiveTeamIdOverride(teamId: string): void {
  if (!canUseStorage()) return;
  sessionStorage.setItem(ACTIVE_TEAM_ID_KEY, teamId);
}
