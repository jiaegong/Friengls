import React from 'react';
import Portal from '../shared/Portal';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { actionCreators as reviewActions } from '../redux/modules/review';
import { Text, Input, Button } from '../elements/index';
import { getCookie } from '../shared/Cookie';
import { AiFillStar } from 'react-icons/ai';

const ReviewModal = ({ onClose }) => {
  const dispatch = useDispatch();

  const token = getCookie('token');
  const tutorName = 'yoonha3331'; // 튜터 이름 나중에 props로 받아오기
  const [rate, setRate] = React.useState('');
  const [text, setText] = React.useState('');
  const onChange = (e) => {
    setText(e.target.value);
  };

  const addReview = () => {
    dispatch(reviewActions.addReviewDB(token, tutorName, rate, text));
    setRate('');
    setText('');
  };
  return (
    <Portal>
      <Background
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <Content onClick={(e) => e.stopPropagation()}>
          <ReviewWrap>
            <Text>리뷰 남기기</Text>
            <RateWrap>
              {Array.from({ length: 5 }, (c, idx) => {
                return (
                  <AiFillStar
                    size={20}
                    key={idx}
                    onClick={() => {
                      setRate(idx + 1);
                    }}
                    style={{
                      color: rate < idx + 1 ? '#ddd' : '#ffdf65',
                    }}
                  />
                );
              })}
            </RateWrap>
            <textarea
              className="review-text"
              placeholder="튜터링은 어땠나요?"
              onChange={onChange}
              value={text}
            />
            <Buttons>
              <button className="add-review" onClick={addReview}>
                등록하기
              </button>
              <p className="skip-review" onClick={() => onClose()}>
                건너뛰기
              </p>
            </Buttons>
          </ReviewWrap>
        </Content>
      </Background>
    </Portal>
  );
};

export default ReviewModal;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 9998;
  background-color: rgba(0, 0, 0, 0.4);
`;

const Content = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 30px;
  width: 400px;
  height: 500px;
  border-radius: 10px;
  background: #f9f9f9;
`;

const ReviewWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 100%;

  .review-text {
    width: 100%;
    height: 100%;
    outline-color: #171b78;
    border: 1px solid #171b78;
  }
`;

const RateWrap = styled.div`
  display: flex;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .add-review {
    background-color: #171b78;
    color: #fff;
    padding: 5px;
    width: 340px;
  }

  .skip-review {
    cursor: pointer;
    text-decoration: underline;
    color: #808080;
    font-size: 14px;
    padding: 5px;
    margin: 0 auto;
  }
`;
