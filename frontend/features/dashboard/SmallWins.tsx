"use client";

import { motion } from "framer-motion";

const WINS = [
  {
    emoji: "рџђљ",
    title: "РџРµСЂС€РёР№ РєРѕРјС–С‚ РЅР° GitHub",
    desc: "Р’Рё Р·СЂРѕР±РёР»Рё СЃРІС–Р№ РїРµСЂС€РёР№ РІРЅРµСЃРѕРє Сѓ open-source.",
    date: "2 РґРЅС– С‚РѕРјСѓ",
    color: "#6B7D56",
  },
  {
    emoji: "рџЄё",
    title: "РџРµСЂР»РёРЅР° CSS",
    desc: "Р—Р°РІРµСЂС€РµРЅРѕ РјРѕРґСѓР»СЊ РїСЂРѕСЃСѓРЅСѓС‚РѕРіРѕ Flexbox С‚Р° Grid.",
    date: "5 РґРЅС–РІ С‚РѕРјСѓ",
    color: "#D35400",
  },
  {
    emoji: "рџЊЉ",
    title: "РҐРІРёР»СЏ Р»РѕРіС–РєРё",
    desc: "Р’РёСЂС–С€РµРЅРѕ 10 Р°Р»РіРѕСЂРёС‚РјС–С‡РЅРёС… Р·Р°РґР°С‡ РїРѕСЃРїС–Р»СЊ.",
    date: "1 С‚РёР¶РґРµРЅСЊ С‚РѕРјСѓ",
    color: "#1B3B18",
  },
];

/**
 * СЃРїРёСЃРѕРє РЅРµРІРµР»РёРєРёС… РґРѕСЃСЏРіРЅРµРЅСЊ РєРѕСЂРёСЃС‚СѓРІР°С‡Р°
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
          {/* Р·РЅР°С‡РѕРє РїРµСЂР»РёРЅРё */}
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

