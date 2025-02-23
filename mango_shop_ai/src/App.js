import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { theme, GlobalStyles } from './styles/theme';
import { CartProvider } from './context/CartContext';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Checkout from './pages/checkoutPages/Checkout.js';
import CheckoutSuccess from './pages/checkoutPages/success.js';
import CheckoutError from './pages/checkoutPages/error.js';

const GlobalStyle = createGlobalStyle`${GlobalStyles}`;

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <CartProvider>
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/checkout/success" element={<CheckoutSuccess />} />
              <Route path="/checkout/error" element={<CheckoutError />} />
            </Routes>
          </Router>
        </CartProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
