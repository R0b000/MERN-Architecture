import { httpService } from './HttpService';
import type { IResponse } from 'shared-api';

export interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export class ProductService {
  static async getProducts(category?: string): Promise<IResponse<Product[]>> {
    const url = category ? `/products?category=${category}` : '/products';
    return await httpService.get<Product[]>(url);
  }

  static async getProductById(id: string): Promise<IResponse<Product>> {
    return await httpService.get<Product>(`/products/${id}`);
  }

  static async createProduct(productData: Omit<Product, '_id' | 'createdAt' | 'updatedAt'>): Promise<IResponse<Product>> {
    return await httpService.post<Product>('/products', productData);
  }

  static async updateProduct(id: string, productData: Partial<Product>): Promise<IResponse<Product>> {
    return await httpService.put<Product>(`/products/${id}`, productData);
  }

  static async deleteProduct(id: string): Promise<IResponse<unknown>> {
    return await httpService.delete(`/products/${id}`);
  }
}
