"use client";

import { motion } from "framer-motion";
import { Compass, Shell, TrendingUp, LucideIcon } from "lucide-react";
import { useAuth } from "@/shared/lib/AuthContext";
import type { DashboardTabKey } from "@/app/dashboard/page";
import TentacleGrab from "./TentacleGrab";
import SkillRadar from "./SkillRadar";
import SmallWins from "./SmallWins";

/**
 * Р°РЅС–РјР°С†С–СЏ РїРѕСЏРІРё
 */
const Fade = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

/**
 * СЃРјСѓР¶РєР° РїСЂРѕРіСЂРµСЃСѓ
 */
function ProgressBar({ value }: { value: number }) {
  return (
    <div
      className="w-full h-1.5 bg-surface rounded-full overflow-hidden"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        className="h-full bg-secondary rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
      />
    </div>
  );
}

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  color: string;
  delay: number;
}

/**
 * РєР°СЂС‚РєР° СЃС‚Р°С‚РёСЃС‚РёРєРё
 */
function StatCard({ icon: Icon, label, value, color, delay }: StatCardProps) {
  return (
    <Fade delay={delay}>
      <div className="bg-background border border-surface p-4 rounded-3xl flex items-center gap-4 hover:border-surface/80 transition-colors">
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${color}10`, color }}
        >
          <Icon size={18} />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-primary/60">
            {label}
          </p>
          <p className="text-lg font-black text-primary leading-tight">{value}</p>
        </div>
      </div>
    </Fade>
  );
}

/**
 * РіРѕР»РѕРІРЅРёР№ РєРѕРЅС‚РµРЅС‚ РІРєР»Р°РґРєРё РґР°С€Р±РѕСЂРґСѓ
 */
export default function DashboardTab({ setActiveTab }: { setActiveTab: (tab: DashboardTabKey) => void }) {
  const { user } = useAuth();
  
  const firstName = user?.name?.split(" ")[0] ?? "Explorer";
  const progress = user?.progress ?? 0;
  const streak = user?.streak ?? 0;
  const skills = user?.skills ?? 0;
  const pearls = user?.pearls ?? 0;

  return (
    <div className="space-y-10">
      {/* РІС–С‚Р°РЅРЅСЏ */}
      <Fade>
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-black text-primary tracking-tight">
            Р’С–С‚Р°С”РјРѕ, <span className="text-accent">{firstName}</span>.
          </h1>
          <div className="space-y-2">
            <p className="text-sm font-medium text-primary/60">
              Р’Р°С€Р° РїРѕРґРѕСЂРѕР¶ Р·Р°РІРµСЂС€РµРЅР° РЅР° <span className="text-secondary font-black">{progress}%</span>. 
              РџСЂРѕРґРѕРІР¶СѓР№С‚Рµ СЂСѓС….
            </p>
            <div className="max-w-xs">
              <ProgressBar value={progress} />
            </div>
          </div>
        </div>
      </Fade>

      {/* СЃС‚Р°С‚РёСЃС‚РёРєР° */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={TrendingUp} label="РЎРµСЂС–СЏ" value={`${streak} РґРЅС–РІ`} color="#D35400" delay={0.1} />
        <StatCard icon={Compass} label="РќР°РІРёС‡РєРё" value={`${skills} РІС–РґРєСЂРёС‚Рѕ`} color="#6B7D56" delay={0.15} />
        <StatCard icon={Shell} label="РџРµСЂР»РёРЅРё" value={`${pearls} Р·С–Р±СЂР°РЅРѕ`} color="#1B3B18" delay={0.2} />
      </div>

      {/* СЃРїРµС†С–Р°Р»СЊРЅРёР№ Р±Р»РѕРє Tentacle Grab */}
      <Fade delay={0.25}>
        <TentacleGrab onGrab={() => setActiveTab("mentor")} />
      </Fade>

      {/* РЅРёР¶РЅС–Р№ СЂСЏРґ Р±Р»РѕРєС–РІ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* СЂР°РґР°СЂ РЅР°РІРёС‡РѕРє */}
        <Fade delay={0.3}>
          <div className="bg-background border border-surface p-6 rounded-[32px] space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass size={16} className="text-secondary" />
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">РљРѕРјРїР°СЃ</h3>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">Р Р°РґР°СЂ РЅР°РІРёС‡РѕРє</span>
            </div>
            <SkillRadar scores={user?.radarScores} />
          </div>
        </Fade>

        {/* РјР°Р»РµРЅСЊРєС– РїРµСЂРµРјРѕРіРё */}
        <Fade delay={0.35}>
          <div className="bg-background border border-surface p-6 rounded-[32px] space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shell size={16} className="text-accent" />
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">РњР°Р»С– РїРµСЂРµРјРѕРіРё</h3>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">РћСЃС‚Р°РЅРЅС– РїРµСЂР»РёРЅРё</span>
            </div>
            <SmallWins />
          </div>
        </Fade>
      </div>
    </div>
  );
}

