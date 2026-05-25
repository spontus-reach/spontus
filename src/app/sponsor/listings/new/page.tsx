"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { OfferTypeSelector } from "@/components/sponsor/offer-type-selector";
import { RequestedAssetsSelector } from "@/components/sponsor/requested-assets-selector";
import { EligibilityCriteriaForm } from "@/components/sponsor/eligibility-criteria-form";
import type { ListingDraft, ListingRequestedAsset } from "@/lib/types";

export default function NewListingPage() {
  const router = useRouter();
  const [draft, setDraft] = useState<ListingDraft>({
    status: "draft",
    offerTypes: [],
    sportPreferences: [],
    requestedAssets: [],
  });

  function updateDraft(patch: Partial<ListingDraft>) {
    setDraft((prev) => ({ ...prev, ...patch }));
  }

  function handleSaveDraft() {
    // In a real app, this would persist. For now just confirm.
    alert("Draft saved (mock). In a real app this would persist.");
  }

  function handlePublish() {
    setDraft((prev) => ({
      ...prev,
      status: "open",
      publishedAt: new Date().toISOString().split("T")[0],
    }));
    router.push("/sponsor/listings/lst-fluid-fall");
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1
        style={{
          fontSize: 28,
          fontWeight: 600,
          letterSpacing: "-0.01em",
          color: "#1a1a18",
        }}
      >
        Create a sponsorship listing
      </h1>
      <p className="mt-2" style={{ color: "#6b6960" }}>
        Teams will see this in their browse feed.
      </p>

      <div className="mt-8 space-y-6">
        {/* Basics */}
        <Card
          className="p-6"
          style={{ border: "0.5px solid #d5d3cd", background: "white" }}
        >
          <Field label="Listing title">
            <Input
              value={draft.title ?? ""}
              onChange={(e) => updateDraft({ title: e.target.value })}
              placeholder="Fall endurance team partnerships"
            />
          </Field>
          <div className="mt-4">
            <Field label="Description">
              <Textarea
                rows={3}
                value={draft.description ?? ""}
                onChange={(e) => updateDraft({ description: e.target.value })}
                placeholder="Describe what this opportunity is about..."
              />
            </Field>
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <Field label="Number of teams wanted">
              <Input
                type="number"
                value={draft.numberOfTeams ?? ""}
                onChange={(e) =>
                  updateDraft({
                    numberOfTeams: parseInt(e.target.value) || undefined,
                  })
                }
                placeholder="3"
              />
            </Field>
          </div>
        </Card>

        {/* Offer */}
        <Card
          className="p-6"
          style={{ border: "0.5px solid #d5d3cd", background: "white" }}
        >
          <OfferTypeSelector
            data={{
              offerTypes: draft.offerTypes,
              offerSummary: draft.offerSummary,
            }}
            onUpdate={updateDraft}
          />
        </Card>

        {/* Requested Assets */}
        <Card
          className="p-6"
          style={{ border: "0.5px solid #d5d3cd", background: "white" }}
        >
          <RequestedAssetsSelector
            selectedAssets={draft.requestedAssets ?? []}
            onChange={(assets: ListingRequestedAsset[]) =>
              updateDraft({ requestedAssets: assets })
            }
          />
        </Card>

        {/* Eligibility */}
        <Card
          className="p-6"
          style={{ border: "0.5px solid #d5d3cd", background: "white" }}
        >
          <EligibilityCriteriaForm
            data={{
              geography: draft.geography,
              sportPreferences: draft.sportPreferences,
              teamSizeMin: draft.teamSizeMin,
              socialReachMin: draft.socialReachMin,
              duration: draft.duration,
              applicationDeadline: draft.applicationDeadline,
            }}
            onUpdate={updateDraft}
          />
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleSaveDraft}
            style={{ color: "#6b6960" }}
          >
            Save as draft
          </Button>
          <Button
            onClick={handlePublish}
            style={{ background: "#22c55e", color: "#0a0a0a" }}
          >
            Publish listing
          </Button>
        </div>
      </div>
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
