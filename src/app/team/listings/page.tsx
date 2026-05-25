"use client";

import { ListingsFeed } from "@/components/team/listings-feed";
import { getOpenListings } from "@/lib/mock-data";

export default function TeamListingsPage() {
  const count = getOpenListings().length;

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            color: "#1a1a18",
          }}
        >
          Sponsorship listings
        </h1>
        <p className="mt-1" style={{ color: "#6b6960" }}>
          {count} open listing{count !== 1 ? "s" : ""} matched to your team
        </p>
      </div>

      <div className="mt-6">
        <ListingsFeed />
      </div>
    </div>
  );
}
