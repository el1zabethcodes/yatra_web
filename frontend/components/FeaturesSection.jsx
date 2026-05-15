"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

/* ─── fade-in helper ─── */
const Fade = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.65, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ─── Grid overlay ─── */
const Grid = ({ dark }) => null;

/* ─── Scene: image + text side by side ─── */
function Scene({
  img,
  alt,
  text,
  reverse = false,
  dark = false,
  noEffects = false,
  /* aspect ratio of the image: "1/1" | "4/3" | "5/3" etc. */
  ratio = "1/1",
}) {
  return (
    <div
      className={`relative py-20 px-6 ${dark ? "bg-[#1B2A14]" : "bg-[#F2F0D8]"}`}
    >
      <Grid dark={dark} />

      <div
        className={`relative z-10 max-w-5xl mx-auto flex flex-col gap-12 items-center ${
          reverse ? "md:flex-row-reverse" : "md:flex-row"
        }`}
      >
        {/* image */}
        <Fade delay={0} className="w-full md:w-1/2 flex justify-center">
          <div
            className="relative w-full max-w-[480px]"
            style={{ aspectRatio: ratio }}
          >
            <Image
              src={img}
              alt={alt}
              fill
              quality={100}
              sizes="(max-width: 768px) 90vw, 480px"
              className={`object-contain ${noEffects ? "" : "drop-shadow-2xl"}`}
            />
          </div>
        </Fade>

        {/* text */}
        <Fade delay={0.15} className="w-full md:w-1/2">
          <p
            className={`text-lg md:text-xl font-medium leading-relaxed ${
              dark ? "text-[#E6E4C5]/80" : "text-[#1B3B18]/75"
            }`}
          >
            {text}
          </p>
        </Fade>
      </div>
    </div>
  );
}

/* ─── Scene 3: wide toolkit image + text ─── */
function ToolkitScene() {
  return (
    <div className="relative py-20 px-6 bg-[#F2F0D8]">
      <Grid dark={false} />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col gap-12 items-center">
        <Fade className="w-full md:w-1/2 text-center md:text-left self-start">
          <p className="text-lg md:text-xl font-medium leading-relaxed text-[#1B3B18]/75">
            Yatra turned my chaos into an algorithm. Progress isn&apos;t about
            how many arms you have; it&apos;s about having the right tools in
            them.
          </p>
        </Fade>

        <Fade delay={0.15} className="w-full">
          {/* 3.png is ~1530×570 → ratio 2.68/1 */}
          <div className="relative w-full" style={{ aspectRatio: "1530/570" }}>
            <Image
              src="/assets/features/3.png"
              alt="Yatra toolkit — skill checklist, radar, roadmap and AI mentor"
              fill
              quality={100}
              sizes="(max-width: 768px) 95vw, 1200px"
              className="object-contain drop-shadow-xl"
            />
          </div>
        </Fade>
      </div>
    </div>
  );
}

/* ─── Neumorphic CTA button ─── */
function NeumorphicButton({ children, href }) {
  return (
    <Link
      href={href}
      className="inline-block px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm bg-[#6B7D56] text-[#E6E4C5] transition-all duration-150 select-none"
      style={{
        boxShadow:
          "6px 6px 14px rgba(74,90,58,0.55), -4px -4px 10px rgba(255,255,255,0.25), inset 0 1px 1px rgba(255,255,255,0.15)",
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.boxShadow =
          "inset 4px 4px 10px rgba(50,65,38,0.6), inset -2px -2px 6px rgba(255,255,255,0.1)";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.boxShadow =
          "6px 6px 14px rgba(74,90,58,0.55), -4px -4px 10px rgba(255,255,255,0.25), inset 0 1px 1px rgba(255,255,255,0.15)";
      }}
    >
      {children}
    </Link>
  );
}

/* ─── Main export ─── */
export default function FeaturesSection() {
  return (
    <section id="features">
      {/* Scene 1 — Chaos (square image, ~753×780) */}
      <Scene
        img="/assets/features/1.png"
        alt="Ashta overwhelmed with open tabs and chaos"
        text="This was me, Ashta. I had my glasses on, but I still couldn't see a thing through the storm of open tabs and unfinished tutorials. I was drowning in options but starving for a system. My brain felt like a messy jungle. No map. No focus. Just pure, unfiltered panic."
        ratio="1/1"
        reverse={false}
      />

      {/* Scene 2 — Lighthouse: plain photo, zero effects */}
      <Scene
        img="/assets/features/2.png"
        alt="Lighthouse — a steady beacon"
        text="Then, I found a steady beacon: Yatra. It didn't tell me to 'hustle harder.' It told me to breathe. I realized the ocean isn't something to fear — it's something to navigate. I just needed to find my specific current."
        ratio="1/1"
        reverse={true}
        noEffects={true}
      />

      {/* Scene 3 — Toolkit: real wide image */}
      <ToolkitScene />

      {/* Scene 4 — Magic lamp (dark bg, landscape ~710×420) */}
      <Scene
        img="/assets/features/4.png"
        alt="Magic lamp — small wins"
        text="A grand voyage is just a collection of tiny splashes. We celebrate the 'Small Wins' because that's where the growth happens. We don't care how fast you swim — we care that you're moving with intention."
        ratio="710/420"
        reverse={false}
        dark={true}
      />

      {/* Scene 5 — Calm Ashta (~533×490) */}
      <Scene
        img="/assets/features/5.png"
        alt="Calm Ashta with tea and a clear path"
        text="And this... is me now. Same ocean, different vibe. I'm still the same Ashta in my glasses, but now I can actually see my path. I performed a 'Tentacle Grab' on my digital footprint and realized I wasn't lost — I just needed a better compass. Now, I don't sweat. I have a mission, a tea, and a clear horizon."
        ratio="533/490"
        reverse={true}
      />

      {/* CTA */}
      <div className="relative bg-[#F2F0D8] py-24 px-6 text-center">
        <Grid dark={false} />
        <Fade className="relative z-10">
          <p className="text-2xl md:text-3xl font-black text-[#1B3B18] mb-3 tracking-tight">
            Ready to swap your panic for a plan?
          </p>
          <p className="text-[#1B3B18]/55 font-medium mb-10 text-lg">
            Your shore is waiting.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <NeumorphicButton href="/login">Get Started</NeumorphicButton>
            <NeumorphicButton href="/pricing">Explore Plans</NeumorphicButton>
          </div>
        </Fade>
      </div>
    </section>
  );
}
