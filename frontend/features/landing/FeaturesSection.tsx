"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

/**
 * РґРѕРїРѕРјС–Р¶РЅРёР№ РєРѕРјРїРѕРЅРµРЅС‚ РґР»СЏ Р°РЅС–РјР°С†С–С— РїРѕСЏРІРё
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
 * СЃРµРєС†С–СЏ Р· РѕРґРЅС–С”СЋ РѕСЃРѕР±Р»РёРІС–СЃС‚СЋ (Р·РѕР±СЂР°Р¶РµРЅРЅСЏ + С‚РµРєСЃС‚)
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
        {/* Р·РѕР±СЂР°Р¶РµРЅРЅСЏ */}
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

        {/* С‚РµРєСЃС‚ */}
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
 * РіРѕР»РѕРІРЅРёР№ РєРѕРјРїРѕРЅРµРЅС‚ СЃРµРєС†С–С— РјРѕР¶Р»РёРІРѕСЃС‚РµР№
 */
export default function FeaturesSection() {
  return (
    <div id="features">
      {/* СЃС†РµРЅР° 1 вЂ” С…Р°РѕСЃ */}
      <Scene
        img="/assets/features/1.png"
        alt="Ashta overwhelmed with chaos"
        text="Р¦Рµ Р±СѓР»Р° СЏ, РђС€С‚Р°. Р’ РѕРєСѓР»СЏСЂР°С…, Р°Р»Рµ РІСЃРµ РѕРґРЅРѕ РЅС–С‡РѕРіРѕ РЅРµ Р±Р°С‡РёР»Р° РєСЂС–Р·СЊ С€С‚РѕСЂРј РІС–РґРєСЂРёС‚РёС… РІРєР»Р°РґРѕРє С‚Р° РЅРµР·Р°РєС–РЅС‡РµРЅРёС… С‚СѓС‚РѕСЂС–Р°Р»С–РІ. РЇ С‚РѕРЅСѓР»Р° РІ РѕРїС†С–СЏС…, Р°Р»Рµ РіРѕР»РѕРґСѓРІР°Р»Р° Р·Р° СЃРёСЃС‚РµРјРѕСЋ. РњС–Р№ РјРѕР·РѕРє Р±СѓРІ СЃС…РѕР¶РёР№ РЅР° РґР¶СѓРЅРіР»С–. Р–РѕРґРЅРѕС— РєР°СЂС‚Рё. Р–РѕРґРЅРѕРіРѕ С„РѕРєСѓСЃСѓ. РўС–Р»СЊРєРё С‡РёСЃС‚Р° РїР°РЅС–РєР°."
        ratio="1/1"
        reverse={false}
      />

      {/* СЃС†РµРЅР° 2 вЂ” РјР°СЏРє */}
      <Scene
        img="/assets/features/2.png"
        alt="Lighthouse beacon"
        text="РџРѕС‚С–Рј СЏ Р·РЅР°Р№С€Р»Р° СЃРІС–Р№ РјР°СЏРє: Yatra. Р’С–РЅ РЅРµ СЃРєР°Р·Р°РІ РјРµРЅС– В«РїСЂР°С†СЋР№ Р±С–Р»СЊС€РµВ». Р’С–РЅ СЃРєР°Р·Р°РІ В«РґРёС…Р°Р№В». РЇ Р·СЂРѕР·СѓРјС–Р»Р°, С‰Рѕ РѕРєРµР°РЅ вЂ” С†Рµ РЅРµ С‚Рµ, С‡РѕРіРѕ С‚СЂРµР±Р° Р±РѕСЏС‚РёСЃСЏ, Р° С‚Рµ, С‡РёРј С‚СЂРµР±Р° РЅР°РІС‡РёС‚РёСЃСЏ РєРµСЂСѓРІР°С‚Рё. РњРµРЅС– РїСЂРѕСЃС‚Рѕ РїРѕС‚СЂС–Р±РЅРѕ Р±СѓР»Рѕ Р·РЅР°Р№С‚Рё СЃРІРѕСЋ С‚РµС‡С–СЋ."
        ratio="1/1"
        reverse={true}
        dark={true}
      />

      {/* СЃС†РµРЅР° 3 вЂ” РїРµСЂС€РёР№ РјР°СЂС€СЂСѓС‚ */}
      <Scene
        img="/assets/features/3.png"
        alt="Structured learning route"
        text="Р—Р°РјС–СЃС‚СЊ С…Р°РѕС‚РёС‡РЅРѕРіРѕ СЃРїРёСЃРєСѓ РєСѓСЂСЃС–РІ СЏ РѕС‚СЂРёРјР°Р»Р° РїРµСЂС€РёР№ РјР°СЂС€СЂСѓС‚: С‰Рѕ РІС‡РёС‚Рё Р·Р°СЂР°Р·, С‰Рѕ РІС–РґРєР»Р°СЃС‚Рё, С– СЏРє РїРµСЂРµРІС–СЂСЏС‚Рё РїСЂРѕРіСЂРµСЃ Р±РµР· РїР°РЅС–РєРё. Yatra РЅРµ СЂРѕР±РёС‚СЊ С€Р»СЏС… РєРѕСЂРѕС‚С€РёРј, Р°Р»Рµ СЂРѕР±РёС‚СЊ Р№РѕРіРѕ РІРёРґРёРјРёРј."
        ratio="1/1"
        reverse={false}
      />

      {/* СЃС†РµРЅР° 4 вЂ” РјР°Р»РµРЅСЊРєС– РїРµСЂРµРјРѕРіРё */}
      <Scene
        img="/assets/features/4.png"
        alt="Small wins"
        text="Р’РµР»РёРєР° РїРѕРґРѕСЂРѕР¶ вЂ” С†Рµ Р»РёС€Рµ СЃРµСЂС–СЏ РјР°Р»РµРЅСЊРєРёС… СЃРїР»РµСЃРєС–РІ. РњРё СЃРІСЏС‚РєСѓС”РјРѕ В«РњР°Р»РµРЅСЊРєС– РїРµСЂРµРјРѕРіРёВ», Р±Рѕ СЃР°РјРµ С‚Р°Рј РІС–РґР±СѓРІР°С”С‚СЊСЃСЏ СЂС–СЃС‚. РќР°Рј Р±Р°Р№РґСѓР¶Рµ, СЏРє С€РІРёРґРєРѕ РІРё РїР»РёРІРµС‚Рµ вЂ” РЅР°Рј РІР°Р¶Р»РёРІРѕ, С‰Рѕ РІРё СЂСѓС…Р°С”С‚РµСЃСЊ Р· РЅР°РјС–СЂРѕРј."
        ratio="710/420"
        reverse={false}
      />

      {/* СЃС†РµРЅР° 5 вЂ” СЃРїРѕРєС–Р№ */}
      <Scene
        img="/assets/features/5.png"
        alt="Calm Ashta"
        text="Р† РѕСЃСЊ... С†Рµ СЏ Р·Р°СЂР°Р·. РўРѕР№ СЃР°РјРёР№ РѕРєРµР°РЅ, Р·РѕРІСЃС–Рј С–РЅС€РёР№ РІР°Р№Р±. РЇ РІСЃРµ С‚Р° Р¶ РђС€С‚Р° РІ РѕРєСѓР»СЏСЂР°С…, Р°Р»Рµ С‚РµРїРµСЂ СЏ СЃРїСЂР°РІРґС– Р±Р°С‡Сѓ СЃРІС–Р№ С€Р»СЏС…. РЇ Р·СЂРѕР±РёР»Р° В«Р—Р°С…РІР°С‚ С‰СѓРїР°Р»СЊС†СЏРјРёВ» СЃРІРѕРіРѕ С†РёС„СЂРѕРІРѕРіРѕ СЃР»С–РґСѓ С– Р·СЂРѕР·СѓРјС–Р»Р°, С‰Рѕ РЅРµ Р±СѓР»Р° Р·Р°РіСѓР±Р»РµРЅР° вЂ” РјРµРЅС– РїСЂРѕСЃС‚Рѕ Р±СѓРІ РїРѕС‚СЂС–Р±РµРЅ РєСЂР°С‰РёР№ РєРѕРјРїР°СЃ. РўРµРїРµСЂ Сѓ РјРµРЅРµ С” РјС–СЃС–СЏ, С‡Р°Р№ С– С‡РёСЃС‚РёР№ РіРѕСЂРёР·РѕРЅС‚."
        ratio="533/490"
        reverse={true}
        dark={true}
      />

      {/* Р·Р°РєР»РёРє РґРѕ РґС–С— */}
      <section className="py-32 bg-background text-center">
        <Fade className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-black text-primary mb-6">
            Р“РѕС‚РѕРІС– Р·РјС–РЅРёС‚Рё РїР°РЅС–РєСѓ РЅР° РїР»Р°РЅ?
          </h2>
          <p className="text-lg text-primary/50 mb-12">
            Р’Р°С€ Р±РµСЂРµРі С‡РµРєР°С”. РџРѕС‡РЅС–С‚СЊ СЃРІРѕСЋ РїРѕРґРѕСЂРѕР¶ СЃСЊРѕРіРѕРґРЅС–.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href="/login" 
              className="px-12 py-4 rounded-full bg-primary text-surface font-black uppercase tracking-widest text-sm hover:bg-secondary transition-all shadow-xl"
            >
              РЎРїСЂРѕР±СѓРІР°С‚Рё Р±РµР·РєРѕС€С‚РѕРІРЅРѕ
            </Link>
            <Link 
              href="/pricing" 
              className="px-12 py-4 rounded-full border-2 border-primary text-primary font-black uppercase tracking-widest text-sm hover:bg-surface transition-all"
            >
              РџРµСЂРµРіР»СЏРЅСѓС‚Рё С‚Р°СЂРёС„Рё
            </Link>
          </div>
        </Fade>
      </section>
    </div>
  );
}

