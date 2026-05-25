"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Calendar, Users, Check, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SponsorProfileCard } from "@/components/sponsor/sponsor-profile-card";
import { ApplicationModal } from "./application-modal";
import { useApplications } from "./applications-provider";
import {
  SPONSORSHIP_ASSET_DEFINITIONS,
  CATEGORY_LABELS,
} from "@/lib/constants";
import {
  getSponsorById,
  ACTIVE_TEAM_ID,
  MOCK_TEAMS,
} from "@/lib/mock-data";
import type {
  SponsorshipListing,
  SponsorshipAssetCategory,
  TeamProfile,
} from "@/lib/types";

const CATEGORIES: SponsorshipAssetCategory[] = [
  "brand_visibility",
  "social_content",
  "product_event_activation",
];

function getAssetLabel(assetId: string): string {
  return (
    SPONSORSHIP_ASSET_DEFINITIONS.find((a) => a.id === assetId)?.label ??
    assetId
  );
}

function computeOverlap(listing: SponsorshipListing, team: TeamProfile) {
  const teamAssetIds = new Set(
    team.sponsorshipAssets
      .filter((a) => a.status !== "unavailable")
      .map((a) => a.assetId)
  );
  const results = listing.requestedAssets.map((ra) => ({
    assetId: ra.assetId,
    label: getAssetLabel(ra.assetId),
    required: ra.required,
    matched: teamAssetIds.has(ra.assetId),
  }));
  return {
    matched: results.filter((r) => r.matched).length,
    total: results.length,
    items: results,
  };
}

export function ListingDetail({ listing }: { listing: SponsorshipListing }) {
  const sponsor = getSponsorById(listing.sponsorId);
  const activeTeam = MOCK_TEAMS.find((t) => t.id === ACTIVE_TEAM_ID);
  const { getApplicationForListing, createApplication } = useApplications();
  const existingApp = getApplicationForListing(ACTIVE_TEAM_ID, listing.id);
  const [showModal, setShowModal] = useState(false);

  const overlap = activeTeam ? computeOverlap(listing, activeTeam) : { matched: 0, total: 0, items: [] };
  const isVerified = activeTeam?.verificationStatus === "verified";
  const isOpen = listing.status === "open";
  const isPastDeadline = (() => {
    if (!listing.applicationDeadline) return false;
    const [year, month, day] = listing.applicationDeadline.split("-").map(Number);
    const deadlineDate = new Date(year, month - 1, day, 23, 59, 59, 999);
    return new Date() > deadlineDate;
  })();

  if (!activeTeam) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-10 text-center">
        <p style={{ color: "#dc2626" }}>Active team profile not found.</p>
      </div>
    );
  }

  function handleApply(fitNote?: string): boolean {
    const result = createApplication(listing.id, ACTIVE_TEAM_ID, fitNote);
    return result !== null;
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <Link
        href="/team/listings"
        className="mb-6 inline-flex items-center gap-1 text-sm transition-colors hover:opacity-70"
        style={{ color: "#6b6960" }}
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to listings
      </Link>

      {sponsor && <SponsorProfileCard sponsor={sponsor} />}

      {/* Listing header */}
      <Card
        className="mt-6 p-6"
        style={{ border: "0.5px solid #d5d3cd", background: "white" }}
      >
        <div
          className="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium"
          style={
            listing.status === "open"
              ? { background: "rgba(34,197,94,0.15)", color: "#16a34a" }
              : { background: "#e8e6e0", color: "#6b6960" }
          }
        >
          {listing.status === "open" ? "Open" : listing.status}
        </div>
        <h2
          className="mt-3"
          style={{ fontSize: 24, fontWeight: 600, color: "#1a1a18" }}
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
      </Card>

      {/* Offer */}
      {(listing.offerSummary || listing.offerTypes.length > 0) && (
        <Card
          className="mt-4 p-6"
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

      {/* Requested assets with overlap */}
      {listing.requestedAssets.length > 0 && (
        <Card
          className="mt-4 p-6"
          style={{ border: "0.5px solid #d5d3cd", background: "white" }}
        >
          <div className="flex items-center justify-between">
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "#1a1a18" }}>
              What the sponsor wants
            </h3>
            <span className="text-xs font-medium" style={{ color: "#16a34a" }}>
              You offer {overlap.matched} of {overlap.total}
            </span>
          </div>
          <div className="mt-4 space-y-4">
            {CATEGORIES.map((cat) => {
              const catItems = overlap.items.filter((item) => {
                const def = SPONSORSHIP_ASSET_DEFINITIONS.find(
                  (d) => d.id === item.assetId
                );
                return def?.category === cat;
              });
              if (catItems.length === 0) return null;
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
                    {catItems.map((item) => (
                      <span
                        key={item.assetId}
                        className="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs"
                        style={
                          item.matched
                            ? {
                                background: "rgba(34,197,94,0.12)",
                                color: "#16a34a",
                                border: "0.5px solid rgba(34,197,94,0.3)",
                              }
                            : {
                                background: "#e8e6e0",
                                color: "#6b6960",
                                border: "0.5px solid #d5d3cd",
                              }
                        }
                      >
                        {item.matched && <Check className="h-2.5 w-2.5" />}
                        {item.label}
                        {item.required && (
                          <span className="text-[10px] opacity-60">
                            required
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Eligibility */}
      <Card
        className="mt-4 p-6"
        style={{ border: "0.5px solid #d5d3cd", background: "white" }}
      >
        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#1a1a18" }}>
          Eligibility
        </h3>
        <div
          className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm"
          style={{ color: "#6b6960" }}
        >
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
          {listing.sportPreferences && listing.sportPreferences.length > 0 ? (
            <span>Sports: {listing.sportPreferences.join(", ")}</span>
          ) : (
            <span>Any sport</span>
          )}
          {listing.teamSizeMin && (
            <span>{listing.teamSizeMin}+ athletes</span>
          )}
          {listing.socialReachMin && (
            <span>{listing.socialReachMin.toLocaleString()}+ reach</span>
          )}
        </div>
      </Card>

      {/* Apply section */}
      <Card
        className="mt-4 p-6 text-center"
        style={{ border: "0.5px solid #d5d3cd", background: "white" }}
      >
        {existingApp ? (
          <div>
            <span
              className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium"
              style={{
                background: "rgba(34,197,94,0.15)",
                color: "#16a34a",
              }}
            >
              <Check className="h-3 w-3" />
              Application submitted
            </span>
            {existingApp.submittedAt && (
              <p className="mt-2 text-xs" style={{ color: "#6b6960" }}>
                Submitted {existingApp.submittedAt}
              </p>
            )}
          </div>
        ) : !isVerified ? (
          <div>
            <p className="text-sm" style={{ color: "#6b6960" }}>
              Complete your profile to apply
            </p>
            <Link href="/team/onboarding">
              <Button
                className="mt-3"
                variant="outline"
                style={{ borderColor: "#1a3a6e", color: "#1a3a6e" }}
              >
                Complete profile
              </Button>
            </Link>
          </div>
        ) : !isOpen || isPastDeadline ? (
          <p className="text-sm" style={{ color: "#6b6960" }}>
            This listing is no longer accepting applications
          </p>
        ) : (
          <Button
            onClick={() => setShowModal(true)}
            className="h-12 rounded-full px-8 text-[15px] font-medium"
            style={{ background: "#141414", color: "#f0efeb" }}
          >
            Apply to this listing
          </Button>
        )}
      </Card>

      {showModal && (
        <ApplicationModal
          listing={listing}
          team={activeTeam}
          onSubmit={handleApply}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
