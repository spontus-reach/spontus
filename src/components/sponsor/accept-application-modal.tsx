"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  teamName: string;
  onConfirm: () => void;
  onClose: () => void;
  error?: string | null;
};

export function AcceptApplicationModal({
  teamName,
  onConfirm,
  onClose,
  error,
}: Props) {
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
      previousActiveElement?.focus();
    };
  }, [onClose]);

  return (
    <div
      ref={modalRef}
      tabIndex={-1}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 outline-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby="accept-modal-title"
      onClick={(e) => {
        if (e.target === modalRef.current) onClose();
      }}
    >
      <div
        className="relative mx-4 w-full max-w-md rounded-xl p-6 shadow-xl"
        style={{ background: "white", border: "0.5px solid #d5d3cd" }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4"
          style={{ color: "#6b6960" }}
        >
          <X className="h-5 w-5" />
        </button>

        <h2
          id="accept-modal-title"
          style={{ fontSize: 18, fontWeight: 600, color: "#1a1a18" }}
        >
          Accept application
        </h2>
        <p className="mt-3 text-sm" style={{ color: "#6b6960" }}>
          Accept the application from <strong>{teamName}</strong>? This does not
          create a contract yet. Deal setup will come in a later workflow.
        </p>

        {error && (
          <div
            className="mt-3 rounded-lg px-3 py-2 text-sm"
            style={{ background: "#fef2f2", color: "#dc2626" }}
          >
            {error}
          </div>
        )}

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
