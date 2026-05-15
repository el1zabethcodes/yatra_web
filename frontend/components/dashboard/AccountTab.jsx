"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, User, Calendar, Target, Crown, KeyRound,
  Eye, EyeOff, CheckCircle2, ChevronRight, LogOut,
} from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

const SUBSCRIPTION_COLORS = {
  Explorer:  { bg: "rgba(27,59,24,0.10)",  border: "rgba(27,59,24,0.20)",  text: "#1B3B18" },
  Navigator: { bg: "rgba(211,84,0,0.10)",  border: "rgba(211,84,0,0.22)",  text: "#D35400" },
  Captain:   { bg: "rgba(45,90,39,0.12)",  border: "rgba(45,90,39,0.25)",  text: "#2D5A27" },
};

const glass = {
  background: "rgba(255,255,255,0.26)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(255,255,255,0.40)",
  boxShadow: "0 6px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.65)",
};

const inputStyle = {
  background: "rgba(255,255,255,0.50)",
  border: "1px solid rgba(255,255,255,0.65)",
  color: "#1B3B18",
};

/* ── Info row ── */
function InfoRow({ icon: Icon, label, value, accent }) {
  return (
    <div
      className="flex items-start gap-3 px-4 py-3.5 rounded-2xl"
      style={{
        background: "rgba(255,255,255,0.32)",
        border: "1px solid rgba(255,255,255,0.48)",
      }}
    >
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
        style={{ background: accent + "18", border: `1.5px solid ${accent}28` }}
      >
        <Icon size={15} style={{ color: accent }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-black uppercase tracking-widest text-[#1B3B18]/40 mb-0.5">
          {label}
        </p>
        <p className="text-sm font-semibold text-[#1B3B18] leading-snug break-words">
          {value}
        </p>
      </div>
    </div>
  );
}

/* ── Password reset section ── */
function PasswordReset() {
  const [open, setOpen]           = useState(false);
  const [current, setCurrent]     = useState("");
  const [next, setNext]           = useState("");
  const [confirm, setConfirm]     = useState("");
  const [showCur, setShowCur]     = useState(false);
  const [showNew, setShowNew]     = useState(false);
  const [showCon, setShowCon]     = useState(false);
  const [success, setSuccess]     = useState(false);

  const canSubmit =
    current.length >= 6 && next.length >= 8 && next === confirm;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSuccess(true);
    setCurrent(""); setNext(""); setConfirm("");
    setTimeout(() => { setSuccess(false); setOpen(false); }, 2200);
  };

  return (
    <div
      className="rounded-[24px] overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.26)",
        border: "1px solid rgba(255,255,255,0.40)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.65)",
      }}
    >
      {/* Header row */}
      <button
        type="button"
        onClick={() => { setOpen(!open); setSuccess(false); }}
        className="w-full flex items-center gap-3 px-4 py-4 text-left focus:outline-none"
      >
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "rgba(211,84,0,0.12)", border: "1.5px solid rgba(211,84,0,0.22)" }}
        >
          <KeyRound size={15} style={{ color: "#D35400" }} />
        </div>
        <div className="flex-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#1B3B18]/40">
            Security
          </p>
          <p className="text-sm font-semibold text-[#1B3B18]">Reset Password</p>
        </div>
        <motion.div
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.22 }}
        >
          <ChevronRight size={16} className="text-[#1B3B18]/35" />
        </motion.div>
      </button>

      {/* Expandable form */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="form"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div
              className="px-4 pb-5 pt-1"
              style={{ borderTop: "1px solid rgba(255,255,255,0.35)" }}
            >
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 py-3 justify-center"
                >
                  <CheckCircle2 size={18} className="text-[#2D5A27]" />
                  <span className="text-sm font-black text-[#2D5A27]">
                    Password updated!
                  </span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 mt-3">
                  {/* Current */}
                  {[
                    { label: "Current password", val: current, set: setCurrent, show: showCur, toggle: () => setShowCur(!showCur) },
                    { label: "New password",      val: next,    set: setNext,    show: showNew, toggle: () => setShowNew(!showNew) },
                    { label: "Confirm new",       val: confirm, set: setConfirm, show: showCon, toggle: () => setShowCon(!showCon) },
                  ].map(({ label, val, set, show, toggle }) => (
                    <div key={label}>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-[#1B3B18]/40 mb-1.5">
                        {label}
                      </label>
                      <div className="relative">
                        <input
                          type={show ? "text" : "password"}
                          value={val}
                          onChange={(e) => set(e.target.value)}
                          placeholder="••••••••"
                          className="w-full px-4 py-3 rounded-2xl text-sm font-medium placeholder:text-[#1B3B18]/25 focus:outline-none focus:ring-2 focus:ring-[#D35400]/30 transition pr-11"
                          style={inputStyle}
                        />
                        <button
                          type="button"
                          onClick={toggle}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#1B3B18]/35 hover:text-[#1B3B18] transition-colors"
                          aria-label={show ? "Hide password" : "Show password"}
                        >
                          {show ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                    </div>
                  ))}

                  {next.length > 0 && next !== confirm && (
                    <p className="text-[11px] text-[#D35400] font-semibold">
                      Passwords don't match
                    </p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={!canSubmit}
                    whileHover={canSubmit ? { scale: 1.02, y: -1 } : {}}
                    whileTap={canSubmit ? { scale: 0.97 } : {}}
                    className="w-full py-3 rounded-2xl font-black text-sm uppercase tracking-wider transition-all mt-1"
                    style={{
                      background: canSubmit ? "#D35400" : "rgba(211,84,0,0.25)",
                      color: canSubmit ? "#FFF9E3" : "rgba(211,84,0,0.50)",
                      boxShadow: canSubmit
                        ? "0 4px 0 #a03e00, 0 6px 16px rgba(211,84,0,0.25)"
                        : "none",
                      cursor: canSubmit ? "pointer" : "not-allowed",
                    }}
                  >
                    Update Password
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Main export ── */
export default function AccountTab({ setActiveTab }) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const sub = SUBSCRIPTION_COLORS[user?.subscription] ?? SUBSCRIPTION_COLORS.Explorer;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="space-y-5"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#D35400] mb-1">
            Personal Oasis
          </p>
          <h1 className="text-2xl md:text-3xl font-black text-[#1B3B18]">
            My Account
          </h1>
          <p className="text-sm text-[#1B3B18]/50 font-medium mt-0.5">
            Member since {user?.memberSince ?? "—"}
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all"
          style={{
            background: "rgba(211,84,0,0.10)",
            border: "1px solid rgba(211,84,0,0.20)",
            color: "#D35400",
          }}
        >
          <LogOut size={13} />
          Log out
        </motion.button>
      </div>

      {/* Subscription badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.45 }}
        className="flex items-center gap-3 px-5 py-4 rounded-[24px]"
        style={{
          background: sub.bg,
          border: `1.5px solid ${sub.border}`,
          boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
        }}
      >
        <Crown size={20} style={{ color: sub.text }} />
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: sub.text + "99" }}>
            Subscription Plan
          </p>
          <p className="text-base font-black" style={{ color: sub.text }}>
            {user?.subscription ?? "Explorer"} Plan
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="ml-auto px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider"
          style={{
            background: "#D35400",
            color: "#FFF9E3",
            boxShadow: "0 3px 0 #a03e00, 0 4px 12px rgba(211,84,0,0.25)",
          }}
        >
          Upgrade
        </motion.button>
      </motion.div>

      {/* Info grid */}
      <div className="rounded-[28px] p-5 space-y-2.5" style={glass}>
        <p className="text-[10px] font-black uppercase tracking-widest text-[#1B3B18]/35 mb-3">
          Profile Details
        </p>
        <InfoRow icon={User}     label="Full Name"     value={user?.name      ?? "—"} accent="#1B3B18" />
        <InfoRow icon={Mail}     label="Email"         value={user?.email     ?? "—"} accent="#D35400" />
        <InfoRow icon={Calendar} label="Date of Birth" value={user?.birthDate ?? "—"} accent="#2D5A27" />
        <InfoRow icon={Target}   label="Current Goal"  value={user?.goal      ?? "—"} accent="#D35400" />
      </div>

      {/* Password reset */}
      <PasswordReset />

      {/* Danger zone */}
      <div className="pt-1">
        <button
          type="button"
          className="text-[11px] font-bold text-[#1B3B18]/30 hover:text-[#D35400] transition-colors underline underline-offset-2"
        >
          Delete account
        </button>
      </div>
    </motion.div>
  );
}
