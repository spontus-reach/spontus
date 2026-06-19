import { LoginSignInForm } from "./login-signin-form";
import { LoginSignupChoice } from "./login-signup-choice";

export const dynamic = "force-dynamic";

type LoginPageProps = {
  searchParams: Promise<{ mode?: string; redirect?: string; error?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const mode = params.mode === "signup" ? "signup" : "signin";
  const redirect = params.redirect ?? null;
  const authError =
    params.error === "auth_callback_failed"
      ? "Email confirmation failed or the link expired. Try signing in or request a new confirmation email."
      : params.error === "auth_not_configured"
        ? "Authentication is not configured on this environment."
        : null;

  if (mode === "signup") {
    return <LoginSignupChoice redirect={redirect} />;
  }

  return <LoginSignInForm redirect={redirect} initialError={authError} />;
}
