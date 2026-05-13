export default function Footer() {
  return (
    <>
      <section className="relative h-[420px] overflow-hidden mt-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#d9efe8]/70 to-[#9fd2c5]" />

        <svg
          className="absolute bottom-0 left-0 w-[200%] h-[220px] animate-[wave_18s_linear_infinite] opacity-70"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#b7e4d7"
            fillOpacity="0.9"
            d="M0,224L60,218.7C120,213,240,203,360,181.3C480,160,600,128,720,133.3C840,139,960,181,1080,208C1200,235,1320,245,1380,250.7L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </svg>

        <svg
          className="absolute bottom-0 left-0 w-[200%] h-[200px] animate-[waveReverse_12s_linear_infinite] opacity-50"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#dff7ef"
            fillOpacity="0.8"
            d="M0,128L80,149.3C160,171,320,213,480,224C640,235,800,213,960,192C1120,171,1280,149,1360,138.7L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          />
        </svg>

        <div className="absolute inset-x-0 bottom-0 h-[140px] backdrop-blur-xl bg-white/10 border-t border-white/20" />
      </section>

      <footer className="bg-white/20 backdrop-blur-3xl py-12 px-6 border-t border-white/20 shadow-[0_-10px_60px_rgba(255,255,255,0.15)] transition-all duration-700">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-[#1B3B18] mb-2">Yatra</h3>
            <p className="text-[#1B3B18]/70 text-sm">
              Close the gap, shape the future.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-[#1B3B18]/80">
            <a href="#">Assessment</a>
            <a href="#">Roadmap</a>
            <a href="#">Mentorship</a>
            <a href="#">Privacy</a>
          </div>

          <div className="text-sm text-[#1B3B18]/60 text-center md:text-right">
            © 2026 Yatra. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
