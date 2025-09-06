import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userAPI, productsAPI } from '../utils/api';
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

const AddButton = styled(Link)`
  display: inline-block;
  background: #4CAF50;
  color: white;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  transition: background-color 0.3s;
  
  &:hover {
    background: #45a049;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const ProductImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, #E8F5E8 0%, #C8E6C9 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
`;

const ProductActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;
  
  &.edit {
    background: #2196F3;
    color: white;
    
    &:hover {
      background: #1976D2;
    }
  }
  
  &.delete {
    background: #f44336;
    color: white;
    
    &:hover {
      background: #d32f2f;
    }
  }
`;

const MyListings: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserListings();
  }, []);

  const fetchUserListings = async () => {
    try {
      const response = await userAPI.getUserListings();
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching user listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productsAPI.deleteProduct(productId);
        setProducts(products.filter(p => p.id !== productId));
      } catch (error: any) {
        alert(error.response?.data?.message || 'Failed to delete product');
      }
    }
  };

  if (loading) return <Container>Loading...</Container>;

  return (
    <Container>
      <Title>My Listings</Title>
      
      <AddButton to="/add-product">+ Add New Product</AddButton>
      
      {products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <h3>No products listed yet</h3>
          <p>Start by adding your first product!</p>
        </div>
      ) : (
        <ProductsGrid>
          {products.map(product => (
            <ProductCard key={product.id}>
              <ProductImage>📦</ProductImage>
              <ProductInfo>
                <h3>{product.title}</h3>
                <p style={{ fontSize: '1.5rem', color: '#4CAF50', fontWeight: 'bold' }}>
                  ${product.price.toFixed(2)}
                </p>
                <p style={{ color: '#666' }}>{product.category}</p>
                <p style={{ color: '#666', marginTop: '0.5rem' }}>
                  {product.description.substring(0, 100)}...
                </p>
                
                <ProductActions>
                  <ActionButton className="edit">Edit</ActionButton>
                  <ActionButton 
                    className="delete" 
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </ActionButton>
                </ProductActions>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductsGrid>
      )}
    </Container>
  );
};

export default MyListings;
