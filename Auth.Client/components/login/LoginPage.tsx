import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { LoginForm } from './LoginForm';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const { login, isAuthenticated } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (credentials: { email: string; password: string }) => {
    setIsPending(true);
    setError(null);
    try {
      await login(credentials);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 md:p-6 select-none font-sans">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[550px]">
        {/* Left Side: Brand & Visuals */}
        <div className="hidden md:flex md:col-span-5 bg-gradient-to-br from-orange-50 via-slate-50 to-orange-100/50 p-8 flex-col justify-between border-r border-slate-100 relative overflow-hidden">
          {/* Subtle decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-400/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl -ml-20 -mb-20"></div>

          {/* Logo container */}
          <div className="flex flex-col items-center text-center space-y-6 my-auto justify-center flex-1">
            <img 
              src="/images/logo.png" 
              alt="Himalaya Online Shop Logo" 
              className="max-w-[220px] h-auto object-contain transition-transform duration-300 hover:scale-105" 
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fb = document.getElementById('logo-fallback');
                if (fb) fb.classList.remove('hidden');
              }}
            />
            {/* Fallback styling if logo doesn't load */}
            <div id="logo-fallback" className="hidden flex-col items-center space-y-2">
              <div className="p-4 bg-orange-500 text-white rounded-xl font-bold text-2xl shadow-md">H</div>
              <span className="font-bold text-xl text-slate-800 tracking-wider">HIMALAYA</span>
            </div>
            
            <div className="space-y-2 max-w-[240px]">
              <h3 className="text-slate-800 font-semibold text-base tracking-tight">Portal Management</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Manage your e-commerce shop, view dashboard statistics, and handle customer communication efficiently.
              </p>
            </div>
          </div>

          {/* Footer inside Left Panel */}
          <div className="text-center text-slate-400 text-[10px]">
            &copy; {new Date().getFullYear()} Himalaya Online Shop.
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="col-span-1 md:col-span-7 flex flex-col justify-center p-8 md:p-12 bg-white relative">
          {/* Logo visible only on mobile */}
          <div className="flex justify-center mb-8 md:hidden">
            <img 
              src="/images/logo.png" 
              alt="Himalaya Online Shop Logo" 
              className="max-w-[180px] h-auto object-contain"
            />
          </div>

          <div className="w-full max-w-md mx-auto space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome Back</h2>
              <p className="text-slate-500 text-sm">Please sign in to access your administrative dashboard.</p>
            </div>

            <LoginForm onSubmit={handleSubmit} isLoading={isPending} error={error} onRegisterClick={() => navigate('/register')} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
