import React from 'react';

interface SkillsProps {
  skills: Array<{
    name: string;
    level: string;
  }>;
  tools: string[];
}

export const Skills: React.FC<SkillsProps> = ({ skills, tools }) => {
  return (
    <section id="skills" className="relative py-24 md:py-32 px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="reveal flex items-center gap-4 mb-12">
          <span className="text-white/40 text-sm">02 //</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">TECHNICAL_SKILLS</h2>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="reveal space-y-6">
            {skills.map((skill, index) => (
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
              {tools.map((tool, idx) => (
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
  );
};

export default Skills;
