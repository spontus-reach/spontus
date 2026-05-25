"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { SPONSOR_INDUSTRY_CATEGORIES, DEAL_TYPES } from "@/lib/constants";
import { ImageIcon } from "lucide-react";
import type { SponsorProfileDraft } from "@/lib/types";

type Props = {
  data: SponsorProfileDraft;
  onUpdate: (patch: Partial<SponsorProfileDraft>) => void;
};

function toggleInList(list: string[], item: string): string[] {
  return list.includes(item)
    ? list.filter((i) => i !== item)
    : [...list, item];
}

export function SponsorProfileForm({ data, onUpdate }: Props) {
  const offerTypes = data.typicalOfferTypes ?? [];

  return (
    <div className="space-y-6">
      {/* Identity */}
      <Card
        className="p-6"
        style={{ border: "0.5px solid #d5d3cd", background: "white" }}
      >
        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#1a1a18" }}>
          Identity
        </h3>
        <p className="mt-1 text-sm" style={{ color: "#6b6960" }}>
          How teams will see your brand.
        </p>
        <div className="mt-5 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Company name">
              <Input
                value={data.companyName ?? ""}
                onChange={(e) => onUpdate({ companyName: e.target.value })}
                placeholder="Fluid Nutrition"
              />
            </Field>
            <Field label="Brand name (public-facing)">
              <Input
                value={data.brandName ?? ""}
                onChange={(e) => onUpdate({ brandName: e.target.value })}
                placeholder="May differ from company name"
              />
            </Field>
            <Field label="Website URL">
              <Input
                value={data.websiteUrl ?? ""}
                onChange={(e) => onUpdate({ websiteUrl: e.target.value })}
                placeholder="https://fluidnutrition.com"
              />
            </Field>
            <Field label="Logo">
              <div
                className="flex h-10 items-center gap-2 rounded-md px-3"
                style={{ border: "0.5px solid #d5d3cd" }}
              >
                <ImageIcon
                  className="h-4 w-4"
                  style={{ color: "#6b6960" }}
                />
                <span className="text-sm" style={{ color: "#6b6960" }}>
                  Upload coming soon
                </span>
              </div>
            </Field>
          </div>
          <Field label="One-liner">
            <Input
              value={data.oneLiner ?? ""}
              onChange={(e) => onUpdate({ oneLiner: e.target.value })}
              placeholder="Performance nutrition for endurance athletes."
            />
          </Field>
          <Field label="Full description">
            <Textarea
              rows={3}
              value={data.description ?? ""}
              onChange={(e) => onUpdate({ description: e.target.value })}
              placeholder="Tell teams what your brand is about and why you sponsor college club sports..."
            />
          </Field>
        </div>
      </Card>

      {/* Category & Audience */}
      <Card
        className="p-6"
        style={{ border: "0.5px solid #d5d3cd", background: "white" }}
      >
        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#1a1a18" }}>
          Category &amp; audience
        </h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Field label="Industry category">
            <Select
              value={data.industryCategory ?? ""}
              onValueChange={(v) => onUpdate({ industryCategory: v ?? undefined })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {SPONSOR_INDUSTRY_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Instagram URL">
            <Input
              value={data.instagramUrl ?? ""}
              onChange={(e) => onUpdate({ instagramUrl: e.target.value })}
              placeholder="https://instagram.com/fluidnutrition"
            />
          </Field>
          <Field label="Target audience">
            <Input
              value={data.targetAudience ?? ""}
              onChange={(e) => onUpdate({ targetAudience: e.target.value })}
              placeholder="Endurance athletes 18-30"
            />
          </Field>
          <Field label="Geographic focus">
            <Input
              value={data.geographicFocus ?? ""}
              onChange={(e) => onUpdate({ geographicFocus: e.target.value })}
              placeholder="California, West Coast, National..."
            />
          </Field>
        </div>
      </Card>

      {/* Sponsorship Approach */}
      <Card
        className="p-6"
        style={{ border: "0.5px solid #d5d3cd", background: "white" }}
      >
        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#1a1a18" }}>
          Sponsorship approach
        </h3>
        <p className="mt-1 text-sm" style={{ color: "#6b6960" }}>
          What you typically offer teams.
        </p>
        <div className="mt-4 grid gap-2 md:grid-cols-2">
          {DEAL_TYPES.map((dt) => (
            <label
              key={dt}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-[#e8e6e0]"
              style={{ border: "0.5px solid #d5d3cd" }}
            >
              <Checkbox
                checked={offerTypes.includes(dt)}
                onCheckedChange={() =>
                  onUpdate({
                    typicalOfferTypes: toggleInList(offerTypes, dt),
                  })
                }
              />
              {dt}
            </label>
          ))}
        </div>
        <div className="mt-4">
          <Field label="Past sponsorships (optional)">
            <Textarea
              rows={3}
              value={data.pastSponsorships ?? ""}
              onChange={(e) =>
                onUpdate({ pastSponsorships: e.target.value })
              }
              placeholder="Sponsored 12 club teams across 5 universities..."
            />
          </Field>
        </div>
      </Card>
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
