import { SPONSORSHIP_ASSET_DEFINITIONS } from './constants';
import type { ListingRequestedAsset, TeamSponsorshipAsset } from './types';

export type AssetOverlapItem = {
  assetId: string;
  label: string;
  required: boolean;
  matched: boolean;
};

export type AssetOverlapResult = {
  matchedCount: number;
  totalCount: number;
  items: AssetOverlapItem[];
};

export function getAssetOverlap(
  listingRequestedAssets: ListingRequestedAsset[],
  teamSponsorshipAssets: TeamSponsorshipAsset[]
): AssetOverlapResult {
  const teamAssetIds = new Set(
    teamSponsorshipAssets
      .filter((a) => a.status !== 'unavailable')
      .map((a) => a.assetId)
  );

  const items = listingRequestedAssets.map((ra) => ({
    assetId: ra.assetId,
    label:
      SPONSORSHIP_ASSET_DEFINITIONS.find((d) => d.id === ra.assetId)?.label ??
      ra.assetId,
    required: ra.required,
    matched: teamAssetIds.has(ra.assetId),
  }));

  return {
    matchedCount: items.filter((i) => i.matched).length,
    totalCount: items.length,
    items,
  };
}
