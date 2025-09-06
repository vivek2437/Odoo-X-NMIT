import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  color: #2E7D32;
  margin-bottom: 2rem;
`;

const CartGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CartItems = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const CartSummary = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  height: fit-content;
`;

const CartItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemImage = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #E8F5E8 0%, #C8E6C9 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CheckoutButton = styled.button`
  width: 100%;
  background: #4CAF50;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover:not(:disabled) {
    background: #45a049;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const RemoveButton = styled.button`
  background: #f44336;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s;
  
  &:hover {
    background: #d32f2f;
  }
`;

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cartData, loading, removeFromCart } = useCart();

  const handleRemoveFromCart = async (productId: string) => {
    try {
      await removeFromCart(productId);
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to remove from cart');
    }
  };

  const handleCheckout = () => {
    // Navigate to checkout page instead of direct purchase
    navigate('/checkout');
  };

  if (loading) return <Container>Loading...</Container>;

  return (
    <Container>
      <Title>Shopping Cart</Title>
      
      {!cartData || cartData.cartItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <h3>Your cart is empty</h3>
          <p>Add some products to get started!</p>
        </div>
      ) : (
        <CartGrid>
          <CartItems>
            <h3>Items in Cart ({cartData.itemCount})</h3>
            {cartData.cartItems.map((item: any) => (
              <CartItem key={item.id}>
                <ItemImage>📦</ItemImage>
                <ItemInfo>
                  <h4>{item.product.title}</h4>
                  <p style={{ color: '#666' }}>{item.product.category}</p>
                  <p style={{ color: '#4CAF50', fontWeight: 'bold' }}>
                    ${item.product.price.toFixed(2)} x {item.quantity}
                  </p>
                </ItemInfo>
                <ItemActions>
                  <RemoveButton onClick={() => handleRemoveFromCart(item.productId)}>
                    Remove
                  </RemoveButton>
                </ItemActions>
              </CartItem>
            ))}
          </CartItems>
          
          <CartSummary>
            <h3>Order Summary</h3>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0.5rem 0' }}>
                <span>Items ({cartData.itemCount}):</span>
                <span>${cartData.total.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0.5rem 0', fontWeight: 'bold', fontSize: '1.2rem' }}>
                <span>Total:</span>
                <span>${cartData.total.toFixed(2)}</span>
              </div>
            </div>
            
            <CheckoutButton onClick={handleCheckout}>
              Proceed to Checkout
            </CheckoutButton>
          </CartSummary>
        </CartGrid>
      )}
    </Container>
  );
};

export default Cart;
