"use client";

import { motion } from "framer-motion";

// --- КОМПОНЕНТИ ВІЗУАЛЬНОЇ КОНЦЕПЦІЇ "YATRA ZEN" ---

/**
 * 1. Перлина прогресу (Stats Card)
 */
function PearlCard({ number, label, text }) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        boxShadow: "0 20px 40px -10px rgba(211, 84, 0, 0.2)",
      }}
      className="relative group p-8 rounded-[40px] bg-white/10 border border-white/30 backdrop-blur-xl flex flex-col items-center text-center transition-all duration-500"
    >
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-white/60 to-white/10 shadow-inner flex items-center justify-center mb-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/20 blur-sm group-hover:bg-[#D35400]/10 transition-colors" />
        <span className="relative text-2xl font-black text-[#1B3B18]">
          {number}
        </span>
      </div>

      <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#D35400] mb-3">
        {label}
      </h4>

      <p className="text-xs font-bold text-[#1B3B18]/60 leading-relaxed italic">
        {text}
      </p>
    </motion.div>
  );
}

/**
 * 2. Шепіт океану (Infinite Marquee)
 */
function WhisperLine() {
  const testimonials = [
    {
      text: "Kavi showed me my strengths when I felt completely blind. Now I just... sail.",
      author: "Aarav, Mumbai",
    },
    {
      text: "The 30-day roadmap is my sanctuary. No more 50 open tabs, just one clear path.",
      author: "Priya, Bengaluru",
    },
    {
      text: "Finally, a place that doesn't scream at me to 'hustle'. Yatra cares about my peace.",
      author: "Ishaan, Delhi",
    },
    {
      text: "Tentacle Grab is magic. It found skills I didn't even know I had on my GitHub.",
      author: "Saanvi, Hyderabad",
    },
    {
      text: "I used to fear the job market. Now, I have a compass and a chai in my hand.",
      author: "Deepak, Pune",
    },
  ];

  const items = [...testimonials, ...testimonials];

  return (
    <div className="relative w-full overflow-hidden mt-24 py-10">
      <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#DFE0BF] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-[#DFE0BF] to-transparent z-10" />

      <motion.div
        animate={{ x: [0, -1800] }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="flex gap-8 whitespace-nowrap"
      >
        {items.map((t, i) => (
          <div
            key={`${t.author}-${i}`}
            className="px-8 py-4 rounded-full bg-white/5 border border-[#1B3B18]/10 backdrop-blur-md flex items-center gap-4 shrink-0"
          >
            <span className="text-sm font-bold text-[#1B3B18]">
              &ldquo;{t.text}&rdquo;
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#D35400] opacity-60">
              — {t.author}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/**
 * 3. Основна секція з декором
 */
export default function YatraZenSection() {
  return (
    <section className="relative mt-20 pb-32 overflow-hidden bg-[#DFE0BF]">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.5)_0%,_transparent_70%)]" />

      <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.03] pointer-events-none blur-[1px]">
        <svg viewBox="0 0 200 200" fill="#1B3B18" className="w-full h-full">
          <path d="M100,0 C120,50 180,60 200,100 C150,90 140,150 100,200 C80,150 20,140 0,100 C50,110 60,50 100,0 Z" />
        </svg>
      </div>

      <div className="absolute bottom-10 left-10 w-32 h-32 opacity-10 rotate-12 pointer-events-none filter blur-[0.5px]">
        <svg viewBox="0 0 100 100" fill="#D35400" className="w-full h-full">
          <path d="M50 10 C30 10 10 40 10 70 C10 85 30 90 50 90 C70 90 90 85 90 70 C90 40 70 10 50 10 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <PearlCard
            number="12,400+"
            label="The Recognition"
            text="Digital footprints recognized by Ashta's Tentacle Grab. Every explorer seen and understood."
          />
          <PearlCard
            number="5,800+"
            label="The Guidance"
            text="Personalized navigation charts plotted. From chaotic oceans to structured currents."
          />
          <PearlCard
            number="96%"
            label="The Growth"
            text="Of our tribe reported a 'Zen-state' focus within the first week of their pilgrimage."
          />
          <PearlCard
            number="85+"
            label="The Reach"
            text="Cities across the mainland connected. A growing community of calm high-achievers."
          />
        </div>

        <WhisperLine />

        <div className="mt-20 text-center">
          <p className="text-[#1B3B18]/40 text-xs font-black uppercase tracking-[0.4em]">
            Your journey is unique. Your tools should be too.
          </p>
        </div>
      </div>
    </section>
  );
}
