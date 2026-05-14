"use client";

import { AnimatePresence, motion } from "framer-motion";
import { LayoutDashboard, Map, MessageCircle, UserCircle, LucideIcon } from "lucide-react";
import type { DashboardTabKey } from "@/app/dashboard/page";

interface NavItem {
  label: string;
  icon: LucideIcon;
  tab: DashboardTabKey;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Р“РѕР»РѕРІРЅР°", icon: LayoutDashboard, tab: "dashboard" },
  { label: "РљР°СЂС‚Р°", icon: Map, tab: "roadmap" },
  { label: "РњРµРЅС‚РѕСЂ", icon: MessageCircle, tab: "mentor" },
  { label: "РђРєР°СѓРЅС‚", icon: UserCircle, tab: "account" },
];

interface BottomNavBarProps {
  activeTab: DashboardTabKey;
  setActiveTab: (tab: DashboardTabKey) => void;
}

/**
 * РЅРёР¶РЅСЏ РЅР°РІС–РіР°С†С–Р№РЅР° РїР°РЅРµР»СЊ РґР°С€Р±РѕСЂРґСѓ
 */
export default function BottomNavBar({ activeTab, setActiveTab }: BottomNavBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-6 z-50 flex justify-center pointer-events-none px-4">
      <nav
        role="navigation"
        aria-label="РќР°РІС–РіР°С†С–СЏ РґР°С€Р±РѕСЂРґСѓ"
        className="pointer-events-auto flex items-center p-1.5 bg-background/80 backdrop-blur-md border border-surface/50 rounded-full shadow-2xl"
      >
        {NAV_ITEMS.map(({ label, icon: Icon, tab }) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              type="button"
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
              className={`
                relative flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300
                ${isActive ? "bg-primary text-surface shadow-lg" : "text-primary/60 hover:text-primary/60"}
              `}
            >
              <Icon
                size={20}
                strokeWidth={isActive ? 2.5 : 2}
                aria-hidden
              />
              
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.span
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "auto", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="overflow-hidden whitespace-nowrap text-xs font-black uppercase tracking-wider"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

