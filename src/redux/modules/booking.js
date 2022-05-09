import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import moment from 'moment';
import axios from 'axios';

const SET_BOOKING = 'SET_BOOKING';
const GET_BOOKING = 'GET_BOOKING';

const setBooking = createAction(SET_BOOKING, (data) => ({ data }));
const getBooking = createAction(GET_BOOKING, (data) => ({ data }));

// moment의 서포터 경고를 멈춰주는 코드
moment.suppressDeprecationWarnings = true;

const initialState = {
  list: [
    // {
    //   Tutee_userName: 'test0022',
    //   Tutor_userName: 'yoonha3331',
    //   end: 'Thu May 26 2022 20:00:00 GMT+0900',
    //   start: 'Thu May 26 2022 19:00:00 GMT+0900',
    //   timeId: 27,
    // },
    // {
    //   Tutee_userName: 'test0022',
    //   Tutor_userName: 'yoonha3331',
    //   end: 'Thu May 23 2022 13:00:00 GMT+0900',
    //   start: 'Thu May 23 2022 12:00:00 GMT+0900',
    //   timeId: 28,
    // },
    // {
    //   start: 'Wed May 18 2022 10:00:00 GMT+0900',
    //   end: 'Wed May 18 2022 11:00:00 GMT+0900',
    //   userName: 'dingo',
    //   start: moment(
    //     'Wed May 18 2022 10:00:00 GMT+0900',
    //     'ddd, DD MMM YYYY HH:mm:ss ZZ',
    //   ),
    //   end: moment(
    //     'Wed May 18 2022 11:00:00 GMT+0900',
    //     'ddd, DD MMM YYYY HH:mm:ss ZZ',
    //   ),
    // },
  ],
};

// 예약하기.
const setBookingDB = (data) => {
  // let token = localStorage.token;
  return function (dispatch, getState, { history }) {
    console.log(data);

    const userName = data[0].userName;
    // const start: data[0].start.toString();
    // const end: data[0].end.toString();

    console.log();

    dispatch(setBooking(data));

    axios({
      method: 'post',
      url: `https://jg-jg.shop/addBooking/yoonha3331`,
      // url: `https://jg-jg.shop/addBooking/${튜터이름}`,
      data: {
        start: data[0].start.toString(),
        end: data[0].end.toString(),
        userName: userName,
      },
    })
      .then((doc) => {
        console.log('--------------');
        console.log('booking post check!!!!');
        console.log(doc);
        // dispatch(setBooking(doc));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 예약리스트 불러오기
const getBookingDB = (userName) => {
  return function (dispatch, getState, { history }) {
    // userName 없을시 에러 뜨는 경우 방지 ??? 없어도 되나??
    // if (!userName) return;

    axios({
      method: 'get',
      url: `https://jg-jg.shop/getBooking/?userName=yoonha3331&isTutor=1`, // 학생 또는 선생님
      // url: `https://jg-jg.shop/getBooking/?userName=${튜터이름}&isTutor=${1 or 0}`, // 학생 또는 선생님
    })
      .then((doc) => {
        // console.log(doc.data.datas1[0].endTime);
        // let endTimeDB = doc.data.datas1[0].endTime;
        // let endTime = moment(endTimeDB, 'ddd, DD MMM YYYY HH:mm:ss ZZ');
        // console.log(endTime);

        dispatch(getBooking(doc.data));
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
        draft.list = action.payload.data.datas1;
      }),
  },
  initialState,
);

const actionCreators = {
  setBookingDB,
  getBookingDB,
};

export { actionCreators };
