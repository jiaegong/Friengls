import React, { useState } from 'react';
import styled from 'styled-components';
import { history } from '../redux/configureStore';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
// 모듈
import { actionCreators as userActions } from '../redux/modules/user';
import { emailForm, pwdForm } from '../utils/validation';

// 엘리먼트
import { Button, InfoInput } from '../elements';

//아이콘
import { Logo } from '../asset/image/';

const Login = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  //userEmail 입력값 저장
  const [userEmail, setUserEmail] = useState('');
  const handleUserEmail = (e) => {
    setUserEmail(e.target.value);
  };
  //pwd 입력값 저장
  const [pwd, setPwd] = useState('');
  const handlePwd = (e) => {
    setPwd(e.target.value);
  };

  //입력된 값을 data로 보내기 위한 함수
  const login = () => {
    //유효성검사
    if (!emailForm(userEmail)) {
      new Swal(t('email: abc@abc.com'));
      return;
    }
    if (!pwdForm(pwd)) {
      new Swal(
        t(
          'password: english upper case, number, special character between 8 and 20 characters',
        ),
      );
      return;
    }
    const loginForm = { userEmail: userEmail, pwd: pwd };
    console.log('보낼 데이터', loginForm);
    dispatch(userActions.loginDB(loginForm));
  };

  // 소셜로그인
  const kakaoLogin = () => {
    const kakaoApi = `https://hjg521.link/auth/kakao`;
    window.location.assign(kakaoApi);
  };

  const googleLogin = () => {
    const googleApi = `https://hjg521.link/auth/google`;
    window.location.assign(googleApi);
  };

  const returnLogin = (e) => {
    if (e.keyCode === 13) {
      login();
    }
  };

  return (
    <Container>
      {/* 로고 */}
      <LogoBox>
        <img src={Logo} alt="logo" style={{ width: '100%' }} />
      </LogoBox>
      <LogoText>Sign in</LogoText>
      <form>
        {/* 이메일 인풋 */}
        <InfoInput
          type="text"
          name="userEmail"
          _onChange={handleUserEmail}
          placeholder={t('please enter your email address')}
        />
        {/* 비밀번호 인풋 */}
        <InfoInput
          placeholder={t('please enter your password')}
          type="password"
          autoComplete="off"
          name="pwd"
          _onChange={handlePwd}
          _onKeyUp={returnLogin}
        />
        {/* 로그인 버튼 */}
        <Button
          type="button"
          styles={{
            margin: '50px auto 60px',
          }}
          _onClick={login}
        >
          {t('login')}
        </Button>
      </form>
      {/* 소셜로그인 버튼*/}
      <Button
        type="button"
        _onClick={kakaoLogin}
        styles={{ background: '#ffe900', color: '#3c1e1e' }}
      >
        {t('login with kakao')}
      </Button>
      <Button
        type="button"
        _onClick={googleLogin}
        styles={{
          margin: '10px auto 50px',
          background: '#fff',
          color: '#3c1e1e',
        }}
      >
        {t('login with google')}
      </Button>
      {/* 회원가입 버튼 */}
      <LoginText>{t('do not have an account yet?')}</LoginText>
      <Button
        _onClick={() => history.push('/signup')}
        styles={{
          background: '#fff',
          border: '1px solid #171b78',
          color: '#171b78',
        }}
      >
        {t('signup')}
      </Button>
    </Container>
  );
};

const Container = styled.div`
  width: 500px;
  margin: 50px auto 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  form {
    width: 100%;
  }
`;

const LogoBox = styled.div`
  width: 96px;
  height: 80px;
  margin: 0 auto 10px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
`;

const LogoText = styled.p`
  margin-bottom: 50px;
  font-size: 20px;
  font-weight: 700;
  color: #153587;
  cursor: default;
`;

const LoginText = styled.p`
  margin-bottom: 20px;
  font-size: 14px;
  cursor: default;
`;

export default Login;
