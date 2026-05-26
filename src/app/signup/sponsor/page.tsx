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
    // Navigate to onboarding with signup data as state
    router.push({
      pathname: "/sponsor/onboarding",
      state: { signupData: data }
    });
  }

  return <SponsorSignupForm onSubmit={handleSubmit} />;
}
