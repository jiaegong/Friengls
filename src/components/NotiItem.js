import React from 'react';
import { useDispatch } from 'react-redux';

// 모듈
import { actionCreators as notiActions } from '../redux/modules/booking';
import { useTranslation } from 'react-i18next';

const NotiItem = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { userInfo, notiItem } = props;

  //  조건에 필요한 정보
  const timeId = notiItem.timeId;

  const TutorNoti = notiItem.TutorNoti;
  const TuteeNoti = notiItem.TuteeNoti;
  const TutorDel = notiItem.TutorDel;
  const TuteeDel = notiItem.TuteeDel;
  const isTutor = userInfo.isTutor;

  // 예약 정보
  const tutorName = notiItem.Tutor_userName;
  const tuteeName = notiItem.Tutee_userName;
  let startTime = notiItem.start;

  let [week, month, day, year, sTime] = startTime.split(' ');
  let start = sTime.substr(0, 5);

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

  // 유저가 학생일때
  if (isTutor === 0) {
    // 메세지를 아직 확인 하지 않았을때
    if (TuteeNoti === 1) {
      return (
        <>
          {TuteeDel === 1 ? (
            <li
              className="textItem"
              onClick={() => {
                dispatch(notiActions.clearNotiDB(timeId));
              }}
            >
              {tutorName}
              {t('canceled booking.')}
            </li>
          ) : TuteeDel === 0 ? (
            <li
              className="textItem"
              onClick={() => {
                dispatch(notiActions.clearNotiDB(timeId));
              }}
            >
              {Month(month)}
              {t('month')} {day}
              {t('day')} {start}
              {t('booked tutoring.')}
            </li>
          ) : null}
        </>
      );
    }

    // 메세지를 확인했을때
    if (TuteeNoti === 0) {
      return (
        <>
          {TuteeDel === 0 ? null : (
            <li
              className="textItem"
              onClick={() => {
                dispatch(notiActions.delCheckNotiDB(timeId));
              }}
            >
              {tutorName}
              {t('canceled booking.')}
            </li>
          )}
        </>
      );
    }

    return null;
  }

  // 유저가 선생님일때
  if (isTutor === 1) {
    // 메세지를 확인하지 않았을때
    if (TutorNoti === 1) {
      return (
        <>
          {TutorDel === 1 ? (
            <div
              className="textItem"
              onClick={() => {
                dispatch(notiActions.delCheckNotiDB(timeId));
              }}
            >
              {tuteeName}
              {t('canceled booking.')}
            </div>
          ) : TutorDel === 0 ? (
            <div
              className="textItem"
              onClick={() => {
                dispatch(notiActions.clearNotiDB(timeId));
              }}
            >
              {tuteeName} {Month(month)}
              {t('month')} {day}
              {t('day')} {start}
              {t('booked tutoring.')}
            </div>
          ) : null}
        </>
      );
    }

    // 메세지를 확인 했을때
    if (TutorNoti === 0) {
      return (
        <>
          {TutorDel === 0 ? null : (
            <li
              className="textItem"
              onClick={() => {
                dispatch(notiActions.delCheckNotiDB(timeId));
              }}
            >
              {tuteeName}
              {t('canceled booking.')}
            </li>
          )}
        </>
      );
    }

    return null;
  }
};

export default NotiItem;
