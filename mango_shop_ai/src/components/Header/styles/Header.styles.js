import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.header`
  background-color: ${props => props.theme.colors.primary};
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

export const Logo = styled(Link)`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.8rem;
  font-weight: 700;
  color: ${props => props.theme.colors.white};
  text-decoration: none;
  
  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
`;

export const CartButton = styled.button`
  color: ${props => props.theme.colors.white};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`; 