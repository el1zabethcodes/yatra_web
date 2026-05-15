"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

const glass = {
  background: "rgba(255,255,255,0.28)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  border: "1px solid rgba(255,255,255,0.40)",
  boxShadow:
    "0 8px 40px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.65)",
};

export default function TentacleGrab({ onGrab }) {
  const [grabbed, setGrabbed] = useState(false);

  const handleGrab = () => {
    setGrabbed(true);
    setTimeout(() => {
      setGrabbed(false);
      if (onGrab) onGrab();
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
      className="rounded-[32px] p-6 md:p-8 overflow-hidden relative"
      style={glass}
    >
      {/* Colour blob */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-20%",
          right: "-10%",
          width: 280,
          height: 280,
          background:
            "radial-gradient(circle, rgba(211,84,0,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-8">
        {/* Octopus */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative shrink-0 w-36 h-36 md:w-44 md:h-44"
          style={{ filter: "drop-shadow(0 12px 24px rgba(211,84,0,0.20))" }}
        >
          <Image
            src="/assets/dashboard/tentacle_grab.png"
            alt="Kavi the octopus"
            fill
            className="object-contain"
            sizes="176px"
          />
        </motion.div>

        {/* Content */}
        <div className="flex-1 w-full">
          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#D35400] mb-1">
            Import · Analyse · Evolve
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-[#1B3B18] leading-tight mb-2">
            Tentacle Grab
          </h2>
          <p className="text-sm text-[#1B3B18]/60 font-medium mb-5 max-w-sm">
            Import your digital footprint to update your path. Drop a LinkedIn
            or GitHub URL and let Kavi do the rest.
          </p>

          {/* Grab button */}
          <div>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleGrab}
              className="px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-wider text-white transition-colors"
              style={{
                background: grabbed ? "#2D5A27" : "#D35400",
                boxShadow: grabbed
                  ? "0 4px 0 #1B3B18, 0 6px 16px rgba(45,90,39,0.30)"
                  : "0 4px 0 #a03e00, 0 6px 16px rgba(211,84,0,0.30)",
              }}
            >
              {grabbed ? "Grabbed ✓" : "Grab It"}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mentor whisper bubble */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="mt-5 flex items-start gap-3"
      >
        <div
          className="relative px-4 py-3 rounded-2xl rounded-tl-sm text-xs font-medium text-[#1B3B18]/75 max-w-sm"
          style={{
            background: "rgba(255,255,255,0.50)",
            border: "1px solid rgba(255,255,255,0.60)",
          }}
        >
          <Zap size={12} className="inline mr-1 text-[#D35400]" />
          <span className="font-black text-[#1B3B18]">Kavi says: </span>
          "Captain, I see a new skill in your GitHub! Your logic is now{" "}
          <span className="text-[#2D5A27] font-black">15% sharper</span>."
        </div>
      </motion.div>
    </motion.div>
  );
}
