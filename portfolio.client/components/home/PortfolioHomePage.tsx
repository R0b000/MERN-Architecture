import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export const PortfolioHomePage = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [clockTime, setClockTime] = useState('--:--:--');
  const [formStatus, setFormStatus] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // 1. Matrix Background
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        const fontSize = 13;
        let columns = Math.floor(width / fontSize);
        let drops = Array(columns).fill(0).map(() => Math.random() * -100);

        const codeTokens = [
          '0','1','{','}','[',']','(',')','<','>','/','\\','|','=','+','-','*','&','^','%','$','#','@','!',
          '?',':',';','.',',','_','~','"','\'',
          'var','let','const','fn','if','else','for','do','while','return','class','import','export','async','await',
          'true','false','null','undefined','this','new','try','catch','throw',
          '===','!==','=>','&&','||','++','--','+=','//','/*','*/','{}','[]','()',
          'a','b','c','d','e','f','x','y','z','i','j','k','n','m'
        ];

        const resizeMatrix = () => {
          if (!canvas) return;
          width = canvas.width = window.innerWidth;
          height = canvas.height = window.innerHeight;
          columns = Math.floor(width / fontSize);
          drops = Array(columns).fill(0).map(() => Math.random() * -100);
        };

        window.addEventListener('resize', resizeMatrix);

        const drawMatrix = () => {
          ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
          ctx.fillRect(0, 0, width, height);
          ctx.font = '13px JetBrains Mono';
          for (let i = 0; i < drops.length; i++) {
            const token = codeTokens[Math.floor(Math.random() * codeTokens.length)];
            const y = drops[i] * 13;

            if (Math.random() > 0.975) {
              ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
            } else {
              ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
            }
            ctx.fillText(token, i * 13, y);

            if (y > height && Math.random() > 0.975) {
              drops[i] = 0;
            }
            drops[i]++;
          }
        };

        const interval = setInterval(drawMatrix, 55);

        return () => {
          clearInterval(interval);
          window.removeEventListener('resize', resizeMatrix);
        };
      }
    }
  }, []);

  useEffect(() => {
    // 2. Clock
    const updateClock = () => {
      const now = new Date();
      setClockTime(now.toTimeString().split(' ')[0]);
    };
    const interval = setInterval(updateClock, 1000);
    updateClock();
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // 3. Typewriter
    const phrases = [
      'I build scalable full-stack applications.',
      'I craft clean, performant user experiences.',
      'I turn ideas into production-ready code.',
      'Let\'s build something amazing together.'
    ];
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
  }, []);

  useEffect(() => {
    // 4. Reveal on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          e.target.querySelectorAll('.skill-bar').forEach(b => b.classList.add('animate'));
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('> sending...');
    setTimeout(() => {
      setFormStatus('✓ message_sent_successfully');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => {
        setFormStatus('');
      }, 3000);
    }, 1200);
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative overflow-x-hidden min-h-screen font-mono bg-black text-[#f5f5f5] selection:bg-white selection:text-black">
      {/* Matrix Background */}
      <canvas ref={canvasRef} id="matrix" className="fixed inset-0 z-0 opacity-18 pointer-events-none"></canvas>

      {/* Noise overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 noise opacity-8"></div>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-black/60 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#home" onClick={(e) => handleSmoothScroll(e, '#home')} className="flex items-center gap-2 group">
            <div className="w-8 h-8 border border-white flex items-center justify-center text-xs font-bold group-hover:bg-white group-hover:text-black transition-all">BK</div>
            <span className="text-sm tracking-widest">BIJAYA<span className="text-white/40">.dev</span></span>
          </a>
          <ul className="hidden md:flex items-center gap-8 text-xs tracking-wider">
            <li><a href="#about" onClick={(e) => handleSmoothScroll(e, '#about')} className="nav-link">01. ABOUT</a></li>
            <li><a href="#skills" onClick={(e) => handleSmoothScroll(e, '#skills')} className="nav-link">02. SKILLS</a></li>
            <li><a href="#experience" onClick={(e) => handleSmoothScroll(e, '#experience')} className="nav-link">03. EXPERIENCE</a></li>
            <li><a href="#projects" onClick={(e) => handleSmoothScroll(e, '#projects')} className="nav-link">04. PROJECTS</a></li>
            <li><a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')} className="nav-link">05. CONTACT</a></li>
          </ul>
          <div className="hidden md:flex items-center gap-4">
            <button onClick={() => navigate('/login')} className="text-xs border border-white/30 px-4 py-2 hover:bg-white hover:text-black transition-all">
              PORTAL_LOGIN
            </button>
            <a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')} className="inline-flex items-center gap-2 text-xs border border-white px-4 py-2 hover:bg-white hover:text-black transition-all">
              <span className="w-2 h-2 bg-green-400 rounded-full pulse-dot"></span>
              HIRE_ME
            </a>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} id="menuBtn" className="md:hidden text-white">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </div>
        {mobileMenuOpen && (
          <div id="mobileMenu" className="md:hidden border-t border-white/10 bg-black">
            <ul className="flex flex-col p-6 gap-4 text-sm">
              <li><a href="#about" onClick={(e) => { handleSmoothScroll(e, '#about'); setMobileMenuOpen(false); }} className="block">01. ABOUT</a></li>
              <li><a href="#skills" onClick={(e) => { handleSmoothScroll(e, '#skills'); setMobileMenuOpen(false); }} className="block">02. SKILLS</a></li>
              <li><a href="#experience" onClick={(e) => { handleSmoothScroll(e, '#experience'); setMobileMenuOpen(false); }} className="block">03. EXPERIENCE</a></li>
              <li><a href="#projects" onClick={(e) => { handleSmoothScroll(e, '#projects'); setMobileMenuOpen(false); }} className="block">04. PROJECTS</a></li>
              <li><a href="#contact" onClick={(e) => { handleSmoothScroll(e, '#contact'); setMobileMenuOpen(false); }} className="block">05. CONTACT</a></li>
              <li>
                <button onClick={() => { navigate('/login'); setMobileMenuOpen(false); }} className="w-full text-left py-2 border-t border-white/10 text-sm">
                  PORTAL_LOGIN
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* HERO */}
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
              <div className="text-white mt-1">Full Stack Developer</div>
              <div className="text-white/40 mt-3">$ <span className="text-white">echo $INTRO</span></div>
              <div className="text-white mt-1 cursor-blink" id="typewriter"></div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-none mb-6">
            <span className="block glitch" data-text="BIJAYA">BIJAYA</span>
            <span className="block text-white/30">KINGRING</span>
          </h1>

          <p className="text-white/60 max-w-2xl text-sm md:text-base mb-10 leading-relaxed">
            Computer Engineering graduate crafting scalable web experiences.
            Specializing in <span className="text-white">MERN stack</span>, <span className="text-white">Laravel</span>,
            and <span className="text-white">.NET</span>. Building fast, secure, and elegant systems.
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

      {/* MARQUEE */}
      <div className="border-y border-white/10 py-6 overflow-hidden bg-black relative">
        <div className="flex whitespace-nowrap marquee-track">
          <div className="flex items-center gap-8 px-4 text-2xl md:text-4xl font-bold tracking-tight">
            <span>REACT</span><span className="text-white/20">◆</span>
            <span>NODE.JS</span><span className="text-white/20">◆</span>
            <span>TYPESCRIPT</span><span className="text-white/20">◆</span>
            <span>MONGODB</span><span className="text-white/20">◆</span>
            <span>LARAVEL</span><span className="text-white/20">◆</span>
            <span>.NET</span><span className="text-white/20">◆</span>
            <span>SOCKET.IO</span><span className="text-white/20">◆</span>
            <span>REACT NATIVE</span><span className="text-white/20">◆</span>
            <span>PYTHON</span><span className="text-white/20">◆</span>
            <span>MYSQL</span><span className="text-white/20">◆</span>
          </div>
          <div className="flex items-center gap-8 px-4 text-2xl md:text-4xl font-bold tracking-tight">
            <span>REACT</span><span className="text-white/20">◆</span>
            <span>NODE.JS</span><span className="text-white/20">◆</span>
            <span>TYPESCRIPT</span><span className="text-white/20">◆</span>
            <span>MONGODB</span><span className="text-white/20">◆</span>
            <span>LARAVEL</span><span className="text-white/20">◆</span>
            <span>.NET</span><span className="text-white/20">◆</span>
            <span>SOCKET.IO</span><span className="text-white/20">◆</span>
            <span>REACT NATIVE</span><span className="text-white/20">◆</span>
            <span>PYTHON</span><span className="text-white/20">◆</span>
            <span>MYSQL</span><span className="text-white/20">◆</span>
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="relative py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="reveal flex items-center gap-4 mb-12">
            <span className="text-white/40 text-sm">01 //</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">ABOUT_ME</h2>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="reveal">
              <div className="code-block p-6 relative">
                <div className="text-xs text-white/40 mb-4">// career_summary.json</div>
                <pre className="text-sm leading-relaxed text-white/80"><span className="text-white/40">{'{'}</span>
  <span className="text-white/40">"role"</span>: <span className="text-white">"Full Stack Developer"</span>,
  <span className="text-white/40">"education"</span>: <span className="text-white">"Computer Engineering"</span>,
  <span className="text-white/40">"college"</span>: <span className="text-white">"Kantipur Engineering College"</span>,
  <span className="text-white/40">"gradYear"</span>: <span className="text-white">2025</span>,
  <span className="text-white/40">"traits"</span>: [
    <span className="text-white">"enthusiastic"</span>,
    <span className="text-white">"fast-learning"</span>,
    <span className="text-white">"adaptable"</span>,
    <span className="text-white">"solution-oriented"</span>
  ],
  <span className="text-white/40">"focus"</span>: <span className="text-white">"collaborative environments"</span>
<span className="text-white/40">{'}'}</span></pre>
              </div>
            </div>

            <div className="reveal space-y-4 text-sm leading-relaxed text-white/70">
              <p>
                Enthusiastic and fast-learning <span className="text-white">Computer Engineering</span> graduate
                from Kantipur Engineering College, eager to contribute to and grow with dynamic teams.
              </p>
              <p>
                Adaptable and solution-oriented, I thrive in collaborative environments and am always
                ready to tackle new challenges — from building scalable e-commerce platforms to fine-tuning
                language models.
              </p>
              <p>
                Currently focused on crafting performant full-stack applications with modern tooling
                and clean architecture.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="border border-white/10 p-4">
                  <div className="text-3xl font-bold">2+</div>
                  <div className="text-xs text-white/40 mt-1">YEARS_EXPERIENCE</div>
                </div>
                <div className="border border-white/10 p-4">
                  <div className="text-3xl font-bold">7+</div>
                  <div className="text-xs text-white/40 mt-1">PROJECTS_SHIPPED</div>
                </div>
                <div className="border border-white/10 p-4">
                  <div className="text-3xl font-bold">10+</div>
                  <div className="text-xs text-white/40 mt-1">TECH_STACKS</div>
                </div>
                <div className="border border-white/10 p-4">
                  <div className="text-3xl font-bold">∞</div>
                  <div className="text-xs text-white/40 mt-1">CURIOSITY</div>
                </div>
              </div>
            </div>
          </div>

          {/* EDUCATION */}
          <div className="mt-24 reveal">
            <h3 className="text-xl md:text-2xl font-bold mb-8 flex items-center gap-3">
              <span className="text-white/40">//</span> EDUCATION & CERTIFICATION
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-white/10 p-6 hover:border-white/40 transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 border border-white/20 flex items-center justify-center text-xl group-hover:bg-white group-hover:text-black transition-all">🎓</div>
                  <span className="text-xs text-white/40">2025</span>
                </div>
                <h4 className="font-bold mb-1">Computer Engineering</h4>
                <p className="text-sm text-white/60">Kantipur Engineering College, Dhapakhel, Lalitpur</p>
              </div>
              <div className="border border-white/10 p-6 hover:border-white/40 transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 border border-white/20 flex items-center justify-center text-xl group-hover:bg-white group-hover:text-black transition-all">📜</div>
                  <span className="text-xs text-white/40">2025</span>
                </div>
                <h4 className="font-bold mb-1">MERN Stack Certification</h4>
                <p className="text-sm text-white/60">Broadway InfoSys, Tinkune, Koteshwor</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="relative py-24 md:py-32 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="reveal flex items-center gap-4 mb-12">
            <span className="text-white/40 text-sm">02 //</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">TECHNICAL_SKILLS</h2>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="reveal space-y-6">
              {[
                { name: 'HTML5 / CSS / JS (ES6+)', level: '95%' },
                { name: 'TypeScript / React.js', level: '90%' },
                { name: 'Node.js / Express.js', level: '88%' },
                { name: 'PHP (Laravel)', level: '82%' },
                { name: 'C# (.NET)', level: '75%' },
                { name: 'MongoDB / MySQL / MS SQL', level: '85%' },
                { name: 'Socket.IO / REST APIs', level: '87%' },
                { name: 'Python / ML (LSTM, RF)', level: '78%' }
              ].map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2 text-sm">
                    <span>{skill.name}</span>
                    <span className="text-white/40">{skill.level}</span>
                  </div>
                  <div className="h-px bg-white/10 relative overflow-hidden">
                    <div className="skill-bar h-px bg-white absolute top-0 left-0" style={{ '--w': skill.level } as React.CSSProperties}></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="reveal">
              <div className="text-xs text-white/40 mb-4">// tools_and_others</div>
              <div className="flex flex-wrap gap-2">
                {['Git', 'JWT Auth', 'bcryptjs', 'CORS', 'Custom Middleware', 'Custom Hooks', 'React Native', 'Laravel Sanctum', 'RBAC', 'Hugging Face', 'Mistral-7B', 'EmailJS', 'Adobe Photoshop', 'Render'].map((tool, idx) => (
                  <span key={idx} className="lang-chip border border-white/20 px-3 py-2 text-xs">{tool}</span>
                ))}
              </div>

              <div className="mt-8 code-block p-5">
                <div className="text-xs text-white/40 mb-3">$ cat stack.json</div>
                <pre className="text-xs text-white/80 leading-relaxed">{`{
  "frontend": ["React", "TypeScript"],
  "backend": ["Node", "Laravel", ".NET"],
  "database": ["Mongo", "MySQL", "MSSQL"],
  "mobile": ["React Native"],
  "ai_ml": ["Python", "LSTM", "RF"]
}`}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LANGUAGES */}
      <section className="relative py-24 md:py-32 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="reveal flex items-center gap-4 mb-12">
            <span className="text-white/40 text-sm">02.5 //</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">LANGUAGES</h2>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="reveal">
              <div className="text-xs text-white/40 mb-6">// programming_languages</div>
              <div className="space-y-3">
                {[
                  { name: 'JavaScript (ES6+)', stars: '★★★★★' },
                  { name: 'TypeScript', stars: '★★★★☆' },
                  { name: 'Python', stars: '★★★★☆' },
                  { name: 'PHP', stars: '★★★★☆' },
                  { name: 'C#', stars: '★★★☆☆' },
                  { name: 'HTML5 / CSS', stars: '★★★★★' },
                  { name: 'SQL', stars: '★★★★☆' }
                ].map((lang, idx) => (
                  <div key={idx} className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-white/40 text-xs">0{idx + 1}</span>
                      <span className="font-medium">{lang.name}</span>
                    </div>
                    <span className="text-xs text-white/40">{lang.stars}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal">
              <div className="text-xs text-white/40 mb-6">// spoken_languages</div>
              <div className="space-y-3">
                {[
                  { name: 'Nepali', status: 'Native' },
                  { name: 'English', status: 'Fluent' },
                  { name: 'Hindi', status: 'Conversational' }
                ].map((lang, idx) => (
                  <div key={idx} className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-white/40 text-xs">0{idx + 1}</span>
                      <span className="font-medium">{lang.name}</span>
                    </div>
                    <span className="text-xs text-white/40">{lang.status}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 code-block p-5">
                <div className="text-xs text-white/40 mb-3">$ echo "Hello World" in all languages</div>
                <pre className="text-xs text-white/80 leading-relaxed">{`नमस्ते  →  Nepali
Hello    →  English
नमस्ते   →  Hindi
console.log("Hello World");`}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="relative py-24 md:py-32 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="reveal flex items-center gap-4 mb-12">
            <span className="text-white/40 text-sm">03 //</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">EXPERIENCE</h2>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          <div className="space-y-12">
            <div className="reveal timeline-item">
              <div className="flex flex-wrap items-baseline gap-3 mb-3">
                <h3 className="text-xl md:text-2xl font-bold">FLASH TECH PVT. LTD.</h3>
                <span className="text-xs text-white/40">// 2024 — PRESENT</span>
              </div>
              <div className="text-sm text-white/60 mb-4">Jr. Full Stack Developer</div>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex gap-3"><span className="text-white/40">▸</span> Developed and maintained scalable E-commerce platforms, focusing on high-performance frontend interfaces and robust backend API integrations.</li>
                <li className="flex gap-3"><span className="text-white/40">▸</span> Engineered cross-platform mobile applications using React Native, ensuring a seamless user experience across iOS and Android.</li>
                <li className="flex gap-3"><span className="text-white/40">▸</span> Collaborated with cross-functional teams to implement secure payment gateways, user authentication flows, and real-time order tracking features.</li>
              </ul>
            </div>

            <div className="reveal timeline-item">
              <div className="flex flex-wrap items-baseline gap-3 mb-3">
                <h3 className="text-xl md:text-2xl font-bold">INDEX SECURITIES LTD.</h3>
                <span className="text-xs text-white/40">// INTERNSHIP</span>
              </div>
              <div className="text-sm text-white/60 mb-4">PHP Web Development Intern</div>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex gap-3"><span className="text-white/40">▸</span> Rebuilt the company website using PHP, focusing on responsiveness and usability.</li>
                <li className="flex gap-3"><span className="text-white/40">▸</span> Developed admin features for dynamic notice and gallery management and integrated EmailJS for contact and notification.</li>
                <li className="flex gap-3"><span className="text-white/40">▸</span> Contributed to UI/UX and logo design using Adobe Photoshop; liaising with senior leadership for design approval and deployment.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="relative py-24 md:py-32 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="reveal flex items-center gap-4 mb-6">
            <span className="text-white/40 text-sm">04 //</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">PROJECTS</h2>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>
          <div className="reveal text-sm text-white/50 mb-12">
            // selected_work — academic & personal builds
          </div>

          {/* Academic Projects */}
          <div className="mb-16">
            <h3 className="text-lg font-bold mb-8 flex items-center gap-3">
              <span className="text-white/40">//</span> ACADEMIC_PROJECTS
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {/* IELTS */}
              <div className="reveal project-card border border-white/10 bg-black overflow-hidden group">
                <div className="overflow-hidden aspect-video bg-white/5">
                  <img src="https://image.qwenlm.ai/public_source/ba22625e-0968-44a4-849d-c6f1ee882c7e/10b6c4a30-d98b-4fb6-b75a-dbe0942f0d68.png" alt="IELTS Essay Evaluation" className="card-img w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs border border-white/20 px-2 py-1">AI/ML</span>
                    <span className="text-xs border border-white/20 px-2 py-1">NLP</span>
                    <span className="text-xs border border-white/20 px-2 py-1">Mistral-7B</span>
                  </div>
                  <h4 className="text-xl font-bold mb-2">IELTS Essay Evaluation Model</h4>
                  <p className="text-sm text-white/60 mb-4">NLP pipeline for automated IELTS essay evaluation using LSTM and fine-tuned Mistral-7B. Generates structured feedback and band scores based on IELTS criteria.</p>
                  <div className="text-xs text-white/40 mb-4">Python · MERN · LLM · Hugging Face · Fine-tuning</div>
                </div>
              </div>

              {/* Spam */}
              <div className="reveal project-card border border-white/10 bg-black overflow-hidden group">
                <div className="overflow-hidden aspect-video bg-white/5">
                  <img src="https://image.qwenlm.ai/public_source/ba22625e-0968-44a4-849d-c6f1ee882c7e/1658b3dbe-f09b-4a93-9319-5fb072ef5f00.png" alt="Email Spam Detection" className="card-img w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs border border-white/20 px-2 py-1">ML</span>
                    <span className="text-xs border border-white/20 px-2 py-1">Random Forest</span>
                    <span className="text-xs border border-white/20 px-2 py-1">MERN</span>
                  </div>
                  <h4 className="text-xl font-bold mb-2">Email Spam Detection</h4>
                  <p className="text-sm text-white/60 mb-4">Spam-detection system using Hugging Face dataset and Random Forest classifier. MERN-based messaging system processes each message through the ML model.</p>
                  <div className="text-xs text-white/40 mb-4">Python · MERN · Random Forest · Hugging Face</div>
                </div>
              </div>
            </div>
          </div>

          {/* Other Projects */}
          <div>
            <h3 className="text-lg font-bold mb-8 flex items-center gap-3">
              <span className="text-white/40">//</span> OTHER_PROJECTS
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Task Manager */}
              <div className="reveal project-card border border-white/10 bg-black overflow-hidden group">
                <div className="overflow-hidden aspect-video bg-white/5">
                  <img src="https://image.qwenlm.ai/public_source/ba22625e-0968-44a4-849d-c6f1ee882c7e/1c697ea64-5306-4603-9c79-28511b82e032.png" alt="Task Manager" className="card-img w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs border border-white/20 px-2 py-1">Laravel</span>
                    <span className="text-xs border border-white/20 px-2 py-1">React</span>
                    <span className="text-xs border border-white/20 px-2 py-1">RBAC</span>
                  </div>
                  <h4 className="text-lg font-bold mb-2">Role-based Task Manager</h4>
                  <p className="text-xs text-white/60 mb-3">Full-stack task management with Laravel REST API, React frontend, Sanctum auth, and role-based access control.</p>
                  <a href="#" className="text-xs text-white hover:underline">GitHub →</a>
                </div>
              </div>

              {/* Aurora */}
              <div className="reveal project-card border border-white/10 bg-black overflow-hidden group">
                <div className="overflow-hidden aspect-video bg-white/5">
                  <img src="https://image.qwenlm.ai/public_source/ba22625e-0968-44a4-849d-c6f1ee882c7e/16894d421-d03f-41c1-87f4-4694f8ca5ef0.png" alt="Aurora E-commerce" className="card-img w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs border border-white/20 px-2 py-1">MERN</span>
                    <span className="text-xs border border-white/20 px-2 py-1">Socket.IO</span>
                  </div>
                  <h4 className="text-lg font-bold mb-2">Aurora — E-commerce</h4>
                  <p className="text-xs text-white/60 mb-3">Functional e-commerce with product listing, search, auth, and real-time customer-seller chat via Socket.IO.</p>
                  <div className="flex gap-3 text-xs">
                    <a href="#" className="text-white hover:underline">GitHub →</a>
                    <a href="#" className="text-white hover:underline">Live →</a>
                  </div>
                </div>
              </div>

              {/* Himalaya */}
              <div className="reveal project-card border border-white/10 bg-black overflow-hidden group">
                <div className="overflow-hidden aspect-video bg-white/5">
                  <img src="https://image.qwenlm.ai/public_source/ba22625e-0968-44a4-849d-c6f1ee882c7e/1c15fc734-349e-4033-a89a-b56c91e2b986.png" alt="Himalaya Production" className="card-img w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs border border-white/20 px-2 py-1">Digital Marketing</span>
                    <span className="text-xs border border-white/20 px-2 py-1">Video</span>
                  </div>
                  <h4 className="text-lg font-bold mb-2">Himalaya Production</h4>
                  <p className="text-xs text-white/60 mb-3">Media-focused website showcasing production videos with clean UI, smooth playback, and efficient media handling.</p>
                  <div className="flex gap-3 text-xs">
                    <a href="#" className="text-white hover:underline">GitHub →</a>
                    <a href="#" className="text-white hover:underline">Live →</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative py-24 md:py-32 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="reveal flex items-center gap-4 mb-6">
            <span className="text-white/40 text-sm">05 //</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">CONTACT</h2>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>
          <div className="reveal text-sm text-white/50 mb-12">
            // let's build something together
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="reveal">
              <div className="code-block p-6 mb-6">
                <div className="text-xs text-white/40 mb-4">// contact_info.json</div>
                <pre className="text-sm leading-loose text-white/80">{`{
  "name": "Bijaya Kingring",
  "role": "Full Stack Developer",
  "phone": "+977 9841328533",
  "email": "3ijayakingmagar@gmail.com",
  "location": "Kalanki, Kathmandu",
  "available": true
}`}</pre>
              </div>

              <div className="space-y-4">
                <a href="mailto:3ijayakingmagar@gmail.com" className="flex items-center gap-4 border border-white/10 p-4 hover:border-white/40 transition-all group">
                  <div className="w-10 h-10 border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">✉</div>
                  <div>
                    <div className="text-xs text-white/40">EMAIL</div>
                    <div className="text-sm">3ijayakingmagar@gmail.com</div>
                  </div>
                </a>
                <a href="tel:+9779841328533" className="flex items-center gap-4 border border-white/10 p-4 hover:border-white/40 transition-all group">
                  <div className="w-10 h-10 border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">☎</div>
                  <div>
                    <div className="text-xs text-white/40">PHONE</div>
                    <div className="text-sm">+977 9841328533</div>
                  </div>
                </a>
                <div className="flex items-center gap-4 border border-white/10 p-4">
                  <div className="w-10 h-10 border border-white/20 flex items-center justify-center">📍</div>
                  <div>
                    <div className="text-xs text-white/40">LOCATION</div>
                    <div className="text-sm">Kalanki, Kathmandu</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal">
              <form onSubmit={handleContactSubmit} id="contactForm" className="space-y-4">
                <div>
                  <label className="text-xs text-white/40 block mb-2">// your_name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/40 block mb-2">// your_email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/40 block mb-2">// subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="form-input"
                    placeholder="Project inquiry"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/40 block mb-2">// message</label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="form-input"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>
                <button type="submit" className="w-full bg-white text-black py-3 text-sm font-medium hover:bg-white/90 transition-all flex items-center justify-center gap-2 group">
                  SEND_MESSAGE
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
                {formStatus && <div id="formStatus" className="text-xs text-center text-white/60 mt-2">{formStatus}</div>}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-white/40">
          <div>© 2025 BIJAYA KINGRING // ALL_RIGHTS_RESERVED</div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full pulse-dot"></span>
            <span>BUILDING_SOMETHING_COOL</span>
          </div>
          <div>v1.0.0 // DEPLOYED_ON_RENDER</div>
        </div>
      </footer>
    </div>
  );
};
