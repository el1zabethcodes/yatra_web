"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Головна секція лендінгу (Hero)
 */
export default function Hero() {
  const glassMainClasses = "bg-white/30 backdrop-blur-[12px] border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.07),inset_0_1px_0_rgba(255,255,255,0.65)] rounded-[28px]";
  const glassSubClasses = "bg-white/25 backdrop-blur-[12px] border border-white/40 shadow-[0_4px_16px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.55)] rounded-[20px]";

  return (
    <section className="relative z-20 w-full max-w-5xl mx-auto px-6 pb-28 pt-4 overflow-visible">
      {/* Декоративні свічення */}
      <div className="absolute pointer-events-none top-[10%] left-[30%] w-[480px] h-[480px] bg-[radial-gradient(circle,rgba(107,125,86,0.18)_0%,transparent_70%)] blur-[60px]" />
      <div className="absolute pointer-events-none bottom-[5%] right-[5%] w-[320px] h-[320px] bg-[radial-gradient(circle,rgba(255,220,160,0.22)_0%,transparent_70%)] blur-[50px]" />

      <div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, x: -30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative shrink-0 z-20 w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[480px] md:h-[480px] lg:w-[560px] lg:h-[560px] md:-mr-20 lg:-mr-28 drop-shadow-[0_24px_40px_rgba(0,0,0,0.18)]"
        >
          <Image
            src="/assets/main/octopus.png"
            alt="Ashta the octopus"
            fill
            className="object-contain object-bottom"
            priority
          />
        </motion.div>

        <div className="relative z-10 flex flex-col gap-5 flex-1 w-full min-w-0">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.15, ease: "easeOut" }}
            className={`px-10 py-10 sm:px-12 sm:py-12 ${glassMainClasses}`}
          >
            <h1 className="font-black leading-[0.9] tracking-[-0.04em] text-[#1B3B18] text-[clamp(4.5rem,10vw,9rem)]">
              STAND
              <br />
              OUT
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.3, ease: "easeOut" }}
            className={`px-8 py-5 sm:px-10 sm:py-6 ${glassSubClasses}`}
          >
            <p className="font-semibold text-lg sm:text-xl leading-snug text-[#1B3B18]/75">
              Close the Gap. Build Your Future.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

