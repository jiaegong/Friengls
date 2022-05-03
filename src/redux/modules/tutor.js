import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axios from 'axios';

const GET_LIST = 'GET_LIST';

const getList = createAction(GET_LIST, (list) => ({ list }));

const initialState = {
  list: [
    {
      userName: 'aaa',
      userProfile: '',
      tag: '',
      contents: '',
      isTutor: true,
    },
  ],
};

const getListDB = () => {
  return function (dispatch, getState, { history }) {
    axios({
      method: 'get',
      url: 'https://6251cd887f7fa1b1dddf398b.mockapi.io/user',
    })
      .then((doc) => {
        // console.log(doc);
        dispatch(getList(doc));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export default handleActions(
  {
    [GET_LIST]: (state, action) =>
      produce(state, (draft) => {
        // console.log(action.payload.list.data);
        draft.list = action.payload.list.data;
      }),
  },
  initialState,
);

const actionCreators = {
  getListDB,
};

export { actionCreators };
