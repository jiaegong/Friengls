import React from 'react';
import styled from 'styled-components';
import { FeedBackIcon } from '../image/index';

const FeedBack = (props) => {
  const notice = () => {
    window.alert('피드백');
  };
  return (
    <FeedBackBox onClick={notice}>
      <img src={FeedBackIcon} />
    </FeedBackBox>
  );
};

const FeedBackBox = styled.div`
  bottom: 30px;
  left: 30px;
  position: fixed;
  cursor: pointer;
`;

export default FeedBack;
