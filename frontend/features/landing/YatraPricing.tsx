"use client";

import { motion } from "framer-motion";
import { Check, Compass, Anchor, Crown } from "lucide-react";
import Link from "next/link";

const PLANS = [
  {
    name: "Explorer",
    price: "0",
    description: "Р”Р»СЏ С‚РёС…, С…С‚Рѕ С‚С–Р»СЊРєРё РїРѕС‡РёРЅР°С” СЃРІС–Р№ С€Р»СЏС….",
    features: [
      "Р‘Р°Р·РѕРІРёР№ AI РјРµРЅС‚РѕСЂ",
      "РћС†С–РЅРєР° РЅР°РІРёС‡РѕРє (Skill Radar)",
      "РЎРїС–Р»СЊРЅРѕС‚Р° РјР°РЅРґСЂС–РІРЅРёРєС–РІ",
      "Р©РѕРґРµРЅРЅС– РјР°Р»С– РїРµСЂРµРјРѕРіРё",
    ],
    icon: Anchor,
    color: "#1B3B18",
  },
  {
    name: "Navigator",
    price: "499",
    description: "РћРїС‚РёРјР°Р»СЊРЅРёР№ РІРёР±С–СЂ РґР»СЏ Р°РєС‚РёРІРЅРѕРіРѕ СЂРѕСЃС‚Сѓ.",
    features: [
      "Р РѕР·С€РёСЂРµРЅРёР№ AI РјРµРЅС‚РѕСЂ Kavi",
      "РџРµСЂСЃРѕРЅР°Р»СЊРЅР° РєР°СЂС‚Р° РЅР° 30 РґРЅС–РІ",
      "РђРЅР°Р»С–Р· СЂРµР·СЋРјРµ С‚Р° РїРѕСЂС‚С„РѕР»С–Рѕ",
      "РџСЂС–РѕСЂРёС‚РµС‚РЅР° РїС–РґС‚СЂРёРјРєР°",
    ],
    icon: Compass,
    color: "#D35400",
    popular: true,
  },
  {
    name: "Captain",
    price: "999",
    description: "РџРѕРІРЅРёР№ РєРѕРЅС‚СЂРѕР»СЊ РЅР°Рґ РІР°С€РѕСЋ РєР°СЂ'С”СЂРѕСЋ.",
    features: [
      "Р‘РµР·Р»С–РјС–С‚РЅРёР№ AI РјРµРЅС‚РѕСЂ 24/7",
      "Р”РёРЅР°РјС–С‡РЅР° РєР°СЂС‚Р° СЂРѕР·РІРёС‚РєСѓ",
      "РџС–РґРіРѕС‚РѕРІРєР° РґРѕ С–РЅС‚РµСЂРІ'СЋ Р· РЁР†",
      "Р•РєСЃРєР»СЋР·РёРІРЅС– РІРѕСЂРєС€РѕРїРё",
    ],
    icon: Crown,
    color: "#6B7D56",
  },
];

/**
 * РєРѕРјРїРѕРЅРµРЅС‚ СЃС‚РѕСЂС–РЅРєРё С†С–РЅ
 */
export default function YatraPricing() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 space-y-4">
          <h1 className="text-4xl md:text-6xl font-black text-primary tracking-tight">
            РћР±РµСЂС–С‚СЊ СЃРІС–Р№ <span className="text-secondary italic">РєСѓСЂСЃ.</span>
          </h1>
          <p className="text-lg text-primary/50 max-w-2xl mx-auto font-medium">
            РџСЂРѕР·РѕСЂС– С‚Р°СЂРёС„Рё РґР»СЏ Р±СѓРґСЊ-СЏРєРѕРіРѕ РµС‚Р°РїСѓ РІР°С€РѕС— РїРѕРґРѕСЂРѕР¶С–. Р‘РµР· РїСЂРёС…РѕРІР°РЅРёС… РєРѕРјС–СЃС–Р№, С‚С–Р»СЊРєРё С‡РёСЃС‚РёР№ СЂРѕР·РІРёС‚РѕРє.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`
                relative flex flex-col p-8 rounded-[40px] border transition-all
                ${plan.popular ? "border-secondary bg-surface/20 shadow-xl" : "border-surface bg-background hover:border-surface/80 shadow-sm"}
              `}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary text-surface px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                  РќР°Р№РїРѕРїСѓР»СЏСЂРЅС–С€РёР№
                </div>
              )}

              <div className="mb-8 space-y-4">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: `${plan.color}10`, color: plan.color }}
                >
                  <plan.icon size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-primary">{plan.name}</h3>
                  <p className="text-sm text-primary/60 font-medium mt-1">{plan.description}</p>
                </div>
              </div>

              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-4xl font-black text-primary">в‚ґ{plan.price}</span>
                <span className="text-primary/60 text-sm font-bold uppercase tracking-widest">/РјС–СЃСЏС†СЊ</span>
              </div>

              <ul className="flex-1 space-y-4 mb-10">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={12} className="text-secondary" />
                    </div>
                    <span className="text-sm font-medium text-primary/70">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/login"
                className={`
                  w-full py-4 rounded-2xl text-center text-sm font-black uppercase tracking-widest transition-all
                  ${plan.popular ? "bg-primary text-surface hover:bg-secondary shadow-lg shadow-secondary/20" : "bg-surface text-primary hover:bg-surface/80"}
                `}
              >
                РћР±СЂР°С‚Рё {plan.name}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-sm text-primary/60 font-bold uppercase tracking-widest">
            РџРѕС‚СЂС–Р±РµРЅ С–РЅРґРёРІС–РґСѓР°Р»СЊРЅРёР№ РїР»Р°РЅ РґР»СЏ СѓРЅС–РІРµСЂСЃРёС‚РµС‚Сѓ? <Link href="#" className="text-primary hover:text-secondary transition-colors underline underline-offset-4">Р—РІ'СЏР¶С–С‚СЊСЃСЏ Р· РЅР°РјРё</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

