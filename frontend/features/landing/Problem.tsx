"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * секція з описом проблеми
 */
export default function Problem() {
  return (
    <section className="py-24 bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-primary leading-tight">
              Занадто багато вибору, <br /> 
              <span className="text-secondary italic">замало напрямку.</span>
            </h2>
            <p className="text-lg text-primary/70 leading-relaxed font-medium">
              Сучасний світ IT схожий на безкрайній океан. Тисячі курсів, сотні технологій і постійний шум. 
              Студенти часто почуваються розгубленими, намагаючись вхопитися за все одразу.
            </p>
            
            <div className="grid grid-cols-2 gap-8 pt-4">
               <div className="space-y-2">
                 <p className="text-4xl font-black text-accent">80%</p>
                 <p className="text-[10px] uppercase tracking-[0.2em] font-black text-primary/60 leading-tight">
                   Студентів відчувають постійний стрес від вибору
                 </p>
               </div>
               <div className="space-y-2">
                 <p className="text-4xl font-black text-accent">65%</p>
                 <p className="text-[10px] uppercase tracking-[0.2em] font-black text-primary/60 leading-tight">
                   Кидають навчання через відсутність чіткої карти
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

