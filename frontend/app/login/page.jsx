"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Github, Mail, Linkedin } from "lucide-react";

export default function LoginPage() {
  const [tab, setTab] = useState("signin"); // "signin" | "signup"

  // Sign In state
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Sign Up state
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log("Sign in:", { signInEmail, signInPassword, rememberMe });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("Sign up:", { signUpName, signUpEmail, signUpPassword });
  };

  return (
    <div className="min-h-screen bg-[#E9E6D1] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-96 h-96 rounded-full bg-[#FAD7A0]/30 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 rounded-full bg-[#2D5A27]/10 blur-[100px]" />
      </div>

      {/* Logo */}
      <Link
        href="/"
        className="mb-8 text-3xl font-black tracking-tight text-[#1B3B18] relative z-10"
      >
        Yatra
      </Link>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md rounded-[2rem] border border-white/30 bg-white/25 backdrop-blur-3xl shadow-[0_20px_80px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.5)] p-8">
        {/* Tab switcher */}
        <div className="flex rounded-2xl bg-white/20 border border-white/30 p-1 mb-8">
          <button
            onClick={() => setTab("signin")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-black uppercase tracking-wider transition-all ${
              tab === "signin"
                ? "bg-[#1B3B18] text-[#FFF9E3] shadow-md"
                : "text-[#1B3B18]/50 hover:text-[#1B3B18]"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab("signup")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-black uppercase tracking-wider transition-all ${
              tab === "signup"
                ? "bg-[#1B3B18] text-[#FFF9E3] shadow-md"
                : "text-[#1B3B18]/50 hover:text-[#1B3B18]"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Sign In form */}
        {tab === "signin" && (
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-[#1B3B18]/50 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-white/60 text-[#1B3B18] font-medium placeholder:text-[#1B3B18]/30 focus:outline-none focus:ring-2 focus:ring-[#1B3B18]/30 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-[#1B3B18]/50 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showSignInPassword ? "text" : "password"}
                  required
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-white/60 text-[#1B3B18] font-medium placeholder:text-[#1B3B18]/30 focus:outline-none focus:ring-2 focus:ring-[#1B3B18]/30 transition pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowSignInPassword(!showSignInPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1B3B18]/40 hover:text-[#1B3B18] transition-colors"
                >
                  {showSignInPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <div
                  onClick={() => setRememberMe(!rememberMe)}
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all cursor-pointer ${
                    rememberMe
                      ? "bg-[#1B3B18] border-[#1B3B18]"
                      : "border-[#1B3B18]/30 bg-white/40"
                  }`}
                >
                  {rememberMe && (
                    <svg
                      className="w-3 h-3 text-[#FFF9E3]"
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
                  )}
                </div>
                <span className="text-sm text-[#1B3B18]/60 font-medium">
                  Remember me
                </span>
              </label>
              <a
                href="#"
                className="text-sm text-[#D35400] font-bold hover:text-[#b04600] transition-colors"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-[#D35400] text-[#FFF9E3] font-black uppercase tracking-widest text-sm shadow-lg shadow-[#D35400]/20 hover:bg-[#b04600] transition-colors mt-2"
            >
              Sign In
            </button>
          </form>
        )}

        {/* Sign Up form */}
        {tab === "signup" && (
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-[#1B3B18]/50 mb-2">
                Full Name
              </label>
              <input
                type="text"
                required
                value={signUpName}
                onChange={(e) => setSignUpName(e.target.value)}
                placeholder="Your name"
                className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-white/60 text-[#1B3B18] font-medium placeholder:text-[#1B3B18]/30 focus:outline-none focus:ring-2 focus:ring-[#1B3B18]/30 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-[#1B3B18]/50 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-white/60 text-[#1B3B18] font-medium placeholder:text-[#1B3B18]/30 focus:outline-none focus:ring-2 focus:ring-[#1B3B18]/30 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-[#1B3B18]/50 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showSignUpPassword ? "text" : "password"}
                  required
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-white/60 text-[#1B3B18] font-medium placeholder:text-[#1B3B18]/30 focus:outline-none focus:ring-2 focus:ring-[#1B3B18]/30 transition pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1B3B18]/40 hover:text-[#1B3B18] transition-colors"
                >
                  {showSignUpPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              <p className="mt-2 text-[10px] text-[#1B3B18]/40 font-medium">
                Minimum 8 characters
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-[#D35400] text-[#FFF9E3] font-black uppercase tracking-widest text-sm shadow-lg shadow-[#D35400]/20 hover:bg-[#b04600] transition-colors mt-2"
            >
              Create Account
            </button>
          </form>
        )}

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-[#1B3B18]/10" />
          <span className="text-xs text-[#1B3B18]/40 font-bold uppercase tracking-widest">
            or
          </span>
          <div className="flex-1 h-px bg-[#1B3B18]/10" />
        </div>

        {/* Social buttons */}
        <div className="grid grid-cols-3 gap-3">
          <button className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-white/40 border border-white/60 text-[#1B3B18] text-sm font-bold hover:bg-white/60 transition-colors">
            <Github size={18} />
            GitHub
          </button>
          <button className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-white/40 border border-white/60 text-[#1B3B18] text-sm font-bold hover:bg-white/60 transition-colors">
            <Mail size={18} />
            Google
          </button>
          <button className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-white/40 border border-white/60 text-[#1B3B18] text-sm font-bold hover:bg-white/60 transition-colors">
            <Linkedin size={18} />
            LinkedIn
          </button>
        </div>

        {/* Bottom hint */}
        <p className="text-center text-xs text-[#1B3B18]/40 font-medium mt-6">
          By continuing, you agree to Yatra&apos;s{" "}
          <a
            href="#"
            className="text-[#1B3B18]/60 underline hover:text-[#D35400] transition-colors"
          >
            Terms
          </a>{" "}
          &amp;{" "}
          <a
            href="#"
            className="text-[#1B3B18]/60 underline hover:text-[#D35400] transition-colors"
          >
            Privacy
          </a>
        </p>
      </div>

      {/* Back link */}
      <Link
        href="/"
        className="relative z-10 mt-6 text-sm text-[#1B3B18]/50 hover:text-[#1B3B18] font-medium transition-colors"
      >
        ← Back to home
      </Link>
    </div>
  );
}
