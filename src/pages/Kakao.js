//카카오소셜로그인 리다이렉트 화면
import React from 'react';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

const Kakao = (props) => {
  const dispatch = useDispatch();
  //인가코드
  let code = new URL(window.location.href).searchParams.get('code');
  console.log(code);

  React.useEffect(async () => {
    console.log('리다이렉트useEffect시작');
    await dispatch(userActions.kakaoLogin(code));
  }, []);

  return <p>로그인 중 입니다.</p>;
  //   스피너로 바꿔줄 것
};

export default Kakao;
