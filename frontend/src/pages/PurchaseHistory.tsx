import React, { useState, useEffect } from 'react';
import { purchaseAPI } from '../utils/api';
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

const PurchaseCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const PurchaseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
`;

const PurchaseItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PurchaseItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 8px;
`;

const ItemImage = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #E8F5E8 0%, #C8E6C9 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const PurchaseHistory: React.FC = () => {
  const [purchases, setPurchases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const response = await purchaseAPI.getPurchases();
      setPurchases(response.data.purchases);
    } catch (error) {
      console.error('Error fetching purchases:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Container>Loading...</Container>;

  return (
    <Container>
      <Title>Purchase History</Title>
      
      {purchases.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <h3>No purchases yet</h3>
          <p>Your purchase history will appear here after you make your first purchase.</p>
        </div>
      ) : (
        purchases.map(purchase => (
          <PurchaseCard key={purchase.id}>
            <PurchaseHeader>
              <div>
                <h3>Order #{purchase.id.substring(0, 8)}</h3>
                <p style={{ color: '#666' }}>
                  {new Date(purchase.purchaseDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#4CAF50' }}>
                  ${purchase.total.toFixed(2)}
                </p>
              </div>
            </PurchaseHeader>
            
            <PurchaseItems>
              {purchase.items.map((item: any, index: number) => (
                <PurchaseItem key={index}>
                  <ItemImage>📦</ItemImage>
                  <ItemInfo>
                    <h4>{item.title}</h4>
                    <p style={{ color: '#666' }}>{item.category}</p>
                    <p style={{ color: '#4CAF50', fontWeight: 'bold' }}>
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </ItemInfo>
                </PurchaseItem>
              ))}
            </PurchaseItems>
          </PurchaseCard>
        ))
      )}
    </Container>
  );
};

export default PurchaseHistory;
