-- Insert mock profiles
INSERT INTO profiles (id, full_name, email, primary_side, created_at, updated_at) VALUES
  ('00000000-0000-0000-0000-000000000000', 'Seed Admin', 'seed-admin@spontus.test', 'internal', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000001', 'Triathlon President', 'tri-president@calpoly.edu', 'team', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000002', 'Soccer President', 'soccer-president@calpoly.edu', 'team', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000003', 'Rugby President', 'rugby-president@calpoly.edu', 'team', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000004', 'Swim President', 'swim-president@calpoly.edu', 'team', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000005', 'Fluid Owner', 'owner@fluidnutrition.test', 'sponsor', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000006', 'SLO Roasters Owner', 'owner@sloroasters.test', 'sponsor', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000007', 'Gnarly Owner', 'owner@gnarlynutrition.test', 'sponsor', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000008', 'Central Coast PT Owner', 'owner@centralcoastpt.test', 'sponsor', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000009', 'On Running Owner', 'owner@onrunning.test', 'sponsor', NOW(), NOW());

-- Insert mock teams
INSERT INTO teams (id, name, university, sport, location, slug, verification_status, created_by, created_at, updated_at) VALUES
  ('cp-tri', 'Cal Poly Triathlon', 'Cal Poly San Luis Obispo', 'Triathlon', 'San Luis Obispo, CA', 'cal-poly-triathlon', 'verified', '00000000-0000-0000-0000-000000000000', NOW(), NOW()),
  ('cp-soccer', 'Cal Poly Men''s Soccer', 'Cal Poly San Luis Obispo', 'Soccer', 'San Luis Obispo, CA', 'cal-poly-mens-soccer', 'submitted_for_verification', '00000000-0000-0000-0000-000000000000', NOW(), NOW()),
  ('cp-rugby', 'Cal Poly Men''s Rugby', 'Cal Poly San Luis Obispo', 'Rugby', 'San Luis Obispo, CA', 'cal-poly-mens-rugby', 'verified', '00000000-0000-0000-0000-000000000000', NOW(), NOW()),
  ('cp-swim', 'Cal Poly Club Swim', 'Cal Poly San Luis Obispo', 'Swim', 'San Luis Obispo, CA', 'cal-poly-club-swim', 'needs_changes', '00000000-0000-0000-0000-000000000000', NOW(), NOW());

-- Insert team profiles
INSERT INTO team_profiles (id, team_id, one_liner, description, roster_size, year_founded, league, competition_summary, season, website_url, instagram_url, tiktok_url, youtube_url, livestream_url, combined_reach, social_links, photo, past_sponsors, preferred_sponsor_categories, excluded_sponsor_categories, deal_types_interested_in, profile_completeness, submitted_at, published_at, created_at, updated_at) VALUES
  (
    'tp-tri', 'cp-tri',
    'Cal Poly''s largest club sport - 80 athletes competing at collegiate nationals and hosting the March Triathlon Series',
    '80+ athletes split across draft-legal, long course, and Olympic distances. We host the annual March Triathlon Series (MTS) every spring with 500+ athletes and travel to USAT Collegiate Nationals. Strong sponsor-fulfillment track record with 10 product brands over the last 3 seasons.',
    80, 2005, 'USA Triathlon Collegiate',
    'West Regional Championships (April), USAT Collegiate Nationals (April), March Triathlon Series - host (March)',
    'Year-round', 'https://calpolytriathlon.com', 'https://instagram.com/calpolytriathlon', 'https://tiktok.com/@calpolytri', NULL, NULL, 8000,
    '[{"platform":"Instagram","url":"https://instagram.com/calpolytriathlon","followerCount":3200},{"platform":"TikTok","url":"https://tiktok.com/@calpolytri","followerCount":1800},{"platform":"Newsletter","url":"","followerCount":640}]',
    'https://images.unsplash.com/photo-1530549387789-4c1017266635-auto=format&fit=crop&w=1200&q=70',
    '["Sailfish","Garmin","Fluid Nutrition","100%","Carbs Fuel","Voler","Running Warehouse","GH Sports","Cambria Bike","Maurten"]',
    '["Nutrition","Beverage","Apparel","Equipment","Recovery/Fitness"]',
    '["Alcohol","Gambling","Tobacco/Nicotine"]',
    '["Free product for team use","Cash sponsorship","Event prizes","Product for event packets/goody bags","On-site services"]',
    92, NOW(), NOW(), NOW(), NOW()
  ),
  (
    'tp-soccer', 'cp-soccer',
    'Division I club soccer competing in the WCSA with 100K+ highlight views per season',
    'Top-ranked NIRSA Region VI club. Weekly livestreams on Veo, regular highlight reels, and an active social audience. We compete in the West Coast Soccer Association with home matches at Mustang Field. Looking for sponsors who want high-visibility digital placements rather than traditional jersey logos.',
    50, 1998, 'West Coast Soccer Association',
    'WCSA regular season (Fall), NIRSA Regional Championship (November), NIRSA National Championship qualifier',
    'Fall', 'https://calpoly.campuslabs.com/engage/organization/menssoccer', 'https://instagram.com/cpmenssoccer', NULL, 'https://veo.co/calpolymenssoccer', 12000,
    '[{"platform":"Instagram","url":"https://instagram.com/cpmenssoccer","followerCount":2100},{"platform":"Veo Livestream","url":"https://veo.co/calpolymenssoccer","followerCount":8400},{"platform":"TikTok","url":"https://tiktok.com/@cpmenssoccer","followerCount":1500}]',
    'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a-auto=format&fit=crop&w=1200&q=70',
    '[]',
    '["Beverage","Apparel","Equipment","Technology","Local Business"]',
    '["Energy Drinks","Alcohol","Gambling"]',
    '["Free product for team use","Cash sponsorship","Discount codes","Gift cards"]',
    68, NOW(), NOW(), NOW(), NOW()
  ),
  (
    'tp-rugby', 'cp-rugby',
    'D1A club rugby program with loyal sideline crowds and an active alumni network',
    'D1A club rugby competing in the Pacific Western Rugby Conference. Home matches at Mustang Field draw consistent sideline crowds. Strong alumni donor base and local business partnerships.',
    45, 1970, 'Pacific Western Rugby Conference',
    NULL, 'Spring', NULL, 'https://instagram.com/cpmenrugby', '', NULL, NULL, 4200,
    '[{"platform":"Instagram","url":"https://instagram.com/cpmenrugby","followerCount":3200},{"platform":"TikTok","url":"","followerCount":1000}]',
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018-auto=format&fit=crop&w=1200&q=70',
    '["Rhino Rugby","SLO Brew","Central Coast Physical Therapy","Firestone Grill"]',
    '["Apparel","Beverage","Local Business","Recovery/Fitness"]',
    '["Gambling"]',
    '["Cash sponsorship","Free product for team use","Discount codes"]',
    55, NOW(), NOW(), NOW(), NOW()
  ),
  (
    'tp-swim', 'cp-swim',
    'Nationally competitive club swim with 20+ past product collaborations',
    'Travels to CSCA Nationals every spring. 20+ past product sponsors over the last 4 seasons. Great for sampling and gear - we have a captive audience of 40 athletes who train daily.',
    40, 2010, 'College Swimming Club Association',
    NULL, 'Fall & Spring', NULL, 'https://instagram.com/cpclubswim', NULL, NULL, 3200,
    '[{"platform":"Instagram","url":"https://instagram.com/cpclubswim","followerCount":2600}]',
    'https://images.unsplash.com/photo-1519315901367-f34ff9154487-auto=format&fit=crop&w=1200&q=70',
    '["TYR","Speedo","Arena","SwimOutlet","FINIS","Roka","Skratch Labs"]',
    '["Apparel","Nutrition","Recovery/Fitness","Equipment"]',
    '["Supplements we cannot verify","Tobacco/Nicotine"]',
    '["Free product for team use","Discount codes","Gift cards"]',
    60, NOW(), NOW(), NOW(), NOW()
  );

-- Insert team events
INSERT INTO team_events (id, team_id, name, event_type, starts_on, location, expected_attendance, notes, created_at) VALUES
  ('evt-1', 'cp-tri', 'West Regional Championships', 'competition', '2026-04-11', 'Tempe, AZ', 300, NULL, NOW()),
  ('evt-2', 'cp-tri', 'USAT Collegiate Nationals', 'competition', '2026-04-25', 'Tempe, AZ', 2000, NULL, NOW()),
  ('evt-3', 'cp-soccer', 'WCSA Fall Season', 'competition', '2026-09-05', 'San Luis Obispo, CA', 200, '10 home matches, weekly livestreams', NOW()),
  ('evt-4', 'cp-soccer', 'NIRSA Region VI Championship', 'competition', '2026-11-14', 'TBD', 500, NULL, NOW()),
  ('evt-5', 'cp-swim', 'CSCA Nationals', 'competition', '2026-04-03', 'Atlanta, GA', 1500, NULL, NOW());

-- Insert hosted events
INSERT INTO team_events (id, team_id, name, event_type, starts_on, location, expected_attendance, notes, created_at) VALUES
  ('hosted-1', 'cp-tri', 'March Triathlon Series (MTS)', 'hosted_event', '2026-03-07', 'San Luis Obispo, CA', 500, 'Sprint + Olympic distances. Packet pickup, finish-line booths, podium awards, and post-race expo all open to sponsors.', NOW());

-- Insert team sponsorship assets
INSERT INTO team_sponsorship_assets (id, team_id, asset_id, status, notes, created_at, updated_at) VALUES
  ('tsa-tri-1', 'cp-tri', 'jersey_logo', 'preferred', 'Preferred - strongest visibility', NOW(), NOW()),
  ('tsa-tri-2', 'cp-tri', 'brand_booth', 'preferred', 'Available at MTS and home events', NOW(), NOW()),
  ('tsa-tri-3', 'cp-tri', 'product_sampling', 'available', 'On-course nutrition at MTS', NOW(), NOW()),
  ('tsa-tri-4', 'cp-tri', 'athlete_packet_stuffing', 'available', NULL, NOW(), NOW()),
  ('tsa-tri-5', 'cp-tri', 'podium_prize_sponsorship', 'available', NULL, NOW(), NOW()),
  ('tsa-tri-6', 'cp-tri', 'packet_pickup_hosting', 'available', NULL, NOW(), NOW()),
  ('tsa-tri-7', 'cp-tri', 'instagram_post', 'available', NULL, NOW(), NOW()),
  ('tsa-tri-8', 'cp-tri', 'instagram_story', 'available', NULL, NOW(), NOW()),
  ('tsa-tri-9', 'cp-tri', 'banner_at_games', 'available', NULL, NOW(), NOW()),
  ('tsa-tri-10', 'cp-tri', 'website_logo', 'available', NULL, NOW(), NOW()),
  ('tsa-soccer-1', 'cp-soccer', 'livestream_ad_placement', 'preferred', 'Pre-roll + banner overlay on Veo streams', NOW(), NOW()),
  ('tsa-soccer-2', 'cp-soccer', 'highlight_video_logo', 'preferred', '100K+ views per season', NOW(), NOW()),
  ('tsa-soccer-3', 'cp-soccer', 'instagram_post', 'available', NULL, NOW(), NOW()),
  ('tsa-soccer-4', 'cp-soccer', 'instagram_story', 'available', NULL, NOW(), NOW()),
  ('tsa-soccer-5', 'cp-soccer', 'tiktok_reel', 'available', NULL, NOW(), NOW()),
  ('tsa-soccer-6', 'cp-soccer', 'banner_at_games', 'available', 'Sideline banners at Mustang Field', NOW(), NOW()),
  ('tsa-soccer-7', 'cp-soccer', 'jersey_logo', 'unavailable', 'We prefer to keep jerseys clean', NOW(), NOW()),
  ('tsa-rugby-1', 'cp-rugby', 'jersey_logo', 'preferred', NULL, NOW(), NOW()),
  ('tsa-rugby-2', 'cp-rugby', 'banner_at_games', 'available', NULL, NOW(), NOW()),
  ('tsa-rugby-3', 'cp-rugby', 'instagram_post', 'available', NULL, NOW(), NOW()),
  ('tsa-rugby-4', 'cp-rugby', 'instagram_story', 'available', NULL, NOW(), NOW()),
  ('tsa-swim-1', 'cp-swim', 'instagram_post', 'preferred', NULL, NOW(), NOW()),
  ('tsa-swim-2', 'cp-swim', 'instagram_story', 'available', NULL, NOW(), NOW()),
  ('tsa-swim-3', 'cp-swim', 'product_sampling', 'preferred', 'Captive audience of 40 daily athletes', NOW(), NOW());

-- Insert mock sponsors
INSERT INTO sponsors (id, company_name, website_url, industry_category, verification_status, created_by, created_at, updated_at) VALUES
  ('sp-fluid', 'Fluid Nutrition', 'https://fluidnutrition.com', 'Nutrition & supplements', 'verified', '00000000-0000-0000-0000-000000000000', NOW(), NOW()),
  ('sp-slo-roasters', 'SLO Roasters', 'https://sloroasters.com', 'Food & restaurant', 'submitted_for_verification', '00000000-0000-0000-0000-000000000000', NOW(), NOW()),
  ('sp-seed-gnarly', 'Gnarly Nutrition', 'https://gnarlynutrition.com', 'Nutrition & supplements', 'verified', '00000000-0000-0000-0000-000000000000', NOW(), NOW()),
  ('sp-seed-ccpt', 'Central Coast Physical Therapy', 'https://centralcoastpt.com', 'Recovery & wellness', 'needs_changes', '00000000-0000-0000-0000-000000000000', NOW(), NOW()),
  ('sp-seed-onrunning', 'On Running', 'https://on-running.com', 'Apparel & gear', 'verified', '00000000-0000-0000-0000-000000000000', NOW(), NOW());

-- Insert sponsor profiles
INSERT INTO sponsor_profiles (id, sponsor_id, brand_name, one_liner, description, logo_url, instagram_url, target_audience, geographic_focus, typical_offer_types, past_sponsorships, created_at, updated_at) VALUES
  (
    'spf-fluid', 'sp-fluid', 'Fluid Nutrition', 'Performance nutrition for endurance athletes.',
    'Athlete-owned endurance fuel and recovery brand. We''ve sponsored college endurance teams since 2018 - currently partnered with 14 club programs across triathlon, cycling, and trail running.',
    NULL, 'https://instagram.com/fluidnutrition', 'Endurance athletes 18-30', 'California',
    '["Free product for team use","Cash sponsorship","Event prizes"]',
    'Sponsored 12 club teams across 5 universities including Cal Poly Triathlon (2025 host race), UC Davis Cycling (2024-25), and Stanford Tri (2024).',
    NOW(), NOW()
  ),
  (
    'spf-slo-roasters', 'sp-slo-roasters', 'SLO Roasters', 'Locally roasted coffee for Cal Poly athletes and fans.',
    'San Luis Obispo''s hometown roaster. We support local club sports because our athletes are our customers. Great for game-day energy, team study sessions, and community events.',
    NULL, 'https://instagram.com/sloroasters', 'Cal Poly students and local community', 'San Luis Obispo',
    '["Discount codes","Gift cards"]',
    'Supported Cal Poly Club Swim and Cal Poly Running Club with discount cards and event coffee service.',
    NOW(), NOW()
  ),
  (
    'spf-seed-gnarly', 'sp-seed-gnarly', 'Gnarly Nutrition', 'Plant-based performance fuel for endurance athletes.',
    NULL, 'https://gnarlynutrition.com', NULL, 'West Coast + Mountain',
    '["Free product for team use","Event prizes"]',
    NULL, NOW(), NOW()
  ),
  (
    'spf-seed-ccpt', 'sp-seed-ccpt', 'Central Coast PT', 'Sports rehab and injury prevention for Cal Poly athletes.',
    'Local sports medicine practice providing rehab, injury prevention, and pre-season screenings for Cal Poly club sports teams.',
    'https://centralcoastpt.com', NULL, 'Cal Poly club athletes', 'San Luis Obispo',
    '["On-site services","Discount codes"]',
    NULL, NOW(), NOW()
  ),
  (
    'spf-seed-onrunning', 'sp-seed-onrunning', 'On Running', 'Swiss-engineered running shoes and apparel.',
    NULL, 'https://on-running.com', NULL, 'Nationwide',
    '["Discount codes","Free product for team use"]',
    NULL, NOW(), NOW()
  );

-- Insert sponsorship listings
INSERT INTO sponsorship_listings (id, sponsor_id, title, description, status, offer_types, offer_summary, number_of_teams, geography, sport_preferences, team_size_min, social_reach_min, duration, application_deadline, created_at, updated_at, published_at) VALUES
  (
    'lst-fluid-fall', 'sp-fluid', 'Fall endurance team partnerships',
    'Fluid Nutrition is looking for 3 club endurance teams in California for the Fall 2026 season. We provide product allocation and cash to help fuel your athletes - in return, we want authentic social content and event sampling opportunities.',
    'open', '["Free product for team use","Cash sponsorship"]',
    'Product allocation (6-month supply per athlete) + $300 cash per team', 3, 'California',
    '["Triathlon","Cycling","Running","Swim"]', 30, 1000,
    'Fall 2026 season', '2026-08-30', NOW(), NOW(), '2026-05-20'
  ),
  (
    'lst-slo-coffee', 'sp-slo-roasters', 'Cal Poly club sports coffee partner',
    'SLO Roasters wants to partner with Cal Poly club sports teams for the full academic year. We offer discount codes for your athletes and gift cards for events - all we ask is a game-day banner and an occasional social shoutout.',
    'open', '["Discount codes","Gift cards"]',
    '20% discount codes for all team members + $25 gift cards for game-day prizes', 5, 'San Luis Obispo',
    '[]', NULL, NULL,
    '2026-27 academic year', '2026-09-15', NOW(), NOW(), '2026-05-22'
  );

-- Insert listing requested assets
INSERT INTO listing_requested_assets (id, listing_id, asset_id, required, notes, created_at) VALUES
  ('lra-fluid-1', 'lst-fluid-fall', 'instagram_post', true, NULL, NOW()),
  ('lra-fluid-2', 'lst-fluid-fall', 'product_sampling', true, NULL, NOW()),
  ('lra-fluid-3', 'lst-fluid-fall', 'instagram_story', false, NULL, NOW()),
  ('lra-slo-1', 'lst-slo-coffee', 'banner_at_games', true, NULL, NOW()),
  ('lra-slo-2', 'lst-slo-coffee', 'instagram_story', false, NULL, NOW());

-- Insert mock seed listings (these are historical)
INSERT INTO sponsorship_listings (id, sponsor_id, title, description, status, offer_types, offer_summary, number_of_teams, geography, sport_preferences, team_size_min, social_reach_min, duration, application_deadline, created_at, updated_at, published_at) VALUES
  (
    'lst-seed-1', 'sp-seed-gnarly', 'Spring endurance team partnerships',
    NULL, 'closed', '["Free product for team use","Event prizes"]',
    'Free product (6-month supply per athlete)', 8, 'California',
    '["Triathlon","Cycling","Running"]', NULL, NULL,
    'Spring 2026 season', '2026-03-14', NOW(), NOW(), '2026-01-10'
  ),
  (
    'lst-seed-2', 'sp-seed-onrunning', 'College club running & tri partnerships',
    NULL, 'closed', '["Discount codes","Free product for team use"]',
    'Discount codes + 20% team kit', 20, 'Nationwide',
    '["Running","Triathlon"]', NULL, NULL,
    '2025-26 academic year', '2025-08-30', NOW(), NOW(), '2025-07-01'
  );

-- Insert seed applications
INSERT INTO applications (id, listing_id, team_id, status, fit_note, decline_reason, submitted_at, reviewed_at, created_at, updated_at) VALUES
  (
    'app-seed-1', 'lst-seed-1', 'cp-tri', 'under_review',
    'We host an 800-athlete tri in May and would love to plug Gnarly at packet pickup.',
    NULL, '2026-05-15', NULL, NOW(), NOW()
  ),
  (
    'app-seed-2', 'lst-seed-2', 'cp-tri', 'accepted',
    NULL, NULL, '2026-05-01', '2026-05-10', NOW(), NOW()
  ),
  (
    'app-seed-fluid-tri', 'lst-fluid-fall', 'cp-tri', 'submitted',
    'We host the MTS with 500+ athletes and can offer on-course sampling, packet stuffing, and podium prizes.',
    NULL, '2026-05-22', NULL, NOW(), NOW()
  ),
  (
    'app-seed-fluid-rugby', 'lst-fluid-fall', 'cp-rugby', 'submitted',
    'Strong sideline crowd at home matches. We can offer jersey logos and game-day banners.',
    NULL, '2026-05-23', NULL, NOW(), NOW()
  ),
  (
    'app-seed-fluid-swim', 'lst-fluid-fall', 'cp-swim', 'submitted',
    NULL, NULL, '2026-05-24', NULL, NOW(), NOW()
  );

-- Insert team memberships (for simplicity, we'll create one membership per team for a "president")
INSERT INTO team_memberships (id, team_id, profile_id, role, status, created_at) VALUES
  ('tm-tri-1', 'cp-tri', '00000000-0000-0000-0000-000000000001', 'president', 'active', NOW()),
  ('tm-soccer-1', 'cp-soccer', '00000000-0000-0000-0000-000000000002', 'president', 'active', NOW()),
  ('tm-rugby-1', 'cp-rugby', '00000000-0000-0000-0000-000000000003', 'president', 'active', NOW()),
  ('tm-swim-1', 'cp-swim', '00000000-0000-0000-0000-000000000004', 'president', 'active', NOW());

-- Insert sponsor memberships
INSERT INTO sponsor_memberships (id, sponsor_id, profile_id, role, status, created_at) VALUES
  ('sm-fluid-1', 'sp-fluid', '00000000-0000-0000-0000-000000000005', 'owner', 'active', NOW()),
  ('sm-slo-roasters-1', 'sp-slo-roasters', '00000000-0000-0000-0000-000000000006', 'owner', 'active', NOW()),
  ('sm-seed-gnarly-1', 'sp-seed-gnarly', '00000000-0000-0000-0000-000000000007', 'owner', 'active', NOW()),
  ('sm-seed-ccpt-1', 'sp-seed-ccpt', '00000000-0000-0000-0000-000000000008', 'owner', 'active', NOW()),
  ('sm-seed-onrunning-1', 'sp-seed-onrunning', '00000000-0000-0000-0000-000000000009', 'owner', 'active', NOW());
