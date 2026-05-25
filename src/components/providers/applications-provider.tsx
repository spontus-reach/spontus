"use client";

import { createContext, useContext, useState, useCallback, useRef } from "react";
import type { Application, ApplicationStatus, DeclineReason } from "@/lib/types";
import { MOCK_SEED_APPLICATIONS, getSeedListingById } from "@/lib/mock-data";

export type AcceptResult = { ok: true } | { ok: false; reason: string };

interface ApplicationsContextValue {
  applications: Application[];
  createApplication: (
    listingId: string,
    teamId: string,
    fitNote?: string
  ) => Application | null;
  getApplicationsForTeam: (teamId: string) => Application[];
  getApplicationForListing: (
    teamId: string,
    listingId: string
  ) => Application | undefined;
  getApplicationsByListingId: (listingId: string) => Application[];
  getApplicationById: (applicationId: string) => Application | undefined;
  acceptApplication: (applicationId: string) => AcceptResult;
  declineApplication: (applicationId: string, reason: DeclineReason) => void;
}

const ApplicationsContext = createContext<ApplicationsContextValue | null>(null);

const TERMINAL_STATUSES: ApplicationStatus[] = ["accepted", "declined", "withdrawn"];

export function ApplicationsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [applications, setApplications] =
    useState<Application[]>(MOCK_SEED_APPLICATIONS);
  const createdRef = useRef<Application | null>(null);

  const getApplicationsForTeam = useCallback(
    (teamId: string) => applications.filter((a) => a.teamId === teamId),
    [applications]
  );

  const getApplicationForListing = useCallback(
    (teamId: string, listingId: string) =>
      applications.find(
        (a) => a.teamId === teamId && a.listingId === listingId
      ),
    [applications]
  );

  const getApplicationsByListingId = useCallback(
    (listingId: string) =>
      applications.filter((a) => a.listingId === listingId),
    [applications]
  );

  const getApplicationById = useCallback(
    (applicationId: string) =>
      applications.find((a) => a.id === applicationId),
    [applications]
  );

  const createApplication = useCallback(
    (listingId: string, teamId: string, fitNote?: string): Application | null => {
      const newApp: Application = {
        id: `app-${Date.now()}`,
        listingId,
        teamId,
        status: "submitted",
        fitNote: fitNote || undefined,
        submittedAt: new Date().toISOString().split("T")[0],
      };

      createdRef.current = null;

      setApplications((prev) => {
        const duplicate = prev.some(
          (a) => a.teamId === teamId && a.listingId === listingId
        );
        if (duplicate) return prev;
        createdRef.current = newApp;
        return [...prev, newApp];
      });

      return createdRef.current;
    },
    []
  );

  const acceptApplication = useCallback(
    (applicationId: string): AcceptResult => {
      const app = applications.find((a) => a.id === applicationId);
      if (!app) return { ok: false, reason: "Application not found" };
      if (TERMINAL_STATUSES.includes(app.status)) {
        return { ok: false, reason: "Application already resolved" };
      }

      // Spot-cap enforcement (review item #1)
      const listing = getSeedListingById(app.listingId);
      if (listing && listing.numberOfTeams != null) {
        const acceptedCount = applications.filter(
          (a) => a.listingId === app.listingId && a.status === "accepted"
        ).length;
        if (acceptedCount >= listing.numberOfTeams) {
          return {
            ok: false,
            reason: `All ${listing.numberOfTeams} spots are filled. Decline or remove an accepted team first.`,
          };
        }
      }

      setApplications((prev) =>
        prev.map((a) => {
          if (a.id !== applicationId) return a;
          if (TERMINAL_STATUSES.includes(a.status)) return a;
          return {
            ...a,
            status: "accepted" as const,
            reviewedAt: new Date().toISOString().split("T")[0],
          };
        })
      );
      return { ok: true };
    },
    [applications]
  );

  const declineApplication = useCallback(
    (applicationId: string, reason: DeclineReason) => {
      setApplications((prev) =>
        prev.map((a) => {
          if (a.id !== applicationId) return a;
          if (TERMINAL_STATUSES.includes(a.status)) return a;
          return {
            ...a,
            status: "declined" as const,
            declineReason: reason,
            reviewedAt: new Date().toISOString().split("T")[0],
          };
        })
      );
    },
    []
  );

  return (
    <ApplicationsContext.Provider
      value={{
        applications,
        createApplication,
        getApplicationsForTeam,
        getApplicationForListing,
        getApplicationsByListingId,
        getApplicationById,
        acceptApplication,
        declineApplication,
      }}
    >
      {children}
    </ApplicationsContext.Provider>
  );
}

export function useApplications(): ApplicationsContextValue {
  const ctx = useContext(ApplicationsContext);
  if (!ctx) {
    throw new Error(
      "useApplications must be used within an ApplicationsProvider"
    );
  }
  return ctx;
}
