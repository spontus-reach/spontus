"use client";

import Link from "next/link";
import Image from "next/image";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VerificationStatusBadge } from "@/components/team/verification-status-badge";
import { AssetOverlapSummary } from "./asset-overlap-summary";
import { getAssetOverlap } from "@/lib/asset-overlap";
import { APPLICATION_STATUS_LABELS } from "@/lib/constants";
import { getTeamById } from "@/lib/mock-data";
import type { Application, SponsorshipListing } from "@/lib/types";

const statusStyles: Record<string, { bg: string; text: string }> = {
  submitted: { bg: "#dce6f5", text: "#1a3a6e" },
  under_review: { bg: "#fef3c7", text: "#92400e" },
  accepted: { bg: "rgba(34,197,94,0.15)", text: "#16a34a" },
  declined: { bg: "#fecaca", text: "#dc2626" },
};

type Props = {
  application: Application;
  listing: SponsorshipListing;
  onAccept: () => void;
  onDecline: () => void;
};

export function ApplicantCard({
  application,
  listing,
  onAccept,
  onDecline,
}: Props) {
  const team = getTeamById(application.teamId);
  if (!team) return null;

  const overlap = getAssetOverlap(
    listing.requestedAssets,
    team.sponsorshipAssets
  );
  const style = statusStyles[application.status] ?? statusStyles.submitted;
  const isTerminal =
    application.status === "accepted" || application.status === "declined";

  return (
    <div
      className={`rounded-xl p-5 ${isTerminal && application.status === "declined" ? "opacity-60" : ""}`}
      style={{ border: "0.5px solid #d5d3cd", background: "white" }}
    >
      <div className="flex items-start gap-4">
        {team.photo ? (
          <Image
            src={team.photo}
            alt={team.name}
            width={64}
            height={64}
            className="h-16 w-16 flex-shrink-0 rounded-lg object-cover"
          />
        ) : (
          <div
            className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg text-xs"
            style={{ background: "#e8e6e0", color: "#6b6960" }}
          >
            {team.sport}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span style={{ fontSize: 16, fontWeight: 600, color: "#1a1a18" }}>
              {team.name}
            </span>
            <VerificationStatusBadge status={team.verificationStatus} />
          </div>
          <div className="text-xs" style={{ color: "#6b6960" }}>
            {team.sport} &middot; {team.university}
          </div>
          <div
            className="mt-2 flex flex-wrap gap-x-4 text-xs"
            style={{ color: "#6b6960" }}
          >
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {team.rosterSize} athletes
            </span>
            {team.combinedReach && (
              <span>
                {team.combinedReach >= 1000
                  ? `${(team.combinedReach / 1000).toFixed(1)}K`
                  : team.combinedReach}{" "}
                reach
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-medium"
            style={{ background: style.bg, color: style.text }}
          >
            {APPLICATION_STATUS_LABELS[application.status]}
          </span>
          <AssetOverlapSummary overlap={overlap} compact />
        </div>
      </div>

      {application.fitNote && (
        <p
          className="mt-3 rounded-md p-3 text-xs italic"
          style={{ background: "#f0efeb", color: "#6b6960" }}
        >
          &ldquo;{application.fitNote}&rdquo;
        </p>
      )}

      <div
        className="mt-4 flex items-center justify-between"
        style={{ borderTop: "0.5px solid #d5d3cd", paddingTop: 12 }}
      >
        <span className="text-[10px]" style={{ color: "#6b6960" }}>
          {application.submittedAt && `Submitted ${application.submittedAt}`}
        </span>
        {!isTerminal ? (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onDecline}
              style={{ color: "#6b6960" }}
            >
              Decline
            </Button>
            <Link href={`/sponsor/applications/${application.id}`}>
              <Button variant="outline" size="sm">
                Review
              </Button>
            </Link>
            <Button
              size="sm"
              onClick={onAccept}
              style={{ background: "#22c55e", color: "#0a0a0a" }}
            >
              Accept
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {application.status === "accepted" && (
              <span className="text-xs" style={{ color: "#16a34a" }}>
                Accepted
              </span>
            )}
            {application.status === "declined" && (
              <span className="text-xs" style={{ color: "#6b6960" }}>
                Declined
              </span>
            )}
            <Link href={`/sponsor/applications/${application.id}`}>
              <Button variant="outline" size="sm">
                View
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
