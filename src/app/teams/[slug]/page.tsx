import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { getTeamBySlug, MOCK_TEAMS } from "@/lib/mock-data";
import { TeamProfileHero } from "@/components/profile/team-profile-hero";
import { TeamStats } from "@/components/profile/team-stats";
import { AssetGrid } from "@/components/profile/asset-grid";
import { HostedEventsSection } from "@/components/profile/hosted-events-section";
import { AudienceReachSection } from "@/components/profile/audience-reach-section";
import { PastSponsorsSection } from "@/components/profile/past-sponsors-section";

export async function generateStaticParams() {
  const teams = MOCK_TEAMS;
  return teams.map((t) => ({ slug: t.slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function TeamProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const team = await getTeamBySlug(slug);
  if (!team) notFound();

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <TeamProfileHero team={team} />

      <div className="mt-6 px-8">
        <TeamStats team={team} />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          {team.description && (
            <Card className="border-border bg-card p-6">
              <h3 className="text-lg font-semibold">About</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {team.description}
              </p>
            </Card>
          )}

          <Card className="border-border bg-card p-6">
            <h3 className="text-lg font-semibold">Sponsorship assets</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              What this team can offer sponsors.
            </p>
            <div className="mt-5">
              <AssetGrid assets={team.sponsorshipAssets} />
            </div>
          </Card>

          {team.hostedEvents.length > 0 && (
            <Card className="border-border bg-card p-6">
              <h3 className="text-lg font-semibold">Hosted events</h3>
              <div className="mt-4">
                <HostedEventsSection events={team.hostedEvents} />
              </div>
            </Card>
          )}

          {team.competitionSummary && (
            <Card className="border-border bg-card p-6">
              <h3 className="text-lg font-semibold">Competition schedule</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {team.competitionSummary}
              </p>
              {team.events.length > 0 && (
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {team.events.map((evt) => (
                    <li key={evt.id}>
                      &bull; {evt.name}
                      {evt.startsOn && ` — ${evt.startsOn}`}
                      {evt.location && ` · ${evt.location}`}
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card className="border-border bg-card p-6">
            <h3 className="font-semibold">Audience &amp; reach</h3>
            <div className="mt-4">
              <AudienceReachSection
                socialLinks={team.socialLinks}
                combinedReach={team.combinedReach}
              />
            </div>
          </Card>

          {team.pastSponsors.length > 0 && (
            <Card className="border-border bg-card p-6">
              <h3 className="font-semibold">Past sponsors</h3>
              <div className="mt-4">
                <PastSponsorsSection sponsors={team.pastSponsors} />
              </div>
            </Card>
          )}

          {team.events.length > 0 && (
            <Card className="border-border bg-card p-6">
              <h3 className="font-semibold">Upcoming events</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {team.events.map((evt) => (
                  <li key={evt.id}>
                    &bull; {evt.name}
                    {evt.startsOn && ` — ${evt.startsOn}`}
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {(team.preferredSponsorCategories.length > 0 ||
            team.dealTypesInterestedIn.length > 0) && (
            <Card className="border-border bg-card p-6">
              <h3 className="font-semibold">Looking for</h3>
              {team.preferredSponsorCategories.length > 0 && (
                <div className="mt-3">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    Preferred categories
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {team.preferredSponsorCategories.map((cat) => (
                      <span
                        key={cat}
                        className="rounded-md border border-border bg-secondary px-2 py-0.5 text-xs"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {team.dealTypesInterestedIn.length > 0 && (
                <div className="mt-4">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    Deal types
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {team.dealTypesInterestedIn.map((dt) => (
                      <span
                        key={dt}
                        className="rounded-md border border-border bg-secondary px-2 py-0.5 text-xs"
                      >
                        {dt}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}