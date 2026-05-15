"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Github, Mail, Linkedin, AlertCircle, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { authenticate, registerUser, TEST_USERS } from "@/lib/users";

const inputCls =
  "w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-white/60 text-[#1B3B18] font-medium placeholder:text-[#1B3B18]/30 focus:outline-none focus:ring-2 focus:ring-[#1B3B18]/30 transition";

export default function LoginPage() {
  const router    = useRouter();
  const { login } = useAuth();

  const [tab, setTab] = useState("signin");

  /* Sign In */
  const [siEmail, setSiEmail]       = useState("");
  const [siPass,  setSiPass]        = useState("");
  const [showSi,  setShowSi]        = useState(false);
  const [remember, setRemember]     = useState(false);
  const [siError, setSiError]       = useState("");
  const [siLoading, setSiLoading]   = useState(false);

  /* Sign Up */
  const [suName,  setSuName]        = useState("");
  const [suEmail, setSuEmail]       = useState("");
  const [suPass,  setSuPass]        = useState("");
  const [showSu,  setShowSu]        = useState(false);
  const [suError, setSuError]       = useState("");
  const [suSuccess, setSuSuccess]   = useState(false);

  /* ── Sign In handler ── */
  const handleSignIn = async (e) => {
    e.preventDefault();
    setSiError("");
    setSiLoading(true);

    await new Promise((r) => setTimeout(r, 600)); // simulate network

    const user = authenticate(siEmail, siPass);
    if (!user) {
      setSiError("Wrong email or password. Check the test accounts below.");
      setSiLoading(false);
      return;
    }

    login(user, remember);
    router.push("/dashboard");
  };

  /* ── Sign Up handler (demo: just show success + hint) ── */
  const handleSignUp = async (e) => {
    e.preventDefault();
    setSuError("");
    setSuSuccess(false);

    await new Promise((r) => setTimeout(r, 600));

    const newUser = registerUser({ name: suName, email: suEmail, password: suPass });
    if (!newUser) {
      setSuError("This email is already registered. Try signing in or use a different email.");
      return;
    }

    setSuSuccess(true);
    setTimeout(() => {
      setTab("signin");
      setSiEmail(newUser.email);
      setSiPass("");
      setSuSuccess(false);
    }, 1600);
  };

  return (
    <div className="min-h-screen bg-[#E9E6D1] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-96 h-96 rounded-full bg-[#FAD7A0]/30 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 rounded-full bg-[#2D5A27]/10 blur-[100px]" />
      </div>

      {/* Logo */}
      <Link href="/" className="mb-8 text-3xl font-black tracking-tight text-[#1B3B18] relative z-10">
        Yatra
      </Link>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md rounded-[2rem] border border-white/30 bg-white/25 backdrop-blur-3xl shadow-[0_20px_80px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.5)] p-8">

        {/* Tab switcher */}
        <div className="flex rounded-2xl bg-white/20 border border-white/30 p-1 mb-8">
          {["signin", "signup"].map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-black uppercase tracking-wider transition-all ${
                tab === t ? "bg-[#1B3B18] text-[#FFF9E3] shadow-md" : "text-[#1B3B18]/50 hover:text-[#1B3B18]"
              }`}>
              {t === "signin" ? "Sign In" : "Sign Up"}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* ── SIGN IN ── */}
          {tab === "signin" && (
            <motion.form key="signin" onSubmit={handleSignIn}
              initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }} transition={{ duration: 0.22 }}
              className="space-y-4">

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-[#1B3B18]/50 mb-2">Email</label>
                <input type="email" required value={siEmail}
                  onChange={(e) => { setSiEmail(e.target.value); setSiError(""); }}
                  placeholder="you@example.com" className={inputCls} />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-[#1B3B18]/50 mb-2">Password</label>
                <div className="relative">
                  <input type={showSi ? "text" : "password"} required value={siPass}
                    onChange={(e) => { setSiPass(e.target.value); setSiError(""); }}
                    placeholder="••••••••" className={inputCls + " pr-12"} />
                  <button type="button" onClick={() => setShowSi(!showSi)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1B3B18]/40 hover:text-[#1B3B18] transition-colors">
                    {showSi ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer" onClick={() => setRemember(!remember)}>
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                    remember ? "bg-[#1B3B18] border-[#1B3B18]" : "border-[#1B3B18]/30 bg-white/40"}`}>
                    {remember && (
                      <svg className="w-3 h-3 text-[#FFF9E3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-[#1B3B18]/60 font-medium">Remember me</span>
                </label>
                <a href="#" className="text-sm text-[#D35400] font-bold hover:text-[#b04600] transition-colors">
                  Forgot password?
                </a>
              </div>

              {/* Error */}
              <AnimatePresence>
                {siError && (
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold text-[#D35400]"
                    style={{ background: "rgba(211,84,0,0.08)", border: "1px solid rgba(211,84,0,0.18)" }}>
                    <AlertCircle size={15} className="shrink-0" />
                    {siError}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button type="submit" disabled={siLoading}
                whileHover={!siLoading ? { scale: 1.01 } : {}}
                whileTap={!siLoading ? { scale: 0.98 } : {}}
                className="w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm mt-2 flex items-center justify-center gap-2 transition-all"
                style={{
                  background: siLoading ? "rgba(211,84,0,0.45)" : "#D35400",
                  color: "#FFF9E3",
                  boxShadow: siLoading ? "none" : "0 4px 0 #a03e00, 0 6px 16px rgba(211,84,0,0.25)",
                  cursor: siLoading ? "not-allowed" : "pointer",
                }}>
                {siLoading ? (
                  <>
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full" />
                    Signing in…
                  </>
                ) : "Sign In"}
              </motion.button>
            </motion.form>
          )}

          {/* ── SIGN UP ── */}
          {tab === "signup" && (
            <motion.div key="signup"
              initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.22 }}>

              {suSuccess ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-3 py-8">
                  <CheckCircle2 size={40} className="text-[#2D5A27]" />
                  <p className="text-base font-black text-[#1B3B18]">Account created!</p>
                  <p className="text-sm text-[#1B3B18]/55 text-center">Redirecting you to sign in…</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-[#1B3B18]/50 mb-2">Full Name</label>
                    <input type="text" required value={suName} onChange={(e) => setSuName(e.target.value)}
                      placeholder="Your name" className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-[#1B3B18]/50 mb-2">Email</label>
                    <input type="email" required value={suEmail} onChange={(e) => setSuEmail(e.target.value)}
                      placeholder="you@example.com" className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-[#1B3B18]/50 mb-2">Password</label>
                    <div className="relative">
                      <input type={showSu ? "text" : "password"} required minLength={8} value={suPass}
                        onChange={(e) => setSuPass(e.target.value)}
                        placeholder="••••••••" className={inputCls + " pr-12"} />
                      <button type="button" onClick={() => setShowSu(!showSu)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1B3B18]/40 hover:text-[#1B3B18] transition-colors">
                        {showSu ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    <p className="mt-2 text-[10px] text-[#1B3B18]/40 font-medium">Minimum 8 characters</p>
                  </div>
                  {suError && (
                    <div className="px-4 py-3 rounded-2xl text-sm font-semibold text-[#D35400]"
                      style={{ background: "rgba(211,84,0,0.08)", border: "1px solid rgba(211,84,0,0.18)" }}>
                      {suError}
                    </div>
                  )}
                  <button type="submit"
                    className="w-full py-4 rounded-2xl bg-[#D35400] text-[#FFF9E3] font-black uppercase tracking-widest text-sm shadow-lg shadow-[#D35400]/20 hover:bg-[#b04600] transition-colors mt-2">
                    Create Account
                  </button>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-[#1B3B18]/10" />
          <span className="text-xs text-[#1B3B18]/40 font-bold uppercase tracking-widest">or</span>
          <div className="flex-1 h-px bg-[#1B3B18]/10" />
        </div>

        {/* Social */}
        <div className="grid grid-cols-3 gap-3">
          {[{ icon: Github, label: "GitHub" }, { icon: Mail, label: "Google" }, { icon: Linkedin, label: "LinkedIn" }].map(({ icon: Icon, label }) => (
            <button key={label}
              className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-white/40 border border-white/60 text-[#1B3B18] text-sm font-bold hover:bg-white/60 transition-colors">
              <Icon size={18} />{label}
            </button>
          ))}
        </div>

        <p className="text-center text-xs text-[#1B3B18]/40 font-medium mt-6">
          By continuing, you agree to Yatra&apos;s{" "}
          <a href="#" className="text-[#1B3B18]/60 underline hover:text-[#D35400] transition-colors">Terms</a>{" "}&amp;{" "}
          <a href="#" className="text-[#1B3B18]/60 underline hover:text-[#D35400] transition-colors">Privacy</a>
        </p>
      </div>

      {/* ── Test accounts hint ── */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="relative z-10 mt-6 w-full max-w-md rounded-[1.5rem] p-5"
        style={{
          background: "rgba(255,255,255,0.22)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.35)",
        }}>
        <p className="text-[10px] font-black uppercase tracking-widest text-[#1B3B18]/40 mb-3">
          Test Accounts — click to fill
        </p>
        <div className="space-y-2">
          {TEST_USERS.map((u) => (
            <button key={u.id} type="button"
              onClick={() => { setTab("signin"); setSiEmail(u.email); setSiPass(u.password); setSiError(""); }}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-left transition-all hover:scale-[1.01]"
              style={{
                background: "rgba(255,255,255,0.40)",
                border: "1px solid rgba(255,255,255,0.55)",
              }}>
              <div>
                <p className="text-sm font-black text-[#1B3B18]">{u.name}</p>
                <p className="text-[11px] text-[#1B3B18]/50 font-medium">{u.email}</p>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full"
                style={{
                  background: u.subscription === "Captain" ? "rgba(45,90,39,0.14)"
                    : u.subscription === "Navigator" ? "rgba(211,84,0,0.10)"
                    : "rgba(27,59,24,0.08)",
                  color: u.subscription === "Captain" ? "#2D5A27"
                    : u.subscription === "Navigator" ? "#D35400"
                    : "#1B3B18",
                }}>
                {u.subscription}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      <Link href="/" className="relative z-10 mt-5 text-sm text-[#1B3B18]/50 hover:text-[#1B3B18] font-medium transition-colors">
        ← Back to home
      </Link>
    </div>
  );
}
