import React from 'react';
import { useCart } from '../../context/CartContext'; // Changed this line
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
} from './styles/Checkout.styles';
import ErrorBoundary from '../../components/ErrorBoundary';

const Checkout = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart(); // Changed this line

  const calculateTotal = () => {
    const itemsTotal = cartItems.reduce((sum, item) => 
      sum + (item.price * item.quantity), 0
    );
    const shipping = cartItems.length > 0 ? 4.99 : 0;
    return (itemsTotal + shipping).toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Processing payment with Swedbank', cartItems);
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
            <SubmitButton onClick={handleSubmit}>
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