"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

/* ─── tiny fade-in helper ─── */
const Fade = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.65, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ─── Scene row: image left / right alternating ─── */
function Scene({ img, alt, text, reverse = false, dark = false }) {
  return (
    <div
      className={`relative py-20 px-6 ${
        dark ? "bg-[#1B2A14]" : "bg-[#F2F0D8]"
      }`}
    >
      {/* subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(#E2E0C8 1px,transparent 1px),linear-gradient(90deg,#E2E0C8 1px,transparent 1px)",
          backgroundSize: "48px 48px",
          opacity: dark ? 0.06 : 0.55,
        }}
      />

      <div
        className={`relative z-10 max-w-5xl mx-auto flex flex-col gap-12 items-center ${
          reverse ? "md:flex-row-reverse" : "md:flex-row"
        }`}
      >
        {/* image */}
        <Fade delay={0} className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-72 h-72 md:w-80 md:h-80">
            <Image
              src={img}
              alt={alt}
              fill
              className="object-contain drop-shadow-2xl"
            />
          </div>
        </Fade>

        {/* text */}
        <Fade delay={0.15} className="w-full md:w-1/2">
          <p
            className={`text-lg md:text-xl font-medium leading-relaxed ${
              dark ? "text-[#E6E4C5]/80" : "text-[#1B3B18]/75"
            }`}
          >
            {text}
          </p>
        </Fade>
      </div>
    </div>
  );
}

/* ─── Feature cards from scene 3 ─── */
function FeatureCards() {
  const cards = [
    {
      icon: "📋",
      title: "Skill Checklist",
      items: ["Python", "Data Structures", "Git & GitHub", "SQL", "Problem Solving", "System Design"],
      footer: "6/6 Completed",
      bar: true,
    },
    {
      icon: "📡",
      title: "Skill Radar",
      radar: true,
    },
    {
      icon: "📅",
      title: "7-Day Intensive Roadmap",
      roadmap: [
        { day: "Day 1", label: "Python Core Refresh", pct: 95 },
        { day: "Day 2", label: "Advanced Data Structures", pct: 80 },
        { day: "Day 3", label: "Key Algorithm Techniques", pct: 75 },
        { day: "Day 4", label: "System Design Essentials", pct: 70 },
        { day: "Day 5", label: "SQL Masterclass", pct: 85 },
        { day: "Day 6", label: "Architectural Patterns", pct: 60 },
        { day: "Day 7", label: "Final Build & Practice", pct: 40 },
      ],
    },
    {
      icon: "💬",
      title: "AI Career Mentor",
      chat: true,
    },
  ];

  return (
    <div className="relative bg-[#F2F0D8] py-20 px-6">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(#E2E0C8 1px,transparent 1px),linear-gradient(90deg,#E2E0C8 1px,transparent 1px)",
          backgroundSize: "48px 48px",
          opacity: 0.55,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <Fade className="mb-12">
          <div className="flex justify-center">
            <div className="relative w-24 h-24 mb-4">
              <Image
                src="/assets/features/3.png"
                alt="Toolkit"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <p className="text-center text-lg md:text-xl font-medium text-[#1B3B18]/75 max-w-2xl mx-auto">
            Yatra turned my chaos into an algorithm. Progress isn&apos;t about how
            many arms you have; it&apos;s about having the right tools in them.
          </p>
        </Fade>

        <Fade delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {cards.map((card) => (
              <div
                key={card.title}
                className="rounded-3xl bg-[#F9F8EB] border border-[#E2E0C8] p-5 flex flex-col gap-3 shadow-sm"
              >
                {/* header */}
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{card.icon}</span>
                  <h4 className="text-sm font-black text-[#1B3B18] leading-tight">
                    {card.title}
                  </h4>
                </div>

                {/* checklist */}
                {card.items && (
                  <>
                    <ul className="space-y-2 flex-1">
                      {card.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-[#1B3B18]/80">
                          <span className="w-5 h-5 rounded-md bg-[#6B7D56] flex items-center justify-center shrink-0">
                            <svg className="w-3 h-3 text-[#E6E4C5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    {card.bar && (
                      <div className="mt-2">
                        <div className="h-2 rounded-full bg-[#E2E0C8] overflow-hidden">
                          <div className="h-full w-full rounded-full bg-gradient-to-r from-[#6B7D56] to-[#4a5a3a]" />
                        </div>
                        <p className="text-[11px] text-[#6B7D56] font-bold mt-1.5">{card.footer}</p>
                      </div>
                    )}
                  </>
                )}

                {/* radar */}
                {card.radar && (
                  <div className="flex items-center justify-center flex-1 py-2">
                    <svg viewBox="0 0 220 220" className="w-full max-w-[180px]">
                      {/* grid polygons */}
                      {[0.33, 0.66, 1].map((scale, i) => (
                        <polygon
                          key={i}
                          points={[0,1,2,3,4].map((j) => {
                            const a = (j * 72 - 90) * (Math.PI / 180);
                            const r = 80 * scale;
                            return `${110 + r * Math.cos(a)},${110 + r * Math.sin(a)}`;
                          }).join(" ")}
                          fill="none"
                          stroke="#C8C6A8"
                          strokeWidth="1"
                        />
                      ))}
                      {/* axes */}
                      {[0,1,2,3,4].map((j) => {
                        const a = (j * 72 - 90) * (Math.PI / 180);
                        return (
                          <line
                            key={j}
                            x1="110" y1="110"
                            x2={110 + 80 * Math.cos(a)}
                            y2={110 + 80 * Math.sin(a)}
                            stroke="#C8C6A8" strokeWidth="1"
                          />
                        );
                      })}
                      {/* filled area */}
                      <polygon
                        points={[0.85, 0.7, 0.6, 0.75, 0.9].map((v, j) => {
                          const a = (j * 72 - 90) * (Math.PI / 180);
                          const r = 80 * v;
                          return `${110 + r * Math.cos(a)},${110 + r * Math.sin(a)}`;
                        }).join(" ")}
                        fill="rgba(107,125,86,0.25)"
                        stroke="#6B7D56"
                        strokeWidth="2"
                      />
                      {/* dots */}
                      {[0.85, 0.7, 0.6, 0.75, 0.9].map((v, j) => {
                        const a = (j * 72 - 90) * (Math.PI / 180);
                        return (
                          <circle
                            key={j}
                            cx={110 + 80 * v * Math.cos(a)}
                            cy={110 + 80 * v * Math.sin(a)}
                            r="4" fill="#6B7D56"
                          />
                        );
                      })}
                      {/* labels */}
                      {["Coding","DSA","System Design","Tools","SQL"].map((lbl, j) => {
                        const a = (j * 72 - 90) * (Math.PI / 180);
                        return (
                          <text
                            key={lbl}
                            x={110 + 96 * Math.cos(a)}
                            y={110 + 96 * Math.sin(a)}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="10"
                            fill="#1B3B18"
                            fontWeight="600"
                          >
                            {lbl}
                          </text>
                        );
                      })}
                    </svg>
                  </div>
                )}

                {/* roadmap */}
                {card.roadmap && (
                  <ul className="space-y-2 flex-1">
                    {card.roadmap.map(({ day, label, pct }) => (
                      <li key={day} className="text-[11px] text-[#1B3B18]/80">
                        <div className="flex justify-between mb-0.5">
                          <span><strong>{day}:</strong> {label}</span>
                          <span className="text-[#6B7D56] font-bold">~{pct}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-[#E2E0C8] overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[#6B7D56]"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                {/* chat */}
                {card.chat && (
                  <div className="flex flex-col gap-2 flex-1">
                    <div className="bg-[#E2E0C8] rounded-2xl rounded-tl-none px-4 py-2.5 text-sm text-[#1B3B18]/80 max-w-[90%]">
                      Hi! How can I help you today?
                    </div>
                    <div className="bg-[#6B7D56] rounded-2xl rounded-tr-none px-4 py-2.5 text-sm text-[#E6E4C5] max-w-[85%] self-end">
                      What should I focus on next?
                    </div>
                    <div className="bg-[#E2E0C8] rounded-2xl rounded-tl-none px-4 py-2.5 text-sm text-[#1B3B18]/80 max-w-[90%]">
                      Focus on DSA patterns and solve 20 problems this week.
                    </div>
                    <div className="mt-auto flex items-center gap-2 rounded-2xl border border-[#E2E0C8] bg-[#F2F0D8] px-4 py-2">
                      <span className="flex-1 text-xs text-[#1B3B18]/30">Type your message...</span>
                      <svg className="w-4 h-4 text-[#6B7D56]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Fade>
      </div>
    </div>
  );
}

/* ─── Neumorphic CTA buttons ─── */
function NeumorphicButton({ children, href, primary = false }) {
  return (
    <Link
      href={href}
      className={`
        inline-block px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm
        transition-all duration-150 select-none
        ${primary
          ? "bg-[#6B7D56] text-[#E6E4C5]"
          : "bg-[#6B7D56] text-[#E6E4C5]"
        }
      `}
      style={{
        boxShadow: "6px 6px 14px rgba(74,90,58,0.55), -4px -4px 10px rgba(255,255,255,0.25), inset 0 1px 1px rgba(255,255,255,0.15)",
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.boxShadow =
          "inset 4px 4px 10px rgba(50,65,38,0.6), inset -2px -2px 6px rgba(255,255,255,0.1)";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.boxShadow =
          "6px 6px 14px rgba(74,90,58,0.55), -4px -4px 10px rgba(255,255,255,0.25), inset 0 1px 1px rgba(255,255,255,0.15)";
      }}
    >
      {children}
    </Link>
  );
}

/* ─── Main export ─── */
export default function FeaturesSection() {
  return (
    <section id="features">

      {/* Scene 1 — Chaos */}
      <Scene
        img="/assets/features/1.png"
        alt="Ashta overwhelmed"
        text="This was me, Ashta. I had my glasses on, but I still couldn't see a thing through the storm of open tabs and unfinished tutorials. I was drowning in options but starving for a system. My brain felt like a messy jungle. No map. No focus. Just pure, unfiltered panic."
        reverse={false}
      />

      {/* Scene 2 — Lighthouse */}
      <Scene
        img="/assets/features/2.png"
        alt="Lighthouse beacon"
        text="Then, I found a steady beacon: Yatra. It didn't tell me to 'hustle harder.' It told me to breathe. I realized the ocean isn't something to fear — it's something to navigate. I just needed to find my specific current."
        reverse={true}
      />

      {/* Scene 3 — Toolkit cards (full-width) */}
      <FeatureCards />

      {/* Scene 4 — Lamp (dark bg) */}
      <Scene
        img="/assets/features/4.png"
        alt="Magic lamp"
        text="A grand voyage is just a collection of tiny splashes. We celebrate the 'Small Wins' because that's where the growth happens. We don't care how fast you swim — we care that you're moving with intention."
        reverse={false}
        dark={true}
      />

      {/* Scene 5 — Calm Ashta */}
      <Scene
        img="/assets/features/5.png"
        alt="Calm Ashta with tea"
        text="And this... is me now. Same ocean, different vibe. I'm still the same Ashta in my glasses, but now I can actually see my path. I performed a 'Tentacle Grab' on my digital footprint and realized I wasn't lost — I just needed a better compass. Now, I don't sweat. I have a mission, a tea, and a clear horizon."
        reverse={true}
      />

      {/* CTA */}
      <div className="relative bg-[#F2F0D8] py-24 px-6 text-center">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(#E2E0C8 1px,transparent 1px),linear-gradient(90deg,#E2E0C8 1px,transparent 1px)",
            backgroundSize: "48px 48px",
            opacity: 0.55,
          }}
        />
        <Fade className="relative z-10">
          <p className="text-2xl md:text-3xl font-black text-[#1B3B18] mb-3 tracking-tight">
            Ready to swap your panic for a plan?
          </p>
          <p className="text-[#1B3B18]/55 font-medium mb-10 text-lg">
            Your shore is waiting.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <NeumorphicButton href="/login">Get Started</NeumorphicButton>
            <NeumorphicButton href="/pricing">Explore Plans</NeumorphicButton>
          </div>
        </Fade>
      </div>

    </section>
  );
}
