# Spontus Copilot Code Review Instructions

Spontus is a Next.js, React, TypeScript, and Tailwind CSS project. Reviews should focus on MVP-quality code, maintainability, accessibility, and avoiding unnecessary infrastructure.

## Review priorities

1. Flag bugs, broken flows, type errors, missing imports, and runtime risks.
2. Check that UI changes are responsive, accessible, and consistent with existing design patterns.
3. Verify that changes stay aligned with the current MVP scope.
4. Avoid suggesting large rewrites unless the code is unsafe, broken, or hard to maintain.
5. Prefer small, focused PRs with clear intent.

## Project conventions

- Use TypeScript-safe patterns.
- Keep components readable and focused.
- Prefer existing UI/component patterns before introducing new libraries.
- Do not add unnecessary dependencies.
- Do not add backend, auth, analytics, Supabase, Netlify functions, or environment variables unless the PR explicitly needs them.
- Current backend behavior may use local mock data; avoid assuming production Supabase wiring unless the PR is specifically about that.

## Next.js / React review checks

- Check for incorrect client/server component usage.
- Flag missing `"use client"` where browser-only APIs or React hooks are used.
- Flag unnecessary `"use client"` when a component can stay server-side.
- Check routing, metadata, loading, empty, and error states.
- Watch for hydration issues and browser-only code running during SSR.

## Styling and UX

- Check mobile responsiveness.
- Check spacing, contrast, keyboard navigation, labels, focus states, and semantic HTML.
- Prefer clean, minimal UI over over-engineered animation.
- Animation should not block usability or accessibility.

## Data and state

- Validate mock data shape consistency.
- Flag hardcoded data that should clearly be centralized.
- Check loading, empty, and failure states for data-driven UI.
- Do not expose secrets, tokens, private URLs, or sensitive keys.

## Dependency and lockfile checks

- If `package.json` changes, verify `package-lock.json` is consistent.
- Flag dependency additions that are unnecessary for the MVP.
- Flag suspicious version mismatches or overrides.
- Pay special attention to Next.js, React, Tailwind, PostCSS, and ESLint-related changes.

## Testing and validation

For meaningful code changes, look for one or more of:

- TypeScript validation
- lint/build compatibility
- unit tests where useful
- manual QA notes for UI behavior

Do not require tests for tiny copy-only or documentation-only changes.

## Deployment assumptions

- The MVP deployment target is Netlify.
- Do not add hosting-specific code unless required for build/deploy setup.
- Do not introduce paid infrastructure assumptions unless explicitly requested.

## Review tone

Be direct and practical. Prioritize high-impact issues. Avoid nitpicks unless they affect readability, consistency, accessibility, or future maintenance.
