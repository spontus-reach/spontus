import { MapPin, Calendar, Mail } from "lucide-react";
import { VerificationStatusBadge } from "@/components/team/verification-status-badge";
import type { TeamProfile } from "@/lib/types";

export function TeamProfileHero({ team }: { team: TeamProfile }) {
  return (
    <div
      className="overflow-hidden rounded-xl"
      style={{ border: "0.5px solid #d5d3cd", background: "white" }}
    >
      <div className="relative">
        {team.photo ? (
          <img
            src={team.photo}
            alt={team.name}
            className="h-64 w-full object-cover"
          />
        ) : (
          <div
            className="flex h-64 w-full items-center justify-center"
            style={{ background: "#e8e6e0", color: "#6b6960" }}
          >
            Team photo
          </div>
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, white 0%, rgba(255,255,255,0.4) 40%, transparent 70%)",
          }}
        />
      </div>
      <div className="-mt-16 px-8 pb-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span
                className="rounded-md px-2 py-0.5 text-xs font-medium"
                style={{
                  background: "rgba(34,197,94,0.15)",
                  color: "#16a34a",
                }}
              >
                {team.sport}
              </span>
              <VerificationStatusBadge status={team.verificationStatus} />
            </div>
            <h1
              className="mt-3"
              style={{
                fontSize: 38,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                color: "#1a1a18",
              }}
            >
              {team.name}
            </h1>
            <div
              className="mt-2 flex flex-wrap items-center gap-4 text-sm"
              style={{ color: "#6b6960" }}
            >
              <span>{team.university}</span>
              {team.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {team.location}
                </span>
              )}
              {team.season && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {team.season}
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              disabled
              className="inline-flex h-10 cursor-not-allowed items-center justify-center rounded-lg px-4 text-sm font-medium opacity-50"
              style={{
                background: "transparent",
                border: "0.5px solid #b5b3ab",
                color: "#1a1a18",
              }}
            >
              <Mail className="mr-1.5 h-4 w-4" /> Contact team
            </button>
            <button
              disabled
              className="inline-flex h-10 cursor-not-allowed items-center justify-center rounded-lg px-4 text-sm font-medium opacity-50"
              style={{
                background: "transparent",
                border: "1px solid #1a3a6e",
                color: "#1a3a6e",
              }}
            >
              Invite to listing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
