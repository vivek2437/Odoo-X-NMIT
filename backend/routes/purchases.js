const express = require('express');
const dataStore = require('../utils/dataStore');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Get user's purchase history
router.get('/', authenticateToken, (req, res) => {
  try {
    const userId = req.user.id;
    const purchases = dataStore.getUserPurchases(userId);
    
    // Enrich purchases with product details
    const enrichedPurchases = purchases.map(purchase => ({
      ...purchase,
      items: purchase.items.map(item => {
        const product = dataStore.getProductById(item.productId);
        return {
          ...item,
          product: product || { title: 'Product no longer available', price: item.price }
        };
      })
    }));

    res.json({ purchases: enrichedPurchases });
  } catch (error) {
    console.error('Get purchases error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Checkout - Convert cart to purchase
router.post('/checkout', authenticateToken, (req, res) => {
  try {
    const userId = req.user.id;
    const cart = dataStore.getCart(userId);

    if (!cart || cart.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Prepare purchase items with current product details
    const purchaseItems = [];
    let total = 0;

    for (const cartItem of cart) {
      const product = dataStore.getProductById(cartItem.productId);
      
      if (!product) {
        return res.status(400).json({ 
          message: `Product ${cartItem.productId} is no longer available` 
        });
      }

      if (product.status !== 'available') {
        return res.status(400).json({ 
          message: `Product "${product.title}" is no longer available` 
        });
      }

      // Check if user is trying to purchase their own product
      if (product.sellerId === userId) {
        return res.status(400).json({ 
          message: `You cannot purchase your own product: "${product.title}"` 
        });
      }

      const purchaseItem = {
        productId: product.id,
        title: product.title,
        price: product.price,
        quantity: cartItem.quantity,
        sellerId: product.sellerId,
        category: product.category
      };

      purchaseItems.push(purchaseItem);
      total += product.price * cartItem.quantity;
    }

    // Create purchase record
    const purchase = dataStore.createPurchase(userId, purchaseItems);

    // Mark products as sold (simple implementation - first come, first served)
    purchaseItems.forEach(item => {
      dataStore.updateProduct(item.productId, { status: 'sold' });
    });

    // Clear user's cart
    dataStore.clearCart(userId);

    res.status(201).json({
      message: 'Purchase completed successfully',
      purchase: {
        ...purchase,
        items: purchaseItems
      }
    });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get single purchase by ID
router.get('/:id', authenticateToken, (req, res) => {
  try {
    const userId = req.user.id;
    const purchaseId = req.params.id;
    
    const userPurchases = dataStore.getUserPurchases(userId);
    const purchase = userPurchases.find(p => p.id === purchaseId);

    if (!purchase) {
      return res.status(404).json({ message: 'Purchase not found' });
    }

    // Enrich purchase with current product details
    const enrichedPurchase = {
      ...purchase,
      items: purchase.items.map(item => {
        const currentProduct = dataStore.getProductById(item.productId);
        return {
          ...item,
          currentProduct: currentProduct || null
        };
      })
    };

    res.json({ purchase: enrichedPurchase });
  } catch (error) {
    console.error('Get purchase error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
