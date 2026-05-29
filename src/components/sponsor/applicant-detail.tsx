"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TeamProfilePreview } from "@/components/team/team-profile-preview";
import { AssetOverlapSummary } from "./asset-overlap-summary";
import { EligibilitySummary } from "./eligibility-summary";
import { AcceptApplicationModal } from "./accept-application-modal";
import { DeclineReasonModal } from "./decline-reason-modal";
import { useApplications } from "@/components/providers/applications-provider";
import { useVerification } from "@/components/providers/verification-provider";
import { getAssetOverlap } from "@/lib/asset-overlap";
import { APPLICATION_STATUS_LABELS, ACTIVE_SPONSOR_ID, getDeclineReasonLabel } from "@/lib/constants";
import { getListingById } from "@/lib/mock-data";
import type { DeclineReason } from "@/lib/types";

export function ApplicantDetail({
  applicationId,
}: {
  applicationId: string;
}) {
  const {
    getApplicationById,
    acceptApplication,
    declineApplication,
  } = useApplications();
  const { getTeamById, getSponsorById } = useVerification();
  const [showAccept, setShowAccept] = useState(false);
  const [showDecline, setShowDecline] = useState(false);

  const application = getApplicationById(applicationId);
  if (!application) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-16 text-center">
        <p style={{ color: "#6b6960" }}>Application not found.</p>
      </div>
    );
  }

  const team = getTeamById(application.teamId);
  const listing = getListingById(application.listingId);
  const sponsor = listing ? getSponsorById(listing.sponsorId) : undefined;

  if (!team || !listing) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-16 text-center">
        <p style={{ color: "#6b6960" }}>Application data incomplete.</p>
      </div>
    );
  }

  if (
    listing.sponsorId !== ACTIVE_SPONSOR_ID ||
    sponsor?.verificationStatus !== "verified"
  ) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-16 text-center">
        <p style={{ color: "#6b6960", fontSize: 15 }}>
          You do not have access to review this application.
        </p>
        <Link
          href="/sponsor/onboarding"
          className="mt-4 inline-block text-sm underline"
          style={{ color: "#1a3a6e" }}
        >
          Back to sponsor profile
        </Link>
      </div>
    );
  }

  const overlap = getAssetOverlap(
    listing.requestedAssets,
    team.sponsorshipAssets
  );
  const isTerminal =
    application.status === "accepted" || application.status === "declined";

  const statusStyles: Record<string, { bg: string; text: string }> = {
    submitted: { bg: "#dce6f5", text: "#1a3a6e" },
    under_review: { bg: "#fef3c7", text: "#92400e" },
    accepted: { bg: "rgba(34,197,94,0.15)", text: "#16a34a" },
    declined: { bg: "#fecaca", text: "#dc2626" },
  };
  const statusStyle =
    statusStyles[application.status] ?? statusStyles.submitted;

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <Link
        href={`/sponsor/listings/${listing.id}/applicants`}
        className="mb-6 inline-flex items-center gap-1 text-sm transition-colors hover:opacity-70"
        style={{ color: "#6b6960" }}
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to applicants
      </Link>

      {/* Header */}
      <Card
        className="p-6"
        style={{ border: "0.5px solid #d5d3cd", background: "white" }}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1
                style={{
                  fontSize: 24,
                  fontWeight: 600,
                  color: "#1a1a18",
                }}
              >
                {team.name}
              </h1>
              <span
                className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                style={{
                  background: statusStyle.bg,
                  color: statusStyle.text,
                }}
              >
                {APPLICATION_STATUS_LABELS[application.status]}
              </span>
            </div>
            <div className="mt-1 text-sm" style={{ color: "#6b6960" }}>
              {team.sport} &middot; {team.university}
            </div>
            <div className="mt-1 text-xs" style={{ color: "#8a8880" }}>
              Applied {application.submittedAt} &middot; Listing:{" "}
              {listing.title}
              {sponsor &&
                ` &middot; ${sponsor.brandName ?? sponsor.companyName}`}
            </div>
          </div>
          {!isTerminal && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowDecline(true)}
                style={{ borderColor: "#d5d3cd" }}
              >
                Decline
              </Button>
              <Button
                onClick={() => setShowAccept(true)}
                style={{ background: "#22c55e", color: "#0a0a0a" }}
              >
                Accept
              </Button>
            </div>
          )}
          {application.status === "accepted" && (
            <div className="text-sm" style={{ color: "#16a34a" }}>
              Application accepted
              {application.reviewedAt && ` on ${application.reviewedAt}`}.
              Deal setup will come in a later workflow.
            </div>
          )}
          {application.status === "declined" && (
            <div className="text-sm" style={{ color: "#6b6960" }}>
              Declined
              {application.reviewedAt && ` on ${application.reviewedAt}`}
              {application.declineReason && (
                <span>
                  {" "}
                  &middot; Reason:{" "}
                  {getDeclineReasonLabel(application.declineReason)}
                </span>
              )}
            </div>
          )}
        </div>
      </Card>

      <div className="mt-6 grid gap-6 md:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          {/* Team profile */}
          <Card
            className="p-6"
            style={{ border: "0.5px solid #d5d3cd", background: "white" }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "#1a1a18" }}>
              Team profile
            </h3>
            <div className="mt-4">
              <TeamProfilePreview team={team} />
            </div>
            {team.description && (
              <p
                className="mt-4 text-sm leading-relaxed"
                style={{ color: "#6b6960" }}
              >
                {team.description}
              </p>
            )}
          </Card>

          {/* Fit note */}
          <Card
            className="p-6"
            style={{ border: "0.5px solid #d5d3cd", background: "white" }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "#1a1a18" }}>
              Fit note
            </h3>
            {application.fitNote ? (
              <p
                className="mt-3 rounded-md p-4 text-sm italic leading-relaxed"
                style={{ background: "#f0efeb", color: "#1a1a18" }}
              >
                &ldquo;{application.fitNote}&rdquo;
              </p>
            ) : (
              <p className="mt-3 text-sm" style={{ color: "#6b6960" }}>
                No fit note provided. The team profile is the main
                application.
              </p>
            )}
          </Card>

          {/* Asset overlap */}
          <Card
            className="p-6"
            style={{ border: "0.5px solid #d5d3cd", background: "white" }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "#1a1a18" }}>
              Asset overlap
            </h3>
            <div className="mt-4">
              <AssetOverlapSummary overlap={overlap} />
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Eligibility */}
          <Card
            className="p-6"
            style={{ border: "0.5px solid #d5d3cd", background: "white" }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "#1a1a18" }}>
              Eligibility
            </h3>
            <div className="mt-4">
              <EligibilitySummary listing={listing} team={team} />
            </div>
          </Card>

          {/* Decision panel */}
          <Card
            className="p-6"
            style={{ border: "0.5px solid #d5d3cd", background: "white" }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "#1a1a18" }}>
              Decision
            </h3>
            <div className="mt-4 space-y-3">
              {!isTerminal ? (
                <>
                  <Button
                    className="w-full"
                    onClick={() => setShowAccept(true)}
                    style={{ background: "#22c55e", color: "#0a0a0a" }}
                  >
                    Accept application
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setShowDecline(true)}
                    style={{ borderColor: "#d5d3cd" }}
                  >
                    Decline application
                  </Button>
                </>
              ) : (
                <p className="text-sm" style={{ color: "#6b6960" }}>
                  This application has been{" "}
                  {application.status === "accepted"
                    ? "accepted"
                    : "declined"}
                  .
                </p>
              )}
              <Button
                variant="ghost"
                className="w-full"
                disabled
                style={{ color: "#6b6960", opacity: 0.5 }}
              >
                Request more info (coming soon)
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {showAccept && (
        <AcceptApplicationModal
          teamName={team.name}
          onConfirm={() => {
            acceptApplication(application.id);
            setShowAccept(false);
          }}
          onClose={() => setShowAccept(false)}
        />
      )}

      {showDecline && (
        <DeclineReasonModal
          teamName={team.name}
          onConfirm={(reason: DeclineReason) => {
            declineApplication(application.id, reason);
            setShowDecline(false);
          }}
          onClose={() => setShowDecline(false)}
        />
      )}
    </div>
  );
}
