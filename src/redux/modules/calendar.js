import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axios from 'axios';

const SET_TIME = 'SET_TIME';
const GET_TIME = 'GET_TIME';

const setTime = createAction(SET_TIME, (data) => ({ data }));
const getTime = createAction(GET_TIME, (data) => ({ data }));

const initialState = {
  list: [],
};

const setTimeDB = (data) => {
  // let token = localStorage.token;
  return function (dispatch, getState, { history }) {
    dispatch(setTime(data));
    // 토큰값을 여기서 받아서 넘기면 될꺼 같다.
    // 캘린더에서 값을 같이 안넣어도 될듯.

    // axios({
    //   method: 'post',
    //   url: '주소',
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem('token')}`,
    //   },
    //   data:{
    // start: data.start,
    // end: data.end
    // },
    // })
    //   .then((doc) => {
    //     console.log(doc);
    //     dispatch(setTime(doc));
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
};

const getTimeDB = (userName) => {
  return function (dispatch, getState, { history }) {
    // userName 없으면 그냥 바로 취소 시켜 버림
    // 이부분은 좀더 생각해보자~!!!
    if (!userName) return;
    axios({
      method: 'get',
      // url: `htttp://test/gettime/${userName}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((doc) => {
        console.log(doc);

        dispatch(getTime(doc));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export default handleActions(
  {
    [SET_TIME]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.data);
        draft.list = action.payload.data;
      }),
    [GET_TIME]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.data);
        // draft.list = action.payload.data;
      }),
  },
  initialState,
);

const actionCreators = {
  setTimeDB,
  getTimeDB,
};

export { actionCreators };
