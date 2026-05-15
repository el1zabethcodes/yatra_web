"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import BottomNavBar  from "@/components/dashboard/BottomNavBar";
import DashboardTab  from "@/components/dashboard/DashboardTab";
import RoadmapTab    from "@/components/dashboard/RoadmapTab";
import MentorTab     from "@/components/dashboard/MentorTab";
import AccountTab    from "@/components/dashboard/AccountTab";

const TABS = {
  dashboard: DashboardTab,
  roadmap:   RoadmapTab,
  mentor:    MentorTab,
  account:   AccountTab,
};

const NAV_LINKS = [
  { label: "Features", href: "/features" },
  { label: "Pricing",  href: "/pricing"  },
];

/* ── Dashboard-specific header ── */
function DashboardHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => { logout(); router.push("/login"); };

  return (
    <header
      className="sticky top-0 z-40"
      style={{
        background: "rgba(223,224,191,0.75)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.35)",
        boxShadow: "0 4px 24px rgba(27,59,24,0.06)",
      }}
    >
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-black tracking-tight text-[#1B3B18] shrink-0 hover:text-[#D35400] transition-colors"
        >
          Yatra
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[#1B3B18]/60 hover:text-[#1B3B18] transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-black"
            style={{
              background: "rgba(45,90,39,0.12)",
              border: "1px solid rgba(45,90,39,0.20)",
              color: "#2D5A27",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#2D5A27] animate-pulse" />
            {user?.name ?? "Explorer"}
          </div>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all hover:scale-105"
            style={{
              background: "rgba(211,84,0,0.10)",
              border: "1px solid rgba(211,84,0,0.20)",
              color: "#D35400",
            }}
          >
            Log out
          </button>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden p-2 rounded-xl text-[#1B3B18] hover:bg-white/30 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="md:hidden overflow-hidden"
            style={{ borderTop: "1px solid rgba(255,255,255,0.30)" }}
          >
            <div className="px-4 py-4 flex flex-col gap-3"
              style={{ background: "rgba(223,224,191,0.90)" }}>
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-semibold text-[#1B3B18]/70 hover:text-[#D35400] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-1 border-t border-white/30 text-xs font-black text-[#2D5A27]">
                {user?.name ?? "Explorer"} · {user?.subscription ?? "Explorer"} Plan
              </div>
              <button
                onClick={handleLogout}
                className="text-xs font-bold text-[#D35400] hover:underline text-left"
              >
                Log out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ══════════════════════════════════════════
   PAGE
══════════════════════════════════════════ */
export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { user, loading } = useAuth();
  const router = useRouter();
  const ActiveComponent = TABS[activeTab];

  /* Redirect to login if not authenticated */
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  /* Loading state */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#DFE0BF" }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-[#1B3B18]/20 border-t-[#D35400] rounded-full"
        />
      </div>
    );
  }

  /* If not authenticated, don't render anything */
  if (!user) {
    return null;
  }

  return (
      <div
        className="min-h-screen relative overflow-x-hidden"
        style={{ background: "#DFE0BF", color: "#1B3B18" }}
      >

      {/* ── Ambient colour blobs ── */}
      <div className="fixed pointer-events-none z-0" style={{
        top: "5%", left: "20%", width: 500, height: 500,
        background: "radial-gradient(circle, rgba(45,90,39,0.10) 0%, transparent 65%)",
        filter: "blur(80px)",
      }} />
      <div className="fixed pointer-events-none z-0" style={{
        bottom: "10%", right: "5%", width: 380, height: 380,
        background: "radial-gradient(circle, rgba(211,84,0,0.09) 0%, transparent 65%)",
        filter: "blur(70px)",
      }} />

      {/* ── Main content ── */}
      <main className="relative z-10 max-w-3xl mx-auto px-4 py-8 md:px-8 md:py-10 pb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <ActiveComponent setActiveTab={setActiveTab} />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ── Floating pill nav ── */}
      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
