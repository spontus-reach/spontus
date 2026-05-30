"use client";

import { useState } from "react";
import { TeamSignupForm } from "@/components/team/team-signup-form";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase";

export default function TeamSignupPage() {
  const router = useRouter();
  const [authError, setAuthError] = useState("");

  async function handleSubmit(data: {
    fullName: string;
    email: string;
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
        password: crypto.randomUUID(),
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
    }

    router.push("/team/onboarding");
  }

  return (
    <>
      <TeamSignupForm onSubmit={handleSubmit} />
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
