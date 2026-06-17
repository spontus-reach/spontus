"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { AdminTeamEditForm } from "@/components/admin/admin-team-edit-form";
import { useVerification } from "@/components/providers/verification-provider";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default function AdminTeamEditPage({ params }: PageProps) {
  const { slug } = use(params);
  const { getTeamBySlug } = useVerification();
  const team = getTeamBySlug(slug);

  if (!team) notFound();

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <AdminTeamEditForm team={team} />
    </div>
  );
}
