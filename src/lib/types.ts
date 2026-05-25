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

// --- Sponsor-side types (Slice 2) ---

export type SponsorProfile = {
  id: string;
  companyName: string;
  brandName?: string;
  oneLiner?: string;
  description?: string;
  logoUrl?: string;
  websiteUrl?: string;
  instagramUrl?: string;
  industryCategory?: string;
  targetAudience?: string;
  geographicFocus?: string;
  typicalOfferTypes: string[];
  pastSponsorships?: string;
  verificationStatus: VerificationStatus;
};

export type SponsorProfileDraft = Partial<SponsorProfile>;

export type ListingStatus = 'draft' | 'open' | 'paused' | 'closed';

export type ListingRequestedAsset = {
  assetId: string;
  required: boolean;
  notes?: string;
};

export type SponsorshipListing = {
  id: string;
  sponsorId: string;
  title: string;
  description?: string;
  status: ListingStatus;
  offerTypes: string[];
  offerSummary?: string;
  numberOfTeams?: number;
  geography?: string;
  sportPreferences: string[];
  teamSizeMin?: number;
  socialReachMin?: number;
  duration?: string;
  applicationDeadline?: string;
  requestedAssets: ListingRequestedAsset[];
  publishedAt?: string;
};

export type ListingDraft = Partial<SponsorshipListing>;

export type SponsorMemberRole =
  | 'owner'
  | 'admin'
  | 'marketing_manager'
  | 'viewer';

export type SponsorSignupData = {
  companyName: string;
  contactName: string;
  role: SponsorMemberRole;
  email: string;
  websiteUrl: string;
  industryCategory: string;
};

// --- Application types (Slice 3) ---

export type ApplicationStatus =
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'accepted'
  | 'declined'
  | 'withdrawn';

export type DeclineReason =
  | 'different_sport'
  | 'need_larger_team'
  | 'filled_all_spots'
  | 'not_right_fit_this_season'
  | 'other';

export type Application = {
  id: string;
  listingId: string;
  teamId: string;
  status: ApplicationStatus;
  fitNote?: string;
  declineReason?: DeclineReason;
  submittedAt?: string;
  reviewedAt?: string;
};
