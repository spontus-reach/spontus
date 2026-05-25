"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { VerificationStatus } from "@/lib/types";

type DecisionType = "verify" | "needs_changes" | "suspend";

const CONFIG: Record<
  DecisionType,
  {
    title: string;
    description: string;
    placeholder: string;
    noteRequired: boolean;
    confirmLabel: string;
    confirmColor: string;
    status: VerificationStatus;
  }
> = {
  verify: {
    title: "Verify profile",
    description:
      "This team or sponsor will be allowed to participate in the marketplace.",
    placeholder: "Optional note about this verification decision...",
    noteRequired: false,
    confirmLabel: "Verify profile",
    confirmColor: "#22c55e",
    status: "verified",
  },
  needs_changes: {
    title: "Request changes",
    description:
      "The profile owner will see that changes are needed before verification.",
    placeholder: "What needs to be fixed before this profile can be verified?",
    noteRequired: true,
    confirmLabel: "Request changes",
    confirmColor: "#d97706",
    status: "needs_changes",
  },
  suspend: {
    title: "Suspend profile",
    description:
      "This profile will be blocked from marketplace participation.",
    placeholder: "Why is this profile being suspended?",
    noteRequired: true,
    confirmLabel: "Suspend profile",
    confirmColor: "#dc2626",
    status: "suspended",
  },
};

type Props = {
  decisionType: DecisionType;
  entityName: string;
  onConfirm: (status: VerificationStatus, note?: string) => void;
  onClose: () => void;
};

export function VerificationDecisionModal({
  decisionType,
  entityName,
  onConfirm,
  onClose,
}: Props) {
  const [note, setNote] = useState("");
  const config = CONFIG[decisionType];
  const canConfirm = !config.noteRequired || note.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        className="relative mx-4 w-full max-w-md rounded-xl p-6 shadow-xl"
        style={{ background: "white", border: "0.5px solid #d5d3cd" }}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4"
          style={{ color: "#6b6960" }}
        >
          <X className="h-5 w-5" />
        </button>

        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1a1a18" }}>
          {config.title}
        </h2>
        <p className="mt-2 text-sm" style={{ color: "#6b6960" }}>
          {config.description}
        </p>
        <p className="mt-1 text-sm font-medium" style={{ color: "#1a1a18" }}>
          {entityName}
        </p>

        <div className="mt-4">
          <Textarea
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={config.placeholder}
          />
          {config.noteRequired && !note.trim() && (
            <p className="mt-1 text-xs" style={{ color: "#dc2626" }}>
              A note is required for this action.
            </p>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            disabled={!canConfirm}
            onClick={() =>
              onConfirm(config.status, note.trim() || undefined)
            }
            className="disabled:opacity-40"
            style={{ background: config.confirmColor, color: "white" }}
          >
            {config.confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
