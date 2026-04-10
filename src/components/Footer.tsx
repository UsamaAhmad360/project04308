export default function Footer() {
  return (
    <footer className="w-full py-12 px-6 border-t border-[#C0C1FF]/5 bg-[#151023]">
      <div className="flex flex-col items-center space-y-6 w-full text-center">
        <div className="text-[#00F0FF] font-bold font-['Space_Grotesk'] text-xl tracking-tighter">USAMA AHMAD</div>
        <div className="flex gap-8">
          <a className="text-[#C0C1FF]/40 hover:text-[#00F0FF] font-['Inter'] text-[12px] font-light tracking-[0.2em] transition-all" href="#">GITHUB</a>
          <a className="text-[#C0C1FF]/40 hover:text-[#00F0FF] font-['Inter'] text-[12px] font-light tracking-[0.2em] transition-all" href="#">LINKEDIN</a>
          <a className="text-[#C0C1FF]/40 hover:text-[#00F0FF] font-['Inter'] text-[12px] font-light tracking-[0.2em] transition-all" href="#">SOURCE</a>
        </div>
        <p className="font-['Inter'] text-[12px] font-light tracking-[0.2em] text-[#C0C1FF]/40">
          © 2024 NEON ARCHITECT. ENGINEERED FOR PRECISION.
        </p>
      </div>
    </footer>
  );
}
