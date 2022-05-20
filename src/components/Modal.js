import React from 'react';
import Portal from '../shared/Portal';
import styled from 'styled-components';

const Modal = (props) => {
  const { onClose } = props;
  return (
    <Portal>
      <Background>
        <Content>
          <div>모달입니다.</div>
          <button onClick={onClose}>닫기</button>
        </Content>
      </Background>
    </Portal>
  );
};

export default Modal;

//아래는 styled-components를 통한 스타일링

const Background = styled.div`
  height: 100%;
  width: 100%;
  background: red;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  text-align: center;
`;

const Content = styled.div`
  //   height: 100px;
  width: 950px;
  margin-top: 70px;
  position: relative;
  // overflow: scroll;
  background: #aaa;
`;
