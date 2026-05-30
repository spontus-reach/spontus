"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Application, DeclineReason } from "@/lib/types";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { mapApplicationRow } from "@/lib/db";
import {
  acceptMockApplication,
  createMockApplication,
  declineMockApplication,
  getSeedApplications,
} from "@/lib/applications-mock";

interface ApplicationsContextValue {
  applications: Application[];
  createApplication: (
    listingId: string,
    teamId: string,
    fitNote?: string
  ) => Promise<Application | null>;
  getApplicationsForTeam: (teamId: string) => Application[];
  getApplicationForListing: (
    teamId: string,
    listingId: string
  ) => Application | undefined;
  getApplicationsByListingId: (listingId: string) => Application[];
  getApplicationById: (applicationId: string) => Application | undefined;
  acceptApplication: (applicationId: string) => Promise<void>;
  declineApplication: (applicationId: string, reason: DeclineReason) => Promise<void>;
  refresh: () => Promise<void>;
}

const ApplicationsContext = createContext<ApplicationsContextValue | null>(null);

function getSupabaseApplicationsClient(): SupabaseClient | null {
  return isSupabaseConfigured() ? supabase : null;
}

export function ApplicationsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [applications, setApplications] = useState<Application[]>(() =>
    getSupabaseApplicationsClient() ? [] : getSeedApplications()
  );

  const loadApplications = useCallback(async () => {
    const applicationsClient = getSupabaseApplicationsClient();
    if (!applicationsClient) {
      setApplications(getSeedApplications());
      return;
    }

    try {
      const { data, error } = await applicationsClient
        .from("applications")
        .select("*");
      if (error) throw error;
      setApplications((data ?? []).map((row) => mapApplicationRow(row)));
    } catch (error) {
      console.error("Failed to fetch applications:", error);
      setApplications([]);
    }
  }, []);

  useEffect(() => {
    if (!getSupabaseApplicationsClient()) {
      return;
    }
    let cancelled = false;
    void (async () => {
      await loadApplications();
      if (cancelled) return;
    })();
    return () => {
      cancelled = true;
    };
  }, [loadApplications]);

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
    async (
      listingId: string,
      teamId: string,
      fitNote?: string
    ): Promise<Application | null> => {
      const applicationsClient = getSupabaseApplicationsClient();
      if (!applicationsClient) {
        let created: Application | null = null;
        setApplications((prev) => {
          created = createMockApplication(prev, listingId, teamId, fitNote);
          return created ? [...prev, created] : prev;
        });
        return created;
      }

      try {
        const existing = applications.find(
          (a) => a.teamId === teamId && a.listingId === listingId
        );
        if (existing) return null;

        const newApp = {
          listing_id: listingId,
          team_id: teamId,
          status: "submitted" as const,
          fit_note: fitNote || null,
          submitted_at: new Date().toISOString().split("T")[0],
        };

        const { data, error } = await applicationsClient
          .from("applications")
          .insert(newApp)
          .select()
          .single();

        if (error) throw error;

        const application = mapApplicationRow(data);
        setApplications((prev) => [...prev, application]);
        return application;
      } catch (error) {
        console.error("Failed to create application:", error);
        return null;
      }
    },
    [applications]
  );

  const acceptApplication = useCallback(
    async (applicationId: string) => {
      const applicationsClient = getSupabaseApplicationsClient();
      if (!applicationsClient) {
        setApplications((prev) => acceptMockApplication(prev, applicationId));
        return;
      }

      try {
        const { data, error } = await applicationsClient
          .from("applications")
          .update({
            status: "accepted",
            reviewed_at: new Date().toISOString().split("T")[0],
          })
          .eq("id", applicationId)
          .select()
          .single();

        if (error) throw error;

        setApplications((prev) =>
          prev.map((app) =>
            app.id === applicationId ? mapApplicationRow(data) : app
          )
        );
      } catch (error) {
        console.error("Failed to accept application:", error);
      }
    },
    []
  );

  const declineApplication = useCallback(
    async (applicationId: string, reason: DeclineReason) => {
      const applicationsClient = getSupabaseApplicationsClient();
      if (!applicationsClient) {
        setApplications((prev) =>
          declineMockApplication(prev, applicationId, reason)
        );
        return;
      }

      try {
        const { data, error } = await applicationsClient
          .from("applications")
          .update({
            status: "declined",
            decline_reason: reason,
            reviewed_at: new Date().toISOString().split("T")[0],
          })
          .eq("id", applicationId)
          .select()
          .single();

        if (error) throw error;

        setApplications((prev) =>
          prev.map((app) =>
            app.id === applicationId ? mapApplicationRow(data) : app
          )
        );
      } catch (error) {
        console.error("Failed to decline application:", error);
      }
    },
    []
  );

  const refresh = useCallback(async () => {
    await loadApplications();
  }, [loadApplications]);

  const value: ApplicationsContextValue = {
    applications,
    createApplication,
    getApplicationsForTeam,
    getApplicationForListing,
    getApplicationsByListingId,
    getApplicationById,
    acceptApplication,
    declineApplication,
    refresh,
  };

  return (
    <ApplicationsContext.Provider value={value}>
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
