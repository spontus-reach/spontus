"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SponsorProfileForm } from "@/components/sponsor/sponsor-profile-form";
import { VerificationStatusBadge } from "@/components/team/verification-status-badge";
import type { SponsorProfileDraft } from "@/lib/types";

export default function SponsorOnboardingPage() {
  const [draft, setDraft] = useState<SponsorProfileDraft>({
    verificationStatus: "draft",
    typicalOfferTypes: [],
  });

  function updateDraft(patch: Partial<SponsorProfileDraft>) {
    setDraft((prev) => ({ ...prev, ...patch }));
  }

  function handleSubmitForVerification() {
    setDraft((prev) => ({
      ...prev,
      verificationStatus: "submitted_for_verification",
    }));
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1
              style={{
                fontSize: 28,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                color: "#1a1a18",
              }}
            >
              {draft.brandName || draft.companyName || "Your sponsor profile"}
            </h1>
            <VerificationStatusBadge
              status={draft.verificationStatus ?? "draft"}
            />
          </div>
          <p className="mt-1 text-sm" style={{ color: "#6b6960" }}>
            Build your sponsor profile
          </p>
        </div>
        <div className="flex gap-2">
          {draft.verificationStatus === "draft" && (
            <Button
              variant="outline"
              onClick={handleSubmitForVerification}
              style={{ borderColor: "#d5d3cd" }}
            >
              Submit for verification
            </Button>
          )}
          <Link href="/sponsor/listings/new">
            <Button style={{ background: "#1a3a6e", color: "#f0efeb" }}>
              Post your first listing
            </Button>
          </Link>
        </div>
      </div>

      <SponsorProfileForm data={draft} onUpdate={updateDraft} />
    </div>
  );
}
