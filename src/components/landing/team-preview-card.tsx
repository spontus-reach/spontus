"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Users, Eye, Trophy } from "lucide-react";
import type { TeamProfile } from "@/lib/types";
import { SPONSORSHIP_ASSET_DEFINITIONS } from "@/lib/constants";

function getAssetLabel(assetId: string): string {
  return (
    SPONSORSHIP_ASSET_DEFINITIONS.find((a) => a.id === assetId)?.label ??
    assetId
  );
}

function getMetric(team: TeamProfile): { value: string; label: string } {
  if (team.hostedEvents.length > 0) {
    const biggest = team.hostedEvents.reduce((a, b) =>
      (a.expectedAttendance ?? 0) > (b.expectedAttendance ?? 0) ? a : b
    );
    return {
      value: `${biggest.expectedAttendance ?? 0}+`,
      label: "athletes at hosted race",
    };
  }
  if (team.pastSponsors.length > 0) {
    return {
      value: String(team.pastSponsors.length),
      label: team.pastSponsors.length === 1 ? "sponsor" : "sponsors",
    };
  }
  return { value: String(team.combinedReach ?? 0), label: "combined reach" };
}

const ease = [0.22, 1, 0.36, 1] as const;

export function TeamPreviewCard({
  team,
  index,
}: {
  team: TeamProfile;
  index: number;
}) {
  const metric = getMetric(team);
  const topAssets = team.sponsorshipAssets
    .filter((a) => a.status === "preferred" || a.status === "available")
    .slice(0, 3)
    .map((a) => getAssetLabel(a.assetId));

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease, delay: index * 0.04 }}
    >
      <Link
        href={`/teams/${team.slug}`}
        className="group block overflow-hidden text-left transition-all duration-300"
        style={{
          background: "#e8e6e0",
          border: "0.5px solid #d5d3cd",
          borderRadius: 14,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.08)";
          e.currentTarget.style.borderColor = "#b5b3ab";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.borderColor = "#d5d3cd";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        <div style={{ padding: "20px" }}>
          <div className="flex items-center gap-3.5">
            <div
              className="relative shrink-0"
              style={{
                width: 64,
                height: 64,
                borderRadius: 12,
                overflow: "hidden",
                background: "#ffffff",
                border: "0.5px solid #d5d3cd",
              }}
            >
              {team.photo ? (
                <Image
                  src={team.photo}
                  alt={`${team.name} logo`}
                  fill
                  sizes="64px"
                  className="object-contain p-1.5 transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center"
                  style={{ fontSize: 11, color: "#6b6960" }}
                >
                  {team.sport}
                </div>
              )}
            </div>
            <div className="min-w-0">
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 500,
                  color: "#1a1a18",
                  letterSpacing: "-0.01em",
                }}
              >
                {team.name}
              </div>
              <div style={{ fontSize: 12, fontWeight: 400, color: "#6b6960" }}>
                {team.university}
              </div>
            </div>
          </div>
          <div
            className="mt-4 flex items-center gap-5"
            style={{ fontSize: 12, fontWeight: 400, color: "#6b6960" }}
          >
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-3 w-3" strokeWidth={2} />
              {team.rosterSize} athletes
            </span>
            <span className="inline-flex items-center gap-1.5">
              {metric.label.includes("reach") ||
              metric.label.includes("views") ? (
                <Eye className="h-3 w-3" strokeWidth={2} />
              ) : (
                <Trophy className="h-3 w-3" strokeWidth={2} />
              )}
              {metric.value} {metric.label}
            </span>
          </div>
          {topAssets.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {topAssets.map((label) => (
                <span
                  key={label}
                  style={{
                    fontSize: 11,
                    fontWeight: 400,
                    color: "#1a3a6e",
                    background: "#dce6f5",
                    padding: "4px 8px",
                    borderRadius: 6,
                    lineHeight: 1,
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
