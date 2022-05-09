import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axios from 'axios';

const GET_TUTOR = 'GET_TUTOR';

const getTutor = createAction(GET_TUTOR, (list) => ({ list }));

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

const getTutorDB = () => {
  return function (dispatch, getState, { history }) {
    axios({
      method: 'get',
      url: 'http://3.36.123.28/getTutor',
    })
      .then((res) => {
        dispatch(getTutor(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export default handleActions(
  {
    [GET_TUTOR]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.list;
      }),
  },
  initialState,
);

const actionCreators = {
  getTutorDB,
};

export { actionCreators };
