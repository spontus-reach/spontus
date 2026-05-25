"use client";

import { ApplicationStatusBoard } from "@/components/team/application-status-board";

export default function TeamApplicationsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1
        style={{
          fontSize: 28,
          fontWeight: 600,
          letterSpacing: "-0.01em",
          color: "#1a1a18",
        }}
      >
        My Applications
      </h1>
      <p className="mt-1" style={{ color: "#6b6960" }}>
        Track your sponsorship applications
      </p>

      <div className="mt-8">
        <ApplicationStatusBoard />
      </div>
    </div>
  );
}
