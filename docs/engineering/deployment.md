# Deployment

**Status:** Reference
**Owner:** Brian + Joshua
**Last reviewed:** 2026-05-24
**Source:** Current build direction and domain decision
**Use this for:** Hosting, deployment, and production-domain assumptions for the Spontus MVP.

Back to [Engineering Index](./index.md).

## Decision

Use **Netlify** for MVP preview and production deploys.

Use **`spontus.io`** as the intended custom production domain.

## Rationale

Netlify is the current deployment target because it keeps the MVP deployment path free/low-friction and supports connecting the custom domain `spontus.io` when the team is ready to demo publicly.

## Current Assumptions

- App framework: Next.js.
- Source control: GitHub.
- Hosting: Netlify.
- Production domain: `spontus.io`.
- Backend: local mock data for the current MVP slices; Supabase-ready data structures are planned for later.
- Environment variables: keep minimal until Supabase or other services are actually wired.

## Deployment Slice

After the five core MVP slices are complete, add a small deployment slice.

Goal: Put the working MVP on a shareable public URL without adding unnecessary infrastructure.

Includes:

1. Confirm the app builds locally.
2. Add or verify Netlify build settings.
3. Deploy from GitHub to Netlify.
4. Connect `spontus.io` as the custom production domain.
5. Document the deployment workflow in the README or this file.

Done when:

- The latest MVP deploy is accessible on Netlify.
- `spontus.io` points to the production deploy.
- The deployment doc explains build command, publish output, and local/deploy workflow.

## Netlify Setup Notes

Expected setup, subject to actual app scaffold:

- Build command: `npm run build`
- Install command: `npm install` or Netlify default
- Publish output: verify based on the Next.js/Netlify adapter setup
- Node version: use the version defined by the repo if present

Do not add hosting-specific code to product slices unless required for the Next.js build or Netlify deployment setup.

## Non-Goals

Do not add these during product slices unless explicitly needed:

- Extra infrastructure.
- Paid hosting assumptions.
- Netlify functions.
- Edge functions.
- Supabase wiring.
- Analytics scripts.
- Production auth.
- Secrets or environment variables not used by the current app.
