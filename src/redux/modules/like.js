import axios from 'axios';
import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { getCookie } from '../../shared/Cookie';

const SET_LIKE = 'SET_LIKE';
const UPDATE_LIKE = 'UPDATE_LIKE';
const IS_LIKE = 'IS_LIKE';

const setLike = createAction(SET_LIKE, (myList) => ({ myList }));
const updateLike = createAction(UPDATE_LIKE, (tutorName, isLike) => ({
  tutorName,
  isLike,
}));
const isLike = createAction(IS_LIKE, (isLike) => ({ isLike }));

const initialState = {
  myList: [],
  list: [],
  tutorName: '',
  isLike: false,
};

const likeDB = (tutorName) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: 'patch',
      url: 'https://hjg521.link/like',
      data: { tutorName },
      headers: { token: `${getCookie('token')}` },
    })
      .then((res) => {
        dispatch(updateLike(tutorName, true));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const unlikeDB = (tutorName) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: 'patch',
      url: 'https://hjg521.link/unlike',
      data: { tutorName },
      headers: { token: `${getCookie('token')}` },
    })
      .then((res) => {
        dispatch(updateLike(tutorName, false));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const isLikeDB = (tutorName) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: 'get',
      url: `https://hjg521.link/isLike/${tutorName}`,
      headers: { token: `${getCookie('token')}` },
    })
      .then((res) => {
        dispatch(isLike(res.data.isLike));
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
      url: 'https://hjg521.link/getLikeList',
      headers: { token: `${getCookie('token')}` },
    })
      .then((res) => {
        dispatch(setLike(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export default handleActions(
  {
    [SET_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.myList = action.payload.myList;
      }),
    [UPDATE_LIKE]: (state, action) =>
      produce(state, (draft) => {
        if (action.payload.isLike) {
          draft.list.unshift(action.payload.tutorName);
          draft.isLike = action.payload.isLike;
        } else {
          draft.list = draft.list.filter((v) => v !== action.payload.tutorName);
          draft.isLike = action.payload.isLike;
        }
      }),
    [IS_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.isLike = action.payload.isLike;
      }),
  },
  initialState,
);

const actionCreators = {
  setLike,
  getLikeDB,
  likeDB,
  unlikeDB,
  isLikeDB,
  isLike,
};

export { actionCreators };
