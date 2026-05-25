# Club Team Definition

*Last Updated: 2026-05-24*

*This document defines what constitutes a Club Team in the Spontus ecosystem.*

---

## Overview

A **Club Team** is a verified college club sports team seeking sponsorship through the Spontus platform.

---

## Definition & Characteristics

### What Is a Club Team?

A **Club Team** is a student-run, college-affiliated sports organization that operates outside the varsity/NCAA athletic structure but maintains formal recognition from the institution. Key characteristics:

- **Student-Led**: Primarily organized, managed, and operated by enrolled students
- **Institutionally Recognized**: Has official status through campus recreation, student affairs, or club sports office
- **Self-Funded**: Generates its own budget through dues, fundraising, and sponsorships (limited university funding)
- **Competitive Focus**: Participates in organized leagues, tournaments, and competitions against other colleges
- **Sport-Specific**: Organized around a specific sport (rugby, soccer, swimming, ultimate frisbee, etc.)
- **Seasonal Operations**: Follows academic year with defined competitive seasons
- **Governance Structure**: Has elected officers (president, treasurer, secretary) and may have constitutions/bylaws

### Legal & Organizational Framework

Club Teams typically operate under:

- **University Policies**: Must comply with student organization policies, risk management requirements, and facility use agreements
- **Sport Governing Bodies**: May be affiliated with national collegiate sport associations (NIRSA, NCSA, sport-specific collegiate organizations)
- **Liability Considerations**: Often require members to sign waivers and may carry their own insurance
- **Academic Standing**: Members typically must maintain minimum GPA and enrollment status

### Core Needs & Pain Points

Club Teams seek sponsorship to address:

- **Equipment Costs**: Uniforms, gear, sport-specific equipment
- **Travel Expenses**: Transportation, lodging, meals for competitions
- **Facility Fees**: Field/court rentals, pool time, gym access
- **Tournament Entry Fees**: Registration costs for leagues and championships
- **Operational Costs**: Administrative expenses, first aid supplies, communication tools
- **Athlete Development**: Coaching certifications, referee fees, skill clinics

---

## User Interface & User Experience

### Club Team Perspective

#### Dashboard/Home View

Upon login, clubs see:
- **Profile Completeness Indicator**: Verification status, missing information highlights
- **Active Sponsorships**: Current deals with expiry dates, deliverables tracking
- **Application Status**: Pending, approved, or rejected sponsorship applications
- **Messages**: Communications from sponsors or platform administrators
- **Quick Actions**: Apply to sponsorships, update profile, request verification

#### Profile Management

Clubs can edit and maintain:
- **Basic Info**: Team name, sport, school, contact information, social media links
- **Verification Documents**: Rosters, governance documents, facility agreements, insurance certificates
- **Team Description**: History, achievements, values, competitive level
- **Athlete Roster**: Current members with roles, academic years, contact opt-ins
- **Media Gallery**: Photos, videos, highlight reels, press coverage
- **Sponsorship Preferences**: Types of support sought, budget needs, activation ideas

#### Sponsorship Discovery & Application

Clubs can:
- **Browse Opportunities**: Filter by sport, location, sponsorship type, budget range, brand values
- **View Listings**: Detailed sponsorship offers with requirements, benefits, duration, application process
- **Submit Applications**: Customized responses highlighting fit, planned use of support, audience demographics
- **Track Applications**: Status updates, feedback from brands, next steps timelines
- **Manage Multiple Applications**: Simultaneous pursuit of different opportunities

#### Sponsorship Relationship Management

For active sponsorships, clubs can:
- **View Deal Terms**: Financial amounts, deliverables, timelines, exclusivity clauses
- **Track Deliverables**: Progress on agreed-upon actions (social posts, event attendance, product usage)
- **Submit Proof of Performance**: Photos, videos, metrics, reports as required by sponsor
- **Communicate with Sponsor**: Direct messaging within platform for coordination
- **Request Renewal/Extension**: Early conversations about continuing partnership
- **Provide Feedback**: Share impact and suggestions for future collaborations

---

## Verification & Trust Framework

### Club Team Verification Process

To ensure brand confidence, Spontus verifies clubs through:

**1. Institution Validation:**
- Confirmation of official club sports status with university
- Validation through campus recreation or student affairs office
- Cross-reference with institution's club sports directory

**2. Governance Validation:**
- Review of team constitution/bylaws or governance documents
- Confirmation of officer elections and terms
- Validation of meeting minutes or organizational records

**3. Operational Validation:**
- Review of practice/competition schedules
- Validation of facility use agreements or reservations
- Confirmation of active participation in leagues/tournaments

**4. Safety & Compliance:**
- Verification of required waivers and insurance coverage
- Confirmation of adherence to university risk management policies
- Review of emergency action plans and safety protocols

---

## Data Model & Attributes

### Club Team Data Structure

**Core Attributes:**
- `team_id`: Unique identifier
- `name`: Official team name
- `sport`: Primary sport (with secondary/tertiary options)
- `school`: College/university affiliation
- `city_state`: Location
- `founded_year`: Year established
- `verification_status`: Pending, Verified, Needs Renewal, Suspended
- `verification_date`: Last verification timestamp
- `team_size`: Current number of active members
- `competitive_level`: Division, conference, or tier information
- `seasons_active`: List of academic years with activity

**Profile Information:**
- `description`: Team history, mission, values
- `achievements`: Championships, tournament results, notable accomplishments
- `social_media`: Platform handles and links
- `contact_info`: Primary contacts (president, treasurer, sponsorship coordinator)
- `practice_info`: Location, schedule, facility details
- `competition_schedule`: Upcoming events and travel plans

**Sponsorship Preferences:**
- `funding_needs`: Budget breakdown by category (equipment, travel, etc.)
- `preferred_sponsor_types`: Types of brands sought (endemic, local, etc.)
- `activation_ideas`: Concepts for how sponsors could engage with team
- `audience_demographics`: Information about team members and fan base
- `content_guidelines`: Requirements or restrictions for sponsor content

**Relationship Data:**
- `current_sponsorships`: Active deals with brands
- `sponsorship_history`: Past sponsorships with outcomes
- `application_history`: Submitted applications and their results
- `performance_metrics`: Tracked results from past sponsorships

---

## Relationship Lifecycle & Workflows

### Sponsorship Discovery Phase

1. **Brand Creates Listing**: Defines sponsorship opportunity with requirements and benefits
2. **Platform Matching**: Algorithm suggests teams based on sport, location, size, values
3. **Team Discovers Opportunity**: Through browsing, recommendations, or direct invitations
4. **Team Evaluates Fit**: Reviews requirements, benefits, brand alignment, effort required
5. **Team Applies**: Submits customized application highlighting fit and planned utilization

### Application & Negotiation Phase

1. **Brand Reviews Application**: Evaluates team qualifications, fit, and proposed utilization
2. **Brand Requests Information**: May ask for additional details, references, or planning documents
3. **Brand Extends Offer**: Presents formal sponsorship proposal with terms and deliverables
4. **Team Reviews Offer**: Evaluates financial/in-kind value vs. required efforts and restrictions
5. **Negotiation Occurs**: Adjustments to amounts, deliverables, timelines, or exclusivity

### Agreement & Activation Phase

1. **Agreement Executed**: Formal sponsorship agreement signed within platform
2. **Onboarding Completed**: Teams receive brand guidelines, assets, and requirements
3. **Activation Planning**: Joint planning of how sponsorship will be implemented
4. **Initial Deliverables**: Teams begin fulfilling agreed-upon promotional activities
5. **Ongoing Coordination**: Regular communication to ensure alignment and address issues

### Performance & Renewal Phase

1. **Performance Tracking**: Both parties monitor deliverable completion and impact
2. **Mid-Term Check-Ins**: Optional reviews to adjust course if needed
3. **End-of-Term Reporting**: Comprehensive reporting on activities, results, and learnings
4. **Renewal Discussion**: Evaluation of partnership value and interest in continuation
5. **Renewal or Transition**: New agreement negotiated or respectful conclusion of partnership

---

## Standards & Best Practices

### For Club Teams

**Do:**
- Maintain accurate and up-to-date rosters and contact information
- Respond to sponsorship inquiries within 3-5 business days
- Deliver promised activations on time and as specified
- Provide authentic, genuine content that represents the team honestly
- Keep sponsors informed of team achievements and milestones
- Use sponsorship support primarily for its intended purpose
- Provide clear documentation and proof of performance as requested

**Don't:**
- Misrepresent team size, achievements, or competitive level
- Fail to disclose material changes that affect sponsorship value
- Use sponsorship funds for purposes outside agreed-upon categories
- Deliver low-quality or inauthentic promotional content
- Ignore sponsor communications or miss deadlines without notice
- Exceed agreed-upon exclusivity or category restrictions

---

## Conclusion

Well-defined Club Teams on Spontus gain access to resources they need to compete and develop athletes through structured sponsorship relationships with authentic brand partners.

---

*Sources Consulted:*
- Collegiate club sports in the United States - Wikipedia
- Club Sports vs. NCAA Sports: What's the Difference? - bridgeport.edu
- What Does Club Sport Mean In College - sportslawblogger.com
- Considering Club Sports in College - The Student-Athlete Advisors
- Differences Between College, Club, and Intramural Sports - appily.com
- Club Sports in College - How They Work - LSU University Rec
- Deconstructing the Structure of Collegiate Sport Clubs - journals.sagepub.com
- Club Sports Handbook 2025-2026 - keene.edu
- Club Sports Manual 2025-2026 - butler.edu
- Sports Clubs Manual - Lafayette

*Next Steps:*
1. Review with team leads for feedback
2. Implement verification processes based on this definition
3. Build UI flows that reflect the outlined user experience
4. Create template sponsorship agreements incorporating these standards
5. Develop measurement frameworks for sponsorship success
