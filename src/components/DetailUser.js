import React, { useEffect } from 'react';
import styled from 'styled-components';
import { history } from '../redux/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileMedium } from '../image';
import { AiOutlineHeart } from 'react-icons/ai';

const DetailUser = (props) => {
  const urlCheck = props.props.match.url;
  const { detailInfo } = props;

  return (
    <>
      <UserInfoBox>
        <div className="userImgWrap">
          <img
            className="userImg"
            src="https://i.pinimg.com/564x/06/25/dd/0625dd9dd3038ffad710f47b283ba4a8.jpg"
            alt=""
          />
        </div>
        <div className="userInfo">
          <div className="userTitle">
            <p className="tutorName">수자씨</p>
            <span className="length">Korean</span>/
            <span className="length">English</span>
          </div>
          <p className="contents">
            한글로 말하고 싶은 외국인이라구요? <br /> 카운잉 스털rrr ~ 밤마늘릐
            퍼우얼rrr~~~
          </p>
          <div className="tags">
            <span>영어전공</span>
            <span>약속철저</span>
            <span>아름다운_목소리</span>
          </div>
          <div className="like">
            <AiOutlineHeart className="likeIcon" />
            539
          </div>
        </div>
      </UserInfoBox>
    </>
  );
};

// const UserInfoBox = styled.div`
//   display: flex;
// `;

// const ImageBox = styled.div`
//   margin: 20px;
//   display: flex;
//   justify-content: center;
//   text-align: center;
//   overflow: hidden;
//   width: 100px;
//   height: 100px;
//   border-radius: 50px;
// `;

// const Image = styled.img`
//   max-width: 100%;
//   max-height: 100%;
// `;

// const TextInfo = styled.p`
//   margin-top: 10px;
// `;

export default DetailUser;

const UserInfoBox = styled.div`
  width: 100%;
  min-height: 240px;
  display: flex;
  justify-content: space-around;

  .userImgWrap {
    width: 240px;
    height: 240px;
    border-radius: 50%;
    /* background-color: #eee; */
    overflow: hidden;
    .userImg {
      /* width: 100%; */
      width: 240px;
      height: 240px;
      background-color: red;
    }
  }

  .userInfo {
    width: 76%;
    height: 240px;
    position: relative;

    /* background-color: #686868; */

    .userTitle {
      margin-bottom: 20px;

      .tutorName {
        display: inline-block;
        font-size: 34px;
        font-weight: 600;
        margin-right: 90px;
      }

      .length {
        display: inline-block;
        margin: 0 5px;
        font-size: 26px;
        color: #5e5e5e;
      }
    }
    .contents {
      width: 70%;
      font-size: 30px;
      margin-bottom: 23px;
      line-height: 40px;
    }

    .tags {
      span {
        display: inline-block;
        font-size: 26px;
        padding: 12px 22px;
        margin-left: 20px;
        border: 2px solid #959595;
        border-radius: 40px;
        box-shadow: 0px 2px 6px 0px #00000040;
        background-color: #fff;
      }
    }

    .like {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 30px;

      .likeIcon {
        font-size: 32px;
        padding-top: 5px;
        margin-right: 16px;
      }
    }
  }
`;
