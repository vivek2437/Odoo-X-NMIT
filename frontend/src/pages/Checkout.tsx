import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cartAPI, purchaseAPI } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';

const CheckoutContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
`;

const CheckoutTitle = styled.h1`
  color: #2E7D32;
  margin-bottom: 2rem;
  text-align: center;
`;

const CheckoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
  border-bottom: 2px solid #E8F5E8;
  padding-bottom: 0.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #333;
  font-weight: 500;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
  }
  
  &.error {
    border-color: #f44336;
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
  }
`;

const PaymentMethodGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PaymentOption = styled.label<{ selected: boolean }>`
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 2px solid ${props => props.selected ? '#4CAF50' : '#ddd'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  background: ${props => props.selected ? '#f0f9f0' : 'white'};
  
  &:hover {
    border-color: #4CAF50;
    background: #f0f9f0;
  }
`;

const PaymentIcon = styled.span`
  font-size: 1.5rem;
  margin-right: 0.75rem;
`;

const PaymentInfo = styled.div`
  flex: 1;
`;

const PaymentTitle = styled.div`
  font-weight: 500;
  color: #333;
`;

const PaymentDescription = styled.div`
  font-size: 0.9rem;
  color: #666;
`;

const CardDetailsSection = styled.div<{ show: boolean }>`
  display: ${props => props.show ? 'block' : 'none'};
  margin-top: 1rem;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 8px;
`;

const OrderSummary = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  height: fit-content;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const OrderItemInfo = styled.div`
  flex: 1;
`;

const OrderItemTitle = styled.div`
  font-weight: 500;
  color: #333;
  margin-bottom: 0.25rem;
`;

const OrderItemMeta = styled.div`
  font-size: 0.9rem;
  color: #666;
`;

const OrderItemPrice = styled.div`
  font-weight: bold;
  color: #4CAF50;
`;

const OrderTotalSection = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px solid #E8F5E8;
`;

const OrderTotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  
  &.total {
    font-size: 1.1rem;
    font-weight: bold;
    color: #2E7D32;
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid #ddd;
  }
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
  margin-top: 1rem;
  
  &:hover:not(:disabled) {
    background: #45a049;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #f44336;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: #ffeaea;
  border-radius: 4px;
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid #ffffff;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s ease-in-out infinite;
  margin-right: 0.5rem;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

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

const Checkout: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  
  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  
  // Billing Details
  const [billingDetails, setBillingDetails] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });
  
  // Payment Details
  const [paymentDetails, setPaymentDetails] = useState({
    // Credit/Debit Card
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    
    // Cash on Delivery
    codPhone: '',
    codAddress: '',
    codInstructions: '',
  });

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await cartAPI.getCart();
      setCartData(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setError('Failed to load cart data');
    } finally {
      setLoading(false);
    }
  };

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBillingDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setPaymentDetails(prev => ({
      ...prev,
      cardNumber: formatted
    }));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    setPaymentDetails(prev => ({
      ...prev,
      expiryDate: value
    }));
  };

  const validateForm = () => {
    const errors: string[] = [];
    
    // Billing validation
    if (!billingDetails.firstName) errors.push('First name is required');
    if (!billingDetails.lastName) errors.push('Last name is required');
    if (!billingDetails.email) errors.push('Email is required');
    if (!billingDetails.phone) errors.push('Phone number is required');
    if (!billingDetails.address) errors.push('Address is required');
    if (!billingDetails.city) errors.push('City is required');
    if (!billingDetails.zipCode) errors.push('ZIP code is required');
    
    // Payment validation
    if (paymentMethod === 'credit-card' || paymentMethod === 'debit-card') {
      if (!paymentDetails.cardNumber || paymentDetails.cardNumber.replace(/\s/g, '').length < 16) {
        errors.push('Valid card number is required');
      }
      if (!paymentDetails.cardName) errors.push('Cardholder name is required');
      if (!paymentDetails.expiryDate || paymentDetails.expiryDate.length < 5) {
        errors.push('Valid expiry date is required');
      }
      if (!paymentDetails.cvv || paymentDetails.cvv.length < 3) {
        errors.push('Valid CVV is required');
      }
    } else if (paymentMethod === 'cash-on-delivery') {
      if (!paymentDetails.codPhone) errors.push('Contact phone is required for COD');
      if (!paymentDetails.codAddress) errors.push('Delivery address is required for COD');
    }
    
    if (errors.length > 0) {
      setError(errors.join(', '));
      return false;
    }
    
    return true;
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cartData || cartData.cartItems.length === 0) {
      setError('Your cart is empty');
      return;
    }
    
    if (!validateForm()) {
      return;
    }

    try {
      setProcessing(true);
      setError('');

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Process the order
      const orderData = {
        items: cartData.cartItems,
        total: cartData.total + calculateTax() + calculateShipping(),
        billingDetails,
        paymentMethod,
        paymentDetails: paymentMethod === 'cash-on-delivery' ? {
          phone: paymentDetails.codPhone,
          address: paymentDetails.codAddress,
          instructions: paymentDetails.codInstructions
        } : {
          cardType: paymentMethod,
          lastFour: paymentDetails.cardNumber.slice(-4),
          cardName: paymentDetails.cardName
        }
      };

      // Complete the purchase
      const response = await purchaseAPI.checkout();
      
      // Navigate to receipt page with order data
      navigate('/receipt', { 
        state: { 
          orderData,
          purchaseId: response.data.purchase.id
        } 
      });

    } catch (error: any) {
      setError(error.response?.data?.message || 'Payment processing failed');
    } finally {
      setProcessing(false);
    }
  };

  const calculateTax = () => {
    return cartData ? cartData.total * 0.08 : 0; // 8% tax
  };

  const calculateShipping = () => {
    return cartData && cartData.total > 100 ? 0 : 9.99; // Free shipping over $100
  };

  const calculateTotal = () => {
    if (!cartData) return 0;
    return cartData.total + calculateTax() + calculateShipping();
  };

  if (loading) {
    return (
      <CheckoutContainer>
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <LoadingSpinner />
          Loading checkout...
        </div>
      </CheckoutContainer>
    );
  }

  if (!cartData || cartData.cartItems.length === 0) {
    return (
      <CheckoutContainer>
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <h2>Your cart is empty</h2>
          <p>Add some items to your cart before checking out.</p>
          <CheckoutButton onClick={() => navigate('/marketplace')}>
            Continue Shopping
          </CheckoutButton>
        </div>
      </CheckoutContainer>
    );
  }

  return (
    <CheckoutContainer>
      <CheckoutTitle>🛒 Checkout</CheckoutTitle>
      
      <CheckoutGrid>
        <div>
          {/* Billing Details Section */}
          <Section>
            <SectionTitle>📋 Billing Details</SectionTitle>
            
            <Form>
              <FormRow>
                <FormGroup>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={billingDetails.firstName}
                    onChange={handleBillingChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={billingDetails.lastName}
                    onChange={handleBillingChange}
                    required
                  />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={billingDetails.email}
                    onChange={handleBillingChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={billingDetails.phone}
                    onChange={handleBillingChange}
                    required
                  />
                </FormGroup>
              </FormRow>

              <FormGroup>
                <Label htmlFor="address">Address *</Label>
                <TextArea
                  id="address"
                  name="address"
                  value={billingDetails.address}
                  onChange={handleBillingChange}
                  required
                />
              </FormGroup>

              <FormRow>
                <FormGroup>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    type="text"
                    id="city"
                    name="city"
                    value={billingDetails.city}
                    onChange={handleBillingChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="state">State</Label>
                  <Input
                    type="text"
                    id="state"
                    name="state"
                    value={billingDetails.state}
                    onChange={handleBillingChange}
                  />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <Label htmlFor="zipCode">ZIP Code *</Label>
                  <Input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={billingDetails.zipCode}
                    onChange={handleBillingChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="country">Country</Label>
                  <Select
                    id="country"
                    name="country"
                    value={billingDetails.country}
                    onChange={handleBillingChange}
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                  </Select>
                </FormGroup>
              </FormRow>
            </Form>
          </Section>

          {/* Payment Method Section */}
          <Section>
            <SectionTitle>💳 Payment Method</SectionTitle>
            
            <PaymentMethodGroup>
              <PaymentOption selected={paymentMethod === 'credit-card'}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit-card"
                  checked={paymentMethod === 'credit-card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  style={{ display: 'none' }}
                />
                <PaymentIcon>💳</PaymentIcon>
                <PaymentInfo>
                  <PaymentTitle>Credit Card</PaymentTitle>
                  <PaymentDescription>Visa, Mastercard, American Express</PaymentDescription>
                </PaymentInfo>
              </PaymentOption>

              <PaymentOption selected={paymentMethod === 'debit-card'}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="debit-card"
                  checked={paymentMethod === 'debit-card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  style={{ display: 'none' }}
                />
                <PaymentIcon>🏧</PaymentIcon>
                <PaymentInfo>
                  <PaymentTitle>Debit Card</PaymentTitle>
                  <PaymentDescription>Pay directly from your bank account</PaymentDescription>
                </PaymentInfo>
              </PaymentOption>

              <PaymentOption selected={paymentMethod === 'cash-on-delivery'}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash-on-delivery"
                  checked={paymentMethod === 'cash-on-delivery'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  style={{ display: 'none' }}
                />
                <PaymentIcon>💵</PaymentIcon>
                <PaymentInfo>
                  <PaymentTitle>Cash on Delivery</PaymentTitle>
                  <PaymentDescription>Pay when your order arrives</PaymentDescription>
                </PaymentInfo>
              </PaymentOption>
            </PaymentMethodGroup>

            {/* Card Details */}
            <CardDetailsSection show={paymentMethod === 'credit-card' || paymentMethod === 'debit-card'}>
              <FormGroup>
                <Label htmlFor="cardNumber">Card Number *</Label>
                <Input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={paymentDetails.cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="cardName">Cardholder Name *</Label>
                <Input
                  type="text"
                  id="cardName"
                  name="cardName"
                  value={paymentDetails.cardName}
                  onChange={handlePaymentChange}
                  placeholder="John Doe"
                />
              </FormGroup>

              <FormRow>
                <FormGroup>
                  <Label htmlFor="expiryDate">Expiry Date *</Label>
                  <Input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={paymentDetails.expiryDate}
                    onChange={handleExpiryChange}
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="cvv">CVV *</Label>
                  <Input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={paymentDetails.cvv}
                    onChange={handlePaymentChange}
                    placeholder="123"
                    maxLength={4}
                  />
                </FormGroup>
              </FormRow>
            </CardDetailsSection>

            {/* Cash on Delivery Details */}
            <CardDetailsSection show={paymentMethod === 'cash-on-delivery'}>
              <FormGroup>
                <Label htmlFor="codPhone">Contact Phone *</Label>
                <Input
                  type="tel"
                  id="codPhone"
                  name="codPhone"
                  value={paymentDetails.codPhone}
                  onChange={handlePaymentChange}
                  placeholder="Your phone number for delivery"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="codAddress">Delivery Address *</Label>
                <TextArea
                  id="codAddress"
                  name="codAddress"
                  value={paymentDetails.codAddress}
                  onChange={handlePaymentChange}
                  placeholder="Complete delivery address"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="codInstructions">Special Instructions</Label>
                <TextArea
                  id="codInstructions"
                  name="codInstructions"
                  value={paymentDetails.codInstructions}
                  onChange={handlePaymentChange}
                  placeholder="Any special delivery instructions"
                />
              </FormGroup>
            </CardDetailsSection>
          </Section>
        </div>

        {/* Order Summary */}
        <OrderSummary>
          <SectionTitle>📦 Order Summary</SectionTitle>
          
          {cartData.cartItems.map((item) => (
            <OrderItem key={item.id}>
              <OrderItemInfo>
                <OrderItemTitle>{item.product.title}</OrderItemTitle>
                <OrderItemMeta>
                  {item.product.category} • Qty: {item.quantity}
                </OrderItemMeta>
              </OrderItemInfo>
              <OrderItemPrice>
                ${(item.product.price * item.quantity).toFixed(2)}
              </OrderItemPrice>
            </OrderItem>
          ))}

          <OrderTotalSection>
            <OrderTotalRow>
              <span>Subtotal:</span>
              <span>${cartData.total.toFixed(2)}</span>
            </OrderTotalRow>
            
            <OrderTotalRow>
              <span>Tax (8%):</span>
              <span>${calculateTax().toFixed(2)}</span>
            </OrderTotalRow>
            
            <OrderTotalRow>
              <span>Shipping:</span>
              <span>
                {calculateShipping() === 0 ? 'FREE' : `$${calculateShipping().toFixed(2)}`}
              </span>
            </OrderTotalRow>
            
            <OrderTotalRow className="total">
              <span>Total:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </OrderTotalRow>
          </OrderTotalSection>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <CheckoutButton onClick={handleCheckout} disabled={processing}>
            {processing && <LoadingSpinner />}
            {processing ? 'Processing...' : `Pay $${calculateTotal().toFixed(2)}`}
          </CheckoutButton>
        </OrderSummary>
      </CheckoutGrid>
    </CheckoutContainer>
  );
};

export default Checkout;
