import React, { useState } from 'react';
import styled from 'styled-components';
import { history } from '../redux/configureStore';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';
import { KAKAO_AUTH_URL, GOOGLE_AUTH_URL } from '../shared/OAuth';
import { emailForm, pwdForm } from '../shared/common';
import { GoogleLogin2, KakaoLogin1 } from '../image/';

const Login = (props) => {
  const dispatch = useDispatch();
  //로그인에 사용될 유저정보 form
  const [form, setForm] = useState({
    userEmail: '',
    pwd: '',
  });
  //각각 input에 입력한 값을 넣기 위한 함수
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };
  //입력된 값을 data로 보내기 위한 함수
  const login = () => {
    //1차로 유효성검사 필요하다.
    if (!emailForm(form.userEmail)) {
      window.alert('이메일: abc@abc.abc형식의 이메일');
      return;
    }
    if (!pwdForm(form.pwd)) {
      window.alert('비밀번호: 8-20자 사이의 영어대소문자, 숫자, 특수문자');
      return;
    }

    console.log('보낼 데이터', form);
    dispatch(userActions.loginDB(form));
  };

  return (
    <Container>
      <div>
        <input
          placeholder="이메일"
          type="text"
          name="userEmail"
          value={form.userEmail}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          placeholder="비밀번호"
          type="text"
          name="pwd"
          value={form.pwd}
          onChange={handleChange}
        />
      </div>

      <div>
        <button onClick={login}>로그인</button>
      </div>
      <div>
        <button onClick={() => history.push('/signup')}>회원가입</button>
      </div>
      <A href={KAKAO_AUTH_URL}>
        <Img src={KakaoLogin1} alt="카카오 로그인 버튼" />
      </A>
      <A href={GOOGLE_AUTH_URL}>
        <Img src={GoogleLogin2} alt="구글 로그인 버튼" />
      </A>
    </Container>
  );
};

const Container = styled.div`
  width: 50vw;
  margin: auto;
`;

const Img = styled.img`
  // width: 100px;
  height: 50px;
`;

const A = styled.a`
  width: 100px;
  height: 50px;
`;

export default Login;
