const express = require('express');
const { body, validationResult } = require('express-validator');
const dataStore = require('../utils/dataStore');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Predefined categories
const CATEGORIES = [
  'Electronics',
  'Clothing & Accessories',
  'Home & Garden',
  'Books & Media',
  'Sports & Outdoors',
  'Toys & Games',
  'Automotive',
  'Health & Beauty',
  'Other'
];

// Get all products (with optional filtering and search)
router.get('/', (req, res) => {
  try {
    const { category, search, page = 1, limit = 20 } = req.query;
    let products = dataStore.getAllProducts();

    // Filter by category
    if (category && category !== 'all') {
      products = dataStore.filterProductsByCategory(category);
    }

    // Search by keyword
    if (search) {
      products = dataStore.searchProducts(search);
    }

    // Add seller information and remove sensitive data
    const productsWithSellerInfo = products.map(product => {
      const seller = dataStore.findUserById(product.sellerId);
      return {
        ...product,
        seller: seller ? {
          id: seller.id,
          username: seller.username
        } : null
      };
    });

    // Simple pagination
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const endIndex = startIndex + parseInt(limit);
    const paginatedProducts = productsWithSellerInfo.slice(startIndex, endIndex);

    res.json({
      products: paginatedProducts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: productsWithSellerInfo.length,
        totalPages: Math.ceil(productsWithSellerInfo.length / parseInt(limit))
      },
      categories: CATEGORIES
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get single product by ID
router.get('/:id', (req, res) => {
  try {
    const productId = req.params.id;
    const product = dataStore.getProductById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Add seller information
    const seller = dataStore.findUserById(product.sellerId);
    const productWithSellerInfo = {
      ...product,
      seller: seller ? {
        id: seller.id,
        username: seller.username,
        email: seller.email // Include email for contact purposes
      } : null
    };

    res.json({ product: productWithSellerInfo });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create new product
router.post('/', authenticateToken, [
  body('title').isLength({ min: 3, max: 100 }).withMessage('Title must be between 3-100 characters'),
  body('description').isLength({ min: 10, max: 1000 }).withMessage('Description must be between 10-1000 characters'),
  body('price').isFloat({ min: 0.01 }).withMessage('Price must be a positive number'),
  body('category').isIn(CATEGORIES).withMessage('Invalid category selected'),
  body('condition').optional().isIn(['New', 'Like New', 'Good', 'Fair', 'Poor']).withMessage('Invalid condition')
], (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { title, description, price, category, condition = 'Good' } = req.body;
    const sellerId = req.user.id;

    const product = dataStore.createProduct({
      title,
      description,
      price: parseFloat(price),
      category,
      condition,
      sellerId,
      imageUrl: '/uploads/placeholder.jpg', // Placeholder image
      status: 'available' // available, sold, removed
    });

    res.status(201).json({
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update product
router.put('/:id', authenticateToken, [
  body('title').optional().isLength({ min: 3, max: 100 }).withMessage('Title must be between 3-100 characters'),
  body('description').optional().isLength({ min: 10, max: 1000 }).withMessage('Description must be between 10-1000 characters'),
  body('price').optional().isFloat({ min: 0.01 }).withMessage('Price must be a positive number'),
  body('category').optional().isIn(CATEGORIES).withMessage('Invalid category selected'),
  body('condition').optional().isIn(['New', 'Like New', 'Good', 'Fair', 'Poor']).withMessage('Invalid condition')
], (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const productId = req.params.id;
    const userId = req.user.id;
    
    // Check if product exists and belongs to user
    const existingProduct = dataStore.getProductById(productId);
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (existingProduct.sellerId !== userId) {
      return res.status(403).json({ message: 'You can only edit your own products' });
    }

    const { title, description, price, category, condition } = req.body;
    
    const updatedProduct = dataStore.updateProduct(productId, {
      title,
      description,
      price: price ? parseFloat(price) : undefined,
      category,
      condition
    });

    res.json({
      message: 'Product updated successfully',
      product: updatedProduct
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete product
router.delete('/:id', authenticateToken, (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user.id;
    
    // Check if product exists and belongs to user
    const existingProduct = dataStore.getProductById(productId);
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (existingProduct.sellerId !== userId) {
      return res.status(403).json({ message: 'You can only delete your own products' });
    }

    const deletedProduct = dataStore.deleteProduct(productId);
    
    res.json({
      message: 'Product deleted successfully',
      product: deletedProduct
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get categories
router.get('/meta/categories', (req, res) => {
  res.json({ categories: CATEGORIES });
});

module.exports = router;
