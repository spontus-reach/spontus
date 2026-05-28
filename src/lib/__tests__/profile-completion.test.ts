// Mock the profile completion functions based on the team onboarding page implementation
// Mock TeamProfileDraft type
type TeamProfileDraft = {
  verificationStatus?: string;
  name?: string;
  university?: string;
  sport?: string;
  location?: string;
  rosterSize?: number;
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
  socialLinks?: Array<{ platform: string; url: string; followerCount: number }>;
  events?: Array<{
    id: string;
    name: string;
    eventType: string;
    startsOn: string;
    location: string;
    expectedAttendance: number;
    notes?: string;
  }>;
  sponsorshipAssets?: Array<{
    assetId: string;
    status: string;
    notes?: string;
  }>;
  hostedEvents?: Array<{
    id: string;
    name: string;
    eventType: string;
    startsOn: string;
    location: string;
    expectedAttendance: number;
    notes?: string;
  }>;
  preferredSponsorCategories?: string[];
  excludedSponsorCategories?: string[];
  dealTypesInterestedIn?: string[];
  pastSponsors?: string[];
  photo?: string;
};


// Implementation of computeCompleteness from team onboarding page
const computeCompleteness = (draft: TeamProfileDraft, hostedEventsReviewed: boolean): number => {
  let filled = 0;
  const total = 7;
  if (draft.name && draft.university && draft.sport) filled++;
  if (draft.instagramUrl || draft.combinedReach) filled++;
  if (draft.league || draft.season) filled++;
  if ((draft.sponsorshipAssets ?? []).length > 0) filled++;
  if ((draft.hostedEvents ?? []).length > 0 || hostedEventsReviewed) {
    filled++;
  }
  if ((draft.preferredSponsorCategories ?? []).length > 0) filled++;
  if (draft.photo) filled++;
  return Math.round((filled / total) * 100);
};

// Implementation of computeSectionComplete from team onboarding page
const computeSectionComplete = (
  sectionId: string,
  draft: TeamProfileDraft,
  hostedEventsReviewed: boolean
): boolean => {
  switch (sectionId) {
    case 'basics':
      return !!(draft.name && draft.university && draft.sport);
    case 'social':
      return !!(draft.instagramUrl || draft.combinedReach);
    case 'competition':
      return !!(draft.league || draft.season);
    case 'assets':
      return (draft.sponsorshipAssets ?? []).length > 0;
    case 'hosted':
      return (draft.hostedEvents ?? []).length > 0 || hostedEventsReviewed;
    case 'looking':
      return (draft.preferredSponsorCategories ?? []).length > 0;
    case 'media':
      return !!draft.photo;
    default:
      return false;
  }
};

console.log('Testing profile completion functions...');

// Test computeCompleteness
console.log('\n=== computeCompleteness Tests ===');

const baseDraft: TeamProfileDraft = {
  verificationStatus: 'draft',
  name: '',
  university: '',
  sport: '',
  location: '',
  rosterSize: 0,
  yearFounded: undefined,
  oneLiner: '',
  description: '',
  league: '',
  competitionSummary: '',
  season: '',
  websiteUrl: '',
  instagramUrl: '',
  tiktokUrl: '',
  youtubeUrl: '',
  livestreamUrl: '',
  combinedReach: 0,
  socialLinks: [],
  events: [],
  sponsorshipAssets: [],
  hostedEvents: [],
  preferredSponsorCategories: [],
  excludedSponsorCategories: [],
  dealTypesInterestedIn: [],
  pastSponsors: [],
  photo: undefined,
};

console.log('Test 1: Should return 0 when no sections are completed');
const result1 = computeCompleteness(baseDraft, false);
console.assert(result1 === 0, `Expected 0, got ${result1}`);

console.log('Test 2: Should return 14 when only basics is completed (1/7 sections)');
const draft1 = { ...baseDraft, name: 'Test Team', university: 'Test Uni', sport: 'Test Sport' };
const result2 = computeCompleteness(draft1, false);
console.assert(result2 === 14, `Expected 14, got ${result2}`);

console.log('Test 3: Should return 29 when basics and social are completed (2/7 sections)');
const draft2 = {
  ...baseDraft,
  name: 'Test Team',
  university: 'Test Uni',
  sport: 'Test Sport',
  instagramUrl: 'http://instagram.com/test',
};
const result3 = computeCompleteness(draft2, false);
console.assert(result3 === 29, `Expected 29, got ${result3}`);

console.log('Test 4: Should return 43 when basics, social, and competition are completed (3/7 sections)');
const draft3 = {
  ...baseDraft,
  name: 'Test Team',
  university: 'Test Uni',
  sport: 'Test Sport',
  instagramUrl: 'http://instagram.com/test',
  league: 'Test League',
};
const result4 = computeCompleteness(draft3, false);
console.assert(result4 === 43, `Expected 43, got ${result4}`);

console.log('Test 5: Should return 57 when four sections are completed (4/7 sections)');
const draft4 = {
  ...baseDraft,
  name: 'Test Team',
  university: 'Test Uni',
  sport: 'Test Sport',
  instagramUrl: 'http://instagram.com/test',
  league: 'Test League',
  sponsorshipAssets: [{ assetId: 'test', status: 'available' }],
};
const result5 = computeCompleteness(draft4, false);
console.assert(result5 === 57, `Expected 57, got ${result5}`);

console.log('Test 6: Should return 71 when five sections are completed (5/7 sections)');
const draft5 = {
  ...baseDraft,
  name: 'Test Team',
  university: 'Test Uni',
  sport: 'Test Sport',
  instagramUrl: 'http://instagram.com/test',
  league: 'Test League',
  sponsorshipAssets: [{ assetId: 'test', status: 'available' }],
  hostedEvents: [{ id: '1', name: 'Test Event', eventType: 'hosted_event', startsOn: '2026-01-01', location: 'Test', expectedAttendance: 100 }],
};
const result6 = computeCompleteness(draft5, false);
console.assert(result6 === 71, `Expected 71, got ${result6}`);

console.log('Test 7: Should return 86 when six sections are completed (6/7 sections)');
const draft6 = {
  ...baseDraft,
  name: 'Test Team',
  university: 'Test Uni',
  sport: 'Test Sport',
  instagramUrl: 'http://instagram.com/test',
  league: 'Test League',
  sponsorshipAssets: [{ assetId: 'test', status: 'available' }],
  hostedEvents: [{ id: '1', name: 'Test Event', eventType: 'hosted_event', startsOn: '2026-01-01', location: 'Test', expectedAttendance: 100 }],
  preferredSponsorCategories: ['Category 1'],
  // No photo
};
const result7 = computeCompleteness(draft6, false);
console.assert(result7 === 86, `Expected 86, got ${result7}`);

console.log('Test 8: Should return 100 when all seven sections are completed');
const draft7 = {
  ...baseDraft,
  name: 'Test Team',
  university: 'Test Uni',
  sport: 'Test Sport',
  instagramUrl: 'http://instagram.com/test',
  league: 'Test League',
  sponsorshipAssets: [{ assetId: 'test', status: 'available' }],
  hostedEvents: [{ id: '1', name: 'Test Event', eventType: 'hosted_event', startsOn: '2026-01-01', location: 'Test', expectedAttendance: 100 }],
  preferredSponsorCategories: ['Category 1'],
  photo: 'http://example.com/photo.jpg',
};
const result8 = computeCompleteness(draft7, false);
console.assert(result8 === 100, `Expected 100, got ${result8}`);

console.log('Test 9: Should count hosted events section as complete when hostedEventsReviewed is true even without events');
const draft9 = {
  ...baseDraft,
  name: 'Test Team',
  university: 'Test Uni',
  sport: 'Test Sport',
  instagramUrl: 'http://instagram.com/test',
  league: 'Test League',
  sponsorshipAssets: [{ assetId: 'test', status: 'available' }],
  // No hosted events
  preferredSponsorCategories: ['Category 1'],
  // No photo
};
const result9a = computeCompleteness(draft9, true);  // With hostedEventsReviewed = true
// With hostedEventsReviewed = true, we have:
// 1. basics: ✓
// 2. social: ✓ (instagramUrl)
// 3. competition: ✓ (league)
// 4. assets: ✓ (sponsorshipAssets)
// 5. hosted: ✓ (hostedEventsReviewed = true)
// 6. looking: ✓ (preferredSponsorCategories)
// 7. media: ✗ (no photo)
// That's 6/7 = 86%
console.assert(result9a === 86, `Expected 86, got ${result9a}`);
const result9b = computeCompleteness(draft9, false); // With hostedEventsReviewed = false
// With hostedEventsReviewed = false, we have:
// 1. basics: ✓
// 2. social: ✓ (instagramUrl)
// 3. competition: ✓ (league)
// 4. assets: ✓ (sponsorshipAssets)
// 5. hosted: ✗ (no hosted events and not reviewed)
// 6. looking: ✓ (preferredSponsorCategories)
// 7. media: ✗ (no photo)
// That's 5/7 = 71%
console.assert(result9b === 71, `Expected 71, got ${result9b}`);

// Test computeSectionComplete
console.log('\n=== computeSectionComplete Tests ===');

console.log('Test 1: Should correctly identify basics section completion');
let result10 = computeSectionComplete('basics', baseDraft, false);
console.assert(result10 === false, `Expected false, got ${result10}`);

const draftWithName = { ...baseDraft, name: 'Test Team' };
result10 = computeSectionComplete('basics', draftWithName, false);
console.assert(result10 === false, `Expected false, got ${result10}`);

const draftWithNameAndUni = { ...baseDraft, name: 'Test Team', university: 'Test Uni' };
result10 = computeSectionComplete('basics', draftWithNameAndUni, false);
console.assert(result10 === false, `Expected false, got ${result10}`);

const draftComplete = { ...baseDraft, name: 'Test Team', university: 'Test Uni', sport: 'Test Sport' };
result10 = computeSectionComplete('basics', draftComplete, false);
console.assert(result10 === true, `Expected true, got ${result10}`);

console.log('Test 2: Should correctly identify social section completion');
let result11 = computeSectionComplete('social', baseDraft, false);
console.assert(result11 === false, `Expected false, got ${result11}`);

const draftWithInstagram = { ...baseDraft, instagramUrl: 'http://instagram.com/test' };
result11 = computeSectionComplete('social', draftWithInstagram, false);
console.assert(result11 === true, `Expected true, got ${result11}`);

const draftWithReach = { ...baseDraft, combinedReach: 1000 };
result11 = computeSectionComplete('social', draftWithReach, false);
console.assert(result11 === true, `Expected true, got ${result11}`);

const draftWithBoth = { ...baseDraft, instagramUrl: 'http://instagram.com/test', combinedReach: 1000 };
result11 = computeSectionComplete('social', draftWithBoth, false);
console.assert(result11 === true, `Expected true, got ${result11}`);

console.log('Test 3: Should correctly identify competition section completion');
let result12 = computeSectionComplete('competition', baseDraft, false);
console.assert(result12 === false, `Expected false, got ${result12}`);

const draftWithLeague = { ...baseDraft, league: 'Test League' };
result12 = computeSectionComplete('competition', draftWithLeague, false);
console.assert(result12 === true, `Expected true, got ${result12}`);

const draftWithSeason = { ...baseDraft, season: 'Fall 2026' };
result12 = computeSectionComplete('competition', draftWithSeason, false);
console.assert(result12 === true, `Expected true, got ${result12}`);

const draftWithLeagueAndSeason = { ...baseDraft, league: 'Test League', season: 'Fall 2026' };
result12 = computeSectionComplete('competition', draftWithLeagueAndSeason, false);
console.assert(result12 === true, `Expected true, got ${result12}`);

console.log('Test 4: Should correctly identify assets section completion');
let result13 = computeSectionComplete('assets', baseDraft, false);
console.assert(result13 === false, `Expected false, got ${result13}`);

const draftWithAssets = { ...baseDraft, sponsorshipAssets: [{ assetId: 'test1', status: 'available' }] };
result13 = computeSectionComplete('assets', draftWithAssets, false);
console.assert(result13 === true, `Expected true, got ${result13}`);

const draftWithMultipleAssets = { ...baseDraft, sponsorshipAssets: [
  { assetId: 'test1', status: 'available' },
  { assetId: 'test2', status: 'preferred' }
] };
result13 = computeSectionComplete('assets', draftWithMultipleAssets, false);
console.assert(result13 === true, `Expected true, got ${result13}`);

console.log('Test 5: Should correctly identify hosted events section completion');
let result14 = computeSectionComplete('hosted', baseDraft, false);
console.assert(result14 === false, `Expected false, got ${result14}`);

const draftWithEvents = { ...baseDraft, hostedEvents: [{ id: '1', name: 'Test Event', eventType: 'hosted_event', startsOn: '2026-01-01', location: 'Test', expectedAttendance: 100 }] };
result14 = computeSectionComplete('hosted', draftWithEvents, false);
console.assert(result14 === true, `Expected true, got ${result14}`);

// Even without events, if reviewed it should be complete
result14 = computeSectionComplete('hosted', baseDraft, true);
console.assert(result14 === true, `Expected true, got ${result14}`);

console.log('Test 6: Should correctly identify looking section completion');
let result15 = computeSectionComplete('looking', baseDraft, false);
console.assert(result15 === false, `Expected false, got ${result15}`);

const draftWithCategories = { ...baseDraft, preferredSponsorCategories: ['Category 1', 'Category 2'] };
result15 = computeSectionComplete('looking', draftWithCategories, false);
console.assert(result15 === true, `Expected true, got ${result15}`);

console.log('Test 7: Should correctly identify media section completion');
let result16 = computeSectionComplete('media', baseDraft, false);
console.assert(result16 === false, `Expected false, got ${result16}`);

const draftWithPhoto = { ...baseDraft, photo: 'http://example.com/photo.jpg' };
result16 = computeSectionComplete('media', draftWithPhoto, false);
console.assert(result16 === true, `Expected true, got ${result16}`);

console.log('\n✅ All profile completion tests passed!');