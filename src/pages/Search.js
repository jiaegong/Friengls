import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import DivBanner from '../elements/DivBanner';
import TutorCard from '../components/TutorCard';
import { BiSearchAlt2 } from 'react-icons/bi';

const Search = (props) => {
  const formRef = React.createRef();
  const inputRef = React.createRef();
  const tutorList = useSelector((state) => state.tutor.list);
  const urlCheck = props.location.pathname;

  const onSubmit = (e) => {
    e.preventDefault();
    const keyWrod = inputRef.current.value;
  };

  return (
    <Wrap>
      <DivBanner className="bannerWrap">
        <div className="bannerInner">
          <form ref={formRef} className="searchWrap" onSubmit={onSubmit}>
            <BiSearchAlt2 className="searchIcon" />
            <input
              type="text"
              ref={inputRef}
              className="searchInput"
              placeholder="선생님 이름이나 태그 검색하기"
            ></input>
          </form>
          <div className="keyWordWrap">
            <span className="keyWord" onClick={() => {}}>
              영어전공
            </span>
            <span className="keyWord">약속철저</span>
            <span className="keyWord">아름다운_목소리</span>
            <span className="keyWord">영어전공</span>
            <span className="keyWord">약속철저</span>
            <span className="keyWord">아름다운_목소리</span>
            <span className="keyWord">아름다운_목소리</span>
            <span className="keyWord">약속철저</span>
          </div>
        </div>
      </DivBanner>

      <div className="innerWrap">
        <ul className="tutorList">
          {tutorList.map((item, idx) => {
            return (
              <TutorCard
                item={item}
                key={`searchCard${idx}`}
                urlCheck={urlCheck}
              />
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

  /* background: #aaa; */

  .bannerWrap {
    padding-top: 176px;
  }

  .bannerInner {
    width: 863px;
    height: 337px;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    /* background: #aaa; */

    .searchWrap {
      max-width: 858px;
      width: 100%;
      height: 96px;
      margin-bottom: 90px;
      position: relative;

      .searchIcon {
        position: absolute;
        top: 28px;
        left: 40px;
        font-size: 50px;
      }

      .searchInput {
        width: 100%;
        height: 100%;
        border-radius: 60px;
        border: none;
        padding: 6px 120px;
        font-size: 34px;
        line-height: 84px;
        font-weight: 500;
        box-shadow: 0px 6px 8px 0px #00000040;
      }
    }

    .keyWordWrap {
      width: 100%;
      height: 140px;
      /* background-color: gray; */

      .keyWord {
        display: inline-block;
        background-color: #fff;
        padding: 12px 22px;
        margin: 0 18px 20px 0;
        border: 2px solid #959595;
        border-radius: 40px;
        box-shadow: 0px 2px 6px 0px #00000040;

        font-size: 26px;
        font-weight: 400;
        cursor: pointer;
      }
    }
  }

  .innerWrap {
    width: 90%;
    max-width: 1400px;
    min-height: 910px;
    margin: auto;

    background: white;

    .tutorList {
      width: 100%;
      padding: 20px 16px;
      display: grid;
      place-items: center;
      grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
      grid-gap: 1rem;

      /* background-color: #6b6b6b; */

      .tutorCard {
        width: 310px;
        height: 218px;
        border-radius: 10px;
        overflow: hidden;

        background: #eee;

        .user_img {
          width: 100%;
          height: 70%;
        }
      }
    }
  }
`;
