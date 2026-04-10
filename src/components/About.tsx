export default function About() {
  return (
    <section className="py-32 bg-[#151023]" id="about">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="relative group">
          <div className="absolute -inset-4 bg-[#00F0FF]/20 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative rounded-2xl overflow-hidden aspect-square border border-[#00F0FF]/20">
            <img
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              alt="Professional studio portrait"
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
            />
          </div>
        </div>
        <div className="space-y-8">
          <div className="space-y-4">
            <span className="text-[#00F0FF] font-['Inter'] text-xs tracking-[0.4em] uppercase">The Architect</span>
            <h2 className="text-4xl md:text-5xl font-['Space_Grotesk'] font-bold text-[#e8def9]">Crafting Digital Solutions with Precision</h2>
          </div>
          <p className="text-[#b9cacb] text-lg leading-relaxed font-['Plus_Jakarta_Sans']">
            As a Computer Science graduate, I approach development with an architectural mindset. I don't just write code; I engineer scalable ecosystems. My passion lies in bridging the gap between sophisticated aesthetics and high-performance backend logic.
          </p>
          <div className="pt-4">
            <a
              href="#contact"
              className="inline-block border border-[#00F0FF]/30 text-[#00F0FF] px-8 py-3 rounded-md font-['Inter'] text-xs tracking-widest uppercase hover:bg-[#00F0FF]/10 transition-colors"
            >
              Collaborate With Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
