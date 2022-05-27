import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { history } from '../redux/configureStore';
import { Logo } from '../image/';
import { InputBox, Inputs, Buttons, InputLabel } from '../elements';
import { emailForm, pwdForm, userNameForm } from '../shared/common';
import { useEffect } from 'react';
import SelectIsTutor from '../components/SelectIstutor';
import { useTranslation } from 'react-i18next';
// to do: 유효성 검사에 따라 박스 색 변화
// to do: 유효성 검사 조건 일치하는지 확인
// to do: 닉네임 유효성 검사 개선(글자수)
// to do: 소셜로그인에 사용할 이메일이 이미 가입된 이메일일 경우
const Signup = ({ userInfo }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  //소셜로그인의 경우 닉네임체크 바로 할 수 있도록
  useEffect(() => {
    if (userInfo) {
      checkDuplicatedEmail(userInfo.userEmail);
      //유저네임은 선택사항이라 가져올 경우만(테스트해볼 것)
      if (userInfo.userName) {
        checkDuplicatedUserName(userInfo.userName);
      }
    }
  }, []);
  // userEmail 상태값
  const [userEmail, setUserEmail] = useState(
    userInfo?.userEmail ? userInfo.userEmail : '',
  );
  // userEmail 형식 라벨로 표시
  const [emailCheck, setEmailCheck] = useState(
    t('email format: ex) example@example.com'),
  );
  // userEmail 유효성 검사
  const handleEmail = (e) => {
    const email = e.target.value;
    setUserEmail(email);
    if (emailForm(email)) {
      setEmailCheck(t('this is the correct email format.'));
    } else {
      setEmailCheck(t('email format: ex) example@example.com'));
    }
  };

  // userName 상태값
  const [userName, setUserName] = useState(
    userInfo?.userName ? userInfo.userName : '',
  );
  // userName 형식 라벨로 표시
  const [userNameCheck, setUserNameCheck] = useState(
    t(
      'english, numbers, special characters (- _ . ) 6-20) or less, korean letters 3-8 characters, numbers, special characters (- _ . )',
    ),
  );
  // userName 유효성 검사
  const handleUserName = (e) => {
    const userName = e.target.value;
    setUserName(userName);
    if (userNameForm(userName)) {
      setUserNameCheck(t('this is the correct nickname format.'));
    } else {
      setUserNameCheck(
        t(
          'english, numbers, special characters (- _ . ) 6-20) or less, korean letters 3-8 characters, numbers, special characters (- _ . )',
        ),
      );
    }
  };

  //pwd 상태값
  const [pwd, setPwd] = useState('');
  //pwd 형식 라벨로 표시
  const [pwdCheck, setPwdCheck] = useState(
    t(
      'password format: english uppercase and lowercase letters, 8-20 characters including must-have numbers (special characters)',
    ),
  );
  //pwd 유효성 검사
  const handlePwd = (e) => {
    const pwd = e.target.value;
    setPwd(pwd);
    if (pwdForm(pwd)) {
      if (pwd.includes(userName) || pwd.includes(userEmail.split('@')[0])) {
        setPwdCheck(
          t('you can not include nickname or email in your password.'),
        );
      } else {
        setPwdCheck(t('this is the correct password format.'));
      }
    } else {
      if (pwd.includes(userName) || pwd.includes(userEmail.split('@')[0])) {
        setPwdCheck(
          t('you can not include nickname or email in your password.'),
        );
      } else {
        setPwdCheck(
          t(
            'password format: english uppercase and lowercase letters, 8-20 characters including must-have numbers (special characters)',
          ),
        );
      }
    }
  };

  //confirmPwd 유효성 검사, input값 가져오기
  const [confirmPwd, setConfirmPwd] = useState('');
  const [confirmPwdCheck, setConfirmPwdCheck] = useState(
    t('please fill in the password one more time.'),
  );

  const handleConfirmPwd = (e) => {
    const confirmPwd = e.target.value;
    setConfirmPwd(confirmPwd);
    if (pwd === confirmPwd) {
      setConfirmPwdCheck(t('it matches the password.'));
    } else if (confirmPwd === '') {
      setConfirmPwdCheck(t('please fill in the password one more time.'));
    } else {
      setConfirmPwdCheck(t('the password does not match'));
    }
  };

  //이메일 중복체크
  const checkDuplicatedEmail = () => {
    if (!emailForm(userEmail)) {
      return;
    }
    console.log('중복확인할 이메일', userEmail);

    axios({
      method: 'post',
      url: 'https://hjg521.link/signUp/emailCheck',
      data: {
        userEmail: userEmail,
      },
    })
      .then((response) => {
        console.log('emailCheckDB성공', response.data.msg);
        if (response.data.msg === '이미 있는 이메일 주소입니다.') {
          // 소셜로그인에 사용할 이메일이 이미 가입된 이메일일 경우
          // if (userInfo) {
          //   window.alert(
          //     '이미 가입된 이메일입니다. 다른 방법으로 가입해 주세요.',
          //   );
          //   history.replace('/login');
          // }

          setEmailCheck(
            t('this email is already subscribed. try another email.'),
          );
          return;
        }
        setEmailCheck(t('this email is available.'));
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
      url: 'https://hjg521.link/signUp/nameCheck',
      data: {
        userName: userName,
      },
    })
      .then((response) => {
        console.log('userNameCheckDB성공', response.data);
        if (response.data.msg === '이미 있는 닉네임입니다.') {
          setUserNameCheck(
            t('this nickname is already in use. try another nickname.'),
          );
          return;
        }
        setUserNameCheck(t('this nickname is available.'));
      })
      .catch((error) => {
        console.log('닉네임체크에러', error);
      });
  };

  //isTutor input값
  const [isTutor, setIsTutor] = useState('');
  const handleIstutor = (e) => {
    setIsTutor(e.target.value);
  };

  //수업가능시간(시작) input값
  const [startTime, setStartTime] = useState('');
  const handleStartTime = (e) => {
    setStartTime(e.target.value);
  };
  //수업가능시간(종료) option설정
  const endTimeArray = [];
  for (let i = 1; i < 7; i++) {
    Number(startTime) + (2 * i - 1) < 24
      ? endTimeArray.push(Number(startTime) + (2 * i - 1))
      : endTimeArray.push(Number(startTime) + (2 * i - 1) - 24);
  }
  //수업가능시간(종료) input값
  const [endTime, setEndTime] = useState('');
  const handleEndTime = (e) => {
    setEndTime(e.target.value);
  };

  //signup페이지에서 받는 유저정보
  const signupForm = {
    userEmail: userEmail,
    userName: userName,
    pwd: pwd,
    pwdCheck: confirmPwd,
    isTutor: isTutor,
    startTime: startTime,
    endTime: endTime,
  };

  //DetailInfo페이지로 넘어가는 버튼 활성화
  const isDisabled = !(
    (
      emailCheck === t('this email is available.') &&
      userNameCheck === t('this nickname is available.') &&
      pwdForm(pwd) &&
      pwd === confirmPwd &&
      isTutor
    )
    // &&
    // startTime &&
    // endTime
  )
    ? true
    : false;

  return (
    <Container>
      {/* 로고 */}
      <LogoBox>
        <img src={Logo} alt="userProfileImage" />
      </LogoBox>
      <LogoText>Sign in</LogoText>
      {/* 이메일 인풋 */}
      <InputBox>
        <Inputs
          placeholder={t('please fill in an email address.')}
          type="text"
          value={userInfo?.userEmail}
          _onChange={handleEmail}
          _onBlur={checkDuplicatedEmail} //자동 이메일 체크
          disabled={userInfo ? true : false}
        />
        <InputLabel styles={{ color: '#8A8A8A' }}>{emailCheck}</InputLabel>
      </InputBox>

      {/* 유저네임 인풋 */}
      <InputBox>
        <Inputs
          placeholder={t('please fill in a nickname.')}
          type="text"
          value={userInfo?.userName}
          _onChange={handleUserName}
          _onBlur={checkDuplicatedUserName} // 자동 닉네임 체크
        />
        <InputLabel styles={{ color: '#8A8A8A' }}>{userNameCheck}</InputLabel>
      </InputBox>
      {/* 비밀번호 인풋 */}
      <InputBox>
        <Inputs
          placeholder={t('please fill in a password.')}
          type="text"
          name="pwd"
          _onChange={handlePwd}
        />
        <InputLabel styles={{ color: '#8A8A8A' }}>{pwdCheck}</InputLabel>
      </InputBox>
      {/* 비밀번호 확인 인풋 */}
      <InputBox styles={{ marginBottom: '60px' }}>
        <Inputs
          placeholder={t('please fill in the password again.')}
          type="text"
          name="pwdCheck"
          _onChange={handleConfirmPwd}
        />
        <InputLabel styles={{ color: '#8a8a8a' }}>{confirmPwdCheck}</InputLabel>
      </InputBox>
      {/* 선생님/학생 선택 */}
      {/* isTutor */}
      <SelectIsTutor
        startTime={startTime}
        _onClick={handleIstutor}
        isTutor={isTutor}
        handleStartTime={handleStartTime}
        handleEndTime={handleEndTime}
      />
      {/* 상세정보 페이지로 넘어가기 */}
      {isDisabled ? (
        <NextButton
          isDisabled
          type="button"
          value={t('next')}
          onClick={() =>
            window.alert(t('there are items do not meet the conditions.'))
          }
        />
      ) : (
        <Link to={{ pathname: '/signup/detail', signupForm }}>
          <NextButton type="button" value={t('next')} disabled={isDisabled} />
        </Link>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 800px;
  margin: 200px auto;
`;

const LogoBox = styled.div`
  width: 97px;
  height: 60px;
  margin: 0 auto 20px;
  overflow: hidden;
`;

const LogoText = styled.p`
  margin-bottom: 60px;
  font-size: 44px;
  font-weight: 700;
  color: #153587;
  cursor: default;
`;

const NextButton = styled.input`
  width: 800px;
  height: 80px;
  margin-top: 40px;
  background: ${(props) => (props.isDisabled ? '#999999' : '#171b78')};
  border: none;
  border-radius: 4px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  cursor: ${(props) => (props.isDisabled ? 'default' : 'pointer')};
  font-size: 24px;
  font-weight: 600;
  color: #fff;
`;

export default Signup;
