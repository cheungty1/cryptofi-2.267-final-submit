// Import react modules
import React from 'react';

// External packages - Import Styled Components 
import styled from 'styled-components';

// Import components
import CFNavLink from './CFNavLink';

// Styled Component - CSS custom styling
const Styles = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  box-sizing: border-box;
  background: var(--primary);
  border-radius: 5px;
  padding: 40px;
  text-align: center;
`;

// Container for the Home Page
const HeroBox = ({ title, content, button }) => {
  return (
    <Styles>
      <h1>{title}</h1>
      <p>{content}</p>
      { button && (
        <div>
          <CFNavLink to={"/about"} variant="dark">{button}</CFNavLink>
        </div>
      )}
    </Styles>
  )
}

// Export function
export default HeroBox