import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

// 컴포넌트
import NotiItem from '../components/NotiItem';
import { useTranslation } from 'react-i18next';

const NotiModal = (props) => {
  const { t } = useTranslation();
  const notiList = useSelector((state) => state.booking.noti);
  const notiCheck = notiList?.length;
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
                <div className="notiNot">{t('no alarm')}</div>
              )}
              {notiList?.map((notiItem, idx) => {
                return (
                  <>
                    <NotiItem
                      notiItem={notiItem}
                      userInfo={userInfo}
                      key={`noti_${idx}`}
                    />
                  </>
                );
              })}
            </ul>
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

  /* 알림창 */
  .notifications {
    position: absolute;
    max-width: 600px;
    min-width: 420px;
    width: 100%;
    min-height: 140px;
    top: 100px;

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
        width: 100%;
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
