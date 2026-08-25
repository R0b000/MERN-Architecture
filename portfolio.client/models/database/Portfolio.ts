export interface EducationEntry {
  _id?: string;
  icon: string;
  year: string;
  title: string;
  institution: string;
}

export interface SkillEntry {
  _id?: string;
  name: string;
  level: string;
}

export interface LanguageEntry {
  _id?: string;
  name: string;
  rating: string;
}

export interface ExperienceEntry {
  _id?: string;
  company: string;
  period: string;
  role: string;
  bulletPoints: string[];
}

export interface ProjectEntry {
  _id?: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  githubUrl: string;
  liveUrl: string;
  progress?: string;
}

export interface Portfolio {
  _id?: string;
  aboutMe: {
    role: string;
    education: string;
    college: string;
    gradYear: number;
    traits: string[];
    focus: string;
    intro: string;
    typewriterPhrases: string[];
    stats: {
      yearsExperience: string;
      projectsShipped: string;
      techStacks: string;
      curiosity: string;
    };
  };
  education: EducationEntry[];
  skills: SkillEntry[];
  tools: string[];
  languages: {
    programming: LanguageEntry[];
    spoken: LanguageEntry[];
  };
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  marquee: string[];
  analytics?: {
    views: number;
    hireMeClicks: number;
    projectClicks: number;
  };
  contact: {
    name: string;
    role: string;
    phone: string;
    email: string;
    location: string;
    available: boolean;
  };
  createdAt?: string;
  updatedAt?: string;
}
