"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { PillLabel } from "@/components/site/pill-label";

const ease = [0.22, 1, 0.36, 1] as const;

const points = [
  {
    n: "01",
    title: "Verify with your .edu",
    body: "Sign up with your school email — verification tells sponsors you're a real team officer.",
  },
  {
    n: "02",
    title: "Build a standardized profile",
    body: "Roster size, sport, season schedule, social reach, photos. One profile, every listing.",
  },
  {
    n: "03",
    title: "Apply with one click",
    body: "No cold emails. Sponsors see the same structured snapshot for every applicant.",
  },
  {
    n: "04",
    title: "Run the deal in the open",
    body: "Shared checklist and proof uploads keep both sides accountable from accept to payout.",
  },
];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" as const },
    transition: { duration: 0.7, ease, delay },
  };
}

export default function ForTeamsPage() {
  return (
    <>
      <section className="mx-auto max-w-[1120px] px-6 pb-20 pt-12 lg:pb-28 lg:pt-16">
        <PillLabel>For teams</PillLabel>
        <h1 className="mt-6 max-w-[16ch] text-balance text-5xl font-medium leading-[1.05] md:text-7xl">
          Funded seasons, not cold emails.
        </h1>
        <p className="mt-8 max-w-[52ch] text-[17px] leading-relaxed text-[#6b6960]">
          Spontus replaces the chaos of asking 40 brands for sponsorship with a single
          verified profile that sponsors actually browse.
        </p>
        <div className="mt-10">
          <Link
            href="/browse"
            className="inline-flex items-center rounded-full px-8 py-3 text-[15px] font-medium text-[#1a1a18] transition-colors hover:bg-[#e8e6e0]"
            style={{ border: "0.5px solid #b5b3ab" }}
          >
            See open listings
          </Link>
        </div>
      </section>

      <section className="border-t border-[#d5d3cd] py-24" style={{ borderTopWidth: "0.5px" }}>
        <div className="mx-auto max-w-[1120px] px-6">
          <motion.div {...fadeUp(0)} className="mb-16 max-w-[40ch]">
            <PillLabel>How teams use Spontus</PillLabel>
            <h2 className="mt-6 text-4xl font-medium tracking-tight md:text-5xl">
              Four steps. One profile. Zero spreadsheets.
            </h2>
          </motion.div>
          <div className="grid gap-12 md:grid-cols-2">
            {points.map((p, i) => (
              <motion.div
                key={p.n}
                {...fadeUp(i * 0.08)}
                className="space-y-4 border-l border-[#d5d3cd] pl-8"
              >
                <span className="text-sm font-medium text-[#1a3a6e]">{p.n}</span>
                <h3 className="text-xl font-medium">{p.title}</h3>
                <p className="text-sm leading-relaxed text-[#6b6960]">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="border-t border-[#d5d3cd] py-24 text-center"
        style={{ borderTopWidth: "0.5px" }}
      >
        <div className="mx-auto max-w-[1120px] px-6">
          <h2 className="mx-auto max-w-[20ch] text-4xl font-medium tracking-tight md:text-5xl">
            Ready to register your team?
          </h2>
          <p className="mx-auto mt-4 max-w-[44ch] text-[17px] leading-relaxed text-[#6b6960]">
            Create your profile in under a minute, then build it out and start applying
            to listings.
          </p>
          <Link
            href="/signup/team"
            className="mt-10 inline-flex items-center justify-center transition-opacity hover:opacity-90"
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
            Sign up your team
            <ArrowRight className="ml-2 h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
      </section>
    </>
  );
}
