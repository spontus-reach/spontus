"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { SpontusLogo } from "@/components/brand/spontus-logo";
import { useAuth } from "@/components/providers/auth-provider";
import { useIsAdmin } from "@/hooks/use-is-admin";
import { MobileNav } from "./mobile-nav";

function AuthNav() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.push("/");
    router.refresh();
  }

  if (loading) {
    return (
      <span className="text-sm" style={{ color: "#6b6960", opacity: 0.5 }}>
        ...
      </span>
    );
  }

  if (user) {
    return (
      <>
        <span className="hidden text-sm sm:inline" style={{ color: "#6b6960" }}>
          {user.email}
        </span>
        <button
          onClick={handleSignOut}
          className="inline-flex items-center gap-1 text-sm transition-opacity hover:opacity-70"
          style={{ color: "#6b6960" }}
        >
          <LogOut className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Sign out</span>
        </button>
      </>
    );
  }

  return (
    <>
      <Link
        href="/login?mode=signin"
        className="text-sm transition-colors hover:text-[#1a1a18]"
        style={{ color: "#6b6960" }}
      >
        Sign in
      </Link>
      <Link
        href="/login?mode=signup"
        className="inline-flex items-center justify-center px-4 transition-opacity hover:opacity-90"
        style={{
          height: 36,
          borderRadius: 8,
          background: "#1a3a6e",
          color: "#f0efeb",
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        Get started
      </Link>
    </>
  );
}

export function TopNav() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { isAdmin } = useIsAdmin();
  const isTeamRoute =
    pathname === "/for-teams" ||
    pathname.startsWith("/team") ||
    pathname === "/signup/team";
  const isSponsorRoute =
    pathname === "/for-brands" ||
    pathname.startsWith("/sponsor") ||
    pathname === "/signup/sponsor";
  const isLoggedIn = !!user;

  return (
    <header
      className="sticky top-0 z-40 bg-[#f0efeb]/80 backdrop-blur-md"
      style={{ borderBottom: "0.5px solid #d5d3cd" }}
    >
      <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between px-6">
        <SpontusLogo variant="lockup" height={30} />

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/for-teams"
            className={`text-sm transition-colors ${
              isTeamRoute ? "text-[#1a1a18]" : "text-[#6b6960] hover:text-[#1a1a18]"
            }`}
          >
            For Teams
          </Link>
          <Link
            href="/for-brands"
            className={`text-sm transition-colors ${
              isSponsorRoute
                ? "text-[#1a1a18]"
                : "text-[#6b6960] hover:text-[#1a1a18]"
            }`}
          >
            For Sponsors
          </Link>
          <Link
            href="/browse"
            className={`text-sm transition-colors ${
              pathname === "/browse" || pathname.startsWith("/team/listings")
                ? "text-[#1a1a18]"
                : "text-[#6b6960] hover:text-[#1a1a18]"
            }`}
          >
            Browse Listings
          </Link>
          {isLoggedIn && isTeamRoute && (
            <Link
              href="/team/applications"
              className={`text-sm transition-colors ${
                pathname === "/team/applications"
                  ? "text-[#1a1a18]"
                  : "text-[#6b6960] hover:text-[#1a1a18]"
              }`}
            >
              My Applications
            </Link>
          )}
          {isAdmin && (
            <Link
              href="/admin/verification"
              className={`text-sm transition-colors ${
                pathname.startsWith("/admin")
                  ? "text-[#1a1a18]"
                  : "text-[#6b6960] hover:text-[#1a1a18]"
              }`}
            >
              Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
          <AuthNav />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
