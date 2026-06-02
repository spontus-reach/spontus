"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section
      className="mx-auto max-w-[1120px] px-6 pt-12 pb-20 text-center md:pt-[72px] md:pb-[144px]"
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 500,
            color: "#6b6960",
            letterSpacing: "0.04em",
            background: "#e8e6e0",
            border: "0.5px solid #d5d3cd",
            padding: "5px 12px",
            borderRadius: 999,
          }}
        >
          For college club sports
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease, delay: 0.08 }}
        className="mx-auto mt-8 text-[40px] md:text-[56px] lg:text-[76px]"
        style={{
          fontWeight: 500,
          lineHeight: 1.02,
          letterSpacing: "-0.035em",
          color: "#1a1a18",
          maxWidth: 880,
        }}
      >
        The sponsorship marketplace for college club sports.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease, delay: 0.18 }}
        className="mx-auto mt-8"
        style={{
          fontSize: 17,
          fontWeight: 400,
          lineHeight: 1.6,
          color: "#6b6960",
          maxWidth: 500,
        }}
      >
        Verified teams find relevant sponsors. Sponsors discover teams worth
        backing.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease, delay: 0.28 }}
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
  );
}
