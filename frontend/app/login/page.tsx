"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Github, Mail, Linkedin, AlertCircle, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/shared/lib/AuthContext";
import { authenticate, registerUser, TEST_USERS, User } from "@/shared/lib/users";

const inputCls =
  "w-full px-5 py-4 rounded-2xl bg-background border border-surface text-primary font-medium placeholder:text-primary/50 focus:outline-none focus:ring-2 focus:ring-secondary/40 transition-all";

/**
 * сторінка входу та реєстрації
 */
export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [tab, setTab] = useState("signin");

  /* вхід */
  const [siEmail, setSiEmail] = useState("");
  const [siPass, setSiPass] = useState("");
  const [showSi, setShowSi] = useState(false);
  const [remember, setRemember] = useState(false);
  const [siError, setSiError] = useState("");
  const [siLoading, setSiLoading] = useState(false);

  /* реєстрація */
  const [suName, setSuName] = useState("");
  const [suEmail, setSuEmail] = useState("");
  const [suPass, setSuPass] = useState("");
  const [showSu, setShowSu] = useState(false);
  const [suError, setSuError] = useState("");
  const [suSuccess, setSuSuccess] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setSiError("");
    setSiLoading(true);

    await new Promise((r) => setTimeout(r, 800));

    const user = authenticate(siEmail, siPass);
    if (!user) {
      setSiError("Невірний email або пароль. Спробуйте тестові акаунти.");
      setSiLoading(false);
      return;
    }

    login(user as User, remember);
    router.push("/dashboard");
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuError("");
    setSuSuccess(false);

    await new Promise((r) => setTimeout(r, 800));

    const newUser = registerUser({ name: suName, email: suEmail, password: suPass });
    if (!newUser) {
      setSuError("Цей email вже зареєстрований.");
      return;
    }

    setSuSuccess(true);
    setTimeout(() => {
      setTab("signin");
      setSiEmail(newUser.email);
      setSiPass("");
      setSuSuccess(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* логотип */}
      <Link href="/" className="mb-10 text-3xl font-black tracking-tight text-primary">
        Yatra
      </Link>

      {/* картка форми */}
      <div className="w-full max-w-md bg-background border border-surface rounded-[40px] p-8 shadow-sm">
        {/* перемикач вкладок */}
        <div className="flex p-1 bg-surface/30 border border-surface rounded-2xl mb-10">
          {[
            { id: "signin", label: "Увійти" },
            { id: "signup", label: "Реєстрація" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`
                flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                ${tab === t.id ? "bg-primary text-surface shadow-md" : "text-primary/60 hover:text-primary/60"}
              `}
            >
              {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab === "signin" ? (
            <motion.form
              key="signin"
              onSubmit={handleSignIn}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <label htmlFor="signin-email" className="block text-[10px] font-black uppercase tracking-widest text-primary/60">Email</label>
                <input
                  id="signin-email"
                  type="email"
                  required
                  value={siEmail}
                  onChange={(e) => { setSiEmail(e.target.value); setSiError(""); }}
                  placeholder="name@example.com"
                  className={inputCls}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="signin-password" className="block text-[10px] font-black uppercase tracking-widest text-primary/60">Пароль</label>
                <div className="relative">
                  <input
                    id="signin-password"
                    type={showSi ? "text" : "password"}
                    required
                    value={siPass}
                    onChange={(e) => { setSiPass(e.target.value); setSiError(""); }}
                    placeholder="••••••••"
                    className={`${inputCls} pr-12`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowSi(!showSi)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/60 hover:text-primary"
                    aria-label={showSi ? "Приховати пароль" : "Показати пароль"}
                  >
                    {showSi ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={remember}
                    onChange={() => setRemember(!remember)}
                  />
                  <div className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${
                    remember ? "bg-primary border-primary" : "border-surface bg-background group-hover:border-primary/30"
                  }`}>
                    {remember && <CheckCircle2 size={12} className="text-surface" />}
                  </div>
                  <span className="text-sm font-medium text-primary/60">Запам'ятати мене</span>
                </label>
                <a href="#" className="text-sm font-bold text-accent hover:opacity-80 transition-opacity">Забули пароль?</a>
              </div>

              {siError && (
                <div className="flex items-center gap-3 p-4 bg-accent/5 border border-accent/10 rounded-2xl text-xs font-bold text-accent uppercase tracking-widest">
                  <AlertCircle size={16} />
                  {siError}
                </div>
              )}

              <button
                type="submit"
                disabled={siLoading}
                className={`
                  w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl transition-all
                  ${siLoading ? "bg-primary/50 text-surface cursor-not-allowed" : "bg-primary text-surface hover:bg-secondary"}
                `}
              >
                {siLoading ? "Входимо..." : "Увійти"}
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="signup"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              {suSuccess ? (
                <div className="text-center py-8 space-y-4">
                  <CheckCircle2 size={48} className="text-secondary mx-auto" />
                  <p className="text-xl font-black text-primary">Акаунт створено!</p>
                  <p className="text-sm text-primary/60">Повертаємось до входу...</p>
                </div>
              ) : (
                <form onSubmit={handleSignUp} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="signup-name" className="block text-[10px] font-black uppercase tracking-widest text-primary/60">Повне ім'я</label>
                    <input
                      id="signup-name"
                      type="text"
                      required
                      value={suName}
                      onChange={(e) => setSuName(e.target.value)}
                      placeholder="Ваше ім'я"
                      className={inputCls}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="signup-email" className="block text-[10px] font-black uppercase tracking-widest text-primary/60">Email</label>
                    <input
                      id="signup-email"
                      type="email"
                      required
                      value={suEmail}
                      onChange={(e) => setSuEmail(e.target.value)}
                      placeholder="name@example.com"
                      className={inputCls}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="signup-password" className="block text-[10px] font-black uppercase tracking-widest text-primary/60">Пароль</label>
                    <div className="relative">
                      <input
                        id="signup-password"
                        type={showSu ? "text" : "password"}
                        required
                        minLength={8}
                        value={suPass}
                        onChange={(e) => setSuPass(e.target.value)}
                        placeholder="••••••••"
                        className={`${inputCls} pr-12`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowSu(!showSu)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/60 hover:text-primary"
                        aria-label={showSu ? "Приховати пароль" : "Показати пароль"}
                      >
                        {showSu ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  {suError && (
                    <div className="p-4 bg-accent/5 border border-accent/10 rounded-2xl text-xs font-bold text-accent uppercase tracking-widest">
                      {suError}
                    </div>
                  )}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-primary text-surface font-black uppercase tracking-widest text-sm shadow-xl hover:bg-secondary transition-all"
                  >
                    Зареєструватися
                  </button>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-surface" />
          <span className="text-[10px] font-black uppercase tracking-widest text-primary/50">або</span>
          <div className="flex-1 h-px bg-surface" />
        </div>

        {/* соціальні мережі */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Github, label: "GitHub" },
            { icon: Mail, label: "Google" },
            { icon: Linkedin, label: "LinkedIn" },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="flex items-center justify-center p-3 rounded-2xl bg-surface/20 border border-surface text-primary/60 hover:bg-surface/40 transition-colors"
              title={label}
            >
              <Icon size={20} />
            </button>
          ))}
        </div>
      </div>

      {/* тестові акаунти */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-10 w-full max-w-md bg-background border border-surface rounded-[32px] p-6 space-y-4"
      >
        <p className="text-[10px] font-black uppercase tracking-widest text-primary/60">Тестові акаунти</p>
        <div className="space-y-3">
          {TEST_USERS.map((u) => (
            <button
              key={u.id}
              onClick={() => { setTab("signin"); setSiEmail(u.email); setSiPass(""); }}
              className="w-full flex items-center justify-between p-4 bg-surface/10 border border-surface rounded-2xl text-left hover:bg-surface/20 transition-all"
            >
              <div>
                <p className="text-sm font-black text-primary">{u.name}</p>
                <p className="text-[10px] font-medium text-primary/60">{u.email}</p>
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-primary/5 text-primary/60 border border-primary/10">
                {u.subscription}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      <Link href="/" className="mt-8 text-sm font-bold text-primary/60 hover:text-primary transition-colors">
        ← Повернутися на головну
      </Link>
    </div>
  );
}

