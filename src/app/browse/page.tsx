"use client";

import { ListingsFeed } from "@/components/team/listings-feed";
import { MarketplaceGate } from "@/components/site/marketplace-gate";
import { useAuth } from "@/components/providers/auth-provider";

export default function BrowsePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-20 text-center text-sm text-[#6b6960]">
        Loading…
      </div>
    );
  }

  if (!user) {
    return <MarketplaceGate redirect="/browse" />;
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <ListingsFeed />
    </div>
  );
}
