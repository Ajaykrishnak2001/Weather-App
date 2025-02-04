import React, { useContext } from 'react';
import { WeatherContext } from '../WeatherContext';
import styled from 'styled-components';

function ErrorMessage() {
  const { error } = useContext(WeatherContext);

  if (!error) return null;

  return (
    <ErrorContainer>
      <ErrorTitle>Error</ErrorTitle>
      <ErrorText>{error}</ErrorText>
    </ErrorContainer>
  );
}

// Styled Components
const ErrorContainer = styled.div`
  background-color: #ff6b6b;
  color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  margin-bottom: 1rem;
  max-width: 400px;
  margin: 0 auto;
`;

const ErrorTitle = styled.h3`
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const ErrorText = styled.p``;

export default ErrorMessage;
