import React, { useState } from 'react';
import styled from 'styled-components';
import { FeedBackIcon } from '../image/index';
import { Buttons } from '../elements';

const FeedBack = ({ _onClick }) => {
  const [feedbackOn, setFeedbackOn] = useState(false);
  const handleFeedback = () => {
    setFeedbackOn(!feedbackOn);
  };

  return (
    <React.Fragment>
      <FeedBackBox onClick={handleFeedback}>
        <img src={FeedBackIcon} />
      </FeedBackBox>
      {feedbackOn && (
        <Div>
          <A href="https://forms.gle/Q2cRMo4xN4ZvUgpu9" target="_blank">
            <Buttons
              styles={{
                width: '200px',
                height: '40px',
                // background: '#018ABE',
                background: '#7f83ea',
                position: 'fixed',
                bottom: '143px',
                right: '50px',
              }}
            >
              소중한 의견을 남겨주세요!
            </Buttons>
          </A>
        </Div>
      )}
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
  &:after {
    content: '';
    position: fixed;
    right: 55px;
    bottom: 130px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 15px solid #7f83ea;
  }
`;

const A = styled.a`
  font-size: 14px;
  color: #fff;
  text-decoration: none;
`;

export default FeedBack;
