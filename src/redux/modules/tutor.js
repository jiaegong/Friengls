import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axios from 'axios';

const GET_TUTOR_LIST = 'GET_TUTOR_LIST';

const getTutors = createAction(GET_TUTOR_LIST, (list) => ({ list }));

const initialState = {
  list: [
    {
      userName: 'aaa',
      userProfile: '',
      tag: 'bbb',
      comment: 'bbb',
      contents: 'bbb',
      isTutor: true,
    },
  ],
};

const getTutorListDB = () => {
  return function (dispatch, getState, { history }) {
    axios({
      method: 'get',
      // url: 'https://6251cd887f7fa1b1dddf398b.mockapi.io/user',
      url: `https://jg-jg.shop/getPopularTutor`,
      // url: `http://13.124.206.190/getPopularTutor`,
    })
      .then((doc) => {
        // console.log(doc.data.data);
        // const data =
        dispatch(getTutors(doc.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const getSearchTutorsDB = (keyWord) => {
  console.log(keyWord);
  return function (dispatch, getState, { history }) {
    axios({
      method: 'get',
      // url: `http://13.124.206.190/getTutorTag?keyword=${keyWord}`,
      url: `https://jg-jg.shop/getTutorTag?keyword=${keyWord}`,
    })
      .then((doc) => {
        console.log(doc.data);
        dispatch(getTutors(doc.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export default handleActions(
  {
    [GET_TUTOR_LIST]: (state, action) =>
      produce(state, (draft) => {
        // console.log(action.payload.list);
        draft.list = action.payload.list;
      }),
  },
  initialState,
);

const actionCreators = {
  getTutorListDB,
  getSearchTutorsDB,
};

export { actionCreators };
