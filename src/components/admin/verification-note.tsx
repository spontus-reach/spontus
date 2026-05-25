"use client";

import type { VerificationReviewNote } from "@/lib/types";

export function VerificationNote({
  note,
}: {
  note: VerificationReviewNote | undefined;
}) {
  if (!note) return null;

  return (
    <div
      className="rounded-lg p-3"
      style={{ background: "#f0efeb", border: "0.5px solid #d5d3cd" }}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "#6b6960" }}>
          Latest review
        </span>
        <span className="text-[10px]" style={{ color: "#8a8880" }}>
          {note.reviewedAt} by {note.reviewedBy}
        </span>
      </div>
      {note.note && (
        <p className="mt-2 text-xs" style={{ color: "#1a1a18" }}>
          {note.note}
        </p>
      )}
    </div>
  );
}
