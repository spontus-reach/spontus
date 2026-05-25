"use client";

import { Input } from "@/components/ui/input";
import { Field } from "@/components/team/form-field";
import { ImageIcon } from "lucide-react";
import type { TeamProfileDraft } from "@/lib/types";

type Props = {
  data: Pick<TeamProfileDraft, "photo">;
  onUpdate: (patch: Partial<TeamProfileDraft>) => void;
};

export function MediaUploadForm({ data, onUpdate }: Props) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Upload 3-6 photos that show your team&apos;s vibe and scale. For now,
        paste a URL or use the placeholder.
      </p>

      <Field label="Team photo URL">
        <Input
          value={data.photo ?? ""}
          onChange={(e) => onUpdate({ photo: e.target.value })}
          placeholder="https://images.unsplash.com/..."
        />
      </Field>

      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="flex aspect-square items-center justify-center rounded-lg border border-dashed border-border text-muted-foreground"
          >
            <div className="flex flex-col items-center gap-1">
              <ImageIcon className="h-5 w-5" />
              <span className="text-[10px]">Photo {i}</span>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        Teams with 5+ photos get 3x more sponsor interest. Real file upload
        coming in a future slice.
      </p>
    </div>
  );
}
