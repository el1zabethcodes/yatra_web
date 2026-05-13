"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative py-24 px-6 border-t border-[#1B3B18]/5 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.4),transparent_55%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <p className="uppercase tracking-[0.35em] text-sm text-[#1B3B18]/50 mb-4">
          Pricing
        </p>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#1B3B18] mb-4">
          Plans for every <span className="text-[#D35400]">voyage</span>
        </h2>
        <p className="text-lg text-[#1B3B18]/70 mb-10 max-w-2xl mx-auto">
          Beachcomber, Wayfinder, or Legend — compare tiers, try
          Navigator&apos;s Lab, and pick the current that fits you.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-[#D35400] text-[#FFF9E3] font-black uppercase tracking-wider text-sm shadow-lg shadow-[#D35400]/25 hover:bg-[#b04600] transition-colors"
          >
            View subscriptions &amp; AI guide
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
