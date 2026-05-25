"use client";

import { Button } from "@/components/ui/button";
import type { VerificationStatus } from "@/lib/types";

type Props = {
  currentStatus: VerificationStatus;
  onVerify: () => void;
  onNeedsChanges: () => void;
  onSuspend: () => void;
};

export function VerificationActions({
  currentStatus,
  onVerify,
  onNeedsChanges,
  onSuspend,
}: Props) {
  return (
    <div className="space-y-2">
      <Button
        className="w-full"
        disabled={currentStatus === "verified"}
        onClick={onVerify}
        style={
          currentStatus === "verified"
            ? { opacity: 0.4 }
            : { background: "#22c55e", color: "#0a0a0a" }
        }
      >
        {currentStatus === "verified" ? "Already verified" : "Verify"}
      </Button>
      <Button
        variant="outline"
        className="w-full"
        disabled={currentStatus === "needs_changes"}
        onClick={onNeedsChanges}
        style={{ borderColor: "#d5d3cd" }}
      >
        Needs changes
      </Button>
      <Button
        variant="outline"
        className="w-full"
        disabled={currentStatus === "suspended"}
        onClick={onSuspend}
        style={{ borderColor: "#d5d3cd", color: "#dc2626" }}
      >
        Suspend
      </Button>
    </div>
  );
}
