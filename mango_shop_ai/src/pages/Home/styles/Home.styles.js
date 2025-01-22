import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HomeContainer = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

export const HeroSection = styled.section`
  position: relative;
  height: 70vh;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url('/images/hero-mango.jpg') center/cover no-repeat;
  border-radius: 12px;
  margin: 2rem 0;
`;

export const HeroContent = styled.div`
  text-align: center;
  color: ${props => props.theme.colors.white};
`;

export const HeroTitle = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 3rem;
  }
`;

export const ShopNowButton = styled(Link)`
  display: inline-block;
  padding: 1rem 2rem;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  text-decoration: none;
  border-radius: 30px;
  font-weight: 600;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

export const ProductsSection = styled.section`
  padding: 4rem 0;
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  padding: 20px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ProductCard = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const ProductInfo = styled.div`
  padding: 1.5rem;
`;

export const ProductName = styled.h3`
  margin-bottom: 0.5rem;
`;

export const ProductPrice = styled.p`
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
  margin-bottom: 1rem;
`;

export const ProductDescription = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.4;
`;

export const AddToCartButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  background-color: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.primary};
  }
`; 