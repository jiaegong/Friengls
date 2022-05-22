import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';
import { actionCreators as bookingAction } from '../redux/modules/booking';
import { history } from '../redux/configureStore';
import DetailUser from '../components/DetailUser';

const Mypage = (props) => {
  const dispatch = useDispatch();
  // 마이페이지에서 불러올 유저 api
  const userApi = props.match.params;

  //마이페이지 유저정보
  const userInfo = useSelector((state) => state.user.detailInfo);
  console.log(userApi);

  // 마이페이지 예약정보 불러오기 위한 값들
  const isTutor = userApi.isTutor;
  const userName = userApi.userName;
  console.log(isTutor);

  //  불러온 예약 정보
  const bookingList = useSelector((state) => state.booking.list);

  useEffect(() => {
    dispatch(userActions.getUserDetailDB(userApi));
    dispatch(bookingAction.getBookingDB({ isTutor, userName }));
  }, [userName]);

  return (
    <Wrap>
      <div className="innerWrap">
        {/* 유저 정보 */}
        <DetailUser userInfo={userInfo} props={props} />
        {/* 예약 캘린더 */}
        <div className="bookingWrap">
          <p className="bookingTitle">
            예약 리스트 <span>/ 수업 일정</span>
          </p>
          <ul className="bookingList">
            {bookingList?.map((item, idx) => {
              console.log(item);
              let startTime = item.start;
              let endTime = item.end;

              if (!item) return; // 이 부분 불확실...
              let [week, month, day, year, sTime] = startTime.split(' ');
              let start = sTime.substr(0, 5);
              let end = endTime.substr(-17, 5);
              return (
                <li className="booking" key={`booking${idx}`}>
                  <div className="bookingInfo">
                    {/* 선생인지 학생인지에 따라서 userName 다르게 보이게 함 */}
                    {isTutor === '0' ? (
                      <div className="userName">{item.Tutor_userName}</div>
                    ) : (
                      <div className="userName">{item.Tutee_userName}</div>
                    )}
                    <div className="userBookingWrap">
                      <span>
                        {week} &nbsp; {month} &nbsp; {day} &nbsp; {year} &emsp;
                      </span>
                      <span>
                        {start}&emsp;~&emsp;{end}
                      </span>
                    </div>
                  </div>
                  <button
                    className="videoBtn"
                    onClick={() => {
                      history.push(
                        `/videochat/${
                          item.Tutor_userName + item.Tutee_userName
                        }`,
                      );
                    }}
                  >
                    수업 시작
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
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
      /* 


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
        /* padding: 40px 60px 40px 40px; */
        /* padding: 40px 30px 40px 40px; */
        padding: 20px 10px 20px 20px;
        box-shadow: inset 0px 0px 6px rgba(0, 0, 0, 0.15);
        overflow-y: scroll;

        /* background: red; */

        /* 스크롤 버튼 조절 */
        ::-webkit-scrollbar {
          width: 20px; /*스크롤바의 너비*/
        }
        ::-webkit-scrollbar-thumb {
          height: 20%;
          background-color: #e4e4e4; /*스크롤바의 색상*/
          border-radius: 15px;
          /* display: none; */
        }
        ::-webkit-scrollbar-track {
          background-color: #d7d7d7;
          border-radius: 15px;
          display: none;
          /*스크롤바 트랙 색상 */
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
            /* justify-content: space-between; */
            /* justify-content: space-around; */
            text-align: center;
            /* border: 2px solid #c7c7c7; */
            border: 1px solid #c7c7c7;
            border-radius: 4px;
            margin-right: 20px;

            .userName {
              width: 20%;
              width: auto;
              font-size: 16px;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-left: 20px;
              margin-right: 40px;

              /* background-color: #aaaaaa; */
            }

            .userBookingWrap {
              width: 70%;
              text-align: left;
              display: flex;
              align-items: center;
              /* justify-content: space-around; */

              span {
                display: inline-block;
                font-size: 16px;
                margin-right: 50px;
              }
              /* background-color: #aaaaaa; */
            }

            /* background: #eee; */
          }

          .videoBtn {
            width: 20%;
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
            /* background-color: #c1c1c1; */
          }
        }
      }
    }
  }
`;
