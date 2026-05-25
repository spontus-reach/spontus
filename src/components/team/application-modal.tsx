"use client";

import { useState, useEffect, useRef } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { TeamProfilePreview } from "./team-profile-preview";
import { getAssetOverlap } from "@/lib/asset-overlap";
import type { TeamProfile, SponsorshipListing } from "@/lib/types";

type Props = {
  listing: SponsorshipListing;
  team: TeamProfile;
  onSubmit: (fitNote?: string) => boolean;
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
  const overlap = getAssetOverlap(listing.requestedAssets, team.sponsorshipAssets);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousActiveElement = document.activeElement as HTMLElement | null;
    modalRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (previousActiveElement) {
        previousActiveElement.focus();
      }
    };
  }, [onClose]);

  function handleSubmit() {
    const success = onSubmit(fitNote.trim() || undefined);
    if (success) {
      setSubmitted(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  return (
    <div
      ref={modalRef}
      tabIndex={-1}
      onClick={(e) => {
        if (e.target === modalRef.current) {
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
          <button
            onClick={onClose}
            aria-label="Close"
            style={{ color: "#6b6960" }}
          >
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
                  <span className="font-semibold">{overlap.matchedCount}</span> of{" "}
                  <span className="font-semibold">{overlap.totalCount}</span>{" "}
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

              {error && (
                <p className="text-center text-sm" style={{ color: "#dc2626" }}>
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
}
