import React, { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// 모듈
import { actionCreators as tutorActions } from '../redux/modules/tutor';

// 컴포넌트
import TutorCard from '../components/TutorCard';

// 엘리먼트
import DivBanner from '../elements/DivBanner';

// 아이콘
import { BiSearchAlt2 } from 'react-icons/bi';

const Search = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const urlCheck = props.location.pathname;
  const formRef = React.createRef();
  const inputRef = React.createRef();
  const tutorList = useSelector((state) => state.tutor.list);
  const [tagList, setTagList] = React.useState(null);

  useEffect(() => {
    if (urlCheck === '/search' || tutorList.length === 0)
      dispatch(tutorActions.getTutorListDB());

    axios({
      method: 'get',
      url: `https://hjg521.link/getTag`,
    })
      .then((doc) => {
        setTagList(doc.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // 검색 Submit 부분
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
              placeholder={t('find the best tutor for you')}
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
        <TutorTitleWrap>
          <div>
            <span>{t('tutors who are available now')}</span>
          </div>
          <p>{t('tutor list')}</p>
        </TutorTitleWrap>
        <ul>
          {tutorList.map((tutor, idx) => {
            return (
              <TutorCard
                tutor={tutor}
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

  .bannerWrap {
    padding-top: 50px;
  }

  .bannerInner {
    width: 863px;
    width: 863px;
    height: 337px;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .searchWrap {
      max-width: 858px;
      max-width: 600px;

      width: 100%;
      height: 76px;
      margin-bottom: 40px;
      position: relative;

      .searchIcon {
        position: absolute;
        top: 23px;
        left: 36px;
        font-size: 50px;
        font-size: 32px;
      }

      .searchInput {
        width: 100%;
        height: 100%;
        border-radius: 60px;
        border: none;
        outline: none;
        padding: 6px 80px;
        font-size: 34px;
        font-size: 24px;
        font-size: 22px;
        line-height: 84px;
        font-weight: 500;
        box-shadow: 0px 6px 8px 0px #00000040;
      }
    }

    .keyWordWrap {
      width: 100%;
      height: 140px;

      .keyWord {
        display: inline-block;
        background-color: #fff;
        padding: 10px 14px;
        margin: 0 10px 14px 0;
        border: 2px solid #959595;
        border-radius: 40px;
        box-shadow: 0px 2px 6px 0px #00000040;

        font-size: 18px;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
      }
    }
  }
`;

const InnerWrap = styled.div`
  width: 90%;
  width: 80%;
  max-width: 1280px;
  min-height: 910px;
  margin: 120px auto 180px;

  ul {
    width: 95%;
    margin: auto;
    display: grid;
    place-items: center;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    row-gap: 4rem;
    column-gap: 0rem;
  }
`;

const TutorTitleWrap = styled.div`
  margin-bottom: 50px;

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
