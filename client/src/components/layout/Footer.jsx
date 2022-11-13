// Import React modules
import React from 'react';

// External packages - Import Styled Components
import styled from 'styled-components';

// Styled Components - CSS custom styling
const MainFooter = styled.div`
  text-align: center;
  background: var(--highlight-light);
  color: var(--complementary);
  border-top: 1px solid var(--highlight);
`;

// Footer Function
const Footer = () => {
  // Dynamic Date Function
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <MainFooter className="py-3">
      CryptoFi &copy; {getCurrentYear()} 
    </MainFooter>
  )
}

// Export function
export default Footer