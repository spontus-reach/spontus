"use client";

import { useState, useMemo } from "react";
import { useApplications } from "@/components/providers/applications-provider";
import { useVerification } from "@/components/providers/verification-provider";
import { ApplicantCard } from "./applicant-card";
import {
  ApplicantFilters,
  DEFAULT_APPLICANT_FILTERS,
  type ApplicantFilterState,
} from "./applicant-filters";
import { AcceptApplicationModal } from "./accept-application-modal";
import { DeclineReasonModal } from "./decline-reason-modal";
import type { SponsorshipListing, DeclineReason } from "@/lib/types";

export function ApplicantsGrid({ listing }: { listing: SponsorshipListing }) {
  const {
    getApplicationsByListingId,
    acceptApplication,
    declineApplication,
  } = useApplications();
  const { getTeamById, getSponsorById } = useVerification();
  const sponsor = getSponsorById(listing.sponsorId);
  const [filters, setFilters] = useState<ApplicantFilterState>(
    DEFAULT_APPLICANT_FILTERS
  );
  const [acceptingId, setAcceptingId] = useState<string | null>(null);
  const [decliningId, setDecliningId] = useState<string | null>(null);

  const applications = getApplicationsByListingId(listing.id);

  const filtered = useMemo(() => {
    return applications.filter((app) => {
      if (filters.status && app.status !== filters.status) return false;

      const team = getTeamById(app.teamId);
      if (!team) return false;

      if (
        filters.sport &&
        team.sport.toLowerCase() !== filters.sport.toLowerCase()
      )
        return false;

      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (
          !team.name.toLowerCase().includes(q) &&
          !team.university.toLowerCase().includes(q)
        )
          return false;
      }

      return true;
    });
  }, [applications, filters, getTeamById]);

  if (!sponsor || sponsor.verificationStatus !== "verified") {
    return (
      <div className="rounded-lg p-8 text-center" style={{ border: "0.5px solid #d5d3cd" }}>
        <p style={{ color: "#6b6960", fontSize: 15 }}>
          Your sponsor profile must be verified before you can review applicants.
        </p>
      </div>
    );
  }

  const acceptedCount = applications.filter(
    (a) => a.status === "accepted"
  ).length;
  const declinedCount = applications.filter(
    (a) => a.status === "declined"
  ).length;

  const acceptingApp = acceptingId
    ? applications.find((a) => a.id === acceptingId)
    : null;
  const decliningApp = decliningId
    ? applications.find((a) => a.id === decliningId)
    : null;
  const acceptingTeam = acceptingApp
    ? getTeamById(acceptingApp.teamId)
    : null;
  const decliningTeam = decliningApp
    ? getTeamById(decliningApp.teamId)
    : null;

  function handleAcceptConfirm() {
    if (acceptingId) {
      acceptApplication(acceptingId);
      setAcceptingId(null);
    }
  }

  function handleDeclineConfirm(reason: DeclineReason) {
    if (decliningId) {
      declineApplication(decliningId, reason);
      setDecliningId(null);
    }
  }

  return (
    <div>
      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: "Applications", value: applications.length },
          { label: "Accepted", value: acceptedCount, color: "#16a34a" },
          {
            label: "Spots left",
            value: (listing.numberOfTeams ?? 0) - acceptedCount,
          },
          { label: "Declined", value: declinedCount },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-lg p-4"
            style={{ border: "0.5px solid #d5d3cd", background: "white" }}
          >
            <div className="text-xs" style={{ color: "#6b6960" }}>
              {s.label}
            </div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: s.color ?? "#1a1a18",
              }}
            >
              {s.value}
            </div>
          </div>
        ))}
      </div>

      <ApplicantFilters
        filters={filters}
        onChange={setFilters}
        onClear={() => setFilters(DEFAULT_APPLICANT_FILTERS)}
      />

      {filtered.length === 0 ? (
        <div className="mt-12 text-center">
          {applications.length === 0 ? (
            <>
              <p style={{ color: "#6b6960", fontSize: 15 }}>
                No teams have applied yet.
              </p>
              <p className="mt-2 text-xs" style={{ color: "#8a8880" }}>
                When verified teams apply, they will appear here with structured
                profiles and asset fit.
              </p>
            </>
          ) : (
            <>
              <p style={{ color: "#6b6960", fontSize: 15 }}>
                No applicants match your filters.
              </p>
              <button
                onClick={() => setFilters(DEFAULT_APPLICANT_FILTERS)}
                className="mt-3 text-sm underline"
                style={{ color: "#1a3a6e" }}
              >
                Clear filters
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {filtered.map((app) => (
            <ApplicantCard
              key={app.id}
              application={app}
              listing={listing}
              onAccept={() => setAcceptingId(app.id)}
              onDecline={() => setDecliningId(app.id)}
            />
          ))}
        </div>
      )}

      {acceptingId && acceptingTeam && (
        <AcceptApplicationModal
          teamName={acceptingTeam.name}
          onConfirm={handleAcceptConfirm}
          onClose={() => setAcceptingId(null)}
        />
      )}

      {decliningId && decliningTeam && (
        <DeclineReasonModal
          teamName={decliningTeam.name}
          onConfirm={handleDeclineConfirm}
          onClose={() => setDecliningId(null)}
        />
      )}
    </div>
  );
}
