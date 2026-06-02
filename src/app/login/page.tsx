"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const modeParam = searchParams.get("mode");
  const redirectParam = searchParams.get("redirect");
  const mode = modeParam === "signup" ? "signup" : "signin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    if (redirectParam && redirectParam.startsWith("/")) return redirectParam;
    return "/browse";
  };

  async function handlePasswordLogin(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

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

  return (
    <div className="mx-auto max-w-md px-6 py-20">
      <h1
        className="text-center text-2xl font-semibold"
        style={{ color: "#1a1a18" }}
      >
        {mode === "signup" ? "Create your account" : "Sign in to Spontus"}
      </h1>
      <p className="mt-2 text-center text-sm" style={{ color: "#6b6960" }}>
        {redirectParam === "/browse"
          ? "Sign in to browse listings and apply or post sponsorship opportunities."
          : mode === "signup"
            ? "Use your .edu email for teams or work email for sponsors."
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
            <label className="text-sm font-medium" style={{ color: "#1a1a18" }}>
              Password
            </label>
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
          <Button
            type="submit"
            disabled={loading}
            className="w-full"
            style={{ background: "#1a3a6e", color: "#f0efeb" }}
          >
            {loading ? "…" : mode === "signup" ? "Sign in" : "Sign in"}
          </Button>
        </form>
      </Card>

      <p className="mt-6 text-center text-sm" style={{ color: "#6b6960" }}>
        {mode === "signup" ? (
          <>
            Register as a team or sponsor:{" "}
            <Link href="/signup/team" className="underline" style={{ color: "#1a3a6e" }}>
              Team signup
            </Link>
            {" · "}
            <Link
              href="/signup/sponsor"
              className="underline"
              style={{ color: "#1a3a6e" }}
            >
              Sponsor signup
            </Link>
          </>
        ) : (
          <>
            New here?{" "}
            <Link
              href="/login?mode=signup"
              className="underline"
              style={{ color: "#1a3a6e" }}
            >
              Create an account
            </Link>
          </>
        )}
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-md px-6 py-20 text-center text-sm text-[#6b6960]">
          Loading…
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
