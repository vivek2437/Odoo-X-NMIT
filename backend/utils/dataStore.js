const { v4: uuidv4 } = require('uuid');

// In-memory data store for the prototype
// In a real application, this would be replaced with a database
class DataStore {
  constructor() {
    this.users = [];
    this.products = [];
    this.carts = new Map(); // userId -> cart items
    this.purchases = new Map(); // userId -> purchase history
    this.sessions = new Map(); // token -> userId
  }

  // User methods
  createUser(userData) {
    const user = {
      id: uuidv4(),
      email: userData.email,
      password: userData.password, // In real app, this would be hashed
      username: userData.username,
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      phone: userData.phone || '',
      address: userData.address || '',
      createdAt: new Date().toISOString()
    };
    this.users.push(user);
    return user;
  }

  findUserByEmail(email) {
    return this.users.find(user => user.email === email);
  }

  findUserById(id) {
    return this.users.find(user => user.id === id);
  }

  updateUser(id, updates) {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
      this.users[userIndex] = { ...this.users[userIndex], ...updates };
      return this.users[userIndex];
    }
    return null;
  }

  // Product methods
  createProduct(productData) {
    const product = {
      id: uuidv4(),
      ...productData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.products.push(product);
    return product;
  }

  getAllProducts() {
    return this.products;
  }

  getProductById(id) {
    return this.products.find(product => product.id === id);
  }

  getProductsByUserId(userId) {
    return this.products.filter(product => product.sellerId === userId);
  }

  updateProduct(id, updates) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex !== -1) {
      this.products[productIndex] = { 
        ...this.products[productIndex], 
        ...updates,
        updatedAt: new Date().toISOString()
      };
      return this.products[productIndex];
    }
    return null;
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex !== -1) {
      const deletedProduct = this.products.splice(productIndex, 1)[0];
      return deletedProduct;
    }
    return null;
  }

  // Cart methods
  getCart(userId) {
    return this.carts.get(userId) || [];
  }

  addToCart(userId, productId) {
    const cart = this.getCart(userId);
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: uuidv4(),
        productId,
        quantity: 1,
        addedAt: new Date().toISOString()
      });
    }
    
    this.carts.set(userId, cart);
    return cart;
  }

  removeFromCart(userId, productId) {
    const cart = this.getCart(userId);
    const filteredCart = cart.filter(item => item.productId !== productId);
    this.carts.set(userId, filteredCart);
    return filteredCart;
  }

  clearCart(userId) {
    this.carts.set(userId, []);
    return [];
  }

  // Purchase methods
  createPurchase(userId, items) {
    const purchase = {
      id: uuidv4(),
      userId,
      items,
      total: items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      purchaseDate: new Date().toISOString()
    };

    const userPurchases = this.purchases.get(userId) || [];
    userPurchases.push(purchase);
    this.purchases.set(userId, userPurchases);
    
    return purchase;
  }

  getUserPurchases(userId) {
    return this.purchases.get(userId) || [];
  }

  // Session methods
  createSession(userId) {
    const token = uuidv4();
    this.sessions.set(token, userId);
    return token;
  }

  getSessionUser(token) {
    const userId = this.sessions.get(token);
    return userId ? this.findUserById(userId) : null;
  }

  deleteSession(token) {
    return this.sessions.delete(token);
  }

  // Search methods
  searchProducts(query) {
    const lowercaseQuery = query.toLowerCase();
    return this.products.filter(product => 
      product.title.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery)
    );
  }

  filterProductsByCategory(category) {
    return this.products.filter(product => product.category === category);
  }
}

// Export singleton instance
module.exports = new DataStore();
