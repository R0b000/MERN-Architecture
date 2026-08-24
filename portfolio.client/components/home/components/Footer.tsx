import React from 'react';

interface FooterProps {
  name: string;
}

export const Footer: React.FC<FooterProps> = ({ name }) => {
  return (
    <footer className="border-t border-white/10 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-white/40">
        <div>© {new Date().getFullYear()} {name.toUpperCase()} // ALL_RIGHTS_RESERVED</div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-400 rounded-full pulse-dot"></span>
          <span>BUILDING_SOMETHING_COOL</span>
        </div>
        <div>v1.0.0 // DEPLOYED_ON_RENDER</div>
      </div>
    </footer>
  );
};

export default Footer;
