"use client";

import { useState, useMemo, useEffect, useRef } from "react";
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
import { useIdentity } from "@/components/providers/identity-provider";
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
  // Check if we have signup data from sessionStorage (from signup page)
  const [draft, setDraft] = useState<TeamProfileDraft>(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedData = sessionStorage.getItem('teamSignupData');
        if (storedData) {
          const data = JSON.parse(storedData);
          // Clear the stored data after reading it
          sessionStorage.removeItem('teamSignupData');

          // Map signup data to draft profile format
          return {
            verificationStatus: "draft",
            name: data.teamName,
            university: data.university,
            sport: data.sport,
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
        console.log("Could not access sessionStorage data:", e);
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
  const [registeredTeamId, setRegisteredTeamId] = useState<string | null>(null);
  const hasRegisteredRef = useRef(false);

  const {
    getTeamById,
    submitForVerification,
    updateTeamProfile,
    registerTeamFromSignup,
  } = useVerification();
  const { activeTeamId } = useIdentity();
  const effectiveTeamId = activeTeamId ?? registeredTeamId;

  useEffect(() => {
    if (hasRegisteredRef.current) return;
    if (!draft.name || !draft.university || !draft.sport) return;
    if (effectiveTeamId && getTeamById(effectiveTeamId)) {
      hasRegisteredRef.current = true;
      return;
    }
    const team = registerTeamFromSignup(draft);
    setRegisteredTeamId(team.id);
    hasRegisteredRef.current = true;
  }, [
    draft,
    effectiveTeamId,
    getTeamById,
    registerTeamFromSignup,
  ]);

  useEffect(() => {
    if (!effectiveTeamId) return;
    updateTeamProfile(effectiveTeamId, draft);
  }, [draft, effectiveTeamId, updateTeamProfile]);

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

  const liveTeam = getTeamById(effectiveTeamId ?? "");
  const liveStatus = liveTeam?.verificationStatus ?? draft.verificationStatus ?? "draft";
  const canSubmit = liveStatus === "draft" || liveStatus === "needs_changes";

  function handleSubmitForVerification() {
    if (effectiveTeamId) submitForVerification("team", effectiveTeamId);
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
          <Link href="/browse">
            <Button variant="outline" style={{ borderColor: "#d5d3cd" }}>
              Browse listings
            </Button>
          </Link>
          <Link
            href={
              liveTeam
                ? `/teams/${liveTeam.slug}`
                : "/teams/cal-poly-triathlon"
            }
          >
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
      return "First impressions matter. Share your team's core identity.";
    case "social":
      return "Show your reach with trusted metrics sponsors trust.";
    case "competition":
      return "Highlight your competition calendar and achievements.";
    case "assets":
      return "Choose what you can offer sponsors—this is your value proposition.";
    case "hosted":
      return "Events you host are golden opportunities for sponsor activation.";
    case "looking":
      return "Help sponsors see if you're a great match for their goals.";
    case "media":
      return "Bring your team to life with photos that capture energy and community.";
    default:
      return "";
  }
}
