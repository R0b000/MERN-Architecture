import useRegisterLogic from './Register.logic';
import { RegisterForm } from 'auth-client';

const Register = () => {
  const { handleRegister, isLoading, error } = useRegisterLogic();

  return (
    <div className="-columns items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center text-primary-700 mb-6">
          Create Account
        </h1>
        <RegisterForm
          onSubmit={handleRegister}
          isLoading={isLoading}
          error={error}
          onLoginClick={() => window.location.assign('/login')}
        />
      </div>
    </div>
  );
};

export default Register;
