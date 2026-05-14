"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "РњРѕР¶Р»РёРІРѕСЃС‚С–", href: "/features" },
  { label: "Р¦С–РЅРё", href: "/pricing" },
];

/**
 * РєРѕРјРїРѕРЅРµРЅС‚ РІРµСЂС…РЅСЊРѕС— РЅР°РІС–РіР°С†С–С—
 */
export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-surface/30 bg-background/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Р»РѕРіРѕС‚РёРї */}
          <Link
            href="/"
            className="text-2xl font-black tracking-tight text-primary hover:opacity-80 transition-opacity"
          >
            Yatra
          </Link>

          {/* РґРµСЃРєС‚РѕРїРЅР° РЅР°РІС–РіР°С†С–СЏ */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-primary/60 hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* РєРЅРѕРїРєРё РґС–Р№ */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="px-6 py-2 rounded-full bg-primary text-surface text-sm font-bold uppercase tracking-wider hover:bg-secondary transition-colors"
            >
              РЈРІС–Р№С‚Рё
            </Link>
          </div>

          {/* РјРѕР±С–Р»СЊРЅРµ РјРµРЅСЋ (Р±СѓСЂРіРµСЂ) */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-primary hover:bg-surface/50 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Р—Р°РєСЂРёС‚Рё РјРµРЅСЋ" : "Р’С–РґРєСЂРёС‚Рё РјРµРЅСЋ"}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* РјРѕР±С–Р»СЊРЅР° РїР°РЅРµР»СЊ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-surface/30 bg-background overflow-hidden"
          >
            <nav className="flex flex-col gap-4 px-4 py-6">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-medium text-primary/70 hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-6 py-3 rounded-full bg-primary text-surface text-center text-sm font-bold uppercase tracking-wider"
              >
                РЈРІС–Р№С‚Рё
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

