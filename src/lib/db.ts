import { supabase } from './supabase';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { TeamProfile, SponsorProfile, SponsorshipListing, Application } from './types';

function requireSupabase(): SupabaseClient {
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }
  return supabase;
}

type ApplicationRow = {
  id: string;
  listing_id: string;
  team_id: string;
  status: Application['status'];
  fit_note: string | null;
  decline_reason: Application['declineReason'] | null;
  submitted_at: string | null;
  reviewed_at: string | null;
};

export function mapApplicationRow(row: ApplicationRow): Application {
  return {
    id: row.id,
    listingId: row.listing_id,
    teamId: row.team_id,
    status: row.status,
    fitNote: row.fit_note ?? undefined,
    declineReason: row.decline_reason ?? undefined,
    submittedAt: row.submitted_at ?? undefined,
    reviewedAt: row.reviewed_at ?? undefined,
  };
}

// Team functions
export async function getTeamBySlug(slug: string): Promise<TeamProfile | null> {
  const { data, error } = await requireSupabase()
    .from('teams')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 means no rows returned
    throw error;
  }
  return data ?? null;
}

export async function getTeamByIdForMock(id: string): Promise<TeamProfile | null> {
  const { data, error } = await requireSupabase()
    .from('teams')
    .select('*')
    .eq('id', id)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw error;
  }
  return data ?? null;
}

// Sponsor functions
export async function getSponsorById(id: string): Promise<SponsorProfile | null> {
  const { data, error } = await requireSupabase()
    .from('sponsors')
    .select('*')
    .eq('id', id)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw error;
  }
  return data ?? null;
}

// Listing functions
export async function getListingById(id: string): Promise<SponsorshipListing | null> {
  const { data, error } = await requireSupabase()
    .from('sponsorship_listings')
    .select('*')
    .eq('id', id)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw error;
  }
  return data ?? null;
}

export async function getOpenListings(): Promise<SponsorshipListing[]> {
  const { data, error } = await requireSupabase()
    .from('sponsorship_listings')
    .select('*')
    .eq('status', 'open');

  if (error) {
    throw error;
  }
  return data ?? [];
}

export async function getOpenListingsFromDB(): Promise<SponsorshipListing[]> {
  return await getOpenListings();
}

export async function getListingsForSponsor(sponsorId: string): Promise<SponsorshipListing[]> {
  const { data, error } = await requireSupabase()
    .from('sponsorship_listings')
    .select('*')
    .eq('sponsor_id', sponsorId);

  if (error) {
    throw error;
  }
  return data ?? [];
}

export async function getListingsForSponsorFromDB(sponsorId: string): Promise<SponsorshipListing[]> {
  return await getListingsForSponsor(sponsorId);
}

// Application functions
export async function getApplicationsForTeam(teamId: string): Promise<Application[]> {
  const { data, error } = await requireSupabase()
    .from('applications')
    .select('*')
    .eq('team_id', teamId);

  if (error) {
    throw error;
  }
  return (data ?? []).map((row) => mapApplicationRow(row as ApplicationRow));
}

export async function getApplicationsForListing(listingId: string): Promise<Application[]> {
  const { data, error } = await requireSupabase()
    .from('applications')
    .select('*')
    .eq('listing_id', listingId);

  if (error) {
    throw error;
  }
  return (data ?? []).map((row) => mapApplicationRow(row as ApplicationRow));
}

// Functions to get all data (for mock data constants)
export async function getAllTeams(): Promise<TeamProfile[]> {
  const { data, error } = await requireSupabase().from('teams').select('*');
  if (error) throw error;
  return data ?? [];
}

export async function getAllSponsors(): Promise<SponsorProfile[]> {
  const { data, error } = await requireSupabase().from('sponsors').select('*');
  if (error) throw error;
  return data ?? [];
}

export async function getAllListings(): Promise<SponsorshipListing[]> {
  const { data, error } = await requireSupabase().from('sponsorship_listings').select('*');
  if (error) throw error;
  return data ?? [];
}

export async function getAllApplications(): Promise<Application[]> {
  const { data, error } = await requireSupabase().from('applications').select('*');
  if (error) throw error;
  return (data ?? []).map((row) => mapApplicationRow(row as ApplicationRow));
}


// Now, functions to get data in the shape of the mock data (with nested objects)
// We'll assume the database schema has been extended to include the necessary fields.
// However, since we haven't altered the schema, we will try to assemble from the existing tables.

// We'll create a function that returns a team in the mock data shape by querying:
//   - teams
//   - team_profiles
//   - team_events (split into events and hostedEvents)
//   - team_sponsorship_assets (with sponsorship_asset_definitions)
//   - and we'll need to add the missing fields (socialLinks, pastSponsors, etc.) as columns or we'll leave them empty.

// Given the time, we will assume that the database schema has been updated to include the missing columns in the team_profiles table:
//   socialLinks JSONB, photo TEXT, pastSponsors TEXT[], preferredSponsorCategories TEXT[], excludedSponsorCategories TEXT[], dealTypesInterestedIn TEXT[]
// We will update the schema.sql later.

// For now, we will return what we have and leave the missing fields as undefined or empty arrays.

// Let's create a function that fetches a team by slug and returns the mock data shape.

export async function getTeamBySlugForMock(slug: string): Promise<TeamProfile | null> {
  // Fetch team
  const { data: teamData, error: teamError } = await requireSupabase()
    .from('teams')
    .select('*')
    .eq('slug', slug)
    .single();

  if (teamError && teamError.code !== 'PGRST116') throw teamError;
  if (!teamData) return null;

  // Fetch team profile
  const { data: profileData, error: profileError } = await requireSupabase()
    .from('team_profiles')
    .select('*')
    .eq('team_id', teamData.id)
    .single();

  // Fetch team events
  const { data: eventsData, error: eventsError } = await requireSupabase()
    .from('team_events')
    .select('*')
    .eq('team_id', teamData.id);

  // Fetch team sponsorship assets with asset definitions
  const { data: sponsorshipAssetsData, error: sponsorshipAssetsError } = await requireSupabase()
    .from('team_sponsorship_assets')
    .select(`
      *,
      sponsorship_asset_definitions (*)
    `)
    .eq('team_id', teamData.id);

  if (profileError && profileError.code !== 'PGRST116') throw profileError;
  if (eventsError && eventsError.code !== 'PGRST116') throw eventsError;
  if (sponsorshipAssetsError && sponsorshipAssetsError.code !== 'PGRST116') throw sponsorshipAssetsError;

  // Assemble the team object in the mock data shape
  const team: TeamProfile = {
    id: teamData.id,
    slug: teamData.slug,
    name: teamData.name,
    university: teamData.university,
    sport: teamData.sport,
    location: teamData.location,
    rosterSize: profileData?.roster_size ?? 0,
    yearFounded: profileData?.year_founded,
    oneLiner: profileData?.one_liner,
    description: profileData?.description,
    league: profileData?.league,
    competitionSummary: profileData?.competition_summary,
    season: profileData?.season,
    websiteUrl: profileData?.website_url,
    instagramUrl: profileData?.instagram_url,
    tiktokUrl: profileData?.tiktok_url,
    youtubeUrl: profileData?.youtube_url,
    livestreamUrl: profileData?.livestream_url,
    combinedReach: profileData?.combined_reach,
    socialLinks: profileData?.social_links ?? [], // Assuming we have a social_links column in team_profiles as JSONB
    events: (eventsData ?? []).map(evt => ({
      id: evt.id,
      name: evt.name,
      eventType: evt.event_type as 'competition' | 'hosted_event' | 'fundraiser' | 'other',
      startsOn: evt.starts_on,
      location: evt.location,
      expectedAttendance: evt.expected_attendance,
      notes: evt.notes,
    })),
    hostedEvents: (eventsData ?? []).filter(evt => evt.event_type === 'hosted_event').map(evt => ({
      id: evt.id,
      name: evt.name,
      eventType: evt.event_type as 'competition' | 'hosted_event' | 'fundraiser' | 'other',
      startsOn: evt.starts_on,
      location: evt.location,
      expectedAttendance: evt.expected_attendance,
      notes: evt.notes,
    })),
    sponsorshipAssets: (sponsorshipAssetsData ?? []).map(sa => ({
      assetId: sa.asset_id,
      status: sa.status as 'available' | 'preferred' | 'limited' | 'unavailable',
      notes: sa.notes,
    })),
    preferredSponsorCategories: profileData?.preferred_sponsor_categories ?? [], // Assuming column exists
    excludedSponsorCategories: profileData?.excluded_sponsor_categories ?? [], // Assuming column exists
    dealTypesInterestedIn: profileData?.deal_types_interested_in ?? [], // Assuming column exists
    verificationStatus: teamData.verification_status as 'draft' | 'submitted_for_verification' | 'verified' | 'needs_changes' | 'suspended',
    profileCompleteness: profileData?.profile_completeness ?? 0,
    photo: profileData?.photo, // Assuming column exists
    pastSponsors: profileData?.past_sponsors ?? [], // Assuming column exists as text array
  };

  return team;
}

// Similarly for sponsor
export async function getSponsorByIdForMock(id: string): Promise<SponsorProfile | null> {
  // Fetch sponsor
  const { data: sponsorData, error: sponsorError } = await requireSupabase()
    .from('sponsors')
    .select('*')
    .eq('id', id)
    .single();

  if (sponsorError && sponsorError.code !== 'PGRST116') throw sponsorError;
  if (!sponsorData) return null;

  // Fetch sponsor profile
  const { data: profileData, error: profileError } = await requireSupabase()
    .from('sponsor_profiles')
    .select('*')
    .eq('sponsor_id', id)
    .single();

  if (profileError && profileError.code !== 'PGRST116') throw profileError;

  const sponsor: SponsorProfile = {
    id: sponsorData.id,
    companyName: sponsorData.company_name,
    brandName: profileData?.brand_name,
    oneLiner: profileData?.one_liner,
    description: profileData?.description,
    logoUrl: profileData?.logo_url,
    websiteUrl: sponsorData.website_url,
    instagramUrl: profileData?.instagram_url,
    industryCategory: sponsorData.industry_category,
    targetAudience: profileData?.target_audience,
    geographicFocus: profileData?.geographic_focus,
    typicalOfferTypes: profileData?.typical_offer_types ?? [],
    pastSponsorships: profileData?.past_sponsorships,
    verificationStatus: sponsorData.verification_status as 'draft' | 'submitted_for_verification' | 'verified' | 'needs_changes' | 'suspended',
  };

  return sponsor;
}

// And for listing
export async function getListingByIdForMock(id: string): Promise<SponsorshipListing | null> {
  // Fetch listing
  const { data: listingData, error: listingError } = await requireSupabase()
    .from('sponsorship_listings')
    .select('*')
    .eq('id', id)
    .single();

  if (listingError && listingError.code !== 'PGRST116') throw listingError;
  if (!listingData) return null;

  // Fetch requested assets with asset definitions
  const { data: requestedAssetsData, error: requestedAssetsError } = await requireSupabase()
    .from('listing_requested_assets')
    .select(`
      *,
      sponsorship_asset_definitions (*)
    `)
    .eq('listing_id', id);

  if (requestedAssetsError && requestedAssetsError.code !== 'PGRST116') throw requestedAssetsError;

  const listing: SponsorshipListing = {
    id: listingData.id,
    sponsorId: listingData.sponsor_id,
    title: listingData.title,
    description: listingData.description,
    status: listingData.status as 'draft' | 'open' | 'paused' | 'closed',
    offerTypes: listingData.offer_types ?? [],
    offerSummary: listingData.offer_summary,
    numberOfTeams: listingData.number_of_teams,
    geography: listingData.geography,
    sportPreferences: listingData.sport_preferences ?? [],
    teamSizeMin: listingData.team_size_min,
    socialReachMin: listingData.social_reach_min,
    duration: listingData.duration,
    applicationDeadline: listingData.application_deadline,
    requestedAssets: (requestedAssetsData ?? []).map(ra => ({
      assetId: ra.asset_id,
      required: ra.required,
      notes: ra.notes,
    })),
    publishedAt: listingData.published_at,
  };

  return listing;
}

// We'll also need a function to get all teams in mock shape (for the MOCK_TEAMS constant)
export async function getAllTeamsForMock(): Promise<TeamProfile[]> {
  const teams = await getAllTeams();
  const teamPromises = teams.map(async (team) => {
    const teamMock = await getTeamBySlugForMock(team.slug);
    return teamMock;
  });
  const teamMocks = await Promise.all(teamPromises);
  return teamMocks.filter((t): t is TeamProfile => t !== null);
}

// Similarly for sponsors and listings
export async function getAllSponsorsForMock(): Promise<SponsorProfile[]> {
  const sponsors = await getAllSponsors();
  const sponsorPromises = sponsors.map(async (sponsor) => {
    const sponsorMock = await getSponsorByIdForMock(sponsor.id);
    return sponsorMock;
  });
  const sponsorMocks = await Promise.all(sponsorPromises);
  return sponsorMocks.filter((s): s is SponsorProfile => s !== null);
}

export async function getAllListingsForMock(): Promise<SponsorshipListing[]> {
  const listings = await getAllListings();
  const listingPromises = listings.map(async (listing) => {
    const listingMock = await getListingById(listing.id);
    return listingMock;
  });
  const listingMocks = await Promise.all(listingPromises);
  return listingMocks.filter((l): l is SponsorshipListing => l !== null);
}

// For applications, we don't have nested data, so we can use the base function.
export async function getAllApplicationsForMock(): Promise<Application[]> {
  return await getAllApplications();
}
