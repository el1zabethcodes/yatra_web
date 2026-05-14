"use client";

import Header from "@/shared/layout/Header";
import Hero from "@/features/landing/Hero";
import Problem from "@/features/landing/Problem";
import FeaturesSection from "@/features/landing/FeaturesSection";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

/**
 * РїСЂРµРІСЊСЋ РґРѕСЂРѕР¶РЅСЊРѕС— РєР°СЂС‚Рё
 */
function RoadmapPreview() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-black tracking-tight text-primary">Р’Р°С€Р° РїРµСЂСЃРѕРЅР°Р»СЊРЅР° РєР°СЂС‚Р°.</h2>
          <p className="text-lg text-primary/60 max-w-2xl mx-auto font-medium">
            РњРё СЃС‚РІРѕСЂСЋС”РјРѕ Р°РґР°РїС‚РёРІРЅС– РїР»Р°РЅРё РЅР°РІС‡Р°РЅРЅСЏ, С‰Рѕ РїС–РґР»Р°С€С‚РѕРІСѓСЋС‚СЊСЃСЏ РїС–Рґ РІР°С€С– С†С–Р»С– С‚Р° С‚РµРјРї.
          </p>
        </div>
        
        <div className="relative aspect-[21/9] bg-surface/20 rounded-[40px] border border-surface/40 overflow-hidden shadow-sm">
           <Image 
             src="/assets/features/3.png" 
             alt="Roadmap preview" 
             fill 
             className="object-contain p-8"
           />
        </div>
      </div>
    </section>
  );
}

/**
 * РїСЂРµРІСЊСЋ С‡Р°С‚Сѓ Р· РјРµРЅС‚РѕСЂРѕРј
 */
function ChatPreview() {
  return (
    <section className="py-24 bg-surface/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 relative aspect-square bg-background rounded-[48px] border border-surface shadow-sm p-8">
            {/* С–РјС–С‚Р°С†С–СЏ С‡Р°С‚Сѓ */}
            <div className="space-y-4">
               <div className="flex justify-start">
                 <div className="bg-surface px-4 py-3 rounded-2xl rounded-bl-none text-sm font-medium text-primary">
                   РџСЂРёРІС–С‚! РЇ С‚РІС–Р№ РјРµРЅС‚РѕСЂ Kavi. Р— С‡РѕРіРѕ РїРѕС‡РЅРµРјРѕ СЃСЊРѕРіРѕРґРЅС–?
                 </div>
               </div>
               <div className="flex justify-end">
                 <div className="bg-primary px-4 py-3 rounded-2xl rounded-br-none text-sm font-medium text-surface">
                   РҐРѕС‡Сѓ РґС–Р·РЅР°С‚РёСЃСЊ Р±С–Р»СЊС€Рµ РїСЂРѕ Frontend СЂРѕР·СЂРѕР±РєСѓ.
                 </div>
               </div>
               <div className="flex justify-start">
                 <div className="bg-surface px-4 py-3 rounded-2xl rounded-bl-none text-sm font-medium text-primary">
                   Р§СѓРґРѕРІРёР№ РІРёР±С–СЂ! Р”Р°РІР°Р№ РїРѕРґРёРІРёРјРѕСЃСЊ РЅР° С‚РІС–Р№ РїРѕС‚РѕС‡РЅРёР№ СЂС–РІРµРЅСЊ...
                 </div>
               </div>
            </div>
            <div className="absolute bottom-8 left-8 right-8 h-12 bg-surface/50 rounded-full border border-surface flex items-center px-4 text-primary/60 text-xs font-bold uppercase tracking-widest">
              Р—Р°РїРёС‚Р°Р№ РїСЂРѕ РєР°СЂ'С”СЂСѓ...
            </div>
          </div>
          
          <div className="order-1 md:order-2 space-y-8">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-primary leading-tight">
              РњРµРЅС‚РѕСЂ, СЏРєРёР№ <br />
              <span className="text-secondary italic">Р·Р°РІР¶РґРё РїРѕСЂСѓС‡.</span>
            </h2>
            <p className="text-lg text-primary/70 leading-relaxed font-medium">
              Kavi вЂ” С†Рµ РІР°С€ РїРµСЂСЃРѕРЅР°Р»СЊРЅРёР№ AI-РјРµРЅС‚РѕСЂ, СЏРєРёР№ Р·РЅР°С” РІСЃРµ РїСЂРѕ СЂРёРЅРѕРє РїСЂР°С†С– С‚Р° РЅРµРѕР±С…С–РґРЅС– РЅР°РІРёС‡РєРё. 
              Р’С–РЅ РґРѕРїРѕРјРѕР¶Рµ РїС–РґРіРѕС‚СѓРІР°С‚РёСЃСЊ РґРѕ С–РЅС‚РµСЂРІ'СЋ С‚Р° РґР°СЃС‚СЊ РїРѕСЂР°РґРё Сѓ РІР°Р¶РєСѓ С…РІРёР»РёРЅСѓ.
            </p>
            <div className="pt-4">
              <Link 
                href="/login" 
                className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-sm hover:gap-4 transition-all"
              >
                РџРѕСЃРїС–Р»РєСѓРІР°С‚РёСЃСЊ Р· Kavi <span>в†’</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * РіРѕР»РѕРІРЅР° СЃС‚РѕСЂС–РЅРєР° Р»РµРЅРґС–РЅРіСѓ
 */
export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Problem />
      <FeaturesSection />
      <RoadmapPreview />
      <ChatPreview />
    </main>
  );
}

