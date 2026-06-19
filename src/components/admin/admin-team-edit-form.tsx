"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { VerificationStatusBadge } from "@/components/team/verification-status-badge";
import { useVerification } from "@/components/providers/verification-provider";
import type { TeamProfile, VerificationStatus } from "@/lib/types";

const STATUSES: VerificationStatus[] = [
  "draft",
  "submitted_for_verification",
  "verified",
  "needs_changes",
  "suspended",
];

type AdminTeamEditFormProps = {
  team: TeamProfile;
};

export function AdminTeamEditForm({ team }: AdminTeamEditFormProps) {
  const router = useRouter();
  const { updateTeamProfile } = useVerification();
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    name: team.name,
    university: team.university,
    sport: team.sport,
    location: team.location ?? "",
    rosterSize: String(team.rosterSize ?? 0),
    oneLiner: team.oneLiner ?? "",
    description: team.description ?? "",
    photo: team.photo ?? "",
    combinedReach: team.combinedReach ? String(team.combinedReach) : "",
    instagramUrl: team.instagramUrl ?? "",
    pastSponsors: team.pastSponsors.join(", "),
    verificationStatus: team.verificationStatus,
  });

  const previewUrl = useMemo(
    () => `/teams/${team.slug}`,
    [team.slug]
  );

  function updateField<K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K]
  ) {
    setSaved(false);
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    updateTeamProfile(team.id, {
      name: form.name.trim(),
      university: form.university.trim(),
      sport: form.sport.trim(),
      location: form.location.trim(),
      rosterSize: Number(form.rosterSize) || 0,
      oneLiner: form.oneLiner.trim(),
      description: form.description.trim(),
      photo: form.photo.trim() || undefined,
      combinedReach: form.combinedReach
        ? Number(form.combinedReach.replace(/,/g, ""))
        : undefined,
      instagramUrl: form.instagramUrl.trim() || undefined,
      pastSponsors: form.pastSponsors
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      verificationStatus: form.verificationStatus,
      socialLinks:
        form.instagramUrl.trim() && form.combinedReach
          ? [
              {
                platform: "Instagram",
                url: form.instagramUrl.trim(),
                followerCount: Number(form.combinedReach.replace(/,/g, "")),
              },
            ]
          : team.socialLinks,
    });
    setSaved(true);
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold text-[#1a1a18]">{team.name}</h1>
          <VerificationStatusBadge status={form.verificationStatus} />
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/admin/verification">
            <Button type="button" variant="outline">
              Verification queue
            </Button>
          </Link>
          <Link href={previewUrl} target="_blank">
            <Button type="button" variant="outline">
              View public profile
            </Button>
          </Link>
        </div>
      </div>

      <Card className="p-6" style={{ border: "0.5px solid #d5d3cd" }}>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Team name">
            <Input
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              required
            />
          </Field>
          <Field label="University">
            <Input
              value={form.university}
              onChange={(e) => updateField("university", e.target.value)}
              required
            />
          </Field>
          <Field label="Sport">
            <Input
              value={form.sport}
              onChange={(e) => updateField("sport", e.target.value)}
              required
            />
          </Field>
          <Field label="Location">
            <Input
              value={form.location}
              onChange={(e) => updateField("location", e.target.value)}
            />
          </Field>
          <Field label="Roster size">
            <Input
              type="number"
              min={0}
              value={form.rosterSize}
              onChange={(e) => updateField("rosterSize", e.target.value)}
            />
          </Field>
          <Field label="Combined reach">
            <Input
              value={form.combinedReach}
              onChange={(e) => updateField("combinedReach", e.target.value)}
              placeholder="8000"
            />
          </Field>
          <Field label="Verification status">
            <select
              className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"
              value={form.verificationStatus}
              onChange={(e) =>
                updateField(
                  "verificationStatus",
                  e.target.value as VerificationStatus
                )
              }
            >
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Instagram URL">
            <Input
              value={form.instagramUrl}
              onChange={(e) => updateField("instagramUrl", e.target.value)}
              placeholder="https://instagram.com/..."
            />
          </Field>
        </div>

        <div className="mt-4 space-y-4">
          <Field label="Hero image URL">
            <Input
              value={form.photo}
              onChange={(e) => updateField("photo", e.target.value)}
              placeholder="https://images.unsplash.com/..."
            />
            {form.photo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={form.photo}
                alt={`${form.name} preview`}
                className="mt-2 h-40 w-full max-w-md rounded-lg object-cover"
              />
            )}
          </Field>
          <Field label="One-liner">
            <Input
              value={form.oneLiner}
              onChange={(e) => updateField("oneLiner", e.target.value)}
            />
          </Field>
          <Field label="About / description">
            <textarea
              className="min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
            />
          </Field>
          <Field label="Past sponsors (comma-separated)">
            <Input
              value={form.pastSponsors}
              onChange={(e) => updateField("pastSponsors", e.target.value)}
              placeholder="GU Energy, Path Projects, ..."
            />
          </Field>
        </div>
      </Card>

      <div className="flex items-center gap-3">
        <Button type="submit" style={{ background: "#1a3a6e", color: "#f0efeb" }}>
          Save changes
        </Button>
        {saved && (
          <span className="text-sm text-[#0F6E56]">
            Saved — open public profile to preview.
          </span>
        )}
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/verification")}
        >
          Back to queue
        </Button>
      </div>
    </form>
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
    <label className="block text-sm">
      <span className="font-medium text-[#1a1a18]">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
