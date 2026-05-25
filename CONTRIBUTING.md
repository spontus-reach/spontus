# Contributing

Thanks for contributing to Spontus. This guide explains the local setup, branch and commit conventions, and pull request expectations for this repository.

## Local Development

Requirements:

- Node.js 22
- npm

Set up the project:

```sh
npm install
```

Useful commands:

```sh
npm run lint
npm run test
npm run build
```

Use `npm run lint` for static checks, `npm run test` for the Node.js test suite, and `npm run build` to verify the Next.js production build.

## Branch Naming

Use one of these branch prefixes:

- `feature/`
- `fix/`
- `docs/`
- `chore/`
- `security/`

Examples:

- `feature/team-profile-editor`
- `fix/dependency-review-config`
- `docs/contributor-guide`

## Commit Messages

Use this format:

```text
type(scope): description
```

Allowed types:

- `feat`
- `fix`
- `docs`
- `chore`
- `ci`
- `refactor`
- `test`
- `build`
- `perf`

Examples:

```text
docs(repo): add contributing guide
ci(actions): add main workflow
fix(team): handle empty sponsor list
```

## Pull Requests

Pull request titles must use the same format as commit messages:

```text
type(scope): description
```

The PR body must include the template sections:

- `Summary`
- `Verification`

Replace the placeholder text in those sections before submitting. The PR quality workflow fails when the body is empty, required sections are missing, or the Summary and Verification placeholders are still present.

Before requesting review:

- Keep the PR scoped to one change.
- Run the relevant verification commands.
- Link related issues with GitHub keywords such as `Closes #123` when applicable.
- Call out follow-ups, risks, or manual verification notes.

## Community Standards

All contributors are expected to follow the [Code of Conduct](CODE_OF_CONDUCT.md).
