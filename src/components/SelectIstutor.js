import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

// 엘리먼트
import { InputLabel, Input, InfoInput } from '../elements/index';

const SelectIsTutor = ({
  startTime,
  endTime,
  startNum,
  endNum,
  isTutor,
  _onChange,
  handleStartTime,
  handleEndTime,
  title,
  checked,
  readOnly,
  confirmed,
  isSignup,
}) => {
  const { t } = useTranslation();
  //수업가능시간(시작) option
  const startTimeArray = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ];
  //수업가능시간(종료) option설정
  const endTimeArray = [];
  for (let i = 1; i < 7; i++) {
    Number(startTime) + (2 * i - 1) < 24
      ? endTimeArray.push(Number(startTime) + (2 * i - 1))
      : endTimeArray.push(Number(startTime) + (2 * i - 1) - 24);
  }
  const [notification, setNotification] = useState(false);
  const notificationOn = () => {
    setNotification(true);
  };

  const notificationOff = () => {
    setNotification(false);
  };

  return (
    <TimeBox isSignup={isSignup}>
      <p>{title}</p>
      {isSignup && (
        <InputLabel styles={{ padding: '20px 0 5px 5px' }}>
          {t('you can not change it when you select tutor / tutee')}
        </InputLabel>
      )}
      <InfoInput
        onlyBox
        styles={
          isSignup
            ? { justifyContent: 'flex-start' }
            : {
                justifyContent: 'flex-start',
                background: 'rgba(0,0,0,0.05)',
                cursor: 'default',
                color: '#999',
              }
        }
        confirmed={confirmed}
      >
        <InputLabel>{t('in friengls i want to')}</InputLabel>
        <Input
          type="radio"
          name="isTutor"
          value="0"
          checked={checked ? (checked === 'isTutee' ? true : false) : undefined}
          _onChange={_onChange}
          readOnly={readOnly}
          styles={{ margin: '0 0 0 10px', width: '15px', cursor: 'pointer' }}
        />
        <InputLabel
          styles={{
            padding: '0 10px 0 10px',
            alignItems: 'center',
          }}
        >
          {t('learn!')}
        </InputLabel>
        /
        <Input
          type="radio"
          name="isTutor"
          value="1"
          checked={checked ? (checked === 'isTutor' ? true : false) : undefined}
          _onChange={_onChange}
          readOnly={readOnly}
          styles={{ margin: '0 0 0 10px', width: '15px', cursor: 'pointer' }}
        />
        <InputLabel
          styles={{
            padding: '0 0 0 10px',
            alignItems: 'center',
          }}
        >
          {t('teach!')}
        </InputLabel>
      </InfoInput>
      {/* 선생님인 경우 수업시간 선택 */}
      {Number(isTutor) === 1 && (
        <React.Fragment>
          <InfoInput
            onlyBox
            styles={{ justifyContent: 'flex-start' }}
            _onMouseOver={notificationOn}
            _onMouseOut={notificationOff}
          >
            <TimeSelectBox>
              {t('available time for tutoring')} :
              <Select name="startTime" onChange={handleStartTime}>
                <option value="">
                  {' '}
                  {startTime
                    ? startNum +
                      1 +
                      t('session') +
                      ': ' +
                      startNum +
                      ':00 - ' +
                      (startNum + 1) +
                      ':00'
                    : `=====${t('first tutoring')}=====`}
                </option>
                {startTimeArray.map((time, index) => (
                  //+ 키 유저아이디 같은걸로 바꿔주기
                  <option value={time} key={time + index}>
                    {time + 1}
                    {t('session')}: {time}:00 - {time + 1}:00
                  </option>
                ))}
              </Select>
              {t('from')}
              {startTime === '' ? (
                <React.Fragment></React.Fragment>
              ) : (
                <React.Fragment>
                  <Select name="endTime" onChange={handleEndTime}>
                    <option value="">
                      {endTime
                        ? endNum +
                          1 +
                          t('session') +
                          ': ' +
                          endNum +
                          ':00 - ' +
                          (endNum + 1) +
                          ':00'
                        : `=====${t('last tutoring')}=====`}
                    </option>
                    {endTimeArray.map((time, index) => (
                      <option value={time} key={startTime + index}>
                        {time + 1}
                        {t('session')}: {time}:00 - {time + 1}:00
                      </option>
                    ))}
                  </Select>
                  {t('to')}
                </React.Fragment>
              )}
              {notification && (
                <InfoBox>
                  <span>
                    ※ {t('the tutoring lesson lasts 30 minutes each time.')}
                  </span>
                  <span>
                    ※ {t('tutoring lessons can be organized in two sessions.')}
                  </span>
                  <span>
                    ※{' '}
                    {t(
                      'you can take at least 2 sessions and up to 12 sessions.',
                    )}
                  </span>
                  <span>※ {t('you can change tutoring time on my page.')}</span>
                </InfoBox>
              )}
            </TimeSelectBox>
          </InfoInput>
        </React.Fragment>
      )}
    </TimeBox>
  );
};

const TimeBox = styled.div`
  width: 100%;
  padding: 20px 0;
  border-top: 1px solid #c4c4c4;

  p {
    margin: ${(props) => (props.isSignup ? '0 auto 15px' : '20px auto 0')};
    text-align: ${(props) => (props.isSignup ? 'center' : '')};
    font-size: 20px;
    font-weight: 700;
    color: ${(props) => (props.isSignup ? '#153587' : '')};
  }
`;

const TimeSelectBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  position: relative;
`;

const Select = styled.select`
  width: 140px;
  height: 30px;
  margin: 0 10px;
  text-align: center;
  border: 1px solid #8a8a8a;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
`;

const InfoBox = styled.div`
  width: 420px;
  margin: 20px;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  position: absolute;
  bottom: 20px;
  left: 280px;
  font-size: 12px;
  text-align: center;
`;

export default SelectIsTutor;
