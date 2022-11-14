// Import react modules:
import React from 'react';
import { Fragment } from "react"

// Import custom packages
import { Container, Col, Row } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import AboutBox from '../components/common/AboutBox';
import styled from 'styled-components';

// Local modules
import CFNavLink from '../components/common/CFNavLink';

// Import Images
import AboutImg from '../assets/maxim-hopman-fiXLQXAhCfk-unsplash.jpg';
import AboutImg2 from '../assets/shubham-dhage-Xnf4XmmaRZ8-unsplash.jpg';
import AboutImg3 from '../assets/shubham-dhage-URCKNCgZ9PA-unsplash.jpg';

// Import Icons
import Img1 from '../assets/explore.png';
import Img2 from '../assets/dollar.png';
import Img3 from '../assets/lock.png';

// Custom Styling
const Image = styled.img`
  display: block;
  margin: auto;
  width: 100%;
  height: 392px;
`;

const Image1 = styled.img`
  display: block;
  margin: auto;
  width: 45px;
  height: 45px;
`;

const Styles = styled.div`
`;

const space = <Fragment>&nbsp;&nbsp;&nbsp;&nbsp;</Fragment>

// About component
const About = () => {
  return (
    <Styles fluid>

    <Carousel fade>
      <Carousel.Item data-bs-interval="10000">
      <Image
          src={AboutImg}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item data-bs-interval="10000"> 
      <Image
          src={AboutImg2}
          alt="Second slide"
        />

      </Carousel.Item>
      <Carousel.Item data-bs-interval="10000">
      <Image
          src={AboutImg3}
          alt="Third slide"
        />

      </Carousel.Item>
    </Carousel>

    <Container>
    <AboutBox 
        title="About Us"
        content="At CryptoFi, we offers the best range and market exchange rates for Cryptocurrency and CBDC."
        content2="With the emergence of the cryptocurrency and the recent rise in popularity of CBDC, we aim to provide our customers quick, easy and secure access to the new and ever evolving global financial markets."
        />

        { <div className="admin-section text-center mt-4">
        <CFNavLink to="/currency/prices">Start Trading</CFNavLink>
        </div>}


        <div>{space}</div> 

        <hr></hr>

        <div>{space}</div> 

        <Row className="admin-section text-center mt-4">
        <Col xs>
        <Image1 src={Img1} alt="cover image" />Explore the Crypto World through our diverse range of services in Cryptocurrency and CBDC
        </Col>
        
        <Col xs>
        <Image1 src={Img2} alt="cover image" />Exchange and trade swiftly, once you are satified with your offer and position
        </Col>

        <Col xs>
        <Image1 src={Img3} alt="cover image" />Highly secure services for your crypto wallet to transact the markets
        </Col>
      </Row>

      <div>{space}</div> 

      <div>{space}</div> 

    </Container>

    </Styles>
  )
}

// Export function
export default About