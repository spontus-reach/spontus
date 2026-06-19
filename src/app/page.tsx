"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Hero } from "@/components/landing/hero";
import { TeamPreviewCard } from "@/components/landing/team-preview-card";
import { HowItWorks } from "@/components/landing/how-it-works";
import { MOCK_TEAMS } from "@/lib/mock-data";

const ease = [0.22, 1, 0.36, 1] as const;

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 8 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" as const },
    transition: { duration: 0.4, ease, delay },
  };
}

export default function LandingPage() {
  const triTeam = MOCK_TEAMS.find((t) => t.slug === "cal-poly-triathlon");

  return (
    <div style={{ background: "#f0efeb", color: "#1a1a18" }}>
      <Hero />

      {/* Featured editorial block */}
      {triTeam && (
        <section
          className="mx-auto max-w-[1120px] px-6"
          style={{ paddingBottom: 88 }}
        >
          <motion.div {...fadeUp(0)} className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <div
                style={{
                  borderRadius: 12,
                  aspectRatio: "4 / 5",
                  position: "relative",
                  overflow: "hidden",
                  background: "#ffffff",
                  border: "0.5px solid #d5d3cd",
                }}
              >
                {triTeam.photo && (
                  <Image
                    src={triTeam.photo}
                    alt={`${triTeam.name} logo`}
                    fill
                    sizes="(min-width: 768px) 420px, calc(100vw - 48px)"
                    className="object-contain p-16"
                  />
                )}
                <div
                  className="absolute top-6 left-6"
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#8a8880",
                  }}
                >
                  Featured team
                </div>
              </div>
            </div>

            <div className="md:col-span-7 md:pl-8">
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#8a8880",
                  letterSpacing: "0.04em",
                }}
              >
                CASE &middot; 01
              </div>
              <h2
                className="mt-4"
                style={{
                  fontSize: 40,
                  fontWeight: 500,
                  lineHeight: 1.1,
                  letterSpacing: "-0.025em",
                  color: "#1a1a18",
                  maxWidth: 520,
                }}
              >
                Real inventory beats a cold email every time.
              </h2>
              <p
                className="mt-6"
                style={{
                  fontSize: 15,
                  fontWeight: 400,
                  lineHeight: 1.7,
                  color: "#6b6960",
                  maxWidth: 520,
                }}
              >
                Eighty athletes, a hosted race with 500+ participants, and 10
                brand partnerships already running. Spontus turns the things a
                team already does into sponsorship packages sponsors can actually
                evaluate.
              </p>
              <div
                className="mt-10 grid max-w-[460px] grid-cols-3"
                style={{ borderTop: "0.5px solid #d5d3cd" }}
              >
                {[
                  { v: "80", l: "Athletes" },
                  { v: "500+", l: "Race participants" },
                  { v: "10", l: "Active sponsors" },
                ].map((s) => (
                  <div key={s.l} style={{ paddingTop: 20, paddingBottom: 4 }}>
                    <div
                      style={{
                        fontSize: 28,
                        fontWeight: 500,
                        color: "#1a1a18",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {s.v}
                    </div>
                    <div
                      className="mt-1"
                      style={{ fontSize: 12, fontWeight: 400, color: "#6b6960" }}
                    >
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <Link
                  href={`/teams/${triTeam.slug}`}
                  className="inline-flex items-center hover:opacity-70"
                  style={{ fontSize: 15, fontWeight: 500, color: "#1a1a18" }}
                >
                  View team profile
                  <ArrowUpRight className="ml-1 h-4 w-4" strokeWidth={2} />
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      <HowItWorks />

      {/* Active teams grid */}
      <section
        className="mx-auto max-w-[1120px] px-6"
        style={{ paddingBottom: 88 }}
      >
        <motion.div {...fadeUp(0)} className="flex items-end justify-between">
          <h2
            style={{
              fontSize: 36,
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "#1a1a18",
            }}
          >
            Active teams
          </h2>
        </motion.div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {MOCK_TEAMS.map((team, i) => (
            <TeamPreviewCard key={team.id} team={team} index={i} />
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section
        className="mx-auto max-w-[1120px] px-6 text-center"
        style={{ paddingBottom: 88 }}
      >
        <motion.h2
          {...fadeUp(0)}
          className="mx-auto"
          style={{
            fontSize: 56,
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: "#1a1a18",
            maxWidth: 720,
          }}
        >
          Run a real season of sponsorships.
        </motion.h2>
        <motion.div
          {...fadeUp(0.1)}
          className="mt-10 flex items-center justify-center gap-6"
        >
          <Link
            href="/for-teams"
            className="inline-flex items-center justify-center transition-opacity hover:opacity-90"
            style={{
              height: 48,
              padding: "0 22px",
              borderRadius: 999,
              background: "#141414",
              color: "#f0efeb",
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            I&apos;m a team
            <ArrowRight className="ml-2 h-4 w-4" strokeWidth={2} />
          </Link>
          <Link
            href="/for-brands"
            className="inline-flex items-center justify-center transition-colors hover:bg-[#e8e6e0]"
            style={{
              height: 48,
              padding: "0 22px",
              borderRadius: 999,
              background: "transparent",
              border: "0.5px solid #b5b3ab",
              color: "#1a1a18",
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            I&apos;m a sponsor
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
