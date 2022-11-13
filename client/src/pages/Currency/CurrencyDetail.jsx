// Import react modules:
import React, { useState, useEffect } from 'react';

// External packages - Import npm packages
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';

// Import custom components
import useAuth from '../../hooks/useAuth';
import currencyService from '../../services/currencyService';
import ErrorPage from '../../components/common/ErrorPage';
import Loader from '../../components/common/Loader';
import CFNavLink from '../../components/common/CFNavLink';
import CFButton from '../../components/common/CFButton';

// Custom Styling
const Styles = styled.div`
  .hero-box {
    padding: 2rem;
    margin-top: 4rem;
    margin-bottom: 4rem;
    background-color: var(--highlight-light);
    color: var(--complementary);
    border-radius: 12rem;

    .row.main {
      padding-bottom: 1rem;
      border-bottom: solid 5px var(--primary);

      .image-section {
        text-align: center;
  
        img {
          margin-top: 1rem;
          width: 30%;
          padding: 1rem;
          border-radius: 50%;
        }
      }
    }

    .row.secondary {
      .info-box {
        margin-top: 1rem;

        span.title {
          font-weight: bold;
        }
      }
    }
  }

  .admin-box {
    margin: 2rem 0;

    .grid-row {
      display: grid;
      gap: 1rem;
      grid-template-columns: repeat(2, 1fr);
      align-items: center;
    }
  }
`;

// Currency Detail component
const CurrencyDetail = () => {
  // CUSTOM HOOKS
  const { user } = useAuth();
  const params = useParams();
  const navigate = useNavigate();

  // STATE
  const [currencyData, setCurrencyData] = useState({
    id: params.id,
    name: "",
    symbol: "",
    current_price: 0,
    price_change_percentage_24h: 0,
    status: "pending",
    description: "",
    nation: "",
    image: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Destructure data state nested object properties & instance of useNavigate class (NOTE IMAGE DESTRUCTURED)
  const { id, name, symbol, current_price, price_change_percentage_24h, status, description, nation, image } = currencyData;

  // HOOK: ON-LOAD SIDE EFFECTS
  useEffect(() => {
    // Pre-population fetch currency function (based on id)
    async function fetchCurrency() {
      try {
        const response = await currencyService.getById(id);
        const fetchedCurrency = await response.data
        console.log(fetchedCurrency);

        setCurrencyData(currencyData => ({...currencyData,...fetchedCurrency}));
        setLoading(false);

      } catch (err) {
        console.log(err?.response);
        setError(true);
      }
    }
    fetchCurrency();
  }, [id]);

  // COMPONENT FUNCTIONS
  // [0] DELETION OF DOCUMENT
  const handleDeleteClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Call API - must match server route + pass id to route
      const response = await currencyService.del(id);
      console.log(response);

      // onSuccess - Redirect
      setLoading(false);
      navigate('/currency/prices');
      
    } catch (err) {
      console.log(err?.response);
      setError(true);
      window.scroll({top: 0, left: 0, behavior: 'smooth' });
    }
  }
  
  // [1] Text Standardiser
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // [2] Number Standardiser
  function numSeparator(number) {
    let str = number.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return  "$" + str.join(".");
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

  return (
    <Styles>
      <Container>
        {/* HERO BOX */}
        <div className="hero-box">
          <Container>
            
            {/* 1. MAIN ROW */}
            <Row className="main">
            <Col>
                <div className="image-section">
                  <h2>{symbol}</h2>
                  {image && <img className="preview-image" src={image} alt={`Preview of ${name}`} />}
                </div>
              </Col>
              <Col>
                <h2>{name}</h2>
                <p>{description}</p>
                <div className="info-box">
                <div>
                  <p><span className="title">Current Price: </span> {numSeparator(current_price)}</p>
                  <p><span className="title">Price Change: </span>{price_change_percentage_24h}%</p>
                  <p><span className="title">Status: </span>{capitalizeFirstLetter(status)}</p>
                  <p><span className="title">Nation: </span>{capitalizeFirstLetter(nation)}</p>
                </div>
              </div>
              </Col>

            </Row>

            {/* 2. OTHER INFORMATION */}
            <Row className="secondary">  
             {/* HIDDEN - ADMIN DROPDOWN SECTION*/}
             { user && <div className="admin-box">
                  <div className="grid-row">
                    {/* EDIT LINK */}
                    <CFNavLink to={`/currency/edit/${id}`} outline>Edit</CFNavLink>

                    {/* DELETE BUTTON */}
                    <CFButton onClick={handleDeleteClick} loadingState={loading}>{loading ? '...' : 'Delete'}</CFButton>
                  </div>
                </div>}           

            </Row>
          </Container>
        </div>

      </Container>
    </Styles>
  )
}

// Export function
export default CurrencyDetail