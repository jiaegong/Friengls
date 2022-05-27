import { red } from '@material-ui/core/colors';
import React from 'react';
import styled from 'styled-components';
import { NewInputLabel, NewInput } from '../elements/index';
import InfoInput from './InfoInput';
import { useTranslation } from 'react-i18next';

const SelectIsTutor = ({
  startTime,
  isTutor,
  _onClick,
  handleStartTime,
  handleEndTime,
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

  return (
    <TimeBox>
      <p>{t('friengls user setting')}</p>
      <NewInputLabel styles={{ padding: '0 0 5px 5px' }}>
        {t('you can not change it when you select tutor / tutee')}
      </NewInputLabel>
      <InfoInput onlyBox styles={{ justifyContent: 'flex-start' }}>
        <NewInputLabel> {t('in friengls i want to')}</NewInputLabel>
        <NewInput
          type="radio"
          name="isTutor"
          value="0"
          id="isTutor0"
          styles={{ margin: '0 0 0 10px', width: '15px', cursor: 'pointer' }}
          _onChange={_onClick}
        />
        <NewInputLabel
          htmlFor="isTutor0"
          styles={{
            padding: '0 10px 0 10px',
            alignItems: 'center',
          }}
        >
          {t('learn!')}
        </NewInputLabel>
        /
        <NewInput
          type="radio"
          name="isTutor"
          value="1"
          _onChange={_onClick}
          styles={{ margin: '0 0 0 10px', width: '15px', cursor: 'pointer' }}
        />
        <NewInputLabel
          styles={{
            padding: '0 0 0 10px',
            alignItems: 'center',
          }}
        >
          {t('teach!')}
        </NewInputLabel>
      </InfoInput>
      {/* 선생님인 경우 수업시간 선택 */}
      {isTutor === '1' && (
        <React.Fragment>
          <InfoInput onlyBox styles={{ justifyContent: 'flex-start' }}>
            <TimeSelectBox>
              {t('available time for tutoring')} :
              <Select name="startTime" onChange={handleStartTime}>
                <option value="">====={t('first tutoring')}=====</option>
                {startTimeArray.map((time, index) => (
                  //+ 키 유저아이디 같은걸로 바꿔주기
                  <option value={time} key={index}>
                    {time + 1}
                    {t('session')}: {time}:00 - {time + 1}:00
                  </option>
                ))}
              </Select>
              {t('from')}
              {startTime === '' ? (
                <></>
              ) : (
                <>
                  <Select name="endTime" onChange={handleEndTime}>
                    <option value="">====={t('last tutoring')}=====</option>
                    {endTimeArray.map((time, index) => (
                      <option value={time} key={startTime + index}>
                        {time + 1}
                        {t('session')}: {time}:00 - {time + 1}:00
                      </option>
                    ))}
                  </Select>
                  {t('to')}
                </>
              )}
            </TimeSelectBox>
          </InfoInput>
          <InfoBox>
            <span>
              ※ {t('"the tutoring lesson lasts 30 minutes each time.')}
            </span>
            <span>
              ※ {t('tutoring lessons can be organized in two sessions.')}
            </span>
            <span>
              ※ {t('you can take at least 2 sessions and up to 12 sessions.')}
            </span>
            <span>※ {t('you can change tutoring time on my page.')}</span>
          </InfoBox>
        </React.Fragment>
      )}
    </TimeBox>
  );
};

const IsTutorTooltip = styled.div`
  width: 420px;
  height: 50px;
  padding: 10px 0;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  position: absolute;
  top: -50px;
  right: -300px;
  font-size: 20px;
  font-weight: 400;
  text-align: center;
`;

const TimeBox = styled.div`
  width: 100%;
  padding: 20px 0;
  border-top: 1px solid #c4c4c4;

  p {
    margin: 0 auto 25px;
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    color: #153587;
  }
`;

const TimeSelectBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
`;

const Select = styled.select`
  width: 140px;
  height: 30px;
  margin: 0 10px;
  border: 1px solid #8a8a8a;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
`;

const InfoBox = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  font-size: 12px;
`;

export default SelectIsTutor;
