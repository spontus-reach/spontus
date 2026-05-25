"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { TeamProfilePreview } from "./team-profile-preview";
import { SPONSORSHIP_ASSET_DEFINITIONS } from "@/lib/constants";
import type { TeamProfile, SponsorshipListing } from "@/lib/types";

function getAssetLabel(assetId: string): string {
  return (
    SPONSORSHIP_ASSET_DEFINITIONS.find((a) => a.id === assetId)?.label ??
    assetId
  );
}

function computeAssetOverlap(
  listing: SponsorshipListing,
  team: TeamProfile
) {
  const teamAssetIds = new Set(
    team.sponsorshipAssets
      .filter((a) => a.status !== "unavailable")
      .map((a) => a.assetId)
  );

  const results = listing.requestedAssets.map((ra) => ({
    assetId: ra.assetId,
    label: getAssetLabel(ra.assetId),
    required: ra.required,
    matched: teamAssetIds.has(ra.assetId),
  }));

  return {
    matched: results.filter((r) => r.matched).length,
    total: results.length,
    items: results,
  };
}

type Props = {
  listing: SponsorshipListing;
  team: TeamProfile;
  onSubmit: (fitNote?: string) => void;
  onClose: () => void;
};

export function ApplicationModal({
  listing,
  team,
  onSubmit,
  onClose,
}: Props) {
  const [fitNote, setFitNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const overlap = computeAssetOverlap(listing, team);

  function handleSubmit() {
    onSubmit(fitNote.trim() || undefined);
    setSubmitted(true);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        className="relative mx-4 w-full max-w-lg overflow-hidden rounded-xl shadow-xl"
        style={{ background: "white", border: "0.5px solid #d5d3cd" }}
      >
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: "0.5px solid #d5d3cd" }}
        >
          <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1a1a18" }}>
            {submitted ? "Application sent" : `Apply: ${listing.title}`}
          </h2>
          <button onClick={onClose} style={{ color: "#6b6960" }}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
          {!submitted ? (
            <div className="space-y-5">
              <TeamProfilePreview team={team} />

              <div>
                <div
                  className="text-xs font-medium uppercase tracking-wider"
                  style={{ color: "#6b6960" }}
                >
                  Asset overlap
                </div>
                <p className="mt-1 text-sm" style={{ color: "#1a1a18" }}>
                  You offer{" "}
                  <span className="font-semibold">{overlap.matched}</span> of{" "}
                  <span className="font-semibold">{overlap.total}</span>{" "}
                  requested assets
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {overlap.items.map((item) => (
                    <span
                      key={item.assetId}
                      className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs"
                      style={
                        item.matched
                          ? {
                              background: "rgba(34,197,94,0.12)",
                              color: "#16a34a",
                              border: "0.5px solid rgba(34,197,94,0.3)",
                            }
                          : {
                              background: "#e8e6e0",
                              color: "#6b6960",
                              border: "0.5px solid #d5d3cd",
                            }
                      }
                    >
                      {item.matched ? (
                        <Check className="h-2.5 w-2.5" />
                      ) : null}
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label
                  className="mb-1.5 block text-sm"
                  style={{ color: "#1a1a18" }}
                >
                  Short note{" "}
                  <span style={{ color: "#6b6960" }}>(optional)</span>
                </label>
                <Textarea
                  rows={3}
                  maxLength={280}
                  value={fitNote}
                  onChange={(e) => setFitNote(e.target.value)}
                  placeholder="Why is your team a great fit for this sponsor? (optional)"
                />
                <div className="mt-1 text-right text-[10px]" style={{ color: "#6b6960" }}>
                  {fitNote.length}/280
                </div>
              </div>

              <Button
                onClick={handleSubmit}
                className="w-full"
                style={{ background: "#22c55e", color: "#0a0a0a" }}
              >
                Send Application
              </Button>
            </div>
          ) : (
            <div className="py-6 text-center">
              <span
                className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  background: "rgba(34,197,94,0.15)",
                  color: "#16a34a",
                }}
              >
                <Check className="h-3 w-3" />
                Sent &middot; the sponsor will review
              </span>
              <p className="mt-4 text-sm" style={{ color: "#6b6960" }}>
                We&apos;ll notify you when the sponsor responds.
              </p>
              <div className="mt-5">
                <Button variant="outline" onClick={onClose}>
                  Back to listings
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
