// Import react modules
import React from 'react';

// External packages
// Import Styled Components
import styled from 'styled-components';

// Styled Components - CSS custom styling
const Styles = styled.div`
display: inline-block;
padding: 5px;
margin: 5px;
`;

// Style Image
const Image = styled.img`
  width: 25px;
`;

// Colour change styling of grid contents (where positive = green and negative = red)
const ColorChange = styled.div`
display: inline-block;
  color: ${
    (props) => props.data < 0 ? "var(--error)" : "var(--success)"
  };
`;

// Marqee Item component
const MarqueeItem = (props) => {
 return (
   <Styles>
        <Image src={props.image} alt={props.name} />
          {' '}
          {props.symbol}
          {' '}
          <ColorChange data={props.pricechangepercentage24h}>
            {props.pricechangepercentage24h}&nbsp;%
          </ColorChange>
          {' '}
    </Styles>
  )
}

// Export function
export default MarqueeItem