import React from 'react';
import ModalPortal from './Portal';
import styled from 'styled-components';

const Modal = ({ onClose }) => {
  return (
    <ModalPortal>
      <Background>
        <Content>
          <div>모달입니다.</div>
        </Content>
      </Background>
    </ModalPortal>
  );
};

export default Modal;

//아래는 styled-components를 통한 스타일링

const Background = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  text-align: center;
`;

const Content = styled.div`
  height: 100%;
  width: 950px;
  margin-top: 70px;
  position: relative;
  overflow: scroll;
  background: #141414;
`;
