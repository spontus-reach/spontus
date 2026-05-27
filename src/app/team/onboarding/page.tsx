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
import { useVerification } from "@/components/providers/verification-provider";
import { useRouter } from "next/navigation";
import { ACTIVE_TEAM_ID } from "@/lib/mock-data";
import type { TeamProfileDraft, TeamSponsorshipAsset } from "@/lib/types";

function computeCompleteness(
  draft: TeamProfileDraft,
  hostedEventsReviewed: boolean
): number {
  let filled = 0;
  const total = 7;
  if (draft.name && draft.university && draft.sport) filled++;
  if (draft.instagramUrl || draft.combinedReach) filled++;
  if (draft.league || draft.season) filled++;
  if ((draft.sponsorshipAssets ?? []).length > 0) filled++;
  if ((draft.hostedEvents ?? []).length > 0 || hostedEventsReviewed) {
    filled++;
  }
  if ((draft.preferredSponsorCategories ?? []).length > 0) filled++;
  if (draft.photo) filled++;
  return Math.round((filled / total) * 100);
}

function computeSectionComplete(
  sectionId: string,
  draft: TeamProfileDraft,
  hostedEventsReviewed: boolean
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
      return (draft.hostedEvents ?? []).length > 0 || hostedEventsReviewed;
    case "looking":
      return (draft.preferredSponsorCategories ?? []).length > 0;
    case "media":
      return !!draft.photo;
    default:
      return false;
  }
}

export default function TeamOnboardingPage() {
  const router = useRouter();

  // Check if we have signup data from URL state (from signup page)
  const [draft, setDraft] = useState<TeamProfileDraft>(() => {
    // Check if router state has signup data from team signup
    if (typeof window !== 'undefined') {
      try {
        // @ts-ignore
        const state = router.state as { signupData?: {
          university: string;
          teamName: string;
          sport: string;
        } } | null;
        if (state && state.signupData) {
          const { university, teamName, sport } = state.signupData;
          // Map signup data to draft profile format
          return {
            verificationStatus: "draft",
            name: teamName,
            university,
            sport,
            oneLiner: "",
            description: "",
            league: "",
            competitionSummary: "",
            season: "",
            websiteUrl: "",
            instagramUrl: "",
            tiktokUrl: "",
            livestreamUrl: "",
            combinedReach: 0,
            socialLinks: [],
            events: [],
            sponsorshipAssets: [],
            hostedEvents: [],
            preferredSponsorCategories: [],
            excludedSponsorCategories: [],
            dealTypesInterestedIn: [],
            pastSponsors: [],
            // We don't store contact info in the profile, it's for verification only
          };
        }
      } catch (e) {
        // If we can't access state, fall back to default
        console.log("Could not access router state:", e);
      }
    }
    // Default draft state
    return {
      verificationStatus: "draft",
      sponsorshipAssets: [],
      events: [],
      hostedEvents: [],
      preferredSponsorCategories: [],
      excludedSponsorCategories: [],
      dealTypesInterestedIn: [],
      socialLinks: [],
      pastSponsors: [],
    };
  });

  const [activeSection, setActiveSection] = useState("basics");
  const [hostedEventsReviewed, setHostedEventsReviewed] = useState(false);

  function updateDraft(patch: Partial<TeamProfileDraft>) {
    setDraft((prev) => ({ ...prev, ...patch }));
  }

  const completeness = useMemo(
    () => computeCompleteness(draft, hostedEventsReviewed),
    [draft, hostedEventsReviewed]
  );
  const completedSections = useMemo(() => {
    const result: Record<string, boolean> = {};
    for (const s of BUILDER_SECTIONS) {
      result[s.id] = computeSectionComplete(
        s.id,
        draft,
        hostedEventsReviewed
      );
    }
    return result;
  }, [draft, hostedEventsReviewed]);

  const { getTeamById, submitForVerification } = useVerification();
  const liveTeam = getTeamById(ACTIVE_TEAM_ID);
  const liveStatus = liveTeam?.verificationStatus ?? draft.verificationStatus ?? "draft";
  const canSubmit = liveStatus === "draft" || liveStatus === "needs_changes";

  function handleSubmitForVerification() {
    submitForVerification("team", ACTIVE_TEAM_ID);
  }

  function handleMarkComplete() {
    if (activeSection === "hosted") {
      setHostedEventsReviewed(true);
    }
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
            <VerificationStatusBadge status={liveStatus} />
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Build your team profile
          </p>
        </div>
        <div className="flex gap-2">
          {canSubmit && (
            <Button
              variant="outline"
              onClick={handleSubmitForVerification}
              style={{ borderColor: "#d5d3cd" }}
            >
              Submit for verification
            </Button>
          )}
          <Link href="/team/listings">
            <Button variant="outline" style={{ borderColor: "#d5d3cd" }}>
              Browse listings
            </Button>
          </Link>
          <Link href="/teams/cal-poly-triathlon">
            <Button style={{ background: "#1a3a6e", color: "#f0efeb" }}>
              Preview profile
            </Button>
          </Link>
        </div>
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
