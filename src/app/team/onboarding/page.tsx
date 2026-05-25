"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ProfileProgressSidebar,
  BUILDER_SECTIONS,
} from "@/components/team/profile-progress-sidebar";
import { TeamBasicsForm } from "@/components/team/team-basics-form";
import { SocialReachForm } from "@/components/team/social-reach-form";
import { CompetitionEventsForm } from "@/components/team/competition-events-form";
import { SponsorshipAssetMenu } from "@/components/team/sponsorship-asset-menu";
import { HostedEventsForm } from "@/components/team/hosted-events-form";
import { LookingForForm } from "@/components/team/looking-for-form";
import { MediaUploadForm } from "@/components/team/media-upload-form";
import { VerificationStatusBadge } from "@/components/team/verification-status-badge";
import type { TeamProfileDraft, TeamSponsorshipAsset } from "@/lib/types";

function computeCompleteness(draft: TeamProfileDraft): number {
  let filled = 0;
  const total = 7;
  if (draft.name && draft.university && draft.sport) filled++;
  if (draft.instagramUrl || draft.combinedReach) filled++;
  if (draft.league || draft.season) filled++;
  if ((draft.sponsorshipAssets ?? []).length > 0) filled++;
  if (
    (draft.hostedEvents ?? []).length > 0 ||
    draft.hostedEvents !== undefined
  )
    filled++;
  if ((draft.preferredSponsorCategories ?? []).length > 0) filled++;
  if (draft.photo) filled++;
  return Math.round((filled / total) * 100);
}

function computeSectionComplete(
  sectionId: string,
  draft: TeamProfileDraft
): boolean {
  switch (sectionId) {
    case "basics":
      return !!(draft.name && draft.university && draft.sport);
    case "social":
      return !!(draft.instagramUrl || draft.combinedReach);
    case "competition":
      return !!(draft.league || draft.season);
    case "assets":
      return (draft.sponsorshipAssets ?? []).length > 0;
    case "hosted":
      return true;
    case "looking":
      return (draft.preferredSponsorCategories ?? []).length > 0;
    case "media":
      return !!draft.photo;
    default:
      return false;
  }
}

export default function TeamOnboardingPage() {
  const [draft, setDraft] = useState<TeamProfileDraft>({
    verificationStatus: "draft",
    sponsorshipAssets: [],
    events: [],
    hostedEvents: [],
    preferredSponsorCategories: [],
    excludedSponsorCategories: [],
    dealTypesInterestedIn: [],
    socialLinks: [],
    pastSponsors: [],
  });
  const [activeSection, setActiveSection] = useState("basics");

  function updateDraft(patch: Partial<TeamProfileDraft>) {
    setDraft((prev) => ({ ...prev, ...patch }));
  }

  const completeness = useMemo(() => computeCompleteness(draft), [draft]);
  const completedSections = useMemo(() => {
    const result: Record<string, boolean> = {};
    for (const s of BUILDER_SECTIONS) {
      result[s.id] = computeSectionComplete(s.id, draft);
    }
    return result;
  }, [draft]);

  function handleMarkComplete() {
    const idx = BUILDER_SECTIONS.findIndex((s) => s.id === activeSection);
    if (idx < BUILDER_SECTIONS.length - 1) {
      setActiveSection(BUILDER_SECTIONS[idx + 1].id);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight">
              {draft.name || "Your team"}
            </h1>
            <VerificationStatusBadge
              status={draft.verificationStatus ?? "draft"}
            />
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Build your team profile
          </p>
        </div>
        <Link href="/teams/cal-poly-triathlon">
          <Button style={{ background: "#1a3a6e", color: "#f0efeb" }}>
            Preview profile
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-[260px_1fr]">
        <ProfileProgressSidebar
          activeSection={activeSection}
          completedSections={completedSections}
          completeness={completeness}
          onNavigate={setActiveSection}
        />

        <div className="space-y-6">
          <Card className="border-border bg-card p-6">
            <h3 className="text-lg font-semibold">
              {BUILDER_SECTIONS.find((s) => s.id === activeSection)?.label}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {sectionDescription(activeSection)}
            </p>
            <div className="mt-5">
              {activeSection === "basics" && (
                <TeamBasicsForm
                  data={{
                    name: draft.name,
                    university: draft.university,
                    sport: draft.sport,
                    location: draft.location,
                    rosterSize: draft.rosterSize,
                    yearFounded: draft.yearFounded,
                    oneLiner: draft.oneLiner,
                  }}
                  onUpdate={updateDraft}
                />
              )}
              {activeSection === "social" && (
                <SocialReachForm
                  data={{
                    instagramUrl: draft.instagramUrl,
                    tiktokUrl: draft.tiktokUrl,
                    youtubeUrl: draft.youtubeUrl,
                    livestreamUrl: draft.livestreamUrl,
                    websiteUrl: draft.websiteUrl,
                    combinedReach: draft.combinedReach,
                  }}
                  onUpdate={updateDraft}
                />
              )}
              {activeSection === "competition" && (
                <CompetitionEventsForm
                  data={{
                    league: draft.league,
                    competitionSummary: draft.competitionSummary,
                    season: draft.season,
                    events: draft.events,
                  }}
                  onUpdate={updateDraft}
                />
              )}
              {activeSection === "assets" && (
                <SponsorshipAssetMenu
                  selectedAssets={draft.sponsorshipAssets ?? []}
                  onChange={(assets: TeamSponsorshipAsset[]) =>
                    updateDraft({ sponsorshipAssets: assets })
                  }
                />
              )}
              {activeSection === "hosted" && (
                <HostedEventsForm
                  data={{ hostedEvents: draft.hostedEvents }}
                  onUpdate={updateDraft}
                />
              )}
              {activeSection === "looking" && (
                <LookingForForm
                  data={{
                    preferredSponsorCategories:
                      draft.preferredSponsorCategories,
                    excludedSponsorCategories:
                      draft.excludedSponsorCategories,
                    dealTypesInterestedIn: draft.dealTypesInterestedIn,
                  }}
                  onUpdate={updateDraft}
                />
              )}
              {activeSection === "media" && (
                <MediaUploadForm
                  data={{ photo: draft.photo }}
                  onUpdate={updateDraft}
                />
              )}
            </div>
          </Card>

          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              {(draft.sponsorshipAssets ?? []).length} assets enabled
            </div>
            <Button variant="outline" onClick={handleMarkComplete}>
              Mark complete &middot; Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function sectionDescription(id: string): string {
  switch (id) {
    case "basics":
      return "The essentials sponsors see first.";
    case "social":
      return "Standardized numbers so sponsors can compare apples to apples.";
    case "competition":
      return "Where you race, when you race, who watches.";
    case "assets":
      return "This is the core of your profile. Toggle what your team can offer. Add notes if helpful.";
    case "hosted":
      return "If your team hosts a race, tournament, or showcase, sponsors care a lot.";
    case "looking":
      return "Helps sponsors self-select before reaching out.";
    case "media":
      return "Upload 3-6 photos that show vibe + scale.";
    default:
      return "";
  }
}
