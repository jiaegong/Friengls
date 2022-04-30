import React, { useState } from 'react';
import styled from 'styled-components';
import { history } from '../redux/configureStore';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';
import { KAKAO_AUTH_URL } from '../shared/OAuth';

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
    console.log('보낼 데이터', form);
    dispatch(userActions.loginDB(form));
  };

  //카카오 로그인
  // const CLIENT_ID = "a460e0fb29f8d9d785fbf3641185281b";
  // const REDIRECT_URI = "http://주소/auth/kakao/callback";
  // const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

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
      <a href={KAKAO_AUTH_URL}>
        <img src="kakaoLogin.png" alt="카카오 로그인 버튼" />
      </a>
      <button>구글로그인</button>
    </Container>
  );
};

const Container = styled.div`
  width: 50vw;
  margin: auto;
`;

export default Login;
