import React from 'react';

interface ExperienceItem {
  company: string;
  period: string;
  role: string;
  bulletPoints: string[];
}

interface ExperienceProps {
  experience: ExperienceItem[];
}

export const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  return (
    <section id="experience" className="relative py-24 md:py-32 px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="reveal flex items-center gap-4 mb-12">
          <span className="text-white/40 text-sm">03 //</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">EXPERIENCE</h2>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        <div className="space-y-12">
          {experience.map((exp, idx) => (
            <div key={idx} className="reveal timeline-item">
              <div className="flex flex-wrap items-baseline gap-3 mb-3">
                <h3 className="text-xl md:text-2xl font-bold">{exp.company}</h3>
                <span className="text-xs text-white/40">// {exp.period}</span>
              </div>
              <div className="text-sm text-white/60 mb-4">{exp.role}</div>
              <ul className="space-y-2 text-sm text-white/70">
                {exp.bulletPoints.map((bp, bpIdx) => (
                  <li key={bpIdx} className="flex gap-3"><span className="text-white/40">▸</span> {bp}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
