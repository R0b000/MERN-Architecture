import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { portfolioAPIService, PortfolioData } from '../../services/PortfolioAPIService';

import { MatrixBackground } from './components/MatrixBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Languages } from './components/Languages';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export const PortfolioHomePage = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [clockTime, setClockTime] = useState('--:--:--');
  const [formStatus, setFormStatus] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Fetch portfolio data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await portfolioAPIService.getPortfolioData();
        if (response.success && response.data) {
          setPortfolioData(response.data);
        } else {
          setErrorMsg(response.messages?.[0] || 'Failed to load portfolio data');
        }
      } catch (err) {
        setErrorMsg(err instanceof Error ? err.message : 'Failed to connect to portfolio API');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setClockTime(now.toTimeString().split(' ')[0]);
    };
    const interval = setInterval(updateClock, 1000);
    updateClock();
    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    if (isLoading || !portfolioData) return;

    const timer = setTimeout(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.querySelectorAll('.skill-bar').forEach(b => b.classList.add('animate'));
          }
        });
      }, { threshold: 0.1 });

      const revealElements = document.querySelectorAll('.reveal');
      revealElements.forEach(el => observer.observe(el));

      return () => {
        revealElements.forEach(el => observer.unobserve(el));
        observer.disconnect();
      };
    }, 100);

    return () => clearTimeout(timer);
  }, [isLoading, portfolioData]);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('> sending...');
    try {
      const response = await portfolioAPIService.postMessage(formData);
      if (response.success) {
        setFormStatus('✓ message_sent_successfully');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setFormStatus(`✗ error: ${response.messages?.[0] || 'failed_to_send'}`);
      }
    } catch (err) {
      setFormStatus('✗ error: network_connection_failed');
    } finally {
      setTimeout(() => {
        setFormStatus('');
      }, 4000);
    }
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleHireMeClick = async () => {
    try {
      await portfolioAPIService.incrementHireMeClicks();
    } catch (err) {
      console.error('Failed to increment hire me count', err);
    }
  };

  const handleProjectClick = async () => {
    try {
      await portfolioAPIService.incrementProjectClicks();
    } catch (err) {
      console.error('Failed to increment project clicks', err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-[#f5f5f5] flex items-center justify-center font-mono">
        <div className="text-center space-y-4">
          <span className="w-3 h-3 bg-green-400 rounded-full inline-block pulse-dot"></span>
          <div className="text-sm tracking-widest cursor-blink font-bold">&gt; LOADING_PORTFOLIO_SYSTEM...</div>
        </div>
      </div>
    );
  }

  if (errorMsg || !portfolioData) {
    return (
      <div className="min-h-screen bg-black text-[#ff6b6b] flex items-center justify-center font-mono p-6">
        <div className="max-w-md text-center space-y-4 border border-[#ff6b6b]/30 p-6 rounded bg-[#ff6b6b]/5">
          <div className="text-lg font-bold">CRITICAL_SYSTEM_ERROR</div>
          <div className="text-sm text-white/75">{errorMsg || 'No portfolio data could be retrieved.'}</div>
          <button onClick={() => window.location.reload()} className="border border-[#ff6b6b]/50 px-4 py-2 hover:bg-[#ff6b6b] hover:text-black text-xs font-bold transition-all">
            RETRY_BOOT
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-hidden min-h-screen font-mono bg-transparent text-[#f5f5f5] selection:bg-white selection:text-black">
      <MatrixBackground marquee={portfolioData.marquee} />
      <div className="fixed inset-0 pointer-events-none z-50 noise opacity-8"></div>

      <Navbar
        name={portfolioData.contact.name}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onNavigateToLogin={() => navigate('/login')}
        handleSmoothScroll={handleSmoothScroll}
        onHireMeClick={handleHireMeClick}
      />

      <Hero
        name={portfolioData.contact.name}
        role={portfolioData.aboutMe.role}
        intro={portfolioData.aboutMe.intro}
        typewriterPhrases={portfolioData.aboutMe.typewriterPhrases}
        clockTime={clockTime}
        handleSmoothScroll={handleSmoothScroll}
      />

      <Marquee items={portfolioData.marquee} />

      <About
        aboutMe={portfolioData.aboutMe}
        education={portfolioData.education}
      />

      <Skills
        skills={portfolioData.skills}
        tools={portfolioData.tools}
      />

      <Languages languages={portfolioData.languages} />

      <Experience experience={portfolioData.experience} />

      <Projects projects={portfolioData.projects} onProjectClick={handleProjectClick} />

      <Contact
        contact={portfolioData.contact}
        formData={formData}
        setFormData={setFormData}
        handleContactSubmit={handleContactSubmit}
        formStatus={formStatus}
      />

      <Footer name={portfolioData.contact.name} />
    </div>
  );
};
