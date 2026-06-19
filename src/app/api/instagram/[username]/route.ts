import { NextResponse, type NextRequest } from "next/server";
import { getInstagramFollowers } from "@/lib/instagram";

// GET /api/instagram/<username>?fallback=<number>
// Returns the (live, if configured) Instagram follower count for a handle,
// falling back to the provided seed value when live data is unavailable.
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
  const fallbackParam = request.nextUrl.searchParams.get("fallback");
  const fallback =
    fallbackParam !== null && Number.isFinite(Number(fallbackParam))
      ? Number(fallbackParam)
      : undefined;

  const stats = await getInstagramFollowers(username, fallback);

  return NextResponse.json(stats, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
