import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axios from 'axios';

//액션
const SET_USER = 'SET_USER';

//액션생성
const setUser = createAction(SET_USER, (user) => ({ user }));

//이니셜스테이트
const initialState = {
  info: {
    userEmail: 'test00',
    userName: 'dingo',
    pwd: '',
    pwdCheck: '',
    isTutor: false,
    userProfile: '',
    tag: ',,',
    language: '영어',
    contents: '',
    startTime: '08:00',
    endTime: '19:00',
    //최대 12시간
  },

  isLogin: false, //확인해보기
};
//미들웨어

//이메일 중복확인
const emailCheckDB = (userEmail) => {
  console.log('emailCheckDB시작', userEmail);
  return function () {
    axios({
      method: 'post',
      url: 'http://13.124.206.190/signUp/emailCheck',
      data: {
        userEmail: userEmail,
      },
    })
      .then((response) => {
        console.log('emailCheckDB성공', response.data);
        window.alert('사용 가능한 이메일입니다!');
      })
      .catch((error) => {
        console.log(error);
        window.alert('사용할 수 없는 이메일입니다!');
      });
  };
};

//닉네임 중복확인
const userNameCheckDB = (userName) => {
  console.log('userNameCheckDB시작', userName);
  return function () {
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
};

const signupDB = (signupInfo) => {
  return function (dispatch, getState, { history }) {
    console.log('signupDB시작', signupInfo);

    axios({
      method: 'post',
      url: 'http://13.124.206.190/signUp',
      data: signupInfo,
    })
      .then((response) => {
        console.log('signupDB성공', response);
        //어떻게 추가정보로 넘어갈까?
        //바로 loginDB로 넘어가면 안되나?
        const loginInfo = {
          userEmail: signupInfo.userEmail,
          pwd: signupInfo.pwd,
        };
        console.log('회원가입DB후로그인정보', loginInfo);
        dispatch(loginDB(loginInfo));
        history.replace('/signupDetail');
      })
      .catch((error) => {
        window.alert('회원가입에 실패하셨습니다.');
        // 요청이 정상적으로 끝나지 않았을 때(오류 났을 때) 수행할 작업!
        if (error.response) {
          // 요청이 전송되었고, 서버는 2xx 외의 상태 코드로 응답했습니다.
        } else if (error.request) {
          // 요청이 전송되었지만, 응답이 수신되지 않았습니다.
          // 'error.request'는 브라우저에서 XMLHtpRequest 인스턴스이고,
          // node.js에서는 http.ClientRequest 인스턴스입니다.
          console.log(error.request);
        } else {
          // 오류가 발생한 요청을 설정하는 동안 문제가 발생했습니다.
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  };
};

const loginDB = (loginInfo) => {
  return function (dispatch, getState, { history }) {
    console.log('login시작', loginInfo);

    axios({
      method: 'post',
      url: 'http://13.124.206.190/login',
      data: loginInfo,
    })
      .then((response) => {
        console.log('loginDB성공', response.data);
        localStorage.setItem('token', response.data.token);
        // dispatch(loginCheckDB);
        history.replace('/');
        window.location.reload();
      })
      .catch((error) => {
        window.alert('로그인에 실패하셨습니다.');
        // 요청이 정상적으로 끝나지 않았을 때(오류 났을 때) 수행할 작업!
        if (error.response) {
          // 요청이 전송되었고, 서버는 2xx 외의 상태 코드로 응답했습니다.
        } else if (error.request) {
          // 요청이 전송되었지만, 응답이 수신되지 않았습니다.
          // 'error.request'는 브라우저에서 XMLHtpRequest 인스턴스이고,
          // node.js에서는 http.ClientRequest 인스턴스입니다.
          console.log(error.request);
        } else {
          // 오류가 발생한 요청을 설정하는 동안 문제가 발생했습니다.
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  };
};

const loginCheckDB = () => {
  return function (dispatch, getState, { history }) {
    console.log('loginCheckDB시작');

    axios({
      method: 'get',
      url: 'http://13.124.206.190/getUser',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        console.log('loginCheckDB성공', response.data);
        // 유저양식만들어서 setUser디스패치하기
        const user = {};
        // dispatch(setUser(user));
      })
      .catch((error) => {
        window.alert('로그인체크에 실패하셨습니다.');
        // 요청이 정상적으로 끝나지 않았을 때(오류 났을 때) 수행할 작업!
        if (error.response) {
          // 요청이 전송되었고, 서버는 2xx 외의 상태 코드로 응답했습니다.
        } else if (error.request) {
          // 요청이 전송되었지만, 응답이 수신되지 않았습니다.
          // 'error.request'는 브라우저에서 XMLHtpRequest 인스턴스이고,
          // node.js에서는 http.ClientRequest 인스턴스입니다.
          console.log(error.request);
        } else {
          // 오류가 발생한 요청을 설정하는 동안 문제가 발생했습니다.
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  };
};

const kakaoLogin = (code) => {
  return function (dispatch, getState, { history }) {
    console.log(code);
    axios({
      method: 'GET',
      url: `http://13.124.206.190?code=${code}`,
    })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        //서버에서 유저 데이터도 같이 받아올 수 있을까?
        //상세정보 작성페이지로 연결
      })
      .catch((err) => {
        window.alert('로그인에 실패했습니다!');
        history.replace('/login');
      });
  };
};

//리듀서
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        console.log('setuser리듀서시작', action.payload.user);
        // draft.user = action.payload.user;
        // draft.isLogin = true;
      }),
  },
  initialState,
);

//익스포트
const actionCreators = {
  emailCheckDB,
  userNameCheckDB,
  signupDB,
  loginDB,
  loginCheckDB,
  setUser,
  kakaoLogin,
};

export { actionCreators };
