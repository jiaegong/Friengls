import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';

// 모듈
import { emailForm, pwdForm, userNameForm } from '../utils/validation';

// 컴포넌트
import SelectIsTutor from '../components/SelectIstutor';

// 아이콘
import { Logo } from '../asset/image/';
import { InfoInput } from '../elements/index';

const Signup = ({ userInfo }) => {
  const { t } = useTranslation();
  //소셜로그인의 경우 닉네임체크 바로 할 수 있도록
  useEffect(() => {
    if (userInfo?.userName) {
      checkDuplicatedUserName(userInfo.userName);
    }
  }, []);
  // userEmail 상태값
  const [userEmail, setUserEmail] = useState(
    userInfo?.userEmail ? userInfo.userEmail : '',
  );
  // userEmail 형식 라벨로 표시
  const [emailCheck, setEmailCheck] = useState('\u00A0');
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
  //인증번호
  const [authNumber, setAuthNumber] = useState(0);
  //새로고침 시 로컬스토리지에 저장한 인증요청횟수 가져오기
  useEffect(() => {
    setAuthCount(Number(localStorage.getItem('authCount')));
  }, []);
  // 인증요청횟수
  const [authCount, setAuthCount] = useState(0);
  //5회 이상 요청 시 버튼 비활성화(5분)
  const [preventAuth, setPreventAuth] = useState(false);

  if (preventAuth) {
    console.log(authCount);
    //5분 지나고 로컬스토리지에 authCount가 남은 경우 제한 해제, authCount초기화
    setTimeout(() => {
      if (localStorage.getItem('authCount')) {
        setPreventAuth(false);
        window.location.reload();
        localStorage.removeItem('authCount');
      }
    }, 300000);
  }

  const delayMessage = () => {
    new Swal(t('You can request it again after 5 minutes.'));
    return;
  };

  //중복체크 + 인증번호 요청
  const checkDuplicatedEmail = (e) => {
    //빈칸이나 유효성검사 안됐을 경우 리턴
    if (
      emailCheck === '\u00A0' ||
      emailCheck === t('email format: ex) example@example.com')
    ) {
      new Swal(t('email format: ex) example@example.com'));
      return;
    }
    //6회 이상 클릭할 경우 5분 후 다시 발송할 수 있다.
    setAuthCount(authCount + 1);
    localStorage.setItem('authCount', authCount + 1);
    if (authCount >= 4) {
      setPreventAuth(true);
    }
    //이메일 중복검사
    axios({
      method: 'post',
      url: 'https://hjg521.link/signUp/emailCheck',
      data: {
        userEmail: userEmail,
      },
    })
      .then((response) => {
        if (response.data.msg === '이미 있는 이메일 주소입니다.') {
          setEmailCheck(
            t('this email is already subscribed. try another email.'),
          );
          return;
        }
        //중복 이메일 아닐 경우 인증번호 보내기 요청
        setEmailCheck(
          t('We are sending the authentication number. Please wait a moment'),
        );
        axios({
          method: 'post',
          url: 'https://hjg521.link/mail',
          data: {
            userEmail: userEmail,
          },
          timeout: 8000,
        })
          .then((response) => {
            console.log(response.data);
            setEmailCheck(
              t(
                'the authentication number has been sent to the email you wrote.',
              ),
            );
            setAuthNumber(response.data.toString());
            //서버에서 보내주는 번호와 인풋 값 일치하면 인증완료
          })
          .catch((error) => {
            console.log('이메일인증 에러', error);
            setEmailCheck(
              t('Bypass authentication because an unknown error occurred.'),
            );
            setConfirmEmail(t('email authentication completed'));
          });
      })
      .catch((error) => {
        console.log('이메일체크 에러', error);
      });
  };
  //이메일 인증 확인 번호 상태값
  const [inputNumber, setInputNumber] = useState('');
  const handleInputNumber = (e) => {
    setInputNumber(e.target.value);
  };
  //이메일 인증 번호 검증
  const [confirmEmail, setConfirmEmail] = useState('\u00A0');
  const checkEmail = (e) => {
    if (authNumber === inputNumber) {
      setConfirmEmail(t('email authentication completed'));
      return;
    }
    setConfirmEmail(t('please check the authentication number again.'));
  };

  //userName 상태값
  const [userName, setUserName] = useState(
    userInfo?.userName ? userInfo.userName : '',
  );

  //userName 형식 라벨로 표시
  const [userNameCheck, setUserNameCheck] = useState('\u00A0');
  //userName 유효성 검사
  const handleUserName = (e) => {
    const userName = e.target.value;
    setUserName(userName);
    if (userNameForm(userName)) {
      setUserNameCheck(t('this is the correct nickname format.'));
    } else {
      setUserNameCheck(
        t(
          'Korean, english, numbers, special characters (- _ . ) / member of letters : 4-16 (Korean : 2-8)',
        ),
      );
    }
  };
  //userName 중복체크
  const checkDuplicatedUserName = () => {
    if (!userNameForm(userName)) {
      return;
    }

    axios({
      method: 'post',
      url: 'https://hjg521.link/signUp/nameCheck',
      data: {
        userName: userName,
      },
    })
      .then((response) => {
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

  //pwd 상태값
  const [pwd, setPwd] = useState('');
  //pwd 형식 라벨로 표시
  const [pwdCheck, setPwdCheck] = useState('\u00A0');
  //pwd 유효성 검사
  const handlePwd = (e) => {
    const pwd = e.target.value;
    setPwd(pwd);
    if (pwdForm(pwd)) {
      setPwdCheck(t('this is the correct password format.'));
    } else {
      setPwdCheck(
        t(
          'password format: english uppercase and lowercase letters, 8-20 characters including must-have numbers (special characters)',
        ),
      );
    }
    //비밀번호 확인 먼저 입력했을 경우
    if (confirmPwd.length !== 0) {
      if (pwd === confirmPwd) {
        setConfirmPwdCheck(t('it matches the password.'));
      } else {
        setConfirmPwdCheck(t('the password does not match'));
      }
    }
  };

  //confirmPwd 유효성 검사, input값 가져오기
  const [confirmPwd, setConfirmPwd] = useState('');
  const [confirmPwdCheck, setConfirmPwdCheck] = useState('\u00A0');

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
    (userInfo ? true : confirmEmail === t('email authentication completed')) &&
    userNameCheck === t('this nickname is available.') &&
    pwdForm(pwd) &&
    pwd === confirmPwd &&
    isTutor
  )
    ? true
    : false;
  return (
    <Container>
      {/* 로고 */}
      <LogoBox>
        <img src={Logo} alt="logo" />
      </LogoBox>
      <LogoText>Sign up</LogoText>
      <form>
        {/* 이메일 인풋 : 소셜로그인은 이메일/닉네임 가져오기*/}
        {userInfo ? (
          <InfoInput
            type="text"
            value={userInfo.userEmail}
            disabled
            styles={{ marginBottom: '35px' }}
          />
        ) : (
          <React.Fragment>
            <EmailBox>
              {/* 이메일 인풋 */}
              <InfoInput
                placeholder={t('please fill in an email address.')}
                type="text"
                _onChange={handleEmail}
                validationLabel={emailCheck}
                styles={{ borderRadius: '8px 0 0 8px' }}
                confirmed={
                  confirmEmail === t('email authentication completed') ||
                  emailCheck ===
                    t(
                      'Bypass authentication because an unknown error occurred.',
                    )
                }
              />
              {/* 이메일 중복/인증 요청 버튼 */}
              <ConfirmButton
                type="button"
                onClick={preventAuth ? delayMessage : checkDuplicatedEmail}
                // 한 번 인증번호 보내고 인증버튼 누를 때까지 버튼 비활성화
                authLoading={preventAuth}
              >
                {t('request number')}
              </ConfirmButton>
            </EmailBox>
            {/* 이메일 확인 인풋 */}
            <EmailBox>
              <InfoInput
                placeholder={t('please enter the authentication number.')}
                type="text"
                _onBlur={handleInputNumber}
                validationLabel={confirmEmail}
                styles={{ borderRadius: '8px 0 0 8px' }}
                confirmed={
                  confirmEmail === t('email authentication completed') ||
                  emailCheck ===
                    t(
                      'Bypass authentication because an unknown error occurred.',
                    )
                }
              />
              {/* 이메일 인증 확인 버튼 */}
              <ConfirmButton type="button" onClick={checkEmail}>
                {t('authentication')}
              </ConfirmButton>
            </EmailBox>
          </React.Fragment>
        )}
        {/* 유저네임 인풋 */}
        <InfoInput
          placeholder={t('please fill in a nickname.')}
          type="text"
          value={userInfo?.userName}
          _onChange={handleUserName}
          _onBlur={checkDuplicatedUserName}
          validationLabel={userNameCheck}
          confirmed={userNameCheck === t('this nickname is available.')}
        />
        {/* 비밀번호 인풋 */}
        <InfoInput
          placeholder={t('please fill in a password.')}
          type="password"
          autoComplete="off"
          _onChange={handlePwd}
          validationLabel={pwdCheck}
          confirmed={pwdForm(pwd)}
        />
        {/* 비밀번호 확인 인풋 */}
        <InfoInput
          placeholder={t('please fill in the password again.')}
          type="password"
          autoComplete="off"
          _onChange={handleConfirmPwd}
          validationLabel={confirmPwdCheck}
          confirmed={pwd.length > 7 ? pwd === confirmPwd : false}
        />
        {/* 선생님/학생 선택 */}
        {/* isTutor */}
        <SelectIsTutor
          startTime={startTime}
          _onChange={handleIstutor}
          isTutor={isTutor}
          handleStartTime={handleStartTime}
          handleEndTime={handleEndTime}
          confirmed={isTutor ? true : false}
          title={t('friengls user setting')}
          isSignup
        />
        {/* 상세정보 페이지로 넘어가기 */}
        {isDisabled ? (
          <NextButton
            isDisabled
            type="button"
            value={t('next')}
            onClick={() =>
              new Swal(t('there are items do not meet the conditions.'))
            }
          />
        ) : (
          <Link to={{ pathname: '/signup/detail', signupForm }}>
            <NextButton
              type="button"
              value={t('next')}
              disabled={isDisabled}
              // 페이지 전환 시 인증횟수제한 해제
              onClick={() => {
                localStorage.removeItem('authCount');
              }}
            />
          </Link>
        )}
      </form>
    </Container>
  );
};

const Container = styled.div`
  width: 500px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  form {
    width: 100%;
  }
`;

const LogoBox = styled.div`
  width: 96px;
  height: 80px;
  margin: 0 auto 10px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
`;

const LogoText = styled.p`
  margin-bottom: 50px;
  font-size: 20px;
  font-weight: 700;
  color: #153587;
  cursor: default;
`;

const EmailBox = styled.div`
  width: 100%;
  display: flex;
  background: ${(props) => (props.userInfo ? 'rgba(0,0,0,0.3)' : '')};
`;

const ConfirmButton = styled.button`
  width: 102px;
  height: 54px;
  background: ${(props) => (props.authLoading ? 'rgba(0,0,0,0.3)' : '#7f83ea')};
  border: none;
  border-radius: 0 8px 8px 0;
  font-size: 14px;
  color: #fff;
  cursor: ${(props) => (props.authLoading ? 'default' : 'pointer')};
`;

const NextButton = styled.input`
  width: 500px;
  height: 54px;
  margin-top: 10px;
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
