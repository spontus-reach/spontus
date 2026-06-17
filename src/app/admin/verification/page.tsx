"use client";

import { VerificationDashboard } from "@/components/admin/verification-dashboard";

export default function AdminVerificationPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-2 flex items-center gap-3">
        <h1
          style={{
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            color: "#1a1a18",
          }}
        >
          Verification
        </h1>
      </div>
      <p className="mb-8" style={{ color: "#6b6960", fontSize: 14 }}>
        Review teams and sponsors before they participate in the marketplace.
      </p>

      <VerificationDashboard />
    </div>
  );
}
