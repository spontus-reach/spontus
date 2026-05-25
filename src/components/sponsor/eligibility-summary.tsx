import type { SponsorshipListing, TeamProfile } from "@/lib/types";

type EligibilityCheck = {
  label: string;
  status: "meets" | "does_not_meet" | "unknown";
  detail?: string;
};

const statusDisplay: Record<string, { label: string; color: string }> = {
  meets: { label: "Meets", color: "#16a34a" },
  does_not_meet: { label: "Does not meet", color: "#dc2626" },
  unknown: { label: "Unknown", color: "#6b6960" },
};

export function EligibilitySummary({
  listing,
  team,
}: {
  listing: SponsorshipListing;
  team: TeamProfile;
}) {
  const checks: EligibilityCheck[] = [];

  if (listing.sportPreferences && listing.sportPreferences.length > 0) {
    const match = listing.sportPreferences.some(
      (sp) => sp.toLowerCase() === team.sport.toLowerCase()
    );
    checks.push({
      label: "Sport preference",
      status: match ? "meets" : "does_not_meet",
      detail: match
        ? team.sport
        : `${team.sport} (wants ${listing.sportPreferences.join(", ")})`,
    });
  }

  if (listing.geography) {
    const teamLoc = team.location?.toLowerCase() ?? "";
    const geoLower = listing.geography.toLowerCase();
    const match =
      teamLoc.includes(geoLower) || geoLower.includes("national");
    checks.push({
      label: "Geography",
      status: match ? "meets" : "unknown",
      detail: `${team.location ?? "Unknown"} (wants ${listing.geography})`,
    });
  }

  if (listing.teamSizeMin) {
    checks.push({
      label: "Team size minimum",
      status: team.rosterSize >= listing.teamSizeMin ? "meets" : "does_not_meet",
      detail: `${team.rosterSize} athletes (min ${listing.teamSizeMin})`,
    });
  }

  if (listing.socialReachMin) {
    const reach = team.combinedReach ?? 0;
    checks.push({
      label: "Social reach minimum",
      status: reach >= listing.socialReachMin ? "meets" : reach > 0 ? "does_not_meet" : "unknown",
      detail: `${reach > 0 ? reach.toLocaleString() : "Unknown"} (min ${listing.socialReachMin.toLocaleString()})`,
    });
  }

  if (checks.length === 0) {
    return (
      <p className="text-sm" style={{ color: "#6b6960" }}>
        No eligibility criteria specified for this listing.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {checks.map((check) => {
        const display = statusDisplay[check.status];
        return (
          <div
            key={check.label}
            className="flex items-center justify-between rounded-lg px-4 py-3"
            style={{ border: "0.5px solid #d5d3cd" }}
          >
            <div>
              <div className="text-sm font-medium" style={{ color: "#1a1a18" }}>
                {check.label}
              </div>
              {check.detail && (
                <div className="text-xs" style={{ color: "#6b6960" }}>
                  {check.detail}
                </div>
              )}
            </div>
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-medium"
              style={{ color: display.color }}
            >
              {display.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
