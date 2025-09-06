import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  
  register: (userData: {
    email: string;
    password: string;
    username: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    address?: string;
  }) => api.post('/auth/register', userData),
  
  logout: () => api.post('/auth/logout'),
  
  getCurrentUser: () => api.get('/auth/me'),
};

// User API
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  
  updateProfile: (profileData: {
    username?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    address?: string;
  }) => api.put('/users/profile', profileData),
  
  getUserListings: () => api.get('/users/listings'),
};

// Products API
export const productsAPI = {
  getAllProducts: (params?: {
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) => api.get('/products', { params }),
  
  getProduct: (id: string) => api.get(`/products/${id}`),
  
  createProduct: (productData: {
    title: string;
    description: string;
    price: number;
    category: string;
    condition?: string;
  }) => api.post('/products', productData),
  
  updateProduct: (id: string, productData: {
    title?: string;
    description?: string;
    price?: number;
    category?: string;
    condition?: string;
  }) => api.put(`/products/${id}`, productData),
  
  deleteProduct: (id: string) => api.delete(`/products/${id}`),
  
  getCategories: () => api.get('/products/meta/categories'),
};

// Cart API
export const cartAPI = {
  getCart: () => api.get('/cart'),
  
  addToCart: (productId: string) => api.post(`/cart/add/${productId}`),
  
  removeFromCart: (productId: string) => api.delete(`/cart/remove/${productId}`),
  
  updateCartItem: (productId: string, quantity: number) =>
    api.put(`/cart/update/${productId}`, { quantity }),
  
  clearCart: () => api.delete('/cart/clear'),
};

// Purchase API
export const purchaseAPI = {
  getPurchases: () => api.get('/purchases'),
  
  getPurchase: (id: string) => api.get(`/purchases/${id}`),
  
  checkout: () => api.post('/purchases/checkout'),
};

export default api;
