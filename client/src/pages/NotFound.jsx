// Import React modules
import React from 'react'

// Import npm packages
import Container from 'react-bootstrap/Container';
import styled from 'styled-components';

// Custom Styling
const Styles = styled.div`
  text-align: center;
`;

// Not Found component - 404 Error Page
const NotFound = () => {
  return (
    <Styles>
    <Container>
    <h1>404 - NotFound</h1>
    </Container>
    </Styles>
  )
}
// Export function
export default NotFound