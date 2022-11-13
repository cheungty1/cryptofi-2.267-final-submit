// Import react modules
import React from 'react';

// External Packages - Import npm packages
// Import Styled Components
import styled from 'styled-components';
import CFNavLink from './CFNavLink';

// Styled Component - CSS custom styling
const Styles = styled.div`
  margin-top: 45px;

`;

// Container for the About page
const AboutBox = ({ title, content, content2, button}) => {
  return (
    <Styles>
      <h1>{title}</h1>
      <p>{content}</p>
      <p>{content2}</p>
      {button && (
        <div className="mt-4">
          <CFNavLink to={"/about"}>{button}</CFNavLink>
        </div>
      )}
    </Styles>
  )
}

// Export function
export default AboutBox