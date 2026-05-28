"use client";

import { TeamSignupForm } from "@/components/team/team-signup-form";
import { useRouter } from "next/navigation";

export default function TeamSignupPage() {
  const router = useRouter();

  function handleSubmit(data: {
    fullName: string;
    email: string;
    university: string;
    teamName: string;
    sport: string;
    role: string;
  }) {
    // Store signup data in sessionStorage for onboarding page
    sessionStorage.setItem('teamSignupData', JSON.stringify(data));
    router.push("/team/onboarding");
  }

  return <TeamSignupForm onSubmit={handleSubmit} />;
}
