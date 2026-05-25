"use client";

import Link from "next/link";
import { MapPin, Calendar, Users, CheckCircle2 } from "lucide-react";
import { SPONSORSHIP_ASSET_DEFINITIONS } from "@/lib/constants";
import { getSponsorById } from "@/lib/mock-data";
import { VerificationStatusBadge } from "@/components/team/verification-status-badge";
import type { SponsorshipListing } from "@/lib/types";

function getAssetLabel(assetId: string): string {
  return (
    SPONSORSHIP_ASSET_DEFINITIONS.find((a) => a.id === assetId)?.label ??
    assetId
  );
}

export function ListingCard({
  listing,
  isApplied,
}: {
  listing: SponsorshipListing;
  isApplied: boolean;
}) {
  const sponsor = getSponsorById(listing.sponsorId);
  const initials = (sponsor?.brandName ?? sponsor?.companyName ?? "??")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const topAssets = listing.requestedAssets.slice(0, 3);

  return (
    <Link
      href={`/team/listings/${listing.id}`}
      className="block rounded-xl transition-transform hover:-translate-y-0.5"
      style={{ border: "0.5px solid #d5d3cd", background: "white" }}
    >
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div
            className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl text-lg"
            style={{
              background: "#1a3a6e",
              fontWeight: 500,
              color: "#f0efeb",
            }}
          >
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium" style={{ color: "#1a1a18" }}>
                {sponsor?.brandName ?? sponsor?.companyName ?? "Sponsor"}
              </span>
              {sponsor?.verificationStatus === "verified" && (
                <VerificationStatusBadge status="verified" />
              )}
              {isApplied && (
                <span
                  className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium"
                  style={{
                    background: "rgba(34,197,94,0.15)",
                    color: "#16a34a",
                  }}
                >
                  <CheckCircle2 className="h-2.5 w-2.5" />
                  Applied
                </span>
              )}
            </div>
            <h3
              className="mt-1"
              style={{ fontSize: 17, fontWeight: 500, color: "#1a1a18" }}
            >
              {listing.title}
            </h3>
          </div>
        </div>

        {listing.offerSummary && (
          <div
            className="mt-4 rounded-lg p-3"
            style={{ background: "#f0efeb" }}
          >
            <div
              className="text-[10px] font-medium uppercase tracking-wider"
              style={{ color: "#6b6960" }}
            >
              Offering
            </div>
            <div className="mt-1 text-sm" style={{ color: "#1a1a18" }}>
              {listing.offerSummary}
            </div>
          </div>
        )}

        {topAssets.length > 0 && (
          <div className="mt-3">
            <div
              className="text-[10px] font-medium uppercase tracking-wider"
              style={{ color: "#6b6960" }}
            >
              Wants
            </div>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {topAssets.map((a) => (
                <span
                  key={a.assetId}
                  className="rounded-md px-2 py-0.5 text-xs"
                  style={
                    a.required
                      ? {
                          background: "rgba(26,58,110,0.08)",
                          color: "#1a3a6e",
                          border: "0.5px solid rgba(26,58,110,0.3)",
                        }
                      : {
                          background: "white",
                          color: "#1a1a18",
                          border: "0.5px solid #d5d3cd",
                        }
                  }
                >
                  {getAssetLabel(a.assetId)}
                </span>
              ))}
              {listing.requestedAssets.length > 3 && (
                <span className="text-xs" style={{ color: "#6b6960" }}>
                  +{listing.requestedAssets.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        <div
          className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs"
          style={{ color: "#6b6960", borderTop: "0.5px solid #d5d3cd", paddingTop: 12 }}
        >
          {listing.geography && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {listing.geography}
            </span>
          )}
          {listing.applicationDeadline && (
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Deadline {listing.applicationDeadline}
            </span>
          )}
          {listing.numberOfTeams && (
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {listing.numberOfTeams} spots
            </span>
          )}
          {listing.sportPreferences && listing.sportPreferences.length > 0 ? (
            <span>{listing.sportPreferences.join(", ")}</span>
          ) : (
            <span>Any sport</span>
          )}
        </div>
      </div>
    </Link>
  );
}
