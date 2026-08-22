import { useState } from 'react';
import { authAPIService } from '../services/AuthAPIService';
import { ChangePasswordData } from '../models/config/appConfig';

export const useChangePassword = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [success, setSuccess] = useState(false);

  const changePassword = async (data: ChangePasswordData) => {
    setIsPending(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await authAPIService.changePassword(
        data.currentPassword,
        data.newPassword
      );

      if (response.success) {
        setSuccess(true);
        return true;
      } else {
        const message = response.messages?.[0] || 'Failed to change password';
        setError(message);
        return false;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to change password';
      setError(message);
      return false;
    } finally {
      setIsPending(false);
    }
  };

  return { error, isPending, success, changePassword };
};
