import React from 'react';

// Import npm packages
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  width: 100%;
  border-radius: 10rem;
  border: 2px solid var(--brand);
  transition: all 0.2s;
  margin: 0 0.1rem;

  background: ${props => props.outline ? "var(--primary)" : "var(--brand)"};
  color: ${props => props.outline ? "var(--brand)" : "var(--primary)"};

  &:hover, &:active, &:focus {
    background-color: var(--brand-dark);
    //transform: scale(1.02);
    box-shadow: none;
  }
`;

const CFButton = ({ children, loadingState, onClick, outline, navbar }) => {
  return (
    <StyledButton 
      type={onClick ? "button" : "submit"} 
      onClick={onClick}
      className={loadingState && "button-gradient-loading"}
      disabled={loadingState}
      outline={outline ? 1 : 0}
      navbar={navbar ? 1 : 0}
    >      
      {children}
    </StyledButton>
  )
}

export default CFButton