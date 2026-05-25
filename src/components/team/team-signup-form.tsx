"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { TEAM_MEMBER_ROLES } from "@/lib/constants";
import type { TeamMemberRole } from "@/lib/types";

export function TeamSignupForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [university, setUniversity] = useState("");
  const [teamName, setTeamName] = useState("");
  const [sport, setSport] = useState("");
  const [role, setRole] = useState<TeamMemberRole | "">("");
  const [emailError, setEmailError] = useState("");

  function validateEmail(value: string) {
    if (!value) {
      setEmailError("");
      return;
    }
    if (!value.endsWith(".edu")) {
      setEmailError("Must be a .edu email address");
    } else {
      setEmailError("");
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.endsWith(".edu")) {
      setEmailError("Must be a .edu email address");
      return;
    }
    router.push("/team/onboarding");
  }

  const isValid =
    fullName && email.endsWith(".edu") && university && teamName && sport && role;

  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">
        Create your team profile
      </h1>
      <p className="mt-2 text-muted-foreground">
        Takes under 30 seconds. You can edit everything later.
      </p>

      <Card className="mt-8 border-border bg-card p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <Field label="Full name">
            <Input
              placeholder="Maya Hernandez"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </Field>

          <Field label=".edu email">
            <Input
              type="email"
              placeholder="you@calpoly.edu"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) validateEmail(e.target.value);
              }}
              onBlur={(e) => validateEmail(e.target.value)}
              className={emailError ? "border-destructive" : ""}
            />
            {emailError && (
              <p className="mt-1 text-xs text-destructive">{emailError}</p>
            )}
          </Field>

          <Field label="University">
            <Input
              placeholder="Cal Poly San Luis Obispo"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
            />
          </Field>

          <Field label="Club sport team name">
            <Input
              placeholder="Cal Poly Triathlon"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </Field>

          <Field label="Sport">
            <Input
              placeholder="e.g. Triathlon, Soccer, Rugby"
              value={sport}
              onChange={(e) => setSport(e.target.value)}
            />
          </Field>

          <Field label="Role on team">
            <Select
              value={role}
              onValueChange={(v) => setRole(v as TeamMemberRole)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                {TEAM_MEMBER_ROLES.map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <CheckCircle2 className="h-3.5 w-3.5 text-spontus-green" />
            Your profile belongs to the team &mdash; it survives graduation.
          </p>

          <Button
            type="submit"
            disabled={!isValid}
            className="w-full disabled:opacity-40"
            size="lg"
            style={{ background: "#22c55e", color: "#0a0a0a" }}
          >
            Create team profile
          </Button>
        </form>
      </Card>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label className="mb-1.5 block text-sm">{label}</Label>
      {children}
    </div>
  );
}
