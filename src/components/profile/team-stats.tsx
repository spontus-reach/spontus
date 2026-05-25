import type { TeamProfile } from "@/lib/types";

export function TeamStats({ team }: { team: TeamProfile }) {
  const hostedAttendance = team.hostedEvents.reduce(
    (sum, e) => sum + (e.expectedAttendance ?? 0),
    0
  );

  const stats = [
    { label: "Roster", value: team.rosterSize },
    {
      label: "Followers",
      value: team.combinedReach
        ? team.combinedReach >= 1000
          ? `${(team.combinedReach / 1000).toFixed(1)}K`
          : team.combinedReach
        : "\u2014",
    },
    { label: "Past sponsors", value: team.pastSponsors.length || "\u2014" },
    ...(hostedAttendance > 0
      ? [{ label: "Hosted race", value: `${hostedAttendance} athletes` }]
      : []),
  ];

  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#6b6960",
            }}
          >
            {s.label}
          </div>
          <div
            className="mt-1"
            style={{ fontSize: 20, fontWeight: 600, color: "#1a1a18" }}
          >
            {s.value}
          </div>
        </div>
      ))}
    </div>
  );
}
