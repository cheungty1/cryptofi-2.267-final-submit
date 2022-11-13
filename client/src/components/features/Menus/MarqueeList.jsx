// Import react modules
import React from 'react';

// External packages
// Import Styled Components
import styled from 'styled-components';

// Import Custom Components
import MarqueeItem from './MarqueeItem';

// Styled Components - CSS custom styling
const Styles = styled.div`
`;

// Marqee List component
const MarqueeList = (props) => {
 
 return (
  <Styles>
  {/* Map function - iterate over array to pull data out and display/render it to the DOM */}
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

  // Export function
  export default MarqueeList