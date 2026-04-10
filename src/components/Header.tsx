interface HeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (v: boolean) => void;
}

export default function Header({ mobileMenuOpen, setMobileMenuOpen }: HeaderProps) {
  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-[#151023]/80 backdrop-blur-xl border-b border-[#3b494b]/20">
        <nav className="flex justify-between items-center px-6 py-4 w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00F0FF]">terminal</span>
            <span className="text-xl font-bold text-[#00F0FF] drop-shadow-[0_0_8px_rgba(0,240,255,0.5)] font-['Space_Grotesk'] tracking-tighter uppercase">
              NEON_ARCHITECT
            </span>
          </div>
          <div className="hidden md:flex gap-8">
            <a className="text-[#00F0FF] font-['Inter'] text-[12px] uppercase tracking-widest transition-colors duration-300" href="#">Home</a>
            <a className="text-[#C0C1FF] hover:text-[#00F0FF] font-['Inter'] text-[12px] uppercase tracking-widest transition-colors duration-300" href="#about">About</a>
            <a className="text-[#C0C1FF] hover:text-[#00F0FF] font-['Inter'] text-[12px] uppercase tracking-widest transition-colors duration-300" href="#projects">Works</a>
            <a className="text-[#C0C1FF] hover:text-[#00F0FF] font-['Inter'] text-[12px] uppercase tracking-widest transition-colors duration-300" href="#contact">Contact</a>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[#00F0FF] md:hidden active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </nav>
      </header>

      {/* Mobile Dropdown Menu */}
      <div
        className={`${mobileMenuOpen ? 'flex' : 'hidden'} fixed inset-x-0 top-[64px] bg-[#151023]/95 backdrop-blur-xl border-b border-[#3b494b]/20 px-6 py-8 z-40 space-y-6 flex-col items-center shadow-2xl transition-all`}
      >
        <a href="#" className="text-[#00F0FF] font-['Inter'] text-sm tracking-widest uppercase" onClick={() => setMobileMenuOpen(false)}>Home</a>
        <a href="#about" className="text-[#C0C1FF] font-['Inter'] text-sm tracking-widest uppercase" onClick={() => setMobileMenuOpen(false)}>About</a>
        <a href="#projects" className="text-[#C0C1FF] font-['Inter'] text-sm tracking-widest uppercase" onClick={() => setMobileMenuOpen(false)}>Works</a>
        <a href="#contact" className="text-[#C0C1FF] font-['Inter'] text-sm tracking-widest uppercase" onClick={() => setMobileMenuOpen(false)}>Contact</a>
      </div>
    </>
  );
}
