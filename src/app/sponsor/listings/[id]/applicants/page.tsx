"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ApplicantsGrid } from "@/components/sponsor/applicants-grid";
import { getListingById } from "@/lib/mock-data";
import { useIdentity } from "@/components/providers/identity-provider";
import { useVerification } from "@/components/providers/verification-provider";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function ApplicantsPage({ params }: PageProps) {
  const { id } = use(params);
  const listing = getListingById(id);
  const { activeSponsorId } = useIdentity();
  const { getSponsorById } = useVerification();
  const sponsor = listing ? getSponsorById(listing.sponsorId) : undefined;

  if (!listing || listing.sponsorId !== activeSponsorId) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-16 text-center">
        <p style={{ color: "#6b6960", fontSize: 15 }}>
          Listing not found or you do not have access to review these
          applicants.
        </p>
        <Link
          href="/sponsor/onboarding"
          className="mt-4 inline-block text-sm underline"
          style={{ color: "#1a3a6e" }}
        >
          Back to sponsor profile
        </Link>
      </div>
    );
  }

  if (!sponsor || sponsor.verificationStatus !== "verified") {
    return (
      <div className="mx-auto max-w-5xl px-6 py-16 text-center">
        <p style={{ color: "#6b6960", fontSize: 15 }}>
          Your sponsor profile must be verified before you can review
          applicants.
        </p>
        <Link
          href="/sponsor/onboarding"
          className="mt-4 inline-block text-sm underline"
          style={{ color: "#1a3a6e" }}
        >
          Back to sponsor profile
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <Link
        href={`/sponsor/listings/${listing.id}`}
        className="mb-6 inline-flex items-center gap-1 text-sm transition-colors hover:opacity-70"
        style={{ color: "#6b6960" }}
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to listing
      </Link>

      <div className="mb-6">
        <span className="text-xs font-medium uppercase tracking-wider" style={{ color: "#8a8880" }}>
          Listing
        </span>
        <h1 className="mt-1 text-2xl font-semibold" style={{ color: "#1a1a18" }}>
          {listing.title}
        </h1>
        <p className="mt-1 text-sm" style={{ color: "#6b6960" }}>
          Deadline {listing.applicationDeadline}
        </p>
      </div>

      <ApplicantsGrid listing={listing} />
    </div>
  );
}
