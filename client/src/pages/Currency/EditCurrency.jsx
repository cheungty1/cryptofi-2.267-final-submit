import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import styled from 'styled-components';

// Local modules
import currencyService from '../../services/currencyService';
import CFCard from '../../components/common/CFCard';
import CFButton from '../../components/common/CFButton';
import ErrorPage from '../../components/common/ErrorPage';
import Loader from '../../components/common/Loader';

const Styles = styled.div`
.form-control {
  border-radius: 100rem;
}
`;

// Custom Styles
const PreviewImage = styled.img`
  margin-top: 1rem;
  width: 250px;
  padding: 1rem;
  border: 5px solid var(--brand);
  border-radius: 50%;
  opacity: 0.8;
`;

const EditCurrency = () => {
  // REACT-ROUTER DOM HOOKS
  const params = useParams();
  const navigate = useNavigate();
  
  // HOOK: SETTING COMPONENT STATE (& init values)
  const [currencyData, setCurrencyData] = useState({
    id: params.id,
    name: "",
    symbol: "",
    current_price: 0,
    price_change_24h: 0,
    price_change_percentage_24h: 0,
    high_24h: 0,
    low_24h: 0,
    status: "pending",
    total_volume: 0,
    description: "",
    nation: "",
    image: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Uploaded File from Existing downloadURL
  const [uploadedFile, setUploadedFile] = useState("");
  const [preview, setPreview] = useState(true);

  // Destructure data state nested object properties
  const { id, name, symbol, current_price, price_change_24h, price_change_percentage_24h, high_24h, low_24h, status, total_volume, description, nation, image } = currencyData;

  // HOOK: Re-mount Request Prevention (React18)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]); 

  // FORM FUNCTIONS
  // [0] FORM PRE-POPULATION CALL
  async function fetchCurrency() {
    try {
      // (i) API FETCH CALL
      const response = await currencyService.getById(id);
      const fetchedCurrency = await response.data;
      console.log(fetchedCurrency);

      // (ii) UPDATING STATE DATA OBJECT
      setCurrencyData(currencyData => ({...currencyData,...fetchedCurrency}));

      // Save uploaded file glob to state
      if (!fetchedCurrency.image) {      
        console.log('No downloadURL provided by DB'); 
      } else {
        const fileGlob = currencyService.getFileFromUrl(fetchedCurrency.image);
        setUploadedFile(fileGlob);
      }

    // (iii) CLEANUP FUNCTIONS
    } catch(err) {
      console.log(err?.response);
      setError(true);
    }
  }

  // [1] CHANGE STATE FOR TEXT FORM DATA
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setCurrencyData({
      ...currencyData,             
      [name]: value        
    });
  }

  // [2] CHANGE STATE FOR FILE FORM DATA
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCurrencyData({
      ...currencyData, 
      image: file
    });
    setPreview(false);
  }

  // [3] FORM SUBMISSION FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();      
    setLoading(true);
    try {
      // NOTE: We add uploadedFile parameter to pass image glob
      const response = await currencyService.put(id, currencyData, uploadedFile);
      console.log(response);
      navigate('/currency/prices');

    } catch (err) {
      console.log(err?.response);
      setError(true); 
      window.scroll({top: 0, left: 0, behavior: 'smooth' });
    }
    setLoading(false);
  };

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

  // DEFAULT LOAD: SUCCESS PRE-POPULATION API CALL
  return (
    <Styles>
    <CFCard title="Edit Currency">
      {/* FORM SECTION */}
      <Form onSubmit={handleSubmit}>
        {/* GROUP 1: NAME */}
        <Form.Group className="mb-3">
          <Form.Label>Central Bank Digital Currency Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter CBDC Name" 
            name="name"
            value={name}
            onChange={ handleTextChange }
          />
        </Form.Group>

        {/* GROUP 2: SYMBOL */}
        <Form.Group className="mb-3">
          <Form.Label>CBDC Symbol</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter CBDC Symbol" 
            name="symbol" 
            value={symbol}
            onChange={ handleTextChange }
          />
        </Form.Group>

        {/* GROUP 3: PRICE INFORMATION */}
        <Form.Group className="mb-3">
          <Row>
            {/* 3A: CURRENT PRICE */}
            <Col lg={4} md={4} sm={12}>
              <Form.Label>Current CBDC Price</Form.Label>
              <InputGroup>          
                <InputGroup.Text id="price-dollar">$</InputGroup.Text>
                <Form.Control 
                  type="number" 
                  aria-describedby="price-dollar" 
                  id="price-input" 
                  name="current_price" 
                  value={current_price}
                  onChange={ handleTextChange }
                />
              </InputGroup>
            </Col>

            {/* 3B: PRICE CHANGE 24HR */}
            <Col lg={4} md={4} sm={12}>
              <Form.Label>24HR Price Change</Form.Label>
              <InputGroup>          
                <InputGroup.Text id="price-dollar1">$</InputGroup.Text>
                <Form.Control 
                  type="number" 
                  aria-describedby="price-dollar1" 
                  id="price-input1" 
                  name="price_change_24h" 
                  value={price_change_24h}
                  onChange={ handleTextChange }
                />
              </InputGroup>
            </Col>

            <Col lg={4} md={4} sm={12}>
              <Form.Label>24HR Price Change Percentage</Form.Label>
              <InputGroup>          
                <Form.Control 
                  type="number" 
                  aria-describedby="price-percent" 
                  id="price-percent" 
                  name="price_change_percentage_24h" 
                  value={price_change_percentage_24h}
                  onChange={ handleTextChange }
                />
                <InputGroup.Text id="price-percent">%</InputGroup.Text>
              </InputGroup>
            </Col>

            <Col lg={4} md={4} sm={12}>
              <Form.Label>High 24h CBDC Price</Form.Label>
              <InputGroup>          
                <InputGroup.Text id="price-dollar2">$</InputGroup.Text>
                <Form.Control 
                  type="number" 
                  aria-describedby="price-dollar2" 
                  id="price-input2" 
                  name="high_24h" 
                  value={high_24h}
                  onChange={ handleTextChange }
                />
              </InputGroup>
            </Col>

            {/* 3A: CURRENT PRICE */}
            <Col lg={4} md={4} sm={12}>
              <Form.Label>Low 24h CBDC Price</Form.Label>
              <InputGroup>          
                <InputGroup.Text id="price-dollar3">$</InputGroup.Text>
                <Form.Control 
                  type="number" 
                  aria-describedby="price-dollar3" 
                  id="price-input3" 
                  name="low_24h" 
                  value={low_24h}
                  onChange={ handleTextChange }
                />
              </InputGroup>
            </Col>


        <Col lg={4} md={4} sm={12}>
              <Form.Label>Total Volume</Form.Label>
              <InputGroup>          
                <Form.Control 
                  type="number" 
                  aria-describedby="total-volume4" 
                  id="volume-input4" 
                  name="total_volume" 
                  value={total_volume}
                  onChange={ handleTextChange }
                />
              </InputGroup>
            </Col>
            </Row>
        </Form.Group>
        {/* GROUP 4: CBDC STATUS */}
        <Form.Group className="mb-3">
          <Form.Label>CBDC Status</Form.Label>
          <Form.Control 
            as='select'
            name='status'
            value={status}
            onChange={ handleTextChange } 
          >
            <option value="pending">Pending</option>
            <option value="tradeable">Tradeable</option>
            <option value="non-tradeable">Non-Tradeable</option>
          </Form.Control>
        </Form.Group>

        {/* GROUP 5: DESCRIPTION */}
        <Form.Group className="mb-3">
          <Form.Label>Description of New CBDC</Form.Label>
          <Form.Control 
            as="textarea" 
            type="text" 
            placeholder="Enter description of CBDC" 
            name="description" 
            value={description}
            onChange={ handleTextChange }
          />
        </Form.Group>

        {/* GROUP 6: NATION */}
        <Form.Group className="mb-3">
          <Form.Label>Nation of Reserve Bank for DC</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter nation of the CBDC" 
            name="nation" 
            value={nation} 
            onChange={ handleTextChange }
          />
        </Form.Group>

        {/* GROUP 7A: CONDITIONAL PREVIEW OF IMAGE (File in DB) */}
        { preview && !loading && 
          <div className="text-center mt-2 mb-5">
            <h6>Current Image</h6>
            <PreviewImage src={image} alt="preview"/>
          </div>
        }

        {/* GROUP 7B: IMAGE UPLOAD */}
        <Form.Group className="mb-3" controlId="image">
          <Form.Label>CBDC Image</Form.Label>
          <Form.Control 
            type="file"
            className="mb-4"
            onChange={ handleFileChange }
          />
        </Form.Group>

        {/* SUBMIT BUTTON */}
        <CFButton loadingState={loading}>
          {loading ? '...' : 'Submit'}
        </CFButton>
      </Form>
    </CFCard>
    </Styles>
  )
}

export default EditCurrency