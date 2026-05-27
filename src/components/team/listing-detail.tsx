"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, Calendar, Users, Check, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SponsorProfileCard } from "@/components/sponsor/sponsor-profile-card";
import { ApplicationModal } from "./application-modal";
import { useApplications } from "@/components/providers/applications-provider";
import {
  SPONSORSHIP_ASSET_DEFINITIONS,
  CATEGORY_LABELS,
} from "@/lib/constants";
import { getAssetOverlap } from "@/lib/asset-overlap";
import { getTeamById, getSponsorById, ACTIVE_TEAM_ID } from "@/lib/mock-data";
import type {
  SponsorshipListing,
  SponsorshipAssetCategory,
  SponsorProfile,
  TeamProfile,
  Application,
} from "@/lib/types";

const CATEGORIES: SponsorshipAssetCategory[] = [
  "brand_visibility",
  "social_content",
  "product_event_activation",
];

export function ListingDetail({ listing }: { listing: SponsorshipListing }) {
  const [sponsor, setSponsor] = useState<SponsorProfile | null>(null);
  const [activeTeam, setActiveTeam] = useState<TeamProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [existingApp, setExistingApp] = useState<Application | null>(null);
  const { getApplicationForListing, createApplication } = useApplications();

  useEffect(() => {
    async function fetchDetails() {
      setLoading(true);
      try {
        // Fetch sponsor
        if (listing.sponsorId) {
          const sponsorData = await getSponsorById(listing.sponsorId);
          setSponsor(sponsorData ?? null);
        }
        // Fetch active team
        if (ACTIVE_TEAM_ID) {
          const teamData = await getTeamById(ACTIVE_TEAM_ID);
          setActiveTeam(teamData ?? null);
          // If we have the team, check for existing application
          if (teamData) {
            const existingApplication = await getApplicationForListing(listing.id, teamData.id);
            setExistingApp(existingApplication ?? null);
          }
        }
      } catch (error) {
        console.error('Failed to fetch details:', error);
        setSponsor(null);
        setActiveTeam(null);
        setExistingApp(null);
      } finally {
        setLoading(false);
      }
    }

    fetchDetails();
  }, [listing.sponsorId, listing.id, getApplicationForListing]);

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-10">
        <p className="text-center text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!activeTeam) {
    // If we couldn't fetch the active team, we still want to show something?
    return null;
  }

  const overlap = getAssetOverlap(listing.requestedAssets, activeTeam.sponsorshipAssets);
  const teamStatus = activeTeam.verificationStatus;
  const sponsorVerified = sponsor?.verificationStatus === "verified";
  const isOpen = listing.status === "open";
  const isPastDeadline =
    listing.applicationDeadline &&
    new Date(listing.applicationDeadline) < new Date();

  function handleApply(fitNote?: string): boolean {
    if (teamStatus !== "verified" || !sponsorVerified) return false;
    return createApplication(listing.id, ACTIVE_TEAM_ID, fitNote) !== null;
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
              You offer {overlap.matchedCount} of {overlap.totalCount}
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
        {!sponsorVerified ? (
          <p className="text-sm" style={{ color: "#6b6960" }}>
            This sponsor is currently under review. Applications will open once
            the sponsor is verified.
          </p>
        ) : teamStatus === "draft" ? (
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
        ) : teamStatus === "submitted_for_verification" ? (
          <p className="text-sm" style={{ color: "#6b6960" }}>
            Your profile is under review
          </p>
        ) : teamStatus === "needs_changes" ? (
          <div>
            <p className="text-sm" style={{ color: "#6b6960" }}>
              Your profile needs changes before you can apply
            </p>
            <Link href="/team/onboarding">
              <Button
                className="mt-3"
                variant="outline"
                style={{ borderColor: "#1a3a6e", color: "#1a3a6e" }}
              >
                Update profile
              </Button>
            </Link>
          </div>
        ) : teamStatus === "suspended" ? (
          <p className="text-sm" style={{ color: "#dc2626" }}>
            This team profile is suspended
          </p>
        ) : !isOpen || isPastDeadline ? (
          <p className="text-sm" style={{ color: "#6b6960" }}>
            This listing is no longer accepting applications
          </p>
        ) : existingApp ? (
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