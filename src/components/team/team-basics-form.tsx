"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/components/forms/form-field";
import { optionalInteger } from "@/lib/form-values";
import type { TeamProfileDraft } from "@/lib/types";

type Props = {
  data: Pick<
    TeamProfileDraft,
    | "name"
    | "university"
    | "sport"
    | "location"
    | "rosterSize"
    | "yearFounded"
    | "oneLiner"
  >;
  onUpdate: (patch: Partial<TeamProfileDraft>) => void;
};

export function TeamBasicsForm({ data, onUpdate }: Props) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Team name">
          <Input
            value={data.name ?? ""}
            onChange={(e) => onUpdate({ name: e.target.value })}
            placeholder="Cal Poly Triathlon"
          />
        </Field>
        <Field label="Sport">
          <Input
            value={data.sport ?? ""}
            onChange={(e) => onUpdate({ sport: e.target.value })}
            placeholder="Triathlon"
          />
        </Field>
        <Field label="University">
          <Input
            value={data.university ?? ""}
            onChange={(e) => onUpdate({ university: e.target.value })}
            placeholder="Cal Poly San Luis Obispo"
          />
        </Field>
        <Field label="Location">
          <Input
            value={data.location ?? ""}
            onChange={(e) => onUpdate({ location: e.target.value })}
            placeholder="San Luis Obispo, CA"
          />
        </Field>
        <Field label="Roster size">
          <Input
            type="number"
            value={data.rosterSize ?? ""}
            onChange={(e) =>
              onUpdate({ rosterSize: optionalInteger(e.target.value) })
            }
            placeholder="80"
          />
        </Field>
        <Field label="Year founded">
          <Input
            type="number"
            value={data.yearFounded ?? ""}
            onChange={(e) =>
              onUpdate({ yearFounded: optionalInteger(e.target.value) })
            }
            placeholder="2005"
          />
        </Field>
      </div>
      <Field label="One-line description">
        <Textarea
          rows={2}
          value={data.oneLiner ?? ""}
          onChange={(e) => onUpdate({ oneLiner: e.target.value })}
          placeholder="Cal Poly's largest club sport — 80 athletes competing at collegiate nationals..."
        />
      </Field>
    </div>
  );
}
