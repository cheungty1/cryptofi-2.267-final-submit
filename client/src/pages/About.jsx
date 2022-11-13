// Import react modules:
import React from 'react';

// Import custom packages
import { Container } from 'react-bootstrap';
import AboutBox from '../components/common/AboutBox';
import styled from 'styled-components';

// Local modules
import CoverImg from '../assets/maxim-hopman-fiXLQXAhCfk-unsplash.jpg';
import CFNavLink from '../components/common/CFNavLink';

// Custom Styling
const Image = styled.img`
  display: block;
  margin: auto;
  width: 100%;
  height: 45vh;
`;

const Styles = styled.div`
`;

// About component
const About = () => {
  return (
    <Styles fluid>
    {<Image src={CoverImg} alt="cover image" />}

    <Container>
    <AboutBox 
        title="About Us"
        content="At CryptoFi, we offers the best range and market exchange rates for Cryptocurrency and CBDC."
        content2="With the emergence of the cryptocurrency and the recent rise in popularity of CBDC, we aim to provide our customers quick, easy and secure access to the new and ever evolving global financial markets."
        />

        { <div className="admin-section text-center mt-4">
        <CFNavLink to="/currency/prices">Start Trading</CFNavLink>
        </div>}
    </Container>
    
    </Styles>
  )
}

// Export function
export default About