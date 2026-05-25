import type { SocialLink } from "@/lib/types";

export function AudienceReachSection({
  socialLinks,
  combinedReach,
}: {
  socialLinks: SocialLink[];
  combinedReach?: number;
}) {
  return (
    <div className="space-y-3 text-sm">
      {socialLinks.map((link) => (
        <div key={link.platform} className="flex items-center justify-between">
          <span style={{ color: "#6b6960" }}>{link.platform}</span>
          <span style={{ fontWeight: 600, color: "#1a1a18" }}>
            {link.followerCount
              ? link.followerCount >= 1000
                ? `${(link.followerCount / 1000).toFixed(1)}K`
                : link.followerCount.toLocaleString()
              : "\u2014"}
          </span>
        </div>
      ))}
      {combinedReach && (
        <div
          className="flex items-center justify-between pt-3"
          style={{ borderTop: "0.5px solid #d5d3cd" }}
        >
          <span style={{ color: "#6b6960" }}>Combined reach</span>
          <span style={{ fontWeight: 700, color: "#1a3a6e" }}>
            {combinedReach >= 1000
              ? `${(combinedReach / 1000).toFixed(1)}K`
              : combinedReach.toLocaleString()}
          </span>
        </div>
      )}
    </div>
  );
}
