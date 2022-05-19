import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { setCookie, getCookie, deleteCookie } from '../../shared/Cookie';
import axios from 'axios';

//액션
const SET_USER = 'SET_USER'; //유저정보 불러오기
const EDIT_USER = 'EDIT_USER'; //유저정보 수정
const SET_USER_DETAIL = 'SET_USER_DETAIL'; //상세페이지 불러오기
const UNSET_USER = 'UNSET_USER'; //유저정보 지우기

//액션생성
const setUser = createAction(SET_USER, (userInfo) => ({ userInfo }));
const editUser = createAction(EDIT_USER, (userInfo) => ({ userInfo }));
const setUserDetail = createAction(SET_USER_DETAIL, (userInfo) => ({
  userInfo,
}));
const unsetUser = createAction(UNSET_USER, (user) => ({ user }));

//이니셜스테이트
const initialState = {
  //info: 로그인한 유저의 정보
  info: {
    // userEmail: '',
    // userName: '',
    // pwd: '',
    // pwdCheck: '',
    // isTutor: '0',
    // tag: ',,',
    // language1: '',
    // language2: '',
    // language3: '',
    // comment: '',
    // contents: '',
    // startTime: '',
    // endTime: '',
  },
  isLogin: false,
  //detailInfo: detail페이지의 유저정보
  detailInfo: {
    userName: '',
    isTutor: '1',
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

const signupDB = (formData, loginInfo) => {
  return function (dispatch, getState, { history }) {
    console.log('signupDB시작', formData, loginInfo);

    axios({
      method: 'post',
      // url: 'https://jg-jg.shop/signUp',
      url: 'http://13.124.206.190/signUp',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((response) => {
        console.log('signupDB성공', response);

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
        // localStorage.setItem('token', response.data.token);
        history.replace('/');
        window.location.reload();
        // 아이디없을 경우 msg
        // 비밀번호 틀렸을 경우 msg
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
    console.log(getCookie('token'));
    axios({
      method: 'get',
      url: 'https://jg-jg.shop/login/getUser',
      headers: { token: `${getCookie('token')}` },
      // headers: {
      //   authorization: `Bearer ${localStorage.getItem('token')}`,
      // },
    })
      .then((response) => {
        // console.log('loginCheckDB성공', response.data);
        dispatch(setUser(response.data));
      })
      .catch((error) => {
        console.log('로그인체크 실패', error);
        //메인으로 돌아가기
      });
  };
};

const kakaoLogin = (code) => {
  return function (dispatch, getState, { history }) {
    console.log(code);
    axios({
      method: 'GET',
      url: `https://jg-jg.shop?code=${code}`,
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
      headers: { token: `${getCookie('token')}` },
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
    // console.log('getUserDetailDB시작', userApi);

    axios({
      method: 'get',
      // url: `https://jg-jg.shop/getUserDetail/?userName=${userApi.userName}&isTutor=${userApi.isTutor}`,
      url: `https://jg-jg.shop/getUserDetail/?userName=${userApi.userName}&isTutor=${userApi.isTutor}`,
      headers: { token: `${getCookie('token')}` },
    })
      .then((response) => {
        // console.log('getUserDetailDB성공', response.data.data[0]);
        dispatch(setUserDetail(response.data.data[0]));
      })
      .catch((error) => {
        console.log('getUserDetailDB실패', error);
      });
  };
};

const logout = () => {
  return function (dispatch, getState, { history }) {
    deleteCookie('token');
    dispatch(unsetUser);
    window.location.reload();
    history.replace('/');
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
    [UNSET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.info = null;
        draft.isLogin = false;
        draft.detailInfo = null;
      }),
  },
  initialState,
);

//익스포트
const actionCreators = {
  signupDB,
  loginDB,
  loginCheckDB,
  setUser,
  kakaoLogin,
  editUserDB,
  editUser,
  getUserDetailDB,
  setUserDetail,
  logout,
  unsetUser,
};

export { actionCreators };
