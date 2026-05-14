"use client";

import { motion } from "framer-motion";

interface Skill {
  label: string;
  value: number;
}

const DEFAULT_SKILLS: Skill[] = [
  { label: "Frontend",    value: 0.72 },
  { label: "Backend",     value: 0.48 },
  { label: "Logic",       value: 0.63 },
  { label: "Design",      value: 0.55 },
  { label: "Soft Skills", value: 0.80 },
];

const SIZE   = 240; // stable square size keeps the dashboard card from shifting
const CENTER = SIZE / 2;
const CHART_PADDING = 32;
const RINGS  = [0.25, 0.5, 0.75, 1.0];

function polarToXY(angle: number, radius: number) {
  const rad = (angle - 90) * (Math.PI / 180);
  return {
    x: CENTER + radius * Math.cos(rad),
    y: CENTER + radius * Math.sin(rad),
  };
}

function buildPolygon(values: number[], maxR: number) {
  const step = 360 / values.length;
  return values
    .map((v, i) => {
      const { x, y } = polarToXY(i * step, v * maxR);
      return `${x},${y}`;
    })
    .join(" ");
}

interface SkillRadarProps {
  scores?: Record<string, number>;
}

/**
 * РєРѕРјРїРѕРЅРµРЅС‚ СЂР°РґР°СЂР° РЅР°РІРёС‡РѕРє (SVG РіСЂР°С„С–Рє)
 */
export default function SkillRadar({ scores }: SkillRadarProps) {
  const SKILLS = scores
    ? Object.entries(scores).map(([label, value]) => ({ label, value }))
    : DEFAULT_SKILLS;

  const maxR   = CENTER - CHART_PADDING;
  const step   = 360 / SKILLS.length;
  const points = buildPolygon(SKILLS.map((s) => s.value), maxR);

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          aria-label="Skill radar chart"
          aria-describedby="skill-radar-data"
          role="img"
          className="overflow-visible"
        >
          {/* РєРѕРЅС†РµРЅС‚СЂРёС‡РЅС– РєС–Р»СЊС†СЏ */}
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
                stroke="currentColor"
                className="text-surface"
                strokeWidth="1.5"
              />
            );
          })}

          {/* РѕСЃС– */}
          {SKILLS.map((_, i) => {
            const { x, y } = polarToXY(i * step, maxR);
            return (
              <line
                key={i}
                x1={CENTER}
                y1={CENTER}
                x2={x}
                y2={y}
                stroke="currentColor"
                className="text-surface"
                strokeWidth="1.5"
              />
            );
          })}

          {/* Р·Р°РїРѕРІРЅРµРЅРёР№ Р±Р°РіР°С‚РѕРєСѓС‚РЅРёРє РЅР°РІРёС‡РѕРє */}
          <motion.polygon
            points={points}
            className="fill-secondary/20 stroke-secondary"
            strokeWidth="2.5"
            strokeLinejoin="round"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
          />

          {/* С‚РѕС‡РєРё РЅР°РІРёС‡РѕРє */}
          {SKILLS.map((s, i) => {
            const { x, y } = polarToXY(i * step, s.value * maxR);
            return (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r={4}
                className="fill-secondary stroke-background"
                strokeWidth="2"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                style={{ transformOrigin: `${x}px ${y}px` }}
              />
            );
          })}
        </svg>
      </div>

      {/* Р»РµРіРµРЅРґР° */}
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-8">
        {SKILLS.map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-secondary" />
            <span className="text-[11px] font-bold text-primary/60 uppercase tracking-widest">
              {s.label}
              <span className="ml-2 text-primary font-black">
                {Math.round(s.value * 100)}%
              </span>
            </span>
          </div>
        ))}
      </div>

      <table id="skill-radar-data" className="sr-only">
        <caption>Skill radar values</caption>
        <tbody>
          {SKILLS.map((skill) => (
            <tr key={skill.label}>
              <th scope="row">{skill.label}</th>
              <td>{Math.round(skill.value * 100)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

