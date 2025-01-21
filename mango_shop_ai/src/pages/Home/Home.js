import React from 'react';
import { useCart } from '../../context/CartContext';
import {
  HomeContainer,
  HeroSection,
  HeroContent,
  HeroTitle,
  ShopNowButton,
  ProductsSection,
  ProductsGrid,
  ProductCard,
  ProductImage,
  ProductInfo,
  ProductName,
  ProductPrice,
  ProductDescription,
  AddToCartButton
} from './styles/Home.styles';

const mangoProducts = [
  {
    id: 1,
    name: 'Tommy Atkins Mango',
    description: 'Sweet and tangy with a firm texture',
    price: 4.99,
    image: '/images/tommy-atkins.jpg'
  },
  {
    id: 2,
    name: 'Kent Mango',
    description: 'Rich and sweet with a buttery texture',
    price: 5.99,
    image: '/images/kent-mango.jpg'
  },
  {
    id: 3,
    name: 'Haden Mango',
    description: 'Aromatic and rich with a smooth, fiberless flesh',
    price: 6.49,
    image: '/images/haden-mango.jpg'
  }
];

const Home = () => {
  const { addToCart } = useCart();

  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Taste the Tropics!</HeroTitle>
          <ShopNowButton to="#products">Shop Now</ShopNowButton>
        </HeroContent>
      </HeroSection>

      <ProductsSection id="products">
        <h2>Our Premium Mangoes</h2>
        <ProductsGrid>
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
        </ProductsGrid>
      </ProductsSection>
    </HomeContainer>
  );
};

export default Home; 