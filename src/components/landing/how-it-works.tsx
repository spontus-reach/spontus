"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const steps = [
  {
    n: "01",
    title: "Sponsors post",
    body: "Cash, product, the assets they want, and a deadline.",
  },
  {
    n: "02",
    title: "Teams apply",
    body: "Verified clubs match instantly using their pre-built sponsorship menu.",
  },
  {
    n: "03",
    title: "Deals happen",
    body: "Proof of posts, photos, and activations tracked in one place.",
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-[1120px] px-6" style={{ paddingBottom: 160 }}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease }}
        className="text-center"
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
          How it works
        </span>
        <h2
          className="mx-auto mt-6"
          style={{
            fontSize: 44,
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: "#1a1a18",
            maxWidth: 640,
          }}
        >
          Three steps. No middlemen.
        </h2>
      </motion.div>

      <div
        className="mt-16 grid gap-12 md:grid-cols-3"
        style={{ borderTop: "0.5px solid #d5d3cd" }}
      >
        {steps.map((step, i) => (
          <motion.div
            key={step.n}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease, delay: i * 0.08 }}
            style={{ paddingTop: 28 }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: "#1a3a6e",
                letterSpacing: "0.06em",
              }}
            >
              {step.n}
            </div>
            <div
              className="mt-3"
              style={{
                fontSize: 20,
                fontWeight: 500,
                color: "#1a1a18",
                letterSpacing: "-0.01em",
              }}
            >
              {step.title}
            </div>
            <p
              className="mt-3"
              style={{
                fontSize: 14,
                fontWeight: 400,
                lineHeight: 1.6,
                color: "#6b6960",
                maxWidth: 280,
              }}
            >
              {step.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
