import { useEffect, useState } from 'react';
import { ProductService } from '@/services/ProductService';
import type { Product } from '@/services/ProductService';

const useProductsLogic = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    const response = await ProductService.getProducts();
    if (response.success && response.data) {
      setProducts(response.data);
    } else {
      setError(response.messages?.[0] || 'Failed to load products');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, refetch: fetchProducts };
};

export default useProductsLogic;
