import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as calendarActions } from '../redux/modules/booking';

// 컴포넌트
import CalendarTemplate from '../components/calendar/Calendar';

const Detail = () => {
  const dispatch = useDispatch();
  // 새로고침이나, 페이지 진입시,db에 데이터 있는지 요청보냄
  useEffect(() => {
    dispatch(calendarActions.getTimeDB());
  }, []);

  // 리듀서에서 초기값 불러오기 또는 db에서 있는 값 불러오기
  const timeList = useSelector((state) => state.calendar.list);
  console.log({ timeList });

  // 초기값으로 리듀서에서 불러오는 값을 넣어둠
  const [availability, setAvailability] = React.useState(timeList);
  console.log('리듀서랑 연동한 데이터 ', availability);

  const Calendar = CalendarTemplate({
    availability,
    setAvailability,
  });
  return (
    <Wrap>
      <div className="innerWrap">
        {/* 유저 정보 */}
        <div className="userInfoWrap">
          <div className="userInfo">user_info</div>

          <div className="aboutMe">자기소개</div>

          <div className="resume">이력</div>
        </div>
        {/* 예약 캘린더 */}
        <div className="bookingWrap">
          <div className="booking">캘린더</div>
          <Calendar />
        </div>
        {/* 코멘트 */}
        <div className="commentWrap">
          <p>댓글</p>

          <div className="commentInnerWrap">
            <div className="commentCard">comment card</div>
          </div>
        </div>
      </div>
    </Wrap>
  );
};

export default Detail;

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
      height: 900px;
      margin: 30px auto;

      background-color: #aaa;

      /* 유저 정보 */
      .userInfo {
        width: 100%;
        height: 300px;

        background-color: #686868;
      }

      /* 자기소개 */
      .aboutMe {
        width: 100%;
        height: 200px;
        margin: 20px auto;

        background-color: #686868;
      }

      /* 이력 */
      .resume {
        width: 100%;
        height: 300px;
        margin-top: 20px;

        background-color: #686868;
      }
    }

    /* 예약 캘린더 */
    .bookingWrap {
      width: 95%;
      height: auto;
      margin: auto;
      min-height: 300px;
      padding: 0 10px;

      background-color: #686868;

      .booking {
        width: 100%;

        background-color: #fff;
      }
    }

    /* 코멘트  */
    .commentWrap {
      width: 75%;
      min-height: 150px;
      margin: 20px 35px;
      padding: 10px;

      background: #aaa;

      .commentInnerWrap {
        margin-top: 10px;
        padding: 0 10px;

        .commentCard {
          width: 100%;
          min-height: 70px;
          padding: 10px;

          background: #eee;
        }
      }
    }
  }
`;
