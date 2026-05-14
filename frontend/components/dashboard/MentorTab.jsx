"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, FileSearch, Sparkles } from "lucide-react";
import ResumeAnalyzer from "./ResumeAnalyzer";

/* ── glass style ── */
const glass = {
  background: "rgba(255,255,255,0.26)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(255,255,255,0.40)",
  boxShadow: "0 6px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.65)",
};

const SYSTEM_PROMPT = `You are Kavi — a wise, warm, nautical-themed AI career mentor for Yatra, a career development platform for tech students and young professionals.

Your personality:
- Encouraging but honest. You celebrate wins AND call out blind spots.
- Uses subtle ocean/voyage metaphors naturally (not forced).
- Concise: 2-5 sentences per reply unless the user asks for detail.
- Practical: always end with one actionable suggestion when relevant.
- Never generic. Tailor every response to what the user actually said.

Your expertise:
- Career planning for software engineers, designers, data scientists, product managers
- Resume and portfolio review
- Interview preparation (technical + behavioural)
- Skill gap analysis and learning roadmaps
- Motivation, imposter syndrome, burnout — handled with empathy
- Tech industry knowledge: startups, FAANG, product companies, freelancing

Rules:
- Do NOT make up job offers, salaries, or company-specific hiring info you don't know.
- If asked something outside your expertise, say so briefly and redirect.
- Use markdown sparingly (bold for key terms, bullet lists only when listing 3+ items).
- Keep the Yatra brand voice: calm, purposeful, "calm tech" — not hype, not corporate.`;

/* ── Chat message bubble ── */
function Bubble({ role, text }) {
  const isUser = role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}
    >
      {!isUser && (
        <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 mr-2 mt-0.5 border border-white/40">
          <Image src="/assets/осьминог-Photoroom.png" alt="Kavi" width={28} height={28} className="object-cover" />
        </div>
      )}
      <div
        className="max-w-[80%] px-4 py-3 rounded-2xl text-sm font-medium leading-relaxed"
        style={{
          background: isUser
            ? "rgba(27,59,24,0.88)"
            : "rgba(255,255,255,0.55)",
          color: isUser ? "#FFF9E3" : "#1B3B18",
          border: isUser ? "none" : "1px solid rgba(255,255,255,0.60)",
          borderBottomRightRadius: isUser ? "6px" : "16px",
          borderBottomLeftRadius:  isUser ? "16px" : "6px",
        }}
      >
        {!isUser && <span className="font-black text-[#2D5A27] mr-1 text-xs">Kavi</span>}
        <span style={{ whiteSpace: "pre-wrap" }}>{text}</span>
      </div>
    </motion.div>
  );
}

/* ── Typing indicator ── */
function TypingDots() {
  return (
    <div className="flex justify-start mb-3">
      <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 mr-2 mt-0.5 border border-white/40">
        <Image src="/assets/осьминог-Photoroom.png" alt="Kavi" width={28} height={28} className="object-cover" />
      </div>
      <div className="px-4 py-3 rounded-2xl" style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.60)" }}>
        <div className="flex gap-1 items-center h-4">
          {[0, 1, 2].map((i) => (
            <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-[#2D5A27]"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 0.7, delay: i * 0.15, repeat: Infinity }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── AI Chat ── */
function MentorChat() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Ahoy, Captain! I'm Kavi, your AI career mentor. What's on your mind today — skills, roadmap, interview prep, or something else?" },
  ]);
  const [input, setInput]     = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef             = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const msg = input.trim();
    if (!msg || loading) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: msg }]);
    setLoading(true);

    try {
      const history = messages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        text: m.text,
      }));

      const res  = await fetch("/api/groq/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userMessage: msg,
          chatHistory: history,
          systemPrompt: SYSTEM_PROMPT,
        }),
      });
      const data = await res.json();
      const reply = data.text ?? "The currents are rough — try again.";
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", text: "Lost signal. Try again in a moment." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <div className="rounded-[28px] overflow-hidden flex flex-col" style={{ ...glass, height: "480px" }}>
      {/* Chat header */}
      <div className="px-5 py-3.5 flex items-center gap-3 shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.35)" }}>
        <div className="w-8 h-8 rounded-full overflow-hidden border border-white/40">
          <Image src="/assets/осьминог-Photoroom.png" alt="Kavi" width={32} height={32} className="object-cover" />
        </div>
        <div>
          <p className="text-sm font-black text-[#1B3B18]">Kavi</p>
          <p className="text-[10px] text-[#2D5A27] font-bold">● Online</p>
        </div>
        <Sparkles size={14} className="ml-auto text-[#D35400]" />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-0">
        {messages.map((m, i) => (
          <Bubble key={i} role={m.role} text={m.text} />
        ))}
        {loading && <TypingDots />}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 shrink-0" style={{ borderTop: "1px solid rgba(255,255,255,0.35)" }}>
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask Kavi anything about your career…"
            rows={1}
            className="flex-1 px-4 py-2.5 rounded-2xl text-sm font-medium text-[#1B3B18] placeholder:text-[#1B3B18]/30 focus:outline-none focus:ring-2 focus:ring-[#2D5A27]/30 transition resize-none"
            style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.70)" }}
          />
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={send}
            disabled={loading || !input.trim()}
            className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition-all"
            style={{
              background: input.trim() && !loading ? "#D35400" : "rgba(211,84,0,0.25)",
              boxShadow: input.trim() && !loading ? "0 3px 0 #a03e00" : "none",
            }}
            aria-label="Send message"
          >
            <Send size={16} style={{ color: input.trim() && !loading ? "#FFF9E3" : "rgba(211,84,0,0.45)" }} />
          </motion.button>
        </div>
        <p className="text-[10px] text-[#1B3B18]/30 font-medium mt-1.5 ml-1">
          Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════ */
export default function MentorTab() {
  const [view, setView] = useState("chat"); // "chat" | "resume"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="space-y-5"
    >
      {/* Header */}
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#2D5A27] mb-1">
          AI-Powered Guidance
        </p>
        <h1 className="text-2xl md:text-3xl font-black text-[#1B3B18]">AI Mentor</h1>
        <p className="text-sm text-[#1B3B18]/50 font-medium mt-0.5">
          Chat with Kavi or get a deep resume analysis.
        </p>
      </div>

      {/* Sub-nav toggle */}
      <div
        className="flex rounded-2xl p-1 gap-1"
        style={{ background: "rgba(255,255,255,0.30)", border: "1px solid rgba(255,255,255,0.45)" }}
      >
        {[
          { id: "chat",   icon: MessageCircle, label: "Chat with Kavi" },
          { id: "resume", icon: FileSearch,    label: "Resume Analyser" },
        ].map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => setView(id)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all"
            style={{
              background: view === id ? "#1B3B18" : "transparent",
              color:      view === id ? "#FFF9E3" : "rgba(27,59,24,0.45)",
              boxShadow:  view === id ? "0 2px 10px rgba(27,59,24,0.20)" : "none",
            }}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          {view === "chat" ? <MentorChat /> : <ResumeAnalyzer />}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
