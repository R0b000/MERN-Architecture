const { Response } = require('shared-api');
const { ProductRepository } = require('../repositories/ProductRepository');

class IProductService {
  async getAllProducts() {
    throw new Error('Method "getAllProducts" must be implemented');
  }

  async getProductById(id) {
    throw new Error('Method "getProductById" must be implemented');
  }

  async getProductsByCategory(category) {
    throw new Error('Method "getProductsByCategory" must be implemented');
  }

  async createProduct(productData) {
    throw new Error('Method "createProduct" must be implemented');
  }

  async updateProduct(id, productData) {
    throw new Error('Method "updateProduct" must be implemented');
  }

  async deleteProduct(id) {
    throw new Error('Method "deleteProduct" must be implemented');
  }
}

class ProductService extends IProductService {
  constructor() {
    super();
    this.productRepository = new ProductRepository();
  }

  async getAllProducts() {
    try {
      const products = await this.productRepository.findAll();
      return Response.success(products, ['Products retrieved successfully']);
    } catch (error) {
      console.error('[ProductService.getAllProducts] Error:', error);
      return Response.fail('Failed to retrieve products', [error.message], 500);
    }
  }

  async getProductById(id) {
    try {
      const product = await this.productRepository.findById(id);

      if (!product) {
        return Response.fail('Product not found', [], 404);
      }

      return Response.success(product, ['Product retrieved successfully']);
    } catch (error) {
      console.error('[ProductService.getProductById] Error:', error);
      return Response.fail('Failed to retrieve product', [error.message], 500);
    }
  }

  async getProductsByCategory(category) {
    try {
      const products = await this.productRepository.findByCategory(category);
      return Response.success(products, ['Products retrieved successfully']);
    } catch (error) {
      console.error('[ProductService.getProductsByCategory] Error:', error);
      return Response.fail('Failed to retrieve products', [error.message], 500);
    }
  }

  async createProduct(productData) {
    try {
      const newProduct = await this.productRepository.create(productData);
      return Response.success(newProduct, ['Product created successfully']);
    } catch (error) {
      console.error('[ProductService.createProduct] Error:', error);
      return Response.fail('Failed to create product', [error.message], 500);
    }
  }

  async updateProduct(id, productData) {
    try {
      const updatedProduct = await this.productRepository.update(id, productData);

      if (!updatedProduct) {
        return Response.fail('Product not found', [], 404);
      }

      return Response.success(updatedProduct, ['Product updated successfully']);
    } catch (error) {
      console.error('[ProductService.updateProduct] Error:', error);
      return Response.fail('Failed to update product', [error.message], 500);
    }
  }

  async deleteProduct(id) {
    try {
      const deleted = await this.productRepository.delete(id);

      if (!deleted) {
        return Response.fail('Product not found', [], 404);
      }

      return Response.success('Product deleted successfully', ['Product deleted successfully']);
    } catch (error) {
      console.error('[ProductService.deleteProduct] Error:', error);
      return Response.fail('Failed to delete product', [error.message], 500);
    }
  }
}

module.exports = { IProductService, ProductService };
