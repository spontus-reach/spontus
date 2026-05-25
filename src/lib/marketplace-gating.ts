import type { SponsorProfile, SponsorshipListing } from "./types";

export function isListingFromVerifiedSponsor(
  listing: SponsorshipListing,
  getSponsorById: (sponsorId: string) => SponsorProfile | undefined,
): boolean {
  const sponsor = getSponsorById(listing.sponsorId);
  return sponsor?.verificationStatus === "verified";
}
