import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as bookingAction } from '../redux/modules/booking';
import { history } from '../redux/configureStore';

const Mypage = () => {
  const dispatch = useDispatch();
  const bookingList = useSelector((state) => state.booking.list);

  useEffect(() => {
    dispatch(bookingAction.getBookingDB());
  }, []);

  const videoChatHandler = (roomName) => {
    // const id = userId;
    // history.push(`/videochat/${id}`);
  };

  return (
    <Wrap>
      <div className="innerWrap">
        {/* 유저 정보 */}
        <div className="userInfoWrap">
          <div className="userInfo">user_info</div>
        </div>
        {/* 예약 캘린더 */}
        <div className="bookingWrap">
          <p className="bookingTitle">예약 리스트</p>
          <ul className="bookingList">
            {bookingList.map((item, idx) => {
              let start = item.start;
              let end = item.end;
              let [week, month, day, year, sTime] = start.split(' ');
              let startTime = sTime.substr(0, 5);
              let endTime = end.substr(-17, 5);
              return (
                <li className="booking" key={`booking${idx}`}>
                  <div className="bookingInfo">
                    <div className="userName">{item.userName}</div>
                    <div className="userBooking">
                      {week} {month} {day} {year} {startTime} ~ {endTime}
                    </div>
                  </div>
                  {/* <List> */}
                  <button className="videoBtn" onClick={videoChatHandler}>
                    채팅하기
                  </button>
                  {/* </List> */}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Wrap>
  );
};

const List = styled.div`
  border: 1px solid black;
  border-radius: 10px;
`;

export default Mypage;

const Wrap = styled.div`
  width: 100%;
  min-height: 904px;
  background-color: #ddd;

  .innerWrap {
    max-width: 1400px;
    width: 90%;
    margin: auto;

    /* 유저정보 wrap */
    .userInfoWrap {
      width: 95%;
      min-height: 300px;
      margin: 30px auto 0;

      background-color: #aaa;

      /* 유저 정보 */
      .userInfo {
        width: 100%;
        height: 300px;

        background-color: #686868;
      }
    }

    /* 예약 리스트 Wrap */
    .bookingWrap {
      width: 80%;
      max-width: 1000px;
      height: auto;
      margin-top: 30px;
      margin: 30px auto;
      min-height: 100px;
      padding: 10px;

      background-color: #686868;

      /* 예약 리스트 타이틀 */
      .bookingTitle {
      }

      /* 예약 리스트 */
      .bookingList {
        min-height: 100px;
        margin-top: 10px;
        padding: 10px;

        background: #a9a9a9;

        /* 예약 카드 */
        .booking {
          width: 100%;
          min-height: 50px;
          border-radius: 10px;
          display: flex;
          justify-content: space-around;
          /* justify-content: center; */
          align-items: center;

          background-color: #fff;

          + .booking {
            margin-top: 10px;
          }

          /* 예약 정보 */
          .bookingInfo {
            width: 75%;
            padding: 10px;
            display: flex;
            justify-content: space-between;
            text-align: center;

            .userName {
              width: 20%;
            }

            .userBooking {
              width: 70%;
              text-align: left;
            }

            background: #eee; 
          }

          .videoBtn {
            border: none;
            padding: 10px 8px 9px;
            border-radius: 5px;
            cursor: pointer;

            background-color: #c1c1c1;
          }
        }
      }
    }
  }
`;
