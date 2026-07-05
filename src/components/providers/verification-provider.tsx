"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import type {
  TeamProfile,
  SponsorProfile,
  VerificationStatus,
  VerificationEntityType,
  VerificationReviewNote,
  TeamProfileDraft,
} from "@/lib/types";
import {
  MOCK_TEAMS,
  MOCK_SPONSORS,
  MOCK_SEED_SPONSORS,
} from "@/lib/mock-data";
import {
  loadPersistedSponsors,
  loadPersistedTeams,
  persistSponsors,
  persistTeams,
  writeActiveTeamIdOverride,
} from "@/lib/marketplace-storage";
import {
  createTeamFromSignupDraft,
  draftToTeamPatch,
  slugifyTeamName,
} from "@/lib/team-profile-utils";

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
  updateTeamProfile: (
    teamId: string,
    patch: Partial<TeamProfile> | TeamProfileDraft
  ) => void;
  registerTeamFromSignup: (draft: TeamProfileDraft) => TeamProfile;
  getLatestNote: (
    entityType: VerificationEntityType,
    entityId: string
  ) => VerificationReviewNote | undefined;
  getNotesForEntity: (
    entityType: VerificationEntityType,
    entityId: string
  ) => VerificationReviewNote[];
}

const VerificationContext = createContext<VerificationContextValue | null>(null);

const SUBMITTABLE_STATUSES: VerificationStatus[] = ["draft", "needs_changes"];

const seedTeams = () => MOCK_TEAMS.map((t) => ({ ...t }));
const seedSponsors = () =>
  [...MOCK_SPONSORS, ...MOCK_SEED_SPONSORS].map((s) => ({ ...s }));

export function VerificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [teams, setTeams] = useState<TeamProfile[]>(seedTeams);
  const [sponsors, setSponsors] = useState<SponsorProfile[]>(seedSponsors);
  const [reviewNotes, setReviewNotes] = useState<VerificationReviewNote[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setTeams(loadPersistedTeams(seedTeams()));
    setSponsors(loadPersistedSponsors(seedSponsors()));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    persistTeams(teams);
  }, [teams, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    persistSponsors(sponsors);
  }, [sponsors, hydrated]);

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

  const updateTeamProfile = useCallback(
    (teamId: string, patch: Partial<TeamProfile> | TeamProfileDraft) => {
      const normalized = draftToTeamPatch(patch as TeamProfileDraft);
      setTeams((prev) =>
        prev.map((t) =>
          t.id === teamId
            ? {
                ...t,
                ...normalized,
                socialLinks: normalized.socialLinks ?? t.socialLinks,
                events: normalized.events ?? t.events,
                hostedEvents: normalized.hostedEvents ?? t.hostedEvents,
                sponsorshipAssets:
                  normalized.sponsorshipAssets ?? t.sponsorshipAssets,
                preferredSponsorCategories:
                  normalized.preferredSponsorCategories ??
                  t.preferredSponsorCategories,
                excludedSponsorCategories:
                  normalized.excludedSponsorCategories ??
                  t.excludedSponsorCategories,
                dealTypesInterestedIn:
                  normalized.dealTypesInterestedIn ?? t.dealTypesInterestedIn,
                pastSponsors: normalized.pastSponsors ?? t.pastSponsors,
              }
            : t
        )
      );
    },
    []
  );

  const getNotesForEntity = useCallback(
    (entityType: VerificationEntityType, entityId: string) => {
      return reviewNotes
        .filter((n) => n.entityType === entityType && n.entityId === entityId)
        .sort((a, b) => new Date(b.reviewedAt).getTime() - new Date(a.reviewedAt).getTime());
    },
    [reviewNotes]
  );

  const registerTeamFromSignup = useCallback((draft: TeamProfileDraft): TeamProfile => {

  const registerTeamFromSignup = useCallback((draft: TeamProfileDraft): TeamProfile => {
    const slug =
      slugifyTeamName(draft.name ?? "team") || "team";
    let result: TeamProfile | undefined;

    setTeams((prev) => {
      const existing = prev.find((t) => t.slug === slug);
      if (existing) {
        result = { ...existing, ...draftToTeamPatch(draft) };
        return prev.map((t) => (t.id === existing.id ? result! : t));
      }
      result = createTeamFromSignupDraft(
        draft,
        prev.map((t) => t.slug)
      );
      return [...prev, result];
    });

    const team = result ?? createTeamFromSignupDraft(draft, []);
    writeActiveTeamIdOverride(team.id);
    return team;
  }, []);

  const updateVerificationStatus = useCallback(
    (
      entityType: VerificationEntityType,
      entityId: string,
      status: VerificationStatus,
      note?: string
    ) => {
      if (!note) {
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
        note,
        reviewedAt: new Date().toISOString().split("T")[0],
        reviewedBy: "Platform admin",
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
      updateTeamProfile,
      registerTeamFromSignup,
      getLatestNote,
      getNotesForEntity,
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
      updateTeamProfile,
      registerTeamFromSignup,
      getLatestNote,
      getNotesForEntity,
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
