"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isSupabaseConfigured()) {
    return (
      <div className="mx-auto max-w-md px-6 py-20 text-center">
        <p className="text-sm" style={{ color: "#6b6960" }}>
          Authentication is not configured.
        </p>
      </div>
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });

    setLoading(false);
    if (updateError) {
      setError(updateError.message);
      return;
    }

    router.push("/browse");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-md px-6 py-20">
      <h1
        className="text-center text-2xl font-semibold"
        style={{ color: "#1a1a18" }}
      >
        Set a new password
      </h1>
      <p className="mt-2 text-center text-sm" style={{ color: "#6b6960" }}>
        Choose a password you&apos;ll use to sign in going forward.
      </p>

      <Card
        className="mt-8 p-6"
        style={{ border: "0.5px solid #d5d3cd", background: "white" }}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium" style={{ color: "#1a1a18" }}>
              New password
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              required
              className="mt-1"
              autoComplete="new-password"
            />
          </div>
          <div>
            <label className="text-sm font-medium" style={{ color: "#1a1a18" }}>
              Confirm password
            </label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repeat password"
              required
              className="mt-1"
              autoComplete="new-password"
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
            {loading ? "Saving…" : "Save password"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
