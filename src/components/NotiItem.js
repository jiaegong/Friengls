import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as notiActions } from '../redux/modules/booking';

const NotiItem = (props) => {
  const dispatch = useDispatch();
  const { userInfo, notiItem } = props;

  // console.log({ notiItem });

  //  조건에 필요한 정보
  const timeId = notiItem.timeId;
  // console.log({ timeId });

  const TutorNoti = notiItem.TutorNoti;
  const TuteeNoti = notiItem.TuteeNoti;
  const TutorDel = notiItem.TutorDel;
  const TuteeDel = notiItem.TuteeDel;
  const isTutor = userInfo.isTutor;

  // 예약 정보
  const tutorName = notiItem.Tutor_userName;
  const tuteeName = notiItem.Tutee_userName;
  let startTime = notiItem.start;
  let endTime = notiItem.end;

  console.log({ tutorName, tuteeName });

  // if (!notiItem) return; // 이 부분 불확실...
  let [week, month, day, year, sTime] = startTime.split(' ');
  let start = sTime.substr(0, 5);
  let end = endTime.substr(-17, 5);
  // console.log({ start, end });

  function clearNoti(timeId) {
    dispatch(notiActions.clearNotiDB(timeId));
  }

  if (isTutor === 0) {
    if (TuteeNoti === 1) {
      return (
        <>
          {/* <div> */}
          {TuteeDel === 0 && TutorDel === 1 ? (
            <li
              className="text"
              onClick={() => {
                clearNoti(timeId);
              }}
            >
              {tutorName}튜터님이 예약을 취소하셨습니다.
            </li>
          ) : TuteeDel === 0 ? (
            <li
              className="text"
              onClick={() => {
                clearNoti(timeId);
              }}
            >
              {month}월 {day}일 2시에 강의를 예약하셨습니다.
            </li>
          ) : null}
          {/* </div> */}
        </>
      );
    }

    if (TuteeNoti === 0) {
      return (
        <>
          {TutorDel === 0 ? null : (
            <li
              className="text"
              onClick={() => {
                dispatch(notiActions.delCheckNotiDB(timeId));
              }}
            >
              {tutorName}튜터님이 예약을 취소하셨습니다.
            </li>
          )}
        </>
      );
    }

    return null;
  }

  if (isTutor === 1) {
    if (TutorNoti === 1) {
      return (
        <>
          {/* <div> */}
          {TutorDel === 0 && TuteeDel === 1 ? (
            <div
              className="text"
              onClick={() => {
                dispatch(notiActions.delCheckNotiDB(timeId));
              }}
            >
              {tuteeName}튜티님이 예약을 취소했습니다.
            </div>
          ) : TutorDel === 0 ? (
            <div
              className="text"
              onClick={() => {
                clearNoti(timeId);
              }}
            >
              {tuteeName}튜티님이 {month}월 {day}일 {startTime}시에
              예약있습니다.
            </div>
          ) : null}
          {/* </div> */}
        </>
      );
    }

    if (TutorNoti === 0) {
      return (
        <>
          {TuteeDel === 0 ? null : (
            <li
              className="text"
              onClick={() => {
                dispatch(notiActions.delCheckNotiDB(timeId));
              }}
            >
              {tuteeName}튜티님이 예약을 취소했습니다.
            </li>
          )}
        </>
      );
    }

    return null;
  }
};

export default NotiItem;
