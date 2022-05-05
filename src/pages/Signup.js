import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';
import { emailForm, pwdForm, userNameForm } from '../shared/common';
import axios from 'axios';

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
    comment: '',
    tag: '',
    language: '',
    contents: '',
    startTime: '',
    endTime: '',
  });

  // userEmail 유효성 검사, input값 가져오기
  const [userEmail, setUserEmail] = useState('');
  const [emailCheck, setEmailCheck] = useState(
    'abc@abc.abc형식으로 작성해 주세요',
  );

  const handleEmail = (e) => {
    const email = e.target.value;
    setUserEmail(email);
    if (emailForm(email)) {
      setEmailCheck('올바른 이메일 형식입니다.');
    } else if (email === '') {
      setEmailCheck('abc@abc.abc형식으로 작성해 주세요.');
    } else {
      setEmailCheck('이메일 형식을 확인해 주세요.');
    }
  };

  // userName 유효성 검사, input값 가져오기
  const [userName, setUserName] = useState('');
  const [userNameCheck, setUserNameCheck] = useState(
    '영문, 숫자, 특수문자(- _ .) 6-20이하 or 한글 3-8자, 숫자, 특수문자(- _ .)',
  );

  const handleUserName = (e) => {
    const userName = e.target.value;
    setUserName(userName);
    if (userNameForm(userName)) {
      setUserNameCheck('올바른 닉네임 형식입니다.');
    } else if (userName === '') {
      setUserNameCheck(
        '영문, 숫자, 특수문자(- _ .) 6-20이하 or 한글 3-8자, 숫자, 특수문자(- _ .)',
      );
    } else {
      setUserNameCheck('닉네임 형식을 확인해 주세요.');
    }
  };

  //pwd 유효성 검사, input값 가져오기
  const [pwd, setPwd] = useState('');
  const [pwdCheck, setPwdCheck] = useState(
    '8-20자 사이의 영어대소문자, 숫자, 특수문자',
  );

  const handlePwd = (e) => {
    const pwd = e.target.value;
    setPwd(pwd);
    if (pwdForm(pwd)) {
      setPwdCheck('올바른 비밀번호 형식입니다.');
    } else if (pwd === '') {
      setPwdCheck('8-20자 사이의 영어대소문자, 숫자, 특수문자');
    } else {
      setPwdCheck('비밀번호를 형식을 확인해 주세요.');
    }
  };

  //confirmPwd 유효성 검사, input값 가져오기
  const [confirmPwd, setConfirmPwd] = useState('');
  const [confirmPwdCheck, setConfirmPwdCheck] = useState(
    '비밀번호를 한 번 더 입력해주세요.',
  );

  const handleConfirmPwd = (e) => {
    const confirmPwd = e.target.value;
    setConfirmPwd(confirmPwd);
    if (pwd === confirmPwd) {
      setConfirmPwdCheck('비밀번호와 일치합니다.');
    } else if (confirmPwd === '') {
      setConfirmPwdCheck('비밀번호를 한 번 더 입력해 주세요.');
    } else {
      setConfirmPwdCheck('비밀번호와 일치하지 않습니다.');
    }
  };

  //isTutor

  //이메일 중복체크
  const checkDuplicatedEmail = () => {
    if (!emailForm(userEmail)) {
      window.alert('닉네임 형식을 확인해 주세요.');
      return;
    }
    console.log('중복확인할 이메일', userEmail);

    axios({
      method: 'post',
      url: 'http://13.124.206.190/signUp/emailCheck',
      data: {
        userEmail: userEmail,
      },
    })
      .then((response) => {
        console.log('emailCheckDB성공', response.data);
        setEmailCheck('사용 가능한 이메일입니다.');
      })
      .catch((error) => {
        console.log(error);
        window.alert('이미 사용중인 이메일입니다.');
        setEmailCheck('다른 이메일을 입력해주세요.');
      });
  };
  //닉네임 중복체크
  const checkDuplicatedUserName = () => {
    if (!userNameForm(userName)) {
      window.alert('형식확인');
      return;
    }
    console.log('중복확인할 닉네임', userName);

    axios({
      method: 'post',
      url: 'http://13.124.206.190/signUp/nameCheck',
      data: {
        userName: userName,
      },
    })
      .then((response) => {
        console.log('userNameCheckDB성공', response.data);
        window.alert('사용 가능한 닉네임입니다!');
      })
      .catch((error) => {
        window.alert('사용할 수 없는 닉네임입니다!');
      });
  };

  //DetailInfo페이지로 넘어가기 위한 함수
  const signUp = () => {
    if (emailCheck !== '사용 가능한 이메일입니다.') {
      window.alert('이메일 중복 확인을 해주세요.');
      return;
    }

    if (userNameCheck !== '사용 가능한 닉네임 입니다.') {
      window.alert('닉네임 중복 확인을 해주세요.');
      return;
    }

    if (!pwdForm(pwd)) {
      window.alert('비밀번호 형식을 확인해주세요.');
      return;
    }
    if (pwd !== confirmPwd) {
      window.alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    const userForm = {
      userEmail: userEmail,
      userName: userName,
      pwd: pwd,
      pwdCheck: confirmPwd,
    };
    console.log('보낼 데이터', userForm);
    // dispatch(userActions.signupDB(userForm));
  };

  return (
    <Container>
      <InputBox>
        <input
          placeholder="이메일"
          type="text"
          name="userEmail"
          onChange={handleEmail}
          // onBlur={checkDuplicatedEmail} //성공하면 온블러로 바꾸기
        />
        <span>{emailCheck}</span>
        <button onClick={checkDuplicatedEmail}>중복확인</button>
      </InputBox>
      <InputBox>
        <input
          placeholder="닉네임"
          type="text"
          name="userName"
          onChange={handleUserName}
          // onBlur={checkDuplicatedUserName} // 성공하면 온블러로 바꾸기
        />
        <span>{userNameCheck}</span>
        <button onClick={checkDuplicatedUserName}>중복확인</button>
      </InputBox>
      <InputBox>
        <input
          placeholder="비밀번호"
          type="text"
          name="pwd"
          onChange={handlePwd}
        />
        <span>{pwdCheck}</span>
      </InputBox>
      <InputBox>
        <input
          placeholder="비밀번호확인"
          type="text"
          name="pwdCheck"
          onChange={handleConfirmPwd}
        />
        <span>{confirmPwdCheck}</span>
      </InputBox>
      <div>
        <button onClick={signUp}>가입하기</button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 50vw;
  margin: auto;
`;

const InputBox = styled.div`
  margin: 30px;
  display: flex;
  flex-direction: column;
`;

export default Signup;
