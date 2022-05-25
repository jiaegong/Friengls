import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../redux/configureStore';
import { actionCreators as userActions } from '../redux/modules/user';
import { actionCreators as bookingAction } from '../redux/modules/booking';
import { actionCreators as reviewActions } from '../redux/modules/review';
import { useTranslation } from 'react-i18next';

// 컴포넌트
import CalendarTemplate from '../components/calendar/Calendar';
import DetailUser from '../components/DetailUser';
import axios from 'axios';
import Review from '../components/Review';

const Detail = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  //디테일페이지에서 불러올 유저 api
  const userApi = props.match.params;
  console.log(userApi);

  //디테일페이지에 사용할 유저 정보
  const detailInfo = useSelector((state) => state.user.detailInfo);
  const tutorName = props.match.params.userName;

  // 초기값으로 리듀서에서 불러오는 값을 넣어둠
  const [availability, setAvailability] = React.useState([]);

  // 새로고침이나, 페이지 진입시,db에 데이터 있는지 요청보냄
  useEffect(() => {
    dispatch(userActions.getUserDetailDB(userApi));
    dispatch(reviewActions.getOneReviewDB(tutorName));
    window.scrollTo(0, 0);

    // 예약 리스트 불러오기
    axios({
      method: 'get',
      // url: `https://hjg521.link/getBooking/?userName=jungi521&isTutor=1`, // 학생 또는 선생님
      // url: `http://13.124.206.190/getBooking/?userName=${tutorName}&isTutor=1`, // 학생 또는 선생님
      url: `https://hjg521.link/getBooking/?userName=${tutorName}&isTutor=1`, // 학생 또는 선생님
    })
      .then((doc) => {
        let data = doc.data.datas1;
        console.log('DB 예약 리스트 : ', { data });
        setAvailability(doc.data.datas1);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const Calendar = CalendarTemplate({
    tutorName,
    availability,
    setAvailability: (timeList) => {
      setAvailability(timeList);
    },
  });

  // 리뷰 불러오기, 수정, 삭제 부분
  const reviewList = useSelector((state) => state.review.list);
  console.log(reviewList);

  return (
    <Wrap>
      <div className="innerWrap">
        {/* 유저 정보 */}
        <DetailUser userInfo={detailInfo} props={props} />

        {/* 예약 캘린더 */}
        <div className="bookingWrap">
          <div className="booking">
            {t('book a lesson')} <span>/ {t('tutoring schedule')}</span>
          </div>
          <Calendar />
        </div>

        {/* 리뷰 */}
        <ReviewList>
          <ReviewTitleWrap>
            <div>
              <span className="subTitle">
                {t('start learning and write a review!')}
              </span>
            </div>
            <p className="title">{t('best reviews')}</p>
          </ReviewTitleWrap>
          {reviewList?.map((r, idx) => {
            // if (reviewList[idx].Tutor_username !== tutorName) {
            //   return null;
            // }
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
    max-width: 1280px;
    width: 90%;
    margin: auto;

    /* 예약 캘린더 */
    .bookingWrap {
      width: 90%;
      height: auto;
      margin: 100px auto;
      min-height: 300px;
      padding: 0 10px;

      .booking {
        width: 100%;
        font-size: 30px;
        font-weight: bold;
        margin-bottom: 50px;
        padding-left: 8%;

        span {
          color: #aaa;
          font-size: 22px;
          font-weight: 600;
        }
      }
    }
  }
`;

const ReviewTitleWrap = styled.div`
  margin-bottom: 70px;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 6px;
    }

    .reviewMoreBtn {
      cursor: pointer;
    }
  }

  p {
    font-size: 30px;
    font-weight: bold;
  }
`;

const ReviewList = styled.div`
  width: 76%;
  min-height: 300px;
  margin: 0 auto 180px;
`;

export default Detail;
