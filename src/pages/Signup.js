import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

const Signup = (props) => {
  const dispatch = useDispatch();
  //유저정보를 저장할 form
  const [form, setForm] = useState({
    userEmail: '',
    userName: '',
    pwd: '',
    pwdCheck: '',
    userType: '',
    userProfile: '',
    tag: '',
    contents: '',
  });

  //각각 input에 입력한 값을 넣기 위한 함수
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target.value);

    setForm({ ...form, [name]: value });
  };

  //DetailInfo페이지로 넘어가기 위한 함수
  const toDetailInfo = () => {
    //1차로 유효성검사 필요하다.
    console.log('보낼 데이터', form);
    dispatch(userActions.signupDB(form));
  };

  return (
    <Container>
      <RequiredInfo>
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
            placeholder="닉네임"
            type="text"
            name="userName"
            value={form.userName}
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
          <input
            placeholder="비밀번호확인"
            type="text"
            name="pwdCheck"
            value={form.pwdCheck}
            onChange={handleChange}
          />
        </div>
        <div>
          <button onClick={toDetailInfo}>다음</button>
        </div>
        {/* 수정필요: 버튼눌러서 데이터 다 넘겨서 다시 받아오면 넘어갈 수 있도록 */}
      </RequiredInfo>
    </Container>
  );
};

const Container = styled.div`
  width: 50vw;
  margin: auto;
`;

const RequiredInfo = styled.div``;

export default Signup;
