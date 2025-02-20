import React from 'react';
import { useCart } from '../../context/CartContext';
import {
  HomeContainer,
  HeroSection,
  HeroContent,
  HeroTitle,
  ShopNowButton,
  ProductsSection,
  ProductGrid,
  ProductCard,
  ProductImage,
  ProductInfo,
  ProductName,
  ProductPrice,
  ProductDescription,
  AddToCartButton
} from './styles/Home.styles';
import ErrorBoundary from '../../components/ErrorBoundary';

const mangoProducts = [
  {
    id: 1,
    name: 'Tommy Atkins Mango',
    description: 'Sweet and tangy with a firm texture',
    price: 5,
    image: '/images/tommy-atkins.png'
  },
  {
    id: 2,
    name: 'Kent Mango',
    description: 'Rich and sweet with a buttery texture',
    price: 6,
    image: '/images/kent-mango.png'
  },
  {
    id: 3,
    name: 'Haden Mango',
    description: 'Aromatic and rich with a smooth, fiberless flesh',
    price: 7,
    image: '/images/haden-mango.png'
  }
];

const Home = () => {
  const { addToCart } = useCart();

  return (
    <ErrorBoundary>
      <HomeContainer>
        <HeroSection>
          <HeroContent>
            <HeroTitle>Taste the Tropics!</HeroTitle>
            <ShopNowButton to="#products">Shop Now</ShopNowButton>
          </HeroContent>
        </HeroSection>

        <ProductsSection id="products">
          <h2>Our Premium Mangoes</h2>
          <ProductGrid>
            {mangoProducts.map(product => (
              <ProductCard key={product.id}>
                <ProductImage src={product.image} alt={product.name} />
                <ProductInfo>
                  <ProductName>{product.name}</ProductName>
                  <ProductDescription>{product.description}</ProductDescription>
                  <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
                  <AddToCartButton onClick={() => addToCart(product)}>
                    Add to Cart
                  </AddToCartButton>
                </ProductInfo>
              </ProductCard>
            ))}
          </ProductGrid>
        </ProductsSection>
      </HomeContainer>
    </ErrorBoundary>
  );
};

export default Home; 