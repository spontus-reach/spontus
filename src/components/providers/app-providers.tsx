"use client";

import { ApplicationsProvider } from "./applications-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <ApplicationsProvider>{children}</ApplicationsProvider>;
}
