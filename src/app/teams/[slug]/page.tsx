import { notFound } from "next/navigation";
import { getTeamBySlug, MOCK_TEAMS } from "@/lib/mock-data";
import { TeamProfilePageClient } from "./team-profile-page-client";

export async function generateStaticParams() {
  return MOCK_TEAMS.map((t) => ({ slug: t.slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function TeamProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const initialTeam = getTeamBySlug(slug);
  if (!initialTeam) notFound();

  return <TeamProfilePageClient slug={slug} initialTeam={initialTeam} />;
}
