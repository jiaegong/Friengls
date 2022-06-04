//소셜로그인 리다이렉트 화면
import React from 'react';
import { history } from '../redux/configureStore';
import Signup from './Signup';
import { setCookie } from '../shared/Cookie';

const SocialLogin = (props) => {
  //서버로부터 받은 소셜로그인 관련 유저정보를 파라미터값에서 추출
  const userEmail = new URL(window.location.href).searchParams.get('userEmail');
  const userName = new URL(window.location.href).searchParams.get('userName');
  // 이미 가입된 회원은 토큰이 들어온다.
  const token = new URL(window.location.href).searchParams.get('token');
  //회원가입 시 필요한 유저정보
  const userInfo = { userEmail: userEmail, userName: userName };

  //토큰이 있을 때는 쿠키에 저장 후 바로 메인으로 이동해 유저정보 받아오기
  if (token) {
    setCookie('token', token);
  }
  React.useEffect(() => {
    if (token) {
      history.replace('/');
    }
  }, []);

  return <Signup userInfo={userInfo} />;
  // 유저정보 받을 때 까지 스피너로 바꿔줄 것
};

export default SocialLogin;
