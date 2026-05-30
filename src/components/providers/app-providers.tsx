"use client";

import { AuthProvider } from "./auth-provider";
import { VerificationProvider } from "./verification-provider";
import { ApplicationsProvider } from "./applications-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <VerificationProvider>
        <ApplicationsProvider>{children}</ApplicationsProvider>
      </VerificationProvider>
    </AuthProvider>
  );
}
