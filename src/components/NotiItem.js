import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as notiActions } from '../redux/modules/booking';


const NotiItem = (props) => {
  const dispactch = useDispatch();
  const { userInfo, notiItem } = props

  console.log({ notiItem })
  console.log(notiItem.length)

  //  조건에 필요한 정보
  const timeId = notiItem.timeId;
  console.log({ timeId })

  const noti = notiItem.noti;
  const del = notiItem.del;
  const isTutor = userInfo.isTutor

  // 예약 정보
  let startTime = notiItem.start;
  let endTime = notiItem.end;

  // if (!notiItem) return; // 이 부분 불확실...
  let [week, month, day, year, sTime] = startTime.split(' ');
  let start = sTime.substr(0, 5);
  let end = endTime.substr(-17, 5);
  console.log({ start, end });

  function clearNoti(timeId) {
    dispactch(notiActions.clearNotiDB(timeId));
  }

  if (isTutor === 0) {

    if (noti === 0) {
      return (
        <>
          {del === 0 ? (
            null
          ) : (
            <div
              className="text"
              onClick={() => {
                //  삭제하는 함수 ( DB에 데이터 삭제 )
                dispactch(notiActions.delCheckNotiDB(timeId))
              }}
            >
              튜터 {notiItem.Tutor_userName}님이 강의를 취소하셨습니다.
              {/* 튜터님이 강의를 취소하셨습니다. */}
            </div>
          )}
        </>
      )
    }

    if (noti === 1) {
      return (
        <>
          <div>
            {del === 0 ? (
              <div
                className="text"
                onClick={() => {
                  clearNoti(timeId);
                }}
              >
                {month}월 {day}일 2시에 예약있습니다.
              </div>
            ) : (
              <div
                className="text"
                onClick={() => {
                  // 데이터 삭제하는 함수
                  dispactch(notiActions.delCheckNotiDB(timeId))
                }}
              >
                신청하신 튜터님의 강의가 거절되셨습니다.
                {/* 선생이 강의를 거절되셨습니다. */}
              </div>
            )}
          </div>
        </>
      )
    }


    return null
  }

  if (isTutor === 1) {

    if (noti === 0) {
      return (
        <>
          {del === 0 ? (
            null
          ) : (
            <div
              className="text"
              onClick={() => {
                //  삭제하는 함수 ( DB에 데이터 삭제 )
                dispactch(notiActions.delCheckNotiDB(timeId))

              }}
            >
              {notiItem.Tutee_userName}이 강의를 취소하셨습니다.
              {/* 튜티님이 강의를 취소하셨습니다. */}
            </div>
          )}
        </>
      )
    }

    if (noti === 1) {
      return (
        <>
          <div>

            {del === 0 ? (
              <div
                className="text"
                onClick={() => {
                  clearNoti(timeId);
                }}
              >
                {month}월 {day}일 2시에 예약있습니다.
              </div>
            ) : (
              <div
                className="text"
                onClick={() => {
                  // 데이터 삭제하는 함수
                  dispactch(notiActions.delCheckNotiDB(timeId))
                }}
              >
                튜티 {notiItem.Tutee_userName}님이 신청하신 강의를 취소하셨습니다.
                {/* 튜티님이 신청하신 강의를 취소하셨습니다. */}

              </div>
            )}
          </div>
        </>
      )
    }


    return null
  }

}

export default NotiItem;