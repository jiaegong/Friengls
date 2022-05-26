import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import DivBanner from '../elements/DivBanner';
import TutorCard from '../components/TutorCard';
import { BiSearchAlt2 } from 'react-icons/bi';
import axios from 'axios';
import { actionCreators as tutorActions } from '../redux/modules/tutor';
import { useTranslation } from 'react-i18next';

const Search = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const urlCheck = props.location.pathname;
  const formRef = React.createRef();
  const inputRef = React.createRef();
  const tutorList = useSelector((state) => state.tutor.list);
  const [tagList, setTagList] = React.useState(null);

  // console.log(tutorList);

  useEffect(() => {
    dispatch(tutorActions.getTutorListDB());

    axios({
      method: 'get',
      url: `https://hjg521.link/getTag`,
      // url: `http://13.124.206.190/getTag`, // 태그 불러오는 url
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

  /* background: #aaa; */

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

    /* background: #aaa; */

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
      /* background-color: gray; */

      .keyWord {
        display: inline-block;
        background-color: #fff;
        /* padding: 12px 18px; */
        padding: 10px 14px;
        /* margin: 0 16px 18px 0; */
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
    /* width: 100%; */
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
