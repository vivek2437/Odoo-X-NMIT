import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import styled from 'styled-components';

const ReceiptContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const ReceiptPaper = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 30px;
    height: 20px;
    background: white;
    border: 1px solid #e0e0e0;
    border-bottom: none;
    border-radius: 4px 4px 0 0;
  }
`;

const ReceiptHeader = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
  border-bottom: 2px dashed #ccc;
  padding-bottom: 2rem;
`;

const CompanyLogo = styled.div`
  font-size: 2.5rem;
  color: #4CAF50;
  margin-bottom: 0.5rem;
`;

const CompanyName = styled.h1`
  color: #2E7D32;
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
`;

const CompanyInfo = styled.div`
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
`;

const SuccessMessage = styled.div`
  background: linear-gradient(135deg, #E8F5E8 0%, #C8E6C9 100%);
  color: #2E7D32;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  margin-bottom: 2rem;
  border: 2px solid #4CAF50;
`;

const SuccessIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const SuccessTitle = styled.h2`
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
`;

const SuccessDescription = styled.p`
  margin: 0;
  font-size: 1rem;
  opacity: 0.8;
`;

const OrderDetails = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  padding: 0.25rem 0;
  
  &.highlight {
    font-weight: bold;
    color: #2E7D32;
    border-top: 1px solid #ddd;
    padding-top: 0.75rem;
    margin-top: 0.75rem;
  }
`;

const DetailLabel = styled.span`
  color: #666;
`;

const DetailValue = styled.span`
  color: #333;
  font-weight: 500;
`;

const ItemsList = styled.div`
  margin-bottom: 2rem;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemTitle = styled.div`
  font-weight: 500;
  color: #333;
  margin-bottom: 0.25rem;
`;

const ItemMeta = styled.div`
  font-size: 0.9rem;
  color: #666;
`;

const ItemPrice = styled.div`
  font-weight: bold;
  color: #4CAF50;
  text-align: right;
`;

const PaymentInfo = styled.div`
  background: #f8f8f8;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const BillingInfo = styled.div`
  background: #f8f8f8;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const InfoSection = styled.div``;

const TotalSection = styled.div`
  border-top: 2px solid #ddd;
  padding-top: 1rem;
  margin-top: 1rem;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
  
  &.final-total {
    font-size: 1.3rem;
    font-weight: bold;
    color: #2E7D32;
    border-top: 2px solid #4CAF50;
    padding-top: 1rem;
    margin-top: 1rem;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ActionButton = styled.button<{ primary?: boolean }>`
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  border: 2px solid ${props => props.primary ? '#4CAF50' : '#ddd'};
  background: ${props => props.primary ? '#4CAF50' : 'white'};
  color: ${props => props.primary ? 'white' : '#333'};
  
  &:hover {
    background: ${props => props.primary ? '#45a049' : '#f5f5f5'};
    transform: translateY(-1px);
  }
`;

const PrintButton = styled(ActionButton)`
  @media print {
    display: none;
  }
`;

const FooterNote = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 2px dashed #ccc;
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const ThankYouMessage = styled.div`
  text-align: center;
  margin: 2rem 0;
  padding: 1rem;
  background: linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%);
  border-radius: 8px;
  color: #E65100;
  font-size: 1.1rem;
  font-weight: 500;
`;

interface OrderData {
  items: any[];
  total: number;
  billingDetails: any;
  paymentMethod: string;
  paymentDetails: any;
}

const Receipt: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  
  const { orderData, purchaseId } = location.state || {};

  useEffect(() => {
    // Clear the cart after successful purchase
    if (orderData) {
      clearCart();
    }
  }, [orderData, clearCart]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    // In a real app, you'd implement PDF generation here
    alert('PDF download functionality would be implemented here');
  };

  const formatPaymentMethod = (method: string) => {
    switch (method) {
      case 'credit-card':
        return 'Credit Card';
      case 'debit-card':
        return 'Debit Card';
      case 'cash-on-delivery':
        return 'Cash on Delivery';
      default:
        return method;
    }
  };

  const calculateTax = (subtotal: number) => {
    return subtotal * 0.08; // 8% tax
  };

  const calculateShipping = (subtotal: number) => {
    return subtotal > 100 ? 0 : 9.99; // Free shipping over $100
  };

  if (!orderData) {
    return (
      <ReceiptContainer>
        <ReceiptPaper>
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <h2>No order data found</h2>
            <p>Please make a purchase to view your receipt.</p>
            <ActionButton primary onClick={() => navigate('/marketplace')}>
              Continue Shopping
            </ActionButton>
          </div>
        </ReceiptPaper>
      </ReceiptContainer>
    );
  }

  const subtotal = orderData.items.reduce((sum: number, item: any) => 
    sum + (item.product.price * item.quantity), 0
  );
  const tax = calculateTax(subtotal);
  const shipping = calculateShipping(subtotal);
  const total = subtotal + tax + shipping;

  return (
    <ReceiptContainer>
      <ReceiptPaper>
        <ReceiptHeader>
          <CompanyLogo>🌱</CompanyLogo>
          <CompanyName>EcoFinds</CompanyName>
          <CompanyInfo>
            Sustainable Products for a Better Tomorrow<br />
            www.ecofinds.com | support@ecofinds.com<br />
            Phone: (555) 123-4567
          </CompanyInfo>
        </ReceiptHeader>

        <SuccessMessage>
          <SuccessIcon>✅</SuccessIcon>
          <SuccessTitle>Order Confirmed!</SuccessTitle>
          <SuccessDescription>
            Your order has been successfully processed and confirmed.
          </SuccessDescription>
        </SuccessMessage>

        <OrderDetails>
          <SectionTitle>📋 Order Information</SectionTitle>
          <DetailRow>
            <DetailLabel>Order ID:</DetailLabel>
            <DetailValue>#{purchaseId || 'ECO-' + Date.now()}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Order Date:</DetailLabel>
            <DetailValue>{new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Payment Method:</DetailLabel>
            <DetailValue>{formatPaymentMethod(orderData.paymentMethod)}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Order Status:</DetailLabel>
            <DetailValue style={{ color: '#4CAF50' }}>✅ Confirmed</DetailValue>
          </DetailRow>
        </OrderDetails>

        <ItemsList>
          <SectionTitle>🛍️ Order Items</SectionTitle>
          {orderData.items.map((item: any, index: number) => (
            <OrderItem key={index}>
              <ItemInfo>
                <ItemTitle>{item.product.title}</ItemTitle>
                <ItemMeta>
                  Category: {item.product.category} • Quantity: {item.quantity}
                </ItemMeta>
              </ItemInfo>
              <ItemPrice>
                ${(item.product.price * item.quantity).toFixed(2)}
              </ItemPrice>
            </OrderItem>
          ))}

          <TotalSection>
            <TotalRow>
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </TotalRow>
            <TotalRow>
              <span>Tax (8%):</span>
              <span>${tax.toFixed(2)}</span>
            </TotalRow>
            <TotalRow>
              <span>Shipping:</span>
              <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
            </TotalRow>
            <TotalRow className="final-total">
              <span>Total Paid:</span>
              <span>${total.toFixed(2)}</span>
            </TotalRow>
          </TotalSection>
        </ItemsList>

        <InfoGrid>
          <InfoSection>
            <BillingInfo>
              <SectionTitle>📮 Billing Address</SectionTitle>
              <div>
                <strong>{orderData.billingDetails.firstName} {orderData.billingDetails.lastName}</strong><br />
                {orderData.billingDetails.address}<br />
                {orderData.billingDetails.city}, {orderData.billingDetails.state} {orderData.billingDetails.zipCode}<br />
                {orderData.billingDetails.country}
              </div>
              <div style={{ marginTop: '1rem' }}>
                <strong>Contact:</strong><br />
                📧 {orderData.billingDetails.email}<br />
                📞 {orderData.billingDetails.phone}
              </div>
            </BillingInfo>
          </InfoSection>

          <InfoSection>
            <PaymentInfo>
              <SectionTitle>💳 Payment Details</SectionTitle>
              {orderData.paymentMethod === 'cash-on-delivery' ? (
                <div>
                  <DetailRow>
                    <DetailLabel>Method:</DetailLabel>
                    <DetailValue>Cash on Delivery</DetailValue>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>Contact:</DetailLabel>
                    <DetailValue>{orderData.paymentDetails.phone}</DetailValue>
                  </DetailRow>
                  <div style={{ marginTop: '1rem' }}>
                    <DetailLabel>Delivery Address:</DetailLabel><br />
                    <DetailValue style={{ fontSize: '0.9rem' }}>
                      {orderData.paymentDetails.address}
                    </DetailValue>
                  </div>
                  {orderData.paymentDetails.instructions && (
                    <div style={{ marginTop: '1rem' }}>
                      <DetailLabel>Instructions:</DetailLabel><br />
                      <DetailValue style={{ fontSize: '0.9rem', fontStyle: 'italic' }}>
                        {orderData.paymentDetails.instructions}
                      </DetailValue>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <DetailRow>
                    <DetailLabel>Method:</DetailLabel>
                    <DetailValue>{formatPaymentMethod(orderData.paymentMethod)}</DetailValue>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>Card:</DetailLabel>
                    <DetailValue>****{orderData.paymentDetails.lastFour}</DetailValue>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>Cardholder:</DetailLabel>
                    <DetailValue>{orderData.paymentDetails.cardName}</DetailValue>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>Transaction:</DetailLabel>
                    <DetailValue style={{ color: '#4CAF50' }}>✅ Approved</DetailValue>
                  </DetailRow>
                </div>
              )}
            </PaymentInfo>
          </InfoSection>
        </InfoGrid>

        <ThankYouMessage>
          🎉 Thank you for choosing EcoFinds! Your order will be processed within 1-2 business days.
        </ThankYouMessage>

        <ActionButtons>
          <PrintButton onClick={handlePrint}>
            🖨️ Print Receipt
          </PrintButton>
          <ActionButton onClick={handleDownloadPDF}>
            📄 Download PDF
          </ActionButton>
          <ActionButton primary onClick={() => navigate('/marketplace')}>
            🛍️ Continue Shopping
          </ActionButton>
        </ActionButtons>

        <FooterNote>
          For questions about your order, please contact our customer service at support@ecofinds.com or call (555) 123-4567.<br />
          <strong>Returns & Exchanges:</strong> Items can be returned within 30 days of delivery.<br />
          <strong>Estimated Delivery:</strong> 3-7 business days for standard shipping.
        </FooterNote>
      </ReceiptPaper>
    </ReceiptContainer>
  );
};

export default Receipt;
