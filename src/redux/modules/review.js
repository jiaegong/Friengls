import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axios from 'axios';

const SET_REVIEW = 'SET_REVIEW';
const ADD_REVIEW = 'ADD_COMMENT';
const EDIT_REVIEW = 'EDIT_REVIEW';
const DELETE_REVIEW = 'DELETE_REVIEW';

const setReview = createAction(SET_REVIEW, (tutorName, review) => ({
  tutorName,
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
  list: {},
};

const addReviewDB = (token, tutorName, rate, text) => {
  return function (dispatch) {
    axios({
      method: 'post',
      // url: '서버주소/addReview',
      data: {
        tutorName,
        rate,
        text,
      },
      headers: {
        Authorization: `Bearer${token}`,
      },
    })
      .then((res) => {
        dispatch(addReview(res.data.tutorName, res.data.review));
        window.alert('리뷰가 작성되었습니다!');
      })
      .catch((err) => {
        window.alert('리뷰 작성에 실패했습니다!');
        console.log(err);
      });
  };
};

const getReviewDB = (tutorName = null) => {
  return function (dispatch) {
<<<<<<< HEAD
    axios({
      method: 'post',
      url: '서버주소/getReview',
      data: { tutorName },
    })
      .then((res) => {
        dispatch(setReview(res.data.tutorName, res.data.review));
      })
      .catch((err) => {
        console.log('리뷰 불러오기에 실패했습니다!', err);
      });
=======
    // axios({
    //   method: 'post',
    //   // url: '서버주소/getReview',
    //   data: { tutorId },
    // })
    //   .then((res) => {
    //     dispatch(setReview(res.data.tutorId, res.data.review));
    //   })
    //   .catch((err) => {
    //     console.log('리뷰 불러오기에 실패했습니다!', err);
    //   });
>>>>>>> 1adac3057bbb2e45760b5be0249d0cab8e963404
  };
};

const editReviewDB = (reviewId, text) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: 'put',
      // url: '서버주소/editReview',
      data: {
        reviewId,
        text,
      },
    })
      .then((res) => {
        dispatch(editReview(res));
        // 새로고침 해주기
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
      // url: `서버주소/deleteReview`,
      data: { reviewId },
    })
      .then((res) => {
        dispatch(deleteReview(res));
        // 새로고침 해주기
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
        draft.list[action.payload.tutorName] = action.payload.review;
      }),
    [ADD_REVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.tutorName].unshift(action.payload.review);
      }),
    [EDIT_REVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.review);
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
  editReview,
  editReviewDB,
  deleteReview,
  deleteReviewDB,
};

export { actionCreators };
