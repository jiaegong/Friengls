import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

const MODAL_ON = 'MODAL_ON';
const MODAL_OFF = 'MODAL_OFF';

const modalOn = createAction(MODAL_ON, (action) => ({
  action,
}));
const modalOff = createAction(MODAL_OFF, (action) => ({
  action,
}));

const initialState = {
  modalOn: false,
};

export default handleActions(
  {
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

export { modalOn, modalOff };
