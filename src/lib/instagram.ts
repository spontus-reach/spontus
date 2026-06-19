// Instagram follower-count service.
//
// Live counts come from the Instagram Graph API "Business Discovery" endpoint,
// which is the only ToS-compliant way to read another account's follower count.
// It requires (a) a Meta app with an Instagram Business/Creator account + token
// and (b) the *target* account to also be a Business/Creator profile.
//
// When the required env vars are absent (or the API call fails), we fall back to
// the cached/seeded count passed in by the caller, so the UI never breaks.
//
// Configure (server-only, never exposed to the browser):
//   INSTAGRAM_GRAPH_TOKEN            — long-lived access token
//   INSTAGRAM_BUSINESS_ACCOUNT_ID    — your IG business account id (the query node)

const GRAPH_API_VERSION = "v21.0";
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

export type InstagramStatsSource = "live" | "cached";

export type InstagramStats = {
  username: string;
  followerCount: number | null;
  source: InstagramStatsSource;
  fetchedAt: string;
};

const memoryCache = new Map<string, { stats: InstagramStats; expiresAt: number }>();

/**
 * Normalizes a username, @handle, or full instagram.com URL down to a bare
 * lowercase username. Returns null when nothing usable can be extracted.
 */
export function parseInstagramUsername(
  input: string | undefined | null
): string | null {
  if (!input) return null;
  const trimmed = input.trim();
  if (!trimmed) return null;

  // Bare handle (no path/host), e.g. "cptri" or "@cptri".
  if (!trimmed.includes("/") && !trimmed.includes(".")) {
    const handle = trimmed.replace(/^@/, "").toLowerCase();
    return handle || null;
  }

  try {
    const url = new URL(
      trimmed.startsWith("http") ? trimmed : `https://${trimmed}`
    );
    const segment = url.pathname.split("/").filter(Boolean)[0];
    if (!segment) return null;
    return segment.replace(/^@/, "").toLowerCase() || null;
  } catch {
    const handle = trimmed.replace(/^@/, "").toLowerCase();
    return handle || null;
  }
}

async function fetchFromGraphApi(username: string): Promise<number | null> {
  const token = process.env.INSTAGRAM_GRAPH_TOKEN;
  const businessAccountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;
  if (!token || !businessAccountId) return null;

  const fields = `business_discovery.username(${username}){followers_count}`;
  const endpoint =
    `https://graph.facebook.com/${GRAPH_API_VERSION}/${businessAccountId}` +
    `?fields=${encodeURIComponent(fields)}` +
    `&access_token=${encodeURIComponent(token)}`;

  try {
    const res = await fetch(endpoint, { cache: "no-store" });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      business_discovery?: { followers_count?: number };
    };
    const count = data?.business_discovery?.followers_count;
    return typeof count === "number" ? count : null;
  } catch {
    return null;
  }
}

/**
 * Resolves the follower count for an Instagram account.
 *
 * Tries the live Graph API (cached in-memory for an hour) and falls back to the
 * provided seed count when live data is unavailable.
 */
export async function getInstagramFollowers(
  usernameOrUrl: string,
  fallback?: number
): Promise<InstagramStats> {
  const username = parseInstagramUsername(usernameOrUrl);
  const fetchedAt = new Date().toISOString();

  if (!username) {
    return {
      username: "",
      followerCount: fallback ?? null,
      source: "cached",
      fetchedAt,
    };
  }

  const cached = memoryCache.get(username);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.stats;
  }

  const live = await fetchFromGraphApi(username);
  if (live !== null) {
    const stats: InstagramStats = {
      username,
      followerCount: live,
      source: "live",
      fetchedAt,
    };
    memoryCache.set(username, { stats, expiresAt: Date.now() + CACHE_TTL_MS });
    return stats;
  }

  return {
    username,
    followerCount: fallback ?? null,
    source: "cached",
    fetchedAt,
  };
}
