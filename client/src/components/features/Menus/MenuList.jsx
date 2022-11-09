//import React, { Fragment } from 'react';
import React from 'react';
// Custom components
import MenuItem from './MenuItem';

// External packages
//import { Table } from 'react-bootstrap';
import styled from 'styled-components';

/*
const StyledTable = styled(Table)`
  border: 5px solid var(--complementary);
  margin: 2rem 0;

  thead {
    background: var(--complementary);
    color: var(--primary);
    padding: 2rem 0;
  }

  .button-col {
    width: 150px;
  }
`;
*/

const GridList = styled.div`
  margin: 2rem 0;
  .grid-static {
    display: grid;
    gap: 0rem;
    grid-template-columns: repeat(8, 1fr);
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    margin-bottom: 1rem;

    background: var(--highlight-light);
    border: 0.1rem solid var(--highlight-light);
    border-radius: 100px;

    span {
      margin: auto;
      font-size: 1.1em;
      font-weight: 800;
      color: var(--highlight-super-dark);
    }

    .grid-item-left {
      margin-left: 1rem;
    }
  }

  .grid-coin {
    display: grid;
    gap: 0rem;
    grid-template-columns: repeat(1, 1fr);

    & > div:nth-of-type(even) {
      background: var(--highlight-super-light);
    }
  }

  /* Media Queries */
  @media only screen and (max-width: 1199px){
  .grid-static {
  grid-template-columns: repeat(6, 1fr);
  }
  .grid-item-left6 {
    display: none;
  }

  .grid-item-left7 {
    display: none;
  }

  }

@media only screen and (max-width: 991px){
  .grid-static {
  grid-template-columns: repeat(4, 1fr);
}
  .grid-item-left4 {
    display: none;
  }

  .grid-item-left5 {
    display: none;
  }

  .grid-item-left6 {
    display: none;
  }
  
  .grid-item-left7 {
    display: none;
  }
  .grid-item-left8 {
    display: none;
  }
}


@media only screen and (max-width: 767px){
  .grid-static {
  grid-template-columns: repeat(2, 1fr);
}
.grid-item-left2 {
    display: none;
  }

.grid-item-left3 {
    display: none;
  }
  .grid-item-left4 {
    display: none;
  }

  .grid-item-left5 {
    display: none;
  }

  .grid-item-left6 {
    display: none;
  }
  
  .grid-item-left7 {
    display: none;
  }
  .grid-item-left8 {
    display: none;
  }
}

@media only screen and (max-width: 575px){
  .grid-static {
  grid-template-columns: repeat(1, 1fr);
  }
  .grid-item-left1 {
    display: none;
  }

  .grid-item-left2 {
    display: none;
  }

  .grid-item-left3 {
    display: none;
  }

  .grid-item-left4 {
    display: none;
  }
  
  .grid-item-left5 {
    display: none;
  }

  .grid-item-left6 {
    display: none;
  }

  .grid-item-left7 {
    display: none;
  }

  .grid-item-left8 {
    display: none;
  }
  
}
`;
const MenuList = (props) => {
  // Function using Regex to pass commas into long digits
  function numSeparator(number) {
    let str = number.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return  "$ " + str.join(".");
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <GridList>
    <div className="grid-static">
      <span className="grid-item-left">{props.title}</span>
      <span className="grid-item-left1">Price (USD)</span>
      <span className="grid-item-left2">Change (24h)</span>
      <span className="grid-item-left3">Change (24h)</span>
      <span className="grid-item-left4">High (24h)</span>
      <span className="grid-item-left5">Low (24h)</span>
      <span className="grid-item-left6">Status / Market Cap (USD)</span>
      <span className="grid-item-left7">Volume</span>
      {/*<span className="grid-item-left8">&nbsp;</span>*/}
    </div>

  <div className="grid-coin">
    { props.coins.map(( coin ) => (
      <MenuItem 
      key={coin.id}
      id={coin.id}
      name={coin.name}
      symbol={coin.symbol.toUpperCase()}
      price={numSeparator(coin.current_price.toFixed(2))}
      pricechange24h={(coin.price_change_24h.toFixed(2))}
      pricechangepercentage24h={coin.price_change_percentage_24h.toFixed(2)}
      high24h={numSeparator(coin.high_24h.toFixed(2))}
      low24h={numSeparator(coin.low_24h.toFixed(2))}
      mktstatus={coin.status ? capitalizeFirstLetter(coin.status) : numSeparator(coin.market_cap)}
      volume={numSeparator(coin.total_volume)}
      description={coin.description ? coin.description : ""}
      nation={coin.nation ? coin.nation : ""}
      image={coin.image}
      />
    ))}
  </div>
</GridList>
    /*
    <Fragment>
      <StyledTable striped hover>
        <thead>
          <tr>
            <th>{props.title}</th>
            <th className="text-center">Price (USD)</th>
            <th className="text-center">Change (24h)</th>
            <th className="text-center">Change (24h)</th>
            <th className="text-center">High (24h)</th>
            <th className="text-center">Low (24h)</th>
            <th className="text-center">Status / Market Cap (USD)</th>
            <th className="text-center">Volume</th>
            <th className="button-col"></th>
          </tr>
        </thead>
        <tbody>
          { props.coins.map(( coin ) => (
            <MenuItem 
              key={coin.id}
              id={coin.id}
              name={coin.name}
              symbol={coin.symbol.toUpperCase()}
              price={numSeparator(coin.current_price.toFixed(2))}
              pricechange24h={(coin.price_change_24h.toFixed(2))}
              pricechangepercentage24h={coin.price_change_percentage_24h.toFixed(2)}
              high24h={numSeparator(coin.high_24h.toFixed(2))}
              low24h={numSeparator(coin.low_24h.toFixed(2))}
              mktstatus={coin.status ? capitalizeFirstLetter(coin.status) : numSeparator(coin.market_cap)}
              volume={numSeparator(coin.total_volume)}
              description={coin.description ? coin.description : ""}
              nation={coin.nation ? coin.nation : ""}
              image={coin.image}
            />
          )) }
        </tbody>
      </StyledTable>
    </Fragment>
    */
  )
}

export default MenuList