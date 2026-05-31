"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut } from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();

  function close() {
    setOpen(false);
  }

  async function handleSignOut() {
    await signOut();
    close();
    router.push("/");
    router.refresh();
  }

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-md p-2 transition-colors hover:bg-[#e8e6e0]"
        aria-label="Open navigation menu"
      >
        <Menu className="h-5 w-5" style={{ color: "#1a1a18" }} />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
            onClick={close}
          />
          <div
            className="fixed inset-y-0 right-0 z-50 w-72 overflow-y-auto bg-[#f0efeb] p-6 shadow-xl"
            style={{ borderLeft: "0.5px solid #d5d3cd" }}
          >
            <div className="flex items-center justify-between">
              <span
                className="text-sm font-medium"
                style={{ color: "#1a1a18" }}
              >
                Menu
              </span>
              <button
                onClick={close}
                className="rounded-md p-1.5 transition-colors hover:bg-[#e8e6e0]"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" style={{ color: "#1a1a18" }} />
              </button>
            </div>

            <nav className="mt-8 flex flex-col gap-1">
              <NavLink
                href="/signup/team"
                active={
                  pathname === "/signup/team" ||
                  pathname === "/team/onboarding"
                }
                onClick={close}
              >
                For Teams
              </NavLink>
              <NavLink
                href="/signup/sponsor"
                active={
                  pathname.startsWith("/sponsor") ||
                  pathname === "/signup/sponsor"
                }
                onClick={close}
              >
                For Sponsors
              </NavLink>
              <NavLink
                href="/team/listings"
                active={pathname.startsWith("/team/listings")}
                onClick={close}
              >
                Browse Listings
              </NavLink>
              {user && (
                <>
                  <NavLink
                    href="/team/applications"
                    active={pathname === "/team/applications"}
                    onClick={close}
                  >
                    My Applications
                  </NavLink>
                  <NavLink
                    href="/admin/verification"
                    active={pathname.startsWith("/admin")}
                    onClick={close}
                  >
                    Admin
                  </NavLink>
                </>
              )}
            </nav>

            <div
              className="mt-8 border-t pt-6"
              style={{ borderColor: "#d5d3cd" }}
            >
              {user ? (
                <div className="space-y-3">
                  <p
                    className="truncate text-sm"
                    style={{ color: "#6b6960" }}
                  >
                    {user.email}
                  </p>
                  <button
                    onClick={handleSignOut}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors hover:bg-[#e8e6e0]"
                    style={{ color: "#6b6960" }}
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link
                    href="/login"
                    onClick={close}
                    className="inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium transition-colors hover:bg-[#e8e6e0]"
                    style={{ color: "#1a1a18", border: "0.5px solid #d5d3cd" }}
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/signup/team"
                    onClick={close}
                    className="inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
                    style={{
                      background: "#1a3a6e",
                      color: "#f0efeb",
                    }}
                  >
                    Get started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function NavLink({
  href,
  active,
  onClick,
  children,
}: {
  href: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="rounded-md px-3 py-2.5 text-sm font-medium transition-colors"
      style={{
        color: active ? "#1a1a18" : "#6b6960",
        background: active ? "#e8e6e0" : "transparent",
      }}
    >
      {children}
    </Link>
  );
}
