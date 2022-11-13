// Import react modules
import React, { Fragment } from 'react';

// External Packages - Import npm packages
// Import Styled Components
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Import custom modules/components
import errorIcon from '../../assets/errorIcon.png';

// Styled Component - CSS custom styling
const Image = styled.img`
  width: 400px;
  margin-top: 2rem;
`;

// Style Link
const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--brand);
`;

// ERROR: Dynamic error message using React-Toastify 
const ErrorPage = () => {
  return (
    <Fragment>
      <Image src={errorIcon} alt="error" />
      <h2>
        Error Page: &nbsp; 
        <StyledLink to="/">Return to Home</StyledLink>
      </h2>
    </Fragment>
  )
}

// Export function
export default ErrorPage