const { Product } = require('../models/Product');

class IProductRepository {
  async findAll() {
    throw new Error('Method "findAll" must be implemented');
  }

  async findById(id) {
    throw new Error('Method "findById" must be implemented');
  }

  async findByCategory(category) {
    throw new Error('Method "findByCategory" must be implemented');
  }

  async create(productData) {
    throw new Error('Method "create" must be implemented');
  }

  async update(id, productData) {
    throw new Error('Method "update" must be implemented');
  }

  async delete(id) {
    throw new Error('Method "delete" must be implemented');
  }
}

class ProductRepository extends IProductRepository {
  async findAll() {
    return await Product.find({ isActive: true });
  }

  async findById(id) {
    return await Product.findById(id);
  }

  async findByCategory(category) {
    return await Product.find({ category, isActive: true });
  }

  async create(productData) {
    const product = new Product(productData);
    return await product.save();
  }

  async update(id, productData) {
    return await Product.findByIdAndUpdate(id, productData, { new: true });
  }

  async delete(id) {
    const result = await Product.findByIdAndDelete(id);
    return result !== null;
  }
}

module.exports = { IProductRepository, ProductRepository };
