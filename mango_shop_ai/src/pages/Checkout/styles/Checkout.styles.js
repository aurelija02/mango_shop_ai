import styled from 'styled-components';

export const CheckoutContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 20px;
`;

export const CheckoutGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export const FormSection = styled.section`
  background: ${props => props.theme.colors.white};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const SectionTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

export const OrderSummary = styled.div`
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

export const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  font-size: 16px;
  color: #666;

  > div {
    display: flex;
    align-items: center;
    gap: 15px;
  }
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f5f5f5;
  padding: 5px;
  border-radius: 4px;

  span {
    min-width: 20px;
    text-align: center;
  }
`;

export const QuantityButton = styled.button`
  background: none;
  border: none;
  color: #4CAF50;
  font-size: 18px;
  cursor: pointer;
  padding: 0 5px;
  
  &:hover {
    color: #45a049;
  }
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #ff4444;
  font-size: 20px;
  cursor: pointer;
  padding: 0 5px;
  
  &:hover {
    color: #cc0000;
  }
`;

export const Total = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid #eee;
  font-weight: bold;
  font-size: 18px;
  color: #333;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 15px;
  margin-top: 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`; 