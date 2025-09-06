import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { cartAPI } from '../utils/api';

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    title: string;
    price: number;
    category: string;
  };
}

interface CartData {
  cartItems: CartItem[];
  total: number;
  itemCount: number;
}

interface CartContextType {
  cartData: CartData | null;
  loading: boolean;
  refreshCart: () => Promise<void>;
  addToCart: (productId: string) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateCartItem: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshCart = async () => {
    try {
      const response = await cartAPI.getCart();
      setCartData(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: string) => {
    try {
      await cartAPI.addToCart(productId);
      await refreshCart();
    } catch (error: any) {
      throw error;
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      await cartAPI.removeFromCart(productId);
      await refreshCart();
    } catch (error: any) {
      throw error;
    }
  };

  const updateCartItem = async (productId: string, quantity: number) => {
    try {
      await cartAPI.updateCartItem(productId, quantity);
      await refreshCart();
    } catch (error: any) {
      throw error;
    }
  };

  const clearCart = () => {
    setCartData({
      cartItems: [],
      total: 0,
      itemCount: 0
    });
  };

  useEffect(() => {
    refreshCart();
  }, []);

  const value: CartContextType = {
    cartData,
    loading,
    refreshCart,
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
