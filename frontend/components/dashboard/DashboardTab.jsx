"use client";

import { motion } from "framer-motion";
import { Compass, Shell, TrendingUp } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import TentacleGrab from "./TentacleGrab";
import SkillRadar from "./SkillRadar";
import SmallWins from "./SmallWins";

const glass = {
  background: "rgba(255,255,255,0.26)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(255,255,255,0.38)",
  boxShadow: "0 6px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.60)",
};

const Fade = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.65, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

/* Progress bar */
function ProgressBar({ value }) {
  return (
    <div
      className="w-full h-2 rounded-full overflow-hidden"
      style={{ background: "rgba(27,59,24,0.10)" }}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        className="h-full rounded-full"
        style={{
          background: "linear-gradient(90deg, #2D5A27 0%, #D35400 100%)",
        }}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
      />
    </div>
  );
}

/* Stat card */
function StatCard({ icon: Icon, label, value, color, delay }) {
  return (
    <Fade delay={delay}>
      <div
        className="rounded-[24px] p-4 flex items-center gap-3"
        style={glass}
      >
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
          style={{ background: `${color}18`, border: `1.5px solid ${color}28` }}
        >
          <Icon size={18} style={{ color }} />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-[#1B3B18]/45">
            {label}
          </p>
          <p className="text-lg font-black text-[#1B3B18] leading-tight">{value}</p>
        </div>
      </div>
    </Fade>
  );
}

export default function DashboardTab({ setActiveTab }) {
  const { user } = useAuth();
  const firstName = user?.name?.split(" ")[0] ?? "Explorer";
  const progress  = user?.progress ?? 45;
  const streak    = user?.streak   ?? 0;
  const skills    = user?.skills   ?? 0;
  const pearls    = user?.pearls   ?? 0;

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <Fade>
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-[#1B3B18] leading-tight">
            Welcome back, <span className="text-[#D35400]">{firstName}</span>.
          </h1>
          <p className="text-sm text-[#1B3B18]/55 font-medium mt-1">
            Your journey is{" "}
            <span className="text-[#2D5A27] font-black">{progress}% complete</span>.
            Keep sailing.
          </p>
          <div className="mt-3 max-w-sm">
            <ProgressBar value={progress} />
          </div>
        </div>
      </Fade>

      {/* Stat row */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard icon={TrendingUp} label="Streak"    value={`${streak} days`}   color="#D35400" delay={0.1} />
        <StatCard icon={Compass}    label="Skills"    value={`${skills} mapped`} color="#2D5A27" delay={0.18} />
        <StatCard icon={Shell}      label="Pearls"    value={`${pearls} earned`} color="#1B3B18" delay={0.26} />
      </div>

      {/* Tentacle Grab hero */}
      <Fade delay={0.2}>
        <TentacleGrab onGrab={() => setActiveTab("mentor")} />
      </Fade>

      {/* Bottom two-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Skill Radar */}
        <Fade delay={0.3}>
          <div className="rounded-[28px] p-5" style={glass}>
            <div className="flex items-center gap-2 mb-4">
              <Compass size={16} className="text-[#2D5A27]" />
              <h3 className="text-sm font-black text-[#1B3B18] uppercase tracking-wider">
                The Compass
              </h3>
              <span className="ml-auto text-[10px] font-bold text-[#1B3B18]/35 uppercase tracking-widest">
                Skill Radar
              </span>
            </div>
            <SkillRadar scores={user?.radarScores} />
          </div>
        </Fade>

        {/* Small Wins */}
        <Fade delay={0.38}>
          <div className="rounded-[28px] p-5" style={glass}>
            <div className="flex items-center gap-2 mb-4">
              <Shell size={16} className="text-[#D35400]" />
              <h3 className="text-sm font-black text-[#1B3B18] uppercase tracking-wider">
                Small Wins
              </h3>
              <span className="ml-auto text-[10px] font-bold text-[#1B3B18]/35 uppercase tracking-widest">
                Recent Pearls
              </span>
            </div>
            <SmallWins />
          </div>
        </Fade>
      </div>
    </div>
  );
}
