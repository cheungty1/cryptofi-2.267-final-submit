// Import react modules:
import React, { useState, useEffect } from 'react';

// External packages - Import npm packages
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Card, Row, Col } from 'react-bootstrap';

// Import custom components
import useAuth from '../../hooks/useAuth';
import currencyService from '../../services/currencyService';
import ErrorPage from '../../components/common/ErrorPage';
import Loader from '../../components/common/Loader';
import CFNavLink from '../../components/common/CFNavLink';
import CFButton from '../../components/common/CFButton';

// Import images
import Img1 from '../../assets/dylan-calluy-JpflvzEl5cg-unsplash.jpg';
import Img2 from '../../assets/niranjan-_-photographs-yziS7kyaeX8-unsplash.jpg';
import Img3 from '../../assets/efe-kurnaz-RnCPiXixooY-unsplash.jpg';
import Img4 from '../../assets/jonathan-borba-HeqR0_9U92U-unsplash.jpg';

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
          height: 200px;
          width: 200px;
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
    
    .row.tertiary {
      padding-top: 1rem;
      border-top: solid 5px var(--primary);
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
  .card-img-top {
    width: 100%;
    height: 15vw;
    object-fit: cover;
}
}
`;
/*
const Image1 = styled.img`
  display: block;
  margin: auto;
  width: 45px;
  height: 45px;
`;
*/
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

            {/* 3. Financial Services - Other Functionality*/}
            <Row className="tertiary">
            <h2>Financial Services: </h2>
            </Row>

            <Row xs={1} md={2} className="g-4">
              <Col>
                <Card>
                  <Card.Img variant="top" src={Img1} />
                  <Card.Body>
                    <Card.Title>Trade Now: Spot Trading</Card.Title>
                    <Card.Text>
                      Spot Trading involves buying and selling assets at the current market spot price
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col>
                <Card>
                  <Card.Img variant="top" src={Img2} />
                  <Card.Body>
                    <Card.Title>Derivatives/Options</Card.Title>
                    <Card.Text>
                      Derivatives: are securities whose value is derived by an underlying asset on which it is based. Examples include Futures, Forwards, Swaps and Options 
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col>
                <Card>
                  <Card.Img variant="top" src={Img3} />
                  <Card.Body>
                    <Card.Title>NFT - Non-fungible tokens</Card.Title>
                    <Card.Text>
                    Non-fungible tokens (NFTs): are cryptographic assets on a blockchain. NFTs are digital assets that contain references to digital files such as photos, videos, and audio
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col>
                <Card>
                  <Card.Img variant="top" src={Img4} />
                  <Card.Body>
                    <Card.Title>Web3 and Defi</Card.Title>
                    <Card.Text>
                      Web3 and Defi Tokens: DeFi is an umbrella term for p2p (peer-to-peer) financial services on public blockchains, focused on building decentralized applications primarily Ethereum
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

          </Row>
          </Container>
        </div>

      </Container>
    </Styles>
  )
}

// Export function
export default CurrencyDetail