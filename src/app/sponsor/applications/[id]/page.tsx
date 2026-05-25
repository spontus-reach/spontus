"use client";

import { use } from "react";
import { ApplicantDetail } from "@/components/sponsor/applicant-detail";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function SponsorApplicationDetailPage({ params }: PageProps) {
  const { id } = use(params);
  return <ApplicantDetail applicationId={id} />;
}
