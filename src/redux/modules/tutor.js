import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axios from 'axios';

const GET_TUTOR_LIST = 'GET_TUTOR_LIST';

const getTutors = createAction(GET_TUTOR_LIST, (list) => ({ list }));

const initialState = {
  list: [
    // {
    //   userName: 'aaa',
    //   userProfile: '',
    //   tag: 'bbb',
    //   comment: 'bbb',
    //   contents: 'bbb',
    //   isTutor: true,
    // },
  ],
};

const getTutorListDB = () => {
  return function (dispatch, getState, { history }) {
    axios({
      method: 'get',
      url: `https://hjg521.link/getPopularTutor`,
    })
      .then((res) => {
        dispatch(getTutors(res.data.data));
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
      url: `https://hjg521.link/getTutorTag?keyword=${keyWord}`,
    })
      .then((res) => {
        dispatch(getTutors(res.data));
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
