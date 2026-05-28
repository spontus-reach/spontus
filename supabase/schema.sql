-- Drop tables if they exist (for clean slate)
DROP TABLE IF EXISTS proofs CASCADE;
DROP TABLE IF EXISTS deliverables CASCADE;
DROP TABLE IF EXISTS deals CASCADE;
DROP TABLE IF EXISTS applications CASCADE;
DROP TABLE IF EXISTS listing_requested_assets CASCADE;
DROP TABLE IF EXISTS sponsorship_listings CASCADE;
DROP TABLE IF EXISTS sponsor_profiles CASCADE;
DROP TABLE IF EXISTS sponsor_memberships CASCADE;
DROP TABLE IF EXISTS sponsors CASCADE;
DROP TABLE IF EXISTS team_sponsorship_assets CASCADE;
DROP TABLE IF EXISTS sponsorship_asset_definitions CASCADE;
DROP TABLE IF EXISTS team_events CASCADE;
DROP TABLE IF EXISTS team_profiles CASCADE;
DROP TABLE IF EXISTS team_memberships CASCADE;
DROP TABLE IF EXISTS teams CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- Profiles table
CREATE TABLE profiles (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  primary_side TEXT NOT NULL CHECK (primary_side IN ('team', 'sponsor', 'internal')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Teams table
CREATE TABLE teams (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  university TEXT NOT NULL,
  sport TEXT NOT NULL,
  location TEXT,
  slug TEXT NOT NULL UNIQUE,
  verification_status TEXT NOT NULL DEFAULT 'draft' CHECK (verification_status IN ('draft', 'submitted_for_verification', 'verified', 'needs_changes', 'suspended')),
  created_by TEXT NOT NULL REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Team memberships table
CREATE TABLE team_memberships (
  id TEXT PRIMARY KEY,
  team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  profile_id TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('president', 'sponsorship_coordinator', 'treasurer', 'pr_manager', 'member', 'owner')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'invited', 'inactive')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(team_id, profile_id)
);

-- Team profiles table
CREATE TABLE team_profiles (
  id TEXT PRIMARY KEY,
  team_id TEXT NOT NULL UNIQUE REFERENCES teams(id) ON DELETE CASCADE,
  one_liner TEXT,
  description TEXT,
  roster_size INTEGER,
  year_founded INTEGER,
  league TEXT,
  competition_summary TEXT,
  season TEXT,
  website_url TEXT,
  instagram_url TEXT,
  tiktok_url TEXT,
  youtube_url TEXT,
  livestream_url TEXT,
  combined_reach INTEGER,
  social_links JSONB DEFAULT '[]'::jsonb, -- stores array of {platform, url, followerCount}
  photo TEXT,
  past_sponsors JSONB DEFAULT '[]'::jsonb, -- array of strings
  preferred_sponsor_categories JSONB DEFAULT '[]'::jsonb, -- array of strings
  excluded_sponsor_categories JSONB DEFAULT '[]'::jsonb, -- array of strings
  deal_types_interested_in JSONB DEFAULT '[]'::jsonb, -- array of strings
  profile_completeness INTEGER NOT NULL DEFAULT 0,
  submitted_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Team events table
CREATE TABLE team_events (
  id TEXT PRIMARY KEY,
  team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('competition', 'hosted_event', 'fundraiser', 'other')),
  starts_on DATE,
  location TEXT,
  expected_attendance INTEGER,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Sponsorship asset definitions table
CREATE TABLE sponsorship_asset_definitions (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('brand_visibility', 'social_content', 'product_event_activation')),
  description TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- Team sponsorship assets table
CREATE TABLE team_sponsorship_assets (
  id TEXT PRIMARY KEY,
  team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  asset_id TEXT NOT NULL REFERENCES sponsorship_asset_definitions(id),
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'preferred', 'limited', 'unavailable')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(team_id, asset_id)
);

-- Sponsors table
CREATE TABLE sponsors (
  id TEXT PRIMARY KEY,
  company_name TEXT NOT NULL,
  website_url TEXT,
  industry_category TEXT,
  verification_status TEXT NOT NULL DEFAULT 'draft' CHECK (verification_status IN ('draft', 'submitted_for_verification', 'verified', 'needs_changes', 'suspended')),
  created_by TEXT NOT NULL REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Sponsor memberships table
CREATE TABLE sponsor_memberships (
  id TEXT PRIMARY KEY,
  sponsor_id TEXT NOT NULL REFERENCES sponsors(id) ON DELETE CASCADE,
  profile_id TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'marketing_manager', 'viewer')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'invited', 'inactive')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(sponsor_id, profile_id)
);

-- Sponsor profiles table
CREATE TABLE sponsor_profiles (
  id TEXT PRIMARY KEY,
  sponsor_id TEXT NOT NULL UNIQUE REFERENCES sponsors(id) ON DELETE CASCADE,
  brand_name TEXT,
  one_liner TEXT,
  description TEXT,
  logo_url TEXT,
  instagram_url TEXT,
  target_audience TEXT,
  geographic_focus TEXT,
  typical_offer_types JSONB DEFAULT '[]'::jsonb,
  past_sponsorships TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Sponsorship listings table
CREATE TABLE sponsorship_listings (
  id TEXT PRIMARY KEY,
  sponsor_id TEXT NOT NULL REFERENCES sponsors(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'open', 'paused', 'closed')),
  offer_types JSONB NOT NULL DEFAULT '[]'::jsonb,
  offer_summary TEXT,
  number_of_teams INTEGER,
  geography TEXT,
  sport_preferences JSONB DEFAULT '[]'::jsonb,
  team_size_min INTEGER,
  social_reach_min INTEGER,
  duration TEXT,
  application_deadline DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

-- Listing requested assets table
CREATE TABLE listing_requested_assets (
  id TEXT PRIMARY KEY,
  listing_id TEXT NOT NULL REFERENCES sponsorship_listings(id) ON DELETE CASCADE,
  asset_id TEXT NOT NULL REFERENCES sponsorship_asset_definitions(id),
  required BOOLEAN NOT NULL DEFAULT FALSE,
  notes TEXT,
  UNIQUE(listing_id, asset_id)
);

-- Applications table
CREATE TABLE applications (
  id TEXT PRIMARY KEY DEFAULT ('app-' || gen_random_uuid()::text),
  listing_id TEXT NOT NULL REFERENCES sponsorship_listings(id) ON DELETE CASCADE,
  team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('draft', 'submitted', 'under_review', 'accepted', 'declined', 'withdrawn')),
  fit_note TEXT,
  decline_reason TEXT,
  submitted_at TIMESTAMPTZ,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(listing_id, team_id)
);

-- Insert canonical sponsorship asset definitions
INSERT INTO sponsorship_asset_definitions (id, label, category, description, sort_order) VALUES
  ('jersey_logo', 'Jersey Logo', 'brand_visibility', 'Logo on team jerseys', 1),
  ('warmup_gear_logo', 'Warm-up Gear Logo', 'brand_visibility', 'Logo on warm-up gear', 2),
  ('banner_at_games', 'Banner at Games', 'brand_visibility', 'Physical banner displayed at games/events', 3),
  ('website_logo', 'Website Logo', 'brand_visibility', 'Logo on team website', 4),
  ('newsletter_mention', 'Newsletter Mention', 'social_content', 'Mention in team newsletter', 5),
  ('instagram_post', 'Instagram Post', 'social_content', 'Dedicated Instagram post', 6),
  ('instagram_story', 'Instagram Story', 'social_content', 'Instagram story feature', 7),
  ('tiktok_reel', 'TikTok Reel', 'social_content', 'TikTok video/reel', 8),
  ('highlight_video_logo', 'Highlight Video Logo', 'brand_visibility', 'Logo in team highlight videos', 9),
  ('livestream_ad_placement', 'Livestream Ad Placement', 'social_content', 'Ad placement during livestreams', 10),
  ('product_sampling', 'Product Sampling', 'product_event_activation', 'Product sampling/event activation', 11),
  ('brand_booth', 'Brand Booth', 'product_event_activation', 'Brand booth at events', 12),
  ('on_course_product_placement', 'On-Course Product Placement', 'product_event_activation', 'Product placement on race/course', 13),
  ('athlete_packet_stuffing', 'Athlete Packet Stuffing', 'product_event_activation', 'Stuffing athlete packets with materials', 14),
  ('podium_prize_sponsorship', 'Podium Prize Sponsorship', 'product_event_activation', 'Sponsorship of podium prizes', 15),
  ('packet_pickup_hosting', 'Packet Pickup Hosting', 'product_event_activation', 'Hosting packet pickup events', 16),
  ('custom_activation', 'Custom Activation', 'product_event_activation', 'Custom sponsor activation', 17);
