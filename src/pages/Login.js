import React from 'react';
import styled from 'styled-components';
import { history } from '../redux/configureStore';

const Login = (props) => {
  const {} = props;

  return (
    <Container>
      <div>
        <input placeholder="이메일(아이디" />
      </div>
      <div>
        <input placeholder="비밀번호" />
      </div>

      <div>
        <button>로그인</button>
      </div>
      <div>
        <button onClick={() => history.push('/signup')}>회원가입</button>
      </div>
      <button>카카오로그인</button>
      <button>구글로그인</button>
    </Container>
  );
};

const Container = styled.div`
  width: 50vw;
  margin: auto;
`;

export default Login;
