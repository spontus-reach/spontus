"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/components/forms/form-field";
import { DEAL_TYPES } from "@/lib/constants";
import type { ListingDraft } from "@/lib/types";

type Props = {
  data: Pick<ListingDraft, "offerTypes" | "offerSummary">;
  onUpdate: (patch: Partial<ListingDraft>) => void;
};

function toggleInList(list: string[], item: string): string[] {
  return list.includes(item)
    ? list.filter((i) => i !== item)
    : [...list, item];
}

export function OfferTypeSelector({ data, onUpdate }: Props) {
  const selected = data.offerTypes ?? [];

  return (
    <div>
      <h3 style={{ fontSize: 16, fontWeight: 600, color: "#1a1a18" }}>
        What you&apos;re offering
      </h3>
      <p className="mt-1 text-sm" style={{ color: "#6b6960" }}>
        Pick all that apply.
      </p>
      <div className="mt-4 grid gap-2 md:grid-cols-2">
        {DEAL_TYPES.map((dt) => (
          <label
            key={dt}
            className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-[#e8e6e0]"
            style={{ border: "0.5px solid #d5d3cd" }}
          >
            <Checkbox
              checked={selected.includes(dt)}
              onCheckedChange={() =>
                onUpdate({ offerTypes: toggleInList(selected, dt) })
              }
            />
            {dt}
          </label>
        ))}
      </div>
      <div className="mt-4">
        <Field label="Offer details (specifics)">
          <Textarea
            rows={2}
            value={data.offerSummary ?? ""}
            onChange={(e) => onUpdate({ offerSummary: e.target.value })}
            placeholder="e.g. Product allocation (6-month supply per athlete) + $300 cash per team"
          />
        </Field>
      </div>
    </div>
  );
}
