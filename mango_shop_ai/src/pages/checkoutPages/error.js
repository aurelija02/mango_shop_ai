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

  const getErrorDescription = (message) => {
    if (message.includes('RJCT')) {
      return 'Payment was rejected by the bank. Please check your account details and try again.';
    }
    if (message.includes('CANC')) {
      return 'Payment was cancelled. Please try again.';
    }
    return message;
  };

  return (
    <StatusContainer>
      <ErrorMessage>Payment Failed</ErrorMessage>
      <StatusDetails>{getErrorDescription(errorMessage)}</StatusDetails>
      <ErrorButton onClick={() => navigate('/checkout')}>
        Try Again
      </ErrorButton>
    </StatusContainer>
  );
};

export default CheckoutError; 