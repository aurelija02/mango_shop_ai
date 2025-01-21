import React, { useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { HeaderContainer, Nav, Logo, CartButton } from './styles/Header.styles';
import CartDropdown from '../CartDropdown/CartDropdown';
import { useCart } from '../../context/CartContext';

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">Mango Tango</Logo>
        <CartButton onClick={() => setIsCartOpen(!isCartOpen)}>
          <ShoppingCartIcon />
          Cart {cartCount > 0 && `(${cartCount})`}
        </CartButton>
        <CartDropdown isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </Nav>
    </HeaderContainer>
  );
};

export default Header; 