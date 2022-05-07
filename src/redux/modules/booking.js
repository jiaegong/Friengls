import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import moment from 'moment';
import axios from 'axios';

const SET_BOOKING = 'SET_BOOKING';
const GET_BOOKING = 'GET_TIME';

const setBooking = createAction(SET_BOOKING, (data) => ({ data }));
const getBooking = createAction(GET_BOOKING, (data) => ({ data }));

// moment의 서포터 경고를 멈춰주는 코드
moment.suppressDeprecationWarnings = true;

const initialState = {
  list: [
    {
      start: 'Wed May 18 2022 10:00:00 GMT+0900',
      end: 'Wed May 18 2022 11:00:00 GMT+0900',
      userName: 'dingo',
      // start: moment(
      //   'Wed May 18 2022 10:00:00 GMT+0900',
      //   'ddd, DD MMM YYYY HH:mm:ss ZZ',
      // ),
      // end: moment(
      //   'Wed May 18 2022 11:00:00 GMT+0900',
      //   'ddd, DD MMM YYYY HH:mm:ss ZZ',
      // ),
    },
    {
      start: 'Wed May 18 2022 17:00:00 GMT+0900',
      end: 'Wed May 18 2022 20:00:00 GMT+0900',
      userName: 'minggiject',
    },
  ],
};

const setBookingDB = (data) => {
  // let token = localStorage.token;
  return function (dispatch, getState, { history }) {
    dispatch(setBooking(data));

    // 객체와 string 두개다 도전해보기
    // console.log(data[0].start.toString());
    // console.log(data[0].start);

    //
    // 토큰값을 여기서 받아서 넘기면 될꺼 같다.
    // 캘린더에서 값을 같이 안넣어도 될듯.

    // axios({
    //   method: 'post',
    //   url: `http://addBooking/${userName}`,
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem('token')}`,
    //   },
    //   data:{
    // start: data.start,
    // end: data.end
    // },
    // })
    //   .then((doc) => {
    //     console.log(doc);
    //     dispatch(setBooking(doc));
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
};

const getBookingDB = (userName) => {
  return function (dispatch, getState, { history }) {
    // userName 없으면 그냥 바로 취소 시켜 버림
    // 이부분은 좀더 생각해보자~!!!
    if (!userName) return;
    axios({
      method: 'get',
      url: `http://getBooking/${userName}`, // 학생 또는 선생님
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // 학생일때는 토큰으로 예약 정보 불러오기
      },
    })
      .then((doc) => {
        console.log(doc);

        dispatch(getBooking(doc));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export default handleActions(
  {
    [SET_BOOKING]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.data);
        draft.list = action.payload.data;
      }),
    [GET_BOOKING]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.data);
        // draft.list = action.payload.data;
      }),
  },
  initialState,
);

const actionCreators = {
  setBookingDB,
  getBookingDB,
};

export { actionCreators };
