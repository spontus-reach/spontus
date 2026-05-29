"use client";

import { ApplicationCard } from "./application-card";
import { useApplications } from "@/components/providers/applications-provider";
import { ACTIVE_TEAM_ID } from "@/lib/mock-data";
import type { ApplicationStatus } from "@/lib/types";

const COLUMNS: { status: ApplicationStatus; label: string }[] = [
  { status: "submitted", label: "Submitted" },
  { status: "under_review", label: "Under Review" },
  { status: "accepted", label: "Accepted" },
  { status: "declined", label: "Declined" },
];

export function ApplicationStatusBoard() {
  const { getApplicationsForTeam } = useApplications();
  const applications = getApplicationsForTeam(ACTIVE_TEAM_ID);

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
