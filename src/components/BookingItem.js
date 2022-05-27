import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';
import { actionCreators as bookingAction } from '../redux/modules/booking';
import { history } from '../redux/configureStore';

const BookingItem = (props) => {
  const dispatch = useDispatch();

  const { item, userInfo } = props;

  console.log({ item });

  // 조건에 필요한 정보
  const isTutor = userInfo.isTutor;
  const TutorNoti = item.TutorNoti;
  const TuteeNoti = item.TuteeNoti;
  const TutorDel = item.TutorDel;
  const TuteeDel = item.TuteeDel;
  const timeId = item.timeId;

  // console.log({ TutorDel, TuteeDel, timeId, isTutor });

  // 예약 정보
  let startTime = item.start;
  let endTime = item.end;

  if (!item) return null; // 이 부분 불확실...
  let [week, month, day, year, sTime] = startTime.split(' ');
  let start = sTime.substr(0, 5);
  let end = endTime.substr(-17, 5);

  console.log(end);

  if (isTutor === 0) {
    return (
      <>
        {TuteeDel === 0 && (
          <li className="booking" key={`booking${timeId}`}>
            <div className="bookingInfo">
              {/* 선생인지 학생인지에 따라서 userName 다르게 보이게 함 */}
              <div className="userName">{item.Tutor_userName}</div>
              <div className="userBookingWrap">
                <span className="dayInfo">
                  {week} &nbsp; {month} &nbsp; {day} &nbsp; {year} &emsp;
                </span>
                <span className="timeInfo">
                  {start}&emsp;~&emsp;{end}
                </span>
              </div>
            </div>
            <button
              className="videoBtn"
              onClick={() => {
                history.push({
                  pathname: `/videochat/${
                    item.Tutor_userName + item.Tutee_userName
                  }`,
                  state: item.Tutor_userName,
                });
              }}
            >
              수업 시작
            </button>
            <button
              className="delBtn"
              onClick={() => {
                dispatch(bookingAction.delBookingNotiDB(timeId));
              }}
            >
              예약 취소
            </button>
          </li>
        )}
      </>
    );
  } else if (isTutor === 1) {
    return (
      <>
        {TutorDel === 0 && (
          <li className="booking" key={`booking${timeId}`}>
            <div className="bookingInfo">
              {/* 선생인지 학생인지에 따라서 userName 다르게 보이게 함 */}

              <div className="userName">{item.Tutee_userName}</div>

              <div className="userBookingWrap">
                <span className="dayInfo">
                  {week} &nbsp; {month} &nbsp; {day} &nbsp; {year} &emsp;
                </span>
                <span className="timeInfo">
                  {start}&emsp;~&emsp;{end}
                </span>
              </div>
            </div>
            <button
              className="videoBtn"
              onClick={() => {
                history.push(
                  `/videochat/${item.Tutor_userName + item.Tutee_userName}`,
                );
              }}
            >
              수업 시작
            </button>
            <button
              className="delBtn"
              onClick={() => {
                dispatch(bookingAction.delBookingNotiDB(timeId));
              }}
            >
              예약 취소
            </button>
          </li>
        )}
      </>
    );
  }

  return null;
};

export default BookingItem;
