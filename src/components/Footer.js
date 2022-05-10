import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  if (
    '/login' === window.location.pathname ||
    '/signup' === window.location.pathname ||
    '/signup/detail' === window.location.pathname
  )
    return null;

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
  height: 340px;
  background: #262626;

  .innerWrap {
    width: 100%;
    max-width: 1432px;
    height: 100%;
    margin: auto;
    padding: 0px 16px 0;
    display: flex;
    align-items: center;
    justify-content: center;

    /* background: #8d8d8d71; */

    h1 {
      text-align: center;
      color: #fff;
      font-size: 70px;
    }
  }
`;
