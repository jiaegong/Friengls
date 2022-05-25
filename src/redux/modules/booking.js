import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import moment from 'moment';
import axios from 'axios';
import { getCookie } from '../../shared/Cookie';
import Swal from 'sweetalert2';

const SET_BOOKING = 'SET_BOOKING';
const GET_BOOKING = 'GET_BOOKING';
const GET_NOTI = 'GET_NOTI';
const CLEAR_NOTI = 'CLEAR_NOTI';
const DEL_NOTI = 'DEL_NOTI';
const DEL_CHECK_NOTI = 'DEL_CHECK_NOTI';
const DEL_ALL_NOTI = 'DEL_ALL_NOTI';

const setBooking = createAction(SET_BOOKING, (data) => ({ data }));
const getBooking = createAction(GET_BOOKING, (data) => ({ data }));
const getNoti = createAction(GET_NOTI, (data) => ({ data }));
const clearNoti = createAction(CLEAR_NOTI, (data) => ({ data }));
const delNoti = createAction(DEL_NOTI, (data) => ({ data }));
const delCheckNoti = createAction(DEL_CHECK_NOTI, (data) => ({ data }));
const delAllNoti = createAction(DEL_ALL_NOTI, (data) => ({ data }));

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
    let isTutor = getState().user.info.isTutor;
    console.log(userName);

    if (!userName) {
      alert('로그인후 예약해주세요~!');
      return;
    }

    if (isTutor === 1) {
      // alert("선생님은.. 예약 할수 없어요... ㅠㅠ")
      Swal.fire({
        // position: 'center',
        icon: 'error',
        text: `선생님은.. 예약 할수 없어요... ㅠㅠ`,
        showConfirmButton: true,
        confirmButtonColor: '#3085d6',
        // timer: 2000,
      });
      return;
    }

    if (data.length === 0) {
      Swal.fire({
        icon: 'error',
        text: '시간과 날짜를 선택해주세요~',
        confirmButtonColor: '#3085d6',
        confirmButtonText: '확인',
      }).then((result) => {
        if (result.isConfirmed) {
          // history.push('/login');
          window.location.reload();
        }
      });
    }

    console.log(data);

    axios({
      method: 'post',
      // url: `https://hjg521.link/addBooking/jungi521`,
      // url: `https://13.124.206.190/addBooking/yoonha3331`, // 학생 또는 선생님
      url: `https://hjg521.link/addBooking/${tutorName}`,
      // url: `http://13.124.206.190/addBooking/${tutorName}`,
      data: {
        start: data[0]?.start,
        end: data[0]?.end,
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

        Swal.fire({
          // position: 'top-end',
          icon: 'success',
          text: `${Month(
            month,
          )}월  ${day}일   ${start} - ${end} 예약 되었습니다!!`,
          showConfirmButton: true,
          confirmButtonColor: '#3085d6',
          // timer: 2000,
        });
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
      // url: `https://hjg521.link/getBooking/?userName=jungi521&isTutor=1`, // 학생 또는 선생님
      // url: `https://hjg521.link/getBooking/?userName=yoonha3331&isTutor=1`, // 학생 또는 선생님
      url: `https://hjg521.link/getBooking/?userName=${userName}&isTutor=${isTutor}`, // 학생 또는 선생님
    })
      .then((doc) => {
        // console.log(doc.data.datas1[0].endTime);
        // let endTimeDB = doc.data.datas1[0].endTime;
        // let endTime = moment(endTimeDB, 'ddd, DD MMM YYYY HH:mm:ss ZZ');
        // console.log(endTime);
        console.log(doc.data);

        dispatch(getBooking(doc.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 알림 예약 불러오기
const getBookingNotiDB = () => {
  return function (dispatch, getState, { history }) {
    console.log('work!!');
    axios({
      method: 'get',
      url: `https://hjg521.link/getNoti`,
      headers: { token: `${getCookie('token')}` },
    })
      .then((doc) => {
        console.log(doc);
        dispatch(getNoti(doc.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 알림 확인 ( 한개씩 )
const clearNotiDB = (timeId) => {
  return function (dispatch, getState, { history }) {
    console.log({ timeId });
    axios({
      method: 'patch',
      url: `https://hjg521.link/delNoti/?timeId=${timeId}`,
      headers: { token: `${getCookie('token')}` },
    })
      .then((doc) => {
        console.log(doc);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 예약 취소 알림
const delBookingNotiDB = (timeId) => {
  return function (dispatch, getState, { history }) {
    dispatch(clearNotiDB(timeId));

    console.log(timeId);
    axios({
      method: 'patch',
      url: `https://hjg521.link/delBooking/?timeId=${timeId}`,
      headers: { token: `${getCookie('token')}` },
    })
      .then((doc) => {
        Swal.fire({
          // position: 'top-end',
          icon: 'success',
          text: `예약을 취소하셨습니다~!`,
          showConfirmButton: true,
          confirmButtonColor: '#3085d6',
          // timer: 2000,
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 예약 삭제 확정
const delCheckNotiDB = (timeId) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: 'delete',
      url: `https://hjg521.link/delBookingCheck/?timeId=${timeId}`,
      headers: { token: `${getCookie('token')}` },
    })
      .then((doc) => {
        console.log(doc);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 알림 전체 제게
const delAllNotiDB = () => {
  return function (dispatch, getState, { history }) {
    console.log('알림 전체 지우기 버튼 활성화!');
    axios({
      method: 'patch',
      url: `https://hjg521.link/delAllNoti`,
      headers: { token: `${getCookie('token')}` },
    })
      .then((doc) => {
        console.log(doc);
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
    [GET_NOTI]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.data;
      }),
    [CLEAR_NOTI]: (state, action) =>
      produce(state, (draft) => {
        console.log(action);
        // draft.list = action.payload.data;
      }),
    [DEL_NOTI]: (state, action) =>
      produce(state, (draft) => {
        console.log(action);
        // draft.list = action.payload.data;
      }),
    [DEL_CHECK_NOTI]: (state, action) =>
      produce(state, (draft) => {
        console.log(action);
        // draft.list = action.payload.data;
      }),
    [DEL_ALL_NOTI]: (state, action) =>
      produce(state, (draft) => {
        console.log(action);
        // draft.list = action.payload.data;
      }),
  },
  initialState,
);

const actionCreators = {
  setBookingDB,
  getBookingDB,
  getBookingNotiDB,
  clearNotiDB,
  delBookingNotiDB,
  delCheckNotiDB,
  delAllNotiDB,
};

export { actionCreators };
