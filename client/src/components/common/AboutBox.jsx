import React from 'react';
import styled from 'styled-components';
import CFNavLink from './CFNavLink';

const Styles = styled.div`
  margin-top: 45px;

`;

const AboutBox = ({ title, content, content2, button}) => {
  return (
    <Styles>
      <h1>{title}</h1>
      <p>{content}</p>
      <p>{content2}</p>
      {button && (
        <div className="mt-4">
          <CFNavLink to={"/about"}>{button}</CFNavLink>
        </div>
      )}
    </Styles>
  )
}

export default AboutBox