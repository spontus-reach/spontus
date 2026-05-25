"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DECLINE_REASONS } from "@/lib/constants";
import type { DeclineReason } from "@/lib/types";

type Props = {
  teamName: string;
  onConfirm: (reason: DeclineReason) => void;
  onClose: () => void;
};

export function DeclineReasonModal({ teamName, onConfirm, onClose }: Props) {
  const [selected, setSelected] = useState<DeclineReason | "">("");

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
          Decline application
        </h2>
        <p className="mt-2 text-sm" style={{ color: "#6b6960" }}>
          Decline the application from <strong>{teamName}</strong>? Select a
          reason.
        </p>

        <div className="mt-4 flex flex-col gap-1.5">
          {DECLINE_REASONS.map((r) => (
            <button
              key={r.value}
              onClick={() => setSelected(r.value as DeclineReason)}
              className="rounded-md px-3 py-2 text-left text-sm transition-colors"
              style={
                selected === r.value
                  ? {
                      background: "rgba(26,58,110,0.08)",
                      color: "#1a3a6e",
                      border: "0.5px solid rgba(26,58,110,0.3)",
                    }
                  : {
                      color: "#6b6960",
                      border: "0.5px solid transparent",
                    }
              }
            >
              {r.label}
            </button>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            disabled={!selected}
            onClick={() => selected && onConfirm(selected)}
            className="disabled:opacity-40"
            style={{ background: "#dc2626", color: "white" }}
          >
            Decline application
          </Button>
        </div>
      </div>
    </div>
  );
}
