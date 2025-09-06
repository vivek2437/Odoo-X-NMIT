const express = require('express');
const { body, validationResult } = require('express-validator');
const dataStore = require('../utils/dataStore');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/profile', authenticateToken, (req, res) => {
  try {
    const { password, ...userWithoutPassword } = req.user;
    res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update user profile
router.put('/profile', authenticateToken, [
  body('username').optional().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  body('email').optional().isEmail().withMessage('Please provide a valid email'),
  body('firstName').optional().isLength({ min: 1 }).withMessage('First name cannot be empty'),
  body('lastName').optional().isLength({ min: 1 }).withMessage('Last name cannot be empty'),
  body('phone').optional().isLength({ min: 10 }).withMessage('Phone number must be at least 10 digits'),
  body('address').optional().isLength({ min: 5 }).withMessage('Address must be at least 5 characters long')
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

    const { username, email, firstName, lastName, phone, address } = req.body;
    const userId = req.user.id;

    // Check if email is being updated and already exists
    if (email && email !== req.user.email) {
      const existingUser = dataStore.findUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
    }

    // Update user profile
    const updatedUser = dataStore.updateUser(userId, {
      username,
      email,
      firstName,
      lastName,
      phone,
      address
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { password, ...userWithoutPassword } = updatedUser;
    res.json({ 
      message: 'Profile updated successfully',
      user: userWithoutPassword 
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get user's products (listings)
router.get('/listings', authenticateToken, (req, res) => {
  try {
    const userId = req.user.id;
    const userProducts = dataStore.getProductsByUserId(userId);
    res.json({ products: userProducts });
  } catch (error) {
    console.error('Get user listings error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
