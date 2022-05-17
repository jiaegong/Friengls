import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axios from 'axios';

const SET_LIKE = 'SET_LIKE';
const UPDATE_LIKE = 'UPDATE_LIKE';

const setLike = createAction(SET_LIKE, (list) => ({ list }));
const updateLike = createAction(UPDATE_LIKE, (tutorName, isLike) => ({
  tutorName,
  isLike,
}));

const initialState = {
  list: [],
};

const likeDB = (token, tutorName) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: 'patch',
      url: 'https://jg-jg.shop/like',
      data: { tutorName },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(updateLike(tutorName, true));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const unlikeDB = (token, tutorName) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: 'patch',
      url: 'https://jg-jg.shop/unlike',
      data: { tutorName },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(updateLike(tutorName, false));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const getLikeDB = (token) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: 'get',
      url: 'https://jg-jg.shop/getLikeList',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(setLike(res));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export default handleActions(
  {
    // like한 목록 가져오기
    [SET_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.list;
      }),
    [UPDATE_LIKE]: (state, action) =>
      produce(state, (draft) => {
        if (action.payload.isLike) {
          draft.list.unshift(action.payload.tutorName);
        } else {
          draft.list = draft.list.filter((v) => v !== action.payload.tutorName);
        }
      }),
  },
  initialState,
);

const actionCreators = {
  setLike,
  getLikeDB,
  likeDB,
  unlikeDB,
};

export { actionCreators };
