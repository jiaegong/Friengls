import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';
import { emailForm, pwdForm } from '../shared/common';

const Signup = (props) => {
  const dispatch = useDispatch();
  //유저정보를 저장할 form
  const [form, setForm] = useState({
    userEmail: '',
    userName: '',
    pwd: '',
    pwdCheck: '',
    isTutor: '',
    userProfile: '',
    tag: '',
    language: '',
    contents: '',
    startTime: '',
    endTime: '',
  });

  //각각 input에 입력한 값을 넣기 위한 함수
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  //이메일 중복체크
  const emailCheck = () => {
    if (!emailForm(form.userEmail)) {
      window.alert('이메일 형식이 아닙니다.');
      return;
    }
    console.log('중복확인할 이메일', form.userEmail);
  };

  //닉네임 중복체크
  const nameCheck = () => {
    console.log('중복확인할 닉네임', form.userName);
  };

  //DetailInfo페이지로 넘어가기 위한 함수
  const toDetailInfo = () => {
    //1차로 유효성검사 필요하다.
    //비밀번호
    if (!pwdForm(form.pwd)) {
      window.alert('비밀번호 규칙: 영어 대소문자, 숫자, 특수문자 포함 8-20자');
      return;
    }

    if (form.pwd !== form.pwdCheck) {
      window.alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

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
          <button onClick={emailCheck}>중복확인</button>
        </div>
        <div>
          <input
            placeholder="닉네임"
            type="text"
            name="userName"
            value={form.userName}
            onChange={handleChange}
          />
          <button onClick={nameCheck}>중복확인</button>
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
