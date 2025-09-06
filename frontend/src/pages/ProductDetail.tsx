import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productsAPI, cartAPI } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (productId: string) => {
    try {
      const response = await productsAPI.getProduct(productId);
      setProduct(response.data.product);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!user || !product) return;
    
    try {
      await cartAPI.addToCart(product.id);
      alert('Product added to cart!');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to add to cart');
    }
  };

  if (loading) return <Container>Loading...</Container>;
  if (!product) return <Container>Product not found</Container>;

  return (
    <Container>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
        <div style={{ 
          height: '400px', 
          background: 'linear-gradient(135deg, #E8F5E8 0%, #C8E6C9 100%)', 
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '4rem'
        }}>
          📦
        </div>
        
        <div>
          <h1 style={{ color: '#2E7D32', marginBottom: '1rem' }}>{product.title}</h1>
          <p style={{ fontSize: '2rem', color: '#4CAF50', fontWeight: 'bold', marginBottom: '1rem' }}>
            ${product.price.toFixed(2)}
          </p>
          <p style={{ marginBottom: '1rem' }}>
            <strong>Category:</strong> {product.category}
          </p>
          <p style={{ marginBottom: '1rem' }}>
            <strong>Condition:</strong> {product.condition}
          </p>
          <p style={{ marginBottom: '1rem' }}>
            <strong>Seller:</strong> {product.seller?.username}
          </p>
          <p style={{ marginBottom: '2rem' }}>{product.description}</p>
          
          {user && user.id !== product.sellerId && (
            <button
              onClick={handleAddToCart}
              style={{
                background: '#4CAF50',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '8px',
                fontSize: '1.1rem',
                cursor: 'pointer'
              }}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </Container>
  );
};

export default ProductDetail;
