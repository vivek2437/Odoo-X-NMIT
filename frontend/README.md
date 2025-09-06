# 🌱 EcoFinds - Sustainable Marketplace

EcoFinds is a React-based e-commerce platform focused on sustainable and eco-friendly products. The application provides a complete marketplace experience with features like product browsing, cart management, checkout process, and user authentication.

## ✨ Features

### 🔐 User Authentication
- User registration and login
- JWT-based authentication
- Protected routes
- User profile management

### 🛍️ Product Management
- Product listing and browsing
- Category-based filtering
- Search functionality
- Product details page
- Add/Edit/Delete products (for authenticated users)

### 🛒 Shopping Experience
- Add products to cart
- Shopping cart management
- Quantity updates and item removal
- **Complete checkout process** with:
  - Billing information collection
  - Multiple payment methods (Credit Card, Debit Card, Cash on Delivery)
  - Payment form validation
  - Order receipt generation

### 📄 Order Management
- Order confirmation and receipt
- Purchase history
- Printable receipts
- Order tracking information

### 🎨 Modern UI/UX
- Responsive design with styled-components
- Clean and intuitive interface
- Loading states and error handling
- Mobile-friendly layout

## 🏗️ Project Structure

```
frontend/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── favicon.ico
│
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ProductCard.tsx
│   │   └── ...
│   │
│   ├── pages/               # Main application pages
│   │   ├── Home.tsx
│   │   ├── Marketplace.tsx   # Product listing page
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Cart.tsx
│   │   ├── Checkout.tsx      # 🆕 Checkout process
│   │   ├── Receipt.tsx       # 🆕 Order confirmation
│   │   ├── ProductDetail.tsx
│   │   ├── Dashboard.tsx
│   │   ├── AddProduct.tsx
│   │   ├── EditProduct.tsx
│   │   ├── MyListings.tsx
│   │   └── PurchaseHistory.tsx
│   │
│   ├── contexts/            # React Context providers
│   │   ├── AuthContext.tsx   # Authentication state
│   │   └── CartContext.tsx   # 🆕 Cart state management
│   │
│   ├── utils/               # Utility functions
│   │   ├── api.ts           # API calls
│   │   └── ...
│   │
│   ├── App.tsx              # Main app component
│   ├── App.css              # Global styles
│   └── index.tsx            # App entry point
│
├── package.json             # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Backend API server running on port 5000

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecofinds-app/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Ensure the backend API is running on `http://localhost:5000`
   - The frontend expects the following API endpoints:
     ```
     POST /api/auth/login
     POST /api/auth/register
     GET  /api/products
     GET  /api/cart
     POST /api/cart/add/:productId
     POST /api/purchases/checkout
     ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📦 Available Scripts

- **`npm start`** - Runs the app in development mode
- **`npm test`** - Launches the test runner
- **`npm run build`** - Builds the app for production
- **`npm run eject`** - Ejects from Create React App (one-way operation)

## 🔧 Technology Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **React Router** - Navigation and routing
- **Styled Components** - CSS-in-JS styling
- **Axios** - HTTP client for API calls

### Development Tools
- **Create React App** - Development environment
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 🛒 Checkout Process

The application includes a comprehensive checkout system:

### 1. Cart Management
- View cart items with quantities and prices
- Update quantities or remove items
- Calculate subtotals and totals

### 2. Checkout Flow
- **Billing Information**: Name, email, phone, address collection
- **Payment Methods**: 
  - Credit Card (with card number, name, expiry, CVV)
  - Debit Card (similar to credit card)
  - Cash on Delivery (with delivery details)
- **Order Summary**: Review items, taxes, shipping
- **Form Validation**: Comprehensive validation for all fields

### 3. Order Confirmation
- **Receipt Generation**: Professional-looking receipt
- **Order Details**: Items, pricing, payment method, billing info
- **Actions**: Print receipt, download PDF, continue shopping
- **Cart Clearing**: Automatic cart cleanup after successful order

## 🎨 Styling

The application uses styled-components for styling with:
- **Theme Colors**: Green eco-friendly color scheme
- **Responsive Design**: Mobile-first approach
- **Component-based Styles**: Isolated styling for each component
- **Animations**: Smooth transitions and hover effects

## 🔒 Authentication

- **JWT Tokens**: Stored in localStorage
- **Protected Routes**: Require authentication
- **Automatic Redirects**: Redirect to login when unauthenticated
- **Token Refresh**: Automatic token validation

## 📱 Responsive Design

The application is fully responsive and works on:
- **Desktop** (1024px+)
- **Tablet** (768px - 1023px)
- **Mobile** (< 768px)

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## 📈 Performance

- **Code Splitting**: Lazy loading of routes
- **Optimized Images**: Proper image sizing and formats
- **Memoization**: React.memo for expensive components
- **Bundle Analysis**: Webpack bundle analyzer

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Deployment Options
- **Netlify**: Connect GitHub repo for automatic deployments
- **Vercel**: Zero-config deployment
- **AWS S3**: Static website hosting
- **GitHub Pages**: Free hosting option

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 API Integration

The frontend integrates with a REST API with the following main endpoints:

```typescript
// Authentication
POST /api/auth/login
POST /api/auth/register
GET  /api/auth/me

// Products
GET  /api/products
GET  /api/products/:id
POST /api/products
PUT  /api/products/:id
DELETE /api/products/:id

// Cart
GET  /api/cart
POST /api/cart/add/:productId
PUT  /api/cart/update/:productId
DELETE /api/cart/remove/:productId
DELETE /api/cart/clear

// Purchases
GET  /api/purchases
GET  /api/purchases/:id
POST /api/purchases/checkout
```

## 🔮 Future Enhancements

- [ ] **Payment Gateway Integration** (Stripe, PayPal)
- [ ] **Real-time Inventory** updates
- [ ] **Product Reviews** and ratings
- [ ] **Wishlist** functionality
- [ ] **Advanced Search** with filters
- [ ] **Push Notifications** for order updates
- [ ] **Dark Mode** theme toggle
- [ ] **Progressive Web App** (PWA) features
- [ ] **Analytics** integration
- [ ] **Multi-language** support

## 📞 Support

If you encounter any issues or have questions:

1. Check the existing issues on GitHub
2. Create a new issue with detailed description
3. Contact the development team

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Styled Components for the styling solution
- Create React App for the development setup
- All contributors and testers

---

**Made with 💚 for a sustainable future**
