import React from 'react';
import { useDispatch } from 'react-redux';
import { history } from '../redux/configureStore';
import { useTranslation } from 'react-i18next';

// 모듈
import { actionCreators as bookingAction } from '../redux/modules/booking';
import { actionCreators as notiActions } from '../redux/modules/booking';

const BookingItem = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { item, userInfo } = props;

  // 조건에 필요한 정보
  const isTutor = userInfo.isTutor;
  const TutorDel = item.TutorDel;
  const TuteeDel = item.TuteeDel;
  const timeId = item.timeId;

  // 예약 정보
  let startTime = item.start;
  let endTime = item.end;

  if (!item) return null;
  let [week, month, day, year, sTime] = startTime.split(' ');
  let start = sTime.substr(0, 5);
  let end = endTime.substr(-17, 5);

  // 학생일때
  if (isTutor === 0) {
    return (
      <>
        {TuteeDel === 0 && TutorDel === 0 && (
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
              {t('start')}
            </button>
            <button
              className="delBtn"
              onClick={() => {
                dispatch(bookingAction.delBookingNotiDB(timeId));
              }}
            >
              {t('cancel')}
            </button>
          </li>
        )}
        {(TuteeDel === 1 || TutorDel === 1) && (
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
              className="deleteBtn"
              onClick={() => {
                TuteeDel === 1 && dispatch(notiActions.delCheckNotiDB(timeId));
              }}
            >
              {t('canceled')}
            </button>
          </li>
        )}
      </>
    );

    // 선생님일때
  } else if (isTutor === 1) {
    return (
      <>
        {TuteeDel === 0 && TutorDel === 0 && (
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
              {t('start')}
            </button>
            <button
              className="delBtn"
              onClick={() => {
                dispatch(bookingAction.delBookingNotiDB(timeId));
              }}
            >
              {t('cancel')}
            </button>
          </li>
        )}
        {(TuteeDel === 1 || TutorDel === 1) && (
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
              className="deleteBtn"
              onClick={() => {
                TutorDel === 1 && dispatch(notiActions.delCheckNotiDB(timeId));
              }}
            >
              {t('canceled')}
            </button>
          </li>
        )}
      </>
    );
  }

  return null;
};

export default BookingItem;
