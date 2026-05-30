"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase";

type Tab = "password" | "magic-link";

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  if (!isSupabaseConfigured()) {
    return (
      <div className="mx-auto max-w-md px-6 py-20 text-center">
        <h1
          className="text-2xl font-semibold"
          style={{ color: "#1a1a18" }}
        >
          Sign in
        </h1>
        <p className="mt-4 text-sm" style={{ color: "#6b6960" }}>
          Authentication is not configured yet. Set Supabase environment
          variables to enable sign in.
        </p>
      </div>
    );
  }

  async function handlePasswordLogin(e: React.FormEvent) {
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

    router.push("/");
    router.refresh();
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    setMagicLinkSent(true);
    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-md px-6 py-20">
      <h1
        className="text-center text-2xl font-semibold"
        style={{ color: "#1a1a18" }}
      >
        Sign in to Spontus
      </h1>
      <p
        className="mt-2 text-center text-sm"
        style={{ color: "#6b6960" }}
      >
        Welcome back. Sign in to manage your team or sponsorships.
      </p>

      <Card
        className="mt-8 p-6"
        style={{ border: "0.5px solid #d5d3cd", background: "white" }}
      >
        <div className="flex gap-1 rounded-lg p-1" style={{ background: "#f5f4f0" }}>
          <button
            type="button"
            onClick={() => setTab("password")}
            className="flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
            style={{
              background: tab === "password" ? "white" : "transparent",
              color: tab === "password" ? "#1a1a18" : "#6b6960",
              boxShadow: tab === "password" ? "0 1px 2px rgba(0,0,0,0.05)" : "none",
            }}
          >
            Password
          </button>
          <button
            type="button"
            onClick={() => setTab("magic-link")}
            className="flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
            style={{
              background: tab === "magic-link" ? "white" : "transparent",
              color: tab === "magic-link" ? "#1a1a18" : "#6b6960",
              boxShadow: tab === "magic-link" ? "0 1px 2px rgba(0,0,0,0.05)" : "none",
            }}
          >
            Magic link
          </button>
        </div>

        {magicLinkSent ? (
          <div className="mt-6 text-center">
            <p className="text-sm font-medium" style={{ color: "#1a1a18" }}>
              Check your email
            </p>
            <p className="mt-2 text-sm" style={{ color: "#6b6960" }}>
              We sent a sign-in link to <strong>{email}</strong>
            </p>
            <button
              type="button"
              onClick={() => setMagicLinkSent(false)}
              className="mt-4 text-sm underline"
              style={{ color: "#1a3a6e" }}
            >
              Try a different email
            </button>
          </div>
        ) : tab === "password" ? (
          <form onSubmit={handlePasswordLogin} className="mt-6 space-y-4">
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
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleMagicLink} className="mt-6 space-y-4">
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
              {loading ? "Sending link..." : "Send magic link"}
            </Button>
          </form>
        )}
      </Card>

      <p className="mt-6 text-center text-sm" style={{ color: "#6b6960" }}>
        Don&apos;t have an account?{" "}
        <Link href="/signup/team" className="underline" style={{ color: "#1a3a6e" }}>
          Sign up
        </Link>
      </p>
    </div>
  );
}
