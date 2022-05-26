import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as notiActions } from '../redux/modules/booking';
import NotiItem from '../components/NotiItem';

const NotiModal = (props) => {
  const dispactch = useDispatch();
  const notiList = useSelector((state) => state.booking.noti);
  const notiCheck = notiList?.length;
  console.log({ notiList });
  console.log({ notiCheck });
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
              {notiCheck === 0 && (
                <div className="notiNot"> 알림이 없습니다.</div>
              )}

              {notiList?.map((notiItem, idx) => {
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
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background-color: none; */

  /* 알림창 */
  .notifications {
    /* display: none; */
    position: absolute;
    max-width: 450px;
    min-width: 420px;
    width: 100%;
    min-height: 140px;

    right: -270px;
    top: 42px;
    /* right: 15%;
    top: 144px; */
    right: 0px;
    top: 52px;

    padding: 10px;
    border: 1px solid #eaeaea;
    border-radius: 10px;
    box-shadow: 0px 2px 12px 0px #00000040;

    transform-origin: top center;

    z-index: 9999;
    background-color: #ffffff;

    /*  */
    .notificationsInnerWrap {
      position: relative;
      height: 100%;
      padding: 10px;

      ul > li:last-child {
        margin: 0;
      }

      .textItem {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 40px;
        font-weight: 500;
        margin-left: 0;
        margin-bottom: 10px;
        padding-left: 14px;
        border-radius: 5px;
        border: 1px solid #d1d1d1;
        cursor: pointer;

        &:hover {
          color: #000;
        }
      }
    }
  }
`;
