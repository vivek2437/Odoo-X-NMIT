# 🌱 EcoFinds Backend API

The backend API for EcoFinds - a Node.js/Express server providing RESTful endpoints for the sustainable marketplace application.

## 🏗️ Architecture Overview

This is a RESTful API built with Node.js and Express.js that provides:
- **Authentication & Authorization** with JWT
- **Product Management** CRUD operations
- **Shopping Cart** functionality
- **Purchase/Order** processing
- **User Management** and profiles
- **File Upload** support
- **Input Validation** with express-validator

## 📁 Backend File Structure

```
backend/
├── middleware/              # Custom middleware functions
│   └── auth.js             # JWT authentication middleware
│
├── models/                 # Data models (currently empty - using in-memory store)
│
├── routes/                 # API route handlers
│   ├── auth.js            # Authentication routes (/api/auth/*)
│   ├── cart.js            # Shopping cart routes (/api/cart/*)
│   ├── products.js        # Product management (/api/products/*)
│   ├── purchases.js       # Purchase/order routes (/api/purchases/*)
│   └── users.js           # User management (/api/users/*)
│
├── uploads/               # File upload storage directory
│   └── placeholder.txt    # Placeholder file
│
├── utils/                 # Utility functions and helpers
│   ├── dataStore.js       # In-memory data store
│   └── sampleData.js      # Sample data for development
│
├── node_modules/          # Dependencies
├── package.json           # Dependencies and scripts
├── package-lock.json      # Dependency lock file
└── server.js              # Main server entry point
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** or **yarn**

### Installation

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   or
   ```bash
   npm start
   ```

The server will start on `http://localhost:5000`

## 📦 Dependencies

### Core Dependencies
- **express** (^4.18.2) - Web framework
- **cors** (^2.8.5) - Cross-origin resource sharing
- **body-parser** (^1.20.2) - Request body parsing
- **bcryptjs** (^2.4.3) - Password hashing
- **jsonwebtoken** (^9.0.2) - JWT token generation/verification
- **express-validator** (^7.0.1) - Input validation
- **multer** (^1.4.5-lts.1) - File upload handling
- **uuid** (^9.0.1) - Unique ID generation

### Development Dependencies
- **nodemon** (^3.0.1) - Development server with auto-reload

## 🛠️ API Endpoints

### 🔐 Authentication (`/api/auth`)
```http
POST /api/auth/register    # Register new user
POST /api/auth/login       # User login
GET  /api/auth/me         # Get current user info (protected)
POST /api/auth/logout     # User logout (protected)
```

### 👤 Users (`/api/users`)
```http
GET  /api/users/profile          # Get user profile (protected)
PUT  /api/users/profile          # Update user profile (protected)
GET  /api/users/listings         # Get user's product listings (protected)
```

### 🛍️ Products (`/api/products`)
```http
GET    /api/products             # Get all products (with filters)
GET    /api/products/:id         # Get single product
POST   /api/products             # Create new product (protected)
PUT    /api/products/:id         # Update product (protected)
DELETE /api/products/:id         # Delete product (protected)
GET    /api/products/meta/categories  # Get product categories
```

### 🛒 Shopping Cart (`/api/cart`)
```http
GET    /api/cart                 # Get user's cart (protected)
POST   /api/cart/add/:productId  # Add item to cart (protected)
PUT    /api/cart/update/:productId # Update cart item quantity (protected)
DELETE /api/cart/remove/:productId # Remove item from cart (protected)
DELETE /api/cart/clear           # Clear entire cart (protected)
```

### 🛍️ Purchases/Orders (`/api/purchases`)
```http
GET  /api/purchases              # Get user's purchase history (protected)
GET  /api/purchases/:id          # Get specific purchase (protected)
POST /api/purchases/checkout     # Process cart checkout (protected)
```

## 🔒 Authentication & Security

### JWT Authentication
- **Access tokens** are used for API authentication
- Tokens are passed in the `Authorization` header as `Bearer <token>`
- Protected routes require valid JWT tokens
- Tokens expire after 24 hours

### Password Security
- Passwords are hashed using **bcryptjs**
- Minimum password requirements enforced
- Salt rounds: 10

### Input Validation
- All inputs are validated using **express-validator**
- Sanitization applied to prevent XSS
- Comprehensive error messages returned

## 📊 Data Storage

Currently using **in-memory data storage** for development:
- **User data** - stored in memory
- **Products** - sample data + user-created products
- **Shopping carts** - user-specific carts
- **Purchase history** - completed orders

### Sample Data Includes:
- **50+ sample products** across various eco-friendly categories
- **Categories**: Electronics, Home & Garden, Fashion, Health & Beauty, etc.
- **Product fields**: title, description, price, category, condition, seller info

## 🔧 Configuration

### Environment Variables
```bash
PORT=5000                    # Server port (default: 5000)
NODE_ENV=development         # Environment mode
JWT_SECRET=your-secret-key   # JWT signing secret
```

### CORS Configuration
- Configured to accept requests from `http://localhost:3000` (React frontend)
- Credentials enabled for authenticated requests

## 🚦 API Response Format

### Success Response
```json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE"
  },
  "statusCode": 400
}
```

## 📝 API Examples

### User Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

### Get Products
```bash
curl -X GET "http://localhost:5000/api/products?category=electronics&search=phone"
```

### Add to Cart (Authenticated)
```bash
curl -X POST http://localhost:5000/api/cart/add/product-id-here \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Process Checkout (Authenticated)
```bash
curl -X POST http://localhost:5000/api/purchases/checkout \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🧪 Testing

### Manual Testing
- Use **Postman** or **curl** for API testing
- Import the API collection for comprehensive testing
- Test both authenticated and public endpoints

### Test User Account
For development, you can create a test user:
```json
{
  "email": "test@ecofinds.com",
  "password": "testpassword123"
}
```

## 🔄 Development Workflow

1. **Start the server**
   ```bash
   npm run dev
   ```

2. **Make changes** to code
   - Server automatically restarts with **nodemon**

3. **Test endpoints** using Postman or frontend

4. **Check logs** in the console for debugging

## 📈 Performance & Scalability

### Current Implementation
- **In-memory storage** for development
- **Synchronous operations** for simplicity
- **No database persistence** (data resets on restart)

### Production Recommendations
- **Database integration** (MongoDB, PostgreSQL)
- **Redis** for session/cart storage
- **Rate limiting** for API protection
- **Logging** middleware (Morgan, Winston)
- **Error tracking** (Sentry)
- **API documentation** (Swagger/OpenAPI)

## 🔮 Future Enhancements

- [ ] **Database Integration** (MongoDB/PostgreSQL)
- [ ] **Redis** for caching and sessions
- [ ] **File upload** to cloud storage (AWS S3, Cloudinary)
- [ ] **Email notifications** for orders
- [ ] **Payment processing** integration (Stripe, PayPal)
- [ ] **Real-time features** with Socket.io
- [ ] **API rate limiting** and throttling
- [ ] **Comprehensive logging** and monitoring
- [ ] **Unit and integration tests**
- [ ] **API documentation** with Swagger
- [ ] **Docker** containerization
- [ ] **CI/CD** pipeline setup

## 📚 API Documentation

### Product Object Structure
```json
{
  "id": "unique-id",
  "title": "Product Name",
  "description": "Product description",
  "price": 29.99,
  "category": "Electronics",
  "condition": "New",
  "sellerId": "user-id",
  "seller": {
    "username": "seller-name",
    "firstName": "First",
    "lastName": "Last"
  },
  "createdAt": "2023-01-01T00:00:00.000Z"
}
```

### User Object Structure
```json
{
  "id": "unique-id",
  "username": "johndoe",
  "email": "john@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "address": "123 Main St, City, Country",
  "createdAt": "2023-01-01T00:00:00.000Z"
}
```

### Cart Object Structure
```json
{
  "cartItems": [
    {
      "id": "cart-item-id",
      "productId": "product-id",
      "quantity": 2,
      "product": {
        // Full product object
      }
    }
  ],
  "total": 59.98,
  "itemCount": 2
}
```

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   Error: listen EADDRINUSE :::5000
   ```
   **Solution**: Change port in environment or kill process using port 5000

2. **JWT token invalid**
   ```json
   { "error": "Invalid token" }
   ```
   **Solution**: Check token format and expiration

3. **CORS errors**
   ```
   Access to fetch blocked by CORS policy
   ```
   **Solution**: Ensure frontend URL is allowed in CORS config

## 📞 Support

For backend-specific issues:
1. Check server console logs
2. Verify API endpoint URLs
3. Test with Postman first
4. Check authentication token validity

## 📄 License

This project is licensed under the MIT License.

---

**Built with 💚 for a sustainable future**
