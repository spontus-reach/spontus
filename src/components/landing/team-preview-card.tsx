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
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease, delay: index * 0.06 }}
    >
      <Link
        href={`/teams/${team.slug}`}
        className="group block overflow-hidden text-left"
        style={{
          background: "#e8e6e0",
          border: "0.5px solid #d5d3cd",
          borderRadius: 14,
        }}
      >
        <div
          className="relative"
          style={{ aspectRatio: "16 / 9", overflow: "hidden" }}
        >
          {team.photo ? (
            <Image
              src={team.photo}
              alt={team.name}
              fill
              sizes="(min-width: 768px) 544px, calc(100vw - 48px)"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center"
              style={{ background: "#e8e6e0", color: "#6b6960" }}
            >
              {team.sport}
            </div>
          )}
        </div>
        <div style={{ padding: "18px 20px" }}>
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
