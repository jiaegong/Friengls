import {
  createAction,
  handleActions
} from 'redux-actions';
import {
  produce
} from 'immer';

// 성지님 제가 modalOn 되면 App.js에서 리뷰 모달 띄워놓게 해놓아서 modal on/off 하나 더 만들어야 할 거 같습니다.. 이름은 openModal/closeModal 같은 거 추천드립니다..

const MODAL_ON = 'MODAL_ON';
const MODAL_OFF = 'MODAL_OFF';

const modalOn = createAction(MODAL_ON, (action) => ({
  action
}));
const modalOff = createAction(MODAL_OFF, (action) => ({
  action
}));

const initialState = {
  modalOn: false,
};

export default handleActions({
  [MODAL_ON]: (state, action) =>
    produce(state, (draft) => {
      draft.modalOn = true;
    }),
  [MODAL_OFF]: (state, action) =>
    produce(state, (draft) => {
      draft.modalOn = false;
    }),
},
  initialState,
);

export {
  modalOn,
  modalOff
};