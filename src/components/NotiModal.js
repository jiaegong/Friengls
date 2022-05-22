import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const NotiModal = (props) => {
  const notiList = useSelector((state) => state.booking.noti);
  console.log(props);
  const ModalAction = props.ModalAction;

  React.useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  return (
    <>
      <Background
        onClick={(e) => {
          ModalAction();
        }}
      >
        <div className="notifications">
          <div className="notificationsInnerWrap">
            {notiList.map((notiItem, idx) => {
              console.log(notiItem);
              let startTime = notiItem.start;
              let endTime = notiItem.end;

              if (!notiItem) return; // 이 부분 불확실...
              let [week, month, day, year, sTime] = startTime.split(' ');
              let start = sTime.substr(0, 5);
              let end = endTime.substr(-17, 5);
              console.log({ start, end });

              return (
                <div className="text" key={`noti_${idx}`}>
                  튜티 &nbsp;{notiItem.Tutee_userName}님이 &nbsp;
                  {week} {month} {day} &nbsp; {start}시에 수업을 예약
                  하셨습니다.
                </div>
              );
            })}
            {/* <div className="text">
                        누구님이 몇일 HH:MM에 수업을 예약 하셨습니다.
                      </div>
                      <div className="text">
                        누구님이 몇일 HH:MM에 수업을 예약 하셨습니다.
                      </div>

                      <div className="text">
                        누구님이 HH:MM에 예약 하셨습니다.
                      </div>

                      <button
                        className="notificationBtn"
                        onClick={() => {
                          setNotiOpen(!notiOpen);
                        }}
                      >
                        지우기
                      </button> */}
          </div>
        </div>
      </Background>
    </>
  );
};

export default NotiModal;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background-color: none;
`;
