"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getListingById, getSponsorById } from "@/lib/mock-data";
import type { SponsorProfile, SponsorshipListing } from "@/lib/types";
import { getDeclineReasonLabel } from "@/lib/constants";
import type { Application } from "@/lib/types";

const statusStyles: Record<string, { bg: string; text: string }> = {
  submitted: { bg: "#dce6f5", text: "#1a3a6e" },
  under_review: { bg: "#fef3c7", text: "#92400e" },
  accepted: { bg: "rgba(34,197,94,0.15)", text: "#16a34a" },
  declined: { bg: "#fecaca", text: "#dc2626" },
  withdrawn: { bg: "#e8e6e0", text: "#6b6960" },
  draft: { bg: "#e8e6e0", text: "#6b6960" },
};

const statusLabels: Record<string, string> = {
  submitted: "Submitted",
  under_review: "Under review",
  accepted: "Accepted",
  declined: "Declined",
  withdrawn: "Withdrawn",
  draft: "Draft",
};

export function ApplicationCard({ application }: { application: Application }) {
  const [listing, setListing] = useState<SponsorshipListing | null>(null);
  const [sponsor, setSponsor] = useState<SponsorProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchDetails() {
      setLoading(true);
      try {
        // Fetch listing
        if (application.listingId) {
          const listingData = await getListingById(application.listingId);
          setListing(listingData ?? null);

          // Fetch sponsor if we have a listing and it has a sponsorId
          if (listingData && listingData.sponsorId) {
            const sponsorData = await getSponsorById(listingData.sponsorId);
            setSponsor(sponsorData ?? null);
          } else {
            setSponsor(null);
          }
        } else {
          setListing(null);
          setSponsor(null);
        }
      } catch (error) {
        console.error('Failed to fetch listing/sponsor details:', error);
        setListing(null);
        setSponsor(null);
      } finally {
        setLoading(false);
      }
    }

    fetchDetails();
  }, [application.listingId]);

  if (loading) {
    return (
      <div className="border rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium">Loading...</h3>
          <span className="rounded-full px-2 py-0.5 text-[10px] font-medium bg-gray-50 text-gray-700">
            Loading
          </span>
        </div>
        <p className="text-sm text-muted-foreground">Loading application details...</p>
      </div>
    );
  }

  // If we failed to load listing, we can still show something based on the application data
  const listingTitle = listing?.title ?? 'Unknown Listing';
  const sponsorName = sponsor?.brandName ?? sponsor?.companyName ?? (listing?.sponsorId ? 'Unknown Sponsor' : 'No Sponsor');

  const initials = (sponsorName ?? "??")
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const style = statusStyles[application.status] ?? statusStyles.draft;
  const isRoutable = listing?.status === "open";

  const content = (
    <div
      className="flex items-center gap-4 rounded-lg p-4"
      style={{ border: "0.5px solid #d5d3cd", background: "white" }}
    >
      <div
        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-sm"
        style={{ background: "#1a3a6e", color: "#f0efeb", fontWeight: 500 }}
      >
        {initials}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium" style={{ color: "#1a1a18" }}>
          {sponsorName}
        </div>
        <div className="truncate text-xs" style={{ color: "#6b6960" }}>
          {listingTitle}
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-medium"
          style={{ background: style.bg, color: style.text }}
        >
          {statusLabels[application.status]}
        </span>
        {application.submittedAt && (
          <span className="text-[10px]" style={{ color: "#6b6960" }}>
            {application.submittedAt}
          </span>
        )}
        {application.status === "declined" && application.declineReason && (
          <span className="text-[10px]" style={{ color: "#6b6960" }}>
            {getDeclineReasonLabel(application.declineReason)}
          </span>
        )}
      </div>
    </div>
  );

  if (isRoutable) {
    return (
      <Link
        href={`/team/listings/${application.listingId}`}
        className="block transition-transform hover:-translate-y-0.5"
      >
        {content}
      </Link>
    );
  }

  return content;
}