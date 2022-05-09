import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { setCookie, getCookie, deleteCookie } from '../../shared/Cookie';
import axios from 'axios';

//액션
const SET_USER = 'SET_USER'; //유저정보 불러오기
const EDIT_USER = 'EDIT_USER'; //유저정보 수정
const SET_USER_DETAIL = 'SET_USER_DETAIL'; //상세페이지 불러오기

//액션생성
const setUser = createAction(SET_USER, (userInfo) => ({ userInfo }));
const editUser = createAction(EDIT_USER, (userInfo) => ({ userInfo }));
const setUserDetail = createAction(SET_USER_DETAIL, (userInfo) => ({
  userInfo,
}));

//이니셜스테이트
const initialState = {
  info: {
    userEmail: 'asd@asd,com',
    userName: 'asdaf',
    pwd: 'asdaasd',
    pwdCheck: 'asdaasd',
    isTutor: false,
    tag: ',,',
    language1: '',
    language2: '',
    language3: '',
    comment: '',
    contents: '',
    startTime: '',
    endTime: '',
    //최대 12시간
  },
  isLogin: false, //확인해보기
  detailInfo: {
    userName: 'asdaf',
    isTutor: false,
    tag: ',,',
    language1: '',
    language2: '',
    language3: '',
    comment: '',
    contents: '',
    startTime: '',
    endTime: '',
  },
};

//미들웨어

//이메일 중복확인
const emailCheckDB = (userEmail) => {
  console.log('emailCheckDB시작', userEmail);
  return function () {
    axios({
      method: 'post',
      url: 'https://jg-jg.shop/signUp/emailCheck',
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
      url: 'https://jg-jg.shop/signUp/nameCheck',
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
      url: 'https://jg-jg.shop/signUp',
      data: signupInfo,
    })
      .then((response) => {
        console.log('signupDB성공', response);
        //어떻게 추가정보로 넘어갈까?
        //바로 loginDB로 넘어가면 안되나?
        const loginInfo = {
          userEmail: signupInfo.userEmail,
          pwd: signupInfo.pwd,
          isSignup: true,
        };
        console.log('회원가입DB후로그인정보', loginInfo);
        dispatch(loginDB(loginInfo));
        // history.replace('/signup/detail');
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

const loginDB = (loginForm) => {
  return function (dispatch, getState, { history }) {
    console.log('login시작', loginForm);

    const loginInfo = {
      userEmail: loginForm.userEmail,
      pwd: loginForm.pwd,
    };

    axios({
      method: 'post',
      url: 'https://jg-jg.shop/login',
      data: loginInfo,
    })
      .then((response) => {
        console.log('loginDB성공', response.data);
        setCookie('token', response.data.token);
        // localStorage.setItem('token', response.data.token);
        //회원가입 후 로그인, 기존유저 로그인 일 때 전환할 페이지가 달라지도록 만들어준다.
        loginForm.isSignup
          ? history.replace('/signup/detail')
          : history.replace('/');
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
      url: 'https://jg-jg.shop/login/getUser',
      headers: {
        Authorization: `Bearer ${getCookie('token')}`,
      },
    })
      .then((response) => {
        console.log('loginCheckDB성공', response.data);
        dispatch(setUser(response.data));
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
        // localStorage.setItem('token', response.data.token);
        getCookie('token', response.data.token);
        //서버에서 유저 데이터도 같이 받아올 수 있을까?
        //상세정보 작성페이지로 연결
      })
      .catch((error) => {
        window.alert('로그인에 실패했습니다!');
        console.log('로그인실패', error);
        history.replace('/login');
      });
  };
};

const editUserDB = (userInfo) => {
  return function (dispatch, getState, { history }) {
    console.log('editUserDB시작', userInfo);

    axios({
      method: 'put',
      url: 'https://jg-jg.shop/editUserInfo',
      headers: {
        Authorization: `Bearer ${getCookie('token')}`,
      },
      data: userInfo,
    })
      .then((response) => {
        console.log('editUserDB성공', response);
        const userInfo = {};
        console.log('editUserDB 후 로그인정보', userInfo);
        dispatch(editUser(userInfo));
        // 상제정보페이지에서는 메인으로 전환, 마이페이지에서는 새로고침
      })
      .catch((error) => {
        window.alert('정보 저장에 실패하셨습니다.');
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

const getUserDetailDB = (userId) => {
  return function (dispatch, getState, { history }) {
    console.log('getUserDetailDB시작');

    const userInfos = {
      userEmail: 'detail@test.com',
      userName: userId,
      isTutor: true,
      tag: 'asd,sdf,fgh',
      language1: '한국',
      language2: 'asd',
      language3: 'ads',
      comment: 'asd',
      contents: '123',
      startTime: '12',
      endTime: '16',
    };

    dispatch(setUserDetail(userInfos));

    // axios({
    //   method: 'get',
    //   url: `https://jg-jg.shop/login/getUserDetail/${userId}`,
    //   headers: {
    //     Authorization: `Bearer ${getCookie('token')}`,
    //   },
    // })
    //   .then((response) => {
    //     console.log('getUserDetailDB성공', response.data);
    //     dispatch(setUserDetail(response.data));
    //   })
    //   .catch((error) => {
    //     console.log('getUserDetailDB실패', error);
    //     history.replace('/login');
    //   });
  };
};

//리듀서
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        console.log('setuser리듀서시작', action.payload.userInfo);
        draft.info = action.payload.userInfo;
        draft.isLogin = true;
      }),
    [EDIT_USER]: (state, action) =>
      produce(state, (draft) => {
        console.log('editUser리듀서시작', action.payload.userInfo);
        draft.info = action.payload.userInfo; // 이거맞나? 확인
        draft.isLogin = true;
      }),
    [SET_USER_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        console.log('setUserDetail리듀서시작', action.payload.userInfo);
        draft.detailInfo = action.payload.userInfo;
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
  editUserDB,
  editUser,
  getUserDetailDB,
  setUserDetail,
};

export { actionCreators };
