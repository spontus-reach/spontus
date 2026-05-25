import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getListingById, getSponsorById, MOCK_LISTINGS } from "@/lib/mock-data";
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

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <Link
        href="/sponsor/onboarding"
        className="mb-6 inline-flex items-center gap-1 text-sm transition-colors hover:opacity-70"
        style={{ color: "#6b6960" }}
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to profile
      </Link>

      <ListingPreview listing={listing} sponsor={sponsor} />
    </div>
  );
}
