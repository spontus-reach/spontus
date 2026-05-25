import { Globe, AtSign, MapPin } from "lucide-react";
import { VerificationStatusBadge } from "@/components/team/verification-status-badge";
import type { SponsorProfile } from "@/lib/types";

export function SponsorProfileCard({
  sponsor,
  action,
}: {
  sponsor: SponsorProfile;
  action?: React.ReactNode;
}) {
  const initials = (sponsor.brandName ?? sponsor.companyName)
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="rounded-xl p-8"
      style={{ border: "0.5px solid #d5d3cd", background: "white" }}
    >
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="flex items-center gap-5">
          <div
            className="flex items-center justify-center rounded-2xl text-2xl"
            style={{
              width: 80,
              height: 80,
              background: "#1a3a6e",
              color: "#f0efeb",
              fontWeight: 700,
            }}
          >
            {initials}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2
                style={{
                  fontSize: 28,
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  color: "#1a1a18",
                }}
              >
                {sponsor.brandName ?? sponsor.companyName}
              </h2>
              <VerificationStatusBadge status={sponsor.verificationStatus} />
            </div>
            <div
              className="mt-2 flex flex-wrap items-center gap-4 text-sm"
              style={{ color: "#6b6960" }}
            >
              {sponsor.websiteUrl && (
                <span className="flex items-center gap-1">
                  <Globe className="h-3.5 w-3.5" />
                  {sponsor.websiteUrl.replace(/^https?:\/\//, "")}
                </span>
              )}
              {sponsor.instagramUrl && (
                <span className="flex items-center gap-1">
                  <AtSign className="h-3.5 w-3.5" />
                  {sponsor.instagramUrl.replace(/^https?:\/\/instagram\.com\//, "@")}
                </span>
              )}
              {sponsor.geographicFocus && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {sponsor.geographicFocus}
                </span>
              )}
            </div>
          </div>
        </div>
        {action}
      </div>

      {sponsor.description && (
        <p
          className="mt-6 max-w-2xl text-sm leading-relaxed"
          style={{ color: "#6b6960" }}
        >
          {sponsor.description}
        </p>
      )}

      <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
        {sponsor.industryCategory && (
          <Stat label="Industry" value={sponsor.industryCategory} />
        )}
        {sponsor.targetAudience && (
          <Stat label="Target audience" value={sponsor.targetAudience} />
        )}
        {sponsor.geographicFocus && (
          <Stat label="Geographic focus" value={sponsor.geographicFocus} />
        )}
      </div>

      {sponsor.typicalOfferTypes.length > 0 && (
        <div className="mt-6">
          <div
            style={{
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#6b6960",
            }}
          >
            Typical sponsorship types
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {sponsor.typicalOfferTypes.map((t) => (
              <span
                key={t}
                className="rounded-md px-2.5 py-1 text-xs"
                style={{
                  border: "0.5px solid #d5d3cd",
                  color: "#1a1a18",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div
        style={{
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "#6b6960",
        }}
      >
        {label}
      </div>
      <div
        className="mt-1"
        style={{ fontSize: 20, fontWeight: 600, color: "#1a1a18" }}
      >
        {value}
      </div>
    </div>
  );
}
