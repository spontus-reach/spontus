import type { TeamProfile, SponsorProfile, SponsorshipListing, Application } from './types';

export const MOCK_TEAMS: TeamProfile[] = [
  {
    id: 'cp-tri',
    slug: 'cal-poly-triathlon',
    name: 'Cal Poly Triathlon',
    university: 'Cal Poly San Luis Obispo',
    sport: 'Triathlon',
    location: 'San Luis Obispo, CA',
    rosterSize: 80,
    yearFounded: 2005,
    oneLiner:
      "Cal Poly's largest club sport — 80 athletes competing at collegiate nationals and hosting the March Triathlon Series",
    description:
      '80+ athletes split across draft-legal, long course, and Olympic distances. We host the annual March Triathlon Series (MTS) every spring with 500+ athletes and travel to USAT Collegiate Nationals. Strong sponsor-fulfillment track record with 10 product brands over the last 3 seasons.',
    league: 'USA Triathlon Collegiate',
    competitionSummary:
      'West Regional Championships (April), USAT Collegiate Nationals (April), March Triathlon Series — host (March)',
    season: 'Year-round',
    websiteUrl: 'https://calpolytriathlon.com',
    instagramUrl: 'https://instagram.com/calpolytriathlon',
    tiktokUrl: 'https://tiktok.com/@calpolytri',
    combinedReach: 8000,
    socialLinks: [
      { platform: 'Instagram', url: 'https://instagram.com/calpolytriathlon', followerCount: 3200 },
      { platform: 'TikTok', url: 'https://tiktok.com/@calpolytri', followerCount: 1800 },
      { platform: 'Newsletter', url: '', followerCount: 640 },
    ],
    events: [
      {
        id: 'evt-1',
        name: 'West Regional Championships',
        eventType: 'competition',
        startsOn: '2026-04-11',
        location: 'Tempe, AZ',
        expectedAttendance: 300,
      },
      {
        id: 'evt-2',
        name: 'USAT Collegiate Nationals',
        eventType: 'competition',
        startsOn: '2026-04-25',
        location: 'Tempe, AZ',
        expectedAttendance: 2000,
      },
    ],
    hostedEvents: [
      {
        id: 'hosted-1',
        name: 'March Triathlon Series (MTS)',
        eventType: 'hosted_event',
        startsOn: '2026-03-07',
        location: 'San Luis Obispo, CA',
        expectedAttendance: 500,
        notes:
          'Sprint + Olympic distances. Packet pickup, finish-line booths, podium awards, and post-race expo all open to sponsors.',
      },
    ],
    sponsorshipAssets: [
      { assetId: 'jersey_logo', status: 'preferred', notes: 'Preferred — strongest visibility' },
      { assetId: 'brand_booth', status: 'preferred', notes: 'Available at MTS and home events' },
      { assetId: 'product_sampling', status: 'available', notes: 'On-course nutrition at MTS' },
      { assetId: 'athlete_packet_stuffing', status: 'available' },
      { assetId: 'podium_prize_sponsorship', status: 'available' },
      { assetId: 'packet_pickup_hosting', status: 'available' },
      { assetId: 'instagram_post', status: 'available' },
      { assetId: 'instagram_story', status: 'available' },
      { assetId: 'banner_at_games', status: 'available' },
      { assetId: 'website_logo', status: 'available' },
    ],
    preferredSponsorCategories: ['Nutrition', 'Beverage', 'Apparel', 'Equipment', 'Recovery/Fitness'],
    excludedSponsorCategories: ['Alcohol', 'Gambling', 'Tobacco/Nicotine'],
    dealTypesInterestedIn: [
      'Free product for team use',
      'Cash sponsorship',
      'Event prizes',
      'Product for event packets/goody bags',
      'On-site services',
    ],
    verificationStatus: 'verified',
    profileCompleteness: 92,
    photo: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=70',
    pastSponsors: [
      'Sailfish',
      'Garmin',
      'Fluid Nutrition',
      '100%',
      'Carbs Fuel',
      'Voler',
      'Running Warehouse',
      'GH Sports',
      'Cambria Bike',
      'Maurten',
    ],
  },
  {
    id: 'cp-soccer',
    slug: 'cal-poly-mens-soccer',
    name: "Cal Poly Men's Soccer",
    university: 'Cal Poly San Luis Obispo',
    sport: 'Soccer',
    location: 'San Luis Obispo, CA',
    rosterSize: 50,
    yearFounded: 1998,
    oneLiner:
      'Division I club soccer competing in the WCSA with 100K+ highlight views per season',
    description:
      'Top-ranked NIRSA Region VI club. Weekly livestreams on Veo, regular highlight reels, and an active social audience. We compete in the West Coast Soccer Association with home matches at Mustang Field. Looking for sponsors who want high-visibility digital placements rather than traditional jersey logos.',
    league: 'West Coast Soccer Association',
    competitionSummary:
      'WCSA regular season (Fall), NIRSA Regional Championship (November), NIRSA National Championship qualifier',
    season: 'Fall',
    websiteUrl: 'https://calpoly.campuslabs.com/engage/organization/menssoccer',
    instagramUrl: 'https://instagram.com/cpmenssoccer',
    livestreamUrl: 'https://veo.co/calpolymenssoccer',
    combinedReach: 12000,
    socialLinks: [
      { platform: 'Instagram', url: 'https://instagram.com/cpmenssoccer', followerCount: 2100 },
      { platform: 'Veo Livestream', url: 'https://veo.co/calpolymenssoccer', followerCount: 8400 },
      { platform: 'TikTok', url: 'https://tiktok.com/@cpmenssoccer', followerCount: 1500 },
    ],
    events: [
      {
        id: 'evt-3',
        name: 'WCSA Fall Season',
        eventType: 'competition',
        startsOn: '2026-09-05',
        location: 'San Luis Obispo, CA',
        expectedAttendance: 200,
        notes: '10 home matches, weekly livestreams',
      },
      {
        id: 'evt-4',
        name: 'NIRSA Region VI Championship',
        eventType: 'competition',
        startsOn: '2026-11-14',
        location: 'TBD',
        expectedAttendance: 500,
      },
    ],
    hostedEvents: [],
    sponsorshipAssets: [
      { assetId: 'livestream_ad_placement', status: 'preferred', notes: 'Pre-roll + banner overlay on Veo streams' },
      { assetId: 'highlight_video_logo', status: 'preferred', notes: '100K+ views per season' },
      { assetId: 'instagram_post', status: 'available' },
      { assetId: 'instagram_story', status: 'available' },
      { assetId: 'tiktok_reel', status: 'available' },
      { assetId: 'banner_at_games', status: 'available', notes: 'Sideline banners at Mustang Field' },
      { assetId: 'jersey_logo', status: 'unavailable', notes: 'We prefer to keep jerseys clean' },
    ],
    preferredSponsorCategories: ['Beverage', 'Apparel', 'Equipment', 'Technology', 'Local Business'],
    excludedSponsorCategories: ['Energy Drinks', 'Alcohol', 'Gambling'],
    dealTypesInterestedIn: [
      'Free product for team use',
      'Cash sponsorship',
      'Discount codes',
      'Gift cards',
    ],
    verificationStatus: 'submitted_for_verification',
    profileCompleteness: 68,
    photo: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=1200&q=70',
    pastSponsors: [],
  },
  {
    id: 'cp-rugby',
    slug: 'cal-poly-mens-rugby',
    name: "Cal Poly Men's Rugby",
    university: 'Cal Poly San Luis Obispo',
    sport: 'Rugby',
    location: 'San Luis Obispo, CA',
    rosterSize: 45,
    yearFounded: 1970,
    oneLiner: 'D1A club rugby program with loyal sideline crowds and an active alumni network',
    description:
      'D1A club rugby competing in the Pacific Western Rugby Conference. Home matches at Mustang Field draw consistent sideline crowds. Strong alumni donor base and local business partnerships.',
    league: 'Pacific Western Rugby Conference',
    season: 'Spring',
    combinedReach: 4200,
    socialLinks: [
      { platform: 'Instagram', url: 'https://instagram.com/cpmenrugby', followerCount: 3200 },
      { platform: 'TikTok', url: '', followerCount: 1000 },
    ],
    events: [],
    hostedEvents: [],
    sponsorshipAssets: [
      { assetId: 'jersey_logo', status: 'preferred' },
      { assetId: 'banner_at_games', status: 'available' },
      { assetId: 'instagram_post', status: 'available' },
      { assetId: 'instagram_story', status: 'available' },
    ],
    preferredSponsorCategories: ['Apparel', 'Beverage', 'Local Business', 'Recovery/Fitness'],
    excludedSponsorCategories: ['Gambling'],
    dealTypesInterestedIn: ['Cash sponsorship', 'Free product for team use', 'Discount codes'],
    verificationStatus: 'verified',
    profileCompleteness: 55,
    photo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=70',
    pastSponsors: ['Rhino Rugby', 'SLO Brew', 'Central Coast Physical Therapy', 'Firestone Grill'],
  },
  {
    id: 'cp-swim',
    slug: 'cal-poly-club-swim',
    name: 'Cal Poly Club Swim',
    university: 'Cal Poly San Luis Obispo',
    sport: 'Swim',
    location: 'San Luis Obispo, CA',
    rosterSize: 40,
    yearFounded: 2010,
    oneLiner: 'Nationally competitive club swim with 20+ past product collaborations',
    description:
      'Travels to CSCA Nationals every spring. 20+ past product sponsors over the last 4 seasons. Great for sampling and gear — we have a captive audience of 40 athletes who train daily.',
    league: 'College Swimming Club Association',
    season: 'Fall & Spring',
    combinedReach: 3200,
    socialLinks: [
      { platform: 'Instagram', url: 'https://instagram.com/cpclubswim', followerCount: 2600 },
    ],
    events: [
      {
        id: 'evt-5',
        name: 'CSCA Nationals',
        eventType: 'competition',
        startsOn: '2026-04-03',
        location: 'Atlanta, GA',
        expectedAttendance: 1500,
      },
    ],
    hostedEvents: [],
    sponsorshipAssets: [
      { assetId: 'instagram_post', status: 'preferred' },
      { assetId: 'instagram_story', status: 'available' },
      { assetId: 'product_sampling', status: 'preferred', notes: 'Captive audience of 40 daily athletes' },
    ],
    preferredSponsorCategories: ['Apparel', 'Nutrition', 'Recovery/Fitness', 'Equipment'],
    excludedSponsorCategories: ['Supplements we cannot verify', 'Tobacco/Nicotine'],
    dealTypesInterestedIn: ['Free product for team use', 'Discount codes', 'Gift cards'],
    verificationStatus: 'needs_changes',
    profileCompleteness: 60,
    photo: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&w=1200&q=70',
    pastSponsors: [
      'TYR',
      'Speedo',
      'Arena',
      'SwimOutlet',
      'FINIS',
      'Roka',
      'Skratch Labs',
    ],
  },
];

export function getTeamBySlug(slug: string): TeamProfile | undefined {
  return MOCK_TEAMS.find((t) => t.slug === slug);
}

// --- Sponsor-side mock data (Slice 2) ---

export const MOCK_SPONSORS: SponsorProfile[] = [
  {
    id: 'sp-fluid',
    companyName: 'Fluid Nutrition',
    brandName: 'Fluid Nutrition',
    oneLiner: 'Performance nutrition for endurance athletes.',
    description:
      'Athlete-owned endurance fuel and recovery brand. We\'ve sponsored college endurance teams since 2018 — currently partnered with 14 club programs across triathlon, cycling, and trail running.',
    websiteUrl: 'https://fluidnutrition.com',
    instagramUrl: 'https://instagram.com/fluidnutrition',
    industryCategory: 'Nutrition & supplements',
    targetAudience: 'Endurance athletes 18-30',
    geographicFocus: 'California',
    typicalOfferTypes: [
      'Free product for team use',
      'Cash sponsorship',
      'Event prizes',
    ],
    pastSponsorships:
      'Sponsored 12 club teams across 5 universities including Cal Poly Triathlon (2025 host race), UC Davis Cycling (2024-25), and Stanford Tri (2024).',
    verificationStatus: 'verified',
  },
  {
    id: 'sp-slo-roasters',
    companyName: 'SLO Roasters',
    brandName: 'SLO Roasters',
    oneLiner: 'Locally roasted coffee for Cal Poly athletes and fans.',
    description:
      'San Luis Obispo\'s hometown roaster. We support local club sports because our athletes are our customers. Great for game-day energy, team study sessions, and community events.',
    websiteUrl: 'https://sloroasters.com',
    instagramUrl: 'https://instagram.com/sloroasters',
    industryCategory: 'Food & restaurant',
    targetAudience: 'Cal Poly students and local community',
    geographicFocus: 'San Luis Obispo',
    typicalOfferTypes: ['Discount codes', 'Gift cards'],
    pastSponsorships:
      'Supported Cal Poly Club Swim and Cal Poly Running Club with discount cards and event coffee service.',
    verificationStatus: 'submitted_for_verification',
  },
];

export const MOCK_LISTINGS: SponsorshipListing[] = [
  {
    id: 'lst-fluid-fall',
    sponsorId: 'sp-fluid',
    title: 'Fall endurance team partnerships',
    description:
      'Fluid Nutrition is looking for 3 club endurance teams in California for the Fall 2026 season. We provide product allocation and cash to help fuel your athletes — in return, we want authentic social content and event sampling opportunities.',
    status: 'open',
    offerTypes: ['Free product for team use', 'Cash sponsorship'],
    offerSummary: 'Product allocation (6-month supply per athlete) + $300 cash per team',
    numberOfTeams: 3,
    geography: 'California',
    sportPreferences: ['Triathlon', 'Cycling', 'Running', 'Swim'],
    teamSizeMin: 30,
    socialReachMin: 1000,
    duration: 'Fall 2026 season',
    applicationDeadline: '2026-08-30',
    requestedAssets: [
      { assetId: 'instagram_post', required: true },
      { assetId: 'product_sampling', required: true },
      { assetId: 'instagram_story', required: false },
    ],
    publishedAt: '2026-05-20',
  },
  {
    id: 'lst-slo-coffee',
    sponsorId: 'sp-slo-roasters',
    title: 'Cal Poly club sports coffee partner',
    description:
      'SLO Roasters wants to partner with Cal Poly club sports teams for the full academic year. We offer discount codes for your athletes and gift cards for events — all we ask is a game-day banner and an occasional social shoutout.',
    status: 'open',
    offerTypes: ['Discount codes', 'Gift cards'],
    offerSummary: '20% discount codes for all team members + $25 gift cards for game-day prizes',
    numberOfTeams: 5,
    geography: 'San Luis Obispo',
    sportPreferences: [],
    duration: '2026-27 academic year',
    applicationDeadline: '2026-09-15',
    requestedAssets: [
      { assetId: 'banner_at_games', required: true },
      { assetId: 'instagram_story', required: false },
    ],
    publishedAt: '2026-05-22',
  },
];

export function getSponsorById(id: string): SponsorProfile | undefined {
  return MOCK_SPONSORS.find((s) => s.id === id);
}

export function getListingById(id: string): SponsorshipListing | undefined {
  return MOCK_LISTINGS.find((l) => l.id === id);
}

export function getListingsForSponsor(sponsorId: string): SponsorshipListing[] {
  return MOCK_LISTINGS.filter((l) => l.sponsorId === sponsorId);
}

// --- Application-side mock data (Slice 3) ---

export const ACTIVE_TEAM_ID = 'cp-tri';

export const MOCK_SEED_SPONSORS: SponsorProfile[] = [
  {
    id: 'sp-seed-gnarly',
    companyName: 'Gnarly Nutrition',
    brandName: 'Gnarly Nutrition',
    oneLiner: 'Plant-based performance fuel for endurance athletes.',
    websiteUrl: 'https://gnarlynutrition.com',
    industryCategory: 'Nutrition & supplements',
    geographicFocus: 'West Coast + Mountain',
    typicalOfferTypes: ['Free product for team use', 'Event prizes'],
    verificationStatus: 'verified',
  },
  {
    id: 'sp-seed-ccpt',
    companyName: 'Central Coast Physical Therapy',
    brandName: 'Central Coast PT',
    oneLiner: 'Sports rehab and injury prevention for Cal Poly athletes.',
    description:
      'Local sports medicine practice providing rehab, injury prevention, and pre-season screenings for Cal Poly club sports teams.',
    websiteUrl: 'https://centralcoastpt.com',
    industryCategory: 'Recovery & wellness',
    targetAudience: 'Cal Poly club athletes',
    geographicFocus: 'San Luis Obispo',
    typicalOfferTypes: ['On-site services', 'Discount codes'],
    verificationStatus: 'needs_changes',
  },
  {
    id: 'sp-seed-onrunning',
    companyName: 'On Running',
    brandName: 'On Running',
    oneLiner: 'Swiss-engineered running shoes and apparel.',
    websiteUrl: 'https://on-running.com',
    industryCategory: 'Apparel & gear',
    geographicFocus: 'Nationwide',
    typicalOfferTypes: ['Discount codes', 'Free product for team use'],
    verificationStatus: 'verified',
  },
];

export const MOCK_SEED_LISTINGS: SponsorshipListing[] = [
  {
    id: 'lst-seed-1',
    sponsorId: 'sp-seed-gnarly',
    title: 'Spring endurance team partnerships',
    status: 'closed',
    offerTypes: ['Free product for team use', 'Event prizes'],
    offerSummary: 'Free product (6-month supply per athlete)',
    numberOfTeams: 8,
    geography: 'California',
    sportPreferences: ['Triathlon', 'Cycling', 'Running'],
    duration: 'Spring 2026 season',
    applicationDeadline: '2026-03-14',
    requestedAssets: [
      { assetId: 'jersey_logo', required: true },
      { assetId: 'instagram_post', required: true },
      { assetId: 'athlete_packet_stuffing', required: false },
    ],
    publishedAt: '2026-01-10',
  },
  {
    id: 'lst-seed-2',
    sponsorId: 'sp-seed-onrunning',
    title: 'College club running & tri partnerships',
    status: 'closed',
    offerTypes: ['Discount codes', 'Free product for team use'],
    offerSummary: 'Discount codes + 20% team kit',
    numberOfTeams: 20,
    geography: 'Nationwide',
    sportPreferences: ['Running', 'Triathlon'],
    duration: '2025-26 academic year',
    applicationDeadline: '2025-08-30',
    requestedAssets: [
      { assetId: 'jersey_logo', required: true },
      { assetId: 'highlight_video_logo', required: true },
      { assetId: 'instagram_post', required: false },
    ],
    publishedAt: '2025-07-01',
  },
];

export const MOCK_SEED_APPLICATIONS: Application[] = [
  {
    id: 'app-seed-1',
    listingId: 'lst-seed-1',
    teamId: 'cp-tri',
    status: 'under_review',
    fitNote: 'We host an 800-athlete tri in May and would love to plug Gnarly at packet pickup.',
    submittedAt: '2026-05-15',
  },
  {
    id: 'app-seed-2',
    listingId: 'lst-seed-2',
    teamId: 'cp-tri',
    status: 'accepted',
    submittedAt: '2026-05-01',
    reviewedAt: '2026-05-10',
  },
  // Seed applications for sponsor review (Slice 4) — submitted to the open Fluid Nutrition listing
  {
    id: 'app-seed-fluid-tri',
    listingId: 'lst-fluid-fall',
    teamId: 'cp-tri',
    status: 'submitted',
    fitNote: 'We host the MTS with 500+ athletes and can offer on-course sampling, packet stuffing, and podium prizes.',
    submittedAt: '2026-05-22',
  },
  {
    id: 'app-seed-fluid-rugby',
    listingId: 'lst-fluid-fall',
    teamId: 'cp-rugby',
    status: 'submitted',
    fitNote: 'Strong sideline crowd at home matches. We can offer jersey logos and game-day banners.',
    submittedAt: '2026-05-23',
  },
  {
    id: 'app-seed-fluid-swim',
    listingId: 'lst-fluid-fall',
    teamId: 'cp-swim',
    status: 'submitted',
    submittedAt: '2026-05-24',
  },
];

export function getSeedSponsorById(id: string): SponsorProfile | undefined {
  return [...MOCK_SPONSORS, ...MOCK_SEED_SPONSORS].find((s) => s.id === id);
}

export function getSeedListingById(id: string): SponsorshipListing | undefined {
  return [...MOCK_LISTINGS, ...MOCK_SEED_LISTINGS].find((l) => l.id === id);
}

export function getOpenListings(): SponsorshipListing[] {
  return MOCK_LISTINGS.filter((l) => l.status === 'open');
}

export function getTeamById(teamId: string): TeamProfile | undefined {
  return MOCK_TEAMS.find((t) => t.id === teamId);
}

export async function getMockTeams(): Promise<TeamProfile[]> {
  return MOCK_TEAMS;
}

export function getApplicationsForTeam(teamId: string): Application[] {
  return MOCK_SEED_APPLICATIONS.filter((a) => a.teamId === teamId);
}

export function getApplicationsForListing(listingId: string): Application[] {
  return MOCK_SEED_APPLICATIONS.filter((a) => a.listingId === listingId);
}
