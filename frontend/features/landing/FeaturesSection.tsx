"use client";

import Image from "next/image";
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

interface InstrumentCardProps {
  title: string;
  body: string;
  delay: number;
}

function InstrumentCard({ title, body, delay }: InstrumentCardProps) {
  return (
    <Fade delay={delay}>
      <div className="rounded-[28px] px-7 py-8 h-full bg-white/28 backdrop-blur-[14px] border border-white/45 shadow-[0_6px_28px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.65)]">
        <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#D35400] mb-3">
          Instrument
        </p>
        <h3 className="font-black leading-tight mb-4 text-[#1B3B18] text-[clamp(1.1rem, 2.5vw, 1.4rem)]">
          {title}
        </h3>
        <p className="text-sm font-medium leading-relaxed text-[#1B3B18]/65">
          {body}
        </p>
      </div>
    </Fade>
  );
}

/**
 * Головний компонент секції можливостей (Core Instruments)
 */
export default function FeaturesSection() {
  return (
    <div className="relative z-20 max-w-5xl mx-auto px-6 py-20">
      <Fade>
        <div className="flex items-center gap-4 mb-3">
          <div className="relative w-8 h-8 shrink-0">
            <Image src="/assets/main/logo.png" alt="Yatra Logo" fill className="object-contain" sizes="32px" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1B3B18]/35">
            The Core Instruments
          </p>
        </div>
        <h2 className="font-black tracking-tight leading-tight mb-12 text-[#1B3B18] text-[clamp(1.6rem, 4vw, 2.6rem)]">
          The Essence of Yatra
        </h2>
      </Fade>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <InstrumentCard
          delay={0.05}
          title="The Tentacle Grab"
          body="Your digital footprint is more than just a list of repos. It's your engineering DNA. We use deep semantic analysis to distill your history into a clear map of your actual capabilities. We find the gold you've already created so you can stop starting from scratch."
        />
        <InstrumentCard
          delay={0.15}
          title="The Skill Radar"
          body="Stop looking at your skills as a checklist. See them as a constellation. Our Radar visualizes your technical soul, highlighting your Radiant Strengths and identifying the Quiet Zones that need a little more light. It's a compass that always points toward your potential."
        />
        <InstrumentCard
          delay={0.25}
          title="Adaptive Living Roadmaps"
          body="Most roadmaps are rigid and stressful. Ours is alive. It breathes with you—slowing down when the waves of life are high and picking up speed when you are in the flow. It provides the structure of a plan with the grace of a mentor."
        />
      </div>
    </div>
  );
}

