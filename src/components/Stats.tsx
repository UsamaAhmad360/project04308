export default function Stats() {
  return (
    <section className="py-24 bg-[#1e192b] border-y border-[#3b494b]/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="space-y-2">
            <h3 className="text-5xl font-['Space_Grotesk'] font-bold text-[#00F0FF] drop-shadow-[0_0_10px_rgba(0,240,255,0.3)]">3+</h3>
            <p className="font-['Inter'] text-[#c0c1ff] tracking-widest uppercase text-xs">Production Projects</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-5xl font-['Space_Grotesk'] font-bold text-[#00F0FF] drop-shadow-[0_0_10px_rgba(0,240,255,0.3)]">6+</h3>
            <p className="font-['Inter'] text-[#c0c1ff] tracking-widest uppercase text-xs">Core Technologies</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-5xl font-['Space_Grotesk'] font-bold text-[#00F0FF] drop-shadow-[0_0_10px_rgba(0,240,255,0.3)]">100%</h3>
            <p className="font-['Inter'] text-[#c0c1ff] tracking-widest uppercase text-xs">Dedication</p>
          </div>
        </div>
      </div>
    </section>
  );
}
