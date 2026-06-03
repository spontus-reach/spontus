"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./auth-provider";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase";
import { ACTIVE_TEAM_ID } from "@/lib/mock-data";
import { ACTIVE_SPONSOR_ID } from "@/lib/constants";

interface IdentityContextValue {
  activeTeamId: string | null;
  activeSponsorId: string | null;
  primarySide: "team" | "sponsor" | "internal" | null;
  loading: boolean;
}

const IdentityContext = createContext<IdentityContextValue>({
  activeTeamId: ACTIVE_TEAM_ID,
  activeSponsorId: ACTIVE_SPONSOR_ID,
  primarySide: null,
  loading: false,
});

export function IdentityProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const shouldResolve = !!user && isSupabaseConfigured();

  const [activeTeamId, setActiveTeamId] = useState<string | null>(
    ACTIVE_TEAM_ID
  );
  const [activeSponsorId, setActiveSponsorId] = useState<string | null>(
    ACTIVE_SPONSOR_ID
  );
  const [primarySide, setPrimarySide] = useState<
    "team" | "sponsor" | "internal" | null
  >(null);
  const [loading, setLoading] = useState(shouldResolve);

  useEffect(() => {
    if (!shouldResolve || !user) return;

    let cancelled = false;
    const side = (user.user_metadata?.primary_side as string) ?? null;

    const parsedSide =
      side === "team" || side === "sponsor" || side === "internal"
        ? side
        : null;

    async function resolveIdentity() {
      setPrimarySide(parsedSide);
      const supabase = createClient();

      try {
        if (side === "team" || !side) {
          const { data: teamMembership } = await supabase
            .from("team_memberships")
            .select("team_id")
            .eq("profile_id", user!.id)
            .eq("status", "active")
            .limit(1)
            .single();

          if (!cancelled && teamMembership) {
            setActiveTeamId(teamMembership.team_id);
          }
        }

        if (side === "sponsor" || !side) {
          const { data: sponsorMembership } = await supabase
            .from("sponsor_memberships")
            .select("sponsor_id")
            .eq("profile_id", user!.id)
            .eq("status", "active")
            .limit(1)
            .single();

          if (!cancelled && sponsorMembership) {
            setActiveSponsorId(sponsorMembership.sponsor_id);
          }
        }
      } catch {
        // Fallback to demo IDs if queries fail (tables may not exist yet)
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    resolveIdentity();
    return () => { cancelled = true; };
  }, [shouldResolve, user]);

  return (
    <IdentityContext.Provider
      value={{ activeTeamId, activeSponsorId, primarySide, loading }}
    >
      {children}
    </IdentityContext.Provider>
  );
}

export function useIdentity() {
  return useContext(IdentityContext);
}
