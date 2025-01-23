import styled from 'styled-components';

export const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 20px;
`;

export const StatusMessage = styled.h1`
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
`;

export const SuccessMessage = styled(StatusMessage)`
  color: #4CAF50;
`;

export const ErrorMessage = styled(StatusMessage)`
  color: #f44336;
`;

export const StatusDetails = styled.p`
  color: #666;
  margin-bottom: 20px;
  text-align: center;
`;

export const ActionButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  color: white;
  transition: background-color 0.3s;
  
  &:hover {
    opacity: 0.9;
  }
`;

export const SuccessButton = styled(ActionButton)`
  background-color: #4CAF50;
  
  &:hover {
    background-color: #45a049;
  }
`;

export const ErrorButton = styled(ActionButton)`
  background-color: #f44336;
  
  &:hover {
    background-color: #d32f2f;
  }
`; 