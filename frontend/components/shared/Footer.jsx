"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="w-full px-6 py-5"
      style={{ background: "rgba(27,59,24,0.07)", borderTop: "1px solid rgba(27,59,24,0.08)" }}
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div
            className="w-6 h-6 rounded-lg flex items-center justify-center"
            style={{ background: "#D35400" }}
          >
            <span className="text-white font-black text-xs leading-none">Y</span>
          </div>
          <span className="text-sm font-black text-[#1B3B18]">Yatra</span>
        </div>

        {/* links */}
        <nav className="flex items-center gap-5">
          {["About", "Terms of Service", "Navigation Support"].map((l) => (
            <a
              key={l}
              href="#"
              className="text-xs font-medium transition-colors duration-150"
              style={{ color: "rgba(27,59,24,0.45)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#1B3B18")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(27,59,24,0.45)")}
            >
              {l}
            </a>
          ))}
        </nav>

        {/* mantra */}
        <p className="text-xs font-medium" style={{ color: "rgba(27,59,24,0.35)" }}>
          Moving with intention. 🌿
        </p>
      </div>
    </footer>
  );
}
