"use client";

import { useEffect, useRef, useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { TeamProfilePreview } from "./team-profile-preview";
import { getAssetOverlap } from "@/lib/asset-overlap";
import type { TeamProfile, SponsorshipListing } from "@/lib/types";

type Props = {
  listing: SponsorshipListing;
  team: TeamProfile;
  onSubmit: (fitNote?: string) => Promise<boolean>;
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
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const overlap = getAssetOverlap(listing.requestedAssets, team.sponsorshipAssets);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousActiveElement = document.activeElement as HTMLElement | null;
    modalRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !modalRef.current) return;

      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        event.preventDefault();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousActiveElement?.focus();
    };
  }, [onClose]);

  async function handleSubmit() {
    setLoading(true);
    setError(false);
    try {
      const success = await onSubmit(fitNote.trim() || undefined);
      if (success) {
        setSubmitted(true);
      } else {
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      ref={modalRef}
      tabIndex={-1}
      onClick={(event) => {
        if (event.target === modalRef.current) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 outline-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby="application-modal-title"
    >
      <div
        className="relative mx-4 w-full max-w-lg overflow-hidden rounded-xl shadow-xl"
        style={{ background: "white", border: "0.5px solid #d5d3cd" }}
      >
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: "0.5px solid #d5d3cd" }}
        >
          <h2
            id="application-modal-title"
            style={{ fontSize: 18, fontWeight: 600, color: "#1a1a18" }}
          >
            {submitted ? "Application sent" : `Apply: ${listing.title}`}
          </h2>
          <button onClick={onClose} aria-label="Close" style={{ color: "#6b6960" }}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
          {!submitted ? (
            <div className="space-y-6">
              <TeamProfilePreview team={team} />

              <div>
                <div className="text-xs font-medium uppercase tracking-wider" style={{ color: "#6b6960" }}>
                  Asset overlap
                </div>
                <p className="mt-1 text-sm" style={{ color: "#1a1a18" }}>
                  You offer{" "}
                  <span className="font-semibold">{overlap.matchedCount}</span> of{" "}
                  <span className="font-semibold">{overlap.totalCount}</span>{" "}
                  requested assets
                </p>
                <div className="mt-2 flex items-center space-x-4">
                  <div className="w-3 h-3 bg-green-200 rounded" />
                  <span className="text-xs">Matched</span>
                  <div className="w-3 h-3 bg-gray-200 rounded" />
                  <span className="text-xs">Not matched</span>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full bg-green-500"
                      style={{ width: `${(overlap.matchedCount / overlap.totalCount) * 100}%` }}
                    ></div>
                  </div>
                  <p className="mt-1 text-xs text-center text-muted-foreground">
                    {Math.round((overlap.matchedCount / overlap.totalCount) * 100)}% match
                  </p>
                </div>
                {overlap.totalCount > 0 && (
                  <div className="mt-3 space-y-1">
                    {overlap.items.map((item) => (
                      <div
                        key={item.assetId}
                        className="flex items-center gap-2 px-2 py-1 rounded-sm"
                        style={{
                          background: item.matched
                            ? "rgba(34,197,94,0.1)"
                            : "rgba(239,68,68,0.1)",
                        }}
                      >
                        {item.matched && (
                          <Check className="h-3 w-3 text-green-500" />
                        )}
                        {!item.matched && (
                          <X className="h-3 w-3 text-red-500" />
                        )}
                        <span className="text-sm">{item.label}</span>
                      </div>
                    ))}
                  </div>
                )}
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
                disabled={loading}
                className="w-full"
                style={{
                  background: loading ? "#9ca3af" : "#22c55e",
                  color: "#0a0a0a",
                }}
              >
                {loading ? "Submitting..." : "Send Application"}
              </Button>

              {error && (
                <p className="mt-2 text-center text-sm" style={{ color: "#dc2626" }}>
                  You have already applied to this listing.
                </p>
              )}
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
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}div>
      </div>
    </div>
  );
}
