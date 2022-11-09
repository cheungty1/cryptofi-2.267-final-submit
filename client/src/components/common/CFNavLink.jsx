import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  border-radius: 10em;
  border: 2px solid var(--brand);
  padding: 0.5rem 1rem;
  text-decoration: none;
  margin: 0rem 0.1rem 0rem 0rem;
  text-align: center;  
  margin: 0 0.1rem;

  font-size: ${props => props.navbar ? "0.9em" : "1em"}; // 0.9em;//
  background: ${props => props.outline ? "var(--primary)" : "var(--brand)"};
  color: ${props => props.outline ? "var(--brand)" : "var(--primary)"};

  &:hover, &:active, &:focus {
    color: var(--primary);
    background-color: var(--brand-dark);
    border: 2px solid var(--brand-dark);
    //transform: scale(1.02);
    box-shadow: none;
  }
`;

const CFNavLink = ({ to, children, outline, navbar }) => {
  return (
    <StyledLink to={to}
            // HTML CONTROL: Below needs to evaluate to a number of 1 or 0.  Otherwise, evaluates to a "string" of "true" or "false", which causes an error when read to the DOM.
      outline={outline ? 1 : 0}
      navbar={navbar ? 1 : 0}
    >
      {children}
    </StyledLink>
  )
}

export default CFNavLink