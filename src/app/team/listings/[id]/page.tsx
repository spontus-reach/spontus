import { notFound } from "next/navigation";
import { ListingDetail } from "@/components/team/listing-detail";
import { getListingById, MOCK_LISTINGS } from "@/lib/mock-data";

export function generateStaticParams() {
  return MOCK_LISTINGS.filter((l) => l.status === "open").map((l) => ({
    id: l.id,
  }));
}

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function TeamListingDetailPage({ params }: PageProps) {
  const { id } = await params;
  const listing = getListingById(id);
  if (!listing) notFound();

  return <ListingDetail listing={listing} />;
}
