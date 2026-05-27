# PRD: User Authentication & Verification with Email Verification and Profile Completion

## Problem Statement

Spontus needs a robust user authentication and verification system that ensures only legitimate college sports teams and businesses can participate in the sponsorship marketplace. Currently, the system relies on mock data for verification, lacks proper email domain validation, and doesn't guide users through complete profile creation after signup. This leads to potential security vulnerabilities, incomplete profiles, and poor user experience.

## Solution

Implement a complete authentication and verification system that:
1. Validates .edu email addresses for team signups to ensure only legitimate college teams can join
2. Validates work email addresses (non-.edu) for sponsor signups to ensure only legitimate businesses can join
3. Guides users through profile completion after initial signup with progressive disclosure
4. Tracks verification status and allows submission for admin verification when profiles are complete
5. Uses Supabase for persistent storage of user data while maintaining mock data for development/testing

## User Stories

### Team Authentication & Verification
1. As a college sports team representative, I want to sign up with my .edu email address so that I can verify I'm affiliated with an educational institution
2. As a team representative, I want to see a clear error message if I try to sign up with a non-.edu email so I know I need to use my school email
3. As a team representative, after signing up, I want to be guided through completing my team profile so that my sponsorship listing is attractive to potential sponsors
4. As a team representative, I want to see my profile completion percentage so I know how much more information I need to provide
5. As a team representative, I want to submit my completed profile for verification so that sponsors can trust my team is legitimate
6. As a team representative, I want to see my verification status (draft, submitted_for_verification, verified, needs_changes, suspended) so I know where I stand in the process

### Sponsor Authentication & Verification
1. As a business representative, I want to sign up with my work email address so that I can verify I'm affiliated with a legitimate company
2. As a business representative, I want to see a clear error message if I try to sign up with a .edu email so I know I need to use my work email
3. As a business representative, after signing up, I want to be guided through completing my sponsor profile so that teams can evaluate my suitability as a sponsor
4. As a business representative, I want to see my profile completion percentage so I know how much more information I need to provide
5. As a business representative, I want to submit my completed profile for verification so that teams can trust my sponsorship offers are legitimate
6. As a business representative, I want to see my verification status (draft, submitted_for_verification, verified, needs_changes, suspended) so I know where I stand in the process

### System & Security
1. As a system, I want to store user data securely in Supabase so that information persists between sessions and is protected
2. As a system, I want to validate email formats beyond just domain checking to prevent obviously invalid emails
3. As a system, I want to maintain mock data for development and testing so that developers can work without external dependencies
4. As an admin, I want to review and verify team/sponsor profiles so that I can ensure only legitimate users participate in the marketplace

## Implementation Decisions

### Modules to Build/Modify
1. **Authentication Module**:
   - Email validation functions (.edu for teams, work email for sponsors)
   - Signup form validation and submission handling
   - Data transfer from signup to onboarding pages

2. **Profile Completion Module**:
   - Progressive profile completion tracking
   - Section-based completion calculation
   - Visual progress indicators
   - Conditional navigation based on completion status

3. **Verification Module**:
   - Verification status tracking (draft, submitted_for_verification, verified, needs_changes, suspended)
   - Submission for verification functionality
   - Admin verification workflow hooks
   - Status-based UI rendering

4. **Data Persistence Module**:
   - Supabase integration for user/team/sponsor data
   - Mock data functions shaped from database queries
   - Error handling for database operations

### Technical Architecture Decisions
1. **Email Validation**:
   - Team email validation: Must end with ".edu" and pass basic email format checks
   - Sponsor email validation: Must NOT end with ".edu" and pass basic email format checks
   - Both validations check for proper email structure (local@domain.tld with valid domain parts)

2. **State Management**:
   - Use React useState for form data and verification status
   - Use useEffect for side effects like data loading
   - Use useCallback for memoized function references
   - Use useMemo for expensive calculations like completion percentage

3. **Data Flow**:
   - Signup pages collect basic information and validate email
   - On signup success, navigate to onboarding page with data passed via router.state
   - Onboarding page accesses router.state to pre-fill form data
   - Profile completion calculated based on filled sections
   - Submit button enabled only when in draft or needs_changes status

4. **Supabase Integration**:
   - All data fetching functions moved to src/lib/db.ts
   - Mock data functions in src/lib/mock-data.ts now shape data from Supabase queries
   - Proper error handling with PGRST116 (no rows found) distinction
   - Optimistic UI updates where appropriate

### API Contracts
1. **Supabase Tables** (existing):
   - teams: id, slug, name, university, sport, location, verification_status
   - team_profiles: id, team_id, roster_size, year_founded, one_liner, description, etc.
   - sponsors: id, company_name, website_url, industry_category, verification_status
   - sponsor_profiles: id, sponsor_id, brand_name, one_liner, description, etc.
   - sponsorship_listings: id, sponsor_id, title, description, status, etc.
   - applications: id, listing_id, team_id, status, fit_note, submitted_at, reviewed_at

2. **Key Functions** (in src/lib/db.ts):
   - getTeamBySlug(slug): Promise<TeamProfile | null>
   - getTeamByIdForMock(id): Promise<TeamProfile | null>
   - getSponsorById(id): Promise<SponsorProfile | null>
   - getSponsorByIdForMock(id): Promise<SponsorProfile | null>
   - getListingById(id): Promise<SponsorshipListing | null>
   - getListingByIdForMock(id): Promise<SponsorshipListing | null>
   - getOpenListings(): Promise<SponsorshipListing[]>
   - getApplicationsForTeam(teamId): Promise<Application[]>
   - getApplicationsForListing(listingId): Promise<Application[]>
   - getAllTeams(): Promise<TeamProfile[]>
   - getAllSponsors(): Promise<SponsorProfile[]>
   - getAllListings(): Promise<SponsorshipListing[]>
   - getAllApplications(): Promise<Application[]>
   - getAllTeamsForMock(): Promise<TeamProfile[]>
   - getAllSponsorsForMock(): Promise<SponsorProfile[]>
   - getAllListingsForMock(): Promise<SponsorshipListing[]>
   - getAllApplicationsForMock(): Promise<Application[]>

### Schema Changes Needed
To fully support the mock data shape, the following columns should be added to the database schema:

**team_profiles table**:
- socialLinks JSONB (for storing array of social media objects)
- photo TEXT (for profile photo URL)
- pastSponsors TEXT[] (array of past sponsor names)
- preferredSponsorCategories TEXT[] (array of preferred sponsor categories)
- excludedSponsorCategories TEXT[] (array of excluded sponsor categories)
- dealTypesInterestedIn TEXT[] (array of deal types interested in)
- profileCompleteness INTEGER (0-100)

**sponsor_profiles table**:
- brandName TEXT
- oneLiner TEXT
- description TEXT
- logoUrl TEXT
- websiteUrl TEXT
- instagramUrl TEXT
- targetAudience TEXT
- geographicFocus TEXT
- typicalOfferTypes TEXT[] (array of typical offer types)
- pastSponsorships TEXT

These schema changes are noted in the code comments but not yet implemented in the actual database.

## Testing Decisions

### What Makes a Good Test
- Tests should verify external behavior, not implementation details
- Unit tests should focus on individual functions (validation, calculation helpers)
- Integration tests should verify complete user flows (signup → onboarding → verification)
- Tests should cover edge cases and error conditions
- Tests should be deterministic and not rely on external state when possible

### Modules to Test
1. **Validation Functions**:
   - getWorkEmailValidationError(email): string
   - getEmailValidationError(email): string (for teams)
   - Test valid/invalid email formats
   - Test .edu vs non-.edu distinctions
   - Test edge cases (empty strings, missing @, invalid domains)

2. **Profile Completion Calculation**:
   - computeCompleteness(draft, hostedEventsReviewed): number
   - computeSectionComplete(sectionId, draft, hostedEventsReviewed): boolean
   - Test all combinations of filled/empty sections
   - Test boundary conditions (0%, 100%, partial completion)

3. **Verification Workflow**:
   - updateVerificationStatus(entityType, entityId, status, note): void
   - submitForVerification(entityType, entityId): boolean
   - Test status transitions
   - Test validation requirements (note required for needs_changes/suspended)
   - Test entity type handling (team vs sponsor)

4. **Data Fetching Functions**:
   - getApplicationsForTeam(teamId): Promise<Application[]>
   - getTeamBySlug(slug): Promise<TeamProfile | null>
   - Test successful data retrieval
   - Test error handling (network errors, not found)
   - Test data shaping (row to Application conversion)

### Testing Approach
1. **Unit Tests**:
   - Create **tests** folders alongside components and lib files
   - Use Jest or Vitest for unit testing JavaScript/TypeScript functions
   - Mock Supabase calls where necessary
   - Focus on pure functions (validation, calculations)

2. **Integration Tests**:
   - Test complete user flows using React Testing Library
   - Signup → email validation → onboarding → profile completion → verification submission
   - Test both team and sponsor flows
   - Test error states and validation messages

3. **End-to-End Tests**:
   - Use Cypress or Playwright for critical user journeys
   - Test account creation, profile completion, listing creation, application submission
   - Test verification status updates
   - Test responsive behavior across device sizes

### Prior Art in Codebase
- Existing test patterns in the codebase (though limited)
- Component-based organization that lends itself to colocation of tests
- Use of React hooks that can be tested with React Testing Library
- Supabase integration that can be mocked for testing

## Out of Scope

1. **Password-based Authentication**:
   - This PRD focuses on email verification and profile completion, not password authentication
   - Future work could add secure password handling with hashing and salt

2. **Email Sending Infrastructure**:
   - While email domain validation is implemented, actual email sending for verification codes is out of scope
   - This would require integration with an email service provider (SendGrid, SES, etc.)

3. **Advanced Security Features**:
   - Rate limiting on authentication endpoints
   - IP-based blocking for brute force attempts
   - CAPTCHA for signup forms
   - These are important but considered enhancements for later implementation

4. **Multi-factor Authentication**:
   - Beyond email verification, MFA (TOTP, SMS, etc.) is not included in this scope

5. **Social Login Options**:
   - Google, Facebook, Apple sign-in are not part of this implementation

6. **Payment Processing**:
   - Handling of sponsorship payments, invoicing, or financial transactions is out of scope

7. **Admin Dashboard UI**:
   - While verification status can be updated, a full admin interface for reviewing and managing verifications is out of scope
   - The verification provider includes the functions needed, but the UI components would be separate

## Further Notes

### Dependencies
- Supabase project must be set up with the required tables
- Environment variables for Supabase URL and anon key must be configured
- The mock data functions will gracefully fall back to empty arrays if database calls fail

### Development vs Production
- In development, mock data functions provide immediate feedback without waiting for database
- In production, the same functions will fetch real data from Supabase
- This approach allows for rapid development while maintaining production readiness

### Accessibility Considerations
- All forms should be tested with screen readers
- Color contrast should meet WCAG AA standards
- Error messages should be associated with form fields using aria-describedby
- Focus management should be handled properly during form validation and submission

### Performance Optimizations
- Database queries are optimized to only fetch necessary data
- React.memo should be considered for expensive components
- Lazy loading could be implemented for non-critical resources
- Caching strategies could be added for frequently accessed data

### Future Enhancements
1. **Email Confirmation Workflows**:
   - Send verification emails with confirmation links
   - Require email confirmation before allowing profile completion
   - Handle expired verification links and resend functionality

2. **Profile Completion Improvements**:
   - Save progress automatically as users fill out forms
   - Allow users to return later and continue where they left off
   - Provide section-specific completion feedback

3. **Verification Workflow Enhancements**:
   - Allow admin to leave feedback when requesting changes
   - Implement verification expiration (requiring periodic re-verification)
   - Add verification badges visible on public profiles

4. **Analytics and Tracking**:
   - Track conversion rates from signup to profile completion
   - Monitor verification approval/rejection rates
   - Measure time-to-complete profile metrics

This PRD defines the core authentication, verification, and profile completion functionality that has been implemented in the codebase. The system now properly validates email domains, guides users through profile completion, tracks verification status, and persists data securely while maintaining a smooth developer experience with mock data fallbacks.