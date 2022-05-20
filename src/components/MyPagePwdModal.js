import React, { useState } from 'react';
import Portal from '../shared/Portal';
import styled from 'styled-components';
import { Buttons, InputBox, Inputs } from '../elements/index';
import EditUser from './EditUser';

const MyPagePwdModal = (props) => {
  const { onClose, userInfo } = props;

  //비밀번호 검증 될 경우 editUser컴포넌트 렌더링
  const [editUser, setEditUser] = useState(false);
  const handleEditUser = () => {
    setEditUser(true);
  };

  return (
    <Portal>
      <Background>
        {editUser ? (
          <EditUser onClose={onClose} userInfo={userInfo} />
        ) : (
          <Content>
            <CloseBtnBox>
              <CloseBtn onClick={onClose}>X</CloseBtn>
            </CloseBtnBox>
            <Grid>
              <p>본인확인</p>
            </Grid>
            <Grid>
              <UserImg>
                <img className="userImg" src={userInfo.userProfile} alt="" />
              </UserImg>
            </Grid>
            <Grid>
              <div>
                <Inputs
                  placeholder={'이메일'}
                  styles={{ margin: '0 0 20px 0' }}
                  value={userInfo.userEmail}
                  disabled
                />
              </div>
              <div>
                <Inputs placeholder={'비밀번호'} />
              </div>
            </Grid>
            <Grid>
              <Buttons _onClick={handleEditUser}>프로필 수정하기</Buttons>
            </Grid>
          </Content>
        )}
      </Background>
    </Portal>
  );
};

export default MyPagePwdModal;

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
  cursor: pointer;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
`;

const Grid = styled.div`
  margin-bottom: 60px;

  p {
    font-size: 40px;
    font-weight: 700;
  }
`;

const UserImg = styled.div`
  width: 240px;
  height: 240px;
  margin: auto;
  border-radius: 50%;
  overflow: hidden;

  .userImg {
    width: 240px;
    height: 240px;
  }
`;
