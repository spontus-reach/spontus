"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Field } from "@/components/forms/form-field";
import { TEAM_MEMBER_ROLES } from "@/lib/constants";
import type { TeamMemberRole } from "@/lib/types";

interface TeamSignupFormProps {
  onSubmit?: (data: {
    fullName: string;
    email: string;
    university: string;
    teamName: string;
    sport: string;
    role: string;
  }) => void;
}

// Enhanced email validation with more specific error messages
export function getEmailValidationError(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) {
    return "Email is required";
  }

  if (!trimmed.includes("@")) {
    return "Please enter a valid email address";
  }

  const [localPart, domainPart] = trimmed.split("@");
  if (!localPart || !domainPart) {
    return "Please enter a valid email address";
  }

  if (!domainPart.endsWith(".edu")) {
    return "Must be a .edu email address";
  }

  // Check if it's a reasonable .edu domain (at least domain.tld.edu format)
  const domainParts = domainPart.split(".");
  if (domainParts.length < 2 || domainParts[domainParts.length - 2].length === 0) {
    return "Please enter a valid .edu email address";
  }

  return "";
}

export function TeamSignupForm({ onSubmit }: TeamSignupFormProps = {}) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [university, setUniversity] = useState("");
  const [teamName, setTeamName] = useState("");
  const [sport, setSport] = useState("");
  const [role, setRole] = useState<TeamMemberRole | "">("");
  const [emailError, setEmailError] = useState("");

  function isEduEmail(value: string) {
    const normalized = value.trim().toLowerCase();
    // Basic .edu domain validation
    return normalized.endsWith(".edu") &&
           normalized.length > 5 &&  // At least "a@b.edu"
           normalized.includes("@") &&
           normalized.lastIndexOf(".edu") === normalized.length - 4;
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Validate email before proceeding
    if (email) {
      const error = getEmailValidationError(email);
      setEmailError(error);
    }
    // Check if there's no error after setting it (using the computed error variable)
    if (email && !getEmailValidationError(email)) {
      // Call the onSubmit handler if provided
      if (onSubmit) {
        onSubmit({
          fullName,
          email,
          university,
          teamName,
          sport,
          role
        });
      }
    }
  }

  const isValid = Boolean(
    fullName.trim() &&
      isEduEmail(email) &&
      university.trim() &&
      teamName.trim() &&
      sport.trim() &&
      role
  );

  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">
        Create your team profile
      </h1>
      <p className="mt-2 text-muted-foreground">
        Takes under 30 seconds. You can edit everything later.
      </p>

      <Card className="mt-8 border-border bg-card p-6">
        <form onSubmit={handleFormSubmit} className="space-y-5">
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
                if (emailError) {
                  const error = getEmailValidationError(e.target.value);
                  setEmailError(error);
                }
              }}
              onBlur={(e) => {
                const error = getEmailValidationError(e.target.value);
                setEmailError(error);
              }}
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
