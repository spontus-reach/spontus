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

-- Enable uuid-ossp extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Trigger function to update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  primary_side TEXT NOT NULL CHECK (primary_side IN ('team', 'sponsor', 'internal')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Teams table
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  university TEXT NOT NULL,
  sport TEXT NOT NULL,
  location TEXT,
  slug TEXT NOT NULL UNIQUE,
  verification_status TEXT NOT NULL DEFAULT 'draft' CHECK (verification_status IN ('draft', 'submitted_for_verification', 'verified', 'needs_changes', 'suspended')),
  created_by UUID NOT NULL REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Team memberships table
CREATE TABLE team_memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('president', 'sponsorship_coordinator', 'treasurer', 'pr_manager', 'member', 'owner')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'invited', 'inactive')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(team_id, profile_id)
);

-- Team profiles table
CREATE TABLE team_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL UNIQUE REFERENCES teams(id) ON DELETE CASCADE,
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
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
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
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('brand_visibility', 'social_content', 'product_event_activation')),
  description TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- Team sponsorship assets table
CREATE TABLE team_sponsorship_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  asset_id UUID NOT NULL REFERENCES sponsorship_asset_definitions(id),
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'preferred', 'limited', 'unavailable')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(team_id, asset_id)
);

-- Sponsors table
CREATE TABLE sponsors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  website_url TEXT,
  industry_category TEXT,
  verification_status TEXT NOT NULL DEFAULT 'draft' CHECK (verification_status IN ('draft', 'submitted_for_verification', 'verified', 'needs_changes', 'suspended')),
  created_by UUID NOT NULL REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Sponsor memberships table
CREATE TABLE sponsor_memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sponsor_id UUID NOT NULL REFERENCES sponsors(id) ON DELETE CASCADE,
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'marketing_manager', 'viewer')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'invited', 'inactive')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(sponsor_id, profile_id)
);

-- Sponsor profiles table
CREATE TABLE sponsor_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sponsor_id UUID NOT NULL UNIQUE REFERENCES sponsors(id) ON DELETE CASCADE,
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
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES sponsorship_listings(id) ON DELETE CASCADE,
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('draft', 'submitted', 'under_review', 'accepted', 'declined', 'withdrawn')),
  fit_note TEXT,
  decline_reason TEXT,
  submitted_at TIMESTAMPTZ,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(listing_id, team_id)
);

-- Contacts And Relationship Memory
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  sponsor_id UUID REFERENCES sponsors(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  role TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (team_id IS NOT NULL OR sponsor_id IS NOT NULL)
);

-- Deal And Proof Tables (later-slice tables)
CREATE TABLE deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES sponsorship_listings(id) ON DELETE CASCADE,
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  amount DECIMAL(10,2),
  currency TEXT DEFAULT 'USD',
  start_date DATE,
  end_date DATE,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE deliverables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id UUID NOT NULL REFERENCES deals(id) ON DELETE CASCADE,
  asset_id UUID NOT NULL REFERENCES sponsorship_asset_definitions(id),
  description TEXT,
  quantity INTEGER DEFAULT 1,
  due_date DATE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'late')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE proofs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deliverable_id UUID NOT NULL REFERENCES deliverables(id) ON DELETE CASCADE,
  url TEXT,
  description TEXT,
  submitted_at TIMESTAMPTZ,
  verified_at TIMESTAMPTZ,
  verified_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security on all tables and create policies

-- Profiles table RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profiles are viewable by own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);
CREATE POLICY "Profiles are updatable by own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);
CREATE POLICY "Profiles are insertable by own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Teams table RLS
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Teams are viewable by team members"
  ON teams FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM team_memberships
      WHERE team_memberships.team_id = id
        AND team_memberships.profile_id = auth.uid()
        AND team_memberships.status = 'active'
    )
  );
CREATE POLICY "Teams are updatable by team owners/presidents"
  ON teams FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM team_memberships
      WHERE team_memberships.team_id = id
        AND team_memberships.profile_id = auth.uid()
        AND team_memberships.role IN ('owner', 'president')
        AND team_memberships.status = 'active'
    )
  );
CREATE POLICY "Teams are insertable by verified internal users"
  ON teams FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND primary_side = 'internal'
        AND verification_status = 'verified'
    )
  );

-- Team memberships table RLS
ALTER TABLE team_memberships ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Team memberships are viewable by team members"
  ON team_memberships FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM team_memberships tm
      WHERE tm.team_id = team_memberships.team_id
        AND tm.profile_id = auth.uid()
        AND tm.status = 'active'
    )
  );
CREATE POLICY "Team memberships are updatable by team owners/presidents"
  ON team_memberships FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM team_memberships tm
      WHERE tm.team_id = team_memberships.team_id
        AND tm.profile_id = auth.uid()
        AND tm.role IN ('owner', 'president')
        AND tm.status = 'active'
    )
  );
CREATE POLICY "Team memberships are insertable by team owners/presidents"
  ON team_memberships FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM team_memberships tm
      WHERE tm.team_id = team_memberships.team_id
        AND tm.profile_id = auth.uid()
        AND tm.role IN ('owner', 'president')
        AND tm.status = 'active'
    )
  );

-- Team profiles table RLS
ALTER TABLE team_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Team profiles are viewable by public when published and team verified"
  ON team_profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM teams
      WHERE teams.id = team_profiles.team_id
        AND teams.verification_status = 'verified'
    )
    AND team_profiles.published_at IS NOT NULL
  );
CREATE POLICY "Team profiles are viewable by team members"
  ON team_profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM team_memberships
      WHERE team_memberships.team_id = team_profiles.team_id
        AND team_memberships.profile_id = auth.uid()
        AND team_memberships.status = 'active'
    )
  );
CREATE POLICY "Team profiles are updatable by team sponsorship coordinators/owners/presidents"
  ON team_profiles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM team_memberships
      WHERE team_memberships.team_id = team_profiles.team_id
        AND team_memberships.profile_id = auth.uid()
        AND team_memberships.role IN ('owner', 'president', 'sponsorship_coordinator')
        AND team_memberships.status = 'active'
    )
  );
CREATE POLICY "Team profiles are insertable by team sponsorship coordinators/owners/presidents"
  ON team_profiles FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM team_memberships
      WHERE team_memberships.team_id = team_profiles.team_id
        AND team_memberships.profile_id = auth.uid()
        AND team_memberships.role IN ('owner', 'president', 'sponsorship_coordinator')
        AND team_memberships.status = 'active'
  );

-- Team events table RLS
ALTER TABLE team_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Team events are viewable by team members"
  ON team_events FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM team_memberships
      WHERE team_memberships.team_id = team_events.team_id
        AND team_memberships.profile_id = auth.uid()
        AND team_memberships.status = 'active'
    )
  );
CREATE POLICY "Team events are updatable by team members"
  ON team_events FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM team_memberships
      WHERE team_memberships.team_id = team_events.team_id
        AND team_memberships.profile_id = auth.uid()
        AND team_memberships.status = 'active'
    )
  );
CREATE POLICY "Team events are insertable by team members"
  ON team_events FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM team_memberships
      WHERE team_memberships.team_id = team_events.team_id
        AND team_memberships.profile_id = auth.uid()
        AND team_memberships.status = 'active'
    )
  );

-- Sponsorship asset definitions table RLS
ALTER TABLE sponsorship_asset_definitions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Sponsorship asset definitions are viewable by everyone"
  ON sponsorship_asset_definitions FOR SELECT
  USING (TRUE);
CREATE POLICY "Sponsorship asset definitions are updatable by internal users"
  ON sponsorship_asset_definitions FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND primary_side = 'internal'
    )
  );
CREATE POLICY "Sponsorship asset definitions are insertable by internal users"
  ON sponsorship_asset_definitions FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND primary_side = 'internal'
    )
  );

-- Team sponsorship assets table RLS
ALTER TABLE team_sponsorship_assets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Team sponsorship assets are viewable by team members"
  ON team_sponsorship_assets FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM team_memberships
      WHERE team_memberships.team_id = team_sponsorship_assets.team_id
        AND team_memberships.profile_id = auth.uid()
        AND team_memberships.status = 'active'
    )
  );
CREATE POLICY "Team sponsorship assets are updatable by team sponsorship coordinators/owners/presidents"
  ON team_sponsorship_assets FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM team_memberships
      WHERE team_memberships.team_id = team_sponsorship_assets.team_id
        AND team_memberships.profile_id = auth.uid()
        AND team_memberships.role IN ('owner', 'president', 'sponsorship_coordinator')
        AND team_memberships.status = 'active'
    )
  );
CREATE POLICY "Team sponsorship assets are insertable by team sponsorship coordinators/owners/presidents"
  ON team_sponsorship_assets FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM team_memberships
      WHERE team_memberships.team_id = team_sponsorship_assets.team_id
        AND team_memberships.profile_id = auth.uid()
        AND team_memberships.role IN ('owner', 'president', 'sponsorship_coordinator')
        AND team_memberships.status = 'active'
    )
  );

-- Sponsors table RLS
ALTER TABLE sponsors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Sponsors are viewable by sponsor members"
  ON sponsors FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM sponsor_memberships
      WHERE sponsor_memberships.sponsor_id = id
        AND sponsor_memberships.profile_id = auth.uid()
        AND sponsor_memberships.status = 'active'
    )
  );
CREATE POLICY "Sponsors are updatable by sponsor owners/admins"
  ON sponsors FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM sponsor_memberships
      WHERE sponsor_memberships.sponsor_id = id
        AND sponsor_memberships.profile_id = auth.uid()
        AND sponsor_memberships.role IN ('owner', 'admin')
        AND sponsor_memberships.status = 'active'
    )
  );
CREATE POLICY "Sponsors are insertable by verified internal users"
  ON sponsors FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND primary_side = 'internal'
        AND verification_status = 'verified'
    )
  );

-- Sponsor memberships table RLS
ALTER TABLE sponsor_memberships ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Sponsor memberships are viewable by sponsor members"
  ON sponsor_memberships FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM sponsor_memberships sm
      WHERE sm.sponsor_id = sponsor_memberships.sponsor_id
        AND sm.profile_id = auth.uid()
        AND sm.status = 'active'
    )
  );
CREATE POLICY "Sponsor memberships are updatable by sponsor owners/admins"
  ON sponsor_memberships FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM sponsor_memberships sm
      WHERE sm.sponsor_id = sponsor_memberships.sponsor_id
        AND sm.profile_id = auth.uid()
        AND sm.role IN ('owner', 'admin')
        AND sm.status = 'active'
    )
  );
CREATE POLICY "Sponsor memberships are insertable by sponsor owners/admins"
  ON sponsor_memberships FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM sponsor_memberships sm
      WHERE sm.sponsor_id = sponsor_memberships.sponsor_id
        AND sm.profile_id = auth.uid()
        AND sm.role IN ('owner', 'admin')
        AND sm.status = 'active'
    )
  );

-- Sponsor profiles table RLS
ALTER TABLE sponsor_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Sponsor profiles are viewable by public when sponsor verified"
  ON sponsor_profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM sponsors
      WHERE sponsors.id = sponsor_profiles.sponsor_id
        AND sponsors.verification_status = 'verified'
    )
  );
CREATE POLICY "Sponsor profiles are viewable by sponsor members"
  ON sponsor_profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM sponsor_memberships
      WHERE sponsor_memberships.sponsor_id = sponsor_profiles.sponsor_id
        AND sponsor_memberships.profile_id = auth.uid()
        AND sponsor_memberships.status = 'active'
    )
  );
CREATE POLICY "Sponsor profiles are updatable by sponsor owners/admins/marketing managers"
  ON sponsor_profiles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM sponsor_memberships
      WHERE sponsor_memberships.sponsor_id = sponsor_profiles.sponsor_id
        AND sponsor_memberships.profile_id = auth.uid()
        AND sponsor_memberships.role IN ('owner', 'admin', 'marketing_manager')
        AND sponsor_memberships.status = 'active'
    )
  );
CREATE POLICY "Sponsor profiles are insertable by sponsor owners/admins/marketing managers"
  ON sponsor_profiles FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM sponsor_memberships
      WHERE sponsor_memberships.sponsor_id = sponsor_profiles.sponsor_id
        AND sponsor_memberships.profile_id = auth.uid()
        AND sponsor_memberships.role IN ('owner', 'admin', 'marketing_manager')
        AND sponsor_memberships.status = 'active'
    )
  );

-- Sponsorship listings table RLS
ALTER TABLE sponsorship_listings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Sponsorship listings are viewable by public when open/published"
  ON sponsorship_listings FOR SELECT
  USING (
    status IN ('open', 'paused', 'closed')
    AND published_at IS NOT NULL
  );
CREATE POLICY "Sponsorship listings are viewable by sponsor members"
  ON sponsorship_listings FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM sponsor_memberships
      WHERE sponsor_memberships.sponsor_id = sponsorship_listings.sponsor_id
        AND sponsor_memberships.profile_id = auth.uid()
        AND sponsor_memberships.status = 'active'
    )
  );
CREATE POLICY "Sponsorship listings are updatable by sponsor owners/admins/marketing managers"
  ON sponsorship_listings FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM sponsor_memberships
      WHERE sponsor_memberships.sponsor_id = sponsorship_listings.sponsor_id
        AND sponsor_memberships.profile_id = auth.uid()
        AND sponsor_memberships.role IN ('owner', 'admin', 'marketing_manager')
        AND sponsor_memberships.status = 'active'
    )
  );
CREATE POLICY "Sponsorship listings are insertable by sponsor owners/admins/marketing managers"
  ON sponsorship_listings FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM sponsor_memberships
      WHERE sponsor_memberships.sponsor_id = sponsorship_listings.sponsor_id
        AND sponsor_memberships.profile_id = auth.uid()
        AND sponsor_memberships.role IN ('owner', 'admin', 'marketing_manager')
        AND sponsor_memberships.status = 'active'
    )
  );

-- Listing requested assets table RLS
ALTER TABLE listing_requested_assets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Listing requested assets are viewable by sponsor members"
  ON listing_requested_assets FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM sponsor_memberships
      WHERE sponsor_memberships.sponsor_id = listing_requested_assets.listing_id
        AND sponsor_memberships.profile_id = auth.uid()
        AND sponsor_memberships.status = 'active'
    )
  );
CREATE POLICY "Listing requested assets are updatable by sponsor owners/admins/marketing managers"
  ON listing_requested_assets FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM sponsor_memberships
      WHERE sponsor_memberships.sponsor_id = listing_requested_assets.listing_id
        AND sponsor_memberships.profile_id = auth.uid()
        AND sponsor_memberships.role IN ('owner', 'admin', 'marketing_manager')
        AND sponsor_memberships.status = 'active'
    )
  );
CREATE POLICY "Listing requested assets are insertable by sponsor owners/admins/marketing managers"
  ON listing_requested_assets FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM sponsor_memberships
      WHERE sponsor_memberships.sponsor_id = listing_requested_assets.listing_id
        AND sponsor_memberships.profile_id = auth.uid()
        AND sponsor_memberships.role IN ('owner', 'admin', 'marketing_manager')
        AND sponsor_memberships.status = 'active'
    )
  );

-- Applications table RLS
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Applications are viewable by team members who submitted them"
  ON applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM team_memberships
      WHERE team_memberships.team_id = applications.team_id
        AND team_memberships.profile_id = auth.uid()
        AND team_memberships.status = 'active'
    )
  );
CREATE POLICY "Applications are viewable by sponsor members for their listings"
  ON applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM sponsorship_listings
      WHERE sponsorship_listings.id = applications.listing_id
        AND sponsorship_listings.sponsor_id = auth.uid()
    )
  );
CREATE POLICY "Applications are updatable by team members who submitted them"
  ON applications FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM team_memberships
      WHERE team_memberships.team_id = applications.team_id
        AND team_memberships.profile_id = auth.uid()
        AND team_memberships.status = 'active'
    )
  );
CREATE POLICY "Applications are insertable by team members"
  ON applications FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM team_memberships
      WHERE team_memberships.team_id = applications.team_id
        AND team_memberships.profile_id = auth.uid()
        AND team_memberships.status = 'active'
    )
  );

-- Contacts table RLS
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Contacts are viewable by team members"
  ON contacts FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM team_memberships
      WHERE team_memberships.team_id = contacts.team_id
        AND team_memberships.profile_id = auth.uid()
        AND team_memberships.status = 'active'
    )
    OR EXISTS (
      SELECT 1 FROM sponsor_memberships
      WHERE sponsor_memberships.sponsor_id = contacts.sponsor_id
        AND sponsor_memberships.profile_id = auth.uid()
        AND sponsor_memberships.status = 'active'
    )
  );
CREATE POLICY "Contacts are viewable by sponsor members"
  ON contacts FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM team_memberships
      WHERE team_memberships.team_id = contacts.team_id
        AND team_memberships.profile_id = auth.uid()
        AND team_memberships.status = 'active'
    )
    OR EXISTS (
      SELECT 1 FROM sponsor_memberships
      WHERE sponsor_memberships.sponsor_id = contacts.sponsor_id
        AND sponsor_memberships.profile_id = auth.uid()
        AND sponsor_memberships.status = 'active'
    )
  );
CREATE POLICY "Contacts are updatable by team members"
  ON contacts FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM team_memberships
      WHERE team_memberships.team_id = contacts.team_id
        AND team_memberships.profile_id = auth.uid()
        AND team_memberships.status = 'active'
    )
    OR EXISTS (
      SELECT 1 FROM sponsor_memberships
      WHERE sponsor_memberships.sponsor_id = contacts.sponsor_id
        AND sponsor_memberships.profile_id = auth.uid()
        AND sponsor_memberships.status = 'active'
    )
  );
CREATE POLICY "Contacts are insertable by team members"
  ON contacts FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM team_memberships
      WHERE team_memberships.team_id = contacts.team_id
        AND team_memberships.profile_id = auth.uid()
        AND team_memberships.status = 'active'
    )
    OR EXISTS (
      SELECT 1 FROM sponsor_memberships
      WHERE sponsor_memberships.sponsor_id = contacts.sponsor_id
        AND sponsor_memberships.profile_id = auth.uid()
        AND sponsor_memberships.status = 'active'
    )
  );

-- Deals table RLS
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Deals are viewable by team members"
  ON deals FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM team_memberships
      WHERE team_memberships.team_id = deals.team_id
        AND team_memberships.profile_id = auth.uid()
        AND team_memberships.status = 'active'
    )
  );
CREATE POLICY "Deals are viewable by sponsor members for their listings"
  ON deals FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM sponsorship_listings
      WHERE sponsorship_listings.id = deals.listing_id
        AND sponsorship_listings.sponsor_id = auth.uid()
    )
  );
CREATE POLICY "Deals are updatable by team sponsorship coordinators/owners/presidents"
  ON deals FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM team_memberships
      WHERE team_memberships.team_id = deals.team_id
        AND team_memberships.profile_id = auth.uid()
        AND team_memberships.role IN ('owner', 'president', 'sponsorship_coordinator')
        AND team_memberships.status = 'active'
    )
  );
CREATE POLICY "Deals are insertable by team sponsorship coordinators/owners/presidents"
  ON deals FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM team_memberships
      WHERE team_memberships.team_id = deals.team_id
        AND team_memberships.profile_id = auth.uid()
        AND team_memberships.role IN ('owner', 'president', 'sponsorship_coordinator')
        AND team_memberships.status = 'active'
    )
  );

-- Deliverables table RLS
ALTER TABLE deliverables ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Deliverables are viewable via their deals"
  ON deliverables FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM deals
      WHERE deals.id = deliverables.deal_id
        AND (
          EXISTS (
            SELECT 1 FROM team_memberships
            WHERE team_memberships.team_id = deals.team_id
              AND team_memberships.profile_id = auth.uid()
              AND team_memberships.status = 'active'
          )
          OR EXISTS (
            SELECT 1 FROM sponsorship_listings
            WHERE sponsorship_listings.id = deals.listing_id
              AND sponsorship_listings.sponsor_id = auth.uid()
          )
        )
    )
  );
CREATE POLICY "Deliverables are updatable via their deals"
  ON deliverables FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM deals
      WHERE deals.id = deliverables.deal_id
        AND (
          EXISTS (
            SELECT 1 FROM team_memberships
            WHERE team_memberships.team_id = deals.team_id
              AND team_memberships.profile_id = auth.uid()
              AND team_memberships.role IN ('owner', 'president', 'sponsorship_coordinator')
              AND team_memberships.status = 'active'
          )
          OR EXISTS (
            SELECT 1 FROM sponsorship_listings
            WHERE sponsorship_listings.id = deals.listing_id
              AND sponsorship_listings.sponsor_id = auth.uid()
          )
        )
    )
  );
CREATE POLICY "Deliverables are insertable via their deals"
  ON deliverables FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM deals
      WHERE deals.id = deliverables.deal_id
        AND (
          EXISTS (
            SELECT 1 FROM team_memberships
            WHERE team_memberships.team_id = deals.team_id
              AND team_memberships.profile_id = auth.uid()
              AND team_memberships.role IN ('owner', 'president', 'sponsorship_coordinator')
              AND team_memberships.status = 'active'
          )
          OR EXISTS (
            SELECT 1 FROM sponsorship_listings
            WHERE sponsorship_listings.id = deals.listing_id
              AND sponsorship_listings.sponsor_id = auth.uid()
          )
        )
    )
  );

-- Proofs table RLS
ALTER TABLE proofs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Proofs are viewable via their deliverables"
  ON proofs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM deliverables
      WHERE deliverables.id = proofs.deliverable_id
        AND (
          EXISTS (
            SELECT 1 FROM deals
            WHERE deals.id = deliverables.deal_id
              AND (
                EXISTS (
                  SELECT 1 FROM team_memberships
                  WHERE team_memberships.team_id = deals.team_id
                    AND team_memberships.profile_id = auth.uid()
                    AND team_memberships.status = 'active'
                )
                OR EXISTS (
                  SELECT 1 FROM sponsorship_listings
                  WHERE sponsorship_listings.id = deals.listing_id
                    AND sponsorship_listings.sponsor_id = auth.uid()
                )
              )
          )
        )
    )
  );
CREATE POLICY "Proofs are updatable via their deliverables"
  ON proofs FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM deliverables
      WHERE deliverables.id = proofs.deliverable_id
        AND (
          EXISTS (
            SELECT 1 FROM deals
            WHERE deals.id = deliverables.deal_id
              AND (
                EXISTS (
                  SELECT 1 FROM team_memberships
                  WHERE team_memberships.team_id = deals.team_id
                    AND team_memberships.profile_id = auth.uid()
                    AND team_memberships.role IN ('owner', 'president', 'sponsorship_coordinator')
                    AND team_memberships.status = 'active'
                )
                OR EXISTS (
                  SELECT 1 FROM sponsorship_listings
                  WHERE sponsorship_listings.id = deals.listing_id
                    AND sponsorship_listings.sponsor_id = auth.uid()
                )
              )
          )
        )
    )
  );
CREATE POLICY "Proofs are insertable via their deliverables"
  ON proofs FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM deliverables
      WHERE deliverables.id = proofs.deliverable_id
        AND (
          EXISTS (
            SELECT 1 FROM deals
            WHERE deals.id = deliverables.deal_id
              AND (
                EXISTS (
                  SELECT 1 FROM team_memberships
                  WHERE team_memberships.team_id = deals.team_id
                    AND team_memberships.profile_id = auth.uid()
                    AND team_memberships.role IN ('owner', 'president', 'sponsorship_coordinator')
                    AND team_memberships.status = 'active'
                )
                OR EXISTS (
                  SELECT 1 FROM sponsorship_listings
                  WHERE sponsorship_listings.id = deals.listing_id
                    AND sponsorship_listings.sponsor_id = auth.uid()
                )
              )
          )
        )
    )
  );

-- Attach updated_at triggers to all tables
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_teams_updated_at ON teams;
CREATE TRIGGER update_teams_updated_at
  BEFORE UPDATE ON teams
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_team_memberships_updated_at ON team_memberships;
CREATE TRIGGER update_team_memberships_updated_at
  BEFORE UPDATE ON team_memberships
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_team_profiles_updated_at ON team_profiles;
CREATE TRIGGER update_team_profiles_updated_at
  BEFORE UPDATE ON team_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_team_events_updated_at ON team_events;
CREATE TRIGGER update_team_events_updated_at
  BEFORE UPDATE ON team_events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_sponsorship_asset_definitions_updated_at ON sponsorship_asset_definitions;
CREATE TRIGGER update_sponsorship_asset_definitions_updated_at
  BEFORE UPDATE ON sponsorship_asset_definitions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_team_sponsorship_assets_updated_at ON team_sponsorship_assets;
CREATE TRIGGER update_team_sponsorship_assets_updated_at
  BEFORE UPDATE ON team_sponsorship_assets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_sponsors_updated_at ON sponsors;
CREATE TRIGGER update_sponsors_updated_at
  BEFORE UPDATE ON sponsors
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_sponsor_memberships_updated_at ON sponsor_memberships;
CREATE TRIGGER update_sponsor_memberships_updated_at
  BEFORE UPDATE ON sponsor_memberships
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_sponsor_profiles_updated_at ON sponsor_profiles;
CREATE TRIGGER update_sponsor_profiles_updated_at
  BEFORE UPDATE ON sponsor_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_sponsorship_listings_updated_at ON sponsorship_listings;
CREATE TRIGGER update_sponsorship_listings_updated_at
  BEFORE UPDATE ON sponsorship_listings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_listing_requested_assets_updated_at ON listing_requested_assets;
CREATE TRIGGER update_listing_requested_assets_updated_at
  BEFORE UPDATE ON listing_requested_assets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_applications_updated_at ON applications;
CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_contacts_updated_at ON contacts;
CREATE TRIGGER update_contacts_updated_at
  BEFORE UPDATE ON contacts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_deals_updated_at ON deals;
CREATE TRIGGER update_deals_updated_at
  BEFORE UPDATE ON deals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_deliverables_updated_at ON deliverables;
CREATE TRIGGER update_deliverables_updated_at
  BEFORE UPDATE ON deliverables
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_proofs_updated_at ON proofs;
CREATE TRIGGER update_proofs_updated_at
  BEFORE UPDATE ON proofs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

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
