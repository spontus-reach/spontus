"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import type { SponsorProfileDraft } from "@/lib/types";
import { DEAL_TYPES } from "@/lib/constants";
import { toggleInList } from "@/lib/utils";

export function SponsorProfileForm({
  data,
  onUpdate,
}: {
  data: SponsorProfileDraft;
  onUpdate: (patch: Partial<SponsorProfileDraft>) => void;
}) {
  const [previewMode, setPreviewMode] = useState(false);
  const [editingSection, setEditingSection] = useState<"identity" | "category" | "approach" | null>(null);

  const handleFieldChange = (field: keyof SponsorProfileDraft, value: any) => {
    onUpdate({ [field]: value });
  };

  const toggleSectionEdit = (section: "identity" | "category" | "approach") => {
    setEditingSection(editingSection === section ? null : section);
  };

  // Generate preview sponsor data
  const previewSponsor = {
    id: "preview-1",
    companyName: data.companyName || "Your Company",
    brandName: data.brandName,
    industryCategory: data.industryCategory || "Technology",
    targetAudience: data.targetAudience || "College students & athletes",
    geographicFocus: data.geographicFocus || "Nationwide",
    description: data.description,
    typicalOfferTypes: data.typicalOfferTypes || [],
    verificationStatus: "draft" as const,
  } as const;

  return (
    <div className="space-y-8">
      {/* Header with live preview toggle */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Build your sponsor profile
          </h1>
          <p className="text-sm text-gray-600">
            Teams will see this profile when considering your sponsorship opportunities
          </p>

          {/* Preview toggle */}
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
              <input
                type="checkbox"
                checked={previewMode}
                onChange={(e) => setPreviewMode(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span>{previewMode ? "Edit form" : "Preview profile"}</span>
            </label>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 mt-4 lg:mt-0">
          <Button variant="outline" size="icon" onClick={() => alert("Reset to defaults")}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.5-1.5a2 2 0 012.828 0L21 13m-6 6l-1.5 1.5a2 2 0 01-2.828 0L3 16m6-6l1.5 1.5a2 2 0 01-2.828 0L3 8m15.414-3.586a2 2 0 11-2.828 2.828L9.414 12H6a2 2 0 110-4h3.414l1.293-1.293a2 2 0 012.828-2.828z" />
            </svg>
          </Button>
          {!previewMode && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => alert("Please fill in at least your company name to see a preview")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5h7a2 2 0 012 2v12a2 2 0 01-2 2H9a2 2 0 01-2-2V7a2 2 0 012-2zm-3 2v2H5v2h2v2a2 2 0 002 2h2a2 2 0 002-2v-2h2v-2a2 2 0 00-2-2H8zm-1 8h2.586a1 1 0 00.707-1.707L9.414 9H6a1 1 0 00-1 1v2z" />
              </svg>
            </Button>
          )}
        </div>
      </div>

      {/* Form or Preview */}
      {previewMode && data.companyName ? (
        // Preview Mode
        <div className="bg-white rounded-xl border p-6 shadow-sm border-gray-200">
          <div className="space-y-6">
            {/* Sponsor preview card */}
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="flex items-center justify-center rounded-2xl text-2xl"
                  style={{
                    width: 80,
                    height: 80,
                    background: "#1a3a6e",
                    color: "#f0efeb",
                    fontWeight: 700,
                  }}
                >
                  {(data.companyName || "YP")
                    .split(" ")
                    .map(w => w[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2
                      className="text-2xl font-bold text-gray-900 tracking-tighter"
                    >
                      {data.brandName || data.companyName || "Your Company"}
                    </h2>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Draft
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    {data.websiteUrl && (
                      <span className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="whitespace-nowrap">
                          {data.websiteUrl?.replace(/^https?:\/\//, "") || "website.com"}
                        </span>
                      </span>
                    )}
                    {data.instagramUrl && (
                      <span className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M22 6l-1.5 1.5M17 11l1.5-1.5M12 17v-6m2 6H4" />
                        </svg>
                        <span className="whitespace-nowrap">
                          {@ts-ignore
                            data.instagramUrl.replace(/^https?:\/\/instagram\.com\//, "@")
                          }
                        </span>
                      </span>
                    )}
                    {data.geographicFocus && (
                      <span className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.1 0-2 .9-2 2s0 2 1.1 2 2 .9 2 2 2-.9 2-2 0-2-1.1-2-2-2z" />
                        </svg>
                        <span>{data.geographicFocus}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              {data.description && (
                <p className="mt-6 max-w-2xl text-sm text-gray-600 leading-relaxed">
                  {data.description}
                </p>
              )}

              {/* Stats */}
              {data.typicalOfferTypes?.length > 0 && (
                <div className="mt-6">
                  <div className="text-xs font-medium text-gray-500 uppercase">
                    Typical sponsorship types
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {data.typicalOfferTypes.map((type) => (
                      <span
                        key={type}
                        className="px-3 py-1 text-xs font-medium rounded-full
                                 bg-blue-50 text-blue-800 border border-blue-200"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Engagement metrics (placeholder/demo data) */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  Estimated performance based on similar sponsors
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-500 uppercase">Team matches</div>
                    <div className="text-lg font-semibold text-gray-900">12+</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-500 uppercase">Avg. response time</div>
                    <div className="text-lg font-semibold text-gray-900">2.3 days</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-500 uppercase">Sponsorship rate</div>
                    <div className="text-lg font-semibold text-gray-900">34%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Edit Form
        <>
          <div className="space-y-6">
            {/* Identity Section */}
            <section className="border rounded-xl p-5">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <h2 className="font-semibold text-gray-900">Identity</h2>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      alert("Profile identity:\nYour company name and brand are what teams will see first. Use your official company name and any consumer-facing brand name.");
                    }}
                    className="text-gray-400 hover:text-gray-500 hover:underline"
                  >
                    ?
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label>Company name *</Label>
                    <Input
                      placeholder="Acme Corporation"
                      value={data.companyName ?? ""}
                      onChange={(e) => handleFieldChange("companyName", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label>Brand name (optional)</Label>
                    <Input
                      placeholder="Acme Sports (if different from company)"
                      value={data.brandName ?? ""}
                      onChange={(e) => handleFieldChange("brandName", e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Website URL</Label>
                    <Input
                      placeholder="https://www.acme.com"
                      value={data.websiteUrl ?? ""}
                      onChange={(e) => handleFieldChange("websiteUrl", e.target.value)}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <Label>One-liner (tagline)</Label>
                  <Input
                    placeholder="Performance nutrition for endurance athletes."
                    value={data.oneLiner ?? ""}
                    onChange={(e) => handleFieldChange("oneLiner", e.target.value)}
                  />
                </div>

                <div className="mt-4">
                  <Label>Full description</Label>
                  <Textarea
                    rows={4}
                    placeholder="Tell teams what your brand is about and why you sponsor college club sports..."
                    value={data.description ?? ""}
                    onChange={(e) => handleFieldChange("description", e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* Category & Audience Section */}
            <section className="border rounded-xl p-5">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <h2 className="font-semibold text-gray-900">Category & Audience</h2>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      alert("Targeting your ideal teams:\nHelp teams understand if you're a good fit by specifying your industry, target audience, and geographic focus.");
                    }}
                    className="text-gray-400 hover:text-gray-500 hover:underline"
                  >
                    ?
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label>Industry category *</Label>
                    <Input
                      placeholder="e.g., Sports Nutrition, Athletic Apparel"
                      value={data.industryCategory ?? ""}
                      onChange={(e) => handleFieldChange("industryCategory", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label>Instagram URL</Label>
                    <Input
                      placeholder="https://instagram.com/yourbrand"
                      value={data.instagramUrl ?? ""}
                      onChange={(e) => handleFieldChange("instagramUrl", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Target audience *</Label>
                    <Input
                      placeholder="e.g., College athletes, fitness enthusiasts"
                      value={data.targetAudience ?? ""}
                      onChange={(e) => handleFieldChange("targetAudience", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label>Geographic focus</Label>
                    <Input
                      placeholder="e.g., Pacific Northwest, Northeast colleges"
                      value={data.geographicFocus ?? ""}
                      onChange={(e) => handleFieldChange("geographicFocus", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Sponsorship Approach Section */}
            <section className="border rounded-xl p-5">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <h2 className="font-semibold text-gray-900">Sponsorship Approach</h2>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      alert("What you offer teams:\nDescribe what makes your sponsorship unique and what types of partnerships you typically offer.");
                    }}
                    className="text-gray-400 hover:text-gray-500 hover:underline"
                  >
                    ?
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="mb-4">
                  <Label>Typical sponsorship types *</Label>
                  <p className="text-sm text-gray-500 mb-2">
                    Select what you typically offer teams
                  </p>
                  <div className="grid gap-3 md:grid-cols-3">
                    {DEAL_TYPES.map((type) => (
                      <label
                        key={type}
                        className="flex items-center gap-3 w-full cursor-pointer select-none rounded-md p-3
                                 hover:bg-gray-50 border border-gray-200"
                      >
                        <Checkbox
                          checked={(data.typicalOfferTypes ?? []).includes(type)}
                          onCheckedChange={(checked) => {
                            const current = data.typicalOfferTypes ?? [];
                            const updated = checked
                              ? [...current, type]
                              : current.filter(t => t !== type);
                            handleFieldChange("typicalOfferTypes", updated);
                          }}
                          className="h-4 w-4"
                        />
                        <span className="text-sm font-medium">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <Label>Past sponsorships (optional)</Label>
                    <span className="text-sm text-gray-500">
                      Helps build credibility
                    </span>
                  </div>
                  <Textarea
                    rows={3}
                    placeholder="e.g., Sponsored 10 Division I teams, Official supplier to NCAA championships..."
                    value={data.pastSponsorships ?? ""}
                    onChange={(e) => handleFieldChange("pastSponsorships", e.target.value)}
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Form footer with tips and actions */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Profile tips</h3>
                <p className="text-sm text-gray-600">
                  Profiles with complete information get 3x more sponsorship inquiries
                </p>
              </div>
              <div className="mt-4 sm:mt-0 flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => alert("Tips: Complete all sections, add a description, and select 3+ offering types for best results")}
                >
                  Tips
                </Button>
                <Button
                  onClick={() => {
                    // Simple validation
                    const missing = [];
                    if (!data.companyName) missing.push("Company name");
                    if (!data.industryCategory) missing.push("Industry category");
                    if (!data.targetAudience) missing.push("Target audience");
                    if ((data.typicalOfferTypes ?? []).length === 0) missing.push("Sponsorship types");

                    if (missing.length > 0) {
                      alert(`Please complete: ${missing.join(", ")}`);
                    } else {
                      alert("Profile looks great! Ready to submit for verification.");
                    }
                  }}
                >
                  Validate profile
                </Button>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  // In a real app, this would submit for verification
                  alert("Submitting for verification...");
                }}
              >
                Submit for verification
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}