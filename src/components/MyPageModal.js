import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Portal from '../shared/Portal';
import EditUser from './EditUser';
import { Profile, CloseIcon } from '../image/index';
import { Buttons, InputBox, InputLabel, Inputs } from '../elements/index';
import { getCookie } from '../shared/Cookie';
import InfoInput from './InfoInput';

const MyPageModal = (props) => {
  const { onClose, userInfo } = props;

  const [pwd, setPwd] = useState('');
  const handlePwd = (e) => {
    setPwd(e.target.value);
  };
  const accessInfo = pwd;

  //비밀번호 검증 될 경우 editUser컴포넌트 렌더링
  const [editUser, setEditUser] = useState(false);
  const handleEditUser = async () => {
    try {
      const response = await axios({
        method: 'post',
        url: 'https://hjg521.link/myPage/pwdCheck',
        headers: { token: `${getCookie('token')}` },
        data: {
          pwd: pwd,
        },
      });
      const result = response.data.msg;

      result === 'success'
        ? setEditUser(true)
        : window.alert('비밀번호가 틀립니다.');
    } catch (err) {
      console.log(err);
    }
  };
  // 모달 켜질 때 페이지 스크롤 막기
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <Portal>
      <Background>
        {editUser ? (
          <EditUser
            onClose={onClose}
            userInfo={userInfo}
            accessInfo={accessInfo}
          />
        ) : (
          <ContentWrap>
            <Content>
              <CloseBtnBox>
                <CloseBtn onClick={onClose}>
                  <img src={CloseIcon} alt="close" />
                </CloseBtn>
              </CloseBtnBox>
              <Grid>
                <p>본인확인</p>
              </Grid>
              <Grid>
                <UserImg>
                  <img
                    src={userInfo.userProfile ? userInfo.userProfile : Profile}
                    alt="userProfile"
                  />
                </UserImg>
              </Grid>
              <Grid>
                {/* 닉네임 */}
                <InfoInput
                  label="이메일"
                  value={userInfo.userEmail}
                  disabled
                  styles={{
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                  }}
                />
                {/* 비밀번호 */}
                <InputBox
                  styles={{
                    width: '60%',
                    height: 'auto',
                    margin: '0 auto',
                    padding: '6px 12px',
                  }}
                >
                  <InputLabel
                    styles={{
                      fontSize: '12px',
                      height: '14px',
                      marginBottom: '4px',
                    }}
                  >
                    비밀번호
                  </InputLabel>
                  <Inputs
                    _onChange={handlePwd}
                    placeholder={'비밀번호를 입력해 주세요.'}
                    styles={{
                      width: '100%',
                      height: '33px',
                      fontSize: '16px',
                      fontWeight: '600',
                    }}
                  />
                </InputBox>
              </Grid>

              <Grid>
                <Buttons
                  _onClick={handleEditUser}
                  styles={{ width: '300px', height: '54px', fontSize: '16px' }}
                >
                  프로필 수정하기
                </Buttons>
              </Grid>
            </Content>
          </ContentWrap>
        )}
      </Background>
    </Portal>
  );
};

export default MyPageModal;

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

const ContentWrap = styled.div`
  width: 800px;
  height: 700px;
  // min-height: 800px;
  position: relative;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
`;

const Content = styled.div`
  width: 340px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  cursor: pointer;
`;

const Grid = styled.div`
  margin-bottom: 40px;

  p {
    font-size: 20px;
    font-weight: 700;
  }
`;

const UserImg = styled.div`
  width: 180px;
  height: 180px;
  margin: auto;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
`;
