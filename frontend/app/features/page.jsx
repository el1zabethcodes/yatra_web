"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

/* ─────────────────────────────────────────
   Helpers
───────────────────────────────────────── */
const Fade = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

/* grid overlay shared across all sections */
const Grid = () => null;

/* ─────────────────────────────────────────
   Scene — alternating image + text row
───────────────────────────────────────── */
function Scene({ img, alt, text, reverse = false, dark = false, label }) {
  return (
    <div
      className={`relative py-24 px-6 ${dark ? "bg-[#1B2A14]" : "bg-[#DFE0BF]"}`}
    >
      <Grid dark={dark} />

      <div
        className={`relative z-10 max-w-5xl mx-auto flex flex-col gap-12 items-center
          ${reverse ? "md:flex-row-reverse" : "md:flex-row"}`}
      >
        {/* image */}
        <Fade className="w-full md:w-1/2 flex justify-center">
          <motion.div
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative w-[420px] h-[420px] md:w-[600px] md:h-[600px]"
          >
            <Image src={img} alt={alt} fill className="object-contain" />
          </motion.div>
        </Fade>

        {/* text */}
        <Fade delay={0.15} className="w-full md:w-1/2 space-y-4">
          {label && (
            <p
              className={`text-xs font-black uppercase tracking-[0.3em] ${dark ? "text-[#E6E4C5]/40" : "text-[#1B3B18]/35"}`}
            >
              {label}
            </p>
          )}
          <p
            className={`text-xl md:text-2xl font-medium leading-relaxed ${dark ? "text-[#E6E4C5]/85" : "text-[#1B3B18]/75"}`}
          >
            {text}
          </p>
        </Fade>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Feature cards (scene 3) — original image
───────────────────────────────────────── */
function FeatureCards() {
  return (
    <div className="relative bg-[#DFE0BF] py-24 px-6">
      <div className="relative z-10 max-w-7xl mx-auto">
        <Fade className="text-center mb-16 space-y-3">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-[#1B3B18]/35">
            The Toolkit
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-[#1B3B18] tracking-tight">
            Your instruments for the voyage
          </h2>
          <p className="text-lg text-[#1B3B18]/60 max-w-xl mx-auto">
            Yatra turned my chaos into an algorithm. Progress isn&apos;t about
            how many arms you have — it&apos;s about having the right tools in
            them.
          </p>
        </Fade>
        <Fade delay={0.1}>
          <div className="relative w-full" style={{ aspectRatio: "1540/580" }}>
            <Image
              src="/assets/features/3.png"
              alt="Feature cards: Skill Checklist, Skill Radar, 7-Day Roadmap, AI Career Mentor"
              fill
              className="object-contain"
            />
          </div>
        </Fade>
      </div>
    </div>
  );
}

// ---- deleted ----
function _unused_disabled() {
  const roadmapDays = [
    { day: "Day 1", label: "Python Core Refresh", pct: 95 },
    { day: "Day 2", label: "Advanced Data Structures", pct: 80 },
    { day: "Day 3", label: "Key Algorithm Techniques", pct: 75 },
    { day: "Day 4", label: "System Design Essentials", pct: 70 },
    { day: "Day 5", label: "SQL Masterclass", pct: 85 },
    { day: "Day 6", label: "Architectural Patterns", pct: 60 },
    { day: "Day 7", label: "Final Build & Practice", pct: 40 },
  ];

  const radarData = [
    { label: "Coding", v: 0.85 },
    { label: "DSA", v: 0.7 },
    { label: "System Design", v: 0.6 },
    { label: "Tools", v: 0.75 },
    { label: "SQL", v: 0.9 },
  ];

  return (
    <div className="relative bg-[#DFE0BF] py-24 px-6">
      <Grid />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* heading */}
        <Fade className="text-center mb-16 space-y-3">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-[#1B3B18]/35">
            The Toolkit
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-[#1B3B18] tracking-tight">
            Your instruments for the voyage
          </h2>
          <p className="text-lg text-[#1B3B18]/60 max-w-xl mx-auto">
            Yatra turned my chaos into an algorithm. Progress isn&apos;t about
            how many arms you have — it&apos;s about having the right tools in
            them.
          </p>
        </Fade>

        {/* cards */}
        <Fade delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 items-start">
            {/* — Skill Checklist — */}
            <div className="rounded-3xl bg-[#DFE0BF] border border-[#CCCDB0] p-8 flex flex-col gap-4 shadow-sm">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-2xl">📋</span>
                <h4 className="text-base font-black text-[#1B3B18]">
                  Skill Checklist
                </h4>
              </div>
              <ul className="space-y-3.5 flex-1">
                {[
                  "Python",
                  "Data Structures",
                  "Git & GitHub",
                  "SQL",
                  "Problem Solving",
                  "System Design",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-base text-[#1B3B18]/80"
                  >
                    <span className="w-6 h-6 rounded-md bg-[#6B7D56] flex items-center justify-center shrink-0">
                      <svg
                        className="w-3.5 h-3.5 text-[#E6E4C5]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-3">
                <div className="h-3 rounded-full bg-[#CCCDB0] overflow-hidden">
                  <div className="h-full w-full rounded-full bg-gradient-to-r from-[#6B7D56] to-[#4a5a3a]" />
                </div>
                <p className="text-sm text-[#6B7D56] font-bold mt-2">
                  6/6 Completed
                </p>
              </div>
            </div>

            {/* — Skill Radar — */}
            <div className="rounded-3xl bg-[#DFE0BF] border border-[#CCCDB0] p-8 flex flex-col gap-4 shadow-sm">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-2xl">📡</span>
                <h4 className="text-base font-black text-[#1B3B18]">
                  Skill Radar
                </h4>
              </div>
              <div className="flex items-center justify-center py-2">
                <svg viewBox="0 0 220 220" className="w-full max-w-[260px]">
                  {[0.33, 0.66, 1].map((s, i) => (
                    <polygon
                      key={i}
                      points={radarData
                        .map((_, j) => {
                          const a = (j * 72 - 90) * (Math.PI / 180);
                          return `${110 + 82 * s * Math.cos(a)},${110 + 82 * s * Math.sin(a)}`;
                        })
                        .join(" ")}
                      fill="none"
                      stroke="#BCBD9A"
                      strokeWidth="1"
                    />
                  ))}
                  {radarData.map((_, j) => {
                    const a = (j * 72 - 90) * (Math.PI / 180);
                    return (
                      <line
                        key={j}
                        x1="110"
                        y1="110"
                        x2={110 + 82 * Math.cos(a)}
                        y2={110 + 82 * Math.sin(a)}
                        stroke="#BCBD9A"
                        strokeWidth="1"
                      />
                    );
                  })}
                  <polygon
                    points={radarData
                      .map(({ v }, j) => {
                        const a = (j * 72 - 90) * (Math.PI / 180);
                        return `${110 + 82 * v * Math.cos(a)},${110 + 82 * v * Math.sin(a)}`;
                      })
                      .join(" ")}
                    fill="rgba(107,125,86,0.22)"
                    stroke="#6B7D56"
                    strokeWidth="2"
                  />
                  {radarData.map(({ v }, j) => {
                    const a = (j * 72 - 90) * (Math.PI / 180);
                    return (
                      <circle
                        key={j}
                        cx={110 + 82 * v * Math.cos(a)}
                        cy={110 + 82 * v * Math.sin(a)}
                        r="4"
                        fill="#6B7D56"
                      />
                    );
                  })}
                  {radarData.map(({ label }, j) => {
                    const a = (j * 72 - 90) * (Math.PI / 180);
                    return (
                      <text
                        key={label}
                        x={110 + 100 * Math.cos(a)}
                        y={110 + 100 * Math.sin(a)}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="10"
                        fill="#1B3B18"
                        fontWeight="600"
                      >
                        {label}
                      </text>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* — 7-Day Roadmap — */}
            <div className="rounded-3xl bg-[#DFE0BF] border border-[#CCCDB0] p-8 flex flex-col gap-4 shadow-sm">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-2xl">📅</span>
                <h4 className="text-base font-black text-[#1B3B18] leading-tight">
                  7-Day Intensive Roadmap
                </h4>
              </div>
              <ul className="space-y-3.5 flex-1">
                {roadmapDays.map(({ day, label, pct }) => (
                  <li key={day} className="text-sm text-[#1B3B18]/80">
                    <div className="flex justify-between mb-1.5">
                      <span>
                        <strong>{day}:</strong> {label}
                      </span>
                      <span className="text-[#6B7D56] font-bold shrink-0 ml-2">
                        ~{pct}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-[#CCCDB0] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#6B7D56]"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* — AI Career Mentor — */}
            <div className="rounded-3xl bg-[#DFE0BF] border border-[#CCCDB0] p-8 flex flex-col gap-4 shadow-sm">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-2xl">💬</span>
                <h4 className="text-base font-black text-[#1B3B18]">
                  AI Career Mentor
                </h4>
              </div>
              <div className="flex flex-col gap-3 flex-1">
                <div className="bg-[#CCCDB0] rounded-2xl rounded-tl-none px-5 py-3.5 text-base text-[#1B3B18]/80 max-w-[88%]">
                  Hi! How can I help you today?
                </div>
                <div className="bg-[#6B7D56] rounded-2xl rounded-tr-none px-5 py-3.5 text-base text-[#E6E4C5] max-w-[82%] self-end">
                  What should I focus on next?
                </div>
                <div className="bg-[#CCCDB0] rounded-2xl rounded-tl-none px-5 py-3.5 text-base text-[#1B3B18]/80 max-w-[88%]">
                  Focus on DSA patterns and solve 20 problems this week.
                </div>
              </div>
              <div className="mt-auto flex items-center gap-2 rounded-2xl border border-[#CCCDB0] bg-[#DFE0BF] px-5 py-3.5">
                <span className="flex-1 text-sm text-[#1B3B18]/30">
                  Type your message...
                </span>
                <svg
                  className="w-5 h-5 text-[#6B7D56] shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
                </svg>
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Neumorphic button
───────────────────────────────────────── */
function NeumorphicBtn({ children, href }) {
  return (
    <Link
      href={href}
      className="inline-block px-10 py-4 rounded-full bg-[#6B7D56] text-[#E6E4C5] font-black uppercase tracking-widest text-sm select-none transition-all duration-150"
      style={{
        boxShadow:
          "6px 6px 14px rgba(74,90,58,0.55), -4px -4px 10px rgba(255,255,255,0.28), inset 0 1px 1px rgba(255,255,255,0.15)",
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.boxShadow =
          "inset 4px 4px 10px rgba(50,65,38,0.6), inset -2px -2px 6px rgba(255,255,255,0.1)";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.boxShadow =
          "6px 6px 14px rgba(74,90,58,0.55), -4px -4px 10px rgba(255,255,255,0.28), inset 0 1px 1px rgba(255,255,255,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow =
          "6px 6px 14px rgba(74,90,58,0.55), -4px -4px 10px rgba(255,255,255,0.28), inset 0 1px 1px rgba(255,255,255,0.15)";
      }}
    >
      {children}
    </Link>
  );
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#DFE0BF] text-[#1B3B18]">
      <Header />

      {/* ── Hero ── */}
      <div className="relative bg-[#DFE0BF] py-24 px-6 text-center overflow-hidden">
        <Grid />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.5),transparent_55%)]" />

        <Fade className="relative z-10 max-w-3xl mx-auto space-y-6">
          {/* logo */}
          <div className="flex justify-center mb-2">
            <div className="relative w-28 h-28">
              <Image
                src="/assets/features/logo.png"
                alt="Yatra logo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <p className="text-xs font-black uppercase tracking-[0.4em] text-[#1B3B18]/35">
            Features
          </p>
          <h1 className="text-5xl md:text-7xl font-black tracking-[-0.04em] text-[#1B3B18] leading-none">
            Meet Ashta.
          </h1>
          <p className="text-xl md:text-2xl text-[#1B3B18]/60 font-medium max-w-xl mx-auto">
            A story about going from drowning in tabs to navigating with
            purpose.
          </p>
        </Fade>
      </div>

      {/* ── Scene 1: Chaos ── */}
      <Scene
        img="/assets/features/1.png"
        alt="Ashta overwhelmed with 50+ tabs"
        label="Chapter 1 — The Storm"
        text="This was me, Ashta. I had my glasses on, but I still couldn't see a thing through the storm of open tabs and unfinished tutorials. I was drowning in options but starving for a system. My brain felt like a messy jungle. No map. No focus. Just pure, unfiltered panic."
        reverse={false}
      />

      {/* ── Scene 2: Lighthouse ── */}
      <Scene
        img="/assets/features/2.png"
        alt="Lighthouse beacon"
        label="Chapter 2 — The Beacon"
        text="Then, I found a steady beacon: Yatra. It didn't tell me to 'hustle harder.' It told me to breathe. I realized the ocean isn't something to fear — it's something to navigate. I just needed to find my specific current."
        reverse={true}
      />

      {/* ── Scene 3: Toolkit cards ── */}
      <FeatureCards />

      {/* ── Scene 4: Lamp (dark) ── */}
      <Scene
        img="/assets/features/4.png"
        alt="Magic lamp — small wins"
        label="Chapter 4 — Small Wins"
        text="A grand voyage is just a collection of tiny splashes. We celebrate the 'Small Wins' because that's where the growth happens. We don't care how fast you swim — we care that you're moving with intention."
        reverse={false}
        dark={true}
      />

      {/* ── Scene 5: Calm Ashta ── */}
      <Scene
        img="/assets/features/5.png"
        alt="Calm Ashta with tea"
        label="Chapter 5 — Clear Horizon"
        text="And this... is me now. Same ocean, different vibe. I'm still the same Ashta in my glasses, but now I can actually see my path. I performed a 'Tentacle Grab' on my digital footprint and realized I wasn't lost — I just needed a better compass. Now, I don't sweat. I have a mission, a tea, and a clear horizon."
        reverse={true}
      />

      {/* ── CTA ── */}
      <div className="relative bg-[#DFE0BF] py-28 px-6 text-center">
        <Grid />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.4),transparent_60%)]" />

        <Fade className="relative z-10 space-y-4">
          <p className="text-3xl md:text-4xl font-black text-[#1B3B18] tracking-tight">
            Ready to swap your panic for a plan?
          </p>
          <p className="text-lg text-[#1B3B18]/50 font-medium">
            Your shore is waiting.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-6">
            <NeumorphicBtn href="/login">Get Started</NeumorphicBtn>
            <NeumorphicBtn href="/pricing">Explore Plans</NeumorphicBtn>
          </div>
        </Fade>
      </div>
    </div>
  );
}
