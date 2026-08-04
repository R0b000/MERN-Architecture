const { Router } = require('express');
const { ProductService } = require('../services/ProductService');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = Router();
const productService = new ProductService();

router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const response = category
      ? await productService.getProductsByCategory(category)
      : await productService.getAllProducts();
    res.status(response.statusCode || 200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      messages: ['Failed to retrieve products'],
      errors: [error.message],
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const response = await productService.getProductById(req.params.id);
    res.status(response.statusCode || 200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      messages: ['Failed to retrieve product'],
      errors: [error.message],
    });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const response = await productService.createProduct(req.body);
    res.status(response.statusCode || 201).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      messages: ['Failed to create product'],
      errors: [error.message],
    });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const response = await productService.updateProduct(req.params.id, req.body);
    res.status(response.statusCode || 200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      messages: ['Failed to update product'],
      errors: [error.message],
    });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const response = await productService.deleteProduct(req.params.id);
    res.status(response.statusCode || 200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      messages: ['Failed to delete product'],
      errors: [error.message],
    });
  }
});

module.exports = router;
