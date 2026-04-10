import { FormEvent } from 'react';

interface ContactProps {
  showToast: (msg: string) => void;
}

export default function Contact({ showToast }: ContactProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showToast('Transmission Sent Successfully! Neon Architect will reply soon.');
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section className="py-32 bg-[#1e192b]" id="contact">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-16 text-center space-y-4">
          <span className="text-[#00F0FF] font-['Inter'] text-xs tracking-[0.4em] uppercase">Initiate Contact</span>
          <h2 className="text-4xl md:text-5xl font-['Space_Grotesk'] font-bold text-[#e8def9]">Start a Dialogue</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-['Inter'] text-[10px] text-[#c0c1ff] tracking-widest uppercase pl-1">Full Name</label>
              <input
                required
                className="w-full bg-[#100b1d] border-none ring-1 ring-[#3b494b]/30 focus:ring-2 focus:ring-[#00F0FF] transition-all rounded-md px-4 py-4 text-[#e8def9] placeholder:text-[#b9cacb]/30"
                placeholder="IDENTITY"
                type="text"
              />
            </div>
            <div className="space-y-2">
              <label className="font-['Inter'] text-[10px] text-[#c0c1ff] tracking-widest uppercase pl-1">Email Address</label>
              <input
                required
                className="w-full bg-[#100b1d] border-none ring-1 ring-[#3b494b]/30 focus:ring-2 focus:ring-[#00F0FF] transition-all rounded-md px-4 py-4 text-[#e8def9] placeholder:text-[#b9cacb]/30"
                placeholder="PROTOCOL"
                type="email"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="font-['Inter'] text-[10px] text-[#c0c1ff] tracking-widest uppercase pl-1">Message Body</label>
            <textarea
              required
              className="w-full bg-[#100b1d] border-none ring-1 ring-[#3b494b]/30 focus:ring-2 focus:ring-[#00F0FF] transition-all rounded-md px-4 py-4 text-[#e8def9] placeholder:text-[#b9cacb]/30 resize-none"
              placeholder="TRANSMISSION"
              rows={6}
            />
          </div>
          <div className="pt-4">
            <button
              className="w-full bg-gradient-to-r from-[#00dbe9] to-[#00f0ff] text-[#002022] py-5 rounded-md font-bold tracking-widest uppercase text-sm shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:shadow-[#00F0FF]/40 transition-all"
              type="submit"
            >
              SEND MESSAGE
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
