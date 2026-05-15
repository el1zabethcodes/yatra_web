"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Map, Anchor } from "lucide-react";

export default function RoadmapTab({ setActiveTab }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
    >
      {/* Scroll / treasure map illustration */}
      <motion.div
        animate={{ rotate: [-1, 1, -1], y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-48 h-48 md:w-64 md:h-64 mb-8"
        style={{ filter: "drop-shadow(0 16px 32px rgba(27,59,24,0.18))" }}
      >
        <Image
          src="/assets/свеча-Photoroom.png"
          alt="A rolled scroll in the mist"
          fill
          className="object-contain"
          sizes="256px"
        />
      </motion.div>

      {/* Fog overlay text */}
      <div
        className="rounded-[28px] px-8 py-7 max-w-md"
        style={{
          background: "rgba(255,255,255,0.28)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.40)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.65)",
        }}
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <Map size={18} className="text-[#D35400]" />
          <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[#D35400]">
            My Roadmap
          </span>
        </div>
        <h2 className="text-2xl font-black text-[#1B3B18] mb-2">
          The Map is Being Drawn
        </h2>
        <p className="text-sm text-[#1B3B18]/55 font-medium leading-relaxed">
          Your personalised learning roadmap is charting its course through the
          fog. Complete your profile analysis to reveal the path ahead.
        </p>
        <motion.button
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-wider text-white"
          style={{
            background: "#D35400",
            boxShadow: "0 4px 0 #a03e00, 0 6px 16px rgba(211,84,0,0.28)",
          }}
        >
          <Anchor size={15} />
          Start Analysis
        </motion.button>
      </div>

      {/* Decorative dots */}
      <div className="flex gap-2 mt-8">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: i < 2 ? "#2D5A27" : "rgba(27,59,24,0.18)" }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
          />
        ))}
      </div>
      <p className="text-[10px] font-bold text-[#1B3B18]/30 uppercase tracking-widest mt-2">
        Coming Soon
      </p>
    </motion.div>
  );
}
