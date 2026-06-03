"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SponsorSignupForm } from "@/components/sponsor/sponsor-signup-form";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase";

export default function SponsorSignupPage() {
  const router = useRouter();
  const [authError, setAuthError] = useState("");

  async function handleSubmit(data: {
    companyName: string;
    contactName: string;
    role: string;
    email: string;
    websiteUrl: string;
    industryCategory: string;
  }) {
    sessionStorage.setItem("sponsorSignupData", JSON.stringify(data));

    if (isSupabaseConfigured()) {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: crypto.randomUUID(),
        options: {
          data: {
            full_name: data.contactName,
            primary_side: "sponsor",
          },
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/sponsor/onboarding`,
        },
      });

      if (error) {
        setAuthError(error.message);
        return;
      }
    }

    router.push("/sponsor/onboarding");
  }

  return (
    <>
      <SponsorSignupForm onSubmit={handleSubmit} />
      {authError && (
        <p
          className="mx-auto mt-4 max-w-md text-center text-sm"
          style={{ color: "#dc2626" }}
        >
          {authError}
        </p>
      )}
    </>
  );
}
