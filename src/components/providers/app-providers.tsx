"use client";

import { AuthProvider } from "./auth-provider";
import { IdentityProvider } from "./identity-provider";
import { VerificationProvider } from "./verification-provider";
import { ApplicationsProvider } from "./applications-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <IdentityProvider>
        <VerificationProvider>
          <ApplicationsProvider>{children}</ApplicationsProvider>
        </VerificationProvider>
      </IdentityProvider>
    </AuthProvider>
  );
}
