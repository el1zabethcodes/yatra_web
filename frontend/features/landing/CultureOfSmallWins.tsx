"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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

const Divider = () => (
  <div className="w-full h-px bg-[#1B3B18]/10" />
);

/**
 * Секція Culture of Small Wins
 */
export default function CultureOfSmallWins() {
  return (
    <div className="relative z-20 max-w-5xl mx-auto px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Divider />
      </div>

      <section className="py-20 flex flex-col md:flex-row items-center gap-10 md:gap-16">
        <div className="flex-1 min-w-0">
          <Fade>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-5 text-[#1B3B18]/35">
              Culture of Small Wins
            </p>
            <h2 className="font-black tracking-tight leading-[1.1] mb-8 text-[#1B3B18] text-[clamp(1.8rem, 4.5vw, 3rem)]">
              Tiny splashes create<br />great voyages.
            </h2>
          </Fade>
          <Fade delay={0.1}>
            <p className="text-lg font-medium leading-relaxed text-[#1B3B18]/68">
              We don&apos;t wait for the destination to celebrate. In Yatra, every fixed bug and every hour
              of deep focus is a &ldquo;Pearl.&rdquo; We help you collect these pearls daily to prove to yourself
              that you are moving forward, even when the shore seems far away.
            </p>
          </Fade>
          <Fade delay={0.2}>
            <p className="text-lg font-medium leading-relaxed mt-5 text-[#1B3B18]/68">
              This is how we defeat burnout—one small win at a time.
            </p>
          </Fade>
        </div>

        <Fade delay={0.15} className="shrink-0 w-full md:w-[420px] lg:w-[520px]">
          <Image
            src="/assets/main/2corrals.png"
            alt="Small wins"
            width={520}
            height={640}
            className="w-full h-auto object-contain drop-shadow-[0_12px_32px_rgba(27,59,24,0.14)]"
          />
        </Fade>
      </section>

      <div className="max-w-2xl mx-auto">
        <Divider />
      </div>
    </div>
  );
}
