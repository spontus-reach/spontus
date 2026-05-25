"use client";

import { useVerification } from "@/components/providers/verification-provider";
import type { VerificationEntityType } from "@/lib/types";

export function VerificationStats({
  entityType,
}: {
  entityType: VerificationEntityType | "all";
}) {
  const { teams, sponsors } = useVerification();

  const entities =
    entityType === "team"
      ? teams
      : entityType === "sponsor"
        ? sponsors
        : [...teams.map((t) => ({ vs: t.verificationStatus })), ...sponsors.map((s) => ({ vs: s.verificationStatus }))];

  const counts = {
    submitted: entities.filter((e) => ("vs" in e ? e.vs : e.verificationStatus) === "submitted_for_verification").length,
    verified: entities.filter((e) => ("vs" in e ? e.vs : e.verificationStatus) === "verified").length,
    needs_changes: entities.filter((e) => ("vs" in e ? e.vs : e.verificationStatus) === "needs_changes").length,
    suspended: entities.filter((e) => ("vs" in e ? e.vs : e.verificationStatus) === "suspended").length,
  };

  const stats = [
    { label: "Submitted", value: counts.submitted, color: "#1a3a6e" },
    { label: "Verified", value: counts.verified, color: "#16a34a" },
    { label: "Needs changes", value: counts.needs_changes, color: "#92400e" },
    { label: "Suspended", value: counts.suspended, color: "#dc2626" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-lg p-4"
          style={{ border: "0.5px solid #d5d3cd", background: "white" }}
        >
          <div className="text-xs" style={{ color: "#6b6960" }}>
            {s.label}
          </div>
          <div style={{ fontSize: 24, fontWeight: 600, color: s.color }}>
            {s.value}
          </div>
        </div>
      ))}
    </div>
  );
}
