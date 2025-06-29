import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  padding: 40px;
  text-align: center;
`;

const Heading = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const StyledLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

function NotFound() {
  return (
    <Container>
      <Heading>404 - Page Not Found</Heading>
      <p>The page you're looking for does not exist.</p>
      <StyledLink to="/">Go back to Home</StyledLink>
    </Container>
  );
}

export default NotFound;
