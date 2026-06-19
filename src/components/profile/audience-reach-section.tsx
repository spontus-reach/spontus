"use client";

import { useEffect, useState } from "react";
import type { SocialLink } from "@/lib/types";

function formatCount(count: number): string {
  return count >= 1000
    ? `${(count / 1000).toFixed(1)}K`
    : count.toLocaleString();
}

function handleFromUrl(url: string): string | null {
  const match = url
    .replace(/\/+$/, "")
    .match(/instagram\.com\/([^/?#]+)/i);
  if (match) return match[1].replace(/^@/, "");
  const segment = url.replace(/\/+$/, "").split("/").pop();
  return segment ? segment.replace(/^@/, "") : null;
}

export function AudienceReachSection({
  socialLinks,
  combinedReach,
}: {
  socialLinks: SocialLink[];
  combinedReach?: number;
}) {
  const instagram = socialLinks.find(
    (link) => link.platform.toLowerCase() === "instagram"
  );

  const [igCount, setIgCount] = useState<number | null>(
    instagram?.followerCount ?? null
  );
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    if (!instagram?.url) return;
    const handle = handleFromUrl(instagram.url);
    if (!handle) return;

    let active = true;
    const fallback = instagram.followerCount ?? "";
    fetch(`/api/instagram/${encodeURIComponent(handle)}?fallback=${fallback}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!active || !data || typeof data.followerCount !== "number") return;
        setIgCount(data.followerCount);
        setIsLive(data.source === "live");
      })
      .catch(() => {
        /* keep the seeded count on failure */
      });

    return () => {
      active = false;
    };
  }, [instagram?.url, instagram?.followerCount]);

  return (
    <div className="space-y-3 text-sm">
      {socialLinks.map((link) => {
        const isInstagram = link.platform.toLowerCase() === "instagram";
        const value = isInstagram ? igCount : link.followerCount ?? null;
        return (
          <div
            key={link.platform}
            className="flex items-center justify-between"
          >
            <span className="inline-flex items-center gap-1.5" style={{ color: "#6b6960" }}>
              {link.platform}
              {isInstagram && isLive && (
                <span
                  title="Live from Instagram"
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 999,
                    background: "#16a34a",
                    display: "inline-block",
                  }}
                />
              )}
            </span>
            <span style={{ fontWeight: 600, color: "#1a1a18" }}>
              {value ? formatCount(value) : "—"}
            </span>
          </div>
        );
      })}
      {combinedReach && socialLinks.length > 1 && (
        <div
          className="flex items-center justify-between pt-3"
          style={{ borderTop: "0.5px solid #d5d3cd" }}
        >
          <span style={{ color: "#6b6960" }}>Combined reach</span>
          <span style={{ fontWeight: 700, color: "#1a3a6e" }}>
            {formatCount(combinedReach)}
          </span>
        </div>
      )}
    </div>
  );
}
