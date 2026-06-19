import { NextResponse } from "next/server";
import { isPlatformAdminEmail } from "@/lib/admin-access";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return NextResponse.json({
    allowed: isPlatformAdminEmail(user?.email),
  });
}
