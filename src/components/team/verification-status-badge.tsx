import { VERIFICATION_STATUS_LABELS } from "@/lib/constants";
import type { VerificationStatus } from "@/lib/types";

const statusStyles: Record<VerificationStatus, { bg: string; text: string; border: string }> = {
  draft: { bg: "#e8e6e0", text: "#6b6960", border: "#d5d3cd" },
  submitted_for_verification: { bg: "#fef3c7", text: "#92400e", border: "#fcd34d" },
  verified: { bg: "rgba(34,197,94,0.15)", text: "#16a34a", border: "rgba(34,197,94,0.3)" },
  needs_changes: { bg: "#fed7aa", text: "#c2410c", border: "#fb923c" },
  suspended: { bg: "#fecaca", text: "#dc2626", border: "#f87171" },
};

export function VerificationStatusBadge({
  status,
}: {
  status: VerificationStatus;
}) {
  const s = statusStyles[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium"
      style={{ background: s.bg, color: s.text, border: `0.5px solid ${s.border}` }}
    >
      {status === "verified" && (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 1l2.5 2.5L18 3l1 3.5L22 8l-1.5 3.5L22 15l-3 1.5L18 20l-3.5-.5L12 22l-2.5-2.5L6 20l-1-3.5L2 15l1.5-3.5L2 8l3-1.5L6 3l3.5.5z" />
        </svg>
      )}
      {VERIFICATION_STATUS_LABELS[status] ?? status}
    </span>
  );
}
