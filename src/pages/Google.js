//카카오소셜로그인 리다이렉트 화면
import React from 'react';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

const Google = (props) => {
  const dispatch = useDispatch();
  //인가코드
  let code = new URL(window.location.href).searchParams.get('code');
  //서버랑 얘기해서 구글 카카오 절차 똑같으면 액션합치기, 다르면 액션 따로만들기

  React.useEffect(async () => {
    await dispatch(userActions.kakaoLogin(code));
  }, []);

  return <p>구글 소셜로그인 중 입니다.</p>;
  //   스피너로 바꿔줄 것
};

export default Google;
