"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/providers/auth-provider";

export function useIsAdmin() {
  const { user, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    let cancelled = false;

    const resolveAccess = async () => {
      if (!user) {
        if (!cancelled) {
          setIsAdmin(false);
          setLoading(false);
        }
        return;
      }

      try {
        const res = await fetch("/api/admin/access");
        const data: { allowed?: boolean } = await res.json();
        if (!cancelled) {
          setIsAdmin(Boolean(data.allowed));
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setIsAdmin(false);
          setLoading(false);
        }
      }
    };

    void resolveAccess();

    return () => {
      cancelled = true;
    };
  }, [user, authLoading]);

  return { isAdmin, loading: authLoading || loading };
}
