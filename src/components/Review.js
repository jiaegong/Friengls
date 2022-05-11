import React, { useState } from 'react';
import { Flex, Image, Text, Input } from '../elements/index';
import { useDispatch } from 'react-redux';
import { actionCreators as reviewActions } from '../redux/modules/review';

import styled from 'styled-components';

const Review = (props) => {
  const dispatch = useDispatch();

  const reviewId = props.reviewId;
  const [rate, setRate] = useState(props.rate);
  const [text, setText] = useState(props.text);
  const onChange = (e) => {
    setText(e.target.value);
  };

  const editReview = () => {
    dispatch(reviewActions.editReviewDB(reviewId, rate, text));
  };

  const deleteReview = () => {
    dispatch(reviewActions.deleteReviewDB(reviewId));
  };
  return (
    <Flex
      styles={{
        padding: '24px',
        borderRadius: '20px',
        boxShadow: '0px 2px 12px 0px #00000040',
        marginBottom: '16px',
      }}
    >
      {/* 메인페이지 이미지 */}
      <ReviewImgWrap2>
        <img className="reviewImg" src="" alt=""></img>
        <img className="userProfileImg" src="" alt=""></img>
      </ReviewImgWrap2>

      {/* 상세페이지 이미지 */}
      {/* <ReviewImgWrap1 className="reviewImgWrap">
        <img className="userProfileImg" src="" alt=""></img>
      </ReviewImgWrap1> */}
      <Flex
        styles={{
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          width: '100%',
        }}
      >
        <Text>Tutee: {props.Tutee_userName}</Text>
        <Text
          styles={{
            fontSize: '28px',
            fontWeight: '700',
            marginBottom: '5px',
          }}
        >
          Tutor: {props.Tutor_userName}
        </Text>
        <Flex
          styles={{
            justifyContent: 'flex-start',
            flexDirection: 'row',
            marginBottom: '37px',
          }}
        >
          {Array.from({ length: 5 }, (c, idx) => {
            return (
              <Flex
                key={idx}
                _onClick={() => {
                  setRate(idx + 1);
                }}
                styles={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '30px',
                  margin: '5px',
                  backgroundColor: rate < idx + 1 ? '#ddd' : '#000',
                }}
              />
            );
          })}
        </Flex>
        <Input
          styles={{ fontSize: '20px', border: 'none' }}
          multiLine
          value={text}
          _onChange={onChange}
        />
      </Flex>
      {/* 메인페이지 BTN */}
      {/* <BtnPosition>나도 선생님 예약하기</BtnPosition> */}
      {/* 상세페이지 BTN */}
      <button className="reviewEditBtn btn" onClick={editReview}>
        수정하기
      </button>
      <button className="reviewDeleteBtn btn" onClick={deleteReview}>
        삭제하기
      </button>
    </Flex>
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
