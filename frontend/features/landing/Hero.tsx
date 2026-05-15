"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

/**
 * головна секція лендінгу
 */
export default function Hero() {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-primary leading-[1.1]">
              Ваш шлях у світі IT <br />
              <span className="text-secondary italic">починається тут.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-primary/60 max-w-2xl mx-auto font-medium"
          >
            Спокійна та розумна платформа для навігації кар'єрою. 
            Ми допоможемо вам перетворити хаос вибору на чіткий план дій.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/login"
              className="px-12 py-4 rounded-full bg-primary text-surface font-black uppercase tracking-widest text-sm hover:bg-secondary transition-all shadow-lg hover:shadow-secondary/20"
            >
              Почати подорож
            </Link>
            <Link
              href="#features"
              className="px-12 py-4 rounded-full border-2 border-primary/10 text-primary font-black uppercase tracking-widest text-sm hover:bg-surface transition-all"
            >
              Дізнатись більше
            </Link>
          </motion.div>
        </div>

        {/* ілюстрація */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 relative w-full aspect-[16/9] max-w-5xl mx-auto"
        >
          <Image
            src="/assets/main/octopus.png"
            alt="Yatra mascot navigating the career ocean"
            fill
            className="object-contain"
            priority
          />
        </motion.div>
      </div>
      
      {/* фоновий декор (мінімалістичний) */}
    </section>
  );
}

