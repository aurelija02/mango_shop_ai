import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const DropdownContainer = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  width: 320px;
  background: ${props => props.theme.colors.white};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  z-index: 1000;
  max-height: 80vh;
  overflow-y: auto;
`;

export const CartItem = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr 30px;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

export const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
`;

export const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ItemName = styled.h4`
  margin: 0;
  font-size: 0.9rem;
`;

export const ItemPrice = styled.span`
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
`;

export const ItemQuantity = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  button {
    width: 24px;
    height: 24px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: #f5f5f5;
    }
  }

  span {
    min-width: 20px;
    text-align: center;
  }
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #999;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

export const CartTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-top: 2px solid #eee;
  margin-top: 1rem;
  font-weight: 600;
`;

export const CheckoutButton = styled(Link)`
  display: block;
  width: 100%;
  padding: 0.8rem;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 4px;
  margin-top: 1rem;
  font-weight: 600;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.accent};
  }
`;

export const EmptyCart = styled.div`
  text-align: center;
  padding: 2rem;
  color: #999;
`; 