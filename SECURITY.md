# Security

## Secret Scanning

This repository runs Gitleaks in GitHub Actions for pull requests, pushes to
`main`, and manual workflow dispatches.

GitHub push protection is controlled in repository settings, not by a workflow
file. Enable it in GitHub with:

1. Open repository **Settings**.
2. Go to **Code security and analysis**.
3. Enable **Secret Protection** or **Secret scanning**, depending on the
   repository plan and UI.
4. Enable **Push protection** for secret scanning.

For local checks before pushing, run:

```sh
gitleaks git --config .gitleaks.toml --redact .
```
