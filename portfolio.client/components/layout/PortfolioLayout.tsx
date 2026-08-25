import React, { useEffect, useState, Suspense } from 'react';
import { Outlet, Link, NavLink, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../../Auth.Client/context/AuthContext';
import { portfolioAPIService, PortfolioData } from '../../services/PortfolioAPIService';

export const PortfolioLayout = () => {
  const { user, logout, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [clockTime, setClockTime] = useState('--:--:--');
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Fetch portfolio data
  const fetchPortfolioData = async () => {
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

  useEffect(() => {
    fetchPortfolioData();
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

  // Redirect to login if not authenticated
  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center font-sans">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
          <p className="text-sm text-slate-400">Verifying session...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center font-sans">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
          <p className="text-sm text-slate-400">Loading admin console...</p>
        </div>
      </div>
    );
  }

  if (errorMsg || !portfolioData) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center font-sans p-6">
        <div className="max-w-md text-center space-y-4 border border-red-500/30 p-6 rounded-xl bg-red-500/5">
          <div className="text-lg font-bold text-red-500">Database Connection Mismatch</div>
          <div className="text-sm text-slate-300">{errorMsg || 'No portfolio data could be retrieved.'}</div>
          <button onClick={() => window.location.reload()} className="bg-red-500 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-red-600 transition-all">
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      {/* Admin Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 font-bold text-white tracking-wider text-sm bg-orange-600 px-3 py-1 rounded-lg">
              ADMIN PANEL
            </div>
            <span className="text-xs text-slate-400 hidden sm:inline">{clockTime}</span>
          </div>
          
          <ul className="hidden md:flex items-center gap-6 text-xs font-semibold tracking-wider">
            <li>
              <NavLink 
                to="/dashboard" 
                end
                className={({ isActive }) => `pb-1 transition-colors ${isActive ? 'text-orange-500 border-b-2 border-orange-500' : 'text-slate-400 hover:text-white'}`}
              >
                OVERVIEW
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/dashboard/projects" 
                className={({ isActive }) => `pb-1 transition-colors ${isActive ? 'text-orange-500 border-b-2 border-orange-500' : 'text-slate-400 hover:text-white'}`}
              >
                PROJECTS
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/dashboard/education" 
                className={({ isActive }) => `pb-1 transition-colors ${isActive ? 'text-orange-500 border-b-2 border-orange-500' : 'text-slate-400 hover:text-white'}`}
              >
                EDUCATION
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/dashboard/experience" 
                className={({ isActive }) => `pb-1 transition-colors ${isActive ? 'text-orange-500 border-b-2 border-orange-500' : 'text-slate-400 hover:text-white'}`}
              >
                EXPERIENCE
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/dashboard/skills" 
                className={({ isActive }) => `pb-1 transition-colors ${isActive ? 'text-orange-500 border-b-2 border-orange-500' : 'text-slate-400 hover:text-white'}`}
              >
                SKILLS
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/dashboard/messages" 
                className={({ isActive }) => `pb-1 transition-colors ${isActive ? 'text-orange-500 border-b-2 border-orange-500' : 'text-slate-400 hover:text-white'}`}
              >
                MESSAGES
              </NavLink>
            </li>
          </ul>

          <div className="flex items-center gap-4">
            <a href="/" target="_blank" rel="noreferrer" className="text-xs text-slate-400 hover:text-white transition-colors border border-slate-700 px-3 py-1.5 rounded-lg">
              View Site ↗
            </a>
            <button onClick={handleLogout} className="text-xs font-semibold bg-slate-800 hover:bg-red-600 hover:text-white text-slate-300 px-3 py-1.5 rounded-lg transition-all">
              LOGOUT
            </button>
          </div>
        </div>
      </nav>

      {/* Main Admin Console Container */}
      <main className="pt-20 flex-1 max-w-7xl w-full mx-auto p-6">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        }>
          <Outlet context={{ portfolioData, refreshData: fetchPortfolioData }} />
        </Suspense>
      </main>
    </div>
  );
};

export default PortfolioLayout;
