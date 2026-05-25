# Security Policy

## Reporting a Vulnerability

We take security issues seriously. If you discover a vulnerability in Spontus, please report it responsibly using **GitHub Security Advisories**.

**To submit a report:**

1. Navigate to the [Security Advisories](https://github.com/spontus-reach/spontus/security/advisories) tab of this repository.
2. Click **"Report a vulnerability"** to open a private advisory draft.
3. Fill in the details and submit.

This ensures your report remains private until a fix is available.

**What to include in your report:**

- A clear description of the vulnerability and its potential impact
- Steps to reproduce the issue (including environment details if relevant)
- Affected component(s) or file path(s)
- Any proof-of-concept code or screenshots
- Your assessment of severity (critical, high, medium, low)
- Suggested fix, if you have one

Please do **not** include sensitive credentials or live exploit payloads in your report.

## Response Timeline

| Action | Timeframe |
|--------|-----------|
| Acknowledgment of report | Within 3 business days |
| Initial assessment and triage | Within 5 business days |
| Status update to reporter | Within 10 business days |
| Fix development and release | Depends on severity and complexity |

We will keep you informed throughout the process. If you have not received a response within the stated timeframe, feel free to follow up on the advisory thread.

## Supported Versions

| Version | Supported |
|---------|-----------|
| Latest release on `main` | ✅ Yes |
| Previous releases | ❌ No |

Spontus is currently in active development as a pre-1.0 project. Security fixes are applied to the latest version on the `main` branch only. Older releases and branches do not receive backported fixes.

## Disclosure Policy

- **Do not** disclose vulnerabilities via public channels such as GitHub Issues, Discussions, pull requests, social media, or blog posts before a fix is available.
- **Do not** exploit the vulnerability beyond what is necessary to demonstrate it exists.
- Allow a reasonable amount of time for the maintainers to address the issue before any public disclosure.
- Once a fix is released, we will coordinate with you on public disclosure timing and credit attribution.

We appreciate responsible disclosure and will acknowledge reporters in release notes (unless you prefer to remain anonymous).
