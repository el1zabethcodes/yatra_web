"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload, FileText, Sparkles, AlertCircle,
  CheckCircle2, TrendingUp, TrendingDown, Zap,
  Target, Brain, ChevronDown, ChevronUp, RotateCcw,
} from "lucide-react";

/* ── helpers ── */
const glass = {
  background: "rgba(255,255,255,0.26)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(255,255,255,0.40)",
  boxShadow: "0 6px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.65)",
};

const LEVEL_COLOR = {
  beginner:     { bg: "rgba(211,84,0,0.10)",   text: "#D35400",  border: "rgba(211,84,0,0.22)" },
  intermediate: { bg: "rgba(27,59,24,0.10)",   text: "#1B3B18",  border: "rgba(27,59,24,0.22)" },
  advanced:     { bg: "rgba(45,90,39,0.14)",   text: "#2D5A27",  border: "rgba(45,90,39,0.28)" },
};

/* ── Radar SVG ── */
function MiniRadar({ scores }) {
  const SIZE = 180, C = SIZE / 2, MAX_R = C - 28;
  const keys  = Object.keys(scores);
  const step  = 360 / keys.length;
  const rings = [0.25, 0.5, 0.75, 1.0];

  const polar = (angle, r) => ({
    x: C + r * Math.cos((angle - 90) * (Math.PI / 180)),
    y: C + r * Math.sin((angle - 90) * (Math.PI / 180)),
  });

  const dataPoints = keys.map((k, i) => polar(i * step, scores[k] * MAX_R));
  const polygon    = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} aria-label="Skill radar">
      {rings.map((r, ri) => {
        const pts = keys.map((_, i) => { const p = polar(i * step, r * MAX_R); return `${p.x},${p.y}`; }).join(" ");
        return <polygon key={ri} points={pts} fill="none" stroke="rgba(27,59,24,0.10)" strokeWidth="1" />;
      })}
      {keys.map((_, i) => {
        const p = polar(i * step, MAX_R);
        return <line key={i} x1={C} y1={C} x2={p.x} y2={p.y} stroke="rgba(27,59,24,0.10)" strokeWidth="1" />;
      })}
      <motion.polygon
        points={polygon}
        fill="rgba(45,90,39,0.18)"
        stroke="#2D5A27"
        strokeWidth="2"
        strokeLinejoin="round"
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ transformOrigin: `${C}px ${C}px` }}
      />
      {dataPoints.map((p, i) => (
        <motion.circle key={i} cx={p.x} cy={p.y} r={4} fill="#2D5A27" stroke="white" strokeWidth="2"
          initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + i * 0.08 }} style={{ transformOrigin: `${p.x}px ${p.y}px` }} />
      ))}
      {keys.map((k, i) => {
        const p = polar(i * step, MAX_R + 16);
        return (
          <text key={k} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle"
            fontSize="9" fontWeight="700" fill="rgba(27,59,24,0.55)">
            {k}
          </text>
        );
      })}
    </svg>
  );
}

/* ── Score ring ── */
function ScoreRing({ score, label }) {
  const r = 44, circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const color = score >= 80 ? "#2D5A27" : score >= 55 ? "#D35400" : "#1B3B18";

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="110" height="110" viewBox="0 0 110 110">
        <circle cx="55" cy="55" r={r} fill="none" stroke="rgba(27,59,24,0.10)" strokeWidth="8" />
        <motion.circle
          cx="55" cy="55" r={r} fill="none"
          stroke={color} strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${circ}`}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - dash }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          style={{ transformOrigin: "55px 55px", transform: "rotate(-90deg)" }}
        />
        <text x="55" y="50" textAnchor="middle" fontSize="22" fontWeight="900" fill={color}>{score}</text>
        <text x="55" y="66" textAnchor="middle" fontSize="9" fontWeight="700" fill="rgba(27,59,24,0.45)">/100</text>
      </svg>
      <span className="text-xs font-black text-[#1B3B18]/60 text-center leading-tight max-w-[100px]">{label}</span>
    </div>
  );
}

/* ── Skill pill ── */
function SkillPill({ name, level, note }) {
  const [open, setOpen] = useState(false);
  const c = LEVEL_COLOR[level] ?? LEVEL_COLOR.beginner;
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all"
        style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}
      >
        {name}
        <span className="opacity-60 text-[10px] uppercase tracking-wider">{level}</span>
        {note && (open ? <ChevronUp size={11} /> : <ChevronDown size={11} />)}
      </button>
      <AnimatePresence>
        {open && note && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-[11px] text-[#1B3B18]/55 font-medium mt-1 ml-2 overflow-hidden"
          >
            {note}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── List section ── */
function ListSection({ icon: Icon, title, items, accent }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2.5">
        <Icon size={14} style={{ color: accent }} />
        <span className="text-[10px] font-black uppercase tracking-widest text-[#1B3B18]/45">{title}</span>
      </div>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * i }}
            className="flex items-start gap-2 text-sm text-[#1B3B18]/75 font-medium"
          >
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: accent }} />
            {item}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════ */
export default function ResumeAnalyzer() {
  const [text, setText]       = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport]   = useState(null);
  const [error, setError]     = useState("");
  const fileRef               = useRef(null);

  /* Read plain-text file */
  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setText(ev.target.result ?? "");
    reader.readAsText(file);
  };

  const handleAnalyse = async () => {
    if (text.trim().length < 50) {
      setError("Please paste your resume text or upload a .txt file (min 50 characters).");
      return;
    }
    setError("");
    setLoading(true);
    setReport(null);
    try {
      const res  = await fetch("/api/groq/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText: text }),
      });
      
      let data;
      try {
        data = await res.json();
      } catch (jsonErr) {
        console.error("Failed to parse response JSON:", jsonErr);
        throw new Error("Server returned invalid response. Please try again.");
      }
      
      if (!res.ok || data.error) {
        throw new Error(data.error ?? "Unknown error");
      }
      
      if (!data.report) {
        throw new Error("No analysis report received. Please try again.");
      }
      
      setReport(data.report);
    } catch (err) {
      setError(err.message ?? "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setReport(null); setText(""); setError(""); };

  return (
    <div className="space-y-5">
      {/* ── Header ── */}
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#D35400] mb-1">
          AI-Powered · Honest · Actionable
        </p>
        <h2 className="text-2xl md:text-3xl font-black text-[#1B3B18]">Resume Analyser</h2>
        <p className="text-sm text-[#1B3B18]/50 font-medium mt-0.5">
          Let Kavi read your resume and chart your real skill map.
        </p>
      </div>

      {!report ? (
        <>
          {/* ── Instruction card ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-[24px] p-5"
            style={{
              background: "rgba(45,90,39,0.08)",
              border: "1.5px solid rgba(45,90,39,0.18)",
            }}
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: "rgba(45,90,39,0.15)", border: "1.5px solid rgba(45,90,39,0.25)" }}>
                <Brain size={15} className="text-[#2D5A27]" />
              </div>
              <div>
                <p className="text-sm font-black text-[#1B3B18] mb-2">
                  For the most accurate analysis — be honest in your resume
                </p>
                <ul className="space-y-1.5 text-[12px] text-[#1B3B18]/65 font-medium">
                  {[
                    "List ALL your hard skills: languages, frameworks, tools, databases — even if you only used them once",
                    "Include soft skills with real examples (e.g. 'Led a team of 4 in a hackathon')",
                    "Write your genuine strengths AND weaknesses — Kavi will help you turn gaps into a plan",
                    "Mention your target role or career goal so the analysis is focused",
                    "Don't inflate experience levels — honest data = better roadmap",
                  ].map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-[#2D5A27]" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* ── Input area ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-[28px] p-5 space-y-4"
            style={glass}
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-black uppercase tracking-widest text-[#1B3B18]/45">
                Paste resume text
              </p>
              <label
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all hover:scale-105"
                style={{
                  background: "rgba(255,255,255,0.55)",
                  border: "1px solid rgba(255,255,255,0.70)",
                  color: "#1B3B18",
                }}
              >
                <Upload size={12} />
                Upload .txt
                <input
                  ref={fileRef}
                  type="file"
                  accept=".txt,.md"
                  className="hidden"
                  onChange={handleFile}
                />
              </label>
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={`Paste your full resume here...\n\nExample:\nName: Arjun Sharma\nTarget Role: Frontend Engineer\n\nSkills: React (intermediate), TypeScript (beginner), Node.js (beginner), Figma (advanced)\n\nStrengths: Fast learner, strong UI sense, good communicator\nWeaknesses: Limited backend experience, no production deployments yet\n\nProjects:\n- Portfolio site built with Next.js and Tailwind\n- Hackathon app: real-time chat with Socket.io (team of 3)\n\nEducation: B.Tech CS, 3rd year, GPA 8.2`}
              rows={12}
              className="w-full px-4 py-3.5 rounded-2xl text-sm font-medium text-[#1B3B18] placeholder:text-[#1B3B18]/25 focus:outline-none focus:ring-2 focus:ring-[#2D5A27]/30 transition resize-none leading-relaxed"
              style={{
                background: "rgba(255,255,255,0.55)",
                border: "1px solid rgba(255,255,255,0.70)",
              }}
            />

            {error && (
              <div className="flex items-center gap-2 text-[#D35400] text-xs font-semibold">
                <AlertCircle size={14} />
                {error}
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleAnalyse}
              disabled={loading}
              className="w-full py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider text-white flex items-center justify-center gap-2 transition-all"
              style={{
                background: loading ? "rgba(211,84,0,0.45)" : "#D35400",
                boxShadow: loading ? "none" : "0 4px 0 #a03e00, 0 6px 16px rgba(211,84,0,0.28)",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full"
                  />
                  Kavi is reading your resume…
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  Analyse My Resume
                </>
              )}
            </motion.button>
          </motion.div>
        </>
      ) : (
        /* ══════════════════════════════════════════
           RESULTS
        ══════════════════════════════════════════ */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          {/* Reset button */}
          <button
            type="button"
            onClick={reset}
            className="flex items-center gap-1.5 text-xs font-bold text-[#1B3B18]/40 hover:text-[#D35400] transition-colors"
          >
            <RotateCcw size={12} />
            Analyse another resume
          </button>

          {/* Score + summary */}
          <div className="rounded-[28px] p-5" style={glass}>
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <ScoreRing score={report.overallScore} label={report.scoreLabel} />
              <div className="flex-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#1B3B18]/40 mb-1">
                  {report.targetRole}
                </p>
                <h3 className="text-lg font-black text-[#1B3B18] mb-2">{report.name}</h3>
                <p className="text-sm text-[#1B3B18]/65 font-medium leading-relaxed">{report.summary}</p>
              </div>
            </div>
          </div>

          {/* Radar */}
          {report.radarScores && (
            <div className="rounded-[28px] p-5 flex flex-col items-center" style={glass}>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#1B3B18]/40 mb-3">
                Skill Radar
              </p>
              <MiniRadar scores={report.radarScores} />
            </div>
          )}

          {/* Hard skills */}
          {report.hardSkills?.length > 0 && (
            <div className="rounded-[28px] p-5" style={glass}>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#1B3B18]/40 mb-3">
                Hard Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {report.hardSkills.map((s) => (
                  <SkillPill key={s.name} {...s} />
                ))}
              </div>
            </div>
          )}

          {/* Soft skills */}
          {report.softSkills?.length > 0 && (
            <div className="rounded-[28px] p-5" style={glass}>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#1B3B18]/40 mb-3">
                Soft Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {report.softSkills.map((s) => (
                  <SkillPill key={s.name} {...s} />
                ))}
              </div>
            </div>
          )}

          {/* Strengths / Weaknesses / Gaps / Quick wins */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {report.strengths?.length > 0 && (
              <div className="rounded-[28px] p-5" style={glass}>
                <ListSection icon={CheckCircle2} title="Strengths" items={report.strengths} accent="#2D5A27" />
              </div>
            )}
            {report.weaknesses?.length > 0 && (
              <div className="rounded-[28px] p-5" style={glass}>
                <ListSection icon={TrendingDown} title="Weaknesses" items={report.weaknesses} accent="#D35400" />
              </div>
            )}
            {report.gaps?.length > 0 && (
              <div className="rounded-[28px] p-5" style={glass}>
                <ListSection icon={AlertCircle} title="Gaps to Fill" items={report.gaps} accent="#1B3B18" />
              </div>
            )}
            {report.quickWins?.length > 0 && (
              <div className="rounded-[28px] p-5" style={glass}>
                <ListSection icon={Zap} title="Quick Wins This Week" items={report.quickWins} accent="#D35400" />
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
