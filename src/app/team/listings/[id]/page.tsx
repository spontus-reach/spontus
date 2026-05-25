"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { ListingDetail } from "@/components/team/listing-detail";
import { getListingById } from "@/lib/mock-data";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function TeamListingDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const listing = getListingById(id);
  if (!listing) notFound();

  return <ListingDetail listing={listing} />;
}
