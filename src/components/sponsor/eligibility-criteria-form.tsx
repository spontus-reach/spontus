"use client";

import { Input } from "@/components/ui/input";
import { Field } from "@/components/forms/form-field";
import { optionalInteger } from "@/lib/form-values";
import type { ListingDraft } from "@/lib/types";

type Props = {
  data: Pick<
    ListingDraft,
    | "geography"
    | "sportPreferences"
    | "teamSizeMin"
    | "socialReachMin"
    | "duration"
    | "applicationDeadline"
  >;
  onUpdate: (patch: Partial<ListingDraft>) => void;
};

export function EligibilityCriteriaForm({ data, onUpdate }: Props) {
  return (
    <div>
      <h3 style={{ fontSize: 16, fontWeight: 600, color: "#1a1a18" }}>
        Targeting
      </h3>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Field label="Geography">
          <Input
            value={data.geography ?? ""}
            onChange={(e) => onUpdate({ geography: e.target.value })}
            placeholder="California"
          />
        </Field>
        <Field label="Sport preferences">
          <Input
            value={(data.sportPreferences ?? []).join(", ")}
            onChange={(e) =>
              onUpdate({
                sportPreferences: e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean),
              })
            }
            placeholder="Endurance: tri, cycling, run"
          />
        </Field>
        <Field label="Team size minimum">
          <Input
            type="number"
            value={data.teamSizeMin ?? ""}
            onChange={(e) =>
              onUpdate({
                teamSizeMin: optionalInteger(e.target.value),
              })
            }
            placeholder="30"
          />
        </Field>
        <Field label="Social reach minimum">
          <Input
            type="number"
            value={data.socialReachMin ?? ""}
            onChange={(e) =>
              onUpdate({
                socialReachMin: optionalInteger(e.target.value),
              })
            }
            placeholder="1000"
          />
        </Field>
        <Field label="Duration">
          <Input
            value={data.duration ?? ""}
            onChange={(e) => onUpdate({ duration: e.target.value })}
            placeholder="One season (Fall 2026)"
          />
        </Field>
        <Field label="Application deadline">
          <Input
            type="date"
            value={data.applicationDeadline ?? ""}
            onChange={(e) =>
              onUpdate({ applicationDeadline: e.target.value })
            }
          />
        </Field>
      </div>
    </div>
  );
}
