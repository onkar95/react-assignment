import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
`;

export const Heading = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #2c3e50;
  text-align: center;
`;

export const ErrorText = styled.p`
  color: red;
  font-weight: bold;
  text-align: center;
`;

export const BackButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #2980b9;
  }
`;
