import type { TeamEvent } from "@/lib/types";

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function HostedEventsSection({ events }: { events: TeamEvent[] }) {
  if (events.length === 0) return null;

  return (
    <div className="space-y-4">
      {events.map((evt) => (
        <div
          key={evt.id}
          className="rounded-lg p-4"
          style={{ border: "0.5px solid #d5d3cd" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div style={{ fontWeight: 600, color: "#1a1a18" }}>
                {evt.name}
              </div>
              <div className="text-xs" style={{ color: "#6b6960" }}>
                {evt.startsOn ? formatDate(evt.startsOn) : ""} &middot; {evt.location}
              </div>
            </div>
            {evt.expectedAttendance && (
              <span
                className="rounded-md px-2 py-0.5 text-xs"
                style={{
                  background: "rgba(34,197,94,0.15)",
                  color: "#16a34a",
                }}
              >
                {evt.expectedAttendance} athletes
              </span>
            )}
          </div>
          {evt.notes && (
            <p className="mt-3 text-sm" style={{ color: "#6b6960" }}>
              {evt.notes}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
