import React, { useState } from 'react';
import styled from 'styled-components';
import { history } from '../redux/configureStore';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';
import { KAKAO_AUTH_URL, GOOGLE_AUTH_URL } from '../shared/OAuth';
import { emailForm, pwdForm } from '../shared/common';
import { HomeIcon, BackIcon, GoogleLoginIcon, KakaoLoginIcon } from '../image/';
import { Grid, Flex, Input, Button, Text, Icon } from '../elements';

const Login = (props) => {
  const dispatch = useDispatch();
  //userEmail 입력값 저장
  const [userEmail, setUserEmail] = useState('');
  const handleUserEmail = (e) => {
    setUserEmail(e.target.value);
  };
  //pwd 입력값 저장
  const [pwd, setPwd] = useState('');
  const handlePwd = (e) => {
    setPwd(e.target.value);
  };

  //입력된 값을 data로 보내기 위한 함수
  const login = () => {
    //유효성검사
    if (!emailForm(userEmail)) {
      window.alert('이메일: abc@abc.abc형식의 이메일');
      return;
    }
    if (!pwdForm(pwd)) {
      window.alert('비밀번호: 8-20자 사이의 영어대소문자, 숫자, 특수문자');
      return;
    }
    const loginForm = { userEmail: userEmail, pwd: pwd };
    console.log('보낼 데이터', loginForm);
    dispatch(userActions.loginDB(loginForm));
  };

  return (
    <Grid styles={{ width: '1920px', height: '1080px' }}>
      <Grid
        styles={{
          width: '575px',
          height: '804px',
          background: 'rgba( 238, 74, 22, 0.9 )',
          borderRadius: '30px',
          position: 'relative',
        }}
      >
        <Flex
          styles={{
            width: '100%',
            position: 'absolute',
            justifyContent: 'space-between',
            marginTop: '25px',
            paddingRight: '33.5px',
            paddingLeft: '29px',
          }}
        >
          <Icon
            href={'/'}
            src={HomeIcon}
            styles={{ width: '27px', height: '23px' }}
          />
          <Icon
            _onClick={() => {
              history.goBack();
            }}
            src={BackIcon}
            styles={{ width: '27px', height: '23px', color: '#fff' }}
          />
        </Flex>
        <Flex
          styles={{
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Grid styles={{ textAlign: 'center' }}>
            <Text
              styles={{ marginTop: '92px', fontSize: '40px', color: '#ffffff' }}
            >
              와주셨군요!
            </Text>
          </Grid>
          <Flex
            styles={{
              flexDirection: 'column',
            }}
          >
            <Text styles={{ fontSize: '35px', color: '#ffffff' }}>
              로그인 하여 더 다양한
            </Text>
            <Text styles={{ fontSize: '35px', color: '#ffffff' }}>
              경험을 즐겨보세요
            </Text>
          </Flex>

          <Flex
            styles={{
              width: '350px',
              height: '105px',
              marginBottom: '116px',
            }}
          >
            <Flex
              styles={{
                marginRight: '11px',
                flexDirection: 'column',
              }}
            >
              <Input
                placeholder="ID"
                type="text"
                name="userEmail"
                _onChange={handleUserEmail}
                styles={{
                  width: '293px',
                  height: '46px',
                  marginBottom: '11px',
                  border: 'none',
                  borderRadius: '10px',
                  textAlign: 'center',
                  fontSize: '12px',
                  fontWeight: 700,
                  // color: '#e34d1d',
                }}
              />
              <Input
                placeholder="PASSWORD"
                type="text"
                name="pwd"
                _onChange={handlePwd}
                styles={{
                  width: '293px',
                  height: '46px',
                  border: 'none',
                  borderRadius: '10px',
                  textAlign: 'center',
                  fontSize: '12px',
                  fontWeight: 700,
                  // fontColor: '#e34d1d',
                }}
              />
            </Flex>
            <Grid styles={{ width: '46px', height: '105px' }}>
              <Button
                _onClick={login}
                styles={{
                  background: '#FFD8C1',
                  border: 'none',
                  borderRadius: '10px',
                }}
              >
                <Grid>
                  <Text
                    styles={{
                      fontSize: '12px',
                      color: '#a52800',
                      fontWeight: 700,
                    }}
                  >
                    LOG
                  </Text>
                  <Text
                    styles={{
                      fontSize: '12px',
                      color: '#a52800',
                      fontWeight: 700,
                    }}
                  >
                    IN
                  </Text>
                </Grid>
              </Button>
            </Grid>
            {/* <div>
              <Button _onClick={() => history.push('/signup')}>회원가입</Button>
            </div> */}
            {/* <A href={KAKAO_AUTH_URL}>
              <Img src={KakaoLoginIcon} alt="카카오 로그인 버튼" />
            </A>
            <A href={GOOGLE_AUTH_URL}>
              <Img src={GoogleLoginIcon} alt="구글 로그인 버튼" />
            </A> */}
          </Flex>
        </Flex>
      </Grid>
      <Flex styles={{ ai: 'center' }}>
        <Text>로고</Text>
      </Flex>
    </Grid>
  );
};

const Container = styled.div`
  width: 50vw;
  margin: auto;
`;

const Img = styled.img`
  // width: 100px;
  height: 50px;
`;

const A = styled.a`
  width: 100px;
  height: 50px;
`;

export default Login;
