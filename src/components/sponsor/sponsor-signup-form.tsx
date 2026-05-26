"use client";

import { useState } from "react";
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
import {
  SPONSOR_INDUSTRY_CATEGORIES,
  SPONSOR_MEMBER_ROLES,
} from "@/lib/constants";
import type { SponsorMemberRole } from "@/lib/types";

interface SponsorSignupFormProps {
  onSubmit?: (data: {
    companyName: string;
    contactName: string;
    role: string;
    email: string;
    websiteUrl: string;
    industryCategory: string;
  }) => void;
}

export function SponsorSignupForm({ onSubmit }: SponsorSignupFormProps = {}) {
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [role, setRole] = useState<SponsorMemberRole | "">("");
  const [email, setEmail] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [industryCategory, setIndustryCategory] = useState("");
  const [emailError, setEmailError] = useState("");

  
  // Enhanced email validation with more specific error messages
  export function getWorkEmailValidationError(value: string): string {
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

    // Check if it's a .edu email (not allowed for sponsors)
    if (domainPart.endsWith(".edu")) {
      return "Work email cannot be a .edu address";
    }

    // Domain should have at least one dot and valid parts
    if (!domainPart.includes(".")) {
      return "Please enter a valid email address with domain";
    }

    const domainParts = domainPart.split(".");
    if (domainParts.length < 2 ||
        domainParts.some(part => part.length === 0)) {
      return "Please enter a valid email address";
    }

    return "";
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Validate email before proceeding
    if (email) {
      const error = getWorkEmailValidationError(email);
      setEmailError(error);
    }
    if (!emailError) {
      // Call the onSubmit handler if provided
      if (onSubmit) {
        onSubmit({
          companyName,
          contactName,
          role,
          email,
          websiteUrl,
          industryCategory
        });
      }
    }
  }

  const isValid =
    companyName && contactName && role && email && websiteUrl && industryCategory;

  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <h1
        style={{
          fontSize: 32,
          fontWeight: 600,
          letterSpacing: "-0.01em",
          color: "#1a1a18",
        }}
      >
        Create your sponsor profile
      </h1>
      <p className="mt-2" style={{ color: "#6b6960" }}>
        Tell teams who you are. You&apos;ll post your first listing next.
      </p>

      <Card
        className="mt-8 p-6"
        style={{ border: "0.5px solid #d5d3cd", background: "white" }}
      >
        <form onSubmit={handleFormSubmit} className="space-y-5">
          <Field label="Company name">
            <Input
              placeholder="Fluid Nutrition"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </Field>

          <Field label="Your name">
            <Input
              placeholder="Jordan Park"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
            />
          </Field>

          <Field label="Role">
            <Select
              value={role}
              onValueChange={(v) => setRole(v as SponsorMemberRole)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                {SPONSOR_MEMBER_ROLES.map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="Work email">
            <Input
              type="email"
              placeholder="jordan@fluidnutrition.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) {
                  const error = getWorkEmailValidationError(e.target.value);
                  setEmailError(error);
                }
              }}
              onBlur={(e) => {
                const error = getWorkEmailValidationError(e.target.value);
                setEmailError(error);
              }}
              className={emailError ? "border-destructive" : ""}
            />
            {emailError && (
              <p className="mt-1 text-xs text-destructive">{emailError}</p>
            )}
          </Field>

          <Field label="Company website">
            <Input
              placeholder="https://fluidnutrition.com"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
            />
          </Field>

          <Field label="Industry category">
            <Select
              value={industryCategory}
              onValueChange={(v) => setIndustryCategory(v ?? "")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {SPONSOR_INDUSTRY_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={!isValid}
              className="w-full disabled:opacity-40"
              size="lg"
              style={{ background: "#22c55e", color: "#0a0a0a" }}
            >
              Create sponsor profile
            </Button>
          </div>
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
