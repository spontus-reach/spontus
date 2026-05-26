"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SponsorProfileForm } from "@/components/sponsor/sponsor-profile-form";
import { VerificationStatusBadge } from "@/components/team/verification-status-badge";
import { useVerification } from "@/components/providers/verification-provider";
import { useRouter } from "next/navigation";
import { ACTIVE_SPONSOR_ID } from "@/lib/constants";
import type { SponsorProfileDraft } from "@/lib/types";

export default function SponsorOnboardingPage() {
  const router = useRouter();

  // Check if we have signup data from URL state (from sponsor signup page)
  const [draft, setDraft] = useState<SponsorProfileDraft>(() => {
    // Check if router state has signup data from sponsor signup
    if (typeof window !== 'undefined') {
      try {
        const state = router.state as { signupData?: {
          companyName: string;
          websiteUrl: string;
          industryCategory: string;
        } } | null;
        if (state && state.signupData) {
          const { companyName, websiteUrl, industryCategory } = state.signupData;
          // Map signup data to draft profile format
          return {
            verificationStatus: "draft",
            companyName,
            brandName: "",
            oneLiner: "",
            description: "",
            logoUrl: "",
            websiteUrl,
            instagramUrl: "",
            industryCategory,
            targetAudience: "",
            geographicFocus: "",
            typicalOfferTypes: [],
            pastSponsorships: "",
          };
        }
      } catch (e) {
        // If we can't access state, fall back to default
        console.log("Could not access router state:", e);
      }
    }
    // Default draft state
    return {
      verificationStatus: "draft",
      typicalOfferTypes: [],
    };
  });

  const { getSponsorById, submitForVerification } = useVerification();
  const liveSponsor = getSponsorById(ACTIVE_SPONSOR_ID);
  const liveStatus =
    liveSponsor?.verificationStatus ?? draft.verificationStatus ?? "draft";
  const canSubmit = liveStatus === "draft" || liveStatus === "needs_changes";

  function updateDraft(patch: Partial<SponsorProfileDraft>) {
    setDraft((prev) => ({ ...prev, ...patch }));
  }

  function handleSubmitForVerification() {
    submitForVerification("sponsor", ACTIVE_SPONSOR_ID);
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
              {draft.brandName ||
                draft.companyName ||
                liveSponsor?.brandName ||
                "Your sponsor profile"}
            </h1>
            <VerificationStatusBadge status={liveStatus} />
          </div>
          <p className="mt-1 text-sm" style={{ color: "#6b6960" }}>
            Build your sponsor profile
          </p>
        </div>
        <div className="flex gap-2">
          {canSubmit && (
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
