import React, { useEffect } from 'react';

interface HeroProps {
  name: string;
  role: string;
  intro: string;
  typewriterPhrases: string[];
  clockTime: string;
  handleSmoothScroll: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  name,
  role,
  intro,
  typewriterPhrases,
  clockTime,
  handleSmoothScroll,
}) => {
  const nameParts = name.split(' ');
  const firstName = nameParts[0].toUpperCase();
  const lastName = nameParts.slice(1).join(' ').toUpperCase();

  useEffect(() => {
    const phrases = typewriterPhrases && typewriterPhrases.length > 0
      ? typewriterPhrases
      : ['I build scalable full-stack applications.'];
    let phraseIdx = 0, charIdx = 0, deleting = false;
    let timer: NodeJS.Timeout;

    const typeLoop = () => {
      const typeEl = document.getElementById('typewriter');
      if (!typeEl) return;
      const current = phrases[phraseIdx];

      if (!deleting) {
        typeEl.textContent = current.slice(0, charIdx++);
        if (charIdx > current.length) {
          deleting = true;
          timer = setTimeout(typeLoop, 1800);
          return;
        }
      } else {
        typeEl.textContent = current.slice(0, charIdx--);
        if (charIdx < 0) {
          deleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
        }
      }
      timer = setTimeout(typeLoop, deleting ? 30 : 70);
    };

    typeLoop();
    return () => clearTimeout(timer);
  }, [typewriterPhrases]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-6 grid-bg">
      <div className="relative z-10 max-w-5xl w-full">
        <div className="status-line text-white/40 mb-6 flex items-center gap-3 text-xs tracking-widest">
          <span className="w-2 h-2 bg-green-400 rounded-full pulse-dot"></span>
          <span>SYSTEM_READY // ONLINE</span>
          <span className="ml-auto" id="clock">{clockTime}</span>
        </div>

        <div className="code-block p-6 mb-8 scanlines relative">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-white/20"></div>
            <div className="w-3 h-3 rounded-full bg-white/20"></div>
            <div className="w-3 h-3 rounded-full bg-white/20"></div>
            <span className="ml-4 text-xs text-white/40">~/bijaya/portfolio.sh</span>
          </div>
          <div className="text-sm md:text-base leading-relaxed">
            <div className="text-white/40">$ <span className="text-white">whoami</span></div>
            <div className="text-white mt-1">bijaya_kingring</div>
            <div className="text-white/40 mt-3">$ <span className="text-white">cat role.txt</span></div>
            <div className="text-white mt-1">{role}</div>
            <div className="text-white/40 mt-3">$ <span className="text-white">echo $INTRO</span></div>
            <div className="text-white mt-1 cursor-blink" id="typewriter"></div>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-none mb-6">
          <span className="block glitch" data-text={firstName}>{firstName}</span>
          <span className="block text-white/30">{lastName}</span>
        </h1>

        <p className="text-white/60 max-w-2xl text-sm md:text-base mb-10 leading-relaxed">
          {intro}
        </p>

        <div className="flex flex-wrap gap-4">
          <a href="#projects" onClick={(e) => handleSmoothScroll(e, '#projects')} className="group inline-flex items-center gap-3 bg-white text-black px-6 py-3 text-sm font-medium hover:bg-white/90 transition-all">
            VIEW_PROJECTS
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
          <a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')} className="inline-flex items-center gap-3 border border-white/30 px-6 py-3 text-sm hover:border-white hover:bg-white/5 transition-all">
            CONTACT_ME
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-xs">
          <span>SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
