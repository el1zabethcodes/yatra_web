"use client";

import Header from "@/shared/layout/Header";
import Hero from "@/features/landing/Hero";
import Problem from "@/features/landing/Problem";
import FeaturesSection from "@/features/landing/FeaturesSection";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

/**
 * превью дорожньої карти
 */
function RoadmapPreview() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-black tracking-tight text-primary">Ваша персональна карта.</h2>
          <p className="text-lg text-primary/60 max-w-2xl mx-auto font-medium">
            Ми створюємо адаптивні плани навчання, що підлаштовуються під ваші цілі та темп.
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
 * превью чату з ментором
 */
function ChatPreview() {
  return (
    <section className="py-24 bg-surface/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 relative aspect-square bg-background rounded-[48px] border border-surface shadow-sm p-8">
            {/* імітація чату */}
            <div className="space-y-4">
               <div className="flex justify-start">
                 <div className="bg-surface px-4 py-3 rounded-2xl rounded-bl-none text-sm font-medium text-primary">
                   Привіт! Я твій ментор Kavi. З чого почнемо сьогодні?
                 </div>
               </div>
               <div className="flex justify-end">
                 <div className="bg-primary px-4 py-3 rounded-2xl rounded-br-none text-sm font-medium text-surface">
                   Хочу дізнатись більше про Frontend розробку.
                 </div>
               </div>
               <div className="flex justify-start">
                 <div className="bg-surface px-4 py-3 rounded-2xl rounded-bl-none text-sm font-medium text-primary">
                   Чудовий вибір! Давай подивимось на твій поточний рівень...
                 </div>
               </div>
            </div>
            <div className="absolute bottom-8 left-8 right-8 h-12 bg-surface/50 rounded-full border border-surface flex items-center px-4 text-primary/60 text-xs font-bold uppercase tracking-widest">
              Запитай про кар'єру...
            </div>
          </div>
          
          <div className="order-1 md:order-2 space-y-8">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-primary leading-tight">
              Ментор, який <br />
              <span className="text-secondary italic">завжди поруч.</span>
            </h2>
            <p className="text-lg text-primary/70 leading-relaxed font-medium">
              Kavi — це ваш персональний AI-ментор, який знає все про ринок праці та необхідні навички. 
              Він допоможе підготуватись до інтерв'ю та дасть поради у важку хвилину.
            </p>
            <div className="pt-4">
              <Link 
                href="/login" 
                className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-sm hover:gap-4 transition-all"
              >
                Поспілкуватись з Kavi <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * головна сторінка лендінгу
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

