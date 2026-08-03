import { useState, useEffect } from 'react';
import { httpService } from '../../services/HttpService';

interface IBanner {
  _id: string;
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl: string;
  mobileImageUrl?: string;
  linkUrl: string;
  linkText?: string;
  position: string;
  sortOrder: number;
  isActive: boolean;
}

export const useBanners = (position: string = 'home') => {
  const [banners, setBanners] = useState<IBanner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBanners = async () => {
      try {
        setLoading(true);
        const response = await httpService.get<IBanner[]>(`/api/banners/position/${position}`);
        
        if (response.success && response.data) {
          setBanners(response.data);
        } else {
          setError(response.messages?.[0] || 'Failed to load banners');
        }
      } catch (err) {
        setError('An error occurred while loading banners');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadBanners();
  }, [position]);

  return { banners, loading, error };
};
