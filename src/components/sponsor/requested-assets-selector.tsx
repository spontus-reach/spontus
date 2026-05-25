"use client";

import { Input } from "@/components/ui/input";
import {
  SPONSORSHIP_ASSET_DEFINITIONS,
  CATEGORY_LABELS,
} from "@/lib/constants";
import type {
  SponsorshipAssetCategory,
  ListingRequestedAsset,
} from "@/lib/types";

type Props = {
  selectedAssets: ListingRequestedAsset[];
  onChange: (assets: ListingRequestedAsset[]) => void;
};

const CATEGORIES: SponsorshipAssetCategory[] = [
  "brand_visibility",
  "social_content",
  "product_event_activation",
];

export function RequestedAssetsSelector({ selectedAssets, onChange }: Props) {
  function getAsset(assetId: string): ListingRequestedAsset | undefined {
    return selectedAssets.find((a) => a.assetId === assetId);
  }

  function toggle(assetId: string) {
    const existing = getAsset(assetId);
    if (existing) {
      onChange(selectedAssets.filter((a) => a.assetId !== assetId));
    } else {
      onChange([...selectedAssets, { assetId, required: false }]);
    }
  }

  function toggleRequired(assetId: string) {
    onChange(
      selectedAssets.map((a) =>
        a.assetId === assetId ? { ...a, required: !a.required } : a
      )
    );
  }

  function updateNotes(assetId: string, notes: string) {
    onChange(
      selectedAssets.map((a) =>
        a.assetId === assetId ? { ...a, notes: notes || undefined } : a
      )
    );
  }

  return (
    <div>
      <h3 style={{ fontSize: 16, fontWeight: 600, color: "#1a1a18" }}>
        What you want in return
      </h3>
      <p className="mt-1 text-sm" style={{ color: "#6b6960" }}>
        Same asset menu teams use. Select what you need and mark required vs
        optional.
      </p>
      <div className="mt-5 space-y-6">
        {CATEGORIES.map((cat) => {
          const assets = SPONSORSHIP_ASSET_DEFINITIONS.filter(
            (a) => a.category === cat
          );
          const selectedCount = assets.filter((a) => getAsset(a.id)).length;

          return (
            <div key={cat}>
              <div className="mb-3 flex items-center justify-between">
                <h4
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
                <span className="text-xs" style={{ color: "#6b6960" }}>
                  {selectedCount} selected
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {assets.map((def) => {
                  const sel = getAsset(def.id);
                  const isSelected = !!sel;

                  return (
                    <button
                      key={def.id}
                      type="button"
                      onClick={() => toggle(def.id)}
                      className="rounded-full border px-3 py-1.5 text-xs transition-colors"
                      style={
                        isSelected
                          ? {
                              borderColor: "#1a3a6e",
                              background: "#1a3a6e",
                              color: "#f0efeb",
                            }
                          : {
                              borderColor: "#b5b3ab",
                              background: "white",
                              color: "#1a1a18",
                            }
                      }
                    >
                      {def.label}
                    </button>
                  );
                })}
              </div>
              {/* Inline controls for selected assets in this category */}
              {assets
                .filter((def) => getAsset(def.id))
                .map((def) => {
                  const sel = getAsset(def.id)!;
                  return (
                    <div
                      key={`ctrl-${def.id}`}
                      className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2"
                      style={{
                        background: "rgba(26,58,110,0.05)",
                        border: "0.5px solid rgba(26,58,110,0.2)",
                      }}
                    >
                      <span
                        className="min-w-0 flex-1 truncate text-xs font-medium"
                        style={{ color: "#1a1a18" }}
                      >
                        {def.label}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleRequired(def.id)}
                        className="rounded-full px-2 py-0.5 text-[10px] font-medium transition-colors"
                        style={
                          sel.required
                            ? {
                                background: "#1a3a6e",
                                color: "#f0efeb",
                              }
                            : {
                                background: "#e8e6e0",
                                color: "#6b6960",
                              }
                        }
                      >
                        {sel.required ? "Required" : "Optional"}
                      </button>
                      <Input
                        aria-label={`${def.label} note`}
                        placeholder="Note"
                        value={sel.notes ?? ""}
                        onChange={(e) => updateNotes(def.id, e.target.value)}
                        className="h-7 max-w-[180px] text-[11px]"
                      />
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
