import { ApplicantDetail } from "@/components/sponsor/applicant-detail";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function SponsorApplicationDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <ApplicantDetail applicationId={id} />;
}
