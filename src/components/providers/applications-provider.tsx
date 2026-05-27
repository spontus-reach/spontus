"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { Application, DeclineReason } from "@/lib/types";
import { supabase } from "@/lib/supabase";
import { mapApplicationRow } from "@/lib/db";

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
  // We might also need a function to refetch or update the state from the database
  refresh: () => Promise<void>;
}

const ApplicationsContext = createContext<ApplicationsContextValue | null>(null);


export function ApplicationsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch all applications from the database on mount
  useEffect(() => {
    async function fetchApplications() {
      setLoading(true);
      try {
        const { data, error } = await supabase.from('applications').select('*');
        if (error) throw error;
        setApplications((data ?? []).map((row) => mapApplicationRow(row)));
      } catch (error) {
        console.error('Failed to fetch applications:', error);
        setApplications([]);
      } finally {
        setLoading(false);
      }
    }

    fetchApplications();
  }, []);

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
    async (listingId: string, teamId: string, fitNote?: string): Promise<Application | null> => {
      try {
        const newApp = {
          listing_id: listingId,
          team_id: teamId,
          status: "submitted",
          fit_note: fitNote || null,
          submitted_at: new Date().toISOString().split("T")[0],
        };

        const { data, error } = await supabase
          .from('applications')
          .insert(newApp)
          .select()
          .single();

        if (error) throw error;

        // Update state optimistically
        const application = mapApplicationRow(data);
        setApplications(prev => [...prev, application]);
        return application;
      } catch (error) {
        console.error('Failed to create application:', error);
        return null;
      }
    },
    []
  );

  const acceptApplication = useCallback(
    async (applicationId: string) => {
      try {
        const { data, error } = await supabase
          .from('applications')
          .update({
            status: "accepted",
            reviewed_at: new Date().toISOString().split("T")[0],
          })
          .eq('id', applicationId)
          .select()
          .single();

        if (error) throw error;

        // Update state
        setApplications(prev =>
          prev.map(app => (app.id === applicationId ? mapApplicationRow(data) : app))
        );
      } catch (error) {
        console.error('Failed to accept application:', error);
      }
    },
    []
  );

  const declineApplication = useCallback(
    async (applicationId: string, reason: DeclineReason) => {
      try {
        const { data, error } = await supabase
          .from('applications')
          .update({
            status: "declined",
            decline_reason: reason,
            reviewed_at: new Date().toISOString().split("T")[0],
          })
          .eq('id', applicationId)
          .select()
          .single();

        if (error) throw error;

        // Update state
        setApplications(prev =>
          prev.map(app => (app.id === applicationId ? mapApplicationRow(data) : app))
        );
      } catch (error) {
        console.error('Failed to decline application:', error);
      }
    },
    []
  );

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('applications').select('*');
      if (error) throw error;
      setApplications((data ?? []).map((row) => mapApplicationRow(row)));
    } catch (error) {
      console.error('Failed to refresh applications:', error);
    } finally {
      setLoading(false);
    }
  }, []);

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

  if (loading) {
    // We still want to render the children, but we can show a loading indicator if needed.
    // For now, we'll just return the context with empty applications.
    // The components that use this provider should handle loading state themselves.
    // Alternatively, we can throw a promise or use a suspense pattern, but we'll keep it simple.
  }

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
