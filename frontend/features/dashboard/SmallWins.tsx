"use client";

import { motion } from "framer-motion";

const WINS = [
  {
    emoji: "🐚",
    title: "Перший коміт на GitHub",
    desc: "Ви зробили свій перший внесок у open-source.",
    date: "2 дні тому",
    color: "#6B7D56",
  },
  {
    emoji: "рџЄё",
    title: "Перлина CSS",
    desc: "Завершено модуль просунутого Flexbox та Grid.",
    date: "5 днів тому",
    color: "#D35400",
  },
  {
    emoji: "рџЊЉ",
    title: "Хвиля логіки",
    desc: "Вирішено 10 алгоритмічних задач поспіль.",
    date: "1 тиждень тому",
    color: "#1B3B18",
  },
];

/**
 * список невеликих досягнень користувача
 */
export default function SmallWins() {
  return (
    <div className="space-y-4">
      {WINS.map((win, i) => (
        <motion.div
          key={win.title}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 + i * 0.1, ease: "easeOut" }}
          className="flex items-center gap-4 px-5 py-4 bg-background border border-surface rounded-2xl hover:border-surface/80 transition-colors"
        >
          {/* значок перлини */}
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0"
            style={{
              backgroundColor: `${win.color}15`,
              color: win.color,
            }}
          >
            {win.emoji}
          </div>

          <div className="flex-1 min-w-0 space-y-0.5">
            <p className="text-sm font-black text-primary truncate">
              {win.title}
            </p>
            <p className="text-xs text-primary/50 font-medium truncate">
              {win.desc}
            </p>
          </div>

          <span className="text-[10px] font-bold text-primary/60 uppercase tracking-widest shrink-0">
            {win.date}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

