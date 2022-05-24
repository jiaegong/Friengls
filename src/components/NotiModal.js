import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as notiActions } from '../redux/modules/booking';
import NotiItem from "../components/NotiItem"

const NotiModal = (props) => {
  const dispactch = useDispatch();
  const notiList = useSelector((state) => state.booking.list);
  console.log({ notiList })
  console.log(notiList.length)
  const ModalAction = props.ModalAction;
  const userInfo = props.userInfo;
  const isTutor = userInfo.isTutor;

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

  useEffect(() => {
    dispactch(notiActions.getBookingNotiDB());
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
              // const timeId = notiItem.timeId;
              const noti = notiItem.noti;
              const del = notiItem.del;

              // let startTime = notiItem.start;
              // let endTime = notiItem.end;

              // if (!notiItem) return; // 이 부분 불확실...
              // let [week, month, day, year, sTime] = startTime.split(' ');
              // let start = sTime.substr(0, 5);
              // let end = endTime.substr(-17, 5);
              // console.log({ start, end });

              return (
                <>
                  {/* {} */}
                  <NotiItem notiItem={notiItem} userInfo={userInfo} key={notiItem.timeId} />
                </>
              );
            })}

            <button
              className="notificationBtn"
              onClick={() => {
                dispactch(notiActions.delAllNotiDB())
              }}
            >
              지우기
            </button>
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
