const express = require('express');
const dataStore = require('../utils/dataStore');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Get user's cart
router.get('/', authenticateToken, (req, res) => {
  try {
    const userId = req.user.id;
    const cartItems = dataStore.getCart(userId);
    
    // Enrich cart items with product details
    const enrichedCartItems = cartItems.map(item => {
      const product = dataStore.getProductById(item.productId);
      return {
        ...item,
        product: product || null
      };
    }).filter(item => item.product !== null); // Remove items with deleted products

    const total = enrichedCartItems.reduce((sum, item) => 
      sum + (item.product.price * item.quantity), 0
    );

    res.json({
      cartItems: enrichedCartItems,
      total: parseFloat(total.toFixed(2)),
      itemCount: enrichedCartItems.reduce((sum, item) => sum + item.quantity, 0)
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add item to cart
router.post('/add/:productId', authenticateToken, (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;

    // Check if product exists
    const product = dataStore.getProductById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if product is available
    if (product.status !== 'available') {
      return res.status(400).json({ message: 'Product is not available' });
    }

    // Check if user is trying to add their own product
    if (product.sellerId === userId) {
      return res.status(400).json({ message: 'You cannot add your own product to cart' });
    }

    const updatedCart = dataStore.addToCart(userId, productId);
    
    res.json({
      message: 'Item added to cart successfully',
      cart: updatedCart
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Remove item from cart
router.delete('/remove/:productId', authenticateToken, (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;

    const updatedCart = dataStore.removeFromCart(userId, productId);
    
    res.json({
      message: 'Item removed from cart successfully',
      cart: updatedCart
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update item quantity in cart
router.put('/update/:productId', authenticateToken, (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: 'Quantity must be at least 1' });
    }

    const cart = dataStore.getCart(userId);
    const itemIndex = cart.findIndex(item => item.productId === productId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    cart[itemIndex].quantity = parseInt(quantity);
    dataStore.carts.set(userId, cart);

    res.json({
      message: 'Cart updated successfully',
      cart: cart
    });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Clear entire cart
router.delete('/clear', authenticateToken, (req, res) => {
  try {
    const userId = req.user.id;
    dataStore.clearCart(userId);
    
    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
