import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <Wrap>
      <div className="innerWrap">
        <h1>Footer</h1>
      </div>
    </Wrap>
  );
};

export default Footer;

const Wrap = styled.div`
  width: 100%;
  height: 100px;
  background: #aaa;

  .innerWrap {
    width: 90%;
    max-width: 1400px;
    height: 100%;
    margin: auto;
    padding: 30px 16px 0;

    background: #eee;

    h1 {
      text-align: center;
      font-size: 30px;
    }
  }
`;
