import React from 'react';

// External packages
//import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CFNavLink from '../../common/CFNavLink';

const Styles = styled.div`
display: inline-block;
padding: 5px;
margin: 5px;
`;

const Image = styled.img`
  width: 25px;
`;

const ColorChange = styled.div`
display: inline-block;
  color: ${
    (props) => props.data < 0 ? "var(--error)" : "var(--success)"
  };
`;
const MarqueeItem = (props) => {
 return (
   <Styles>
        {/* Section 1: Icon, Coin Name & Shorthand */}
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
export default MarqueeItem