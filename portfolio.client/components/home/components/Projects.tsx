import React from 'react';

interface ProjectItem {
  category: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  githubUrl: string;
  liveUrl: string;
}

interface ProjectsProps {
  projects: ProjectItem[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const academicProjects = projects.filter(p => p.category === 'academic');
  const otherProjects = projects.filter(p => p.category === 'other');

  return (
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
          {academicProjects.length > 0 && (
            <>
              <h3 className="text-lg font-bold mb-8 flex items-center gap-3">
                <span className="text-white/40">//</span> ACADEMIC_PROJECTS
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                {academicProjects.map((project, idx) => (
                  <div key={idx} className="reveal project-card border border-white/10 bg-black overflow-hidden group">
                    <div className="overflow-hidden aspect-video bg-white/5">
                      <img src={project.imageUrl} alt={project.title} className="card-img w-full h-full object-cover" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        {project.tags.map((tag, tagIdx) => (
                          <span key={tagIdx} className="text-xs border border-white/20 px-2 py-1">{tag}</span>
                        ))}
                      </div>
                      <h4 className="text-xl font-bold mb-2">{project.title}</h4>
                      <p className="text-sm text-white/60 mb-4">{project.description}</p>
                      <div className="flex gap-4">
                        {project.githubUrl && <a href={project.githubUrl} className="text-xs text-white hover:underline">GitHub →</a>}
                        {project.liveUrl && <a href={project.liveUrl} className="text-xs text-white hover:underline">Live →</a>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Other Projects */}
        <div>
          {otherProjects.length > 0 && (
            <>
              <h3 className="text-lg font-bold mb-8 flex items-center gap-3">
                <span className="text-white/40">//</span> OTHER_PROJECTS
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherProjects.map((project, idx) => (
                  <div key={idx} className="reveal project-card border border-white/10 bg-black overflow-hidden group">
                    <div className="overflow-hidden aspect-video bg-white/5">
                      <img src={project.imageUrl} alt={project.title} className="card-img w-full h-full object-cover" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        {project.tags.map((tag, tagIdx) => (
                          <span key={tagIdx} className="text-xs border border-white/20 px-2 py-1">{tag}</span>
                        ))}
                      </div>
                      <h4 className="text-lg font-bold mb-2">{project.title}</h4>
                      <p className="text-xs text-white/60 mb-3">{project.description}</p>
                      <div className="flex gap-4">
                        {project.githubUrl && <a href={project.githubUrl} className="text-xs text-white hover:underline">GitHub →</a>}
                        {project.liveUrl && <a href={project.liveUrl} className="text-xs text-white hover:underline">Live →</a>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
