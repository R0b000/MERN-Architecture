import { useState } from 'react';
import type { RegisterFormProps } from './RegisterForm.types';

export const RegisterForm = ({ onSubmit, isLoading, error, onLoginClick }: RegisterFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ email, password, firstName, lastName });
  };

  return (
    <form className="-columns gap-4 w-full" onSubmit={handleSubmit}>
      <div className="w-full">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="w-full">
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="w-full">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="w-full">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {isLoading ? 'Creating account...' : 'Sign Up'}
      </button>
      {onLoginClick && (
        <button
          type="button"
          onClick={onLoginClick}
          className="w-full text-blue-500 py-1 hover:underline"
        >
          Already have an account? Sign In
        </button>
      )}
    </form>
  );
};
