import React, { useState } from 'react';
import styled from 'styled-components';
import { history } from '../redux/configureStore';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';
import { emailForm, pwdForm } from '../shared/common';
import { Logo } from '../image/';
import { Buttons } from '../elements';
import InfoInput from '../components/InfoInput';
import { useTranslation } from 'react-i18next';
// import MySwal from '../components/MySwal';

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
      window.alert('이메일: abc@abc.abc형식의 이메일');
      return;
    }
    if (!pwdForm(pwd)) {
      window.alert('비밀번호: 8-20자 사이의 영어대소문자, 숫자, 특수문자');
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

  console.log(pwd);

  return (
    <Container>
      {/* <MySwal /> */}
      {/* 로고 */}
      <LogoBox>
        <img src={Logo} alt="logo" style={{ width: '100%' }} />
      </LogoBox>
      <LogoText>Sign in</LogoText>
      {/* 이메일 인풋 */}
      <InfoInput
        type="text"
        name="userEmail"
        _onChange={handleUserEmail}
        placeholder={t('please fill in email address')}
      />
      {/* 비밀번호 인풋 */}
      <InfoInput
        placeholder={t('please fill in password')}
        type="password"
        name="pwd"
        _onChange={handlePwd}
      />
      {/* 로그인 버튼 */}
      <Buttons
        styles={{
          margin: '50px auto 60px',
        }}
        _onClick={login}
      >
        {t('login')}
      </Buttons>
      {/* 소셜로그인 버튼*/}
      <Buttons
        _onClick={kakaoLogin}
        styles={{ background: '#ffe900', color: '#3c1e1e' }}
      >
        {t('login with kakao')}
      </Buttons>
      <Buttons
        _onClick={googleLogin}
        styles={{
          margin: '10px auto 50px',
          background: '#fff',
          color: '#3c1e1e',
        }}
      >
        {t('login with google')}
      </Buttons>
      {/* 회원가입 버튼 */}
      <LoginText>{t('do not have an account yet?')}</LoginText>
      <Buttons
        _onClick={() => history.push('/signup')}
        styles={{
          background: '#fff',
          border: '1px solid #171b78',
          color: '#171b78',
        }}
      >
        {t('signup')}
      </Buttons>
    </Container>
  );
};

const Container = styled.div`
  width: 500px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
