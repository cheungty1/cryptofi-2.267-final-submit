import React from 'react';

// External packages
//import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CFNavLink from '../../common/CFNavLink';

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

/*
const TableRow = styled.tr`
  margin: 1rem 0%;

  td {
    padding: 1rem;
    vertical-align: middle;
    font-size: 0.9rem;

    img {
      max-width: 40px;
    }
    
    p {
      display: inline;
      vertical-align: middle;
      font-size: 1.2rem;
      font-weight: bold;
      margin-left: 1rem;
    }

    span {
      vertical-align: -10%;
      color: var(--highlight);
      font-size: 0.7rem;
      font-weight: bold;
      margin-left: 0.4rem;
    }
  }
`;
*/
/*
const StyledLink = styled(Link)`
  min-width: 100px;
  font-size: 0.9rem;
`;
*/
const ColorChange = styled.div`
  color: ${
    (props) => props.data < 0 ? "var(--error)" : "var(--success)"
  };
`;
/*
const ColorChange2 = styled.div`
  color: ${
    (props) => props.data < 0 ? "var(--error)" : "var(--success)"
  };
`;
*/
const MenuItem = (props) => {
  return (
    <Styles>
      <div className="grid-row">
        {/* Section 1: Icon, Coin Name & Shorthand */}
        <div className="grid-description">
          <img src={props.image} alt={props.name} />
          <span>{props.name}</span>
          <span className="coin-symbol">{props.symbol}</span>
        </div>

        {/* Section 2: Buy Price */}
        <div className="text-center1">
          {props.price}
        </div>

        {/* Section 3: Price Change (24hr) */}
        <div className="text-center2" >
          <ColorChange data={props.pricechangepercentage24h}>
            {props.pricechangepercentage24h}&nbsp;%
          </ColorChange>
        </div>

        {/* Section 3: Price Change (24hr) */}
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

        {/* Section 4: Market Cap */}
        <div className="text-center6">
          {props.mktstatus}
        </div>

        {/* Column 4: Market Cap */}
        <div className="text-center7">
          {props.volume}
        </div>

        {/* Section 5: Link to Details */}
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

/*
const MenuItem = (props) => {
  return (
    <TableRow>
      {/* Column 1: Icon, Coin Name & Shorthand 
      <td>
        <img src={props.image} alt={props.name} />
        <p>{props.name}</p>
        <span>&#40; {props.symbol} &#41;</span>
      </td>

      {/* Column 2: Buy Price /*
      <td className="text-center">
        {props.price}
      </td>

      {/* Column 3: Price Change (24hr) 
      <td className="text-center" >
        <ColorChange data={props.pricechangepercentage24h}>
        {props.pricechangepercentage24h} %
        </ColorChange>
      </td>

      {/* Column 4: Price Change (24hr) 
      <td className="text-center" >
        <ColorChange data={props.pricechange24h}>
        $ {props.pricechange24h}
        </ColorChange>
      </td>

      {/* Column 5: High (24hr) 
      <td className="text-center" >
        {props.high24h}
      </td>

      {/* Column 6: Low (24hr) 
      <td className="text-center" >
        {props.low24h}       
      </td>

      {/* Column 7: Market Cap 
      <td className="text-center">
        {props.mktstatus}
      </td>

      {/* Column 4: Market Cap 
      <td className="text-center">
        {props.volume}
      </td>

      {/* Column 8: Link to Details 
      <td>
        <StyledLink 
          className="btn btn-outline-dark"
          to={`/currency/${props.id}`}
        >
          Buy {props.symbol}
        </StyledLink>
      </td>
    </TableRow>
  )
}
*/
export default MenuItem