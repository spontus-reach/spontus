import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react";
import { getListingById, getSponsorById, MOCK_LISTINGS } from "@/lib/mock-data";
import { ACTIVE_SPONSOR_ID } from "@/lib/constants";
import { ListingPreview } from "@/components/sponsor/listing-preview";

export function generateStaticParams() {
  return MOCK_LISTINGS.map((l) => ({ id: l.id }));
}

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ListingPreviewPage({ params }: PageProps) {
  const { id } = await params;
  const listing = getListingById(id);
  if (!listing) notFound();

  const sponsor = getSponsorById(listing.sponsorId);
  if (!sponsor) notFound();

  const isOwner = listing.sponsorId === ACTIVE_SPONSOR_ID;

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
            className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90"
            style={{ background: "#1a3a6e", color: "#f0efeb" }}
          >
            <Users className="h-3.5 w-3.5" />
            View applicants
          </Link>
        )}
      </div>

      <ListingPreview listing={listing} sponsor={sponsor} />
    </div>
  );
}
