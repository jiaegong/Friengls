import React, { useState } from 'react';
import styled from 'styled-components';
import { history } from '../redux/configureStore';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';
import { KAKAO_AUTH_URL, GOOGLE_AUTH_URL } from '../shared/OAuth';
import { emailForm, pwdForm } from '../shared/common';
import { HomeIcon, BackIcon, GoogleLoginIcon, KakaoLoginIcon } from '../image/';
import { Grid, Flex, Input, Button, Text, Icon } from '../elements';

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
    <Wrap>
      <InputContainer>
        <Input
          placeholder="Email"
          type="text"
          name="userEmail"
          value={userEmail}
          _onChange={handleUserEmail}
          styles={{
            width: '240px',
            height: '40px',
            borderRadius: '10px',
            textAlign: 'center',
            fontSize: '12px',
            fontWeight: 700,
          }}
        />
        <Input
          placeholder="Password"
          type="text"
          name="pwd"
          value={pwd}
          _onChange={handlePwd}
          styles={{
            width: '240px',
            height: '40px',
            borderRadius: '10px',
            textAlign: 'center',
            fontSize: '12px',
            fontWeight: 700,
          }}
        />
      </InputContainer>
      <Button
        styles={{
          width: '120px',
          height: '40px',
          background: '#000',
          color: '#fff',
        }}
        _onClick={login}
      >
        Login
      </Button>
      <div>
        <Button _onClick={() => history.push('/signup')}>회원가입</Button>
      </div>
      {/* <A href={KAKAO_AUTH_URL}>
        <Img src={KakaoLoginIcon} alt="카카오 로그인 버튼" />
      </A>
      <A href={GOOGLE_AUTH_URL}>
        <Img src={GoogleLoginIcon} alt="구글 로그인 버튼" />
      </A> */}
    </Wrap>
  );
};

const Img = styled.img`
  // width: 100px;
  height: 50px;
`;

const A = styled.a`
  width: 100px;
  height: 50px;
`;

export default Login;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 430px;
  height: 500px;
  padding: 20px;
  border: 2px solid black;
  border-radius: 10px;
  margin: 60px auto;
  gap: 20px;
  box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.1);
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
