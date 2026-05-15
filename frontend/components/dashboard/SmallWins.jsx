"use client";

import { motion } from "framer-motion";

const WINS = [
  {
    emoji: "🐚",
    title: "First GitHub Commit",
    desc: "Pushed your first open-source contribution.",
    date: "2 days ago",
    color: "#2D5A27",
  },
  {
    emoji: "🪸",
    title: "CSS Mastery Pearl",
    desc: "Completed the advanced Flexbox & Grid module.",
    date: "5 days ago",
    color: "#D35400",
  },
  {
    emoji: "🌊",
    title: "Logic Wave",
    desc: "Solved 10 algorithm challenges in a row.",
    date: "1 week ago",
    color: "#1B3B18",
  },
];

export default function SmallWins() {
  return (
    <div className="space-y-3">
      {WINS.map((win, i) => (
        <motion.div
          key={win.title}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 + i * 0.12, ease: "easeOut" }}
          className="flex items-center gap-4 px-4 py-3.5 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.35)",
            border: "1px solid rgba(255,255,255,0.50)",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.65)",
          }}
        >
          {/* Pearl glow */}
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0"
            style={{
              background: `${win.color}18`,
              border: `1.5px solid ${win.color}30`,
              boxShadow: `0 0 12px ${win.color}25`,
            }}
          >
            {win.emoji}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-black text-[#1B3B18] leading-tight truncate">
              {win.title}
            </p>
            <p className="text-[11px] text-[#1B3B18]/55 font-medium mt-0.5 truncate">
              {win.desc}
            </p>
          </div>

          <span className="text-[10px] font-bold text-[#1B3B18]/35 shrink-0">
            {win.date}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
