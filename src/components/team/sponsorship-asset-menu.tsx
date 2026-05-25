"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  { value: "available", label: "Available" },
  { value: "preferred", label: "Preferred" },
  { value: "limited", label: "Limited" },
  { value: "unavailable", label: "Unavailable" },
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
            <div className="mb-3 flex items-center justify-between">
              <h4 className="font-semibold text-foreground">
                {CATEGORY_LABELS[cat]}
              </h4>
              <span className="text-xs text-muted-foreground">
                {selectedCount} selected
              </span>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {assets.map((def) => {
                const sel = getAsset(def.id);
                const isSelected = !!sel;

                return (
                  <div
                    key={def.id}
                    className="rounded-lg border p-3 transition-colors"
                    style={
                      isSelected
                        ? { borderColor: "rgba(26,58,110,0.4)", background: "rgba(26,58,110,0.05)" }
                        : { borderColor: "#d5d3cd", background: "white" }
                    }
                  >
                    <label className="flex cursor-pointer items-start gap-3">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggle(def.id)}
                        disabled={readonly}
                        className="mt-0.5"
                      />
                      <div className="flex-1">
                        <div
                          className={`text-sm ${
                            isSelected ? "font-semibold" : "font-medium"
                          }`}
                        >
                          {def.label}
                        </div>
                        {isSelected && !readonly && (
                          <div className="mt-2 space-y-2">
                            <Select
                              value={sel.status}
                              onValueChange={(v) =>
                                updateStatus(
                                  def.id,
                                  v as SponsorshipAssetStatus
                                )
                              }
                            >
                              <SelectTrigger className="h-8 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {STATUS_OPTIONS.map((opt) => (
                                  <SelectItem
                                    key={opt.value}
                                    value={opt.value}
                                  >
                                    {opt.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Input
                              placeholder="Note (e.g. preferred, hosted events only)"
                              value={sel.notes ?? ""}
                              onChange={(e) =>
                                updateNotes(def.id, e.target.value)
                              }
                              className="h-8 text-xs"
                            />
                          </div>
                        )}
                      </div>
                    </label>
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
