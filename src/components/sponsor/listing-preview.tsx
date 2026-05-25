import { MapPin, Calendar, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  SPONSORSHIP_ASSET_DEFINITIONS,
  CATEGORY_LABELS,
} from "@/lib/constants";
import { SponsorProfileCard } from "./sponsor-profile-card";
import type {
  SponsorshipListing,
  SponsorProfile,
  SponsorshipAssetCategory,
} from "@/lib/types";

const CATEGORIES: SponsorshipAssetCategory[] = [
  "brand_visibility",
  "social_content",
  "product_event_activation",
];

export function ListingPreview({
  listing,
  sponsor,
}: {
  listing: SponsorshipListing;
  sponsor: SponsorProfile;
}) {
  return (
    <div className="space-y-6">
      <SponsorProfileCard sponsor={sponsor} />

      {/* Listing header */}
      <Card
        className="p-6"
        style={{ border: "0.5px solid #d5d3cd", background: "white" }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div
              className="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium"
              style={
                listing.status === "open"
                  ? {
                      background: "rgba(34,197,94,0.15)",
                      color: "#16a34a",
                    }
                  : {
                      background: "#e8e6e0",
                      color: "#6b6960",
                    }
              }
            >
              {listing.status === "open" ? "Open" : listing.status}
            </div>
            <h2
              className="mt-3"
              style={{
                fontSize: 24,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                color: "#1a1a18",
              }}
            >
              {listing.title}
            </h2>
            {listing.description && (
              <p
                className="mt-3 max-w-2xl text-sm leading-relaxed"
                style={{ color: "#6b6960" }}
              >
                {listing.description}
              </p>
            )}
          </div>
        </div>
      </Card>

      {/* Offer */}
      {(listing.offerSummary || listing.offerTypes.length > 0) && (
        <Card
          className="p-6"
          style={{ border: "0.5px solid #d5d3cd", background: "white" }}
        >
          <h3 style={{ fontSize: 16, fontWeight: 600, color: "#1a1a18" }}>
            What&apos;s offered
          </h3>
          {listing.offerSummary && (
            <p className="mt-2 text-sm" style={{ color: "#1a1a18" }}>
              {listing.offerSummary}
            </p>
          )}
          {listing.offerTypes.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {listing.offerTypes.map((ot) => (
                <span
                  key={ot}
                  className="rounded-md px-2.5 py-1 text-xs"
                  style={{ border: "0.5px solid #d5d3cd", color: "#1a1a18" }}
                >
                  {ot}
                </span>
              ))}
            </div>
          )}
        </Card>
      )}

      {/* Requested assets */}
      {listing.requestedAssets.length > 0 && (
        <Card
          className="p-6"
          style={{ border: "0.5px solid #d5d3cd", background: "white" }}
        >
          <h3 style={{ fontSize: 16, fontWeight: 600, color: "#1a1a18" }}>
            What the sponsor wants
          </h3>
          <div className="mt-4 space-y-4">
            {CATEGORIES.map((cat) => {
              const catAssets = listing.requestedAssets.filter((a) => {
                const def = SPONSORSHIP_ASSET_DEFINITIONS.find(
                  (d) => d.id === a.assetId
                );
                return def?.category === cat;
              });

              if (catAssets.length === 0) return null;

              return (
                <div key={cat}>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 500,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "#6b6960",
                    }}
                  >
                    {CATEGORY_LABELS[cat]}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {catAssets.map((a) => {
                      const def = SPONSORSHIP_ASSET_DEFINITIONS.find(
                        (d) => d.id === a.assetId
                      );
                      if (!def) return null;
                      return (
                        <span
                          key={a.assetId}
                          className="rounded-md px-2.5 py-1 text-xs"
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
                          {def.label}
                          {a.required && (
                            <span className="ml-1 text-[10px] opacity-60">
                              required
                            </span>
                          )}
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Eligibility */}
      <Card
        className="p-6"
        style={{ border: "0.5px solid #d5d3cd", background: "white" }}
      >
        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#1a1a18" }}>
          Eligibility
        </h3>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm" style={{ color: "#6b6960" }}>
          {listing.geography && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {listing.geography}
            </span>
          )}
          {listing.applicationDeadline && (
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              Deadline {listing.applicationDeadline}
            </span>
          )}
          {listing.numberOfTeams && (
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {listing.numberOfTeams} spots
            </span>
          )}
          {listing.duration && <span>Duration: {listing.duration}</span>}
          {listing.sportPreferences && listing.sportPreferences.length > 0 && (
            <span>Sports: {listing.sportPreferences.join(", ")}</span>
          )}
          {listing.teamSizeMin && (
            <span>{listing.teamSizeMin}+ athletes</span>
          )}
          {listing.socialReachMin && (
            <span>{listing.socialReachMin.toLocaleString()}+ reach</span>
          )}
        </div>
      </Card>

      {/* Team CTA (disabled) */}
      <Card
        className="p-6 text-center"
        style={{ border: "0.5px solid #d5d3cd", background: "white" }}
      >
        <button
          disabled
          className="inline-flex h-12 cursor-not-allowed items-center justify-center rounded-full px-8 text-[15px] font-medium opacity-40"
          style={{
            background: "#141414",
            color: "#f0efeb",
          }}
        >
          Apply
        </button>
        <p className="mt-3 text-xs" style={{ color: "#6b6960" }}>
          Team application flow coming in Slice 3
        </p>
      </Card>
    </div>
  );
}
