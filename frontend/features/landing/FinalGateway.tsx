"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";

interface FadeProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

const Fade = ({ children, delay = 0, className = "" }: FadeProps) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

function CTAButton() {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      whileTap={{ y: 3 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="inline-block cursor-pointer select-none"
    >
      <Link
        href="/login"
        className="relative inline-block px-12 sm:px-16 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-lg transition-all duration-100 bg-gradient-to-b from-[#7a8f63] to-[#6B7D56] text-[#E6E4C5] shadow-[0_7px_0_#4a5a3a,0_9px_0_#3a4a2a,0_12px_24px_rgba(74,90,58,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]"
      >
        <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-2xl bg-gradient-to-b from-white/18 to-transparent" />
        GET STARTED
      </Link>
    </motion.div>
  );
}

/**
 * Секція Final Gateway
 */
export default function FinalGateway() {
  return (
    <section className="py-24 text-center relative z-20">
      <Fade>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 text-[#1B3B18]/35">
          The Reef
        </p>
        <h2 className="font-black tracking-tight leading-tight mb-3 text-[#1B3B18] text-[clamp(2.4rem, 6vw, 4.5rem)]">
          Your shore is waiting.
        </h2>
        <p className="text-xl font-medium mb-12 text-[#1B3B18]/55">
          Ready to leave the chaos behind?
        </p>
      </Fade>
      <Fade delay={0.1}>
        <CTAButton />
      </Fade>
    </section>
  );
}
