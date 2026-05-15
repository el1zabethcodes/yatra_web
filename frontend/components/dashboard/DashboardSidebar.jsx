"use client";

import Image from "next/image";
import Link from "next/link";
import { LayoutDashboard, Map, MessageCircle, User } from "lucide-react";

const NAV = [
  { icon: LayoutDashboard, label: "Dashboard", tab: "dashboard" },
  { icon: Map,             label: "My Roadmap", tab: "roadmap"   },
  { icon: MessageCircle,   label: "AI Mentor",  tab: "mentor"    },
];

/* Mock user — swap with real auth data */
const USER = {
  name:      "Arjun Sharma",
  bio:       "Full-Stack Explorer · CS Junior",
  birthDate: "March 12, 2003",
  avatar:    "/assets/3d_prof_anf.png",
};

export default function DashboardSidebar({ activeTab, setActiveTab }) {
  return (
    <>
      {/* ── DESKTOP SIDEBAR ── */}
      <aside
        className="hidden md:flex flex-col w-64 shrink-0 min-h-screen sticky top-0 h-screen"
        style={{
          background: "rgba(255,255,255,0.22)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRight: "1px solid rgba(255,255,255,0.30)",
        }}
      >
        {/* Logo */}
        <div className="px-6 pt-8 pb-6">
          <div
            className="inline-flex items-center justify-center w-11 h-11 rounded-2xl"
            style={{ background: "#D35400" }}
          >
            <span className="text-white font-black text-xl leading-none">Y</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 space-y-1">
          {NAV.map(({ icon: Icon, label, tab }) => {
            const active = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200"
                style={{
                  background: active ? "rgba(255,255,255,0.45)" : "transparent",
                  color: active ? "#1B3B18" : "rgba(27,59,24,0.55)",
                  boxShadow: active
                    ? "0 2px 12px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.7)"
                    : "none",
                }}
              >
                <Icon size={18} strokeWidth={active ? 2.5 : 1.8} />
                {label}
              </button>
            );
          })}
        </nav>

        {/* Profile card */}
        <div className="px-4 pb-8">
          <div
            className="rounded-[24px] p-4"
            style={{
              background: "rgba(255,255,255,0.35)",
              border: "1px solid rgba(255,255,255,0.45)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.6)",
            }}
          >
            {/* Avatar */}
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden mb-3 mx-auto"
              style={{ border: "2px solid rgba(255,255,255,0.6)" }}>
              <Image
                src={USER.avatar}
                alt={USER.name}
                fill
                className="object-cover object-top"
                sizes="56px"
              />
            </div>
            <p className="text-center text-sm font-black text-[#1B3B18] leading-tight">{USER.name}</p>
            <p className="text-center text-[11px] text-[#1B3B18]/55 font-medium mt-0.5 leading-snug">{USER.bio}</p>
            <div
              className="mt-3 pt-3 flex items-center gap-1.5"
              style={{ borderTop: "1px solid rgba(27,59,24,0.08)" }}
            >
              <User size={11} className="text-[#D35400] shrink-0" />
              <span className="text-[10px] text-[#1B3B18]/45 font-medium">
                Explorer since: {USER.birthDate}
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* ── MOBILE BOTTOM NAV ── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-4 py-3"
        style={{
          background: "rgba(223,224,191,0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255,255,255,0.40)",
          boxShadow: "0 -4px 24px rgba(0,0,0,0.08)",
        }}
      >
        {NAV.map(({ icon: Icon, label, tab }) => {
          const active = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all"
              style={{ color: active ? "#D35400" : "rgba(27,59,24,0.45)" }}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 1.8} />
              <span className="text-[10px] font-bold">{label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
