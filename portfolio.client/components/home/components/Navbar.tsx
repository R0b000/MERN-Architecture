import React from 'react';

interface NavbarProps {
  name: string;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onNavigateToLogin: () => void;
  handleSmoothScroll: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  name,
  mobileMenuOpen,
  setMobileMenuOpen,
  onNavigateToLogin,
  handleSmoothScroll,
}) => {
  const firstName = name.split(' ')[0].toUpperCase();

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-black/60 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#home" onClick={(e) => handleSmoothScroll(e, '#home')} className="flex items-center gap-2 group">
          <div className="w-8 h-8 border border-white flex items-center justify-center text-xs font-bold group-hover:bg-white group-hover:text-black transition-all">BK</div>
          <span className="text-sm tracking-widest">{firstName}<span className="text-white/40">.dev</span></span>
        </a>
        <ul className="hidden md:flex items-center gap-8 text-xs tracking-wider">
          <li><a href="#about" onClick={(e) => handleSmoothScroll(e, '#about')} className="nav-link">01. ABOUT</a></li>
          <li><a href="#skills" onClick={(e) => handleSmoothScroll(e, '#skills')} className="nav-link">02. SKILLS</a></li>
          <li><a href="#experience" onClick={(e) => handleSmoothScroll(e, '#experience')} className="nav-link">03. EXPERIENCE</a></li>
          <li><a href="#projects" onClick={(e) => handleSmoothScroll(e, '#projects')} className="nav-link">04. PROJECTS</a></li>
          <li><a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')} className="nav-link">05. CONTACT</a></li>
        </ul>
        <div className="hidden md:flex items-center gap-4">
          {/* <button onClick={onNavigateToLogin} className="text-xs border border-white/30 px-4 py-2 hover:bg-white hover:text-black transition-all">
            PORTAL_LOGIN
          </button> */}
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
              <button onClick={() => { onNavigateToLogin(); setMobileMenuOpen(false); }} className="w-full text-left py-2 border-t border-white/10 text-sm">
                PORTAL_LOGIN
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
