"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  teamName: string;
  onConfirm: () => void;
  onClose: () => void;
};

export function AcceptApplicationModal({
  teamName,
  onConfirm,
  onClose,
}: Props) {
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
          Accept application
        </h2>
        <p className="mt-3 text-sm" style={{ color: "#6b6960" }}>
          Accept the application from <strong>{teamName}</strong>? This does not
          create a contract yet. Deal setup will come in a later workflow.
        </p>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            style={{ background: "#22c55e", color: "#0a0a0a" }}
          >
            Accept application
          </Button>
        </div>
      </div>
    </div>
  );
}
