import useRegisterLogic from './Register.logic';
import { RegisterForm } from 'auth-client';
import { motion } from 'framer-motion';

const Register = () => {
  const { handleRegister, isLoading, error } = useRegisterLogic();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-200 to-slate-300 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
      
      {/* Floating code snippets background */}
      <motion.div 
        className="absolute top-20 left-10 text-red-600/10 font-mono text-xs"
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        {'<document>'}
      </motion.div>
      <motion.div 
        className="absolute bottom-40 right-20 text-red-600/10 font-mono text-xs"
        animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        {'const data = process()'}
      </motion.div>
      <motion.div 
        className="absolute top-40 right-32 text-red-600/10 font-mono text-sm"
        animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {'.txt'}
      </motion.div>

      <div className="w-full max-w-4xl relative z-10">
        {/* Sliding Card Container */}
        <motion.div 
          className="bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[500px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex relative">
            {/* Red Overlay Panel */}
            <motion.div 
              className="absolute top-0 left-0 h-full w-1/2 bg-red-600 z-20 flex flex-col justify-center items-center text-white p-8"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              style={{ clipPath: 'ellipse(150% 100% at 100% 50%)' }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-center"
              >
                <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
                <p className="text-red-100 mb-8 text-lg">Already have an account?</p>
                <motion.a
                  href="/login"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-red-600 transition-all duration-300 inline-block"
                >
                  SIGN IN
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Content Area - Register Form */}
            <motion.div 
              className="w-full p-10 flex flex-col justify-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Upload/User Icon */}
              <motion.div 
                className="mb-8 flex justify-center"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="relative"
                >
                  {/* Upload/User Icon */}
                  <svg width="120" height="140" viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="20" y="10" width="80" height="120" rx="8" fill="#FEF2F2" stroke="#FECACA" strokeWidth="2"/>
                    <path d="M60 10 L100 10 L100 40 L60 40 Z" fill="#DC2626"/>
                    <text x="60" y="32" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">.txt</text>
                    
                    {/* Upload arrow */}
                    <motion.path 
                      d="M60 55 L60 95 M45 75 L60 60 L75 75" 
                      stroke="#DC2626" 
                      strokeWidth="3" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                    <rect x="35" y="95" width="50" height="20" rx="4" fill="#DC2626" opacity="0.2"/>
                    <rect x="35" y="95" width="50" height="20" rx="4" fill="none" stroke="#DC2626" strokeWidth="2"/>
                  </svg>
                  
                  {/* Floating elements */}
                  <motion.div
                    className="absolute -right-6 top-12 text-red-600 font-mono text-xs"
                    animate={{ opacity: [0.5, 1, 0.5], rotate: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {'upload()'}
                  </motion.div>
                </motion.div>
              </motion.div>

              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h2>
                <p className="text-gray-600">Start managing your documents</p>
              </div>

              {/* Import/Register form placeholder */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input 
                    type="password" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Import .txt File (Optional)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-red-600 transition-colors cursor-pointer">
                    <svg className="w-8 h-8 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m0-3v12" />
                    </svg>
                    <p className="text-sm text-gray-500">Drop your .txt file here or click to browse</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleRegister}
                  disabled={isLoading}
                  className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </motion.button>
                
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 text-sm text-center"
                  >
                    {error}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p 
          className="text-center text-gray-600 text-sm mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          © 2024 DocuManage. All rights reserved.
        </motion.p>
      </div>
    </div>
  );
};

export default Register;
