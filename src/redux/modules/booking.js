import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import moment from 'moment';
import axios from 'axios';
import { getCookie } from '../../shared/Cookie';

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
const setBookingDB = (data, tutorName) => {
  return function (dispatch, getState, { history }) {
    console.log('DB 저장으로 가는 데이터 : ', { data, tutorName });

    let userName = getState().user.info.userName;
    console.log(userName);

    if (!userName) {
      alert('로그인후 예약해주세요~!');
      return;
    }

    axios({
      method: 'post',
      // url: `https://jg-jg.shop/addBooking/jungi521`,
      // url: `https://13.124.206.190/addBooking/yoonha3331`, // 학생 또는 선생님
      url: `https://jg-jg.shop/addBooking/${tutorName}`,
      // url: `http://13.124.206.190/addBooking/${tutorName}`,
      data: {
        start: data[0].start,
        end: data[0].end,
        userName: userName,
      },
    })
      .then((doc) => {
        console.log('--------------');
        console.log('booking post check!!!!');
        console.log({ data });

        const startTime = data[0].start;
        const endTime = data[0].end;

        console.log({ startTime, endTime });

        let [week, month, day, year, sTime] = startTime.toString().split(' ');
        let start = sTime.substr(0, 5);
        let end = endTime.toString().substr(-17, 5);

        console.log({ week, month, day, year });
        console.log({ start, end });

        let Month = (month) => {
          console.log(month);
          if (month === 'Jan') return '1';
          if (month === 'Feb') return '2';
          if (month === 'Mar') return '3';
          if (month === 'Apr') return '4';
          if (month === 'May') return '5';
          if (month === 'Jun') return '6';
          if (month === 'Jul') return '7';
          if (month === 'Aug') return '8';
          if (month === 'Sep') return '9';
          if (month === 'Oct') return '10';
          if (month === 'Nov') return '11';
          if (month === 'Dec') return '12';
        };

        alert(
          ` 튜터 ${tutorName}님에게   ${Month(
            month,
          )}월  ${day}일   ${start} - ${end} 예약 되었습니다!!`,
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 예약리스트 불러오기
const getBookingDB = ({ userName, isTutor }) => {
  // const getBookingDB = (data) => {
  return function (dispatch, getState, { history }) {
    // userName 없을시 에러 뜨는 경우 방지 ??? 없어도 되나??
    // if (!userName) return;
    console.log({ userName, isTutor });

    axios({
      method: 'get',
      // url: `https://jg-jg.shop/getBooking/?userName=jungi521&isTutor=1`, // 학생 또는 선생님
      // url: `https://jg-jg.shop/getBooking/?userName=yoonha3331&isTutor=1`, // 학생 또는 선생님
      url: `https://jg-jg.shop/getBooking/?userName=${userName}&isTutor=${isTutor}`, // 학생 또는 선생님
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
