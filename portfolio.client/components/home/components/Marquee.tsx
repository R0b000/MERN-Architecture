import React from 'react';

interface MarqueeProps {
  items: string[];
}

export const Marquee: React.FC<MarqueeProps> = ({ items }) => {
  return (
    <div className="border-y border-white/10 py-6 overflow-hidden bg-black relative">
      <div className="flex whitespace-nowrap marquee-track">
        <div className="flex items-center gap-8 px-4 text-2xl md:text-4xl font-bold tracking-tight">
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <span>{item.toUpperCase()}</span>
              <span className="text-white/20">◆</span>
            </React.Fragment>
          ))}
        </div>
        <div className="flex items-center gap-8 px-4 text-2xl md:text-4xl font-bold tracking-tight">
          {items.map((item, index) => (
            <React.Fragment key={`repeat-${index}`}>
              <span>{item.toUpperCase()}</span>
              <span className="text-white/20">◆</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
