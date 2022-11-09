import React from 'react'

// Import npm packages
import Container from 'react-bootstrap/Container';

import styled from 'styled-components';

const Styles = styled.div`
  text-align: center;
`;

const NotFound = () => {
  return (
    <Styles>
    <Container>
    <h1>404 - NotFound</h1>
    </Container>
    </Styles>
  )
}

export default NotFound