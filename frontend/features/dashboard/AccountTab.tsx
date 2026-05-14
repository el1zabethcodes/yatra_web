"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, User, Calendar, Target, Crown, KeyRound,
  Eye, EyeOff, CheckCircle2, ChevronRight, LogOut,
  LucideIcon
} from "lucide-react";
import { useAuth } from "@/shared/lib/AuthContext";

const SUBSCRIPTION_COLORS: Record<string, { bg: string, border: string, text: string }> = {
  Explorer:  { bg: "#F2F0D8", border: "#E2E0C8", text: "#1B3B18" },
  Navigator: { bg: "#D3540010", border: "#D3540020", text: "#D35400" },
  Captain:   { bg: "#6B7D5610", border: "#6B7D5620", text: "#6B7D56" },
};

/**
 * СЂСЏРґРѕРє С–РЅС„РѕСЂРјР°С†С–С— РїСЂРѕС„С–Р»СЋ
 */
function InfoRow({ icon: Icon, label, value, accent }: { icon: LucideIcon, label: string, value: string, accent: string }) {
  return (
    <div className="flex items-start gap-4 p-4 bg-background border border-surface rounded-2xl">
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
        style={{ backgroundColor: `${accent}10`, color: accent }}
      >
        <Icon size={14} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-black uppercase tracking-widest text-primary/60 mb-0.5">
          {label}
        </p>
        <p className="text-sm font-bold text-primary leading-snug truncate">
          {value}
        </p>
      </div>
    </div>
  );
}

/**
 * СЃРµРєС†С–СЏ Р·РјС–РЅРё РїР°СЂРѕР»СЏ
 */
function PasswordReset() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showCur, setShowCur] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showCon, setShowCon] = useState(false);
  const [success, setSuccess] = useState(false);

  const canSubmit = current.length >= 6 && next.length >= 8 && next === confirm;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSuccess(true);
    setCurrent(""); setNext(""); setConfirm("");
    setTimeout(() => { setSuccess(false); setOpen(false); }, 2000);
  };

  return (
    <div className="bg-background border border-surface rounded-[32px] overflow-hidden">
      <button
        type="button"
        onClick={() => { setOpen(!open); setSuccess(false); }}
        className="w-full flex items-center gap-4 p-5 text-left hover:bg-surface/10 transition-colors"
      >
        <div className="w-8 h-8 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
          <KeyRound size={14} />
        </div>
        <div className="flex-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-primary/60">Р‘РµР·РїРµРєР°</p>
          <p className="text-sm font-black text-primary">Р—РјС–РЅРёС‚Рё РїР°СЂРѕР»СЊ</p>
        </div>
        <motion.div animate={{ rotate: open ? 90 : 0 }}>
          <ChevronRight size={16} className="text-primary/60" />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-surface"
          >
            <div className="p-5">
              {success ? (
                <div className="flex items-center gap-2 py-4 justify-center text-secondary">
                  <CheckCircle2 size={18} />
                  <span className="text-sm font-black uppercase tracking-widest">РџР°СЂРѕР»СЊ РѕРЅРѕРІР»РµРЅРѕ!</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { id: "current-password", label: "РџРѕС‚РѕС‡РЅРёР№ РїР°СЂРѕР»СЊ", val: current, set: setCurrent, show: showCur, toggle: () => setShowCur(!showCur) },
                    { id: "new-password", label: "РќРѕРІРёР№ РїР°СЂРѕР»СЊ", val: next, set: setNext, show: showNew, toggle: () => setShowNew(!showNew) },
                    { id: "confirm-password", label: "РџС–РґС‚РІРµСЂРґС–С‚СЊ РЅРѕРІРёР№", val: confirm, set: setConfirm, show: showCon, toggle: () => setShowCon(!showCon) },
                  ].map(({ id, label, val, set, show, toggle }) => (
                    <div key={label}>
                      <label htmlFor={id} className="block text-[10px] font-black uppercase tracking-widest text-primary/60 mb-2">
                        {label}
                      </label>
                      <div className="relative">
                        <input
                          id={id}
                          type={show ? "text" : "password"}
                          value={val}
                          onChange={(e) => set(e.target.value)}
                          placeholder="вЂўвЂўвЂўвЂўвЂўвЂўвЂўвЂў"
                          className="w-full px-5 py-3 rounded-2xl bg-surface/20 border border-surface text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all pr-12"
                        />
                        <button
                          type="button"
                          onClick={toggle}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/60 hover:text-primary"
                          aria-label={show ? "РџСЂРёС…РѕРІР°С‚Рё РїР°СЂРѕР»СЊ" : "РџРѕРєР°Р·Р°С‚Рё РїР°СЂРѕР»СЊ"}
                        >
                          {show ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                  ))}

                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className={`
                      w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all
                      ${canSubmit ? "bg-accent text-surface shadow-lg" : "bg-surface text-primary/50 cursor-not-allowed"}
                    `}
                  >
                    РћРЅРѕРІРёС‚Рё РїР°СЂРѕР»СЊ
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * РіРѕР»РѕРІРЅРёР№ РєРѕРјРїРѕРЅРµРЅС‚ РІРєР»Р°РґРєРё Р°РєР°СѓРЅС‚Сѓ
 */
export default function AccountTab() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const sub = SUBSCRIPTION_COLORS[user?.subscription || "Explorer"] || SUBSCRIPTION_COLORS.Explorer;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleDeleteAccount = () => {
    try {
      localStorage.removeItem("yatra_session_uid");
    } catch {}
    logout();
    router.push("/login");
  };

  return (
    <div className="space-y-8">
      {/* Р·Р°РіРѕР»РѕРІРѕРє */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">РћР°Р·РёСЃ</p>
          <h1 className="text-3xl font-black text-primary tracking-tight">РњС–Р№ РђРєР°СѓРЅС‚</h1>
          <p className="text-sm text-primary/60 font-medium">РЈС‡Р°СЃРЅРёРє Р· {user?.memberSince}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-accent/20 bg-accent/5 text-accent text-[10px] font-black uppercase tracking-widest hover:bg-accent/10 transition-colors"
        >
          <LogOut size={14} />
          Р’РёР№С‚Рё
        </button>
      </div>

      {/* СЃС‚Р°С‚СѓСЃ РїС–РґРїРёСЃРєРё */}
      <div
        className="flex items-center gap-4 p-6 rounded-[32px] border"
        style={{ backgroundColor: sub.bg, borderColor: sub.border }}
      >
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${sub.text}20`, color: sub.text }}>
          <Crown size={24} />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest opacity-60" style={{ color: sub.text }}>РўР°СЂРёС„РЅРёР№ РїР»Р°РЅ</p>
          <p className="text-xl font-black" style={{ color: sub.text }}>{user?.subscription} Plan</p>
        </div>
        <button
          className="ml-auto px-6 py-2.5 rounded-full bg-accent text-surface text-[10px] font-black uppercase tracking-widest shadow-lg shadow-accent/20 hover:-translate-y-1 transition-all"
        >
          РћРЅРѕРІРёС‚Рё
        </button>
      </div>

      {/* РґРµС‚Р°Р»С– РїСЂРѕС„С–Р»СЋ */}
      <div className="bg-background border border-surface p-6 rounded-[40px] space-y-4 shadow-sm">
        <p className="text-[10px] font-black uppercase tracking-widest text-primary/60 mb-2 px-2">Р”РµС‚Р°Р»С– РїСЂРѕС„С–Р»СЋ</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InfoRow icon={User} label="РџРѕРІРЅРµ С–Рј'СЏ" value={user?.name || "вЂ”"} accent="#1B3B18" />
          <InfoRow icon={Mail} label="Email" value={user?.email || "вЂ”"} accent="#D35400" />
          <InfoRow icon={Calendar} label="Р”Р°С‚Р° РЅР°СЂРѕРґР¶РµРЅРЅСЏ" value={user?.birthDate || "вЂ”"} accent="#6B7D56" />
          <InfoRow icon={Target} label="РџРѕС‚РѕС‡РЅР° С†С–Р»СЊ" value={user?.goal || "вЂ”"} accent="#D35400" />
        </div>
      </div>

      {/* Р·РјС–РЅР° РїР°СЂРѕР»СЏ */}
      <PasswordReset />

      {/* РЅРµР±РµР·РїРµС‡РЅР° Р·РѕРЅР° */}
      <div className="pt-4 text-center space-y-4">
        {confirmDelete && (
          <div className="mx-auto max-w-md p-4 rounded-2xl border border-accent/20 bg-accent/5 text-accent">
            <p className="text-xs font-bold uppercase tracking-widest">
              Р¦Рµ РґРµРјРѕ-Р°РєР°СѓРЅС‚. Р’РёРґР°Р»РµРЅРЅСЏ Р·Р°РІРµСЂС€РёС‚СЊ РїРѕС‚РѕС‡РЅСѓ СЃРµСЃС–СЋ РЅР° С†СЊРѕРјСѓ РїСЂРёСЃС‚СЂРѕС—.
            </p>
          </div>
        )}
        <div className="flex justify-center gap-3">
          <button
            type="button"
            onClick={() => setConfirmDelete((value) => !value)}
            className="text-[10px] font-black uppercase tracking-widest text-primary/60 hover:text-accent transition-colors"
          >
            {confirmDelete ? "РЎРєР°СЃСѓРІР°С‚Рё" : "Р’РёРґР°Р»РёС‚Рё Р°РєР°СѓРЅС‚"}
          </button>
          {confirmDelete && (
            <button
              type="button"
              onClick={handleDeleteAccount}
              className="text-[10px] font-black uppercase tracking-widest text-accent hover:opacity-80 transition-opacity"
            >
              РџС–РґС‚РІРµСЂРґРёС‚Рё
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

