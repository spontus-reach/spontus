"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { TeamProfileDraft } from "@/lib/types";

type Props = {
  data: Pick<
    TeamProfileDraft,
    | "instagramUrl"
    | "tiktokUrl"
    | "youtubeUrl"
    | "livestreamUrl"
    | "websiteUrl"
    | "combinedReach"
  >;
  onUpdate: (patch: Partial<TeamProfileDraft>) => void;
};

export function SocialReachForm({ data, onUpdate }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Field label="Instagram URL">
        <Input
          value={data.instagramUrl ?? ""}
          onChange={(e) => onUpdate({ instagramUrl: e.target.value })}
          placeholder="https://instagram.com/calpolytriathlon"
        />
      </Field>
      <Field label="TikTok URL">
        <Input
          value={data.tiktokUrl ?? ""}
          onChange={(e) => onUpdate({ tiktokUrl: e.target.value })}
          placeholder="https://tiktok.com/@calpolytri"
        />
      </Field>
      <Field label="YouTube / Livestream URL">
        <Input
          value={data.youtubeUrl ?? data.livestreamUrl ?? ""}
          onChange={(e) => onUpdate({ youtubeUrl: e.target.value })}
          placeholder="https://youtube.com/@calpolytri"
        />
      </Field>
      <Field label="Website URL">
        <Input
          value={data.websiteUrl ?? ""}
          onChange={(e) => onUpdate({ websiteUrl: e.target.value })}
          placeholder="https://calpolytriathlon.com"
        />
      </Field>
      <Field label="Combined reach / followers (self-reported)">
        <Input
          type="number"
          value={data.combinedReach ?? ""}
          onChange={(e) =>
            onUpdate({
              combinedReach: parseInt(e.target.value) || undefined,
            })
          }
          placeholder="8000"
        />
      </Field>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label className="mb-1.5 block text-sm">{label}</Label>
      {children}
    </div>
  );
}
