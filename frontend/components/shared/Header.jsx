"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/20 backdrop-blur-3xl bg-white/20 shadow-[0_8px_32px_rgba(255,255,255,0.12)]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-black tracking-tight text-[#1B3B18] shrink-0"
        >
          Yatra
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[#1B3B18]/70 hover:text-[#1B3B18] transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Log in button */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="px-5 py-2.5 rounded-full bg-[#1B3B18] text-[#FFF9E3] text-sm font-black uppercase tracking-wider hover:bg-[#2D5A27] transition-colors shadow-md"
          >
            Log in
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden p-2 rounded-xl text-[#1B3B18] hover:bg-white/30 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/20 bg-white/30 backdrop-blur-3xl px-6 py-4 flex flex-col gap-4">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="text-[#1B3B18]/80 font-semibold text-sm hover:text-[#D35400] transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/login"
            onClick={() => setMobileOpen(false)}
            className="mt-2 px-5 py-3 rounded-full bg-[#1B3B18] text-[#FFF9E3] text-sm font-black uppercase tracking-wider text-center hover:bg-[#2D5A27] transition-colors"
          >
            Dashboard
          </Link>
        </div>
      )}
    </header>
  );
}
