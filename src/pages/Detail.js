import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../redux/configureStore';
import { actionCreators as userActions } from '../redux/modules/user';
import { actionCreators as bookingAction } from '../redux/modules/booking';
import { actionCreators as reviewActions } from '../redux/modules/review';

// 컴포넌트
import CalendarTemplate from '../components/calendar/Calendar';
import DetailUser from '../components/DetailUser';
import axios from 'axios';
import Review from '../components/Review';

const Detail = (props) => {
  const dispatch = useDispatch();

  //디테일페이지에서 불러올 유저 api
  const userApi = props.match.params;
  // console.log(userApi);

  useEffect(() => {
    // dispatch(userActions.getUserDetailDB(userApi));
  }, []);

  //디테일페이지에 사용할 유저 정보
  // const isTutor = detailInfo.isTutor;
  const tutorName = props.match.params.userName;
  // console.log(tutorName);
  const detailInfo = useSelector((state) => state.user.detailInfo);
  // console.log(detailInfo);

  // 새로고침이나, 페이지 진입시,db에 데이터 있는지 요청보냄
  // useEffect(() => {
  //   dispatch(bookingAction.getBookingDB());
  // }, []);

  useEffect(() => {
    dispatch(userActions.getUserDetailDB(userApi));
    // 예약 리스트 불러오기
    axios({
      method: 'get',
      // url: `https://jg-jg.shop/getBooking/?userName=jungi521&isTutor=1`, // 학생 또는 선생님
      url: `http://13.124.206.190/getBooking/?userName=${tutorName}&isTutor=1`, // 학생 또는 선생님
      // url: `https://jg-jg.shop/getBooking/?userName=${tutorName}&isTutor=${isTutor}`, // 학생 또는 선생님
    })
      .then((doc) => {
        // console.log(doc);
        // console.log(doc.data.datas1);
        setAvailability(doc.data.datas1);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // 초기값으로 리듀서에서 불러오는 값을 넣어둠
  const [availability, setAvailability] = React.useState([]);

  const Calendar = CalendarTemplate({
    tutorName,
    availability,
    setAvailability: (timeList) => {
      // performAdditionalAction(update)
      setAvailability(timeList);
    },
  });

  // 리뷰 불러오기, 수정, 삭제 부분
  const reviewList = useSelector((state) => state.review.list);

  useEffect(() => {
    dispatch(reviewActions.getOneReviewDB(tutorName));
  }, []);

  return (
    <Wrap>
      <div className="innerWrap">
        {/* 유저 정보 */}
        <DetailUser userInfo={detailInfo} props={props} />

        {/* 예약 캘린더 */}
        <div className="bookingWrap">
          {/* <div className="booking">캘린더</div> */}
          <Calendar />
        </div>

        {/* 코멘트 */}
        {/* 리뷰 리스트 맵 돌릴 때, 작성자 이름이 접속한 이름과 같으면 수정, 삭제 버튼 보이게
        현재 접속한 이름이 없는 경우에 대한 처리도 필요(옵셔널 체이닝) */}
        <ReviewList>
          {reviewList?.map((r, idx) => {
            return <Review key={idx} {...r} />;
          })}
        </ReviewList>
      </div>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  min-height: 904px;
  // background-color: #ddd;

  .innerWrap {
    max-width: 1400px;
    width: 90%;
    margin: auto;

    /* 예약 캘린더 */
    .bookingWrap {
      width: 95%;
      height: auto;
      margin: auto;
      min-height: 300px;
      padding: 0 10px;

      /* background-color: #686868; */

      .booking {
        width: 100%;

        background-color: #fff;
      }
    }
  }
`;

const ReviewList = styled.div`
  width: 100%;
  min-height: 188px;
  margin: auto;
`;

export default Detail;
