/** Comma-separated platform admin emails (server-only). Example: you@gmail.com,cofounder@company.com */
const ADMIN_EMAILS_ENV = "ADMIN_EMAILS";

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/** Parsed allowlist from `ADMIN_EMAILS`. Empty when unset — no one is admin. */
export function getPlatformAdminEmails(): string[] {
  const raw = process.env[ADMIN_EMAILS_ENV];
  if (!raw?.trim()) return [];
  return [...new Set(raw.split(",").map(normalizeEmail).filter(Boolean))];
}

export function isPlatformAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const admins = getPlatformAdminEmails();
  if (admins.length === 0) return false;
  return admins.includes(normalizeEmail(email));
}
