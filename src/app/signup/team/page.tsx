"use client";

import { useState } from "react";
import { TeamSignupForm } from "@/components/team/team-signup-form";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase";

export default function TeamSignupPage() {
  const router = useRouter();
  const [authError, setAuthError] = useState("");
  const [authNotice, setAuthNotice] = useState("");

  async function handleSubmit(data: {
    fullName: string;
    email: string;
    password: string;
    university: string;
    teamName: string;
    sport: string;
    role: string;
  }) {
    sessionStorage.setItem("teamSignupData", JSON.stringify(data));

    if (isSupabaseConfigured()) {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            primary_side: "team",
          },
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/team/onboarding`,
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

    router.push("/team/onboarding");
  }

  return (
    <>
      <TeamSignupForm onSubmit={handleSubmit} />
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
