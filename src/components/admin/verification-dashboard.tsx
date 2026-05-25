"use client";

import { useState, useMemo } from "react";
import { useVerification } from "@/components/providers/verification-provider";
import { VerificationStats } from "./verification-stats";
import {
  VerificationFilters,
  DEFAULT_VER_FILTERS,
  type VerificationFilterState,
} from "./verification-filters";
import { VerificationQueueCard } from "./verification-queue-card";
import { VerificationDetailPanel } from "./verification-detail-panel";
import type {
  TeamProfile,
  SponsorProfile,
  VerificationEntityType,
} from "@/lib/types";

type SelectedEntity = {
  type: VerificationEntityType;
  entity: TeamProfile | SponsorProfile;
} | null;

export function VerificationDashboard() {
  const { teams, sponsors } = useVerification();
  const [filters, setFilters] = useState<VerificationFilterState>(
    DEFAULT_VER_FILTERS
  );
  const [selected, setSelected] = useState<SelectedEntity>(null);

  const filteredTeams = useMemo(() => {
    if (filters.entityType === "sponsor") return [];
    return teams.filter((t) => {
      if (
        filters.status &&
        t.verificationStatus !== filters.status
      )
        return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (
          !t.name.toLowerCase().includes(q) &&
          !t.university.toLowerCase().includes(q) &&
          !t.sport.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [teams, filters]);

  const filteredSponsors = useMemo(() => {
    if (filters.entityType === "team") return [];
    return sponsors.filter((s) => {
      if (
        filters.status &&
        s.verificationStatus !== filters.status
      )
        return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (
          !s.companyName.toLowerCase().includes(q) &&
          !(s.brandName ?? "").toLowerCase().includes(q) &&
          !(s.industryCategory ?? "").toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [sponsors, filters]);

  const totalResults = filteredTeams.length + filteredSponsors.length;

  function handleReviewTeam(team: TeamProfile) {
    setSelected({ type: "team", entity: team });
  }

  function handleReviewSponsor(sponsor: SponsorProfile) {
    setSelected({ type: "sponsor", entity: sponsor });
  }

  function handleCloseDetail() {
    setSelected(null);
  }

  return (
    <div>
      <VerificationStats entityType={filters.entityType} />

      <div className="mt-6">
        <VerificationFilters
          filters={filters}
          onChange={setFilters}
          onClear={() => setFilters(DEFAULT_VER_FILTERS)}
        />
      </div>

      {totalResults === 0 ? (
        <div className="mt-12 text-center">
          <p style={{ color: "#6b6960", fontSize: 15 }}>
            {teams.length === 0 && sponsors.length === 0
              ? "No profiles are waiting for verification."
              : "No profiles match your filters."}
          </p>
          {(filters.status || filters.search) && (
            <button
              onClick={() => setFilters(DEFAULT_VER_FILTERS)}
              className="mt-3 text-sm underline"
              style={{ color: "#1a3a6e" }}
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {(filters.entityType === "all" || filters.entityType === "team") &&
            filteredTeams.length > 0 && (
              <div>
                {filters.entityType === "all" && (
                  <h3
                    className="mb-3"
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#1a1a18",
                    }}
                  >
                    Teams ({filteredTeams.length})
                  </h3>
                )}
                <div className="space-y-2">
                  {filteredTeams.map((team) => (
                    <VerificationQueueCard
                      key={team.id}
                      entityType="team"
                      entity={team}
                      onReview={() => handleReviewTeam(team)}
                    />
                  ))}
                </div>
              </div>
            )}

          {(filters.entityType === "all" ||
            filters.entityType === "sponsor") &&
            filteredSponsors.length > 0 && (
              <div className={filters.entityType === "all" ? "mt-6" : ""}>
                {filters.entityType === "all" && (
                  <h3
                    className="mb-3"
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#1a1a18",
                    }}
                  >
                    Sponsors ({filteredSponsors.length})
                  </h3>
                )}
                <div className="space-y-2">
                  {filteredSponsors.map((sponsor) => (
                    <VerificationQueueCard
                      key={sponsor.id}
                      entityType="sponsor"
                      entity={sponsor}
                      onReview={() => handleReviewSponsor(sponsor)}
                    />
                  ))}
                </div>
              </div>
            )}
        </div>
      )}

      {selected && (
        <VerificationDetailPanel
          entityType={selected.type}
          entity={
            selected.type === "team"
              ? teams.find((t) => t.id === selected.entity.id) ??
                selected.entity
              : sponsors.find((s) => s.id === selected.entity.id) ??
                selected.entity
          }
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
}
