# Platform Concepts: Teams And Sponsors Definition

**Status:** Canonical
**Owner:** Brian + Joshua
**Last reviewed:** 2026-05-24
**Source:** Migrated Notion platform definitions
**Use this for:** Strategy-level definitions for Teams, Sponsors, and marketplace relationships.

Back to [Documentation Hub](../README.md).

## Summary / Why This Matters

This page defines the two sides of the marketplace: verified teams and sponsors. Use it when naming product objects, writing specs, designing onboarding, or deciding whether a workflow belongs to the team side, sponsor side, or shared platform layer.

For concise implementation vocabulary, use [Domain Glossary](../domain-glossary.md). For conceptual entities and statuses, use [Domain Model](../product/domain-model.md).

## Canonical MVP Definitions

| Concept | Canonical MVP definition |
| --- | --- |
| Team | A college club sports organization seeking sponsorship support. In the first wedge, this means Cal Poly club sports teams and similar student-run college teams. |
| Sponsor | A company or organization that provides cash, product, discounts, services, or access in exchange for sponsorship value. |
| Brand | The sponsor's public identity or product identity. Brand is not the primary account-side term. |
| Sponsorship Listing | A sponsor-created opportunity describing the offer, criteria, timeline, and requested assets. |
| Application | A team's submission to a specific sponsorship listing. |
| Deal | An accepted sponsorship relationship between one team and one sponsor. |
| Deliverable | A promised action or asset the team owes the sponsor. |
| Proof | Evidence that a deliverable happened. |
| Verification | A manual trust check for MVP that confirms teams and sponsors are legitimate enough to participate. |

## Canonical Language Rules

- Use **Team** and **Sponsor** for the two marketplace sides.
- Use **Brand** only when sponsor identity, brand safety, or public-facing marketing context matters.
- Use **club sports** for the market category, not as the account object.
- Use **Sponsorship Listing** before acceptance and **Deal** after acceptance.
- Use **Deliverable** for obligations and **Proof** for evidence.

## MVP Boundary

The canonical MVP model is intentionally narrower than the full reference material below. For development, assume manual verification, one active profile per team or sponsor, sponsor-created listings, team-submitted applications, and lightweight post-acceptance deal tracking.

The UI, verification, lifecycle, and data-attribute sections below are useful reference material. They include future-facing ideas and should not override [MVP Build Slices](../product/mvp-build-slices.md) or [Development Readiness](../engineering/development-readiness.md).

*Last Updated: 2026-05-24*

*This document defines the core entities in the Spontus ecosystem: Club Teams and Brand Sponsors. It outlines their definitions, capabilities, responsibilities, and how they interact within the platform.*

---

## Reference Material: Overview

Spontus connects two distinct but complementary entities:

1. **Club Teams**: Verified college club sports teams seeking sponsorship
2. **Brand Sponsors**: Companies seeking authentic grassroots sports marketing partnerships

This document defines what constitutes each entity type, what they can do on the platform, and how the platform facilitates value exchange between them.

---

## Reference Material: Teams Definition And Characteristics

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

## Reference Material: Sponsors Definition And Characteristics

### What Is a Brand Sponsor?

A **Brand Sponsor** is a company or organization that provides financial or in-kind support to Club Teams in exchange for marketing benefits, audience access, and brand alignment opportunities. Key characteristics:

- **Marketing-Driven**: Seeks measurable return on sponsorship investment
- **Audience-Focused**: Wants to reach specific demographics (college students, athletes, active lifestyles)
- **Value-Aligned**: Looks for authentic connections between brand values and team/sport culture
- **Local/Regional Focus**: Often interested in geographic targeting near campuses or specific markets
- **Relationship-Oriented**: Prefers ongoing partnerships over one-off transactions
- **Flexible Budget**: May allocate sponsorship funds from marketing, community relations, or experiential budgets

### Types of Brand Sponsors

1. **Endemic Brands**: Sports-related companies (equipment, apparel, nutrition, recovery)
2. **Local Businesses**: Campus-area establishments (restaurants, retail, services)
3. **National/Regional Brands**: Larger companies seeking college market penetration
4. **Alumni-Owned Businesses**: Companies founded by graduates seeking to support their alma mater's teams
5. **Health & Wellness**: Fitness, mental health, recovery-focused brands
6. **Food & Beverage**: Especially relevant for athlete nutrition and team social events

### Brand Motivations & Goals

Brands sponsor Club Teams to achieve:

- **Target Audience Access**: Direct connection to college students aged 18-24
- **Authentic Engagement**: Grassroots credibility vs. traditional advertising
- **Content Generation**: User-generated content, social media opportunities
- **Sampling & Trial**: Product placement and athlete endorsement opportunities
- **Community Goodwill**: Positive brand association with youth sports and education
- **Employee Engagement**: Opportunities for employee volunteering or team-building
- **Market Research**: Feedback and insights from college demographic
- **Sales Conversion**: Discount codes, promo tracking, direct response mechanisms

---

## Reference Material: Value Exchange Framework

### What Clubs Provide to Brands

Club Teams offer sponsors:

**1. Audience Access:**
- Direct reach to student-athletes and their networks
- Game/match attendance (friends, family, alumni)
- Social media followings (team accounts + athlete personal brands)
- Email lists and communication channels

**2. Authentic Brand Alignment:**
- Association with healthy, active lifestyles
- Connection to values like teamwork, dedication, sportsmanship
- Local community engagement credibility

**3. Content & Activation Opportunities:**
- Athlete wear/use of products during practice and competition
- Social media content creation by team members
- Event sampling and product distribution opportunities
- Brand visibility at competitions and team events

**4. Data & Insights:**
- Team demographics and interests
- Feedback on product usage and preferences
- Engagement metrics from sponsored activities

### What Brands Provide to Clubs

Brand Sponsors offer teams:

**1. Financial Support:**
- Direct sponsorship payments (cash)
- Stipends for specific expenses (travel, equipment)
- Budget relief for operational costs

**2. In-Kind Contributions:**
- Equipment and gear (uniforms, sport-specific items)
- Products for consumption (nutrition, recovery, hydration)
- Services (transportation, printing, design)
- Access to facilities or experiences

**3. Resources & Expertise:**
- Marketing and promotional support
- Access to professional networks or career opportunities
- Educational resources (nutrition, fitness, mental health)
- Discount programs for team members and families

**4. Administrative Assistance:**
- Sponsorship management guidance
- Contract templating and legal support
- Reporting and impact measurement tools

---

## Reference Material: User Interface And User Experience

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

### Brand Sponsor Perspective

#### Dashboard/Home View

Upon login, brands see:
- **Campaign Overview**: Active sponsorships, performance metrics, ROI indicators
- **Team Discovery**: New teams matching criteria, trending opportunities
- **Application Inbox**: Club team applications requiring review
- **Performance Reporting**: Automated and manual data on sponsorship effectiveness
- **Quick Actions**: Browse teams, create new listings, review applications

#### Profile Management

Brands can maintain:
- **Company Information**: Brand description, marketing objectives, target demographics
- **Sponsorship Guidelines**: Budget ranges, preferred sports/regions, activation requirements
- **Past Performance**: History of sponsorships, case studies, learnings
- **Contact Information**: Marketing/sponsorship team contacts, preferred communication methods

#### Sponsorship Listing Creation

Brands can create opportunities specifying:
- **Sponsorship Type**: Financial support, in-kind donations, hybrid arrangements
- **Budget Range**: Minimum/maximum investment, payment schedule
- **Deliverables Expected**: What the brand requires from the team (posts, appearances, etc.)
- **Target Team Criteria**: Sport, geographic location, team size, competitive level, values alignment
- **Duration**: Season-long, annual, multi-year, or event-specific
- **Exclusivity Terms**: Category exclusivity, competing brand restrictions
- **Application Process**: Required information, submission deadlines, review timeline

#### Team Discovery & Evaluation

Brands can:
- **Search Teams**: By sport, location, school, size, competitive achievements
- **Review Team Profiles**: Verification status, media, athlete demographics, sponsorship history
- **Assess Fit**: Alignment with brand values, audience demographics, activation potential
- **Initiate Contact**: Send personalized invitations to apply or start conversation
- **Save Favorites**: Create lists of promising teams for different campaigns

#### Sponsorship Relationship Management

For active sponsorships, brands can:
- **Monitor Deliverables**: Track team progress on agreed-upon activities
- **Review Proof of Performance**: Approve or request revisions to submitted content/reports
- **Measure Impact**: Track engagement metrics, redemption codes, brand lift studies
- **Communicate with Teams**: Provide feedback, coordinate activations, answer questions
- **Process Renewals**: Evaluate performance and discuss continuation/expansion
- **Report Results**: Internal reporting on sponsorship effectiveness and ROI

---

## Reference Material: Verification And Trust Framework

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

### Brand Verification Process

To ensure team confidence, Spontus verifies brands through:

**1. Business Validation:**
- Legal business registration and operational status
- Verification of physical address and contact information
- Tax ID/EIN validation for US-based companies

**2. Marketing Authorization:**
- Confirmation that representatives have authority to enter sponsorship agreements
- Validation of marketing budget availability
- Review of past sponsorship or marketing partnerships

**3. Brand Safety Screening:**
- Review for alignment with educational institution values
- Screening for controversial products, services, or practices
- Verification of compliance with advertising standards and regulations
- Assessment of brand reputation and public standing

**4. Financial Stability (for larger commitments):**
- Basic financial health indicators for significant sponsorships
- Payment history verification for repeat sponsors

---

## Reference Material: Data Model And Attributes

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

### Brand Sponsor Data Structure

**Core Attributes:**
- `sponsor_id`: Unique identifier
- `company_name`: Legal business name
- `brand_name`: Consumer-facing brand (if different)
- `industry`: Primary business sector
- `headquarters_location`: Main business location
- `founded_year`: Year established
- `verification_status`: Pending, Verified, Needs Renewal, Suspended
- `verification_date`: Last verification timestamp
- `marketing_budget_range`: Typical sponsorship investment levels
- `target_demographics`: Primary audiences sought through sponsorship

**Profile Information:**
- `description`: Company history, mission, values
- `products_services`: What the brand offers
- `marketing_objectives`: Goals for sports sponsorship investments
- `past_sponsorships`: Notable previous sports partnerships
- `contact_info`: Marketing/sponsorship team contacts
- `preferred_communication`: How the brand likes to be contacted

**Sponsorship Guidelines:**
- `budget_min_max`: Investment range for different opportunity types
- `sponsored_sports`: Sports the brand is interested in supporting
- `geographic_preference`: Regions, cities, or schools of interest
- `team_criteria`: Size, competitive level, values alignment preferences
- `deliverable_types`: What brands expect from teams (posts, appearances, etc.)
- `exclusivity_terms`: Category restrictions and competing brand policies

**Relationship Data:**
- `active_sponsorships`: Current deals with teams
- `sponsorship_history`: Past sponsorships with performance data
- `team_applications`: Received applications and their status
- `performance_metrics`: Tracked results from sponsorship campaigns
- `roi_measurements`: Return on investment calculations and studies

---

## Reference Material: Relationship Lifecycle And Workflows

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

## Reference Material: Standards And Best Practices

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

### For Brand Sponsors

**Do:**
- Clearly communicate expectations, deliverables, and timelines upfront
- Provide timely feedback on submitted content and performances
- Pay agreed amounts according to payment schedule
- Respect team's autonomy and authentic voice in content creation
- Provide reasonable notice for changes or adjustments to sponsorship
- Consider multi-year relationships for teams that deliver consistent value
- Provide teams with meaningful access to brand representatives when possible

**Don't:**
- Change requirements or deliverables without discussion and agreement
- Delay payment beyond agreed terms without communication
- Request excessive or unreasonable deliverables relative to sponsorship value
- Attempt to control team operations, membership, or competitive decisions
- Use team's name or likeness beyond agreed-upon permissions
- Fail to provide necessary brand guidelines, assets, or support materials

---

## Conclusion

Spontus succeeds by creating genuine, mutually beneficial relationships between college club sports teams and brands seeking authentic grassroots engagement. By clearly defining what constitutes a "club" and what constitutes a "brand/sponsor", and by providing structured pathways for discovery, negotiation, activation, and renewal, the platform enables sustainable partnerships that:

- **Help Teams**: Access resources they need to compete and develop athletes
- **Help Brands**: Reach target audiences with credibility and authenticity
- **Help Students**: Gain valuable experiences in sponsorship management, marketing, and entrepreneurship
- **Help Institutions**: See their club sports programs thrive with additional support

The definitions and frameworks outlined here should evolve based on real-world platform usage, feedback from both teams and brands, and changes in the college sports and sponsorship landscapes.

---

*Sources Consulted:*
- Collegiate club sports in the United States - Wikipedia
- Club Sports vs. NCAA Sports: What's the Difference? - bridgeport.edu
- What Does Club Sport Mean In College - sportslawblogger.com
- Considering Club Sports in College - The Student-Athlete Advisors
- Differences Between College, Club, and Intramural Sports - appily.com
- Club Sports in College - How They Work - LSU University Rec
- Deconstructing the Structure of Collegiate Sport Clubs - journals.sagepub.com
- Behind the Deal: Understanding Sports Sponsorships and Brand Partnerships - SMU
- Sports Sponsorship Explained - Visme
- Sports Sponsorship Guide (2026) - SponsorFlo
- Impact of Sponsorship and Endorsements in Sport Management - Lindenwood
- What do sponsors get in return? - RTR Sports Marketing
- The Power Of Sports Partnerships - Forbes
- The ultimate sports sponsorship guide - Infront Sports & Media
- A Comprehensive Guide to Sponsorships for Sports - LinkedIn
- A Guide to Navigating Sports Sponsorships and Partnerships - sportandmotion.com
- Club Sports Handbook 2025-2026 - keene.edu
- Club Sports Manual 2025-2026 - butler.edu
- Sports Clubs Manual - Lafayette

*Next Steps:*
1. Review with team leads and potential sponsors for feedback
2. Implement verification processes based on these definitions
3. Build UI flows that reflect the outlined user experiences
4. Create template sponsorship agreements incorporating these standards
5. Develop measurement frameworks aligned with the value exchange described
