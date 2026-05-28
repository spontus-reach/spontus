"use client";

import { SponsorSignupForm } from "@/components/sponsor/sponsor-signup-form";
import { useRouter } from "next/navigation";

export default function SponsorSignupPage() {
  const router = useRouter();

  function handleSubmit(data: {
    companyName: string;
    contactName: string;
    role: string;
    email: string;
    websiteUrl: string;
    industryCategory: string;
  }) {
    // Store signup data in sessionStorage for onboarding page
    sessionStorage.setItem('sponsorSignupData', JSON.stringify(data));
    router.push("/sponsor/onboarding");
  }

  return <SponsorSignupForm onSubmit={handleSubmit} />;
}
