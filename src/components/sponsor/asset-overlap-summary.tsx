import { Check } from "lucide-react";
import type { AssetOverlapResult } from "@/lib/asset-overlap";

export function AssetOverlapSummary({
  overlap,
  compact,
}: {
  overlap: AssetOverlapResult;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <span className="text-xs" style={{ color: "#16a34a" }}>
        Offers {overlap.matchedCount} of {overlap.totalCount}
      </span>
    );
  }

  return (
    <div>
      <p className="text-sm" style={{ color: "#1a1a18" }}>
        This team offers{" "}
        <span className="font-semibold">{overlap.matchedCount}</span> of{" "}
        <span className="font-semibold">{overlap.totalCount}</span> requested
        assets
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
            {item.matched && <Check className="h-2.5 w-2.5" />}
            {item.label}
            {item.required && (
              <span className="text-[10px] opacity-60">required</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
