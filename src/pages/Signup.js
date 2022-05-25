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
// to do: 유효성 검사에 따라 박스 색 변화
// to do: 유효성 검사 조건 일치하는지 확인
// to do: 닉네임 유효성 검사 개선(글자수)
// to do: 소셜로그인에 사용할 이메일이 이미 가입된 이메일일 경우
const Signup = ({ userInfo }) => {
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
    '이메일 형식: 예) example@example.com',
  );
  // userEmail 유효성 검사
  const handleEmail = (e) => {
    const email = e.target.value;
    setUserEmail(email);
    if (emailForm(email)) {
      setEmailCheck('올바른 이메일 형식입니다.');
    } else {
      setEmailCheck('이메일 형식: 예) example@example.com');
    }
  };

  // userName 상태값
  const [userName, setUserName] = useState(
    userInfo?.userName ? userInfo.userName : '',
  );
  // userName 형식 라벨로 표시
  const [userNameCheck, setUserNameCheck] = useState(
    '영문, 숫자, 특수문자(- _ .) 6-20이하 or 한글 3-8자, 숫자, 특수문자(- _ .)',
  );
  // userName 유효성 검사
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

  //pwd 상태값
  const [pwd, setPwd] = useState('');
  //pwd 형식 라벨로 표시
  const [pwdCheck, setPwdCheck] = useState(
    '비밀번호 형식: 영어대소문자, 숫자를 반드시 포함한 8-20자 사이 (특수문자 가능)',
  );
  //pwd 유효성 검사
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
          '비밀번호 형식: 영어대소문자, 숫자를 반드시 포함한 8-20자 사이 (특수문자 가능)',
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
      url: 'https://hjg521.link/signUp/nameCheck',
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
      emailCheck === '사용 가능한 이메일입니다.' &&
      userNameCheck === '사용 가능한 닉네임입니다.' &&
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
        <img src={Logo} alt="logo" />
      </LogoBox>
      <LogoText>Sign up</LogoText>
      {/* 이메일 인풋 */}
      <InputBox>
        <Inputs
          placeholder="이메일을 입력해 주세요."
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
          placeholder="닉네임을 입력해 주세요."
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
          placeholder="비밀번호를 입력해 주세요."
          type="text"
          name="pwd"
          _onChange={handlePwd}
        />
        <InputLabel styles={{ color: '#8A8A8A' }}>{pwdCheck}</InputLabel>
      </InputBox>
      {/* 비밀번호 확인 인풋 */}
      <InputBox styles={{ marginBottom: '60px' }}>
        <Inputs
          placeholder="비밀번호를 다시 한 번 입력해 주세요."
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
          value="다음"
          onClick={() => window.alert('조건에 맞지 않는 항목이 있습니다.')}
        />
      ) : (
        <Link to={{ pathname: '/signup/detail', signupForm }}>
          <NextButton type="button" value="다음" disabled={isDisabled} />
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
  img {
    width: 100%;
    height: 100%;
  }
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
