import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { history } from '../redux/configureStore';
import { useTranslation } from 'react-i18next';
// import '../shared/App.css';

// 모듈;
import { actionCreators as reviewActions } from '../redux/modules/review';

// 컴포넌트
import { Text } from '../elements/index';
import Review from '../components/Review';
import TutorCard from '../components/TutorCard';
import DivBanner from '../elements/DivBanner';

const Main = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const tutorListDB = useSelector((state) => state.tutor.list);
  const reviewList = useSelector((state) => state.review.list);

  useEffect(() => {
    dispatch(reviewActions.getReviewDB());
  }, []);

  if (!reviewList) return null;

  let tutorList = [];

  if (tutorListDB.length > 11) {
    for (let i = 0; i < 12; i++) {
      tutorList.push(tutorListDB[i]);
    }
  }

  return (
    <Wrap>
      <DivBanner>
        <Banner>
          <p className="bannerTitle">
            <span>{t('wanna learn korean?')}</span>
            <span>{t('we are here!')}</span>
            <span>{t('your closest korean friends, friengls')}</span>
          </p>
          <button
            onClick={() => {
              alert('여긴 어디로 가야되야나??');
            }}
          >
            예약하러 가기 ▶︎
          </button>
        </Banner>
      </DivBanner>
      <InnerWrap>
        <TutorListWrap>
          <TutorTitleWrap>
            <div>
              <span>{t('the most liked tutors in friengls')}</span>
              <span className="tutorMoreBtn">더보기 ></span>
            </div>
            <p>{t('popular tutor list')}</p>
          </TutorTitleWrap>
          <CardList>
            {tutorList.map((tutor, idx) => {
              return <TutorCard tutor={tutor} key={`tutorCard_${idx}`} />;
            })}
          </CardList>
        </TutorListWrap>

        {/* 리뷰 부분 */}
        <ReviewWrap>
          <ReviewContainer>
            <ReviewTitleWrap>
              <div>
                <span className="subTitle">{t('check out tutor reviews')}</span>
                <span className="reviewMoreBtn">더보기 ></span>
              </div>
              <p className="title">{t('best reviews')}</p>
            </ReviewTitleWrap>
            <ReviewList>
              {reviewList
                ? reviewList.map((r, idx) => {
                    return <Review key={idx} {...r} />;
                  })
                : null}
            </ReviewList>
          </ReviewContainer>
        </ReviewWrap>
      </InnerWrap>
    </Wrap>
  );
};

export default Main;

const Wrap = styled.div`
  /* 공통 */
  width: 100%;
  min-height: 905px;
`;

/* 배너 */
const Banner = styled.div`
  max-width: 1280px;
  width: 80%;
  height: 100%;
  margin: 0 auto;

  .bannerTitle {
    display: flex;
    flex-direction: column;
    padding-top: 40px;
    margin-bottom: 20px;
  }
  .bannerTitle > span {
    font-size: 34px;
    font-weight: bolder;
    font-family: 'Jalnan';
    line-height: 34px;
    margin-bottom: 10px;
    letter-spacing: 1px;
    color: #fff;
  }
  .bannerText {
    display: flex;
    flex-direction: column;
    margin: 10px 0 28px;
    /* background-color: red; */
  }
  .bannerText > span {
    font-size: 16px;
    font-weight: 600;
    margin-top: 5px;
    letter-spacing: 1px;
    color: #fff;
  }

  button {
    width: 210px;
    height: 56px;
    font-size: 18px;
    font-weight: 900;
    cursor: pointer;
    background: #fff;

    border: 2px solid #000;
    border-radius: 40px;
    box-shadow: 2px 6px 16px 0px #0000004b;
  }
`;

/* 컨텐츠 */
const InnerWrap = styled.div`
  width: 80%;
  max-width: 1280px;
  padding-top: 70px;
  margin: auto;
`;

// 튜터 리스트 부분
const TutorListWrap = styled.div`
  width: 100%;
`;

const TutorTitleWrap = styled.div`
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

    .tutorMoreBtn {
      margin-right: 10px;
      cursor: pointer;
    }
  }

  p {
    font-size: 38px;
    font-weight: bold;
  }
`;

const CardList = styled.div`
  /* width: 100%; */
  width: 95%;
  margin: auto;
  display: grid;
  place-items: center;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  /* grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); */
  /* grid-gap: 2rem; */
  /* row-gap: 2rem; */
  row-gap: 4rem;
  column-gap: 0rem;
`;

// 리뷰 부분
const ReviewWrap = styled.div`
  width: 100%;
  min-height: 600px;
  margin: 140px auto 200px;
`;

const ReviewContainer = styled.div`
  width: 100%;
  margin: auto;
`;

const ReviewTitleWrap = styled.div`
  margin-bottom: 80px;

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
    font-size: 36px;
    font-weight: bold;
  }
`;

const ReviewList = styled.div`
  width: 90%;
  min-height: 188px;
  margin: auto;
`;
