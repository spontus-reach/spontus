"use client";

import { useState, useEffect } from "react";
import { ApplicationCard } from "./application-card";
import { getApplicationsForTeam } from "@/lib/db";
import { ACTIVE_TEAM_ID } from "@/lib/mock-data";
import type { ApplicationStatus, Application } from "@/lib/types";

const COLUMNS: { status: ApplicationStatus; label: string }[] = [
  { status: "submitted", label: "Submitted" },
  { status: "under_review", label: "Under Review" },
  { status: "accepted", label: "Accepted" },
  { status: "declined", label: "Declined" },
];

export function ApplicationStatusBoard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchApplications() {
      setLoading(true);
      try {
        const apps = await getApplicationsForTeam(ACTIVE_TEAM_ID);
        setApplications(apps);
      } catch (error) {
        console.error('Failed to fetch applications:', error);
        setApplications([]);
      } finally {
        setLoading(false);
      }
    }

    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {COLUMNS.map(({ status, label }) => {
        const apps = applications.filter((a) => a.status === status);
        return (
          <div key={status}>
            <div className="mb-3 flex items-center gap-2">
              <h3
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#1a1a18",
                }}
              >
                {label}
              </h3>
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                style={{ background: "#e8e6e0", color: "#6b6960" }}
              >
                {apps.length}
              </span>
            </div>
            {apps.length === 0 ? (
              <p className="text-sm" style={{ color: "#6b6960" }}>
                No applications
              </p>
            ) : (
              <div className="space-y-2">
                {apps.map((app) => (
                  <ApplicationCard key={app.id} application={app} />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}