import useLoginLogic from './Login.logic';
import { LoginForm, useLogout } from 'auth-client';

const Login = () => {
  const { handleLogin, isLoading, error } = useLoginLogic();
  const { logout } = useLogout();

  return (
    <div className="-columns items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center text-primary-700 mb-6">
          Sign In
        </h1>
        <LoginForm
          onSubmit={handleLogin}
          isLoading={isLoading}
          error={error}
          onRegisterClick={() => window.location.assign('/register')}
        />
      </div>
    </div>
  );
};

export default Login;
