import React, { useState, useEffect, useRef } from 'react';
import useAuth from '../../hooks/useAuth';

// Import npm packages
import { Container } from 'react-bootstrap';
import CFNavLink from '../../components/common/CFNavLink';
import Marquee from 'react-fast-marquee'
//import { Fragment } from "react";

// Import components
import currencyService from '../../services/currencyService';
import MenuList from '../../components/features/Menus/MenuList';
import Loader from '../../components/common/Loader';
import ErrorPage from '../../components/common/ErrorPage';
import MarqueeList from '../../components/features/Menus/MarqueeList';

//const space = <Fragment>&nbsp;&nbsp;&nbsp;&nbsp;</Fragment>

const CurrencyMenu = () => {
  // HOOK: CONTEXT FOR AUTH
  const { user } = useAuth();

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
      fetchCurrency();
      setLoading(false);

      // CLEAN UP FUNCTION
      return () => {
        console.log("Unmounted");
        effectRan.current = true;
      }
    }
  }, []);

  // COMPONENT FUNCTIONS
  async function fetchCurrency() {
    try {
      // API Request (refactored)
      const response = await currencyService.get();
      const data = await response.data;
      setData(data);
    } catch(err) {
      console.log(err?.response);
      setError(true); 
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
      <h1>Digital Currencies Information</h1>
      <p>Create and use your CryptoFi digital wallet to access your national Central Bank Digital Currency (CBDC) today!</p>

      {/* MARQEE */}
      <div>
        <Marquee gradientColor={[200, 255, 255]}>
        {<MarqueeList title="Cryptocurrency" coins={data} />}
        </Marquee>
      </div>

      {/* ADMIN SECTION: AUTHORISATION REQUIRED */}
      { user && <div className="admin-section text-center mt-4">
        <CFNavLink to="/currency/add">Add Currency</CFNavLink>
      </div>}
      
      {/*<div>{space} </div>*/}

      {/* Currency Menu */}
      {data.length > 0 && 
        <MenuList
          title="Retail Central Bank Digital Currencies (RCBDCs)" 
          coins={data} 
        />
      }
    </Container>
  )
}

export default CurrencyMenu