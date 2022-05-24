import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as notiActions } from '../redux/modules/booking';

const NotiItem = (props) => {
  const dispatch = useDispatch();
  const { userInfo, notiItem } = props;

  console.log({ notiItem });

  //  조건에 필요한 정보
  const timeId = notiItem.timeId;
  // console.log({ timeId });

  const TutorNoti = notiItem.TutorNoti;
  const TuteeNoti = notiItem.TuteeNoti;
  const TutorDel = notiItem.TutorDel;
  const TuteeDel = notiItem.TuteeDel;
  const isTutor = userInfo.isTutor;

  // console.log({ TutorNoti, TuteeNoti });
  // console.log({ TutorDel, TuteeDel });

  // 예약 정보
  let startTime = notiItem.start;
  let endTime = notiItem.end;

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
          <div>
            {TuteeDel === 0 ? (
              <div
                className="text"
                onClick={() => {
                  clearNoti(timeId);
                }}
              >
                {/* {month}월 {day}일 2시에 예약이 되었습니다. */}
                내가 {month}월 {day}일 2시에 예약함.
              </div>
            ) : null}
          </div>
        </>
      );
    }

    if (TuteeNoti === 0) {
      return (
        <>
          {TutorDel === 0 ? null : (
            <div
              className="text"
              onClick={() => {
                //  삭제하는 함수 ( DB에 데이터 삭제 )
                dispatch(notiActions.delCheckNotiDB(timeId));
              }}
            >
              {/* 튜터 {notiItem.Tutor_userName}님이 강의를 취소하셨습니다. */}
              선생이 강의를 취소하셨습니다.
            </div>
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
          <div>
            {TutorDel === 0 ? (
              <div
                className="text"
                onClick={() => {
                  clearNoti(timeId);
                }}
              >
                학생이 {month}월 {day}일 2시에 예약있습니다.
              </div>
            ) : TuteeDel === 1 && TutorDel === 0 ? (
              <div
                className="text"
                onClick={() => {
                  clearNoti(timeId);
                }}
              >
                학생이 {month}월 {day}일 2시에 예약있습니다.
              </div>
            ) : null}
          </div>
        </>
      );
    }

    if (TutorNoti === 0) {
      return (
        <>
          {TuteeDel === 0 ? null : (
            <div
              className="text"
              onClick={() => {
                //  삭제하는 함수 ( DB에 데이터 삭제 )
                dispatch(notiActions.delCheckNotiDB(timeId));
              }}
            >
              {/* {notiItem.Tutee_userName}이 강의를 취소하셨습니다. */}
              {/* 튜티 {notiItem.Tutee_userName}님이 신청하신 강의를
                취소하셨습니다. */}
              {/* 튜티님이 강의를 취소하셨습니다. */}
              학생이 강의를 취소함 --> 강사는 메세지를 확인했었음
            </div>
          )}
        </>
      );
    }

    return null;
  }
};

export default NotiItem;
