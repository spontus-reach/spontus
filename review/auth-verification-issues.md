## Issue 1: Implement Email Validation Functions
**Type**: AFK  
**Blocked by**: None - can start immediately  
**User stories covered**: 
- As a college sports team representative, I want to sign up with my .edu email address so that I can verify I'm affiliated with an educational institution
- As a team representative, I want to see a clear error message if I try to sign up with a non-.edu email so I know I need to use my school email
- As a business representative, I want to sign up with my work email address so that I can verify I'm affiliated with a legitimate company
- As a business representative, I want to see a clear error message if I try to sign up with a .edu email so I know I need to use my work email

**What to build**: 
Create standalone email validation functions that check:
- For teams: email ends with ".edu" and passes basic email format validation
- For sponsors: email does NOT end with ".edu" and passes basic email format validation
- Both validations check for proper email structure (local@domain.tld with valid domain parts, no consecutive dots, etc.)

**Acceptance criteria**:
- [ ] Create getWorkEmailValidationError(email) function that returns empty string for valid work emails, error message otherwise
- [ ] Create getEmailValidationError(email) function for teams that returns empty string for valid .edu emails, error message otherwise
- [ ] Functions handle edge cases: empty strings, missing @ symbol, invalid domain formats
- [ ] Functions are unit tested with test cases for valid/invalid emails
- [ ] Functions are exported and usable in signup form components

## Issue 2: Implement Verification Status Tracking System
**Type**: AFK  
**Blocked by**: None - can start immediately  
**User stories covered**:
- As a team representative, I want to see my verification status (draft, submitted_for_verification, verified, needs_changes, suspended) so I know where I stand in the process
- As a business representative, I want to see my verification status (draft, submitted_for_verification, verified, needs_changes, suspended) so I know where I stand in the process

**What to build**:
Create a verification status system that:
- Defines the verification status enum: "draft", "submitted_for_verification", "verified", "needs_changes", "suspended"
- Provides functions to update verification status with proper validation (note required for needs_changes/suspended)
- Provides function to submit for verification when status is draft or needs_changes
- Includes React context/provider for sharing verification state across components

**Acceptance criteria**:
- [ ] Define VerificationStatus type with all five status values
- [ ] Create updateVerificationStatus function that validates note requirements
- [ ] Create submitForVerification function that only allows submission from draft/needs_changes
- [ ] Implement VerificationContext and VerificationProvider React components
- [ ] Create useVerification hook for accessing verification state
- [ ] Functions are unit tested for all state transitions and edge cases

## Issue 3: Implement Profile Completion Calculation
**Type**: AFK  
**Blocked by**: None - can start immediately  
**User stories covered**:
- As a team representative, I want to see my profile completion percentage so I know how much more information I need to provide
- As a business representative, I want to see my profile completion percentage so I know how much more information I need to provide

**What to build**:
Create profile completion calculation system that:
- Defines profile sections (basics, social, competition, assets, hosted, looking, media)
- Calculates completion percentage based on filled sections
- Provides section-level completion status for UI highlighting
- Handles special cases like hosted events requiring explicit review

**Acceptance criteria**:
- [ ] Create computeCompleteness function that returns percentage (0-100) based on completed sections
- [ ] Create computeSectionComplete function that determines if a section is complete
- [ ] Functions handle all team profile sections: basics, social, competition, assets, hosted, looking, media
- [ ] Functions are unit tested with various completion scenarios
- [ ] Functions are imported and used in onboarding page components

## Issue 4: Implement Supabase Data Integration Layer
**Type**: AFK  
**Blocked by**: None - can start immediately  
**User stories covered**:
- As a system, I want to store user data securely in Supabase so that information persists between sessions and is protected

**What to build**:
Create data access layer that:
- Implements all database query functions for teams, sponsors, listings, applications
- Uses Supabase client with proper error handling
- Distinguishes between no rows found (PGRST116) and actual errors
- Returns data in the expected TypeScript interfaces

**Acceptance criteria**:
- [ ] Implement getTeamBySlug, getTeamByIdForMock functions
- [ ] Implement getSponsorById, getSponsorByIdForMock functions
- [ ] Implement getListingById, getListingByIdForMock functions
- [ ] Implement getOpenListings, getApplicationsForTeam, getApplicationsForListing functions
- [ ] Implement getAllTeams, getAllSponsors, getAllListings, getAllApplications functions
- [ ] All functions properly handle Supabase responses and errors
- [ ] Functions are unit tested with mock Supabase responses

## Issue 5: Implement Mock Data Shaping from Database Queries
**Type**: AFK  
**Blocked by**: Issue 4  
**User stories covered**:
- As a system, I want to maintain mock data for development and testing so that developers can work without external dependencies

**What to build**:
Create mock data functions that:
- Fetch base data from Supabase
- Shape the data to match the existing mock data format (including nested objects)
- Handle missing database columns by providing default values
- Return data in the same format as the hardcoded mock data

**Acceptance criteria**:
- [ ] Implement getAllTeamsForMock that shapes team data from getAllTeams
- [ ] Implement getAllSponsorsForMock that shapes sponsor data from getAllSponsors
- [ ] Implement getAllListingsForMock that shapes listing data from getAllListings
- [ ] Implement getAllApplicationsForMock that passes through getAllApplications
- [ ] Functions handle missing database columns gracefully with defaults
- [ ] Functions are unit tested with various database response scenarios

## Issue 6: Implement Team Signup and Onboarding Flow
**Type**: AFK  
**Blocked by**: Issue 1, Issue 2, Issue 3  
**User stories covered**:
- As a college sports team representative, I want to sign up with my .edu email address so that I can verify I'm affiliated with an educational institution
- As a team representative, after signing up, I want to be guided through completing my team profile so that my sponsorship listing is attractive to potential sponsors
- As a team representative, I want to see my profile completion percentage so I know how much more information I need to provide
- As a team representative, I want to submit my completed profile for verification so that sponsors can trust my team is legitimate

**What to build**:
Create complete team user flow that:
- Team signup page with .edu email validation
- On successful signup, navigates to team onboarding with data passed via router.state
- Team onboarding page displays editable profile form
- Profile completion percentage calculated and displayed
- Submit for verification button enabled only when in draft or needs_changes status
- Verification status updates correctly when submitted

**Acceptance criteria**:
- [ ] Team signup page validates .edu email and shows appropriate errors
- [ ] On successful signup, navigates to /team/onboarding with signup data in router.state
- [ ] Team onboarding page pre-fills form with signup data
- [ ] Profile completion percentage updates as user completes sections
- [ ] Submit button is disabled unless status is draft or needs_changes
- [ ] Clicking submit updates verification status to "submitted_for_verification"
- [ ] Flow works end-to-end without errors

## Issue 7: Implement Sponsor Signup and Onboarding Flow
**Type**: AFK  
**Blocked by**: Issue 1, Issue 2, Issue 3  
**User stories covered**:
- As a business representative, I want to sign up with my work email address so that I can verify I'm affiliated with a legitimate company
- As a business representative, after signing up, I want to be guided through completing my sponsor profile so that teams can evaluate my suitability as a sponsor
- As a business representative, I want to see my profile completion percentage so I know how much more information I need to provide
- As a business representative, I want to submit my completed profile for verification so that teams can trust my sponsorship offers are legitimate

**What to build**:
Create complete sponsor user flow that:
- Sponsor signup page with work email validation (non-.edu)
- On successful signup, navigates to sponsor onboarding with data passed via router.state
- Sponsor onboarding page displays editable profile form
- Profile completion percentage calculated and displayed
- Submit for verification button enabled only when in draft or needs_changes status
- Verification status updates correctly when submitted

**Acceptance criteria**:
- [ ] Sponsor signup page validates work email (non-.edu) and shows appropriate errors
- [ ] On successful signup, navigates to /sponsor/onboarding with signup data in router.state
- [ ] Sponsor onboarding page pre-fills form with signup data
- [ ] Profile completion percentage updates as user completes sections
- [ ] Submit button is disabled unless status is draft or needs_changes
- [ ] Clicking submit updates verification status to "submitted_for_verification"
- [ ] Flow works end-to-end without errors

## Issue 8: Implement Listing Detail Application Logic
**Type**: AFK  
**Blocked by**: Issue 4, Issue 5  
**User stories covered**: 
- (Implicit in verification flow) As a team representative, I can apply to listings when my team is verified and the sponsor is verified

**What to build**:
Enhance listing detail page to:
- Check for existing applications before allowing new application
- Verify team and sponsor verification status before allowing application
- Show appropriate UI states based on verification status
- Store application in Supabase when submitted

**Acceptance criteria**:
- [ ] Listing detail page checks if user already applied to listing
- [ ] Listing detail page verifies team status is "verified" and sponsor status is "verified"
- [ ] Application button is disabled if verification requirements not met
- [ ] Application button shows appropriate messaging based on status
- [ ] Submission creates application in Supabase with proper status
- [ ] Application status updates in UI after successful submission
- [ ] Error handling for failed submissions

## Issue 9: Implement Application Status Board with Real Data
**Type**: AFK  
**Blocked by**: Issue 4, Issue 5  
**User stories covered**:
- (Supports verification flow) As a team representative, I want to see my applications and their statuses

**What to build**:
Replace mock data usage in application status board with real Supabase data:
- Use getApplicationsForTeam function from db.ts instead of mock data
- Properly handle loading and error states
- Display applications grouped by status (submitted, under_review, accepted, declined)

**Acceptance criteria**:
- [ ] Application status board uses getApplicationsForTeam from src/lib/db
- [ ] Proper loading state shown while fetching applications
- [ ] Error state shown if data fetching fails
- [ ] Applications displayed in correct status columns
- [ ] Application cards show relevant information (fit note, dates, etc.)
- [ ] Component handles empty application state gracefully

## Issue 10: Create Database Schema Update Script
**Type**: HITL  
**Blocked by**: None - can start immediately (requires decision on exact schema)  
**User stories covered**:
- As a system, I want to store complete profile data so that all profile sections can be persisted

**What to build**:
Create SQL script to add missing columns to support full profile data:
- Add socialLinks JSONB, photo TEXT, pastSponsors TEXT[], preferredSponsorCategories TEXT[], excludedSponsorCategories TEXT[], dealTypesInterestedIn TEXT[], profileCompleteness INTEGER to team_profiles table
- Add brandName TEXT, oneLiner TEXT, description TEXT, logoUrl TEXT, websiteUrl TEXT, instagramUrl TEXT, targetAudience TEXT, geographicFocus TEXT, typicalOfferTypes TEXT[], pastSponsorships TEXT to sponsor_profiles table

**Acceptance criteria**:
- [ ] SQL script created with all necessary ALTER TABLE statements
- [ ] Script includes proper column types matching TypeScript interfaces
- [ ] Script is reviewed and approved (HITL aspect)
- [ ] Script can be executed against Supabase database
- [ ] Script includes rollback/down migration statements

## Issue 11: Implement Unit Tests for Validation and Calculation Functions
**Type**: AFK  
**Blocked by**: Issue 1, Issue 2, Issue 3  
**User stories covered**:
- (Supports all user stories through quality assurance)

**What to build**:
Create comprehensive unit tests for:
- Email validation functions (getWorkEmailValidationError, getEmailValidationError)
- Verification status functions (updateVerificationStatus, submitForVerification)
- Profile completion functions (computeCompleteness, computeSectionComplete)

**Acceptance criteria**:
- [ ] Test file created for email validation functions with comprehensive test cases
- [ ] Test file created for verification status functions covering all transitions
- [ ] Test file created for profile completion functions with various scenarios
- [ ] All tests pass with npm test
- [ ] Tests cover edge cases and error conditions
- [ ] Tests follow existing codebase testing patterns

## Issue 12: Implement Integration Tests for Signup → Onboarding → Verification Flow
**Type**: AFK  
**Blocked by**: Issue 6, Issue 7  
**User stories covered**:
- As a college sports team representative, I want to sign up with my .edu email address so that I can verify I'm affiliated with an educational institution
- As a business representative, I want to sign up with my work email address so that I can verify I'm affiliated with a legitimate company

**What to build**:
Create integration tests using React Testing Library that test:
- Complete team flow: visit signup page, enter valid .edu email, submit, verify navigation to onboarding, verify pre-filled data, complete profile sections, verify completion percentage updates, submit for verification, verify status change
- Complete sponsor flow: visit signup page, enter valid work email, submit, verify navigation to onboarding, verify pre-filled data, complete profile sections, verify completion percentage updates, submit for verification, verify status change
- Error cases: invalid emails show appropriate errors and prevent progression

**Acceptance criteria**:
- [ ] Test file created for team signup → onboarding → verification flow
- [ ] Test file created for sponsor signup → onboarding → verification flow
- [ ] Tests use React Testing Library and Jest/Vitest
- [ ] Tests mock Supabase calls where necessary
- [ ] All tests pass with npm test
- [ ] Tests cover both success and error paths