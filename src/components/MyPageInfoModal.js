import React from 'react';
import Portal from '../shared/Portal';
import styled from 'styled-components';
import { modalOff } from '../redux/modules/modal';
import { useDispatch } from 'react-redux';
import { history } from '../redux/configureStore';

const MyPageInfoModal = (props) => {
  const { onClose, userInfo } = props;
  const dispatch = useDispatch();

  console.log(userInfo);

  return (
    <Portal>
      <Background>
        <Content>
          <div>인포모달입니다.</div>
          <CloseBtnBox>
            <CloseBtn
              onClick={history.replace(
                `/mypage/${userInfo.userName}/${userInfo.isTutor}`,
              )}
            >
              X
            </CloseBtn>
          </CloseBtnBox>
        </Content>
      </Background>
    </Portal>
  );
};

export default MyPageInfoModal;

//아래는 styled-components를 통한 스타일링

const Background = styled.div`
  height: 100%;
  width: 100%;
  background: rgb(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  text-align: center;
`;

const Content = styled.div`
  height: 954px;
  width: 1240px;
  // margin-top: 120px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);

  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  // overflow: scroll;
`;

const CloseBtnBox = styled.label`
  width: 50px;
  height: 50px;
  position: absolute;
  top: 40px;
  left: 40px;
  display: flex;
  justify-content: center;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 30px;
`;
