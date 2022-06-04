import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// 모듈
import { actionCreators as userActions } from '../redux/modules/user';
import { actionCreators as bookingAction } from '../redux/modules/booking';
import { actionCreators as likeActions } from '../redux/modules/like';

// 컴포넌트
import DetailUser from '../components/DetailUser';
import BookingItem from '../components/BookingItem';
import LikeItem from '../components/LikeItem';

const Mypage = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  // 마이페이지에서 불러올 유저 api
  const userApi = props.match.params;

  //마이페이지 유저정보
  const userInfo = useSelector((state) => state.user.detailInfo);

  // 마이페이지 예약정보 불러오기 위한 값들
  const isTutor = userApi.isTutor;
  const userName = userApi.userName;

  //  불러온 예약 정보
  const bookingList = useSelector((state) => state.booking.list);

  useEffect(() => {
    dispatch(userActions.getUserDetailDB(userApi));
    dispatch(bookingAction.getBookingDB({ isTutor, userName }));
    dispatch(likeActions.getLikeDB());
  }, []);

  // 현재 시간 구하는 방법
  const likeList = useSelector((state) => state.like.myList);

  return (
    <Wrap>
      <div className="innerWrap">
        {/* 유저 정보 */}
        <DetailUser userInfo={userInfo} props={props} />
        {/* 예약 캘린더 */}
        <div className="bookingWrap">
          <p className="bookingTitle">
            {t('booking list')} <span>/ {t('tutoring schedule')}</span>
          </p>
          <ul className="bookingList">
            {bookingList.length === 0 && (
              <li className="noBookingText">{t('no reservation')}</li>
            )}
            {bookingList?.map((item, idx) => {
              return (
                <BookingItem
                  item={item}
                  userInfo={userInfo}
                  key={`mypage_${idx}`}
                />
              );
            })}
          </ul>
        </div>
        <LikeWrap>
          <p className="like-title">{t('like list')}</p>
          {likeList.map((l, idx) => {
            return <LikeItem key={idx} {...l} userInfo={userInfo} />;
          })}
        </LikeWrap>
      </div>
    </Wrap>
  );
};

export default Mypage;

const Wrap = styled.div`
  width: 100%;
  min-height: 904px;
  margin-bottom: 100px;

  .innerWrap {
    max-width: 1280px;
    width: 80%;
    margin: auto;

    /* 예약 리스트 Wrap */
    .bookingWrap {
      width: 90%;
      height: auto;
      margin: 70px auto;
      min-height: 100px;
      padding: 10px;
      border-top: 1px solid #c4c4c4;

      /* 예약 리스트 타이틀 */
      .bookingTitle {
        font-size: 38px;
        font-weight: bolder;
        margin-bottom: 60px;

        span {
          font-size: 26px;
          color: #969696;
          margin-left: 15px;
        }
      }

      /* 예약 리스트 */
      .bookingList {
        width: 100%;
        margin: auto;
        max-height: 400px;
        min-height: 260px;
        border: 2px solid #c7c7c7;
        border: 1px solid #c7c7c7;
        border-radius: 4px;
        padding: 20px 10px 20px 20px;
        box-shadow: inset 0px 0px 6px rgba(0, 0, 0, 0.15);
        overflow-y: scroll;

        /* 스크롤 버튼 조절 */
        ::-webkit-scrollbar {
          /*스크롤바의 너비*/
          width: 20px;
        }
        ::-webkit-scrollbar-thumb {
          /*스크롤바의 색상*/
          height: 20%;
          background-color: #e4e4e4;
          border-radius: 15px;
        }
        ::-webkit-scrollbar-track {
          /*스크롤바 트랙 색상 */
          background-color: #d7d7d7;
          border-radius: 15px;
          display: none;
        }
        .noBookingText {
          text-align: center;
          padding-top: 20px;
          font-weight: 700;
          font-size: 18px;
          letter-spacing: 1px;
        }

        /* 예약 카드 */
        .booking {
          width: 100%;
          border-radius: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          + .booking {
            margin-top: 10px;
          }

          /* 예약 정보 */
          .bookingInfo {
            width: 100%;
            height: 50px;
            padding: 10px;
            display: flex;
            text-align: center;
            border: 1px solid #c7c7c7;
            border-radius: 4px;
            margin-right: 20px;
            gap: 3%;

            .userName {
              width: 20%;
              width: auto;
              min-width: 100px;
              font-size: 16px;
              display: flex;
              align-items: center;
              justify-content: flex-start;
              margin-left: 10px;
              margin-right: 30px;
              padding-left: 10px;
            }

            .userBookingWrap {
              width: 70%;
              text-align: left;
              display: flex;
              align-items: center;
              gap: 50px;

              span {
                display: inline-block;
                font-size: 16px;
              }

              .dayInfo {
                min-width: 200px;
              }

              .timeInfo {
              }
            }
          }

          .videoBtn {
            width: 15%;
            max-width: 240px;
            height: 50px;
            border: none;
            padding: 10px 8px 9px;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bolder;
            color: #fff;
            cursor: pointer;
            background-color: #153587;
          }

          .delBtn {
            width: 15%;
            max-width: 200px;
            height: 50px;
            border: none;
            padding: 10px 8px 9px;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bolder;
            color: #fff;
            margin-left: 5px;
            cursor: pointer;

            background-color: #981821;
          }

          .deleteBtn {
            width: 32%;
            max-width: 253px;
            height: 50px;
            border: none;
            padding: 10px 8px 9px;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bolder;
            color: #fff;
            margin-left: 5px;

            background-color: #525252;
          }
        }
      }
    }
  }
`;

const LikeWrap = styled.div`
  max-width: 1280px;
  width: 90%;
  padding: 10px;
  margin: auto;
  border-top: 1px solid #c4c4c4;

  .like-title {
    font-size: 38px;
    font-weight: bolder;
    margin-bottom: 60px;
  }
`;
