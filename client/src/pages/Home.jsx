// Import React modules
import React from 'react';

// Import npm packages
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import styled from 'styled-components';

// Import custom components
import HeroBox from '../components/common/HeroBox';

// Import images
import CoverImg from '../assets/nicholas-cappello-Wb63zqJ5gnE-unsplash.jpg';
import CoverImg2 from '../assets/shubham-dhage-GTkOJuE1_cE-unsplash.jpg';
import CoverImg3 from '../assets/shubham-dhage-1Auj1kefb2E-unsplash.jpg';

// Custom styling
const Image1 = styled.img`
  display: block;
  margin: auto;
  width: 100%;
  height: 392px;
`;

const Styles = styled.div`
`;

// Home component
const Home = () => {
  return (
    <Styles fluid>

    <Carousel fade>
      <Carousel.Item data-bs-interval="10000">
      <Image1
          src={CoverImg}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item data-bs-interval="10000"> 
      <Image1
          src={CoverImg2}
          alt="Second slide"
        />

      </Carousel.Item>
      <Carousel.Item data-bs-interval="10000">
      <Image1
          src={CoverImg3}
          alt="Third slide"
        />

      </Carousel.Item>
    </Carousel>

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

// Export function
export default Home