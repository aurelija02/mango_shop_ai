import React from 'react';
import { useCart } from '../../context/CartContext'; // This one is correct
import {
  CheckoutContainer,
  OrderSummary,
  SectionTitle,
  SummaryItem,
  Total,
  SubmitButton,
  QuantityControl,
  QuantityButton,
  DeleteButton
} from './styles/Checkout.styles'; // This is correct if styles exist in this location
import ErrorBoundary from '../../components/ErrorBoundary'; // This one is correct

const Checkout = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const calculateTotal = () => {
    const itemsTotal = cartItems.reduce((sum, item) => 
      sum + (item.price * item.quantity), 0
    );
    const shipping = cartItems.length > 0 ? 4.99 : 0;
    return (itemsTotal + shipping).toFixed(2);
  };

  const handleSwedbankPayment = () => {
    const clientId = process.env.REACT_APP_SWEDBANK_CLIENT_ID;
    const redirectUri = encodeURIComponent('https://mango-tango-shop.vercel.app/api/swedbank/callback');
    const scope = 'PSD2sandbox';
    const bic = 'SANDLT22';
    const state = Math.random().toString(36).substring(7);
    const amount = calculateTotal(); // Get the actual total including shipping

    console.log('Initiating payment with amount:', amount); // Debug log

    const authUrl = 'https://psd2.api.swedbank.com/psd2/authorize?' + 
      `bic=${bic}&` +
      `client_id=${clientId}&` +
      `redirect_uri=${redirectUri}&` +
      `scope=${scope}&` +
      `state=${state}&` +
      `amount=${amount}&` +
      'response_type=code';
    
    window.location.href = authUrl;
  };

  return (
    <ErrorBoundary>
      <CheckoutContainer>
        <OrderSummary>
          <SectionTitle>Order Summary</SectionTitle>
          {cartItems.map(item => (
            <SummaryItem key={item.id}>
              <span>{item.name}</span>
              <div>
                <QuantityControl>
                  <QuantityButton onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</QuantityButton>
                  <span>{item.quantity}</span>
                  <QuantityButton onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</QuantityButton>
                </QuantityControl>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
                <DeleteButton onClick={() => removeFromCart(item.id)}>×</DeleteButton>
              </div>
            </SummaryItem>
          ))}
          {cartItems.length > 0 && (
            <SummaryItem>
              <span>Shipping</span>
              <span>$4.99</span>
            </SummaryItem>
          )}
          <Total>
            <span>Total</span>
            <span>${calculateTotal()}</span>
          </Total>
          {cartItems.length > 0 ? (
            <SubmitButton onClick={handleSwedbankPayment}>
              Pay with Swedbank
            </SubmitButton>
          ) : (
            <SectionTitle>Your cart is empty</SectionTitle>
          )}
        </OrderSummary>
      </CheckoutContainer>
    </ErrorBoundary>
  );
};

export default Checkout; 