import React, { useEffect, useState, Suspense, useRef } from 'react';
import { Outlet, Link, NavLink, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../../Auth.Client/context/AuthContext';
import { portfolioAPIService, PortfolioData } from '../../services/PortfolioAPIService';

export const PortfolioLayout = () => {
  const { user, logout, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [avatarDropdownOpen, setAvatarDropdownOpen] = useState(false);
  const [clockTime, setClockTime] = useState('--:--:--');
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAvatarDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Redirect to login if not authenticated
  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 flex items-center justify-center font-sans">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
          <p className="text-sm text-slate-500">Verifying session...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 flex items-center justify-center font-sans">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
          <p className="text-sm text-slate-500">Loading admin console...</p>
        </div>
      </div>
    );
  }

  if (errorMsg || !portfolioData) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 flex items-center justify-center font-sans p-6">
        <div className="max-w-md text-center space-y-4 border border-red-200 p-6 rounded-2xl bg-red-50">
          <div className="text-lg font-bold text-red-600">Database Connection Mismatch</div>
          <div className="text-sm text-slate-600">{errorMsg || 'No portfolio data could be retrieved.'}</div>
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

  const navItems = [
    { to: '/dashboard', label: 'OVERVIEW', icon: '📊', end: true },
    { to: '/dashboard/projects', label: 'PROJECTS', icon: '📁' },
    { to: '/dashboard/education', label: 'EDUCATION', icon: '🎓' },
    { to: '/dashboard/experience', label: 'EXPERIENCE', icon: '💼' },
    { to: '/dashboard/skills', label: 'SKILLS', icon: '⚙️' },
    { to: '/dashboard/messages', label: 'MESSAGES', icon: '✉️' },
  ];

  const userInitials = `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase() || 'AD';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">
      {/* Light Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          {/* Hamburger Menu (Mobile/Tablet toggle) */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden text-slate-600 hover:text-slate-900 focus:outline-none p-1"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>

          {/* Himalaya Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/images/logo.png" 
              alt="Himalaya Logo" 
              className="h-9 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fb = document.getElementById('header-logo-fallback');
                if (fb) fb.classList.remove('hidden');
              }}
            />
            <span id="header-logo-fallback" className="hidden font-bold text-lg text-slate-800 tracking-tight">Himalaya Admin</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg hidden sm:inline">
            Local Time: {clockTime}
          </span>
          <a 
            href="/" 
            target="_blank" 
            rel="noreferrer" 
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors border border-slate-200 px-3 py-1.5 rounded-xl bg-white shadow-sm"
          >
            View Site ↗
          </a>

          {/* Account Avatar Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setAvatarDropdownOpen(!avatarDropdownOpen)}
              className="w-9 h-9 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-bold flex items-center justify-center text-sm shadow-sm transition-all focus:outline-none ring-2 ring-orange-500/10 active:scale-95 cursor-pointer"
            >
              {userInitials}
            </button>

            {avatarDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-lg py-2 z-50 animate-fadeIn">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-sm font-bold text-slate-900">{user.firstName} {user.lastName}</p>
                  <p className="text-xs text-slate-500 truncate">{user.email}</p>
                </div>
                <div className="px-2 pt-2">
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>🚪</span> Logout Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Container Layout */}
      <div className="flex flex-1 pt-16 relative">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 h-[calc(100vh-64px)] sticky top-16 shrink-0 py-6 px-4">
          <ul className="space-y-1.5 flex-grow">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) => 
                    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      isActive 
                        ? 'bg-orange-50 text-orange-600 border-l-4 border-orange-500' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`
                  }
                >
                  <span className="text-base shrink-0">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </aside>

        {/* Mobile Slide Drawer Sidebar */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity"
            />
            {/* Drawer */}
            <aside className="md:hidden fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-200 z-50 flex flex-col py-6 px-4 shadow-2xl h-full animate-slideIn">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
                  <img src="/images/logo.png" alt="Himalaya Logo" className="h-8 w-auto" />
                </Link>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-slate-400 hover:text-slate-650 text-2xl font-semibold p-1 focus:outline-none"
                >
                  &times;
                </button>
              </div>
              <ul className="space-y-1.5 flex-grow">
                {navItems.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.end}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) => 
                        `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                          isActive 
                            ? 'bg-orange-50 text-orange-600 border-l-4 border-orange-500' 
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`
                      }
                    >
                      <span className="text-base shrink-0">{item.icon}</span>
                      <span>{item.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </aside>
          </>
        )}

        {/* Main Content Area */}
        <main className="flex-grow bg-slate-50/50 p-6 overflow-y-auto max-w-full">
          <div className="max-w-7xl mx-auto">
            <Suspense fallback={
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
              </div>
            }>
              <Outlet context={{ portfolioData, refreshData: fetchPortfolioData }} />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PortfolioLayout;
