"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

/**
 * допоміжний компонент для анімації появи
 */
const Fade = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

/**
 * секція з однією особливістю (зображення + текст)
 */
function Scene({
  img,
  alt,
  text,
  reverse = false,
  dark = false,
  ratio = "1/1",
}: {
  img: string;
  alt: string;
  text: string;
  reverse?: boolean;
  dark?: boolean;
  ratio?: string;
}) {
  return (
    <section
      className={`relative py-24 px-4 sm:px-6 lg:px-8 ${dark ? "bg-primary text-surface" : "bg-background"}`}
    >
      <div
        className={`relative z-10 max-w-7xl mx-auto flex flex-col gap-16 items-center ${
          reverse ? "md:flex-row-reverse" : "md:flex-row"
        }`}
      >
        {/* зображення */}
        <Fade className="w-full md:w-1/2 flex justify-center">
          <div
            className="relative w-full max-w-[520px]"
            style={{ aspectRatio: ratio }}
          >
            <Image
              src={img}
              alt={alt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 520px"
            />
          </div>
        </Fade>

        {/* текст */}
        <Fade delay={0.15} className="w-full md:w-1/2">
          <p
            className={`text-xl md:text-2xl font-medium leading-relaxed ${
              dark ? "text-surface/80" : "text-primary/75"
            }`}
          >
            {text}
          </p>
        </Fade>
      </div>
    </section>
  );
}

/**
 * головний компонент секції можливостей
 */
export default function FeaturesSection() {
  return (
    <div id="features">
      {/* сцена 1 — хаос */}
      <Scene
        img="/assets/features/1.png"
        alt="Ashta overwhelmed with chaos"
        text="Це була я, Ашта. В окулярах, але все одно нічого не бачила крізь шторм відкритих вкладок та незакінчених туторіалів. Я тонула в опціях, але голодувала за системою. Мій мозок був схожий на джунглі. Жодної карти. Жодного фокусу. Тільки чиста паніка."
        ratio="1/1"
        reverse={false}
      />

      {/* сцена 2 — маяк */}
      <Scene
        img="/assets/features/2.png"
        alt="Lighthouse beacon"
        text="Потім я знайшла свій маяк: Yatra. Він не сказав мені «працюй більше». Він сказав «дихай». Я зрозуміла, що океан — це не те, чого треба боятися, а те, чим треба навчитися керувати. Мені просто потрібно було знайти свою течію."
        ratio="1/1"
        reverse={true}
        dark={true}
      />

      {/* сцена 3 — перший маршрут */}
      <Scene
        img="/assets/features/3.png"
        alt="Structured learning route"
        text="Замість хаотичного списку курсів я отримала перший маршрут: що вчити зараз, що відкласти, і як перевіряти прогрес без паніки. Yatra не робить шлях коротшим, але робить його видимим."
        ratio="1/1"
        reverse={false}
      />

      {/* сцена 4 — маленькі перемоги */}
      <Scene
        img="/assets/features/4.png"
        alt="Small wins"
        text="Велика подорож — це лише серія маленьких сплесків. Ми святкуємо «Маленькі перемоги», бо саме там відбувається ріст. Нам байдуже, як швидко ви пливете — нам важливо, що ви рухаєтесь з наміром."
        ratio="710/420"
        reverse={false}
      />

      {/* сцена 5 — спокій */}
      <Scene
        img="/assets/features/5.png"
        alt="Calm Ashta"
        text="І ось... це я зараз. Той самий океан, зовсім інший вайб. Я все та ж Ашта в окулярах, але тепер я справді бачу свій шлях. Я зробила «Захват щупальцями» свого цифрового сліду і зрозуміла, що не була загублена — мені просто був потрібен кращий компас. Тепер у мене є місія, чай і чистий горизонт."
        ratio="533/490"
        reverse={true}
        dark={true}
      />

      {/* заклик до дії */}
      <section className="py-32 bg-background text-center">
        <Fade className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-black text-primary mb-6">
            Готові змінити паніку на план?
          </h2>
          <p className="text-lg text-primary/50 mb-12">
            Ваш берег чекає. Почніть свою подорож сьогодні.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href="/login" 
              className="px-12 py-4 rounded-full bg-primary text-surface font-black uppercase tracking-widest text-sm hover:bg-secondary transition-all shadow-xl"
            >
              Спробувати безкоштовно
            </Link>
            <Link 
              href="/pricing" 
              className="px-12 py-4 rounded-full border-2 border-primary text-primary font-black uppercase tracking-widest text-sm hover:bg-surface transition-all"
            >
              Переглянути тарифи
            </Link>
          </div>
        </Fade>
      </section>
    </div>
  );
}

