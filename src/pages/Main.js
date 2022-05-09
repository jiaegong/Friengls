import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { actionCreators as reviewActions } from '../redux/modules/review';
import { actionCreators as bookingAction } from '../redux/modules/booking';
import { BannerImg } from '../image/index';

import { history } from '../redux/configureStore';

const Main = () => {
  const dispatch = useDispatch();
  const tutorList = useSelector((state) => state.tutor.list);
  const reviewList = useSelector((state) => state.review.list);

  console.log(tutorList);
  // const reviewList = useSelector((state) => state.review.list);
  // console.log('유저정보 확인', tutorList);

  // React.useEffect(() => {
  //   dispatch(reviewActions.getReviewDB());
  // }, []);

  return (
    <Wrap>
      <div className="bannerWrap">
        <div className="banner">
          <p className="bannerTitle">
            <span>프랭글스에서</span> <span>프랭글과 대화하고</span>
            <span> 영어실력 쌓기!</span>
          </p>
          <p className="bannerText">
            <span>온라인 언어교환으로 놀면서 스펙쌓자!</span>
            <span> 님도보고 뽕도따는 두마리 토끼 전략~</span>
            <span> 수다떨면서 영어실력 올리는 사람 나야나!</span>
          </p>
          <button className="bannerBtn">예약하러 가기 ▶︎</button>
        </div>
      </div>
      <div className="innerWrap">
        <div className="contentWrap">
          <div className="contentsTitleWrap">
            <div className="subTitleWrap">
              <span className="subTitle">
                지난주 가장 예약이 많았던 튜터에요
              </span>
              <span className="tutorMoreBtn">더보기 ></span>
            </div>
            <p className="title">인기 선생님 리스트</p>
          </div>
          <div className="cardList">
            {tutorList.map((item, idx) => {
              return (
                <div
                  className="card"
                  key={`tutor${idx}`}
                  onClick={() => {
                    history.push(`/detail/${item.userName}`);
                  }}
                >
                  <img
                    className="user_img"
                    // src={item.userProfile}
                    src={'https://via.placeholder.com/300x200'}
                    alt="#"
                  ></img>
                  <div className="user_info">
                    <p className="userName">{item.userName}</p>
                    <p className="userContents">{item.contents}</p>
                    {/* <p className="userTag">{item.tag}</p> */}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 리뷰 부분 */}
          <div className="reviewWrap">
            <div className="reviewInner">
              <div className="contentsTitleWrap">
                <div className="subTitleWrap">
                  <span className="subReviewTitle">
                    다른 튜티들의 리뷰를 들어보세요
                  </span>
                  <span className="reviewMoreBtn">더보기 ></span>
                </div>
                <p className="title">수강 추천 리뷰</p>
              </div>
              {/* 리뷰 맵 돌리는 곳 */}
              {reviewList?.map((r) => {
                return <div key={r.reviewId}>{/* <Review {...r} /> */}</div>;
              })}
            </div>
          </div>
        </div>
      </div>
    </Wrap>
  );
};

const Wrap = styled.div`
  /* 공통 */
  width: 100%;
  min-height: 905px;

  /* 배너 */
  .bannerWrap {
    width: 100%;
    height: 700px;
    padding-top: 120px;
    background-image: url('${BannerImg}');
    background-size: cover;
    background-position: center;
    margin-bottom: 30px;

    .banner {
      max-width: 1432px;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      padding: 0 16px;

      .bannerTitle {
        display: flex;
        flex-direction: column;
      }
      .bannerTitle > span {
        font-size: 64px;
        font-weight: 800;
        letter-spacing: 1px;
        color: #fff;
      }
      .bannerText {
        display: flex;
        flex-direction: column;
        margin: 10px 0 36px;
      }
      .bannerText > span {
        font-size: 16px;
        font-weight: 800;
        margin-top: 5px;
        letter-spacing: 1px;
        color: #fff;
      }

      .bannerBtn {
        /* width: 332px; */
        /* height: 80px; */
        width: 290px;
        height: 70px;
        font-size: 18px;
        font-weight: 800;
        background: #fff;

        border: 2px solid #000;
        border-radius: 40px;
        box-shadow: 2px 6px 16px 0px #0000004b;
      }
    }
  }

  /* 컨텐츠 */
  .innerWrap {
    width: 100%;
    max-width: 1432px;
    min-height: 910px;
    padding: 0 16px;

    margin: auto;

    background: white;

    /* 인기 선생님 리스트 Wrap */
    .contentWrap {
      width: 100%;
      margin-top: 20px;

      .contentsTitleWrap {
        margin-bottom: 40px;

        .subTitleWrap {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .subTitle {
            /* font-size: 26px;
            font-weight: 400; */
            font-size: 18px;
            font-weight: 400;
            margin-bottom: 6px;
          }
          .tutorMoreBtn {
            /* position: absolute; */
            cursor: pointer;
          }
        }
        .title {
          /* font-size: 60px; */
          font-size: 48px;
          font-weight: bold;
        }
      }

      .cardList {
        width: 100%;
        padding: 20px 0;
        display: grid;
        place-items: center;
        grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
        /* grid-gap: 2rem; */
        row-gap: 4rem;
        column-gap: 2rem;

        /* background: #575757; */

        .card {
          /* width: 310px; */
          /* height: 218px; */
          width: 300px;
          height: 200px;
          overflow: hidden;
          position: relative;

          /* border-radius: 10px; */
          background: #c4c4c4;

          .user_img {
            width: 100%;
            /* height: 100%; */

            background: #aaa;
          }

          .user_info {
            height: 60px;
            padding: 7px 20px;

            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: #eee;

            .userName {
              font-size: 20px;
              font-weight: bold;
              letter-spacing: 1px;
              margin-bottom: 2px;
            }

            .userContents {
              font-size: 14px;
              line-height: 20px;
              letter-spacing: 1px;
            }
          }
        }
      }

      .reviewWrap {
        width: 100%;
        min-height: 600px;
        margin-top: 131px;
        /* margin-top: 60px; */
        background: #ddd;

        .reviewInner {
          width: 100%;
          margin: auto;
          background-color: #fff;
          .contentsTitleWrap {
            .subTitleWrap {
            }
          }
        }
      }
    }
  }
`;

export default Main;
