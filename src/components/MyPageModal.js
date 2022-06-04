import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import EditUser from './EditUser';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';

// 컴포넌트
import Portal from '../shared/Portal';
import { getCookie } from '../shared/Cookie';

// 아이콘
import { Profile, CloseIcon } from '../asset/image/index';
import { Button, InfoInput } from '../elements/index';

const MyPageModal = (props) => {
  const { t } = useTranslation();
  const { onClose, userInfo } = props;

  const [pwd, setPwd] = useState('');
  const handlePwd = (e) => {
    setPwd(e.target.value);
  };
  const accessInfo = pwd;

  //비밀번호 검증 될 경우 editUser컴포넌트 렌더링
  const [editUser, setEditUser] = useState(false);
  const handleEditUser = async () => {
    if (pwd.split('').filter((word) => word !== ' ').length === 0) {
      new Swal(t('please fill in a password.'));
      return;
    }
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
      console.log(result);

      result === 'success'
        ? setEditUser(true)
        : new Swal(t('the password is incorrect.'));
    } catch (err) {
      console.log(err);
    }
  };
  const returnHandleEditUser = (e) => {
    if (e.keyCode === 13) {
      handleEditUser();
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
      <Background onClick={onClose}>
        {editUser ? (
          <EditUser
            onClose={onClose}
            userInfo={userInfo}
            accessInfo={accessInfo}
          />
        ) : (
          <ContentWrap onClick={(e) => e.stopPropagation()}>
            <Content>
              <CloseBtn onClick={onClose}>
                <img src={CloseIcon} alt="close" />
              </CloseBtn>
              <Grid>
                <p>{t('identification')}</p>
              </Grid>
              <Grid>
                <UserImg userProfile={userInfo.userProfile ? true : false}>
                  <img
                    src={userInfo.userProfile ? userInfo.userProfile : Profile}
                    alt="userProfile"
                  />
                </UserImg>
              </Grid>
              <form>
                <Grid>
                  {/* 이메일 */}
                  <InfoInput
                    label={t('email')}
                    value={userInfo.userEmail}
                    disabled
                    styles={{
                      flexDirection: 'column',
                      justifyContent: 'space-evenly',
                      background: 'rgba(0,0,0,0.05)',
                      color: '#999',
                    }}
                  />
                  <></>
                  {/* 비밀번호 */}
                  <InfoInput
                    label={t('password')}
                    type="password"
                    autoComplete="off"
                    _onChange={handlePwd}
                    _onKeyUp={returnHandleEditUser}
                    placeholder={t('please enter your password')}
                    styles={{
                      flexDirection: 'column',
                      justifyContent: 'space-evenly',
                    }}
                  />
                </Grid>
                <Grid>
                  <Button
                    type="button"
                    _onClick={handleEditUser}
                    styles={{ height: '54px' }}
                  >
                    {t('edit profile')}
                  </Button>
                </Grid>
              </form>
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
  position: relative;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
`;

const Content = styled.div`
  width: 340px;
  height: 625px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  form {
    width: 100%;
  }
`;

const CloseBtn = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 30px;
  left: 30px;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
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
    object-fit: ${(props) => (props.userProfile ? 'cover' : 'contain')};
  }
`;
