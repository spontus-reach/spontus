# Spontus Agent Roster

**Status:** Canonical
**Owner:** Brian + Joshua
**Last reviewed:** 2026-05-28
**Source:** Agent roster specification
**Use this for:** Understanding available agent roles and when to leverage them for Spontus development tasks.

## Summary

This document defines a roster of specialized agent roles for Spontus development work. The roster reflects the project's current shape: a Next.js/React/TypeScript/Tailwind app with Supabase-ready marketplace data model, targeting Netlify deployment, following a Cal Poly-first go-to-market approach, and utilizing repo-local `.agents/skills` for reusable workflows.

All agent roles use Spontus-domain terminology: `Team`, `Sponsor`, `SponsorshipListing`, `Application`, `Deal`, `Deliverable`, `Proof`, and `VerificationStatus`.

## Agent List

| Agent | What It Should Do | When To Use It |
| --- | --- | --- |
| Product Strategist | Clarify MVP scope, marketplace sequencing, and tradeoffs against the product vision. | Before adding features, changing scope, or debating what belongs in MVP vs later. |
| Domain Model Steward | Protect canonical language, entity relationships, lifecycle states, and data concepts. | When adding/changing Teams, Sponsors, Listings, Applications, Deals, Deliverables, Proof, or verification flows. |
| MVP Slice Planner | Convert product goals into small vertical implementation slices with acceptance checks. | Before starting any new feature area or cutting GitHub issues. |
| Team-Side UX Agent | Design and critique team onboarding, profile creation, asset selection, listings browse, and applications. | For `/signup/team`, `/team/onboarding`, `/teams/[slug]`, `/team/listings`, and team-facing flows. |
| Sponsor-Side UX Agent | Design and critique sponsor onboarding, profile setup, listing creation, applicant review, and decisions. | For `/signup/sponsor`, `/sponsor/onboarding`, listing composer, applicant review, and sponsor workflows. |
| Admin Verification Agent | Own manual verification workflow, reviewer states, decision reasons, and marketplace gating. | For `/admin/verification`, verification status changes, trust/safety decisions, and participation gating. |
| Sponsorship Asset Taxonomy Agent | Maintain the shared asset menu used by teams and sponsor listings. | Whenever assets like jersey logos, social posts, booths, sampling, or custom activations are changed. |
| Frontend Implementation Agent | Build scoped UI features using existing components, TypeScript, Tailwind, and shadcn/Base UI patterns. | For normal Next.js app work after product scope is clear. |
| Frontend QA Agent | Verify responsive layout, accessibility, keyboard behavior, focus states, visual consistency, and browser behavior. | After UI changes, before PR review, or when a screen feels visually broken. |
| React/Next.js Performance Agent | Check server/client component boundaries, hydration risk, bundle weight, rendering strategy, and route behavior. | For React/Next.js refactors, route changes, performance issues, or client/server bugs. |
| Backend/Supabase Agent | Plan and implement Supabase schema, RLS, auth boundaries, storage, server actions, and data access. | For database, auth, migrations, storage, route handlers, or replacing mock data with Supabase. |
| Data Integrity Agent | Check mock data, schema shape, lifecycle transitions, status constraints, and duplicate application rules. | When changing `src/lib/types.ts`, `src/lib/mock-data.ts`, `supabase/schema.sql`, or application/review logic. |
| Security & Access Control Agent | Review secrets, RLS assumptions, auth flows, private data exposure, and trust boundaries. | Before wiring real auth/data, adding environment variables, or exposing sponsor/team/admin data. |
| Code Review Agent | Review PRs for bugs, maintainability, scope creep, broken flows, missing states, and test gaps. | On every meaningful code PR or before merging generated code. |
| TDD Agent | Drive red-green-refactor for domain logic, validation, lifecycle transitions, and high-risk behavior. | When adding business rules, reducers/providers, gating logic, or regression-prone fixes. |
| Debug/Diagnose Agent | Reproduce, minimize, instrument, fix, and regression-test failing behavior. | For broken builds, runtime errors, flaky flows, or confusing state bugs. |
| Documentation Agent | Keep docs aligned with product, engineering, decisions, and implementation reality. | After durable decisions, feature changes, schema changes, or docs drift. |
| Decision Log Agent | Capture accepted/open decisions with rationale and date. | Whenever a product, GTM, technical, or operating decision becomes durable. |
| Issue Triage Agent | Turn bugs, ideas, and research into well-scoped GitHub issues with labels and acceptance checks. | When managing backlog, incoming ideas, or breaking a plan into work. |
| PRD Agent | Convert a product idea or conversation into a structured PRD. | Before large features, new workflows, or changes that need founder alignment. |
| Research Synthesis Agent | Convert interviews, market notes, and sponsor/team evidence into durable insights. | After team interviews, sponsor calls, market research, or Cal Poly discovery work. |
| GTM Agent | Manage outreach motion, sponsor pipeline hygiene, customer segments, and follow-up discipline. | For sponsor lead work, team interview planning, sales motion, or go-to-market docs. |
| Competitive Research Agent | Compare Spontus against sponsorship, marketplace, sports, and creator/brand platforms. | Before positioning changes, pricing ideas, pitch work, or roadmap strategy. |
| Figma Design Review Agent | Review Figma screens against product requirements and developer handoff needs. | Before implementing or changing UI based on Figma. |
| Figma Annotation Agent | Produce developer-ready Figma annotations for spacing, states, interactions, and accessibility. | When handing a design to engineering. |
| Figma Component Audit Agent | Audit component consistency, variants, naming, and design-system gaps. | When the design system starts to drift or before larger UI expansion. |
| Prototype Agent | Build throwaway prototypes for uncertain flows or UI options before production work. | When the team needs to test an interaction, state model, or visual direction cheaply. |
| Architecture Agent | Identify simplification, coupling, domain boundary, and testability improvements. | Periodically, or before scaling beyond MVP slices. |
| Deployment Agent | Verify Netlify deployment assumptions, build commands, environment variables, and production readiness. | Before launch, deploy setup, domain work, or CI/deployment changes. |
| Dependency & Tooling Agent | Review package changes, lockfile consistency, CI, lint/typecheck/test scripts, and repo automation. | When dependencies, GitHub workflows, ESLint, TypeScript, or tooling change. |
| Handoff Agent | Produce compact continuation notes for another agent or human collaborator. | Before context switches, long pauses, or handing unfinished work to someone else. |
| Skill Authoring Agent | Create or update repo-local `.agents/skills` behavior. | When the team wants reusable project-specific agent workflows. |
| Context7 Docs Agent | Fetch current library/framework/API documentation via Context7 before answering library-specific questions. | For Next.js, React, Supabase, Tailwind, shadcn, Base UI, Netlify, CLI/API docs, or version-specific guidance. |

## Shared Rules For All Agents

- Read the relevant canonical docs before acting: `docs/README.md`, `docs/domain-glossary.md`, `docs/product/mvp-overview.md`, `docs/product/domain-model.md`, `docs/product/mvp-build-slices.md`, and area-specific docs.
- Keep work aligned to the MVP build order: Team profile, Sponsor profile/listing, Team application, Sponsor review, Admin verification.
- Avoid out-of-scope MVP features unless explicitly requested: payments, escrow, AI contracts, advanced analytics, automated matching, full CRM, native mobile, and complex compliance workflows.
- Prefer existing repo patterns, small PRs, explicit TypeScript types, and mock data shaped like future Supabase rows.
- Use repo-local `.agents/skills` first when a matching skill exists.

## Test/Acceptance Checks

- The roster covers product, design, frontend, backend, data, security, QA, docs, GTM, research, deployment, and agent operations.
- Each agent has a clear "what it does" and "when to use it."
- The list reflects Spontus-specific domain language and MVP constraints.
- No implementation or file edits are required.