export default function Skills() {
  const skills = ['HTML5', 'CSS3', 'JAVASCRIPT', 'REACT', 'NODE.JS', 'THREE.JS'];

  return (
    <section className="py-32 bg-[#151023]">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-20">
        <div className="md:w-1/3">
          <h2 className="text-4xl font-['Space_Grotesk'] font-bold text-[#e8def9] mb-6">Tech Stack</h2>
          <p className="text-[#b9cacb] font-['Plus_Jakarta_Sans']">
            A curated selection of modern technologies used to build robust digital experiences. Hover or click the badges for neon activation.
          </p>
        </div>
        <div className="md:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-4">
          {skills.map((skill) => (
            <div
              key={skill}
              className="border border-[#3b494b]/20 rounded-full px-6 py-4 flex items-center justify-center gap-3 hover:bg-[#00F0FF]/5 hover:border-[#00F0FF]/40 hover:scale-105 transition-all cursor-pointer"
            >
              <span className="text-[#c0c1ff] font-['Inter'] text-xs tracking-widest uppercase">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
