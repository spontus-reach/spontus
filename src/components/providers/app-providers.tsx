"use client";

import { VerificationProvider } from "./verification-provider";
import { ApplicationsProvider } from "./applications-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <VerificationProvider>
      <ApplicationsProvider>{children}</ApplicationsProvider>
    </VerificationProvider>
  );
}
