import { useState } from 'react';
import { authAPIService } from '../services/AuthAPIService';
import { ResetPasswordData } from '../config/appConfig';

export const useResetPassword = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [success, setSuccess] = useState(false);

  const resetPassword = async (data: ResetPasswordData) => {
    setIsPending(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await authAPIService.resetPassword(data.token, data.newPassword);

      if (response.success) {
        setSuccess(true);
        return true;
      } else {
        const message = response.messages?.[0] || 'Failed to reset password';
        setError(message);
        return false;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to reset password';
      setError(message);
      return false;
    } finally {
      setIsPending(false);
    }
  };

  return { error, isPending, success, resetPassword };
};
