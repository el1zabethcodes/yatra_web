"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Waves,
  Compass,
  Anchor,
  Zap,
  Send,
  Map as MapIcon,
  Loader2,
  Sparkles,
  Gift,
  Users,
  HelpCircle,
} from "lucide-react";
import YatraZenSection from "@/components/YatraZenSection";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

async function chatWithGuide(userMessage, chatHistory) {
  try {
    const res = await fetch("/api/groq/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userMessage, chatHistory }),
    });

    let data;
    try {
      data = await res.json();
    } catch {
      return "The horizon is foggy. Let's try again in a moment.";
    }

    if (!res.ok) {
      return (
        (typeof data.error === "string" && data.error) ||
        "We've hit a small reef. Give me a second to fix the sails!"
      );
    }

    if (typeof data.text === "string" && data.text.length > 0) {
      return data.text;
    }

    return "The horizon is foggy. Let's try again in a moment.";
  } catch (error) {
    console.error("Navigation error:", error);
    return "We've hit a small reef. Give me a second to fix the sails!";
  }
}

async function generateAIRoadmap(goal) {
  try {
    const res = await fetch("/api/groq/roadmap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ goal }),
    });

    let data;
    try {
      data = await res.json();
    } catch {
      throw new Error("The horizon is foggy. Let's try again in a moment.");
    }

    if (data.roadmap) return data.roadmap;

    if (typeof data.error === "string") {
      throw new Error(data.error);
    }

    if (!res.ok) {
      throw new Error(data.error || "Roadmap request failed");
    }

    throw new Error("The horizon is foggy. Let's try again in a moment.");
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error(
      "We've hit a small reef. Give me a second to fix the sails!",
    );
  }
}

const tiers = [
  {
    title: "The Beachcomber",
    price: "Free",
    interval: null,
    icon: Waves,
    description: "7-Day Trial. Dip your toes into the water.",
    features: [
      "1 Full Tentacle Grab scan",
      "Static Skill Radar visualization",
      "7-Day Starter Roadmap",
      "Basic AI Mentor access",
    ],
    buttonText: "Dip your toes",
    isFeatured: false,
  },
  {
    title: "The Wayfinder",
    price: "₹999",
    interval: "month",
    icon: Compass,
    description: "Catch the current and sail with intention.",
    features: [
      "Unlimited Tentacle Grabs",
      "Interactive 30-Day Roadmap",
      "Personal AI Career Mentor 24/7",
      "Small Wins & Milestone tracking",
      "Priority roadmap adjustments",
    ],
    buttonText: "Catch the current",
    isFeatured: true,
  },
  {
    title: "The Legend",
    price: "₹7999",
    interval: "year",
    icon: Anchor,
    description: "Become a master of the tech ocean.",
    features: [
      "Everything in Wayfinder",
      "Deep Code Architecture Insight",
      "Yatra Navigator Certificate",
      "Career Scouting & Partner access",
      "Lifetime access to community",
    ],
    buttonText: "Own the Ocean",
    isFeatured: false,
  },
];

function PricingCard({
  title,
  price,
  interval,
  description,
  features,
  buttonText,
  isFeatured,
  icon: Icon,
  className,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className={cn(
        "relative flex flex-col p-8 rounded-[32px] backdrop-blur-md transition-all duration-500",
        isFeatured
          ? "bg-white/40 border-2 border-[#D35400]/40 shadow-2xl shadow-[#D35400]/10 scale-105 z-10"
          : "bg-white/20 border border-white/30 hover:border-white/60",
        className,
      )}
    >
      {isFeatured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#D35400] text-[#FFF9E3] px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
          Most Chosen
        </div>
      )}
      <div className="mb-8 text-center">
        <div
          className={cn(
            "w-12 h-12 mx-auto mb-4 rounded-2xl flex items-center justify-center",
            isFeatured
              ? "bg-[#D35400] text-[#FFF9E3]"
              : "bg-[#1B3B18] text-[#FFF9E3]",
          )}
        >
          <Icon size={24} />
        </div>
        <h3 className="text-2xl font-black text-[#1B3B18] uppercase tracking-tight mb-2">
          {title}
        </h3>
        <div className="flex items-baseline justify-center gap-1 mb-2">
          <span className="text-4xl font-black text-[#1B3B18]">{price}</span>
          {interval && (
            <span className="text-sm font-bold text-[#1B3B18]/40">
              /{interval}
            </span>
          )}
        </div>
        <p className="text-sm text-[#1B3B18]/70 font-medium italic leading-relaxed">
          &ldquo;{description}&rdquo;
        </p>
      </div>
      <ul className="space-y-4 mb-10 flex-grow">
        {features.map((feature, i) => (
          <motion.li
            key={feature}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-start gap-3 text-sm font-semibold text-[#1B3B18]/80"
          >
            <div className="mt-1 p-0.5 rounded-full bg-[#2D5A27]/10">
              <Check size={14} className="text-[#2D5A27] stroke-[3px]" />
            </div>
            {feature}
          </motion.li>
        ))}
      </ul>
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "w-full py-4 rounded-2xl font-black text-sm uppercase tracking-wider transition-all shadow-md",
          isFeatured
            ? "bg-[#D35400] text-[#FFF9E3] hover:bg-[#b04600] shadow-[#D35400]/20"
            : "bg-[#1B3B18] text-[#FFF9E3] hover:bg-[#2D5A27] shadow-[#1B3B18]/10",
        )}
      >
        {buttonText}
      </motion.button>
    </motion.div>
  );
}

function NavigatorsLab() {
  const [activeTab, setActiveTab] = useState("mentor");
  const [goal, setGoal] = useState("");
  const [roadmap, setRoadmap] = useState(null);
  const [chat, setChat] = useState([
    {
      role: "model",
      text: "Ahoy! Not sure which current to catch? Ask me anything about our plans, and I'll find the perfect voyage for you.",
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [chat, loading]);

  const handleGenerateRoadmap = async (e) => {
    e.preventDefault();
    if (!goal.trim()) return;
    setLoading(true);
    try {
      const res = await generateAIRoadmap(goal);
      setRoadmap(res);
    } catch (err) {
      console.error(err);
      setRoadmap(null);
      alert(err?.message || "Could not generate roadmap.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    const priorHistory = chat.filter(
      (m) => m.role === "user" || m.role === "model",
    );
    const newHistory = [...priorHistory, { role: "user", text: userInput }];
    setChat(newHistory);
    const messageSent = userInput;
    setUserInput("");
    setLoading(true);
    try {
      const historyForApi = priorHistory.map(({ role, text }) => ({
        role,
        text,
      }));
      const responseText = await chatWithGuide(messageSent, historyForApi);
      setChat([
        ...newHistory,
        {
          role: "model",
          text:
            responseText ||
            "Sorry, I could not reach the guide. Check DEEPSEEK_API_KEY in .env.local.",
        },
      ]);
    } catch (err) {
      console.error(err);
      setChat([
        ...newHistory,
        {
          role: "model",
          text:
            err?.message ||
            "Something went wrong. Configure DEEPSEEK_API_KEY in .env.local.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-32 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-[#1B3B18] mb-4">
          Navigator&apos;s Lab
        </h2>
        <p className="text-[#1B3B18]/60 font-medium italic">
          Experience the power of Yatra before you commit.
        </p>
      </div>

      <div className="bg-white/30 backdrop-blur-xl border border-white/40 rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[550px]">
        <div className="w-full md:w-64 bg-[#1B3B18] p-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => setActiveTab("mentor")}
            className={cn(
              "flex items-center gap-3 px-4 py-4 rounded-2xl transition-all font-bold text-sm outline-none focus:outline-none",
              activeTab === "mentor"
                ? "bg-[#D35400] text-white shadow-lg shadow-[#D35400]/20"
                : "bg-white/5 text-white/50 hover:bg-white/10",
            )}
          >
            <HelpCircle size={20} /> Expedition Guide
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("roadmap")}
            className={cn(
              "flex items-center gap-3 px-4 py-4 rounded-2xl transition-all font-bold text-sm outline-none focus:outline-none",
              activeTab === "roadmap"
                ? "bg-[#D35400] text-white shadow-lg shadow-[#D35400]/20"
                : "bg-white/5 text-white/50 hover:bg-white/10",
            )}
          >
            <MapIcon size={20} /> Preview Roadmap
          </button>
        </div>

        <div className="flex-grow p-8 bg-white/20 flex flex-col">
          {activeTab === "mentor" ? (
            <div className="flex flex-col h-full min-h-[420px]">
              <div className="mb-4 pb-4 border-b border-[#1B3B18]/10">
                <h3 className="font-black text-[#1B3B18] uppercase text-xs tracking-widest">
                  Plan Assistant
                </h3>
                <p className="text-[10px] text-[#1B3B18]/50 font-bold">
                  Ask about pricing, features, or which plan suits you best.
                </p>
              </div>
              <div
                ref={scrollRef}
                className="flex-grow space-y-4 overflow-y-auto mb-6 pr-4 custom-scrollbar min-h-[200px]"
              >
                {chat.map((msg, i) => (
                  <div
                    key={`${msg.role}-${i}-${msg.text?.slice(0, 12)}`}
                    className={cn(
                      "flex",
                      msg.role === "user" ? "justify-end" : "justify-start",
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] p-4 rounded-2xl font-bold text-sm shadow-sm",
                        msg.role === "user"
                          ? "bg-[#D35400] text-white rounded-tr-none"
                          : "bg-white/60 text-[#1B3B18] border border-white rounded-tl-none",
                      )}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-white/60 p-4 rounded-2xl rounded-tl-none animate-pulse">
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 bg-[#1B3B18]/40 rounded-full animate-bounce" />
                        <div className="w-1.5 h-1.5 bg-[#1B3B18]/40 rounded-full animate-bounce [animation-delay:75ms]" />
                        <div className="w-1.5 h-1.5 bg-[#1B3B18]/40 rounded-full animate-bounce [animation-delay:150ms]" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <form onSubmit={handleSendMessage} className="relative">
                <input
                  type="text"
                  placeholder="Which plan is best for a React developer?"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl bg-white/50 border border-white/60 focus:ring-2 focus:ring-[#D35400] outline-none font-bold text-[#1B3B18]"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="absolute right-2 top-2 p-3 bg-[#1B3B18] text-white rounded-xl hover:bg-[#2D5A27] transition-all disabled:opacity-50"
                >
                  <Send size={20} />
                </button>
              </form>
            </div>
          ) : (
            <div className="flex flex-col h-full min-h-[420px]">
              {!roadmap ? (
                <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
                  <div className="w-16 h-16 bg-[#D35400]/10 rounded-full flex items-center justify-center mb-6">
                    <Sparkles size={28} className="text-[#D35400]" />
                  </div>
                  <h3 className="text-2xl font-black text-[#1B3B18] mb-2">
                    Roadmap Preview
                  </h3>
                  <p className="text-[#1B3B18]/60 mb-8 max-w-sm text-sm">
                    Wayfinders get full access. Preview a sample 30-day journey
                    here.
                  </p>
                  <form
                    onSubmit={handleGenerateRoadmap}
                    className="w-full max-w-md relative"
                  >
                    <input
                      type="text"
                      placeholder="e.g. Master React..."
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                      className="w-full px-6 py-4 rounded-2xl bg-white/50 border border-white/60 focus:ring-2 focus:ring-[#D35400] outline-none font-bold text-[#1B3B18] pr-28"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="absolute right-2 top-2 h-12 px-6 bg-[#1B3B18] text-white rounded-xl font-bold flex items-center gap-2 hover:bg-[#2D5A27] transition-all disabled:opacity-50"
                    >
                      {loading ? (
                        <Loader2 className="animate-spin" size={18} />
                      ) : (
                        "Preview"
                      )}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="space-y-6 overflow-y-auto custom-scrollbar pr-2">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-xl font-black text-[#1B3B18]">
                      {roadmap.roadmapTitle}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setRoadmap(null)}
                      className="text-[#D35400] font-bold text-xs underline shrink-0"
                    >
                      Back
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {roadmap.waves?.map((wave) => (
                      <div
                        key={wave.week}
                        className="bg-white/40 border border-white/60 p-4 rounded-2xl"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[8px] bg-[#1B3B18] text-white px-2 py-0.5 rounded-full font-black uppercase">
                            Week {wave.week}
                          </span>
                          <span className="text-xs font-black text-[#1B3B18] truncate">
                            {wave.theme}
                          </span>
                        </div>
                        <ul className="space-y-1">
                          {wave.milestones?.map((m, idx) => (
                            <li
                              key={`${wave.week}-${idx}`}
                              className="flex items-center gap-2 text-[10px] font-bold text-[#1B3B18]/70"
                            >
                              <div className="w-1 h-1 bg-[#D35400] rounded-full shrink-0" />{" "}
                              {m}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function YatraPricing() {
  return (
    <div className="min-h-screen bg-[#DFE0BF] font-sans selection:bg-[#D35400] selection:text-white pb-24">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#2D5A27]/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#D35400]/5 blur-[120px]" />
      </div>

      <section className="relative py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B3B18]/10 text-[#1B3B18] text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Zap size={14} fill="currentColor" />
            Pricing Plans
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black text-[#1B3B18] mb-6 tracking-tighter">
            Choose Your <span className="text-[#D35400]">Current</span>
          </h2>
          <p className="text-[#1B3B18]/60 text-lg font-medium italic max-w-2xl mx-auto">
            &ldquo;Every legend starts with a single wave. Chart your path
            through the digital depths with a plan that fits your
            ambition.&rdquo;
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-4">
          {tiers.map((tier) => (
            <PricingCard key={tier.title} {...tier} />
          ))}
        </div>

        <NavigatorsLab />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 p-12 rounded-[48px] bg-[#1B3B18] text-[#FFF9E3] relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D35400]/10 rounded-full blur-[80px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#2D5A27]/20 rounded-full blur-[60px] -ml-24 -mb-24" />
          <div className="relative z-10 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
              Ready to Set Sail?
            </h2>
            <p className="text-[#FFF9E3]/70 font-medium text-lg max-w-xl mb-10">
              Not sure which current to catch?{" "}
              <span className="text-[#FFF9E3] font-bold">
                Start with a free 7-day trial
              </span>{" "}
              and explore the horizons risk-free.
            </p>
            <div className="flex flex-col md:flex-row gap-4 w-full justify-center items-center">
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-[#D35400] text-[#FFF9E3] rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-[#D35400]/20 hover:bg-[#b04600] transition-colors"
              >
                Start Your Expedition
              </motion.button>
              <div className="flex gap-4 flex-wrap justify-center">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-5 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold text-sm flex items-center gap-2 border border-white/10 backdrop-blur-sm transition-all"
                >
                  <Gift size={18} />
                  Gift a Voyage
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-5 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold text-sm flex items-center gap-2 border border-white/10 backdrop-blur-sm transition-all"
                >
                  <Users size={18} />
                  For Universities &amp; Clubs
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <YatraZenSection />

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(27, 59, 24, 0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(27, 59, 24, 0.2); }
      `}</style>
    </div>
  );
}
