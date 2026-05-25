"use client";

import Link from "next/link";
import Image from "next/image";
import { Users } from "lucide-react";
import { VerificationStatusBadge } from "./verification-status-badge";
import { SPONSORSHIP_ASSET_DEFINITIONS } from "@/lib/constants";
import type { TeamProfile } from "@/lib/types";

function getAssetLabel(assetId: string): string {
  return (
    SPONSORSHIP_ASSET_DEFINITIONS.find((a) => a.id === assetId)?.label ??
    assetId
  );
}

export function TeamProfilePreview({ team }: { team: TeamProfile }) {
  const topAssets = team.sponsorshipAssets
    .filter((a) => a.status !== "unavailable")
    .slice(0, 3)
    .map((a) => getAssetLabel(a.assetId));

  return (
    <div
      className="flex items-center gap-4 rounded-lg p-4"
      style={{ border: "0.5px solid #d5d3cd", background: "#f0efeb" }}
    >
      {team.photo ? (
        <Image
          src={team.photo}
          alt={team.name}
          width={56}
          height={56}
          className="h-14 w-14 flex-shrink-0 rounded-lg object-cover"
        />
      ) : (
        <div
          className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg text-xs"
          style={{ background: "#e8e6e0", color: "#6b6960" }}
        >
          {team.sport}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold" style={{ color: "#1a1a18" }}>
            {team.name}
          </span>
          <VerificationStatusBadge status={team.verificationStatus} />
        </div>
        <div className="text-xs" style={{ color: "#6b6960" }}>
          {team.sport} &middot; {team.university}
        </div>
        <div
          className="mt-1 flex flex-wrap items-center gap-3 text-xs"
          style={{ color: "#6b6960" }}
        >
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {team.rosterSize} athletes
          </span>
          {topAssets.length > 0 && (
            <span>{topAssets.join(", ")}</span>
          )}
        </div>
      </div>
      <Link
        href={`/teams/${team.slug}`}
        className="flex-shrink-0 text-xs underline"
        style={{ color: "#1a3a6e" }}
      >
        Full profile
      </Link>
    </div>
  );
}
