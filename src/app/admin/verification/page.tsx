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
        <span
          className="rounded-full px-2.5 py-0.5 text-[10px] font-medium"
          style={{ background: "#e8e6e0", color: "#6b6960" }}
        >
          Internal demo
        </span>
      </div>
      <p className="mb-1" style={{ color: "#6b6960", fontSize: 14 }}>
        Review teams and sponsors before they participate in the marketplace.
      </p>
      <p className="mb-8 text-xs" style={{ color: "#8a8880" }}>
        Demo-only admin view. Real access control comes later. State resets on
        refresh.
      </p>

      <VerificationDashboard />
    </div>
  );
}
