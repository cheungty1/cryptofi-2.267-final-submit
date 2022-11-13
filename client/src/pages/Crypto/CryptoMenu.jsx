// Import react modules:
import React, { useEffect, useState, useRef } from 'react';

// Import npm packages
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';   //Error box
import Marquee from 'react-fast-marquee'

// Import components
import MenuList from '../../components/features/Menus/MenuList';
import ErrorPage from '../../components/common/ErrorPage';
import Loader from '../../components/common/Loader';
import MarqueeList from '../../components/features/Menus/MarqueeList';

const CryptoMenu = () => {
  // HOOK: SETTING COMPONENT STATE (& init values)
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // HOOK: Prevention of useEffect calling TWICE (React v18)
  const effectRan = useRef(false);

  // HOOK: ON-LOAD SIDE EFFECTS
  useEffect(() => {
    console.log("Effect Ran");

    if (effectRan.current === false) {
      fetchCrypto();
      setLoading(false);

      // CLEAN UP FUNCTION
      return () => {
        console.log("Unmounted");
        effectRan.current = true;
      }
    }
  }, []);

  // COMPONENT FUNCTIONS
  async function fetchCrypto() {
    try {
      // External API Request: CoinGecko
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1');
      console.log(response);
      const data = await response.data;

      // SUCCESS: Output overrides intiial data state
      setData(data);

    } catch (err) {
      console.log(err)
      setError(true); 
      toast.error("Internal Server Error - Cannot retrieve data"); 
    }
  }

  // CONDITIONAL LOAD: ERROR
  if (error) {
    return (
      <Container className="text-center">
        <ErrorPage />
      </Container>
    )
  }

  // CONDITIONAL LOAD: LOADING
  if (loading) {
    return (
      <Container>
        <Loader />
      </Container>
    )
  }

  // DEFAULT LOAD: SUCCESS API CALL
  return (
    <Container>
      <h1>Cryptocurrency Information &amp; Prices</h1>
      <p>CryptoFi has all the latest cryptocurrencies to trade and accessible through your digital wallet: everything from Bitcoin to Ethereum and more.</p>

      {/* MARQEE */}
      <div>
        <Marquee gradientColor={[200, 255, 255]}>
        {<MarqueeList title="Cryptocurrency" coins={data} />}
        </Marquee>
      </div>

      {/* SECTION: Crypto Menu */}
      {data.length > 0 && <MenuList title="Cryptocurrency" coins={data} />}
    </Container>
  )
};

// Export function
export default CryptoMenu