import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { actionCreators as reviewActions } from '../redux/modules/review';
import { history } from '../redux/configureStore';

const Main = () => {
  const dispatch = useDispatch();
  const tutorList = useSelector((state) => state.tutor.list);
  // const reviewList = useSelector((state) => state.review.list);
  // console.log('유저정보 확인', tutorList);

  // React.useEffect(() => {
  //   dispatch(reviewActions.getReviewDB());
  // }, []);

  return (
    <Wrap>
      <div className="innerWrap">
        <div className="bannerWrap">
          <div className="banner">banner</div>
        </div>

        <div className="contentWrap">
          <div className="searchWrap">
            <label>유저 리스트</label>
            <input type="text" placeholder="검색어를 입력하세요"></input>
            <span className="searchIcon">검색 아이콘</span>
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
                    src={item.userProfile}
                    alt="#"
                  ></img>
                  <div className="user_info">
                    <p className="userName">{item.userName}</p>
                    <p className="userContents">{item.contents}</p>
                    <p className="userTag">{item.tag}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="reviewWrap">
            <div className="reviewInner">{/* 리뷰 맵 돌리기 */}</div>
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

  background: #aaa;

  .innerWrap {
    width: 90%;
    max-width: 1400px;
    min-height: 910px;
    margin: auto;

    background: white;

    .bannerWrap {
      width: 100%;
      height: 250px;
      margin: auto;

      background: #646464;

      .banner {
        height: 100%;
        background: #ddd;
      }
    }

    .contentWrap {
      width: 100%;
      margin-top: 20px;

      background: #eee;

      .searchWrap {
        width: 100%;
        padding-left: 10px;

        background: #8e8e8e;
      }

      .cardList {
        width: 100%;
        padding: 20px 16px;
        display: grid;
        place-items: center;
        grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
        grid-gap: 1rem;

        background: #575757;

        .card {
          width: 310px;
          height: 218px;
          border-radius: 10px;
          overflow: hidden;

          background: #eee;

          .user_img {
            width: 100%;
            height: 70%;

            background: #aaa;
          }
        }
      }

      .reviewWrap {
        width: 100%;
        min-height: 200px;
        margin-top: 60px;
        background: #ddd;

        .reviewInner {
          width: 95%;
          padding: 20px 30px;
          margin: auto;

          background-color: #fff;
        }
      }
    }
  }
`;

export default Main;
