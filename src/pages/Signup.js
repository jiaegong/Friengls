import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { history } from '../redux/configureStore';
import { actionCreators as userActions } from '../redux/modules/user';
import { emailForm, pwdForm, userNameForm } from '../shared/common';
import axios from 'axios';
import { Grid, Flex, Input, Button, Text, Icon } from '../elements';

const Signup = (props) => {
  const dispatch = useDispatch();

  // userEmail 유효성 검사, input값 가져오기
  const [userEmail, setUserEmail] = useState('');
  const [emailCheck, setEmailCheck] = useState(
    '이메일 형식을 지켜주세요 예)example@gmail.com',
  );

  console.log(userEmail.split('@'));

  const handleEmail = (e) => {
    const email = e.target.value;
    setUserEmail(email);
    if (emailForm(email)) {
      setEmailCheck('올바른 이메일 형식입니다.');
    } else {
      setEmailCheck('이메일 형식을 지켜주세요 예)example@gmail.com');
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
    } else {
      setUserNameCheck(
        '영문, 숫자, 특수문자(- _ .) 6-20이하 or 한글 3-8자, 숫자, 특수문자(- _ .)',
      );
    }
  };

  //pwd 유효성 검사, input값 가져오기
  const [pwd, setPwd] = useState('');
  const [pwdCheck, setPwdCheck] = useState(
    '비밀번호는 영어대소문자, 숫자, 특수문자를 포함한 8-20자로 만들어주세요.',
  );

  const handlePwd = (e) => {
    const pwd = e.target.value;
    setPwd(pwd);
    if (pwdForm(pwd)) {
      if (pwd.includes(userName) || pwd.includes(userEmail.split('@')[0])) {
        setPwdCheck('비밀번호에 닉네임 또는 이메일을 포함할 수 없습니다.');
      } else {
        setPwdCheck('올바른 비밀번호 형식입니다.');
      }
    } else {
      if (pwd.includes(userName) || pwd.includes(userEmail.split('@')[0])) {
        setPwdCheck('비밀번호에 닉네임 또는 이메일을 포함할 수 없습니다.');
      } else {
        setPwdCheck(
          '비밀번호는 영어대소문자, 숫자, 특수문자를 포함한 8-20자로 만들어주세요.',
        );
      }
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

  //이메일 중복체크
  const checkDuplicatedEmail = () => {
    if (!emailForm(userEmail)) {
      //조건 깜빡이게 할 수 있을까?
      return;
    }
    console.log('중복확인할 이메일', userEmail);

    axios({
      method: 'post',
      url: 'https://jg-jg.shop/signUp/emailCheck',
      // url: 'http://13.124.206.190/signUp/emailCheck',
      data: {
        userEmail: userEmail,
      },
    })
      .then((response) => {
        console.log('emailCheckDB성공', response.data.msg);
        if (response.data.msg === '이미 있는 이메일 주소입니다.') {
          setEmailCheck(
            '이미 가입된 이메일입니다. 다른 이메일을 입력해주세요.',
          );
          return;
        }
        setEmailCheck('사용 가능한 이메일입니다.');
      })
      .catch((error) => {
        console.log('이메일체크 에러', error);
      });
  };
  //닉네임 중복체크
  const checkDuplicatedUserName = () => {
    if (!userNameForm(userName)) {
      return;
    }
    console.log('중복확인할 닉네임', userName);

    axios({
      method: 'post',
      url: 'https://jg-jg.shop/signUp/nameCheck',
      // url: 'http://13.124.206.190/signUp/nameCheck',
      data: {
        userName: userName,
      },
    })
      .then((response) => {
        console.log('userNameCheckDB성공', response.data);
        if (response.data.msg === '이미 있는 닉네임입니다.') {
          setUserNameCheck(
            '이미 사용중인 닉네임입니다. 다른 닉네임을 입력해주세요.',
          );
          return;
        }
        setUserNameCheck('사용 가능한 닉네임입니다.');
      })
      .catch((error) => {
        console.log('닉네임체크에러', error);
      });
  };

  //signup페이지에서 받는 유저정보
  const signupForm = {
    userEmail: userEmail,
    userName: userName,
    pwd: pwd,
    pwdCheck: confirmPwd,
  };

  console.log(signupForm);

  //DetailInfo페이지로 넘어가는 버튼 활성화
  const [disabled, setDisabled] = useState(true);

  const isTrue = !(
    emailCheck === '사용 가능한 이메일입니다.' &&
    userNameCheck === '사용 가능한 닉네임입니다.' &&
    pwdForm(pwd) &&
    pwd === confirmPwd
  )
    ? true
    : false;

  return (
    <Container>
      <input
        style={{
          width: '293px',
          height: '46px',
          marginBottom: '11px',
          borderRadius: '10px',
          textAlign: 'center',
          fontSize: '12px',
          fontWeight: 700,
        }}
        placeholder="이메일"
        type="text"
        name="userEmail"
        onChange={handleEmail}
        onBlur={checkDuplicatedEmail} //자동 이메일 체크
      />
      <span>{emailCheck}</span>
      <input
        style={{
          width: '293px',
          height: '46px',
          marginBottom: '11px',
          borderRadius: '10px',
          textAlign: 'center',
          fontSize: '12px',
          fontWeight: 700,
        }}
        placeholder="닉네임"
        type="text"
        name="userName"
        onChange={handleUserName}
        onBlur={checkDuplicatedUserName} // 자동 닉네임 체크
      />
      <span>{userNameCheck}</span>
      <input
        style={{
          width: '293px',
          height: '46px',
          marginBottom: '11px',
          borderRadius: '10px',
          textAlign: 'center',
          fontSize: '12px',
          fontWeight: 700,
        }}
        placeholder="비밀번호"
        type="text"
        name="pwd"
        onChange={handlePwd}
      />
      <span>{pwdCheck}</span>
      <input
        style={{
          width: '293px',
          height: '46px',
          marginBottom: '11px',
          borderRadius: '10px',
          textAlign: 'center',
          fontSize: '12px',
          fontWeight: 700,
        }}
        placeholder="비밀번호확인"
        type="text"
        name="pwdCheck"
        onChange={handleConfirmPwd}
      />
      <span>{confirmPwdCheck}</span>
      <Link to={{ pathname: '/signup/detail', signupForm }}>
        <input type="button" value="다음" disabled={isTrue} />
      </Link>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  width: 500px;
  height: 680px;
  border: 2px solid black;
  border-radius: 10px;
  margin: 60px auto;
  gap: 10px;
  box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.1);
`;

export default Signup;
