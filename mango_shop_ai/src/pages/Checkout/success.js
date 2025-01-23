import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  StatusContainer,
  SuccessMessage,
  StatusDetails,
  SuccessButton
} from './styles/Status.styles';

const CheckoutSuccess = () => {
  const navigate = useNavigate();

  return (
    <StatusContainer>
      <SuccessMessage>Payment Successful!</SuccessMessage>
      <StatusDetails>
        Thank you for your purchase. Your order has been confirmed.
      </StatusDetails>
      <SuccessButton onClick={() => navigate('/')}>
        Return to Home
      </SuccessButton>
    </StatusContainer>
  );
};

export default CheckoutSuccess; 