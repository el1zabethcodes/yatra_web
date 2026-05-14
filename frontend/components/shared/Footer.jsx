"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const links = [
  { label: "About",               href: "#" },
  { label: "Terms of Service",    href: "#" },
  { label: "Navigation Support",  href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/20">
      {/* main row */}
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* left — logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "#D35400" }}
          >
            <span className="text-white font-black text-base leading-none">Y</span>
          </div>
          <span className="text-xl font-black tracking-tight text-[#1B3B18]">Yatra</span>
        </Link>

        {/* center — intentionally empty */}
        <div className="hidden md:block flex-1" />

        {/* right — links + mantra */}
        <div className="flex flex-col items-start md:items-end gap-3">
          <nav className="flex flex-wrap gap-5">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-xs font-semibold transition-colors duration-200"
                style={{ color: "rgba(27,59,24,0.50)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#1B3B18")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(27,59,24,0.50)")}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <p className="text-[11px] font-medium" style={{ color: "rgba(27,59,24,0.35)" }}>
            Moving with intention. 🌿
          </p>
        </div>
      </div>

      {/* corals — static, no sway */}
      <div className="w-full pointer-events-none select-none">
        <Image
          src="/assets/main/coralls.png"
          alt=""
          width={1440}
          height={320}
          className="w-full h-auto object-cover object-bottom"
          style={{ display: "block" }}
        />
      </div>
    </footer>
  );
}
