import { red } from '@material-ui/core/colors';
import React from 'react';
import styled from 'styled-components';
import {
  InputBox,
  InputLabel,
  Inputs,
  NewInputLabel,
  NewInput,
} from '../elements/index';
import InfoInput from './InfoInput';

const SelectIsTutor = ({
  startTime,
  isTutor,
  _onClick,
  handleStartTime,
  handleEndTime,
}) => {
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
      <p>프랭글스 사용자 설정</p>
      <NewInputLabel styles={{ padding: '0 0 5px 5px' }}>
        학생 / 선생님 선택 시 변경 하실 수 없습니다.
      </NewInputLabel>
      <InfoInput onlyBox styles={{ justifyContent: 'flex-start' }}>
        <NewInputLabel>프랭글스에서 한국어를</NewInputLabel>
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
          배울래요!
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
          가르칠래요!
        </NewInputLabel>
      </InfoInput>
      {/* 선생님인 경우 수업시간 선택 */}
      {isTutor === '1' && (
        <React.Fragment>
          <InfoInput onlyBox styles={{ justifyContent: 'flex-start' }}>
            {' '}
            <TimeSelectBox>
              수업 가능한 시간 :
              <Select name="startTime" onChange={handleStartTime}>
                <option value="">=====첫 수업=====</option>
                {startTimeArray.map((time, index) => (
                  //+ 키 유저아이디 같은걸로 바꿔주기
                  <option value={time} key={index}>
                    {time + 1}회차: {time}:00 - {time + 1}:00
                  </option>
                ))}
              </Select>
              부터
              {startTime === '' ? (
                <></>
              ) : (
                <>
                  <Select name="endTime" onChange={handleEndTime}>
                    <option value="">=====마지막 수업=====</option>
                    {endTimeArray.map((time, index) => (
                      <option value={time} key={startTime + index}>
                        {time + 1}회차: {time}:00 - {time + 1}:00
                      </option>
                    ))}
                  </Select>
                  까지
                </>
              )}
            </TimeSelectBox>
          </InfoInput>
          <InfoBox>
            <span>※ 수업은 한 회차에 30분 씩 진행됩니다.</span>
            <span>※ 수업은 2회차 단위로 구성 할 수 있습니다.</span>
            <span>※ 최소 2회차, 최대 12회차까지 수업 할 수 있습니다.</span>
            <span>※ 수업 시간은 마이페이지에서 변경 할 수 있습니다.</span>
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
