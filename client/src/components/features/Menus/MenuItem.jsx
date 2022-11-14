// Import react modules
import React from 'react';

// External packages
// Import Styled Components
import styled from 'styled-components';

// Import Custom Components
import CFNavLink from '../../common/CFNavLink';

// Styled Components - CSS custom styling
// Styling the Grid component and grid contents
const Styles = styled.div`
  .grid-row {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(8, 1fr);
    align-items: center;
  
    border: 0.1rem solid var(--highlight-light);
    border-radius: 100px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
    padding: 1rem 2rem;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.008);
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      cursor: pointer;
      background-color: var(--brand-light);
      color: var(--primary);
    }

    .grid-description {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      gap: 0.5rem;
      align-items: center;
      justify-content: space-around;
  
      img {
        max-width: 60px;
      }
  
      .coin-symbol {
        color: var(--highlight-dark);
        font-size: 0.8em;
        font-weight: bold;
      }
    }
  }

  /* Media Queries */
  @media only screen and (max-width: 1199px){
  .grid-row {
  grid-template-columns: repeat(6, 1fr);
  }
  .text-center6 {
  display: none;
  }

  .text-center7 {
    display: none;
  }
  }

  @media only screen and (max-width: 991px){
    .grid-row {
    grid-template-columns: repeat(4, 1fr);
  }

  .text-center4 {
    display: none;
  }

  .text-center5 {
    display: none;
  }

  .text-center6 {
    display: none;
  }

  .text-center7 {
    display: none;
  }
  }

  @media only screen and (max-width: 767px){
    .grid-row {
    grid-template-columns: repeat(2, 1fr);
  }

  .text-center2 {
    display: none;
  }

  .text-center3 {
    display: none;
  }

  .text-center4 {
    display: none;
  }

  .text-center5 {
    display: none;
  }

  .text-center6 {
    display: none;
  }

  .text-center7 {
    display: none;
  }
  }

  @media only screen and (max-width: 575px){
  .grid-row {
  grid-template-columns: repeat(1, 1fr);
  }
  .text-center1 {
    display: none;
  }

  .text-center2 {
    display: none;
  }

  .text-center3 {
    display: none;
  }

  .text-center4 {
    display: none;
  }

  .text-center5 {
    display: none;
  }

  .text-center6 {
    display: none;
  }

  .text-center7 {
    display: none;
  }
}
`;

// Colour change styling of grid contents (where positive = green and negative = red)
const ColorChange = styled.div`
  color: ${
    (props) => props.data < 0 ? "var(--error)" : "var(--success)"
  };
`;

// MenuItem function
const MenuItem = (props) => {
  return (
    <Styles>

      <div className="grid-row">

        <div className="grid-description">
          <img src={props.image} alt={props.name} />
          <span>{props.name}</span>
          <span className="coin-symbol">{props.symbol}</span>
        </div>

        {/* Section 2: Buy Price */}
        <div className="text-center1">
          {props.price}
        </div>

        {/* Section 3: Price Change (24hr) - Percentage */}
        <div className="text-center2" >
          <ColorChange data={props.pricechangepercentage24h}>
            {props.pricechangepercentage24h}&nbsp;%
          </ColorChange>
        </div>

        {/* Section 4: Price Change (24hr) */}
        <div className="text-center3" >
          <ColorChange data={props.pricechange24h}>
           $ {props.pricechange24h}&nbsp;
          </ColorChange>
        </div>

        {/* Column 5: High (24hr) */}
        <div className="text-center4" >
          {props.high24h}
        </div>

        {/* Column 6: Low (24hr) */}
        <div className="text-center5" >
          {props.low24h}       
        </div>

        {/* Section 7: Market Cap */}
        <div className="text-center6">
          {props.mktstatus}
        </div>

        {/* Column 8: Volume */}
        <div className="text-center7">
          {props.volume}
        </div>
        {/* Section 9: Link to Details */}
        <CFNavLink 
          to={`/currency/${props.id}`}
          outline
        >
          Buy {props.symbol}
        </CFNavLink>
      </div>
    </Styles>
  )
}

// Export function
export default MenuItem