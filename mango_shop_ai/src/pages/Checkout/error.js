import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  StatusContainer,
  ErrorMessage,
  StatusDetails,
  ErrorButton
} from './styles/Status.styles';

const CheckoutError = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const errorMessage = searchParams.get('message') || 'An error occurred during payment';

  return (
    <StatusContainer>
      <ErrorMessage>Payment Failed</ErrorMessage>
      <StatusDetails>{errorMessage}</StatusDetails>
      <ErrorButton onClick={() => navigate('/checkout')}>
        Try Again
      </ErrorButton>
    </StatusContainer>
  );
};

export default CheckoutError; 