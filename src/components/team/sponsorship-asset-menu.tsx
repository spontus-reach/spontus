"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  SPONSORSHIP_ASSET_DEFINITIONS,
  CATEGORY_LABELS,
} from "@/lib/constants";
import type {
  SponsorshipAssetCategory,
  SponsorshipAssetStatus,
  TeamSponsorshipAsset,
} from "@/lib/types";

type Props = {
  selectedAssets: TeamSponsorshipAsset[];
  onChange: (assets: TeamSponsorshipAsset[]) => void;
  readonly?: boolean;
};

const STATUS_OPTIONS: { value: SponsorshipAssetStatus; label: string }[] = [
  { value: "available", label: "Available", color: "#6b7280" }, // Gray
  { value: "preferred", label: "Preferred", color: "#10b981" }, // Green
  { value: "limited", label: "Limited", color: "#f59e0b" }, // Amber
  { value: "unavailable", label: "Unavailable", color: "#ef4444" }, // Red
];

const CATEGORIES: SponsorshipAssetCategory[] = [
  "brand_visibility",
  "social_content",
  "product_event_activation",
];

export function SponsorshipAssetMenu({
  selectedAssets,
  onChange,
  readonly,
}: Props) {
  function getAsset(assetId: string): TeamSponsorshipAsset | undefined {
    return selectedAssets.find((a) => a.assetId === assetId);
  }

  function toggle(assetId: string) {
    if (readonly) return;
    const existing = getAsset(assetId);
    if (existing) {
      onChange(selectedAssets.filter((a) => a.assetId !== assetId));
    } else {
      onChange([...selectedAssets, { assetId, status: "available" }]);
    }
  }

  function updateStatus(assetId: string, status: SponsorshipAssetStatus) {
    if (readonly) return;
    onChange(
      selectedAssets.map((a) =>
        a.assetId === assetId ? { ...a, status } : a
      )
    );
  }

  function updateNotes(assetId: string, notes: string) {
    if (readonly) return;
    onChange(
      selectedAssets.map((a) =>
        a.assetId === assetId ? { ...a, notes: notes || undefined } : a
      )
    );
  }

  return (
    <div className="space-y-6">
      {CATEGORIES.map((cat) => {
        const assets = SPONSORSHIP_ASSET_DEFINITIONS.filter(
          (a) => a.category === cat
        );
        const selectedCount = assets.filter((a) => getAsset(a.id)).length;

        return (
          <div key={cat}>
            <div className="mb-4 flex items-center justify-between">
              <h4 className="font-semibold text-foreground">
                {CATEGORY_LABELS[cat]}
              </h4>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded bg-gray-200" />
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded bg-green-200" />
                  <span>Preferred</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded bg-amber-200" />
                  <span>Limited</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded bg-red-200" />
                  <span>Unavailable</span>
                </div>
                <span className="ml-4">{selectedCount} selected</span>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {assets.map((def) => {
                const sel = getAsset(def.id);
                const isSelected = !!sel;
                const statusConfig = STATUS_OPTIONS.find(
                  (s) => s.value === sel?.status
                ) || STATUS_OPTIONS[0];

                return (
                  <div
                    key={def.id}
                    className="relative group rounded-lg border p-4 transition-all hover:shadow-md"
                    style={{
                      borderColor:
                        sel?.status === "available"
                          ? "#d5d3cd"
                          : sel?.status === "preferred"
                            ? "#10b981"
                            : sel?.status === "limited"
                              ? "#f59e0b"
                              : "#ef4444",
                      backgroundColor:
                        sel?.status === "available"
                          ? "white"
                          : sel?.status === "preferred"
                            ? "rgba(16,185,129,0.05)"
                            : sel?.status === "limited"
                              ? "rgba(245,158,11,0.05)"
                              : "rgba(238,68,68,0.05)",
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggle(def.id)}
                          disabled={readonly}
                          className="mt-1"
                        />
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-foreground">
                            {def.label}
                          </h3>
                          {isSelected && !readonly && (
                            <button
                              type="button"
                              onClick={() => toggle(def.id)}
                              className="text-sm text-muted-foreground hover:text-accent/80 p-1 rounded"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {def.description || ""}
                        </p>
                        {isSelected && !readonly && (
                          <div className="space-y-3 pt-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-muted-foreground">
                                Status:
                              </span>
                              <Select
                                value={sel.status}
                                onValueChange={(v) =>
                                  updateStatus(
                                    def.id,
                                    v as SponsorshipAssetStatus
                                  )
                                }
                                className="w-full"
                              >
                                <SelectTrigger className="h-9 text-xs">
                                  <SelectValue className="text-left truncate" />
                                </SelectTrigger>
                                <SelectContent>
                                  {STATUS_OPTIONS.map((option) => (
                                    <Split>
                                      <span className="w-1/2 text-left pl-0">
                                        {option.label}
                                      </span>
                                      <span
                                        className="w-1/2 text-right pr-0"
                                        style={{ color: option.color }}
                                      >
                                        ●
                                      </span>
                                    </Split>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Input
                                placeholder="Add optional notes..."
                                value={sel.notes ?? ""}
                                onChange={(e) =>
                                  updateNotes(def.id, e.target.value)
                                }
                                className="h-9 text-xs"
                              />
                            </div>
                        )}
                      </div>
                    </div>
                    {!isSelected && readonly && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-xs text-muted-foreground text-center px-3">
                          Login to edit
                        </div>
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

// Helper component for split text alignment
function Split({ children }: { children: React.ReactNode }) {
  return <div className="flex w-full justify-between">{children}</div>;
}
