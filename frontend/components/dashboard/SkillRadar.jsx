"use client";

import { motion } from "framer-motion";

const DEFAULT_SKILLS = [
  { label: "Frontend",    value: 0.72 },
  { label: "Backend",     value: 0.48 },
  { label: "Logic",       value: 0.63 },
  { label: "Design",      value: 0.55 },
  { label: "Soft Skills", value: 0.80 },
];

const SIZE   = 220;
const CENTER = SIZE / 2;
const RINGS  = [0.25, 0.5, 0.75, 1.0];
const LEVELS = 4;

function polarToXY(angle, radius) {
  const rad = (angle - 90) * (Math.PI / 180);
  return {
    x: CENTER + radius * Math.cos(rad),
    y: CENTER + radius * Math.sin(rad),
  };
}

function buildPolygon(values, maxR) {
  const step = 360 / values.length;
  return values
    .map((v, i) => {
      const { x, y } = polarToXY(i * step, v * maxR);
      return `${x},${y}`;
    })
    .join(" ");
}

export default function SkillRadar({ scores }) {
  const SKILLS = scores
    ? Object.entries(scores).map(([label, value]) => ({ label, value }))
    : DEFAULT_SKILLS;

  const maxR   = CENTER - 24;
  const step   = 360 / SKILLS.length;
  const points = buildPolygon(SKILLS.map((s) => s.value), maxR);

  return (
    <div className="flex flex-col items-center">
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        aria-label="Skill radar chart"
        role="img"
      >
        {/* ── Concentric rings ── */}
        {RINGS.map((r, ri) => {
          const pts = Array.from({ length: SKILLS.length }, (_, i) => {
            const { x, y } = polarToXY(i * step, r * maxR);
            return `${x},${y}`;
          }).join(" ");
          return (
            <polygon
              key={ri}
              points={pts}
              fill="none"
              stroke="rgba(27,59,24,0.10)"
              strokeWidth="1"
            />
          );
        })}

        {/* ── Axis lines ── */}
        {SKILLS.map((_, i) => {
          const { x, y } = polarToXY(i * step, maxR);
          return (
            <line
              key={i}
              x1={CENTER}
              y1={CENTER}
              x2={x}
              y2={y}
              stroke="rgba(27,59,24,0.12)"
              strokeWidth="1"
            />
          );
        })}

        {/* ── Filled skill polygon ── */}
        <motion.polygon
          points={points}
          fill="rgba(45,90,39,0.18)"
          stroke="#2D5A27"
          strokeWidth="2"
          strokeLinejoin="round"
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
          style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
        />

        {/* ── Skill dots ── */}
        {SKILLS.map((s, i) => {
          const { x, y } = polarToXY(i * step, s.value * maxR);
          return (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r={4}
              fill="#2D5A27"
              stroke="white"
              strokeWidth="2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
              style={{ transformOrigin: `${x}px ${y}px` }}
            />
          );
        })}

        {/* ── Center dot ── */}
        <circle cx={CENTER} cy={CENTER} r={3} fill="rgba(27,59,24,0.25)" />
      </svg>

      {/* ── Labels ── */}
      <div className="relative w-full mt-1" style={{ height: 0 }}>
        {/* We render labels as absolutely positioned elements relative to the SVG */}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 mt-3">
        {SKILLS.map((s) => (
          <div key={s.label} className="flex items-center gap-1.5">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: "#2D5A27" }}
            />
            <span className="text-[11px] font-semibold text-[#1B3B18]/65">
              {s.label}
              <span className="ml-1 text-[#2D5A27] font-black">
                {Math.round(s.value * 100)}%
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
