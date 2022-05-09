import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../redux/configureStore';
import { actionCreators as userActions } from '../redux/modules/user';
import { actionCreators as bookingAction } from '../redux/modules/booking';
import { actionCreators as reviewActions } from '../redux/modules/review';
import { actionCreators as likeActions } from '../redux/modules/like';
// 컴포넌트
import CalendarTemplate from '../components/calendar/Calendar';
import DetailUser from '../components/DetailUser';

const Detail = (props) => {
  const dispatch = useDispatch();

  //디테일페이지에서 불러올 유저 api
  const userApi = props.match.params;

  useEffect(() => {
    // const apiTest = { userId: '30', isTutor: '1' };
    dispatch(userActions.getUserDetailDB(userApi));
  }, []);
  //디테일페이지에 사용할 유저 정보

  const detailInfo = useSelector((state) => state.user.detailInfo);
  console.log(detailInfo);

  // 새로고침이나, 페이지 진입시,db에 데이터 있는지 요청보냄
  useEffect(() => {
    dispatch(bookingAction.getBookingDB());
  }, []);

  // 리듀서에서 초기값 불러오기 또는 db에서 있는 값 불러오기
  const timeList = useSelector((state) => state.booking.list);
  // console.log('검사중 : ', timeList[0].start.toDateString());
  // console.log('검사중 : ', timeList[0].start.getDate()); //일
  // console.log(timeList[0].start.getHours()); //시간
  // console.log(timeList[0].start.toTimeString()); // 08:00:00 GMT+0900
  // console.log(typeof timeList[0].start.toString()); // Thu May 19 2022 08:00:00 GMT+0900
  // console.log(timeList[0].start.toDateString()); // Thu May 19 2022
  // console.log(typeof timeList[0].start);

  // 초기값으로 리듀서에서 불러오는 값을 넣어둠
  const [availability, setAvailability] = React.useState(timeList);
  // console.log('리듀서랑 연동한 데이터 ', availability);

  const Calendar = CalendarTemplate({
    availability,
    setAvailability,
  });

  // 리뷰 불러오기, 수정, 삭제 부분
  // const reviewList = useSelector((state) => state.review.list);
  // const reviewId = reviewList.reviewId;

  // // comment 초기값은 review 내용으로 바꾸기
  // const [rate, setRate] = React.useState();
  // const [text, setText] = React.useState('');
  // const onChange = (e) => {
  //   setText(e.target.value);
  // };

  // React.useEffect(() => {
  //   if (reviewList[tutorId]) {
  //     dispatch(reviewActions.getReviewDB(tutorId));
  //   }
  // }, []);

  // if (!reviewList[tutorId] || !tutorId) {
  //   return null;
  // }

  // const editReview = () => {
  //   dispatch(reviewActions.editReviewDB(reviewId, text));
  // };

  // const deleteReview = () => {
  //   dispatch(reviewActions.deleteReviewDB(reviewId));
  // };

  // // like 누르기, 토큰 같이 보내기, likeList랑 tutor유저 리스트 인덱스랑 비교해서 같으면 넣기
  // const like = () => {
  //   dispatch(likeActions.likeDB(tutorName));
  // };

  // const unLike = () => {
  //   dispatch(likeActions.unLikeDB(tutorName));
  // };

  return (
    <Wrap>
      <div className="innerWrap">
        {/* 유저 정보 */}
        <div className="userInfoWrap">
          <DetailUser detailInfo={detailInfo} />

          {/* like 버튼, 나중에 아이콘 찾아서 바꿔 놓기, like 상태 값에 따라서 채워진 하트/빈 하트 */}
          {/* {isLiked? <div
            onClick={like}
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '30px',
              margin: '5px',
              backgroundColor: '#ddd'
            }}
          /> : <div
          onClick={unLike}
          style={{
            width: '30px',
            height: '30px',
            borderRadius: '30px',
            margin: '5px',
            backgroundColor: '#ffeb3b'
          }}
        />} */}
        </div>
        {/* 예약 캘린더 */}
        <div className="bookingWrap">
          <div className="booking">캘린더</div>
          <Calendar />
        </div>
        {/* 코멘트 */}
        {/* 리뷰 리스트 맵 돌릴 때, 작성자 이름이 접속한 이름과 같으면 수정, 삭제 버튼 보이게
        현재 접속한 이름이 없는 경우에 대한 처리도 필요(옵셔널 체이닝) */}
        <div className="commentWrap">
          {/* <image src="유저 프로필 이미지" /> */}
          <p>유저 이름</p>
          <p>작성 시간</p>
          {/* <button onClick={editReview}>수정</button>
          <button onClick={deleteReview}>삭제</button> */}
          {/* {Array.from({ length: 5 }, (c, idx) => {
            return (
              <div
                onClick={() => {
                  setRate(idx + 1);
                }}
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '30px',
                  margin: '5px',
                  backgroundColor: rate < idx + 1 ? '#ddd' : '#ffeb3b',
                }}
              />
            );
          })} */}
          {/* <textarea onChange={onChange} /> */}
        </div>
      </div>
    </Wrap>
  );
};

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
      height: 300px;
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

      /* .commentInnerWrap {
        margin-top: 10px;
        padding: 0 10px;

        .commentCard {
          width: 100%;
          min-height: 70px;
          padding: 10px;

          background: #eee;
        }
      } */
    }
  }
`;

export default Detail;
