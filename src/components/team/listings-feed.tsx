"use client";

import { useState, useMemo } from "react";
import { ListingCard } from "./listing-card";
import {
  ListingFilters,
  DEFAULT_FILTERS,
  type ListingFilterState,
} from "./listing-filters";
import { useApplications } from "@/components/providers/applications-provider";
import { useVerification } from "@/components/providers/verification-provider";
import { getOpenListings, ACTIVE_TEAM_ID } from "@/lib/mock-data";

export function ListingsFeed() {
  const [filters, setFilters] = useState<ListingFilterState>(DEFAULT_FILTERS);
  const { getApplicationForListing } = useApplications();
  const { getSponsorById } = useVerification();
  const openListings = getOpenListings();

  const filtered = useMemo(() => {
    return openListings.filter((l) => {
      const sponsor = getSponsorById(l.sponsorId);
      if (!sponsor || sponsor.verificationStatus !== "verified") return false;

      if (
        filters.sport &&
        l.sportPreferences.length > 0 &&
        !l.sportPreferences.some(
          (sp) => sp.toLowerCase() === filters.sport.toLowerCase()
        )
      ) {
        return false;
      }

      if (
        filters.geography &&
        l.geography &&
        !l.geography.toLowerCase().includes(filters.geography.toLowerCase())
      ) {
        return false;
      }

      if (
        filters.offerType &&
        !l.offerTypes.includes(filters.offerType)
      ) {
        return false;
      }

      if (filters.hideApplied) {
        const app = getApplicationForListing(ACTIVE_TEAM_ID, l.id);
        if (app) return false;
      }

      return true;
    });
  }, [openListings, filters, getApplicationForListing, getSponsorById]);

  return (
    <div>
      <ListingFilters
        filters={filters}
        onChange={setFilters}
        onClear={() => setFilters(DEFAULT_FILTERS)}
      />

      {filtered.length === 0 ? (
        <div className="mt-12 text-center">
          <p style={{ color: "#6b6960", fontSize: 15 }}>
            No listings match your filters
          </p>
          <button
            onClick={() => setFilters(DEFAULT_FILTERS)}
            className="mt-3 text-sm underline"
            style={{ color: "#1a3a6e" }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {filtered.map((listing) => {
            const app = getApplicationForListing(ACTIVE_TEAM_ID, listing.id);
            return (
              <ListingCard
                key={listing.id}
                listing={listing}
                isApplied={!!app}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
