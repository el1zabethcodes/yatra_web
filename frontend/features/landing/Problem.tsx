"use client";

import { motion } from "framer-motion";
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

const Divider = () => (
  <div className="w-full h-px bg-[#1B3B18]/10" />
);

/**
 * Секція Philosophy (колишня Problem)
 */
export default function Problem() {
  return (
    <div className="relative z-20 max-w-2xl mx-auto px-6 lg:px-0">
      <Divider />
      <section className="py-20">
        <Fade>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-5 text-[#1B3B18]/35">
            The Philosophy
          </p>
          <h2 className="font-black tracking-tight leading-[1.1] mb-8 text-[#1B3B18] text-[clamp(1.8rem,4.5vw,3rem)]">
            From Cognitive Overload<br />to Cognitive Clarity.
          </h2>
          <p className="text-lg font-medium leading-relaxed text-[#1B3B18]/68">
            In a world that profits off your FOMO, Yatra offers a quiet place to breathe.
            We believe that a career in tech shouldn&apos;t feel like a race against an invisible clock.
            It should feel like a pilgrimage.
          </p>
        </Fade>
        <Fade delay={0.15}>
          <p className="text-lg font-medium leading-relaxed mt-6 text-[#1B3B18]/68">
            We look beyond the keywords on your resume. We analyze your trajectory, your coding logic,
            and your growth patterns to ensure you aren&apos;t just moving fast—but moving in the right direction.
          </p>
        </Fade>
      </section>
    </div>
  );
}

