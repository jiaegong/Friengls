import React from 'react';
import Portal from './Portal';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { actionCreators as reviewActions } from '../redux/modules/review';
import { Flex, Text, Input, Button } from '../elements/index';

const ReviewModal = ({ onClose }) => {
  const [rate, setRate] = React.useState();
  const [text, setText] = React.useState();
  const onChange = (e) => {
    setText(e.target.value);
  };

  const dispatch = useDispatch();

  // 넘겨줘야 할 것: 작성자 아이디(쿠키), 선생님 아이디, 평점, 내용
  const addReview = () => {
    dispatch(reviewActions.addReviewDB(rate, text));
    setText(''); // 작성하고 나서 칸 비워주기
  };
  return (
    <Portal>
      <Background>
        <Content>
          <Flex
            styles={{
              flexDirection: 'column',
              width: '200px',
              height: '300px',
              background: '#f9f9f9',
            }}
          >
            <Text>리뷰 남기기</Text>
            <Flex styles={{ flexDirection: 'row' }}>
              {Array.from({ length: 5 }, (c, idx) => {
                return (
                  <Flex
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
              multiLine
              placeholder="튜터링은 어땠나요?"
              onChange={onChange}
              value={text}
            />
            <Flex>
              <Button _onClick={addReview}>등록하기</Button>
              <Button>돌아가기</Button>
            </Flex>
          </Flex>
        </Content>
      </Background>
    </Portal>
  );
};

const Background = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
`;

const Content = styled.div`
  width: 95%;
  height: 100%;
  margin-top: 70px;
  position: relative;
  overflow: auto;
  background-color: #141414;
`;
export default ReviewModal;
