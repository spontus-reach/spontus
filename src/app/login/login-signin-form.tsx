"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase";

type LoginSignInFormProps = {
  redirect?: string | null;
  initialError?: string | null;
};

export function LoginSignInForm({ redirect, initialError }: LoginSignInFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(initialError ?? "");
  const [resetSent, setResetSent] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  if (!isSupabaseConfigured()) {
    return (
      <div className="mx-auto max-w-md px-6 py-20 text-center">
        <h1 className="text-2xl font-semibold" style={{ color: "#1a1a18" }}>
          Sign in
        </h1>
        <p className="mt-4 text-sm" style={{ color: "#6b6960" }}>
          Authentication is not configured yet. Set Supabase environment variables to
          enable sign in.
        </p>
      </div>
    );
  }

  const afterAuthPath = () => {
    if (redirect && redirect.startsWith("/")) return redirect;
    return "/browse";
  };

  const signupLink =
    redirect && redirect.startsWith("/")
      ? `/login?mode=signup&redirect=${encodeURIComponent(redirect)}`
      : "/login?mode=signup";

  async function handlePasswordLogin(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResetSent(false);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push(afterAuthPath());
    router.refresh();
  }

  async function handleForgotPassword() {
    const trimmed = email.trim();
    if (!trimmed) {
      setError("Enter your email above, then click forgot password.");
      return;
    }

    setResetLoading(true);
    setError("");
    setResetSent(false);

    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      trimmed,
      {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent("/auth/update-password")}`,
      }
    );

    setResetLoading(false);
    if (resetError) {
      setError(resetError.message);
      return;
    }
    setResetSent(true);
  }

  return (
    <div className="mx-auto max-w-md px-6 py-20">
      <h1
        className="text-center text-2xl font-semibold"
        style={{ color: "#1a1a18" }}
      >
        Sign in to Spontus
      </h1>
      <p className="mt-2 text-center text-sm" style={{ color: "#6b6960" }}>
        {redirect === "/browse"
          ? "Sign in to browse listings and apply or post sponsorship opportunities."
          : "Welcome back. Sign in to manage your team or sponsorships."}
      </p>

      <Card
        className="mt-8 p-6"
        style={{ border: "0.5px solid #d5d3cd", background: "white" }}
      >
        <form onSubmit={handlePasswordLogin} className="space-y-4">
          <div>
            <label className="text-sm font-medium" style={{ color: "#1a1a18" }}>
              Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="mt-1"
            />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium" style={{ color: "#1a1a18" }}>
                Password
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={resetLoading}
                className="text-xs underline"
                style={{ color: "#1a3a6e" }}
              >
                {resetLoading ? "Sending…" : "Forgot password?"}
              </button>
            </div>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              required
              className="mt-1"
            />
          </div>
          {error && (
            <p className="text-sm" style={{ color: "#dc2626" }}>
              {error}
            </p>
          )}
          {resetSent && (
            <p className="text-sm" style={{ color: "#0F6E56" }}>
              Password reset email sent. Check your inbox.
            </p>
          )}
          <Button
            type="submit"
            disabled={loading}
            className="w-full"
            style={{ background: "#1a3a6e", color: "#f0efeb" }}
          >
            {loading ? "…" : "Sign in"}
          </Button>
        </form>
      </Card>

      <p className="mt-6 text-center text-sm" style={{ color: "#6b6960" }}>
        New here?{" "}
        <Link href={signupLink} className="underline" style={{ color: "#1a3a6e" }}>
          Create an account
        </Link>
      </p>
    </div>
  );
}
