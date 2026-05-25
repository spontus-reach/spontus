import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ApplicantsGrid } from "@/components/sponsor/applicants-grid";
import { getListingById, getSponsorById } from "@/lib/mock-data";
import { ACTIVE_SPONSOR_ID } from "@/lib/constants";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ApplicantsPage({ params }: PageProps) {
  const { id } = await params;
  const listing = getListingById(id);
  const sponsor = listing ? getSponsorById(listing.sponsorId) : undefined;

  if (!listing || !sponsor || listing.sponsorId !== ACTIVE_SPONSOR_ID) {
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
        <div
          className="text-xs font-medium uppercase tracking-wider"
          style={{ color: "#6b6960" }}
        >
          Listing
        </div>
        <h1
          className="mt-1"
          style={{
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            color: "#1a1a18",
          }}
        >
          {listing.title}
        </h1>
        <p className="mt-1 text-sm" style={{ color: "#6b6960" }}>
          {listing.numberOfTeams ?? "?"} spots &middot;{" "}
          {listing.applicationDeadline
            ? `Deadline ${listing.applicationDeadline}`
            : "No deadline"}
        </p>
      </div>

      <ApplicantsGrid listing={listing} />
    </div>
  );
}
