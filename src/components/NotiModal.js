import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as notiActions } from '../redux/modules/booking';
import NotiItem from '../components/NotiItem';

const NotiModal = (props) => {
  const dispactch = useDispatch();
  const notiList = useSelector((state) => state.booking.list);
  console.log({ notiList });
  console.log(notiList.length);
  const { ModalAction, userInfo } = props;

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
            <ul>
              {notiList.map((notiItem, idx) => {
                const timeId = notiItem.timeId;
                // const noti = notiItem.noti;
                // const del = notiItem.del;

                return (
                  <>
                    <NotiItem
                      notiItem={notiItem}
                      userInfo={userInfo}
                      // key={`noti_${timeId}`}
                      key={`noti_${idx}`}
                    />
                  </>
                );
              })}
            </ul>
            {/* <button
              className="notificationBtn"
              onClick={() => {
                dispactch(notiActions.delAllNotiDB());
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
