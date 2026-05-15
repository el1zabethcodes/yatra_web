"use client";

import { motion } from "framer-motion";
import { Check, Compass, Anchor, Crown } from "lucide-react";
import Link from "next/link";

const PLANS = [
  {
    name: "Explorer",
    price: "0",
    description: "Для тих, хто тільки починає свій шлях.",
    features: [
      "Базовий AI ментор",
      "Оцінка навичок (Skill Radar)",
      "Спільнота мандрівників",
      "Щоденні малі перемоги",
    ],
    icon: Anchor,
    color: "#1B3B18",
  },
  {
    name: "Navigator",
    price: "499",
    description: "Оптимальний вибір для активного росту.",
    features: [
      "Розширений AI ментор Kavi",
      "Персональна карта на 30 днів",
      "Аналіз резюме та портфоліо",
      "Пріоритетна підтримка",
    ],
    icon: Compass,
    color: "#D35400",
    popular: true,
  },
  {
    name: "Captain",
    price: "999",
    description: "Повний контроль над вашою кар'єрою.",
    features: [
      "Безлімітний AI ментор 24/7",
      "Динамічна карта розвитку",
      "Підготовка до інтерв'ю з ШІ",
      "Ексклюзивні воркшопи",
    ],
    icon: Crown,
    color: "#6B7D56",
  },
];

/**
 * компонент сторінки цін
 */
export default function YatraPricing() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 space-y-4">
          <h1 className="text-4xl md:text-6xl font-black text-primary tracking-tight">
            Оберіть свій <span className="text-secondary italic">курс.</span>
          </h1>
          <p className="text-lg text-primary/50 max-w-2xl mx-auto font-medium">
            Прозорі тарифи для будь-якого етапу вашої подорожі. Без прихованих комісій, тільки чистий розвиток.
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
                  Найпопулярніший
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
                <span className="text-4xl font-black text-primary">₴{plan.price}</span>
                <span className="text-primary/60 text-sm font-bold uppercase tracking-widest">/місяць</span>
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
                Обрати {plan.name}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-sm text-primary/60 font-bold uppercase tracking-widest">
            Потрібен індивідуальний план для університету? <Link href="#" className="text-primary hover:text-secondary transition-colors underline underline-offset-4">Зв'яжіться з нами</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

