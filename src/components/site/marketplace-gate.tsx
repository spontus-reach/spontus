import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SpontusLogo } from "@/components/brand/spontus-logo";

type MarketplaceGateProps = {
  redirect?: string;
};

/** Indeed-style gate when logged-out users open the marketplace. */
export function MarketplaceGate({ redirect = "/browse" }: MarketplaceGateProps) {
  const loginHref = `/login?mode=signup&redirect=${encodeURIComponent(redirect)}`;

  return (
    <section className="mx-auto flex min-h-[50vh] max-w-[1120px] flex-col items-center justify-center px-6 py-24 text-center">
      <SpontusLogo variant="lockup" height={36} />
      <h1 className="mt-10 max-w-[16ch] text-4xl font-medium tracking-tight text-[#1a1a18] md:text-5xl">
        Your next sponsorship starts here.
      </h1>
      <p className="mt-5 max-w-[44ch] text-[17px] leading-relaxed text-[#6b6960]">
        Create an account or sign in to browse listings, apply as a team, or post
        opportunities as a sponsor.
      </p>
      <Link
        href={loginHref}
        className="mt-10 inline-flex items-center justify-center transition-opacity hover:opacity-90"
        style={{
          height: 48,
          padding: "0 24px",
          borderRadius: 999,
          background: "#1a3a6e",
          color: "#f0efeb",
          fontSize: 15,
          fontWeight: 500,
        }}
      >
        Get started
        <ArrowRight className="ml-2 h-4 w-4" strokeWidth={2} />
      </Link>
      <p className="mt-8 text-sm text-[#6b6960]">
        New here?{" "}
        <Link href="/for-teams" className="font-medium text-[#1a1a18] hover:underline">
          Learn about teams
        </Link>
        {" · "}
        <Link href="/for-brands" className="font-medium text-[#1a1a18] hover:underline">
          Learn about sponsors
        </Link>
      </p>
    </section>
  );
}
