"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/shared/Header";
import { motion } from "framer-motion";

const Fade = ({ children, delay = 0, className = "" }) => (
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
  <div className="w-full h-px" style={{ background: "rgba(27,59,24,0.10)" }} />
);

const glassMain = {
  background: "rgba(255,255,255,0.30)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: "1px solid rgba(255,255,255,0.50)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.65)",
  borderRadius: "28px",
};

const glassSub = {
  background: "rgba(255,255,255,0.25)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: "1px solid rgba(255,255,255,0.40)",
  boxShadow: "0 4px 16px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.55)",
  borderRadius: "20px",
};

function CTAButton() {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      whileTap={{ y: 3 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="inline-block cursor-pointer select-none"
    >
      <Link
        href="/login"
        className="relative inline-block px-16 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-lg transition-all duration-100"
        style={{
          background: "linear-gradient(180deg, #7a8f63 0%, #6B7D56 60%)",
          color: "#E6E4C5",
          boxShadow: "0 7px 0 #4a5a3a, 0 9px 0 #3a4a2a, 0 12px 24px rgba(74,90,58,0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
        }}
      >
        <span
          className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-2xl"
          style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 100%)" }}
        />
        GET STARTED
      </Link>
    </motion.div>
  );
}

/* instrument card for section C */
function InstrumentCard({ title, body, delay }) {
  return (
    <Fade delay={delay}>
      <div
        className="rounded-[28px] px-7 py-8 h-full"
        style={{
          background: "rgba(255,255,255,0.28)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: "1px solid rgba(255,255,255,0.45)",
          boxShadow: "0 6px 28px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.65)",
        }}
      >
        <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#D35400] mb-3">
          Instrument
        </p>
        <h3
          className="font-black leading-tight mb-4"
          style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", color: "#1B3B18" }}
        >
          {title}
        </h3>
        <p className="text-sm font-medium leading-relaxed" style={{ color: "rgba(27,59,24,0.65)" }}>
          {body}
        </p>
      </div>
    </Fade>
  );
}

export default function HomePage() {
  return (
    <div
      className="min-h-screen relative overflow-x-hidden"
      style={{ background: "#DFE0BF", color: "#1B3B18" }}
    >
      {/* grid texture */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(27,59,24,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(27,59,24,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10">
        <Header />
      </div>

      {/* ══ A: HERO — untouched ══ */}
      <section className="relative z-20 w-full max-w-5xl mx-auto px-6 pb-28 pt-4 overflow-visible">
        <div
          className="absolute pointer-events-none"
          style={{
            top: "10%", left: "30%", width: 480, height: 480,
            background: "radial-gradient(circle, rgba(107,125,86,0.18) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "5%", right: "5%", width: 320, height: 320,
            background: "radial-gradient(circle, rgba(255,220,160,0.22) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />

        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: -30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative shrink-0 z-20
                        w-[280px] h-[280px]
                        sm:w-[380px] sm:h-[380px]
                        md:w-[480px] md:h-[480px]
                        lg:w-[560px] lg:h-[560px]
                        md:-mr-20 lg:-mr-28"
            style={{ filter: "drop-shadow(0 24px 40px rgba(0,0,0,0.18))" }}
          >
            <Image
              src="/assets/main/octopus.png"
              alt="Ashta the octopus"
              fill
              className="object-contain object-bottom"
              priority
            />
          </motion.div>

          <div className="relative z-10 flex flex-col gap-5 flex-1 w-full min-w-0">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, delay: 0.15, ease: "easeOut" }}
              className="px-10 py-10 sm:px-12 sm:py-12"
              style={glassMain}
            >
              <h1
                className="font-black leading-[0.9] tracking-[-0.04em]"
                style={{ fontSize: "clamp(4.5rem, 10vw, 9rem)", color: "#1B3B18" }}
              >
                STAND
                <br />
                OUT
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, delay: 0.3, ease: "easeOut" }}
              className="px-8 py-5 sm:px-10 sm:py-6"
              style={glassSub}
            >
              <p className="font-semibold text-lg sm:text-xl leading-snug" style={{ color: "rgba(27,59,24,0.75)" }}>
                Close the Gap. Build Your Future.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ B: PHILOSOPHY ══ */}
      <div className="relative z-20 max-w-2xl mx-auto px-6 lg:px-0">
        <Divider />

        <section className="py-20">
          <Fade>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-5" style={{ color: "rgba(27,59,24,0.35)" }}>
              The Philosophy
            </p>
            <h2
              className="font-black tracking-tight leading-[1.1] mb-8"
              style={{ fontSize: "clamp(1.8rem, 4.5vw, 3rem)", color: "#1B3B18" }}
            >
              From Cognitive Overload<br />to Cognitive Clarity.
            </h2>
            <p className="text-lg font-medium leading-relaxed" style={{ color: "rgba(27,59,24,0.68)" }}>
              In a world that profits off your FOMO, Yatra offers a quiet place to breathe.
              We believe that a career in tech shouldn&apos;t feel like a race against an invisible clock.
              It should feel like a pilgrimage.
            </p>
          </Fade>

          <Fade delay={0.15}>
            <p className="text-lg font-medium leading-relaxed mt-6" style={{ color: "rgba(27,59,24,0.68)" }}>
              We look beyond the keywords on your resume. We analyze your trajectory, your coding logic,
              and your growth patterns to ensure you aren&apos;t just moving fast—but moving in the right direction.
            </p>
          </Fade>
        </section>
      </div>

      {/* pilgrimage visual */}
      <Fade className="relative z-20 w-full">
        <div className="w-full max-w-4xl mx-auto px-6 mb-4">
          <div className="rounded-[32px] overflow-hidden" style={{ boxShadow: "0 12px 48px rgba(27,59,24,0.12)" }}>
            <Image
              src="/assets/main/corrals_it.png"
              alt=""
              width={1200}
              height={500}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </Fade>

      {/* ══ C: CORE INSTRUMENTS ══ */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 py-20">
        <Fade>
          <div className="flex items-center gap-4 mb-3">
            <div className="relative w-8 h-8 shrink-0">
              <Image src="/assets/main/logo.png" alt="" fill className="object-contain" sizes="32px" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em]" style={{ color: "rgba(27,59,24,0.35)" }}>
              The Core Instruments
            </p>
          </div>
          <h2
            className="font-black tracking-tight leading-tight mb-12"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.6rem)", color: "#1B3B18" }}
          >
            The Essence of Yatra
          </h2>
        </Fade>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <InstrumentCard
            delay={0.05}
            title="The Tentacle Grab"
            body="Your digital footprint is more than just a list of repos. It's your engineering DNA. We use deep semantic analysis to distill your history into a clear map of your actual capabilities. We find the gold you've already created so you can stop starting from scratch."
          />
          <InstrumentCard
            delay={0.15}
            title="The Skill Radar"
            body="Stop looking at your skills as a checklist. See them as a constellation. Our Radar visualizes your technical soul, highlighting your Radiant Strengths and identifying the Quiet Zones that need a little more light. It's a compass that always points toward your potential."
          />
          <InstrumentCard
            delay={0.25}
            title="Adaptive Living Roadmaps"
            body="Most roadmaps are rigid and stressful. Ours is alive. It breathes with you—slowing down when the waves of life are high and picking up speed when you are in the flow. It provides the structure of a plan with the grace of a mentor."
          />
        </div>
      </div>

      {/* ══ D: SMALL WINS ══ */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <Divider />
        </div>

        <section className="py-20 flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* text */}
          <div className="flex-1 min-w-0">
            <Fade>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-5" style={{ color: "rgba(27,59,24,0.35)" }}>
                Culture of Small Wins
              </p>
              <h2
                className="font-black tracking-tight leading-[1.1] mb-8"
                style={{ fontSize: "clamp(1.8rem, 4.5vw, 3rem)", color: "#1B3B18" }}
              >
                Tiny splashes create<br />great voyages.
              </h2>
            </Fade>
            <Fade delay={0.1}>
              <p className="text-lg font-medium leading-relaxed" style={{ color: "rgba(27,59,24,0.68)" }}>
                We don&apos;t wait for the destination to celebrate. In Yatra, every fixed bug and every hour
                of deep focus is a &ldquo;Pearl.&rdquo; We help you collect these pearls daily to prove to yourself
                that you are moving forward, even when the shore seems far away.
              </p>
            </Fade>
            <Fade delay={0.2}>
              <p className="text-lg font-medium leading-relaxed mt-5" style={{ color: "rgba(27,59,24,0.68)" }}>
                This is how we defeat burnout—one small win at a time.
              </p>
            </Fade>
          </div>

          {/* side image */}
          <Fade delay={0.15} className="shrink-0 w-full md:w-[420px] lg:w-[520px]">
            <Image
              src="/assets/main/2corrals.png"
              alt=""
              width={520}
              height={640}
              className="w-full h-auto object-contain"
              style={{ filter: "drop-shadow(0 12px 32px rgba(27,59,24,0.14))" }}
            />
          </Fade>
        </section>

        <div className="max-w-2xl mx-auto">
          <Divider />
        </div>

      {/* ══ E: FINAL GATEWAY ══ */}
        <section className="py-24 text-center">
          <Fade>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-4" style={{ color: "rgba(27,59,24,0.35)" }}>
              The Reef
            </p>
            <h2
              className="font-black tracking-tight leading-tight mb-3"
              style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)", color: "#1B3B18" }}
            >
              Your shore is waiting.
            </h2>
            <p className="text-xl font-medium mb-12" style={{ color: "rgba(27,59,24,0.55)" }}>
              Ready to leave the chaos behind?
            </p>
          </Fade>
          <Fade delay={0.1}>
            <CTAButton />
          </Fade>
        </section>
      </div>
    </div>
  );
}
