"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * СЃРµРєС†С–СЏ Р· РѕРїРёСЃРѕРј РїСЂРѕР±Р»РµРјРё
 */
export default function Problem() {
  return (
    <section className="py-24 bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-primary leading-tight">
              Р—Р°РЅР°РґС‚Рѕ Р±Р°РіР°С‚Рѕ РІРёР±РѕСЂСѓ, <br /> 
              <span className="text-secondary italic">Р·Р°РјР°Р»Рѕ РЅР°РїСЂСЏРјРєСѓ.</span>
            </h2>
            <p className="text-lg text-primary/70 leading-relaxed font-medium">
              РЎСѓС‡Р°СЃРЅРёР№ СЃРІС–С‚ IT СЃС…РѕР¶РёР№ РЅР° Р±РµР·РєСЂР°Р№РЅС–Р№ РѕРєРµР°РЅ. РўРёСЃСЏС‡С– РєСѓСЂСЃС–РІ, СЃРѕС‚РЅС– С‚РµС…РЅРѕР»РѕРіС–Р№ С– РїРѕСЃС‚С–Р№РЅРёР№ С€СѓРј. 
              РЎС‚СѓРґРµРЅС‚Рё С‡Р°СЃС‚Рѕ РїРѕС‡СѓРІР°СЋС‚СЊСЃСЏ СЂРѕР·РіСѓР±Р»РµРЅРёРјРё, РЅР°РјР°РіР°СЋС‡РёСЃСЊ РІС…РѕРїРёС‚РёСЃСЏ Р·Р° РІСЃРµ РѕРґСЂР°Р·Сѓ.
            </p>
            
            <div className="grid grid-cols-2 gap-8 pt-4">
               <div className="space-y-2">
                 <p className="text-4xl font-black text-accent">80%</p>
                 <p className="text-[10px] uppercase tracking-[0.2em] font-black text-primary/60 leading-tight">
                   РЎС‚СѓРґРµРЅС‚С–РІ РІС–РґС‡СѓРІР°СЋС‚СЊ РїРѕСЃС‚С–Р№РЅРёР№ СЃС‚СЂРµСЃ РІС–Рґ РІРёР±РѕСЂСѓ
                 </p>
               </div>
               <div className="space-y-2">
                 <p className="text-4xl font-black text-accent">65%</p>
                 <p className="text-[10px] uppercase tracking-[0.2em] font-black text-primary/60 leading-tight">
                   РљРёРґР°СЋС‚СЊ РЅР°РІС‡Р°РЅРЅСЏ С‡РµСЂРµР· РІС–РґСЃСѓС‚РЅС–СЃС‚СЊ С‡С–С‚РєРѕС— РєР°СЂС‚Рё
                 </p>
               </div>
            </div>
          </div>
          
          <div className="relative aspect-square bg-background rounded-[48px] border border-surface flex items-center justify-center p-8 shadow-inner overflow-hidden">
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.02, 0.98, 1]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full h-full"
            >
              <Image 
                src="/assets/features/1.png" 
                alt="Chaos visualization" 
                fill 
                className="object-contain p-4"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

