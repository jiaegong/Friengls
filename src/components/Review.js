import React from 'react';
import { Flex, Image, Text, Input } from '../elements/index';
import { AiFillStar } from 'react-icons/ai';

import styled from 'styled-components';

const Review = (props) => {
  return (
    <>
      {/* 메인페이지 이미지 */}
      <ReviewImgWrap2>
        <img className="reviewImg" src="" alt=""></img>
        <img className="userProfileImg" src="" alt=""></img>
      </ReviewImgWrap2>

      {/* 상세페이지 이미지 */}
      {/* <ReviewImgWrap1 className="reviewImgWrap">
        <img className="userProfileImg" src="" alt=""></img>
      </ReviewImgWrap1> */}

      <ReviewTextWrap>
        <p className="tutorReview">티쳐: 안젤라</p>
        {/* 별점 */}
        <Rating>
          {Array.from({ length: 5 }, (c, idx) => {
            return (
              <AiFillStar
                key={idx}
                className="star"
                styles={{
                  backgroundColor: props.rate < idx + 1 ? '#ddd' : '#000',
                }}
              />
            );
          })}
        </Rating>

        {/* 메인 텍스트 */}
        <p className="tuteeReview">
          너무 예뻐요 아름답고.. 말도 잘하고 머리부터 발끝까지 완벽해,,
          Perfect~~
        </p>
        {/* 상세페이지 */}
        {/* <textarea
          className="tuteeReview"
          value={
            '너무 예뻐요 아름답고.. 말도 잘하고 머리부터 발끝까지 완벽해,, Perfect~~'
          }
        >
          너무 예뻐요 아름답고.. 말도 잘하고 머리부터 발끝까지 완벽해,,
          Perfect~~
        </textarea> */}

        {/* 메인페이지 BTN */}
        <BtnPosition>나도 선생님 예약하기</BtnPosition>
        {/* 상세페이지 BTN */}
        {/* <BtnPosition>
          <button className="reviewEditBtn btn">수정하기</button>
          <button className="reviewDeleteBtn btn">삭제하기</button>
        </BtnPosition> */}
      </ReviewTextWrap>
    </>
  );
};

export default Review;

const ReviewImgWrap1 = styled.div`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  margin-right: 32px;
  overflow: hidden;

  background-color: #aaa;
`;

const ReviewImgWrap2 = styled.div`
  width: 129px;
  height: 140px;
  border-radius: 50%;
  margin-right: 32px;
  position: relative;

  .reviewImg {
    max-width: 101px;
    width: 100%;
    height: 101px;
    border-radius: 50%;
    position: absolute;
    overflow: hidden;

    background: #aaa;
  }
  .userProfileImg {
    max-width: 71px;
    width: 100%;
    height: 71px;
    position: absolute;
    bottom: 0;
    right: 0;

    border-radius: 50%;
    overflow: hidden;
    background: #eee;
  }
`;

const ReviewTextWrap = styled.div`
  max-width: 1172px;
  width: 100%;
  position: relative;

  .tutorReview {
    font-size: 28px;
    font-weight: 700;
    letter-spacing: 2px;
    margin-bottom: 5px;
  }

  .tuteeReview {
    font-size: 20px;
    resize: horizontal;
    width: 100%;
  }
`;

const Rating = styled.div`
  margin-bottom: 37px;

  .star {
    color: #aaa;
    font-size: 24px;
    margin-right: 5px;
  }
`;

const BtnPosition = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  border: none;
  background: #fff;
  color: #7c7c7c;
  cursor: pointer;
  text-decoration-line: underline;

  .btn {
    border: none;
    background: #fff;
    color: #7c7c7c;
    cursor: pointer;
    text-decoration-line: underline;
    margin-left: 5px;
  }
`;
