import React from 'react';
import styled from 'styled-components';

const Signup = (props) => {
  return (
    <Container>
      <div>
        <input placeholder="아이디" />
      </div>
      <div>
        <input placeholder="닉네임" />
      </div>

      <div>
        <input placeholder="비밀번호" />
      </div>
      <div>
        <input placeholder="비밀번호확인" />
      </div>
      <span>쌤(ssaem)</span>
      <input type="checkbox" name="쌤" value="쌤" />
      <span>생(saeng)</span>
      <input type="checkbox" name="학생" value="학생" />
      <div>
        <button>회원가입</button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 50vw;
  margin: auto;
`;

export default Signup;
