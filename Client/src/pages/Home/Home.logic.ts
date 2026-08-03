import { useState, useEffect } from 'react';
import { httpService } from '../../services/HttpService';

interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  images: string[];
  category: string;
  brand?: string;
  stock: number;
  rating: number;
  reviewCount: number;
  tags?: string[];
  isActive: boolean;
}

interface IHomeHook {
  featuredProducts: IProduct[];
  newArrivals: IProduct[];
  loading: boolean;
  error: string | null;
}

export const useHome = (): IHomeHook => {
  const [featuredProducts, setFeaturedProducts] = useState<IProduct[]>([]);
  const [newArrivals, setNewArrivals] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        setLoading(true);
        
        // Load featured products
        const featuredResponse = await httpService.get<IProduct[]>(
          '/api/products?featured=true&limit=8'
        );
        if (featuredResponse.success && featuredResponse.data) {
          setFeaturedProducts(featuredResponse.data);
        }

        // Load new arrivals
        const newArrivalsResponse = await httpService.get<IProduct[]>(
          '/api/products?sortBy=newest&limit=8'
        );
        if (newArrivalsResponse.success && newArrivalsResponse.data) {
          setNewArrivals(newArrivalsResponse.data);
        }
      } catch (err) {
        setError('Failed to load home page data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  return {
    featuredProducts,
    newArrivals,
    loading,
    error
  };
};
