import React from 'react';
import { useCart } from '../../context/CartContext';
import {
  DropdownContainer,
  CartItem,
  ItemImage,
  ItemInfo,
  ItemName,
  ItemPrice,
  ItemQuantity,
  RemoveButton,
  CartTotal,
  CheckoutButton,
  EmptyCart
} from './styles/CartDropdown.styles';

const CartDropdown = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (!isOpen) return null;

  return (
    <DropdownContainer>
      {cartItems.length === 0 ? (
        <EmptyCart>Your cart is empty</EmptyCart>
      ) : (
        <>
          {cartItems.map(item => (
            <CartItem key={item.id}>
              <ItemImage src={item.image} alt={item.name} />
              <ItemInfo>
                <ItemName>{item.name}</ItemName>
                <ItemPrice>${(item.price * item.quantity).toFixed(2)}</ItemPrice>
                <ItemQuantity>
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </ItemQuantity>
              </ItemInfo>
              <RemoveButton onClick={() => removeFromCart(item.id)}>×</RemoveButton>
            </CartItem>
          ))}
          <CartTotal>
            <span>Total:</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </CartTotal>
          <CheckoutButton to="/checkout" onClick={onClose}>
            Proceed to Checkout
          </CheckoutButton>
        </>
      )}
    </DropdownContainer>
  );
};

export default CartDropdown; 