"use client";

import type { VerificationReviewNote } from "@/lib/types";

export function VerificationNote({
  notes,
}: {
  notes: VerificationReviewNote[];
}) {
  if (notes.length === 0) return null;

  return (
    <>
      {notes.map((note) => (
        <div
          key={note.id}
          className="rounded-lg p-3 mb-3"
          style={{ background: "#f0efeb", border: "0.5px solid #d5d3cd" }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "#6b6960" }}>
              Reviewed
            </span>
            <span className="text-[10px]" style={{ color: "#8a8880" }}>
              {note.reviewedAt} by {note.reviewedBy}
            </span>
          </div>
          {note.note && (
            <p className="text-xs" style={{ color: "#1a1a18" }}>
              {note.note}
            </p>
          )}
        </div>
      ))}
    </>
  );
}
