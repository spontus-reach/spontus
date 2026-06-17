"use client";

import { useState } from "react";
import { SponsorSignupForm } from "@/components/sponsor/sponsor-signup-form";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase";

export default function SponsorSignupPage() {
  const router = useRouter();
  const [authError, setAuthError] = useState("");
  const [authNotice, setAuthNotice] = useState("");

  async function handleSubmit(data: {
    companyName: string;
    contactName: string;
    role: string;
    email: string;
    password: string;
    websiteUrl: string;
    industryCategory: string;
  }) {
    sessionStorage.setItem("sponsorSignupData", JSON.stringify(data));

    if (isSupabaseConfigured()) {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
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

      setAuthError("");
      setAuthNotice(
        "Check your email to confirm your account. After confirming, sign in with the password you chose."
      );
      return;
    }

    router.push("/sponsor/onboarding");
  }

  return (
    <>
      <SponsorSignupForm onSubmit={handleSubmit} />
      {authNotice && (
        <p
          className="mx-auto mt-4 max-w-md text-center text-sm"
          style={{ color: "#0F6E56" }}
        >
          {authNotice}
        </p>
      )}
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
