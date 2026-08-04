import { useState } from 'react';
import { authAPIService } from '../services/AuthAPIService';

export const useForgotPassword = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [success, setSuccess] = useState(false);

  const forgotPassword = async (email: string) => {
    setIsPending(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await authAPIService.forgotPassword(email);

      if (response.success) {
        setSuccess(true);
        return true;
      } else {
        const message = response.messages?.[0] || 'Failed to send reset email';
        setError(message);
        return false;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to send reset email';
      setError(message);
      return false;
    } finally {
      setIsPending(false);
    }
  };

  return { error, isPending, success, forgotPassword };
};
