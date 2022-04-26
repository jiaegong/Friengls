import React from 'react';
import styled from 'styled-components';

const Main = () => {
  return (
    <Wrap>
      <div className="innerWrap">
        <h1>Main</h1>
      </div>
    </Wrap>
  );
};

export default Main;

const Wrap = styled.div`
  width: 100%;
  min-height: 905px;

  background: #aaa;

  .innerWrap {
    width: 90%;
    max-width: 1400px;
    height: 910px;
    margin: auto;

    background: #eee;
  }
`;
