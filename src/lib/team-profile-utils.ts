import type { TeamProfile, TeamProfileDraft } from "@/lib/types";

export function slugifyTeamName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function draftToTeamPatch(draft: TeamProfileDraft): Partial<TeamProfile> {
  return {
    name: draft.name,
    university: draft.university,
    sport: draft.sport,
    location: draft.location,
    rosterSize: draft.rosterSize,
    yearFounded: draft.yearFounded,
    oneLiner: draft.oneLiner,
    description: draft.description,
    league: draft.league,
    competitionSummary: draft.competitionSummary,
    season: draft.season,
    websiteUrl: draft.websiteUrl,
    instagramUrl: draft.instagramUrl,
    tiktokUrl: draft.tiktokUrl,
    youtubeUrl: draft.youtubeUrl,
    livestreamUrl: draft.livestreamUrl,
    combinedReach: draft.combinedReach,
    socialLinks: draft.socialLinks,
    events: draft.events,
    hostedEvents: draft.hostedEvents,
    sponsorshipAssets: draft.sponsorshipAssets,
    preferredSponsorCategories: draft.preferredSponsorCategories,
    excludedSponsorCategories: draft.excludedSponsorCategories,
    dealTypesInterestedIn: draft.dealTypesInterestedIn,
    photo: draft.photo,
    pastSponsors: draft.pastSponsors,
    profileCompleteness: draft.profileCompleteness,
    verificationStatus: draft.verificationStatus,
  };
}

export function createTeamFromSignupDraft(
  draft: TeamProfileDraft,
  existingSlugs: string[]
): TeamProfile {
  const baseSlug = slugifyTeamName(draft.name ?? "team") || "team";
  let slug = baseSlug;
  let n = 2;
  while (existingSlugs.includes(slug)) {
    slug = `${baseSlug}-${n}`;
    n += 1;
  }

  const id = `team-${slug}`;

  return {
    id,
    slug,
    name: draft.name ?? "New team",
    university: draft.university ?? "",
    sport: draft.sport ?? "",
    location: draft.location ?? "",
    rosterSize: draft.rosterSize ?? 0,
    yearFounded: draft.yearFounded,
    oneLiner: draft.oneLiner,
    description: draft.description,
    league: draft.league,
    competitionSummary: draft.competitionSummary,
    season: draft.season,
    websiteUrl: draft.websiteUrl,
    instagramUrl: draft.instagramUrl,
    tiktokUrl: draft.tiktokUrl,
    youtubeUrl: draft.youtubeUrl,
    livestreamUrl: draft.livestreamUrl,
    combinedReach: draft.combinedReach,
    socialLinks: draft.socialLinks ?? [],
    events: draft.events ?? [],
    sponsorshipAssets: draft.sponsorshipAssets ?? [],
    hostedEvents: draft.hostedEvents ?? [],
    preferredSponsorCategories: draft.preferredSponsorCategories ?? [],
    excludedSponsorCategories: draft.excludedSponsorCategories ?? [],
    dealTypesInterestedIn: draft.dealTypesInterestedIn ?? [],
    verificationStatus: draft.verificationStatus ?? "draft",
    profileCompleteness: draft.profileCompleteness ?? 0,
    photo: draft.photo,
    pastSponsors: draft.pastSponsors ?? [],
  };
}
