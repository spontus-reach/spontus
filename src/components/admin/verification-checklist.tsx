"use client";

import { Check, X } from "lucide-react";
import type { TeamProfile, SponsorProfile, VerificationEntityType } from "@/lib/types";

type CheckItem = { label: string; met: boolean };

function getTeamChecks(team: TeamProfile): CheckItem[] {
  return [
    { label: "Has university and sport", met: !!(team.university && team.sport) },
    { label: "Has roster size", met: !!team.rosterSize },
    { label: "Has description or one-liner", met: !!(team.description || team.oneLiner) },
    { label: "Has social or reach info", met: !!(team.combinedReach || team.socialLinks.length > 0) },
    { label: "Has sponsorship assets selected", met: team.sponsorshipAssets.length > 0 },
    { label: "Has competition or events", met: !!(team.competitionSummary || team.events.length > 0) },
    { label: "Has location", met: !!team.location },
  ];
}

function getSponsorChecks(sponsor: SponsorProfile): CheckItem[] {
  return [
    { label: "Has company or brand name", met: !!(sponsor.companyName || sponsor.brandName) },
    { label: "Has website", met: !!sponsor.websiteUrl },
    { label: "Has industry category", met: !!sponsor.industryCategory },
    { label: "Has description or one-liner", met: !!(sponsor.description || sponsor.oneLiner) },
    { label: "Has offer types or sponsorship intent", met: sponsor.typicalOfferTypes.length > 0 },
    { label: "Has geographic focus or target audience", met: !!(sponsor.geographicFocus || sponsor.targetAudience) },
  ];
}

export function VerificationChecklist({
  entityType,
  entity,
}: {
  entityType: VerificationEntityType;
  entity: TeamProfile | SponsorProfile;
}) {
  const checks =
    entityType === "team"
      ? getTeamChecks(entity as TeamProfile)
      : getSponsorChecks(entity as SponsorProfile);

  const met = checks.filter((c) => c.met).length;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h4 style={{ fontSize: 14, fontWeight: 600, color: "#1a1a18" }}>
          Completeness check
        </h4>
        <span className="text-xs" style={{ color: "#6b6960" }}>
          {met}/{checks.length}
        </span>
      </div>
      <div className="space-y-2">
        {checks.map((c) => (
          <div
            key={c.label}
            className="flex items-center gap-2 text-xs"
            style={{ color: c.met ? "#16a34a" : "#6b6960" }}
          >
            {c.met ? (
              <Check className="h-3 w-3 flex-shrink-0" />
            ) : (
              <X className="h-3 w-3 flex-shrink-0" style={{ color: "#dc2626" }} />
            )}
            {c.label}
          </div>
        ))}
      </div>
    </div>
  );
}
