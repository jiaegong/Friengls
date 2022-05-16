import React from 'react';
import Portal from './Portal';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { actionCreators as reviewActions } from '../redux/modules/review';
import { Flex, Text, Input, Button } from '../elements/index';
import { getCookie } from '../shared/Cookie';

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
          <Flex
            styles={{
              flexDirection: 'column',
            }}
          >
            <Text>리뷰 남기기</Text>
            <Flex styles={{ flexDirection: 'row' }}>
              {Array.from({ length: 5 }, (c, idx) => {
                return (
                  <Flex
                    key={idx}
                    _onClick={() => {
                      setRate(idx + 1);
                    }}
                    styles={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '30px',
                      margin: '5px',
                      backgroundColor: rate < idx + 1 ? '#ddd' : '#000',
                    }}
                  />
                );
              })}
            </Flex>
            <Input
              styles={{ width: '100%', height: '200px' }}
              multiLine
              placeholder="튜터링은 어땠나요?"
              _onChange={onChange}
              value={text}
            />
            <Flex>
              <Button _onClick={addReview}>등록하기</Button>
              <Button _onClick={() => onClose()}>돌아가기</Button>
            </Flex>
          </Flex>
        </Content>
      </Background>
    </Portal>
  );
};

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.4);
`;

const Content = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  align-items: center;
  justify-content: center;
  z-index: 999;
  padding: 30px;
  width: 300px;
  height: 400px;
  border-radius: 10px;
  background: #f9f9f9;
`;
export default ReviewModal;
