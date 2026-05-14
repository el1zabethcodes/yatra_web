"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Map, Anchor } from "lucide-react";
import type { DashboardTabKey } from "@/app/dashboard/page";

/**
 * вкладка дорожньої карти (в розробці)
 */
export default function RoadmapTab({ setActiveTab }: { setActiveTab: (tab: DashboardTabKey) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4"
    >
      {/* ілюстрація */}
      <motion.div
        animate={{ rotate: [-1, 1, -1], y: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-48 h-48 md:w-64 md:h-64 mb-10"
      >
        <Image
          src="/assets/candle-lit.png"
          alt="Roadmap illumination"
          fill
          className="object-contain"
          sizes="256px"
        />
      </motion.div>

      {/* контент */}
      <div className="bg-background border border-surface rounded-[40px] px-8 py-10 max-w-md shadow-sm">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Map size={18} className="text-accent" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">
            Моя Карта
          </span>
        </div>
        <h2 className="text-2xl font-black text-primary mb-3">
          Карта в процесі створення
        </h2>
        <p className="text-sm text-primary/60 font-medium leading-relaxed">
          Ваша персональна дорожня карта навчання прокладає шлях крізь туман. 
          Завершіть аналіз профілю, щоб відкрити маршрут.
        </p>
        <button
          type="button"
          onClick={() => setActiveTab("mentor")}
          className="mt-8 inline-flex items-center gap-3 px-8 py-3.5 rounded-2xl bg-accent text-surface font-black text-xs uppercase tracking-widest shadow-lg shadow-accent/10 hover:-translate-y-1 transition-all"
        >
          <Anchor size={16} />
          Почати аналіз
        </button>
      </div>

      {/* декоративні крапки */}
      <div className="flex gap-2.5 mt-10">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: i < 2 ? "var(--color-secondary)" : "var(--color-surface)" }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
          />
        ))}
      </div>
    </motion.div>
  );
}

