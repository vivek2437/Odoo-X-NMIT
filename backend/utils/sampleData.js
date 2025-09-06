const bcrypt = require('bcryptjs');
const dataStore = require('./dataStore');

async function initializeSampleData() {
  try {
    // Create sample users
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const user1 = dataStore.createUser({
      email: 'john@example.com',
      password: hashedPassword,
      username: 'john_eco',
      firstName: 'John',
      lastName: 'Smith',
      phone: '1234567890',
      address: '123 Eco Street, Green City, GC 12345'
    });

    const user2 = dataStore.createUser({
      email: 'sarah@example.com',
      password: hashedPassword,
      username: 'sarah_green',
      firstName: 'Sarah',
      lastName: 'Johnson',
      phone: '0987654321',
      address: '456 Sustainable Ave, Eco Town, ET 67890'
    });

    const user3 = dataStore.createUser({
      email: 'mike@example.com',
      password: hashedPassword,
      username: 'mike_recycle',
      firstName: 'Mike',
      lastName: 'Wilson',
      phone: '5555555555',
      address: '789 Reuse Road, Recycle City, RC 11111'
    });

    // Create sample products
    const sampleProducts = [
      {
        title: 'Vintage Leather Jacket',
        description: 'Classic brown leather jacket in excellent condition. Perfect for autumn weather. Genuine leather with soft lining.',
        price: 89.99,
        category: 'Clothing & Accessories',
        condition: 'Like New',
        sellerId: user1.id,
        imageUrl: '/uploads/placeholder.jpg',
        status: 'available'
      },
      {
        title: 'MacBook Pro 13" 2019',
        description: 'Well-maintained MacBook Pro with 8GB RAM and 256GB SSD. Comes with original charger and box. Great for students or professionals.',
        price: 899.99,
        category: 'Electronics',
        condition: 'Good',
        sellerId: user2.id,
        imageUrl: '/uploads/placeholder.jpg',
        status: 'available'
      },
      {
        title: 'Wooden Coffee Table',
        description: 'Beautiful solid oak coffee table with drawer. Minor scratches but very sturdy. Perfect for living room.',
        price: 150.00,
        category: 'Home & Garden',
        condition: 'Good',
        sellerId: user3.id,
        imageUrl: '/uploads/placeholder.jpg',
        status: 'available'
      },
      {
        title: 'Harry Potter Complete Book Set',
        description: 'All 7 Harry Potter books in paperback. Some wear on covers but pages are in good condition. Great for collectors.',
        price: 45.50,
        category: 'Books & Media',
        condition: 'Fair',
        sellerId: user1.id,
        imageUrl: '/uploads/placeholder.jpg',
        status: 'available'
      },
      {
        title: 'Tennis Racket Wilson Pro',
        description: 'Professional tennis racket, barely used. Comes with protective case. Perfect grip and string tension.',
        price: 120.00,
        category: 'Sports & Outdoors',
        condition: 'Like New',
        sellerId: user2.id,
        imageUrl: '/uploads/placeholder.jpg',
        status: 'available'
      },
      {
        title: 'LEGO Creator Expert Set',
        description: 'Vintage LEGO Creator Expert building set. Complete with all pieces and instruction manual. Hours of fun guaranteed!',
        price: 89.99,
        category: 'Toys & Games',
        condition: 'Good',
        sellerId: user3.id,
        imageUrl: '/uploads/placeholder.jpg',
        status: 'available'
      },
      {
        title: 'Car Floor Mats Set',
        description: 'Universal fit rubber floor mats for cars. Easy to clean and durable. Set of 4 mats.',
        price: 29.99,
        category: 'Automotive',
        condition: 'Good',
        sellerId: user1.id,
        imageUrl: '/uploads/placeholder.jpg',
        status: 'available'
      },
      {
        title: 'Organic Face Cream Set',
        description: 'Unopened set of organic face creams. Day and night cream included. Expired date is still valid.',
        price: 35.00,
        category: 'Health & Beauty',
        condition: 'New',
        sellerId: user2.id,
        imageUrl: '/uploads/placeholder.jpg',
        status: 'available'
      },
      {
        title: 'Vintage Camera Film',
        description: 'Collection of vintage camera equipment including tripod and filters. Great for photography enthusiasts.',
        price: 199.99,
        category: 'Electronics',
        condition: 'Good',
        sellerId: user3.id,
        imageUrl: '/uploads/placeholder.jpg',
        status: 'available'
      },
      {
        title: 'Garden Tool Set',
        description: 'Complete garden tool set including spade, rake, and pruning shears. Well-maintained and ready to use.',
        price: 45.99,
        category: 'Home & Garden',
        condition: 'Good',
        sellerId: user1.id,
        imageUrl: '/uploads/placeholder.jpg',
        status: 'available'
      }
    ];

    sampleProducts.forEach(product => {
      dataStore.createProduct(product);
    });

    console.log('Sample data initialized successfully!');
    console.log(`Created ${dataStore.users.length} users and ${dataStore.products.length} products`);
    console.log('Sample user credentials:');
    console.log('- john@example.com / password123');
    console.log('- sarah@example.com / password123');
    console.log('- mike@example.com / password123');
    
  } catch (error) {
    console.error('Error initializing sample data:', error);
  }
}

module.exports = initializeSampleData;
