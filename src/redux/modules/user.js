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
    userEmail: '',
    userName: '',
    pwd: '',
    pwdCheck: '',
    isTutor: 0,
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
    userName: '',
    isTutor: 1,
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
        const loginInfo = {
          userEmail: signupInfo.userEmail,
          pwd: signupInfo.pwd,
        };
        console.log('회원가입DB후로그인정보', loginInfo);
        dispatch(loginDB(loginInfo));
      })
      .catch((error) => {
        window.alert('회원가입에 실패하셨습니다.');
        console.log(error);
      });
  };
};

const loginDB = (loginForm) => {
  return function (dispatch, getState, { history }) {
    console.log('login시작', loginForm);

    axios({
      method: 'post',
      url: 'https://jg-jg.shop/login',
      data: loginForm,
    })
      .then((response) => {
        console.log('loginDB성공', response.data);
        setCookie('token', response.data.token);
        history.replace('/');
        window.location.reload();
      })
      .catch((error) => {
        window.alert('로그인에 실패하셨습니다.');
        console.log(error);
      });
  };
};

const loginCheckDB = () => {
  return function (dispatch, getState, { history }) {
    // console.log('loginCheckDB시작');

    axios({
      method: 'get',
      url: 'https://jg-jg.shop/login/getUser',
      headers: {
        Authorization: `Bearer ${getCookie('token')}`,
      },
    })
      .then((response) => {
        // console.log('loginCheckDB성공', response.data);
        dispatch(setUser(response.data));
      })
      .catch((error) => {
        window.alert('로그인체크에 실패하셨습니다.');
        console.log(error);
        //메인으로 백
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
        // console.log('editUserDB성공', response);
        const userInfo = {};
        // console.log('editUserDB 후 로그인정보', userInfo);
        dispatch(editUser(userInfo));
        // 상제정보페이지에서는 메인으로 전환, 마이페이지에서는 새로고침
      })
      .catch((error) => {
        window.alert('정보 저장에 실패하셨습니다.');
        console.log(error);
      });
  };
};

const getUserDetailDB = (userApi) => {
  return function (dispatch, getState, { history }) {
    console.log('getUserDetailDB시작', userApi);

    axios({
      method: 'get',
      url: `https://jg-jg.shop/getUserDetail/${userApi.userName}`,
      headers: {
        Authorization: `Bearer ${getCookie('token')}`,
      },
    })
      .then((response) => {
        console.log('getUserDetailDB성공', response.data.data[0]);
        dispatch(setUserDetail(response.data.data[0]));
      })
      .catch((error) => {
        console.log('getUserDetailDB실패', error);
      });
  };
};

//리듀서
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        // console.log('setuser리듀서시작', action.payload.userInfo);
        draft.info = action.payload.userInfo;
        draft.isLogin = true;
      }),
    [EDIT_USER]: (state, action) =>
      produce(state, (draft) => {
        // console.log('editUser리듀서시작', action.payload.userInfo);
        draft.info = action.payload.userInfo; // 이거맞나? 확인
        draft.isLogin = true;
      }),
    [SET_USER_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        // console.log('setUserDetail리듀서시작', action.payload.userInfo);
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
