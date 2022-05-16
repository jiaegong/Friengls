import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import DivBanner from '../elements/DivBanner';
import TutorCard from '../components/TutorCard';
import { BiSearchAlt2 } from 'react-icons/bi';
import axios from 'axios';
import { actionCreators as tutorActions } from '../redux/modules/tutor';

const Search = (props) => {
  const dispatch = useDispatch();
  const urlCheck = props.location.pathname;
  const formRef = React.createRef();
  const inputRef = React.createRef();
  const tutorList = useSelector((state) => state.tutor.list);
  const [tagList, setTagList] = React.useState(null);

  // console.log(tutorList);

  useEffect(() => {
    axios({
      method: 'get',
      // url: `https://jg-jg.shop/getPopularTutor`,
      url: `http://13.124.206.190/getTag`, // 태그 불러오는 url
      // url: `http://13.124.206.190/getTutorTag?keyword=${keyWord}`,
    })
      .then((doc) => {
        // console.log(doc.data);
        setTagList(doc.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const keyWord = inputRef.current.value;
    dispatch(tutorActions.getSearchTutorsDB(keyWord));

    formRef.current.reset();
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
            {tagList?.map((item, idx) => {
              return (
                <span
                  className="keyWord"
                  key={`tag_${idx}`}
                  onClick={(e) => {
                    dispatch(tutorActions.getSearchTutorsDB(item));
                  }}
                >
                  {item}
                </span>
              );
            })}
          </div>
        </div>
      </DivBanner>

      <InnerWrap>
        <ul>
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
      </InnerWrap>
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
`;

const InnerWrap = styled.div`
  width: 90%;
  max-width: 1400px;
  min-height: 910px;
  margin: auto;

  background: white;

  ul {
    width: 100%;
    padding: 20px 16px;
    display: grid;
    place-items: center;
    grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
    grid-gap: 1rem;
  }
`;
