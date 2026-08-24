const { Portfolio } = require('../models/database/Portfolio');
const { Response } = require('../../Shared/API/wrappers/Response');

const defaultPortfolioData = {
  aboutMe: {
    role: 'Full Stack Developer',
    education: 'Computer Engineering',
    college: 'Kantipur Engineering College',
    gradYear: 2025,
    traits: ['enthusiastic', 'fast-learning', 'adaptable', 'solution-oriented'],
    focus: 'collaborative environments',
    intro: 'Computer Engineering graduate crafting scalable web experiences. Specializing in MERN stack, Laravel, and .NET. Building fast, secure, and elegant systems.',
    typewriterPhrases: [
      'I build scalable full-stack applications.',
      'I craft clean, performant user experiences.',
      'I turn ideas into production-ready code.',
      "Let's build something amazing together.",
    ],
    stats: {
      yearsExperience: '2+',
      projectsShipped: '7+',
      techStacks: '10+',
      curiosity: '∞',
    },
  },
  education: [
    {
      icon: '🎓',
      year: '2025',
      title: 'Computer Engineering',
      institution: 'Kantipur Engineering College, Dhapakhel, Lalitpur',
    },
    {
      icon: '📜',
      year: '2025',
      title: 'MERN Stack Certification',
      institution: 'Broadway InfoSys, Tinkune, Koteshwor',
    },
  ],
  skills: [
    { name: 'HTML5 / CSS / JS (ES6+)', level: '95%' },
    { name: 'TypeScript / React.js', level: '90%' },
    { name: 'Node.js / Express.js', level: '88%' },
    { name: 'PHP (Laravel)', level: '82%' },
    { name: 'C# (.NET)', level: '75%' },
    { name: 'MongoDB / MySQL / MS SQL', level: '85%' },
    { name: 'Socket.IO / REST APIs', level: '87%' },
    { name: 'Python / ML (LSTM, RF)', level: '78%' },
  ],
  tools: [
    'Git',
    'JWT Auth',
    'bcryptjs',
    'CORS',
    'Custom Middleware',
    'Custom Hooks',
    'React Native',
    'Laravel Sanctum',
    'RBAC',
    'Hugging Face',
    'Mistral-7B',
    'EmailJS',
    'Adobe Photoshop',
    'Render',
  ],
  languages: {
    programming: [
      { name: 'JavaScript (ES6+)', rating: '★★★★★' },
      { name: 'TypeScript', rating: '★★★★☆' },
      { name: 'Python', rating: '★★★★☆' },
      { name: 'PHP', rating: '★★★★☆' },
      { name: 'C#', rating: '★★★☆☆' },
      { name: 'HTML5 / CSS', rating: '★★★★★' },
      { name: 'SQL', rating: '★★★★☆' },
    ],
    spoken: [
      { name: 'Nepali', rating: 'Native' },
      { name: 'English', rating: 'Fluent' },
      { name: 'Hindi', rating: 'Conversational' },
    ],
  },
  experience: [
    {
      company: 'FLASH TECH PVT. LTD.',
      period: '2024 — PRESENT',
      role: 'Jr. Full Stack Developer',
      bulletPoints: [
        'Developed and maintained scalable E-commerce platforms, focusing on high-performance frontend interfaces and robust backend API integrations.',
        'Engineered cross-platform mobile applications using React Native, ensuring a seamless user experience across iOS and Android.',
        'Collaborated with cross-functional teams to implement secure payment gateways, user authentication flows, and real-time order tracking features.',
      ],
    },
    {
      company: 'INDEX SECURITIES LTD.',
      period: 'INTERNSHIP',
      role: 'PHP Web Development Intern',
      bulletPoints: [
        'Rebuilt the company website using PHP, focusing on responsiveness and usability.',
        'Developed admin features for dynamic notice and gallery management and integrated EmailJS for contact and notification.',
        'Contributed to UI/UX and logo design using Adobe Photoshop; liaising with senior leadership for design approval and deployment.',
      ],
    },
  ],
  projects: [
    {
      category: 'academic',
      title: 'IELTS Essay Evaluation Model',
      description: 'NLP pipeline for automated IELTS essay evaluation using LSTM and fine-tuned Mistral-7B. Generates structured feedback and band scores based on IELTS criteria.',
      tags: ['AI/ML', 'NLP', 'Mistral-7B', 'Python', 'MERN', 'LLM', 'Hugging Face', 'Fine-tuning'],
      imageUrl: 'https://image.qwenlm.ai/public_source/ba22625e-0968-44a4-849d-c6f1ee882c7e/10b6c4a30-d98b-4fb6-b75a-dbe0942f0d68.png',
      githubUrl: '',
      liveUrl: '',
    },
    {
      category: 'academic',
      title: 'Email Spam Detection',
      description: 'Spam-detection system using Hugging Face dataset and Random Forest classifier. MERN-based messaging system processes each message through the ML model.',
      tags: ['ML', 'Random Forest', 'MERN', 'Python', 'Hugging Face'],
      imageUrl: 'https://image.qwenlm.ai/public_source/ba22625e-0968-44a4-849d-c6f1ee882c7e/1658b3dbe-f09b-4a93-9319-5fb072ef5f00.png',
      githubUrl: '',
      liveUrl: '',
    },
    {
      category: 'other',
      title: 'Role-based Task Manager',
      description: 'Full-stack task management with Laravel REST API, React frontend, Sanctum auth, and role-based access control.',
      tags: ['Laravel', 'React', 'RBAC'],
      imageUrl: 'https://image.qwenlm.ai/public_source/ba22625e-0968-44a4-849d-c6f1ee882c7e/1c697ea64-5306-4603-9c79-28511b82e032.png',
      githubUrl: '#',
      liveUrl: '',
    },
    {
      category: 'other',
      title: 'Aurora — E-commerce',
      description: 'Functional e-commerce with product listing, search, auth, and real-time customer-seller chat via Socket.IO.',
      tags: ['MERN', 'Socket.IO'],
      imageUrl: 'https://image.qwenlm.ai/public_source/ba22625e-0968-44a4-849d-c6f1ee882c7e/16894d421-d03f-41c1-87f4-4694f8ca5ef0.png',
      githubUrl: '#',
      liveUrl: '#',
    },
    {
      category: 'other',
      title: 'Himalaya Production',
      description: 'Media-focused website showcasing production videos with clean UI, smooth playback, and efficient media handling.',
      tags: ['Digital Marketing', 'Video'],
      imageUrl: 'https://image.qwenlm.ai/public_source/ba22625e-0968-44a4-849d-c6f1ee882c7e/1c15fc734-349e-4033-a89a-b56c91e2b986.png',
      githubUrl: '#',
      liveUrl: '#',
    },
  ],
  marquee: ['REACT', 'NODE.JS', 'TYPESCRIPT', 'MONGODB', 'LARAVEL', '.NET', 'SOCKET.IO', 'REACT NATIVE', 'PYTHON', 'MYSQL'],
  contact: {
    name: 'Bijaya Kingring',
    role: 'Full Stack Developer',
    phone: '+977 9841328533',
    email: '3ijayakingmagar@gmail.com',
    location: 'Kalanki, Kathmandu',
    available: true,
  },
};

class PortfolioService {
  async getPortfolioData() {
    try {
      let portfolio = await Portfolio.findOne().exec();
      if (!portfolio) {
        console.log('[PortfolioService] No portfolio data found. Seeding database with defaults...');
        portfolio = await Portfolio.create(defaultPortfolioData);
      }
      return Response.success(portfolio, ['Portfolio data retrieved successfully']);
    } catch (error) {
      console.error('[PortfolioService.getPortfolioData] Error:', error);
      return Response.fail('Failed to fetch portfolio data', [error.message], 500);
    }
  }

  async updatePortfolioData(data) {
    try {
      let portfolio = await Portfolio.findOne().exec();
      if (!portfolio) {
        portfolio = await Portfolio.create({ ...defaultPortfolioData, ...data });
      } else {
        portfolio = await Portfolio.findByIdAndUpdate(portfolio._id, data, { new: true }).exec();
      }
      return Response.success(portfolio, ['Portfolio data updated successfully']);
    } catch (error) {
      console.error('[PortfolioService.updatePortfolioData] Error:', error);
      return Response.fail('Failed to update portfolio data', [error.message], 500);
    }
  }
}

module.exports = { PortfolioService };
