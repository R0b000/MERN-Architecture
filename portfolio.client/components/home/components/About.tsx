import React from 'react';

interface AboutProps {
  aboutMe: {
    role: string;
    education: string;
    college: string;
    gradYear: number;
    traits: string[];
    focus: string;
    stats: {
      yearsExperience: string;
      projectsShipped: string;
      techStacks: string;
      curiosity: string;
    };
  };
  education: Array<{
    icon: string;
    year: string;
    title: string;
    institution: string;
  }>;
}

export const About: React.FC<AboutProps> = ({ aboutMe, education }) => {
  return (
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
              <pre className="text-sm leading-relaxed text-white/80">
                <span className="text-white/40">{'{'}</span>
                {"\n  "}<span className="text-white/40">"role"</span>: <span className="text-white">"{aboutMe.role}"</span>,
                {"\n  "}<span className="text-white/40">"education"</span>: <span className="text-white">"{aboutMe.education}"</span>,
                {"\n  "}<span className="text-white/40">"college"</span>: <span className="text-white">"{aboutMe.college}"</span>,
                {"\n  "}<span className="text-white/40">"gradYear"</span>: <span className="text-white">{aboutMe.gradYear}</span>,
                {"\n  "}<span className="text-white/40">"traits"</span>: [
                {aboutMe.traits.map((trait, idx) => (
                  <React.Fragment key={idx}>
                    {"\n    "}<span className="text-white">"{trait}"</span>
                    {idx < aboutMe.traits.length - 1 ? ',' : ''}
                  </React.Fragment>
                ))}
                {"\n  "}],
                {"\n  "}<span className="text-white/40">"focus"</span>: <span className="text-white">"{aboutMe.focus}"</span>
                {"\n"}<span className="text-white/40">{'}'}</span>
              </pre>
            </div>
          </div>

          <div className="reveal space-y-4 text-sm leading-relaxed text-white/70">
            <p>
              Enthusiastic and fast-learning <span className="text-white">{aboutMe.education}</span> graduate
              from {aboutMe.college}, eager to contribute to and grow with dynamic teams.
            </p>
            <p>
              Adaptable and solution-oriented, I thrive in {aboutMe.focus} and am always
              ready to tackle new challenges — from building scalable e-commerce platforms to fine-tuning
              language models.
            </p>
            <p>
              Currently focused on crafting performant full-stack applications with modern tooling
              and clean architecture.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="border border-white/10 p-4">
                <div className="text-3xl font-bold">{aboutMe.stats.yearsExperience}</div>
                <div className="text-xs text-white/40 mt-1">YEARS_EXPERIENCE</div>
              </div>
              <div className="border border-white/10 p-4">
                <div className="text-3xl font-bold">{aboutMe.stats.projectsShipped}</div>
                <div className="text-xs text-white/40 mt-1">PROJECTS_SHIPPED</div>
              </div>
              <div className="border border-white/10 p-4">
                <div className="text-3xl font-bold">{aboutMe.stats.techStacks}</div>
                <div className="text-xs text-white/40 mt-1">TECH_STACKS</div>
              </div>
              <div className="border border-white/10 p-4">
                <div className="text-3xl font-bold">{aboutMe.stats.curiosity}</div>
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
            {education.map((edu, idx) => (
              <div key={idx} className="border border-white/10 p-6 hover:border-white/40 transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 border border-white/20 flex items-center justify-center text-xl group-hover:bg-white group-hover:text-black transition-all">
                    {edu.icon || '🎓'}
                  </div>
                  <span className="text-xs text-white/40">{edu.year}</span>
                </div>
                <h4 className="font-bold mb-1">{edu.title}</h4>
                <p className="text-sm text-white/60">{edu.institution}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
