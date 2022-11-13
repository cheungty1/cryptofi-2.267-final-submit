// Import react modules
import React from 'react';

// Import npm packages & components
import styled from 'styled-components';

// Import Loading Spinner from React Bootstrap
import Spinner from 'react-bootstrap/Spinner'

// Styled Components - CSS custom styling
const Styles = styled.div`
.spinner-box {
  height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

// Loader component - React Bootstrap Spinner displayed when page loading
const Loader = () => {
  return (
    <Styles> 
    <div className="spinner-box">
    <Spinner animation="border"  />
    </div> 
    </Styles>
  )
}

// Export function
export default Loader