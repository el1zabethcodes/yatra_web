"use client";

import { motion } from "framer-motion";
import { Check, Compass, Anchor, Crown } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface FadeProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

const Fade = ({ children, delay = 0, className = "" }: FadeProps) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const PLANS = [
  {
    name: "Explorer",
    price: "0",
    description: "For those just starting their pilgrimage.",
    features: [
      "Basic AI Mentor",
      "Skill Radar Assessment",
      "Community of Pilgrims",
      "Daily Small Wins",
    ],
    icon: Anchor,
    color: "#1B3B18",
  },
  {
    name: "Navigator",
    price: "499",
    description: "The optimal choice for active growth.",
    features: [
      "Advanced AI Mentor Kavi",
      "30-Day Personalized Roadmap",
      "Resume & Portfolio Analysis",
      "Priority Support",
    ],
    icon: Compass,
    color: "#D35400",
    popular: true,
  },
  {
    name: "Captain",
    price: "999",
    description: "Full control over your career voyage.",
    features: [
      "24/7 Unlimited AI Mentor",
      "Dynamic Adaptive Roadmap",
      "AI-Powered Interview Prep",
      "Exclusive Workshops",
    ],
    icon: Crown,
    color: "#6B7D56",
  },
];

/**
 * компонент сторінки цін (YatraPricing)
 */
export default function YatraPricing() {
  const glassCardClasses = "bg-white/28 backdrop-blur-[14px] border border-white/45 shadow-[0_6px_28px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.65)] rounded-[40px]";
  const popularCardClasses = "bg-white/35 backdrop-blur-[16px] border-[#D35400]/30 shadow-[0_12px_48px_rgba(211,84,0,0.1),inset_0_1px_0_rgba(255,255,255,0.7)] rounded-[40px]";

  return (
    <section className="py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20 space-y-4">
          <Fade>
            <h1 className="text-4xl md:text-6xl font-black text-[#1B3B18] tracking-tight">
              Choose your <span className="italic opacity-80">course.</span>
            </h1>
            <p className="text-lg text-[#1B3B18]/55 max-w-2xl mx-auto font-medium">
              Transparent pricing for every stage of your pilgrimage. No hidden fees, just pure growth.
            </p>
          </Fade>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLANS.map((plan, i) => (
            <Fade key={plan.name} delay={i * 0.1}>
              <div
                className={`
                  relative flex flex-col p-8 h-full transition-all duration-300
                  ${plan.popular ? popularCardClasses : glassCardClasses}
                  ${plan.popular ? "scale-105 z-10" : "hover:scale-[1.02]"}
                `}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#D35400] text-[#E6E4C5] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-[#D35400]/20">
                    Most Popular
                  </div>
                )}

                <div className="mb-8 space-y-4">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/50 shadow-inner"
                    style={{ color: plan.color }}
                  >
                    <plan.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-[#1B3B18]">{plan.name}</h3>
                    <p className="text-sm text-[#1B3B18]/60 font-medium mt-1">{plan.description}</p>
                  </div>
                </div>

                <div className="mb-8 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-[#1B3B18]">₴{plan.price}</span>
                  <span className="text-[#1B3B18]/60 text-sm font-bold uppercase tracking-widest">/month</span>
                </div>

                <ul className="flex-1 space-y-4 mb-10">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#6B7D56]/10 flex items-center justify-center shrink-0 mt-0.5 border border-[#6B7D56]/20">
                        <Check size={12} className="text-[#1B3B18]" />
                      </div>
                      <span className="text-sm font-medium text-[#1B3B18]/70">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/login"
                  className={`
                    w-full py-4 rounded-2xl text-center text-sm font-black uppercase tracking-widest transition-all
                    ${plan.popular 
                      ? "bg-gradient-to-b from-[#7a8f63] to-[#6B7D56] text-[#E6E4C5] shadow-[0_7px_0_#4a5a3a,0_12px_24px_rgba(74,90,58,0.4)]" 
                      : "bg-[#1B3B18] text-[#E6E4C5] hover:opacity-90 shadow-[0_7px_0_#0a1a08]"}
                  `}
                >
                  Choose {plan.name}
                </Link>
              </div>
            </Fade>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-sm text-[#1B3B18]/60 font-bold uppercase tracking-widest">
            Need a custom plan for your university? <Link href="#" className="text-[#1B3B18] hover:opacity-70 transition-colors underline underline-offset-4">Contact us</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

