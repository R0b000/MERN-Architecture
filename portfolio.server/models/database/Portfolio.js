const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
  icon: { type: String, default: '' },
  year: { type: String, required: true },
  title: { type: String, required: true },
  institution: { type: String, required: true },
});

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, required: true },
});

const LanguageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: String, required: true },
});

const ExperienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  period: { type: String, required: true },
  role: { type: String, required: true },
  bulletPoints: [{ type: String }],
});

const ProjectSchema = new mongoose.Schema({
  category: { type: String, required: true }, // "academic" or "other"
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [{ type: String }],
  imageUrl: { type: String, default: '' },
  githubUrl: { type: String, default: '' },
  liveUrl: { type: String, default: '' },
  progress: { type: String, default: 'Completed' }, // "Planning", "In Progress", "Completed"
});

const PortfolioSchema = new mongoose.Schema(
  {
    aboutMe: {
      role: { type: String, default: 'Full Stack Developer' },
      education: { type: String, default: 'Computer Engineering' },
      college: { type: String, default: 'Kantipur Engineering College' },
      gradYear: { type: Number, default: 2025 },
      traits: [{ type: String }],
      focus: { type: String, default: 'collaborative environments' },
      intro: { type: String, default: '' },
      typewriterPhrases: [{ type: String }],
      stats: {
        yearsExperience: { type: String, default: '2+' },
        projectsShipped: { type: String, default: '7+' },
        techStacks: { type: String, default: '10+' },
        curiosity: { type: String, default: '∞' },
      },
    },
    education: [EducationSchema],
    skills: [SkillSchema],
    tools: [{ type: String }],
    languages: {
      programming: [LanguageSchema],
      spoken: [LanguageSchema],
    },
    experience: [ExperienceSchema],
    projects: [ProjectSchema],
    marquee: [{ type: String }],
    analytics: {
      views: { type: Number, default: 0 },
      hireMeClicks: { type: Number, default: 0 },
      projectClicks: { type: Number, default: 0 }
    },
    contact: {
      name: { type: String, default: 'Bijaya Kingring' },
      role: { type: String, default: 'Full Stack Developer' },
      phone: { type: String, default: '+977 9841328533' },
      email: { type: String, default: '3ijayakingmagar@gmail.com' },
      location: { type: String, default: 'Kalanki, Kathmandu' },
      available: { type: Boolean, default: true },
    },
  },
  {
    timestamps: true,
  }
);

const Portfolio = mongoose.model('Portfolio', PortfolioSchema);

module.exports = { Portfolio };
