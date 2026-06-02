import {
  SPONSORSHIP_ASSET_DEFINITIONS,
  CATEGORY_LABELS,
} from "@/lib/constants";
import type {
  TeamSponsorshipAsset,
  SponsorshipAssetCategory,
  SponsorshipAssetStatus,
} from "@/lib/types";

const CATEGORIES: SponsorshipAssetCategory[] = [
  "brand_visibility",
  "social_content",
  "product_event_activation",
];

const statusStyles: Record<
  SponsorshipAssetStatus,
  { bg: string; text: string; border: string }
> = {
  preferred: { bg: "rgba(26,58,110,0.08)", text: "#1a3a6e", border: "rgba(26,58,110,0.3)" },
  available: { bg: "white", text: "#1a1a18", border: "#d5d3cd" },
  limited: { bg: "#fef3c7", text: "#92400e", border: "#fcd34d" },
  unavailable: { bg: "#fecaca", text: "#dc2626", border: "#f87171" },
};

export function AssetGrid({ assets }: { assets: TeamSponsorshipAsset[] }) {
  return (
    <div className="space-y-5">
      {CATEGORIES.map((cat) => {
        const catAssets = assets.filter((a) => {
          const def = SPONSORSHIP_ASSET_DEFINITIONS.find(
            (d) => d.id === a.assetId
          );
          return def?.category === cat;
        });

        if (catAssets.length === 0) return null;

        return (
          <div key={cat}>
            <h4
              className="mb-2"
              style={{
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#6b6960",
              }}
            >
              {CATEGORY_LABELS[cat]}
            </h4>
            <div className="flex flex-wrap gap-2">
              {catAssets.map((a) => {
                const def = SPONSORSHIP_ASSET_DEFINITIONS.find(
                  (d) => d.id === a.assetId
                );
                if (!def) return null;
                const s = statusStyles[a.status];

                return (
                  <div
                    key={a.assetId}
                    className="group relative rounded-md px-2.5 py-1 text-xs"
                    style={{
                      background: s.bg,
                      color: s.text,
                      border: `0.5px solid ${s.border}`,
                      textDecoration: a.status === "unavailable" ? "line-through" : undefined,
                    }}
                  >
                    {def.label}
                    {a.status === "preferred" && (
                      <span className="ml-1 opacity-60">&#9733;</span>
                    )}
                    {a.notes && (
                      <div
                        className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 hidden -translate-x-1/2 whitespace-nowrap rounded-md px-3 py-2 text-xs shadow-lg group-hover:block"
                        style={{
                          background: "white",
                          color: "#6b6960",
                          border: "0.5px solid #d5d3cd",
                        }}
                      >
                        {a.notes}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
