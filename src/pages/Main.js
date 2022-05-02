import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
// import dkdl

const Main = () => {
  const user = useSelector((state) => state.user);
  console.log('유저정보 확인', user);

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
            <div className="card">
              <div className="user_img">img</div>
              <div className="user_info">
                <p className="">user_name</p>
                <p className="">use_etc</p>
              </div>
            </div>
            <div className="card">
              <div className="user_img">img</div>
              <div className="user_info">
                <p className="">user_name</p>
                <p className="">use_etc</p>
              </div>
            </div>
            <div className="card">
              <div className="user_img">img</div>
              <div className="user_info">
                <p className="">user_name</p>
                <p className="">use_etc</p>
              </div>
            </div>
            <div className="card">
              <div className="user_img">img</div>
              <div className="user_info">
                <p className="">user_name</p>
                <p className="">use_etc</p>
              </div>
            </div>
            <div className="card">
              <div className="user_img">img</div>
              <div className="user_info">
                <p className="">user_name</p>
                <p className="">use_etc</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrap>
  );
};

export default Main;

const Wrap = styled.div`
  /* 공통 */
  width: 100%;
  min-height: 905px;

  background: #aaa;

  .innerWrap {
    width: 90%;
    max-width: 1400px;
    height: 910px;
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
    }
  }
`;
