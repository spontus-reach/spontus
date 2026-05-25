"use client";

import { createContext, useContext, useState, useCallback, useRef } from "react";
import type { Application } from "@/lib/types";
import { MOCK_SEED_APPLICATIONS } from "@/lib/mock-data";

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
}

const ApplicationsContext = createContext<ApplicationsContextValue | null>(null);

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

  return (
    <ApplicationsContext.Provider
      value={{
        applications,
        createApplication,
        getApplicationsForTeam,
        getApplicationForListing,
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
