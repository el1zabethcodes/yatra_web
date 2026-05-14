"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut } from "lucide-react";
import { useAuth } from "@/shared/lib/AuthContext";

const NAV_LINKS = [
  { label: "РњРѕР¶Р»РёРІРѕСЃС‚С–", href: "/features" },
  { label: "Р¦С–РЅРё", href: "/pricing" },
];

/**
 * Р·Р°РіРѕР»РѕРІРѕРє РґР°С€Р±РѕСЂРґСѓ
 */
export default function DashboardHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b border-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-2xl font-black tracking-tight text-primary hover:opacity-80 transition-opacity"
          >
            Yatra
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-primary/60 hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface/50 border border-surface text-xs font-bold text-primary">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              {user?.name}
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-full text-accent hover:bg-accent/10 transition-colors"
              aria-label="Р’РёР№С‚Рё"
            >
              <LogOut size={18} />
            </button>
          </div>

          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-primary hover:bg-surface/50 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="РњРµРЅСЋ"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-surface/30 bg-background overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-medium text-primary/70"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-surface/30 flex items-center justify-between">
                <span className="text-sm font-bold text-primary">{user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-sm font-bold text-accent"
                >
                  Р’РёР№С‚Рё
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

