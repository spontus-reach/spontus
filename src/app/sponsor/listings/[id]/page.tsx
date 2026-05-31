"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react";
import { getListingById, getSponsorById, MOCK_LISTINGS } from "@/lib/mock-data";
import { ListingPreview } from "@/components/sponsor/listing-preview";
import { useIdentity } from "@/components/providers/identity-provider";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function ListingPreviewPage({ params }: PageProps) {
  const { id } = use(params);
  const listing = getListingById(id);
  if (!listing) notFound();

  const sponsor = getSponsorById(listing.sponsorId);
  if (!sponsor) notFound();

  const { activeSponsorId } = useIdentity();
  const isOwner = listing.sponsorId === activeSponsorId;

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/sponsor/onboarding"
          className="inline-flex items-center gap-1 text-sm transition-colors hover:opacity-70"
          style={{ color: "#6b6960" }}
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to profile
        </Link>
        {isOwner && (
          <Link
            href={`/sponsor/listings/${listing.id}/applicants`}
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-70"
            style={{ color: "#1a3a6e" }}
          >
            <Users className="h-4 w-4" />
            View applicants
          </Link>
        )}
      </div>

      <ListingPreview listing={listing} sponsor={sponsor} />
    </div>
  );
}
