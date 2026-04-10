import { useState } from 'react';
import DemoShowcase from './DemoShowcase';

interface ProjectsProps {
  showToast: (msg: string) => void;
}

interface ProjectCard {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  buttonLabel: string;
}

const toolsProjects: ProjectCard[] = [
  {
    id: 'qr',
    title: 'QR Code Generator',
    description: 'A high-precision utility for dynamic data encoding with customizable branding layers.',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
    tags: ['Vanilla JS', 'Canvas API'],
    buttonLabel: 'Live Demo',
  },
  {
    id: 'shortener',
    title: 'Link Shortener',
    description: 'Cloud-native URL optimization tool with real-time analytics and fast redirect capabilities.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80',
    tags: ['Vanilla JS', 'Crypto & DOM'],
    buttonLabel: 'Live Demo',
  },
  {
    id: 'password',
    title: 'Password Toolkit',
    description: 'Cryptographically secure entropy generator and strength analyzer for ultimate enterprise security.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
    tags: ['Vanilla JS', 'Security Module'],
    buttonLabel: 'Live Demo',
  },
];

const gamesProjects: ProjectCard[] = [
  {
    id: 'pong',
    title: 'Neon Pong Classic',
    description: 'Retro arcade classic rebuilt with high-velocity neon trails and smooth vector physics.',
    image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=600&q=80',
    tags: ['Canvas API', 'Animation Loop'],
    buttonLabel: 'Play Now',
  },
  {
    id: 'snake',
    title: 'Cyber Snake Grid',
    description: 'Grid-locked neon serpentine algorithm with increasing speeds and dynamic glowing pellets.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    tags: ['Vanilla JS', 'Game Logic'],
    buttonLabel: 'Play Now',
  },
  {
    id: 'memory',
    title: 'Memory Matrix',
    description: 'Match holographic neon glyphs in a time-trial memory matching challenge.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    tags: ['DOM APIs', 'CSS Transforms'],
    buttonLabel: 'Play Now',
  },
];

const extensionsProjects: ProjectCard[] = [
  {
    id: 'tab-manager',
    title: 'Chrome Tab Manager',
    description: 'Streamlined browser extension to organize, pin, and manage large tab sessions efficiently.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80',
    tags: ['Chrome API', 'Extension'],
    buttonLabel: 'Open Popup',
  },
  {
    id: 'color-picker',
    title: 'Devtools Color Picker',
    description: 'Precision eyedropper palette tool designed specifically for neon architects and web designers.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
    tags: ['Devtools', 'Eyedropper'],
    buttonLabel: 'Open Popup',
  },
];

function ProjectCardComponent({ project, onLaunch }: { project: ProjectCard; onLaunch: (id: string) => void }) {
  return (
    <div className="bg-[rgba(55,50,70,0.4)] backdrop-blur-md group p-1 rounded-2xl border border-[#3b494b]/10 hover:border-[#00F0FF]/30 transition-all flex flex-col justify-between">
      <div className="bg-[#2c273a] rounded-xl overflow-hidden flex flex-col h-full">
        <div className="h-48 relative overflow-hidden">
          <img
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            alt={project.title}
            src={project.image}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2c273a] to-transparent"></div>
        </div>
        <div className="p-6 space-y-4 flex-grow">
          <h3 className="text-xl font-['Space_Grotesk'] font-bold text-[#e8def9]">{project.title}</h3>
          <p className="text-[#b9cacb] text-sm font-['Plus_Jakarta_Sans']">{project.description}</p>
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 bg-[#3c3f84]/30 text-[#c0c1ff] text-[10px] rounded-full uppercase font-['Inter']">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="p-6 pt-0 flex gap-4">
          <button
            onClick={() => onLaunch(project.id)}
            className="text-[#00F0FF] font-['Inter'] text-[10px] tracking-widest uppercase hover:underline"
          >
            {project.buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Projects({ showToast }: ProjectsProps) {
  const [activeTab, setActiveTab] = useState<'tools' | 'games' | 'extensions'>('tools');
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  const handleLaunch = (id: string) => {
    setActiveDemo(id);
    setTimeout(() => {
      document.getElementById('demo-showcase')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  };

  const handleCloseDemo = () => {
    setActiveDemo(null);
  };

  const handleTabChange = (tab: 'tools' | 'games' | 'extensions') => {
    setActiveTab(tab);
    setActiveDemo(null);
  };

  const currentProjects = activeTab === 'tools' ? toolsProjects
    : activeTab === 'games' ? gamesProjects
    : extensionsProjects;

  const activeBtnClass = "px-6 py-2.5 rounded-lg text-xs font-['Inter'] tracking-widest uppercase transition-all duration-300 bg-gradient-to-r from-[#00dbe9] to-[#00f0ff] text-[#002022] font-bold shadow-[0_0_15px_rgba(0,240,255,0.3)]";
  const inactiveBtnClass = "px-6 py-2.5 rounded-lg text-xs font-['Inter'] tracking-widest uppercase transition-all duration-300 text-[#c0c1ff] hover:text-[#00F0FF]";

  return (
    <section className="py-32 bg-[#100b1d]" id="projects">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 space-y-4 text-center">
          <span className="text-[#c0c1ff] font-['Inter'] text-xs tracking-[0.4em] uppercase">Featured Works</span>
          <h2 className="text-4xl md:text-5xl font-['Space_Grotesk'] font-bold text-[#e8def9]">Project Registry</h2>
          <p className="text-[#b9cacb] text-sm max-w-xl mx-auto">Navigate categories below to launch pure, custom-built HTML/JS apps directly in your browser.</p>
        </div>

        {/* 3-Tab Navigation System */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-[#2c273a] p-1.5 rounded-xl border border-[#3b494b]/30">
            <button
              onClick={() => handleTabChange('tools')}
              className={activeTab === 'tools' ? activeBtnClass : inactiveBtnClass}
            >
              Tools
            </button>
            <button
              onClick={() => handleTabChange('games')}
              className={activeTab === 'games' ? activeBtnClass : inactiveBtnClass}
            >
              Games
            </button>
            <button
              onClick={() => handleTabChange('extensions')}
              className={activeTab === 'extensions' ? activeBtnClass : inactiveBtnClass}
            >
              Extensions
            </button>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className={`grid grid-cols-1 gap-8 transition-all duration-500 ${activeTab === 'extensions' ? 'md:grid-cols-2 max-w-4xl mx-auto' : 'md:grid-cols-3'}`}>
          {currentProjects.map((project) => (
            <ProjectCardComponent key={project.id} project={project} onLaunch={handleLaunch} />
          ))}
        </div>

        {/* Demo Showcase */}
        <div id="demo-showcase">
          <DemoShowcase activeDemo={activeDemo} onClose={handleCloseDemo} showToast={showToast} />
        </div>
      </div>
    </section>
  );
}
