import { redirect } from "next/navigation";
import { isPlatformAdminEmail } from "@/lib/admin-access";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?mode=signin&redirect=/admin/verification");
  }

  if (!isPlatformAdminEmail(user.email)) {
    redirect("/");
  }

  return children;
}
