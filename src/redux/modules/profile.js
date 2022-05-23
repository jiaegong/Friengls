import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axios from 'axios';

//액션
const UPLOAD_PROFILE = 'UPLOAD_PROFILE'; //프로필 이미지파일 업로드

//액션생성
const uploadProfile = createAction(UPLOAD_PROFILE, (file) => ({ file }));

//이니셜스테이트
const initialState = {
  userProfile: null,
};

//미들웨어
const uploadProfileDB = (formData) => {
  return function (dispatch, getState, { history }) {
    console.log('uploadProfileDB시작', formData);
    axios({
      method: 'post',
      url: 'https://jg-jg.shop/editUser/profile',
      // url: 'http://13.124.206.190/editUser/profile',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((response) => {
        console.log('uploadProfileDB성공', response.data);
      })
      .catch((error) => {
        window.alert('프로필 저장에 실패하셨습니다.');
        console.log(error);
      });
  };
};

//리듀서
export default handleActions(
  {
    [UPLOAD_PROFILE]: (state, action) => produce(state, (draft) => {}),
  },
  initialState,
);

//익스포트
const actionCreators = {
  uploadProfileDB,
};

export { actionCreators };
