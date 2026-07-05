"use client";

import Link from "next/link";
import { useState } from "react";
import { X, MapPin, Globe, Users, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { VerificationStatusBadge } from "@/components/team/verification-status-badge";
import { VerificationChecklist } from "./verification-checklist";
import { VerificationActions } from "./verification-actions";
import { VerificationDecisionModal } from "./verification-decision-modal";
import { VerificationNote } from "./verification-note";
import { useVerification } from "@/components/providers/verification-provider";
import { SPONSORSHIP_ASSET_DEFINITIONS } from "@/lib/constants";
import type {
  TeamProfile,
  SponsorProfile,
  VerificationEntityType,
  VerificationStatus,
} from "@/lib/types";

function isTeam(entity: TeamProfile | SponsorProfile): entity is TeamProfile {
  return "sport" in entity;
}

type DecisionType = "verify" | "needs_changes" | "suspend";

type Props = {
  entityType: VerificationEntityType;
  entity: TeamProfile | SponsorProfile;
  onClose: () => void;
};

export function VerificationDetailPanel({
  entityType,
  entity,
  onClose,
}: Props) {
  const { updateVerificationStatus, getNotesForEntity } = useVerification();
  const [decision, setDecision] = useState<DecisionType | null>(null);
  const notes = getNotesForEntity(entityType, entity.id);
  const entityName =
    entityType === "team"
      ? (entity as TeamProfile).name
      : (entity as SponsorProfile).brandName ??
        (entity as SponsorProfile).companyName;

  function handleDecision(status: VerificationStatus, note?: string) {
    updateVerificationStatus(entityType, entity.id, status, note);
    setDecision(null);
  }

  return (
    <div className="fixed inset-0 z-40 flex">
      <div className="flex-1 bg-black/20" onClick={onClose} />
      <div
        className="w-full max-w-xl overflow-y-auto"
        style={{ background: "#f0efeb", borderLeft: "0.5px solid #d5d3cd" }}
      >
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-6 py-4"
          style={{
            background: "#f0efeb",
            borderBottom: "0.5px solid #d5d3cd",
          }}
        >
          <div>
            <div className="flex items-center gap-2">
              <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1a1a18" }}>
                {entityName}
              </h2>
              <VerificationStatusBadge
                status={entity.verificationStatus}
              />
            </div>
            <span className="text-xs" style={{ color: "#6b6960" }}>
              {entityType === "team" ? "Team" : "Sponsor"} review
            </span>
          </div>
          <button onClick={onClose} style={{ color: "#6b6960" }}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 p-6">
          {/* Profile details */}
          <Card
            className="p-5"
            style={{ border: "0.5px solid #d5d3cd", background: "white" }}
          >
            <h3
              className="mb-3"
              style={{ fontSize: 14, fontWeight: 600, color: "#1a1a18" }}
            >
              Profile
            </h3>
            {entityType === "team" && isTeam(entity) ? (
              <TeamDetails team={entity} />
            ) : (
              <SponsorDetails sponsor={entity as SponsorProfile} />
            )}
            {entityType === "team" && isTeam(entity) && (
              <Link
                href={`/admin/teams/${entity.slug}/edit`}
                className="mt-4 inline-flex text-sm underline"
                style={{ color: "#1a3a6e" }}
              >
                Edit team profile
              </Link>
            )}
          </Card>

          {/* Checklist */}
          <Card
            className="p-5"
            style={{ border: "0.5px solid #d5d3cd", background: "white" }}
          >
            <VerificationChecklist
              entityType={entityType}
              entity={entity}
            />
          </Card>

          {/* Review history */}
          {notes.length > 0 && (
            <Card
              className="p-5"
              style={{ border: "0.5px solid #d5d3cd", background: "white" }}
            >
              <h3
                className="mb-3"
                style={{ fontSize: 14, fontWeight: 600, color: "#1a1a18" }}
              >
                Review history
              </h3>
              <VerificationNote notes={notes} />
            </Card>
          )}

          {/* Actions */}
          <Card
            className="p-5"
            style={{ border: "0.5px solid #d5d3cd", background: "white" }}
          >
            <h3
              className="mb-3"
              style={{ fontSize: 14, fontWeight: 600, color: "#1a1a18" }}
            >
              Decision
            </h3>
            <VerificationActions
              currentStatus={entity.verificationStatus}
              onVerify={() => setDecision("verify")}
              onNeedsChanges={() => setDecision("needs_changes")}
              onSuspend={() => setDecision("suspend")}
            />
          </Card>
        </div>
      </div>

      {decision && (
        <VerificationDecisionModal
          decisionType={decision}
          entityName={entityName}
          onConfirm={handleDecision}
          onClose={() => setDecision(null)}
        />
      )}
    </div>
  );
}

function TeamDetails({ team }: { team: TeamProfile }) {
  return (
    <div className="space-y-3 text-sm">
      <div className="flex flex-wrap gap-x-4 gap-y-1" style={{ color: "#6b6960" }}>
        <span>{team.sport}</span>
        <span>{team.university}</span>
        {team.location && (
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {team.location}
          </span>
        )}
        {team.season && (
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {team.season}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Users className="h-3 w-3" />
          {team.rosterSize} athletes
        </span>
      </div>
      {team.oneLiner && (
        <p style={{ color: "#1a1a18" }}>{team.oneLiner}</p>
      )}
      {team.description && (
        <p className="leading-relaxed" style={{ color: "#6b6960" }}>
          {team.description}
        </p>
      )}
      {team.combinedReach && (
        <div>
          <span className="text-xs" style={{ color: "#6b6960" }}>
            Combined reach:{" "}
          </span>
          <span className="font-semibold" style={{ color: "#1a1a18" }}>
            {team.combinedReach.toLocaleString()}
          </span>
        </div>
      )}
      {team.sponsorshipAssets.length > 0 && (
        <div>
          <span
            className="text-xs font-medium uppercase tracking-wider"
            style={{ color: "#6b6960" }}
          >
            Sponsorship assets ({team.sponsorshipAssets.length})
          </span>
          <div className="mt-1 flex flex-wrap gap-1">
            {team.sponsorshipAssets.map((a) => (
              <span
                key={a.assetId}
                className="rounded-md px-2 py-0.5 text-[11px]"
                style={{ background: "#e8e6e0", color: "#1a1a18" }}
              >
                {SPONSORSHIP_ASSET_DEFINITIONS.find((d) => d.id === a.assetId)
                  ?.label ?? a.assetId}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SponsorDetails({ sponsor }: { sponsor: SponsorProfile }) {
  return (
    <div className="space-y-3 text-sm">
      <div className="flex flex-wrap gap-x-4 gap-y-1" style={{ color: "#6b6960" }}>
        {sponsor.industryCategory && <span>{sponsor.industryCategory}</span>}
        {sponsor.websiteUrl && (
          <span className="flex items-center gap-1">
            <Globe className="h-3 w-3" />
            {sponsor.websiteUrl.replace(/^https?:\/\//, "")}
          </span>
        )}
        {sponsor.geographicFocus && (
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {sponsor.geographicFocus}
          </span>
        )}
      </div>
      {sponsor.oneLiner && (
        <p style={{ color: "#1a1a18" }}>{sponsor.oneLiner}</p>
      )}
      {sponsor.description && (
        <p className="leading-relaxed" style={{ color: "#6b6960" }}>
          {sponsor.description}
        </p>
      )}
      {sponsor.typicalOfferTypes.length > 0 && (
        <div>
          <span
            className="text-xs font-medium uppercase tracking-wider"
            style={{ color: "#6b6960" }}
          >
            Typical offers
          </span>
          <div className="mt-1 flex flex-wrap gap-1">
            {sponsor.typicalOfferTypes.map((t) => (
              <span
                key={t}
                className="rounded-md px-2 py-0.5 text-[11px]"
                style={{ background: "#e8e6e0", color: "#1a1a18" }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      )}
      {sponsor.pastSponsorships && (
        <div>
          <span className="text-xs" style={{ color: "#6b6960" }}>
            Past sponsorships:{" "}
          </span>
          <span style={{ color: "#1a1a18" }}>
            {sponsor.pastSponsorships}
          </span>
        </div>
      )}
    </div>
  );
}
