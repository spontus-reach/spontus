"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import type {
  TeamProfile,
  SponsorProfile,
  VerificationStatus,
  VerificationEntityType,
  VerificationReviewNote,
} from "@/lib/types";
import {
  MOCK_TEAMS,
  MOCK_SPONSORS,
  MOCK_SEED_SPONSORS,
} from "@/lib/mock-data";

interface VerificationContextValue {
  teams: TeamProfile[];
  sponsors: SponsorProfile[];
  reviewNotes: VerificationReviewNote[];
  getTeamById: (teamId: string) => TeamProfile | undefined;
  getTeamBySlug: (slug: string) => TeamProfile | undefined;
  getSponsorById: (sponsorId: string) => SponsorProfile | undefined;
  getSubmittedTeams: () => TeamProfile[];
  getSubmittedSponsors: () => SponsorProfile[];
  getTeamsByStatus: (status: VerificationStatus) => TeamProfile[];
  getSponsorsByStatus: (status: VerificationStatus) => SponsorProfile[];
  updateVerificationStatus: (
    entityType: VerificationEntityType,
    entityId: string,
    status: VerificationStatus,
    note?: string
  ) => void;
  submitForVerification: (
    entityType: VerificationEntityType,
    entityId: string
  ) => boolean;
  getLatestNote: (
    entityType: VerificationEntityType,
    entityId: string
  ) => VerificationReviewNote | undefined;
}

const VerificationContext = createContext<VerificationContextValue | null>(null);

const SUBMITTABLE_STATUSES: VerificationStatus[] = ["draft", "needs_changes"];

export function VerificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [teams, setTeams] = useState<TeamProfile[]>(() =>
    MOCK_TEAMS.map((t) => ({ ...t }))
  );
  const [sponsors, setSponsors] = useState<SponsorProfile[]>(() =>
    [...MOCK_SPONSORS, ...MOCK_SEED_SPONSORS].map((s) => ({ ...s }))
  );
  const [reviewNotes, setReviewNotes] = useState<VerificationReviewNote[]>([]);

  const getTeamById = useCallback(
    (teamId: string) => teams.find((t) => t.id === teamId),
    [teams]
  );

  const getTeamBySlug = useCallback(
    (slug: string) => teams.find((t) => t.slug === slug),
    [teams]
  );

  const getSponsorById = useCallback(
    (sponsorId: string) => sponsors.find((s) => s.id === sponsorId),
    [sponsors]
  );

  const getSubmittedTeams = useCallback(
    () =>
      teams.filter(
        (t) => t.verificationStatus === "submitted_for_verification"
      ),
    [teams]
  );

  const getSubmittedSponsors = useCallback(
    () =>
      sponsors.filter(
        (s) => s.verificationStatus === "submitted_for_verification"
      ),
    [sponsors]
  );

  const getTeamsByStatus = useCallback(
    (status: VerificationStatus) =>
      teams.filter((t) => t.verificationStatus === status),
    [teams]
  );

  const getSponsorsByStatus = useCallback(
    (status: VerificationStatus) =>
      sponsors.filter((s) => s.verificationStatus === status),
    [sponsors]
  );

  const getLatestNote = useCallback(
    (entityType: VerificationEntityType, entityId: string) => {
      const notes = reviewNotes.filter(
        (n) => n.entityType === entityType && n.entityId === entityId
      );
      return notes.length > 0 ? notes[notes.length - 1] : undefined;
    },
    [reviewNotes]
  );

  const updateVerificationStatus = useCallback(
    (
      entityType: VerificationEntityType,
      entityId: string,
      status: VerificationStatus,
      note?: string
    ) => {
      if (
        (status === "needs_changes" || status === "suspended") &&
        !note
      ) {
        return;
      }

      if (entityType === "team") {
        setTeams((prev) =>
          prev.map((t) =>
            t.id === entityId ? { ...t, verificationStatus: status } : t
          )
        );
      } else {
        setSponsors((prev) =>
          prev.map((s) =>
            s.id === entityId ? { ...s, verificationStatus: status } : s
          )
        );
      }

      const reviewNote: VerificationReviewNote = {
        id: `note-${Date.now()}`,
        entityType,
        entityId,
        status,
        note: note ?? "",
        reviewedAt: new Date().toISOString().split("T")[0],
        reviewedBy: "Admin (demo)",
      };
      setReviewNotes((prev) => [...prev, reviewNote]);
    },
    []
  );

  const submitForVerification = useCallback(
    (entityType: VerificationEntityType, entityId: string): boolean => {
      if (entityType === "team") {
        const team = teams.find((t) => t.id === entityId);
        if (!team || !SUBMITTABLE_STATUSES.includes(team.verificationStatus)) {
          return false;
        }
        setTeams((prev) =>
          prev.map((t) =>
            t.id === entityId
              ? { ...t, verificationStatus: "submitted_for_verification" as const }
              : t
          )
        );
      } else {
        const sponsor = sponsors.find((s) => s.id === entityId);
        if (
          !sponsor ||
          !SUBMITTABLE_STATUSES.includes(sponsor.verificationStatus)
        ) {
          return false;
        }
        setSponsors((prev) =>
          prev.map((s) =>
            s.id === entityId
              ? { ...s, verificationStatus: "submitted_for_verification" as const }
              : s
          )
        );
      }
      return true;
    },
    [teams, sponsors]
  );

  const value = useMemo(
    () => ({
      teams,
      sponsors,
      reviewNotes,
      getTeamById,
      getTeamBySlug,
      getSponsorById,
      getSubmittedTeams,
      getSubmittedSponsors,
      getTeamsByStatus,
      getSponsorsByStatus,
      updateVerificationStatus,
      submitForVerification,
      getLatestNote,
    }),
    [
      teams,
      sponsors,
      reviewNotes,
      getTeamById,
      getTeamBySlug,
      getSponsorById,
      getSubmittedTeams,
      getSubmittedSponsors,
      getTeamsByStatus,
      getSponsorsByStatus,
      updateVerificationStatus,
      submitForVerification,
      getLatestNote,
    ]
  );

  return (
    <VerificationContext.Provider value={value}>
      {children}
    </VerificationContext.Provider>
  );
}

export function useVerification(): VerificationContextValue {
  const ctx = useContext(VerificationContext);
  if (!ctx) {
    throw new Error(
      "useVerification must be used within a VerificationProvider"
    );
  }
  return ctx;
}
