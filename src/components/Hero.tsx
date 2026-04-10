import { useRef } from 'react';

interface HeroProps {
  showToast: (msg: string) => void;
}

export default function Hero({ showToast }: HeroProps) {
  const terminalRef = useRef<HTMLDivElement>(null);

  const handleCopyTerminal = () => {
    const text = `const profile = {
  name: "Usama Ahmad",
  roles: ["Web Developer", "Designer", "Creator"],
  status: "Architecting the Future"
};`;
    navigator.clipboard.writeText(text).then(() => {
      showToast('Terminal Snippet Copied!');
    });
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#151023] via-[#1e192b] to-[#151023] z-0"></div>

      {/* Ambient Glowing Orbs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#00f0ff]/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#7213ff]/10 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 text-center space-y-8 max-w-4xl">
        <h1 className="font-['Space_Grotesk'] text-6xl md:text-8xl font-bold tracking-tighter text-[#e8def9] leading-none">
          USAMA <span className="text-[#00F0FF] drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]">AHMAD</span>
        </h1>
        <p className="font-['Inter'] text-[#c0c1ff] tracking-[0.3em] uppercase text-sm md:text-base">Engineering Digital Precision</p>

        {/* Terminal Snippet */}
        <div ref={terminalRef} className="w-full max-w-2xl mx-auto rounded-xl overflow-hidden bg-[#100b1d] border border-[#3b494b]/20 shadow-2xl">
          <div className="bg-[#373246]/40 px-4 py-2 flex items-center justify-between backdrop-blur-md border-b border-[#3b494b]/10">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
              </div>
              <span className="text-[10px] font-['Inter'] text-[#b9cacb]/50 ml-4">visitor@neon-architect ~ %</span>
            </div>
            <button
              onClick={handleCopyTerminal}
              className="text-[#00F0FF]/60 hover:text-[#00F0FF] flex items-center gap-1 text-[10px] font-['Inter'] transition-colors"
            >
              <span className="material-symbols-outlined text-xs">content_copy</span> Copy snippet
            </button>
          </div>
          <div className="p-6 text-left font-mono text-sm md:text-base space-y-2">
            <p className="text-[#c0c1ff]"><span className="text-[#00F0FF]">const</span> profile = {'{'}</p>
            <p className="pl-4 text-[#e8def9]">name: <span className="text-[#00F0FF]">"Usama Ahmad"</span>,</p>
            <p className="pl-4 text-[#e8def9]">roles: [<span className="text-[#d1bcff]">"Web Developer"</span>, <span className="text-[#d1bcff]">"Designer"</span>, <span className="text-[#d1bcff]">"Creator"</span>],</p>
            <p className="pl-4 text-[#e8def9]">status: <span className="text-[#00F0FF]">"Architecting the Future"</span></p>
            <p className="text-[#c0c1ff]">{'};'}</p>
          </div>
        </div>

        <div className="pt-8">
          <a
            href="#projects"
            className="inline-block bg-gradient-to-r from-[#00dbe9] to-[#00f0ff] text-[#002022] px-10 py-4 rounded-md font-bold tracking-widest uppercase text-sm shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:scale-105 active:scale-95 transition-all"
          >
            EXPLORE PORTFOLIO
          </a>
        </div>
      </div>
    </section>
  );
}
