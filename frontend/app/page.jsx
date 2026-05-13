"use client";

import { motion } from "framer-motion";
import PricingSection from "@/components/PricingSection";

import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

export default function HomePage() {
  const checklist = [
    "Python",
    "Data Structures",
    "Git & GitHub",
    "System Design",
  ];

  const OctopusBot = () => (
    <div className="fixed bottom-8 right-8 z-[100] hidden md:block group">
      <button className="relative w-28 h-28 rounded-full transition-all duration-500 hover:scale-110 active:scale-95">
        <div className="absolute inset-0 rounded-full bg-white/30 backdrop-blur-3xl border border-white/40 shadow-[0_20px_80px_rgba(0,0,0,0.12),inset_0_2px_10px_rgba(255,255,255,0.5)] group-hover:shadow-[0_25px_100px_rgba(211,84,0,0.25)] transition-all duration-500" />

        <div className="absolute inset-2 rounded-full bg-gradient-to-b from-[#ffcca8] via-[#f39b7c] to-[#ef7d63] overflow-hidden flex items-center justify-center">
          <div className="absolute top-5 left-5 w-4 h-4 rounded-full bg-[#1B3B18]" />
          <div className="absolute top-5 right-5 w-4 h-4 rounded-full bg-[#1B3B18]" />

          <div className="absolute top-6 left-6 w-2 h-2 rounded-full bg-white" />
          <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-white" />

          <div className="absolute top-10 w-6 h-[3px] rounded-full bg-[#b45a4a]" />

          <div className="absolute bottom-2 left-1 w-7 h-7 border-4 border-[#ef9a7f] rounded-full border-t-transparent rotate-12" />
          <div className="absolute bottom-2 right-1 w-7 h-7 border-4 border-[#ef9a7f] rounded-full border-t-transparent -rotate-12" />
          <div className="absolute bottom-0 left-7 w-6 h-8 border-4 border-[#ef9a7f] rounded-full border-t-transparent" />
          <div className="absolute bottom-0 right-7 w-6 h-8 border-4 border-[#ef9a7f] rounded-full border-t-transparent" />
        </div>

        <div className="absolute -inset-2 rounded-full bg-[#D35400]/20 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
      </button>

      <div className="absolute bottom-32 right-0 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 pointer-events-none">
        <div className="px-5 py-3 rounded-2xl bg-white/40 backdrop-blur-2xl border border-white/30 text-[#1B3B18] text-sm font-medium whitespace-nowrap shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
          Hi, explorer ✨ Need guidance?
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#E9E6D1] text-[#1B3B18] overflow-x-hidden font-sans relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.5),transparent_40%)] pointer-events-none" />
      <Header />

      <main>
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.35),transparent)]" />
          <div className="absolute inset-0 pointer-events-none opacity-50">
            <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-[#FAD7A0]/20 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#2D5A27]/10 blur-3xl" />
          </div>

          <div className="relative z-10 text-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h1 className="text-[4rem] sm:text-[6rem] md:text-[8rem] font-black tracking-[-0.08em] text-[#1B3B18] leading-none">
                STAND OUT
              </h1>

              <div className="mx-auto max-w-xl rounded-[2rem] border border-white/20 bg-white/20 backdrop-blur-3xl supports-[backdrop-filter]:bg-white/15 shadow-[0_10px_60px_rgba(255,255,255,0.15),0_8px_32px_rgba(31,38,135,0.08),inset_0_1px_1px_rgba(255,255,255,0.4)] px-8 py-6">
                <p className="text-lg sm:text-xl text-[#1B3B18]/90 font-medium">
                  Close the Gap. Build Your Future.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="absolute top-[20%] left-[15%] w-40 h-40 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-[20%] right-[10%] w-52 h-52 rounded-full bg-[#D35400]/10 blur-3xl" />
        </section>

        <section className="relative py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Your Expedition Kit
              </h2>
              <p className="text-lg text-[#1B3B18]/70">
                Four powerful tools - one unforgettable journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
              <div className="rounded-[2rem] border border-white/20 bg-white/20 backdrop-blur-3xl supports-[backdrop-filter]:bg-white/15 shadow-[0_10px_60px_rgba(255,255,255,0.15),0_8px_32px_rgba(31,38,135,0.08),inset_0_1px_1px_rgba(255,255,255,0.4)] p-8 min-h-[360px] flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-white/30 border border-white/40 backdrop-blur-xl flex items-center justify-center mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-7 h-7 text-[#2D5A27]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>

                  <h3 className="text-2xl font-semibold mb-6">
                    Skill Checklist
                  </h3>

                  <div className="space-y-5">
                    {checklist.map((item) => (
                      <div key={item} className="flex items-center gap-4">
                        <div className="w-5 h-5 rounded-md bg-[#2D5A27] flex items-center justify-center shrink-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-3 h-3 text-[#E9E6D1]"
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
                        </div>
                        <span className="text-[#1B3B18]/80 font-medium">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/20 bg-white/20 backdrop-blur-3xl supports-[backdrop-filter]:bg-white/15 shadow-[0_10px_60px_rgba(255,255,255,0.15),0_8px_32px_rgba(31,38,135,0.08),inset_0_1px_1px_rgba(255,255,255,0.4)] p-8 min-h-[360px]">
                <div className="w-14 h-14 rounded-2xl bg-white/30 border border-white/40 backdrop-blur-xl flex items-center justify-center mb-6">
                  <svg viewBox="0 0 100 100" className="w-8 h-8" fill="none">
                    <polygon
                      points="50,10 90,35 75,85 25,85 10,35"
                      stroke="#D35400"
                      strokeWidth="5"
                    />
                  </svg>
                </div>

                <h3 className="text-2xl font-semibold mb-8">Skill Radar</h3>

                <div className="flex items-center justify-center h-[220px]">
                  <svg viewBox="0 0 300 300" className="w-full h-full">
                    <polygon
                      points="150,40 245,95 220,220 80,220 55,95"
                      fill="none"
                      stroke="#1B3B18"
                      strokeOpacity="0.15"
                      strokeWidth="2"
                    />
                    <polygon
                      points="150,70 220,110 200,200 100,200 80,110"
                      fill="none"
                      stroke="#1B3B18"
                      strokeOpacity="0.12"
                      strokeWidth="2"
                    />
                    <polygon
                      points="150,95 195,125 180,180 120,180 105,125"
                      fill="rgba(45,90,39,0.18)"
                      stroke="#2D5A27"
                      strokeWidth="3"
                    />
                    <line
                      x1="150"
                      y1="40"
                      x2="150"
                      y2="220"
                      stroke="#1B3B18"
                      strokeOpacity="0.1"
                    />
                    <line
                      x1="55"
                      y1="95"
                      x2="245"
                      y2="95"
                      stroke="#1B3B18"
                      strokeOpacity="0.1"
                    />
                  </svg>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/20 bg-white/20 backdrop-blur-3xl supports-[backdrop-filter]:bg-white/15 shadow-[0_10px_60px_rgba(255,255,255,0.15),0_8px_32px_rgba(31,38,135,0.08),inset_0_1px_1px_rgba(255,255,255,0.4)] p-8 min-h-[360px]">
                <div className="w-14 h-14 rounded-2xl bg-white/30 border border-white/40 backdrop-blur-xl flex items-center justify-center mb-6">
                  <div className="w-7 h-7 rounded-md border-2 border-[#D35400]" />
                </div>

                <h3 className="text-2xl font-semibold mb-8">90-Day Roadmap</h3>

                <div className="space-y-8 pt-4">
                  {[
                    { month: "Month 1", width: "w-1/3" },
                    { month: "Month 2", width: "w-2/3" },
                    { month: "Month 3", width: "w-full" },
                  ].map((item) => (
                    <div key={item.month}>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium text-[#1B3B18]/80">
                          {item.month}
                        </span>
                      </div>
                      <div className="h-4 rounded-full bg-[#1B3B18]/10 overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-[#D35400] ${item.width}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/20 bg-white/20 backdrop-blur-3xl supports-[backdrop-filter]:bg-white/15 shadow-[0_10px_60px_rgba(255,255,255,0.15),0_8px_32px_rgba(31,38,135,0.08),inset_0_1px_1px_rgba(255,255,255,0.4)] p-8 min-h-[360px]">
                <div className="w-14 h-14 rounded-2xl bg-white/30 border border-white/40 backdrop-blur-xl flex items-center justify-center mb-6">
                  <div className="w-3 h-3 rounded-full bg-[#2D5A27]" />
                </div>

                <h3 className="text-2xl font-semibold mb-8">
                  AI Career Mentor
                </h3>

                <div className="space-y-5">
                  <div className="bg-white/40 rounded-2xl px-5 py-4 text-sm text-[#1B3B18]/80 max-w-[90%]">
                    Focus on backend fundamentals this week.
                  </div>
                  <div className="bg-[#2D5A27] text-[#E9E6D1] rounded-2xl px-5 py-4 text-sm ml-auto max-w-[80%]">
                    Got it, what should I build next?
                  </div>
                  <div className="bg-white/40 rounded-2xl px-5 py-4 text-sm text-[#1B3B18]/80 max-w-[90%]">
                    A portfolio API with authentication.
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-3 rounded-full border border-[#1B3B18]/10 bg-white/20 px-4 py-3">
                  <div className="flex-1 text-sm text-[#1B3B18]/40">
                    Ask your mentor...
                  </div>
                  <button className="w-10 h-10 rounded-full bg-[#D35400] flex items-center justify-center text-white shadow-lg shadow-[#D35400]/30 hover:scale-105 transition-all duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 12h14"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <OctopusBot />

        <section className="relative py-32 px-6 border-t border-[#1B3B18]/5 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.35),transparent_45%)]" />

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto relative z-10"
          >
            <div className="text-center mb-20">
              <p className="uppercase tracking-[0.35em] text-sm text-[#1B3B18]/50 mb-4">
                Success Stories
              </p>
              <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-6 text-[#1B3B18]">
                Students Who <span className="text-[#D35400]">Stood Out</span>
              </h2>
              <p className="text-lg text-[#1B3B18]/70 max-w-2xl mx-auto">
                Real transformations from ambitious learners building their
                dream careers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Ariana",
                  role: "Frontend Engineer at Nova",
                  quote: "The roadmap completely changed how I learn.",
                  accent: "from-[#ffdcc8] to-[#f5b495]",
                },
                {
                  name: "Daniel",
                  role: "Backend Intern at Atlas",
                  quote: "The AI mentor pushed me into real projects.",
                  accent: "from-[#d8efd2] to-[#9dcf95]",
                },
                {
                  name: "Mika",
                  role: "Data Analyst at Zenith",
                  quote: "I finally understood my actual skill gaps.",
                  accent: "from-[#ffe2bf] to-[#f4b67d]",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.15 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="rounded-[2rem] border border-white/30 bg-white/20 backdrop-blur-3xl shadow-[0_10px_60px_rgba(255,255,255,0.15),0_8px_32px_rgba(31,38,135,0.08)] p-8 relative overflow-hidden"
                >
                  <div
                    className={`absolute inset-0 opacity-20 bg-gradient-to-br ${item.accent}`}
                  />
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/30 flex items-center justify-center text-xl font-bold text-[#1B3B18] mb-6">
                      {item.name.charAt(0)}
                    </div>
                    <p className="text-lg leading-relaxed text-[#1B3B18]/80 mb-8">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                    <div>
                      <h3 className="text-xl font-semibold text-[#1B3B18]">
                        {item.name}
                      </h3>
                      <p className="text-sm text-[#1B3B18]/50 mt-1">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <PricingSection />
      </main>

      <Footer />

      <style>{`
        html { scroll-behavior: smooth; }

        @keyframes wave {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes waveReverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
      `}</style>
    </div>
  );
}
