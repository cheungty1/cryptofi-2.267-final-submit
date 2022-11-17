// Import react modules:
import React, { useState } from 'react';

// External packages - Import npm packages
import { useNavigate } from 'react-router-dom';

// Import custom form components from React Bootstrap
import { Row, Col, Form, InputGroup } from 'react-bootstrap';

// Import custom modules
import currencyService from '../../services/currencyService';
import CFCard from '../../components/common/CFCard';
import CFButton from '../../components/common/CFButton';
import styled from 'styled-components';

const Styles = styled.div`
.form-control {
  border-radius: 100rem;
}
`;

const AddCurrency = () => {
  // HOOK: SETTING COMPONENT STATE (& init values)
  const [currencyData, setCurrencyData] = useState({
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
  const [loading, setLoading] = useState(false);

  // Destructure data state nested object properties & instance of useNavigate class
  const { name, symbol, current_price, price_change_24h, price_change_percentage_24h, high_24h, low_24h, status, total_volume, description, nation } = currencyData;
  const navigate = useNavigate();

  // FORM FUNCTIONS
  // [1] handleTextChange will handle change in state value event for TEXT data
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setCurrencyData({
      ...currencyData,             // Spread/copy the object to prevent it being overwritten by new state
      [name]: value        // Overwrite the values of the fields (which match the "name" attribute) to update
    });
  }

  // [2] handleFileChange will handle change in state for the file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCurrencyData({
      ...currencyData, 
      image: file
    });
  }

  // [3] handleSubmit will control form submission event
  const handleSubmit = async (e) => {
    e.preventDefault();      
    setLoading(true);
    try {
      // API Post (refactored)
      const response = await currencyService.post(currencyData);
      console.log(response);
      navigate('/currency/prices');

    } catch (err) {
      console.log(err?.response);
      window.scroll({top: 0, left: 0, behavior: 'smooth' });
    }
    setLoading(false);
  };

  return (
    <Styles>
    <CFCard title="Add Currency">
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

            {/* 3C: PRICE CHANGE % 24HR */}
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

            {/* 3D: HIGH 24HR CBDC PRICE */}
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

            {/* 3E: LOW 24HR CBDC PRICE */}
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

        {/* 4: VOLUME */}
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

        {/* GROUP 5: CBDC STATUS */}
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

        {/* GROUP 6: DESCRIPTION */}
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

        {/* GROUP 7: NATION */}
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

        {/* GROUP 8: IMAGE */}
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

// Export function
export default AddCurrency