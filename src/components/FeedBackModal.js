import React, { useState } from 'react';
import styled from 'styled-components';

// 아이콘
import { FeedBackIcon } from '../asset/image/index';

const FeedBack = (props) => {
  const [feedback, setFeedback] = useState(false);
  const handleFeedbackOn = () => {
    setFeedback(true);
  };

  const handleFeedbackOff = () => {
    setFeedback(false);
  };

  return (
    <React.Fragment>
      <FeedBackBox
        onMouseOver={handleFeedbackOn}
        onMouseOut={handleFeedbackOff}
      >
        <div
          target="_blank"
          onClick={() => {
            window.open('https://forms.gle/Q2cRMo4xN4ZvUgpu9');
          }}
        >
          <img src={FeedBackIcon} alt="피드백 아이콘" />
        </div>
      </FeedBackBox>
      {feedback && <Div>소중한 의견을 남겨주세요!</Div>}
    </React.Fragment>
  );
};

const FeedBackBox = styled.div`
  bottom: 30px;
  right: 30px;
  position: fixed;
  cursor: pointer;
`;

const Div = styled.div`
  width: 200px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  background: #018abe;
  border: none;
  border-radius: 4px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  position: fixed;
  bottom: 143px;
  right: 50px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;

  &:after {
    content: '';
    position: fixed;
    right: 55px;
    bottom: 130px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 15px solid #018abe;
  }
`;

export default FeedBack;
