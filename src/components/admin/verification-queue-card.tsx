"use client";

import { Users, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VerificationStatusBadge } from "@/components/team/verification-status-badge";
import type { TeamProfile, SponsorProfile, VerificationEntityType } from "@/lib/types";

type Props = {
  entityType: VerificationEntityType;
  entity: TeamProfile | SponsorProfile;
  onReview: () => void;
};

function isTeam(entity: TeamProfile | SponsorProfile): entity is TeamProfile {
  return "sport" in entity;
}

export function VerificationQueueCard({ entityType, entity, onReview }: Props) {
  if (entityType === "team" && isTeam(entity)) {
    return (
      <div
        className="flex items-center justify-between rounded-xl p-5"
        style={{ border: "0.5px solid #d5d3cd", background: "white" }}
      >
        <div className="flex items-center gap-4">
          {entity.photo ? (
            <img
              src={entity.photo}
              alt={entity.name}
              className="h-12 w-12 flex-shrink-0 rounded-lg object-cover"
            />
          ) : (
            <div
              className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg text-xs"
              style={{ background: "#e8e6e0", color: "#6b6960" }}
            >
              {entity.sport}
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <span style={{ fontWeight: 600, color: "#1a1a18" }}>
                {entity.name}
              </span>
              <VerificationStatusBadge status={entity.verificationStatus} />
            </div>
            <div className="text-xs" style={{ color: "#6b6960" }}>
              {entity.sport} &middot; {entity.university}
            </div>
            <div
              className="mt-1 flex items-center gap-3 text-xs"
              style={{ color: "#6b6960" }}
            >
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {entity.rosterSize} athletes
              </span>
              <span>{entity.sponsorshipAssets.length} assets</span>
              <span>{entity.profileCompleteness}% complete</span>
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={onReview}>
          Review
        </Button>
      </div>
    );
  }

  const sponsor = entity as SponsorProfile;
  const initials = (sponsor.brandName ?? sponsor.companyName)
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="flex items-center justify-between rounded-xl p-5"
      style={{ border: "0.5px solid #d5d3cd", background: "white" }}
    >
      <div className="flex items-center gap-4">
        <div
          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg text-sm"
          style={{ background: "#1a3a6e", color: "#f0efeb", fontWeight: 500 }}
        >
          {initials}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span style={{ fontWeight: 600, color: "#1a1a18" }}>
              {sponsor.brandName ?? sponsor.companyName}
            </span>
            <VerificationStatusBadge status={sponsor.verificationStatus} />
          </div>
          <div className="text-xs" style={{ color: "#6b6960" }}>
            {sponsor.industryCategory ?? "Sponsor"}
          </div>
          {sponsor.websiteUrl && (
            <div
              className="mt-1 flex items-center gap-1 text-xs"
              style={{ color: "#6b6960" }}
            >
              <Globe className="h-3 w-3" />
              {sponsor.websiteUrl.replace(/^https?:\/\//, "")}
            </div>
          )}
        </div>
      </div>
      <Button variant="outline" size="sm" onClick={onReview}>
        Review
      </Button>
    </div>
  );
}
