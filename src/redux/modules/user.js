import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { setCookie, getCookie, deleteCookie } from '../../shared/Cookie';
import axios from 'axios';
import Swal from 'sweetalert2';

//액션
const SET_USER = 'SET_USER'; //유저정보 불러오기
const EDIT_USER = 'EDIT_USER'; //유저정보 수정
const SET_USER_DETAIL = 'SET_USER_DETAIL'; //상세페이지 불러오기
const UNSET_USER = 'UNSET_USER'; //유저정보 지우기
const DELETE_PROFILE = 'DELETE_PROFILE'; //유저프로필 삭제

//액션생성
const setUser = createAction(SET_USER, (userInfo) => ({ userInfo }));
const editUser = createAction(EDIT_USER, (userInfo) => ({ userInfo }));
const setUserDetail = createAction(SET_USER_DETAIL, (userInfo) => ({
  userInfo,
}));
const unsetUser = createAction(UNSET_USER, (user) => ({ user }));
const deleteProfile = createAction(DELETE_PROFILE, (userProfile) => ({
  userProfile,
}));

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
    // userName: '',
    // isTutor: '',
    // tag: ',,',
    // language1: '',
    // language2: '',
    // language3: '',
    // comment: '',
    // contents: '',
    // startTime: '',
    // endTime: '',
  },
};

//미들웨어

const signupDB = (formData, loginInfo) => {
  return function (dispatch, getState, { history }) {
    console.log('signupDB시작', formData, loginInfo);

    axios({
      method: 'post',
      url: 'https://hjg521.link/signUp',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((response) => {
        // console.log('signupDB성공', response);

        dispatch(loginDB(loginInfo));
      })
      .catch((error) => {
        new Swal('회원가입에 실패하셨습니다.');
        console.log(error);
      });
  };
};

const uploadProfileDB = (formData) => {
  return function (dispatch, getState, { history }) {
    console.log('uploadProfileDB시작', formData);
    axios({
      method: 'post',
      url: 'https://hjg521.link/editUser/profile',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((response) => {
        console.log('uploadProfileDB성공', response.data);
      })
      .catch((error) => {
        new Swal('프로필 저장에 실패하셨습니다.');
        console.log(error);
      });
  };
};

const deleteProfileDB = (userInfo) => {
  return function (dispatch, getState, { history }) {
    console.log('deleteProfileDB시작', userInfo);
    axios({
      method: 'patch',
      url: 'https://hjg521.link/deleteProfile',
      data: userInfo,
    })
      .then((response) => {
        console.log('uploadProfileDB성공', response.data);
      })
      .catch((error) => {
        new Swal('이미지 삭제에 실패하셨습니다.');
        console.log(error);
      });
    dispatch(deleteProfile);
  };
};

const loginDB = (loginForm) => {
  return function (dispatch, getState, { history }) {
    // console.log('login시작', loginForm);

    axios({
      method: 'post',
      url: 'https://hjg521.link/login',
      data: loginForm,
    })
      .then((response) => {
        console.log('loginDB성공', response.data);
        if (response.data.msg === '비밀번호가 틀렸습니다') {
          new Swal('비밀번호를 확인해 주세요.');
          return;
        }

        if (response.data.msg === '존재하지 않는 아이디입니다.') {
          new Swal('존재하지 않는 아이디 입니다.');
          return;
        }
        setCookie('token', response.data.token);
        history.replace('/');
        window.location.reload();
      })
      .catch((error) => {
        new Swal('로그인에 실패하셨습니다.');
        console.log('loginDB실패', error);
      });
  };
};

const loginCheckDB = () => {
  return function (dispatch, getState, { history }) {
    // console.log('loginCheckDB시작');
    axios({
      method: 'get',
      url: 'https://hjg521.link/login/getUser',
      headers: { token: `${getCookie('token')}` },
    })
      .then((response) => {
        dispatch(setUser(response.data));
      })
      .catch((error) => {
        console.log('로그인체크 실패', error);
        if (getCookie('token') === 'undefined') {
          deleteCookie('token');
        }
        new Swal(
          '알 수 없는 문제로 로그인에 실패했습니다. 다시 로그인 해주세요.',
        );
        history.push('/login');

        //메인으로 돌아가기
      });
  };
};

const editUserDB = (userInfo) => {
  return function (dispatch, getState, { history }) {
    console.log('editUserDB시작', userInfo);

    axios({
      method: 'patch',
      url: 'https://hjg521.link/editUser',
      headers: { token: `${getCookie('token')}` },
      data: userInfo,
    })
      .then((response) => {
        console.log('editUserDB성공', response);
        new Swal('프로필이 성공적으로 수정되었습니다.');
        const editUserInfo = userInfo;
        console.log('editUserDB 후 로그인정보', userInfo);
        dispatch(editUser(editUserInfo));
        history.replace(`/mypage/${userInfo.userName}/${userInfo.isTutor}`);
        window.location.reload();
      })
      .catch((error) => {
        new Swal('정보 저장에 실패하셨습니다.');
        console.log(error);
      });
  };
};

const getUserDetailDB = (userApi) => {
  return function (dispatch, getState, { history }) {
    // console.log('getUserDetailDB시작', userApi);

    axios({
      method: 'get',
      url: `https://hjg521.link/getUserDetail/?userName=${userApi.userName}&isTutor=${userApi.isTutor}`,
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
    // axios({
    //   method: 'post',
    //   url: 'https://hjg521.link/logout',
    //   headers: { token: `${getCookie('token')}` },
    // })
    //   .then((response) => {
    //     console.log(response.msg);
    //     deleteCookie('token');
    //     dispatch(unsetUser());
    //     new Swal('성공적으로 로그아웃 되었습니다.');
    //   })
    //   .catch((error) => {
    //     console.log('로그아웃 오류', error);
    //     deleteCookie('token');
    //     dispatch(unsetUser());
    //     new Swal('성공적으로 로그아웃 되었습니다.');
    //     history.push('/');
    //   });
    deleteCookie('token');
    dispatch(unsetUser());
    history.replace('/');
    // window.location.reload();
    new Swal('성공적으로 로그아웃 되었습니다.');
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
        draft.detailInfo = action.payload.userInfo; // 이거맞나? 확인
        draft.isLogin = true;
      }),
    [SET_USER_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        // console.log('setUserDetail리듀서시작', action.payload.userInfo);
        draft.detailInfo = action.payload.userInfo;
      }),
    [UNSET_USER]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.info = null;
        draft.isLogin = false;
        draft.detailInfo = null;
      }),
    [DELETE_PROFILE]: (state, action) =>
      produce(state, (draft) => {
        draft.info.userProfile = '';
      }),
  },
  initialState,
);

//익스포트
const actionCreators = {
  signupDB,
  uploadProfileDB,
  loginDB,
  loginCheckDB,
  setUser,
  editUserDB,
  editUser,
  getUserDetailDB,
  setUserDetail,
  logout,
  unsetUser,
  deleteProfileDB,
};

export { actionCreators };
