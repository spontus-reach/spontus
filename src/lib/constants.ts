import type {
  SponsorshipAssetDefinition,
  SponsorshipAssetCategory,
  VerificationStatus,
} from './types';

export const SPONSORSHIP_ASSET_DEFINITIONS: SponsorshipAssetDefinition[] = [
  // Brand visibility
  { id: 'jersey_logo', label: 'Jersey logo', category: 'brand_visibility', sortOrder: 1 },
  { id: 'warmup_gear_logo', label: 'Warm-up gear logo', category: 'brand_visibility', sortOrder: 2 },
  { id: 'banner_at_games', label: 'Banner at games/events', category: 'brand_visibility', sortOrder: 3 },
  { id: 'website_logo', label: 'Website logo', category: 'brand_visibility', sortOrder: 4 },
  { id: 'newsletter_mention', label: 'Newsletter mention', category: 'brand_visibility', sortOrder: 5 },

  // Social / content
  { id: 'instagram_post', label: 'Instagram post', category: 'social_content', sortOrder: 6 },
  { id: 'instagram_story', label: 'Instagram story', category: 'social_content', sortOrder: 7 },
  { id: 'tiktok_reel', label: 'TikTok/Reel', category: 'social_content', sortOrder: 8 },
  { id: 'highlight_video_logo', label: 'Highlight video logo', category: 'social_content', sortOrder: 9 },
  { id: 'livestream_ad_placement', label: 'Livestream ad placement', category: 'social_content', sortOrder: 10 },

  // Product & event activation
  { id: 'product_sampling', label: 'Product sampling', category: 'product_event_activation', sortOrder: 11 },
  { id: 'brand_booth', label: 'Brand booth', category: 'product_event_activation', sortOrder: 12 },
  { id: 'on_course_product_placement', label: 'On-course product placement', category: 'product_event_activation', sortOrder: 13 },
  { id: 'athlete_packet_stuffing', label: 'Athlete packet stuffing', category: 'product_event_activation', sortOrder: 14 },
  { id: 'podium_prize_sponsorship', label: 'Podium prize sponsorship', category: 'product_event_activation', sortOrder: 15 },
  { id: 'packet_pickup_hosting', label: 'Packet pickup hosting', category: 'product_event_activation', sortOrder: 16 },
  { id: 'custom_activation', label: 'Custom activation', category: 'product_event_activation', sortOrder: 17 },
];

export const CATEGORY_LABELS: Record<SponsorshipAssetCategory, string> = {
  brand_visibility: 'Brand visibility',
  social_content: 'Social / content',
  product_event_activation: 'Product & event activation',
};

export const PREFERRED_SPONSOR_CATEGORIES = [
  'Nutrition',
  'Beverage',
  'Apparel',
  'Equipment',
  'Recovery/Fitness',
  'Local Business',
  'Food/Restaurant',
  'Technology',
  'Financial Services',
  'Other',
] as const;

export const EXCLUDED_SPONSOR_CATEGORIES = [
  'Energy Drinks',
  'Alcohol',
  'Gambling',
  'Tobacco/Nicotine',
  'Supplements we cannot verify',
  'Other',
] as const;

export const DEAL_TYPES = [
  'Cash sponsorship',
  'Free product for team use',
  'Discount codes',
  'Group ordering account access',
  'Gift cards',
  'Event prizes',
  'On-site services',
  'Product for event packets/goody bags',
] as const;

export const TEAM_MEMBER_ROLES = [
  { value: 'president', label: 'President' },
  { value: 'sponsorship_coordinator', label: 'Sponsorship Coordinator' },
  { value: 'treasurer', label: 'Treasurer' },
  { value: 'pr_manager', label: 'PR Manager' },
  { value: 'other', label: 'Other' },
] as const;

// --- Sponsor-side constants (Slice 2) ---

export const SPONSOR_INDUSTRY_CATEGORIES = [
  'Nutrition & supplements',
  'Apparel & gear',
  'Beverage',
  'Recovery & wellness',
  'Technology & services',
  'Food & restaurant',
  'Financial services',
  'Local business',
  'Other',
] as const;

export const SPONSOR_MEMBER_ROLES = [
  { value: 'owner', label: 'Owner' },
  { value: 'admin', label: 'Admin' },
  { value: 'marketing_manager', label: 'Marketing Manager' },
  { value: 'viewer', label: 'Viewer' },
] as const;

export const LISTING_STATUS_LABELS: Record<string, string> = {
  draft: 'Draft',
  open: 'Open',
  paused: 'Paused',
  closed: 'Closed',
};

export const VERIFICATION_STATUS_LABELS: Record<VerificationStatus, string> = {
  draft: 'Draft',
  submitted_for_verification: 'Submitted for verification',
  verified: 'Verified',
  needs_changes: 'Needs changes',
  suspended: 'Suspended',
};
