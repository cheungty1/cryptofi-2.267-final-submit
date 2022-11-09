import React from 'react';
import styled from 'styled-components';
import Spinner from 'react-bootstrap/Spinner'

const Styles = styled.div`
.spinner-box {
  height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Loader = () => {
  return (
    <Styles> 
    <div className="spinner-box">
    <Spinner animation="border"  />
    </div> 
    </Styles>
  )
}

export default Loader