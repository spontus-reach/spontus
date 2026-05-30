import { MOCK_SEED_APPLICATIONS } from "./mock-data.ts";
import type { Application, DeclineReason } from "./types.ts";

export function getSeedApplications(): Application[] {
  return MOCK_SEED_APPLICATIONS.map((app) => ({ ...app }));
}

export function createMockApplication(
  applications: Application[],
  listingId: string,
  teamId: string,
  fitNote?: string
): Application | null {
  const exists = applications.some(
    (a) => a.teamId === teamId && a.listingId === listingId
  );
  if (exists) return null;

  return {
    id: `app-${crypto.randomUUID()}`,
    listingId,
    teamId,
    status: "submitted",
    fitNote,
    submittedAt: new Date().toISOString().split("T")[0],
  };
}

export function acceptMockApplication(
  applications: Application[],
  applicationId: string
): Application[] {
  const reviewedAt = new Date().toISOString().split("T")[0];
  return applications.map((app) =>
    app.id === applicationId
      ? { ...app, status: "accepted", reviewedAt }
      : app
  );
}

export function declineMockApplication(
  applications: Application[],
  applicationId: string,
  reason: DeclineReason
): Application[] {
  const reviewedAt = new Date().toISOString().split("T")[0];
  return applications.map((app) =>
    app.id === applicationId
      ? { ...app, status: "declined", declineReason: reason, reviewedAt }
      : app
  );
}
