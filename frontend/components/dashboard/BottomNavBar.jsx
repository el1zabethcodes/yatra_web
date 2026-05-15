"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, Map, MessageCircle, UserCircle } from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, tab: "dashboard" },
  { label: "Roadmap",   icon: Map,             tab: "roadmap"   },
  { label: "Mentor",    icon: MessageCircle,   tab: "mentor"    },
  { label: "Account",   icon: UserCircle,      tab: "account"   },
];

const LABEL_WIDTH = 80;

export default function BottomNavBar({ activeTab, setActiveTab }) {
  return (
    <div className="fixed inset-x-0 bottom-5 z-50 flex justify-center pointer-events-none">
      <motion.nav
        initial={{ scale: 0.88, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        role="navigation"
        aria-label="Dashboard Navigation"
        className="pointer-events-auto flex items-center p-1.5 h-[52px] space-x-1"
        style={{
          background: "rgba(223,224,191,0.72)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.55)",
          borderRadius: "9999px",
          boxShadow:
            "0 8px 32px rgba(27,59,24,0.14), 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.70)",
        }}
      >
        {NAV_ITEMS.map(({ label, icon: Icon, tab }) => {
          const isActive = activeTab === tab;
          return (
            <motion.button
              key={tab}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab)}
              type="button"
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
              className="relative flex items-center px-3 py-2 rounded-full h-9 min-w-[44px] focus:outline-none transition-colors duration-200"
              style={{
                background: isActive
                  ? "rgba(27,59,24,0.92)"
                  : "transparent",
                color: isActive ? "#FFF9E3" : "rgba(27,59,24,0.50)",
                boxShadow: isActive
                  ? "0 2px 10px rgba(27,59,24,0.25), inset 0 1px 0 rgba(255,255,255,0.12)"
                  : "none",
              }}
            >
              <Icon
                size={20}
                strokeWidth={isActive ? 2.4 : 1.8}
                aria-hidden
                className="shrink-0 transition-all duration-200"
              />

              {/* Animated label */}
              <motion.div
                initial={false}
                animate={{
                  width: isActive ? `${LABEL_WIDTH}px` : "0px",
                  opacity: isActive ? 1 : 0,
                  marginLeft: isActive ? "6px" : "0px",
                }}
                transition={{
                  width:      { type: "spring", stiffness: 350, damping: 32 },
                  opacity:    { duration: 0.18 },
                  marginLeft: { duration: 0.18 },
                }}
                className="overflow-hidden flex items-center"
              >
                <span
                  className="whitespace-nowrap text-xs font-black uppercase tracking-wider select-none overflow-hidden text-ellipsis"
                  style={{ color: isActive ? "#FFF9E3" : "transparent" }}
                  title={label}
                >
                  {label}
                </span>
              </motion.div>
            </motion.button>
          );
        })}
      </motion.nav>
    </div>
  );
}
