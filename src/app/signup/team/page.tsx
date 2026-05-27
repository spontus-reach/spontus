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
    // Navigate to onboarding with signup data as state
    // @ts-expect-error Next.js router state typing
    router.push({
      pathname: "/team/onboarding",
      state: { signupData: data }
    });
  }

  return <TeamSignupForm onSubmit={handleSubmit} />;
}
