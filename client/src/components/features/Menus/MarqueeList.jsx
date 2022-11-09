//import React, { Fragment } from 'react';
import React from 'react';

// External packages
//import { Table } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import MarqueeItem from './MarqueeItem';

const Styles = styled.div`
`;
const MarqueeList = (props) => {
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
  <Styles>

   <div className="grid-coin">
    { props.coins.map(( coin ) => (
      <MarqueeItem
      key={coin.id}
      id={coin.id}
      name={coin.name}
      symbol={coin.symbol.toUpperCase()}
      pricechangepercentage24h={coin.price_change_percentage_24h.toFixed(2)}
      image={coin.image}
      />
    ))}
  </div>
        </Styles>
      )
     }
     
     export default MarqueeList