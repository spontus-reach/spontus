export type VerificationStatus =
  | 'draft'
  | 'submitted_for_verification'
  | 'verified'
  | 'needs_changes'
  | 'suspended';

export type SponsorshipAssetCategory =
  | 'brand_visibility'
  | 'social_content'
  | 'product_event_activation';

export type SponsorshipAssetStatus =
  | 'available'
  | 'preferred'
  | 'limited'
  | 'unavailable';

export type SponsorshipAssetDefinition = {
  id: string;
  label: string;
  category: SponsorshipAssetCategory;
  description?: string;
  sortOrder: number;
};

export type TeamSponsorshipAsset = {
  assetId: string;
  status: SponsorshipAssetStatus;
  notes?: string;
};

export type TeamEvent = {
  id: string;
  name: string;
  eventType: 'competition' | 'hosted_event' | 'fundraiser' | 'other';
  startsOn?: string;
  location?: string;
  expectedAttendance?: number;
  notes?: string;
};

export type SocialLink = {
  platform: string;
  url: string;
  followerCount?: number;
};

export type TeamProfile = {
  id: string;
  slug: string;
  name: string;
  university: string;
  sport: string;
  location: string;
  rosterSize: number;
  yearFounded?: number;
  oneLiner?: string;
  description?: string;
  league?: string;
  competitionSummary?: string;
  season?: string;
  websiteUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  youtubeUrl?: string;
  livestreamUrl?: string;
  combinedReach?: number;
  socialLinks: SocialLink[];
  events: TeamEvent[];
  sponsorshipAssets: TeamSponsorshipAsset[];
  hostedEvents: TeamEvent[];
  preferredSponsorCategories: string[];
  excludedSponsorCategories: string[];
  dealTypesInterestedIn: string[];
  verificationStatus: VerificationStatus;
  profileCompleteness: number;
  photo?: string;
  pastSponsors: string[];
};

export type TeamProfileDraft = Partial<TeamProfile>;

export type TeamMemberRole =
  | 'president'
  | 'sponsorship_coordinator'
  | 'treasurer'
  | 'pr_manager'
  | 'other';

export type TeamSignupData = {
  fullName: string;
  email: string;
  university: string;
  teamName: string;
  sport: string;
  role: TeamMemberRole;
};
