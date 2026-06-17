"use client";

import { notFound } from "next/navigation";
import { TeamProfileView } from "@/components/profile/team-profile-view";
import { useVerification } from "@/components/providers/verification-provider";
import type { TeamProfile } from "@/lib/types";

type TeamProfilePageClientProps = {
  slug: string;
  initialTeam: TeamProfile;
};

export function TeamProfilePageClient({
  slug,
  initialTeam,
}: TeamProfilePageClientProps) {
  const { getTeamBySlug } = useVerification();
  const team = getTeamBySlug(slug) ?? initialTeam;

  if (!team) notFound();

  return <TeamProfileView team={team} />;
}
