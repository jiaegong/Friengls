import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axios from 'axios';

const GET_TUTOR_LIST = 'GET_TUTOR_LIST';

const getList = createAction(GET_TUTOR_LIST, (list) => ({ list }));

const initialState = {
  list: [
    {
      userName: 'aaa',
      userProfile: '',
      tag: '',
      comment: '',
      contents: '',
      isTutor: true,
    },
  ],
};

const getListDB = () => {
  return function (dispatch, getState, { history }) {
    axios({
      method: 'get',
      // url: 'https://6251cd887f7fa1b1dddf398b.mockapi.io/user',
      // url: `https://jg-jg.shop/getPopularTutor`,
      url: 'http://13.124.206.190/getPopularTutor',
    })
      .then((doc) => {
        console.log(doc.data);
        dispatch(getList(doc.data));
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
        console.log(action.payload.list.data);
        draft.list = action.payload.list.data;
      }),
  },
  initialState,
);

const actionCreators = {
  getListDB,
};

export { actionCreators };
