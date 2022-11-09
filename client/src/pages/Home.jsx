// Import React modules
import React from 'react';

// Import npm packages
import Container from 'react-bootstrap/Container';

// Import custom components
import HeroBox from '../components/common/HeroBox';

import styled from 'styled-components';

import CoverImg from '../assets/nicholas-cappello-Wb63zqJ5gnE-unsplash.jpg';

const Image = styled.img`
  display: block;
  margin: auto;
  width: 100%;
  height: 45vh;
`;

const Styles = styled.div`
`;

const Home = () => {
  return (
    <Styles fluid>

    <Image src={CoverImg} alt="cover image" />

    <Container>
      <HeroBox 
        title="CryptoFi your Experience"
        content="Exchange your Cryptocurrency and CBDC here at the best rates!"
        button="Begin your journey"
        />
    </Container>

    </Styles>
  )
}

export default Home