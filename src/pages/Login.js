import React, { useState } from 'react';
import styled from 'styled-components';
import { history } from '../redux/configureStore';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';
import { KAKAO_AUTH_URL, GOOGLE_AUTH_URL } from '../shared/OAuth';
import { emailForm, pwdForm } from '../shared/common';
import { Logo } from '../image/';
import { InputBox, Inputs, Buttons } from '../elements';

const Login = (props) => {
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

  return (
    <Container>
      <LogoBox>
        <img src={Logo} alt="userProfileImage" />
      </LogoBox>
      <LogoText>Sign in</LogoText>
      {/* 이메일 인풋 */}
      <InputBox>
        <Inputs
          placeholder="이메일을 입력해 주세요."
          type="text"
          name="userEmail"
          value={userEmail}
          _onChange={handleUserEmail}
        />
      </InputBox>
      {/* 비밀번호 인풋 */}
      <InputBox>
        <Inputs
          placeholder="비밀번호를 입력해 주세요."
          type="text"
          name="pwd"
          value={pwd}
          _onChange={handlePwd}
          styles={{}}
        />
      </InputBox>
      {/* 로그인 버튼 */}
      <Buttons
        styles={{
          margin: '80px auto 60px',
        }}
        _onClick={login}
      >
        Login
      </Buttons>
      {/* 소셜로그인 버튼*/}
      <KakaoButton href={KAKAO_AUTH_URL}>카카오 계정으로 로그인</KakaoButton>
      <GoogleButton href={GOOGLE_AUTH_URL}>구글 계정으로 로그인</GoogleButton>
      {/* 회원가입 버튼 */}
      <LoginText>아직 프링글즈 계정이 없으신가요 ?</LoginText>
      <Buttons
        _onClick={() => history.push('/signup')}
        styles={{
          background: '#fff',
          border: '1px solid #171b78',
          color: '#171b78',
        }}
      >
        회원 가입
      </Buttons>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 800px;
  margin: 200px auto;
`;

const LogoText = styled.p`
  margin-bottom: 60px;
  font-size: 44px;
  font-weight: 700;
  color: #153587;
`;

const LogoBox = styled.div`
  width: 97px;
  height: 60px;
  margin: 0 auto 20px;
  overflow: hidden;

  img {
  }
`;

const KakaoButton = styled.a`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffe900;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  font-size: 24px;
  font-weight: 600;
  text-decoration: none;
  color: #3c1e1e;
`;

const GoogleButton = styled.a`
  width: 100%;
  height: 80px;
  margin: 20px auto 66px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  font-size: 24px;
  font-weight: 600;
  text-decoration: none;
  color: #3c1e1e;
`;

const LoginText = styled.p`
  height: 27px;
  margin-bottom: 20px;
  font-size: 20px;
`;

export default Login;
