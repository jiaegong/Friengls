import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axios from 'axios';
import Swal from 'sweetalert2';
import { getCookie } from '../../shared/Cookie';

const SET_REVIEW = 'SET_REVIEW';
const ADD_REVIEW = 'ADD_COMMENT';
const EDIT_REVIEW = 'EDIT_REVIEW';
const DELETE_REVIEW = 'DELETE_REVIEW';

const setReview = createAction(SET_REVIEW, (review) => ({
  review,
}));
const addReview = createAction(ADD_REVIEW, (tutorName, review) => ({
  tutorName,
  review,
}));
const editReview = createAction(EDIT_REVIEW, (reviewId, review) => ({
  reviewId,
  review,
}));
const deleteReview = createAction(DELETE_REVIEW, (reviewId) => ({ reviewId }));

const initialState = {
  list: [
    {
      Tutee_userName: '',
      Tutor_userName: '',
      createdAt: '',
      rate: '',
      reviewId: '',
      text: '',
      updatedAt: '',
    },
  ],
};
const addReviewDB = (tutorName, rate, text) => {
  console.log(tutorName, rate, text);
  console.log(getCookie('token'));
  return function (dispatch) {
    axios({
      method: 'post',
      url: 'https://hjg521.link/addReview',
      data: {
        userName: tutorName,
        rate,
        text,
      },
      headers: { token: `${getCookie('token')}` },
    })
      .then((res) => {
        // 에러뜬다
        // dispatch(addReview(res.data.tutorName, res.data.review));
        console.log('리뷰작성성공!', res);

        new Swal('리뷰가 작성되었습니다!');
      })
      .catch((err) => {
        console.log('리뷰작성에러', err);
        new Swal('리뷰 작성에 실패했습니다!');
      });
  };
};

const getReviewDB = () => {
  return function (dispatch) {
    axios({
      method: 'get',
      url: 'https://hjg521.link/getReview',
    })
      .then((res) => {
        dispatch(setReview(res.data.data));
      })
      .catch((err) => {
        console.log('리뷰 불러오기에 실패했습니다!', err);
      });
  };
};

const getOneReviewDB = (tutorName = null) => {
  return function (dispatch) {
    axios({
      method: 'get',
      url: `https://hjg521.link/getReview/${tutorName}`,
    })
      .then((res) => {
        dispatch(setReview(res.data.data));
      })
      .catch((err) => {
        console.log('리뷰 불러오기에 실패했습니다!', err);
      });
  };
};

const editReviewDB = (reviewId, rate, text) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: 'patch',
      url: 'https://hjg521.link/editReview',
      data: {
        reviewId,
        rate,
        text,
      },
    })
      .then((res) => {
        dispatch(editReview(res));
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const deleteReviewDB = (reviewId) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: 'delete',
      url: `https://hjg521.link/deleteReview`,
      data: { reviewId },
    })
      .then((res) => {
        dispatch(deleteReview());
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export default handleActions(
  {
    [SET_REVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.review;
      }),
    [ADD_REVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.tutorName].unshift(action.payload.review);
      }),
    [EDIT_REVIEW]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex(
          (r) => r.reviewId === action.payload.reviewId,
        );
        draft.list[idx] = action.payload.review;
      }),
    [DELETE_REVIEW]: (state, action) =>
      produce(state, (draft) => {
        let arr = draft.list.filter(
          (r) => r.reviewId !== action.payload.reviewId,
        );
        draft.list = arr;
      }),
  },
  initialState,
);

const actionCreators = {
  addReviewDB,
  addReview,
  setReview,
  getReviewDB,
  getOneReviewDB,
  editReview,
  editReviewDB,
  deleteReview,
  deleteReviewDB,
};

export { actionCreators };
