import { LoginSignInForm } from "./login-signin-form";
import { LoginSignupChoice } from "./login-signup-choice";

export const dynamic = "force-dynamic";

type LoginPageProps = {
  searchParams: Promise<{ mode?: string; redirect?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const mode = params.mode === "signup" ? "signup" : "signin";
  const redirect = params.redirect ?? null;

  if (mode === "signup") {
    return <LoginSignupChoice redirect={redirect} />;
  }

  return <LoginSignInForm redirect={redirect} />;
}
