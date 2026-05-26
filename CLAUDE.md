# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server at http://localhost:3000
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for static analysis
- `npm run typecheck` - Run TypeScript compiler for type checking
- `npm run test` - Run Node.js test suite
- `npm run validate:skills` - Validate agent skills configuration

## Code Architecture

### Project Structure
- `src/app` - Next.js 13+ app router with route groups and layouts
- `src/components` - Reusable UI components organized by feature:
  - `layout` - Navigation, footer, providers
  - `landing` - Public marketing pages
  - `team` - Team-facing features (signup, listings, applications)
  - `sponsor` - Sponsor-facing features (listings, applications, verification)
  - `profile` - User/team profile sections
  - `admin` - Administrative verification workflows
  - `ui` - Base UI components (shadcn/ui based)
  - `providers` - React context providers
- `src/lib` - Utility functions, constants, types, and mock data
- `src/components/ui` - Shadcn/ui wrapper components
- `public` - Static assets

### Key Features
- **Team/Sponsor Marketplace**: College club sports teams connect with sponsors
- **Verification Workflow**: Admin verification of team/sponsor eligibility
- **Application System**: Teams apply for sponsorships, sponsors review applications
- **Listing Management**: Create, edit, and manage sponsorship opportunities
- **Profile Pages**: Public team/sponsor profiles with stats and assets

### Styling & UI
- Tailwind CSS v4 for utility-first styling
- Shadcn/ui components via `@base-ui/react`
- Custom theme in `src/app/globals.css`
- Responsive design with dark mode support

### Data Flow
- React Server Components used extensively in `app` directory
- Client components for interactive features
- Form handling with React Hook Form patterns
- Server actions for mutations (where applicable)
- Type-safe APIs with TypeScript

## Best Practices
- Follow existing component organization patterns
- Use Tailwind utility classes consistent with existing styles
- Maintain type safety with TypeScript generics
- Place new components in feature-appropriate directories under `src/components`
- Add utilities to `src/lib` when reusable across features
- Follow commit message convention: `type(scope): description` (see CONTRIBUTING.md)
- Keep PRs focused with proper verification and testing sections

## Common Directories
- Feature work: Add/modify files in `src/components/[feature]/`
- Route changes: Modify files in `src/app/`
- Styling: Edit `src/app/globals.css` or use Tailwind classes directly
- Types: Update `src/lib/types.ts` for shared interfaces
- Utilities: Add to `src/lib/utils.ts` or create new files in `src/lib/`

## Testing
- Test files should be colocated with implementation
- Use Node.js test runner (`node --test`)
- Follow existing test patterns in the codebase