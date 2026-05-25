"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  PREFERRED_SPONSOR_CATEGORIES,
  EXCLUDED_SPONSOR_CATEGORIES,
  DEAL_TYPES,
} from "@/lib/constants";
import type { TeamProfileDraft } from "@/lib/types";

type Props = {
  data: Pick<
    TeamProfileDraft,
    | "preferredSponsorCategories"
    | "excludedSponsorCategories"
    | "dealTypesInterestedIn"
  >;
  onUpdate: (patch: Partial<TeamProfileDraft>) => void;
};

function toggleInList(list: string[], item: string): string[] {
  return list.includes(item)
    ? list.filter((i) => i !== item)
    : [...list, item];
}

export function LookingForForm({ data, onUpdate }: Props) {
  const preferred = data.preferredSponsorCategories ?? [];
  const excluded = data.excludedSponsorCategories ?? [];
  const dealTypes = data.dealTypesInterestedIn ?? [];

  return (
    <div className="space-y-6">
      <div>
        <Label className="mb-3 block text-sm font-semibold">
          Preferred sponsor categories
        </Label>
        <div className="grid gap-2 md:grid-cols-2">
          {PREFERRED_SPONSOR_CATEGORIES.map((cat) => (
            <label
              key={cat}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5 text-sm transition-colors hover:border-foreground/20"
            >
              <Checkbox
                checked={preferred.includes(cat)}
                onCheckedChange={() =>
                  onUpdate({
                    preferredSponsorCategories: toggleInList(preferred, cat),
                  })
                }
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      <div>
        <Label className="mb-3 block text-sm font-semibold">
          Categories you don&apos;t want
        </Label>
        <div className="grid gap-2 md:grid-cols-2">
          {EXCLUDED_SPONSOR_CATEGORIES.map((cat) => (
            <label
              key={cat}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5 text-sm transition-colors hover:border-foreground/20"
            >
              <Checkbox
                checked={excluded.includes(cat)}
                onCheckedChange={() =>
                  onUpdate({
                    excludedSponsorCategories: toggleInList(excluded, cat),
                  })
                }
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      <div>
        <Label className="mb-3 block text-sm font-semibold">
          Deal types you&apos;re interested in
        </Label>
        <div className="grid gap-2 md:grid-cols-2">
          {DEAL_TYPES.map((dt) => (
            <label
              key={dt}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5 text-sm transition-colors hover:border-foreground/20"
            >
              <Checkbox
                checked={dealTypes.includes(dt)}
                onCheckedChange={() =>
                  onUpdate({
                    dealTypesInterestedIn: toggleInList(dealTypes, dt),
                  })
                }
              />
              {dt}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
