export default function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-6 left-0 right-0 mx-auto w-[90%] max-w-md flex justify-around items-center py-2 z-50 bg-[#151023]/60 backdrop-blur-md rounded-2xl border border-[#C0C1FF]/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <a className="bg-[#00F0FF]/10 text-[#00F0FF] rounded-xl p-3 shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all" href="#">
        <span className="material-symbols-outlined">home_app_logo</span>
      </a>
      <a className="text-[#C0C1FF]/60 p-3 hover:bg-[#C0C1FF]/5 active:scale-90 transition-all" href="#about">
        <span className="material-symbols-outlined">work</span>
      </a>
      <a className="text-[#C0C1FF]/60 p-3 hover:bg-[#C0C1FF]/5 active:scale-90 transition-all" href="#projects">
        <span className="material-symbols-outlined">layers</span>
      </a>
      <a className="text-[#C0C1FF]/60 p-3 hover:bg-[#C0C1FF]/5 active:scale-90 transition-all" href="#contact">
        <span className="material-symbols-outlined">mail</span>
      </a>
    </nav>
  );
}
