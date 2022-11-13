// Import react modules
import React from 'react';

// External Packages - Import npm packages
// Import Styled Components
import { Container } from 'react-bootstrap';
import styled from 'styled-components';

// Styled Component - CSS custom styling
// Styling Container, Lead card and Card title
const Styles = styled.div`
  .container {
    min-height: 80vh;
    display: flex;
    flex-direction: column;
  }

  .lead-card {
    margin: auto;
    padding: 2rem;
    background-color: var(--primary);
    border-radius: 5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    text-align: left;

    // Width Styling - pass props into Style Components and use ternary operator for different CSS styles for different situtations
    min-width: ${props => props.authform ? "30vw" : "60vw"};
  }

  .lead-card .card-title {
    padding-bottom: 1rem;
    font-size: 2em;
    font-weight: 600;
    color: var(--brand);
  }
`;

// Card Component
const CFCard = ({title, authform, children}) => {
  return (
    <Styles authform={authform ? 1 : 0}> 
      <Container>
        <div className="lead-card">
          <p className="card-title">{title}</p>
          <div>
            {children}
          </div>
        </div>
      </Container>
    </Styles>
  )
};

// Export function
export default CFCard