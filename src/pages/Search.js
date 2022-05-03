import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const Search = () => {
  const tutorList = useSelector((state) => state.tutor.list);
  console.log(tutorList);
  return (
    <Wrap>
      <div className="innerWrap">
        <div className="searchWrap">
          <label>튜터 검색</label>
          <input type="text" placeholder="검색어를 입력하세요~"></input>
        </div>

        <ul className="tutorList">
          {tutorList.map((item, idx) => {
            return (
              <li className="tutorCard" key={`tutor${idx}`}>
                <img className="user_img" src={item.userProfile} alt="#"></img>
                <div className="user_info">
                  <p className="userName">{item.userName}</p>
                  <p className="userContents">{item.contents}</p>
                  <p className="userTag">{item.tag}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Wrap>
  );
};

export default Search;

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

    .searchWrap {
      padding: 30px 30px;

      background: #ddd;
    }

    .tutorList {
      width: 100%;
      padding: 20px 16px;
      display: grid;
      place-items: center;
      grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
      grid-gap: 1rem;

      background-color: #6b6b6b;

      .tutorCard {
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
`;
