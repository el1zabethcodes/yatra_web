"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

interface TentacleGrabProps {
  onGrab?: () => void;
}

/**
 * компонент для імпорту даних користувача
 */
export default function TentacleGrab({ onGrab }: TentacleGrabProps) {
  const [grabbed, setGrabbed] = useState(false);

  const handleGrab = () => {
    setGrabbed(true);
    setTimeout(() => {
      setGrabbed(false);
      if (onGrab) onGrab();
    }, 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-background border border-surface rounded-[40px] p-8 md:p-10 relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative flex flex-col md:flex-row items-center gap-10">
        {/* восьминіг Kavi */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative shrink-0 w-40 h-40 md:w-52 md:h-52"
        >
          <Image
            src="/assets/dashboard/tentacle_grab.png"
            alt="Kavi the octopus"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 160px, 208px"
          />
        </motion.div>

        {/* текстовий контент */}
        <div className="flex-1 space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">
            Імпорт · Аналіз · Еволюція
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-primary leading-tight">
            Захват щупальцями
          </h2>
          <p className="text-base text-primary/60 font-medium max-w-sm">
            Імпортуйте свій цифровий слід, щоб оновити шлях. Додайте посилання на LinkedIn або GitHub.
          </p>

          <div className="pt-2">
            <button
              onClick={handleGrab}
              disabled={grabbed}
              className={`
                px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all
                ${grabbed ? "bg-secondary text-surface" : "bg-accent text-surface shadow-lg hover:shadow-accent/20 hover:-translate-y-1"}
              `}
            >
              {grabbed ? "Захоплено ✓" : "Захопити"}
            </button>
          </div>
        </div>
      </div>

      {/* шепіт ментора */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-8 flex items-start gap-4"
      >
        <div className="bg-surface/50 border border-surface px-5 py-4 rounded-3xl rounded-tl-sm text-sm font-medium text-primary/70 max-w-md italic">
          <Zap size={14} className="inline mr-2 text-accent" />
          <span className="font-black text-primary not-italic">Kavi каже: </span>
          "Капітане, я бачу нові навички у вашому GitHub! Ваша логіка стала на{" "}
          <span className="text-secondary font-black">15% гострішою</span>."
        </div>
      </motion.div>
    </motion.div>
  );
}

