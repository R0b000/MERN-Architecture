import { useState, useCallback } from 'react';
import { authAPIService } from '../services/AuthAPIService';
import type { User } from 'shared';
import type { UserProfileResponse } from 'shared';

export const useUserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const fetchProfile = useCallback(async () => {
    setIsPending(true);
    setError(null);
    try {
      const response = await authAPIService.getUserProfile();

      if (response.success && response.data) {
        const profile = response.data as unknown as UserProfileResponse;
        setUser(profile);
        return profile;
      } else {
        const message = response.messages?.[0] || 'Failed to fetch profile';
        setError(message);
        return null;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch profile';
      setError(message);
      return null;
    } finally {
      setIsPending(false);
    }
  }, []);

  return { user, error, isPending, fetchProfile };
};
