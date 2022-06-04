import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { history } from '../redux/configureStore';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import axios from 'axios';

// 모듈;
import { actionCreators as reviewActions } from '../redux/modules/review';
import { actionCreators as tutorActions } from '../redux/modules/tutor';

// 컴포넌트
import Review from '../components/Review';
import TutorCard from '../components/TutorCard';
import DivBanner from '../elements/DivBanner';

const Main = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const tutorListDB = useSelector((state) => state.tutor.list);
  const reviewList = useSelector((state) => state.review.list);
  const [title, setTitle] = useState('');
  const [mean, setMean] = useState('');

  // 오늘의 속담
  const getProverb = () => {
    axios({
      method: 'get',
      url: 'https://hjg521.link/proverb',
    })
      .then((res) => {
        setTitle(res.data.title);
        setMean(res.data.mean);
      })
      .catch((err) => {
        console.log('속담 불러오기에 실패했습니다!', err);
        console.log(err);
      });
  };

  useEffect(() => {
    dispatch(tutorActions.getTutorListDB());
    dispatch(reviewActions.getReviewDB());

    getProverb();
  }, []);

  if (!reviewList) return null;

  // 튜터 리스트 갯수 제한
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
        </Banner>
      </DivBanner>
      <ProverbWrap>
        <ProverbTitle>{t("today's korean proverb")}</ProverbTitle>
        <ProverbItem>
          <p className="proverb-title">{title}</p>
          <p className="proverb-mean">{mean}</p>
        </ProverbItem>
      </ProverbWrap>
      <InnerWrap>
        <TutorListWrap>
          <TutorTitleWrap>
            <div>
              <span>{t('the most liked tutors in friengls')}</span>
              <span
                className="tutorMoreBtn"
                onClick={() => {
                  history.push('/search');
                }}
              >
                {t('see more')} >
              </span>
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
    padding-top: 80px;
    margin-bottom: 20px;
  }
  .bannerTitle > span {
    font-size: 40px;
    font-weight: bolder;
    line-height: 34px;
    margin-bottom: 26px;
    letter-spacing: 1px;
    color: #fff;
  }
  .bannerText {
    display: flex;
    flex-direction: column;
    margin: 10px 0 28px;
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
  width: 95%;
  margin: auto;
  display: grid;
  place-items: center;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
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

const ProverbWrap = styled.div`
  max-width: 1280px;
  width: 80%;
  margin: 60px auto 0;
`;

const ProverbTitle = styled.p`
  display: flex;
  flex-direction: flex-start;
  align-items: center;
  font-size: 38px;
  font-weight: bold;
`;

const ProverbItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0px 2px 8px 0px #00000030;
  margin: 30px auto;
  width: 80%;
  height: 100px;
  position: relative;

  .proverb-title {
    color: #7f83ea;
    font-weight: bold;
  }
  .proverb-mean {
  }
`;
