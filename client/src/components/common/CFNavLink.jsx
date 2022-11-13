// Import react modules
import React from 'react';

// External Packages - Import npm packages
// Import Styled Components
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled Component - CSS custom styling
// Link Styling
const StyledLink = styled(Link)`
  border-radius: 10em;
  border: 2px solid var(--brand);
  padding: 0.5rem 1rem;
  text-decoration: none;
  margin: 0rem 0.1rem 0rem 0rem;
  text-align: center;  
  margin: 0 0.1rem;

  // Link Styling - pass props into Style Components and use ternary operator for different CSS styles for different situtations
  font-size: ${props => props.navbar ? "0.9em" : "1em"}; 
  background: ${props => props.outline ? "var(--primary)" : "var(--brand)"};
  color: ${props => props.outline ? "var(--brand)" : "var(--primary)"};

  // Link Styling - colour change when hover, active and focus
  &:hover, &:active, &:focus {
    color: var(--primary);
    background-color: var(--brand-dark);
    border: 2px solid var(--brand-dark);
    box-shadow: none;
  }
`;

// Navlink Component
const CFNavLink = ({ to, children, outline, navbar }) => {
  return (
    <StyledLink to={to}
    // Html control: evaluate to number of 1 or 0.  
    // Otherwise, evaluates to a "string" of "true" or "false", which causes an error when read to the DOM.
      outline={outline ? 1 : 0}
      navbar={navbar ? 1 : 0}
    >
      {children}
    </StyledLink>
  )
}

// Export function
export default CFNavLink