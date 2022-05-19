import React, { useState } from 'react';
import { Image, Text, Input } from '../elements/index';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as reviewActions } from '../redux/modules/review';

import styled from 'styled-components';

const Review = (props) => {
  const dispatch = useDispatch();

  const userName = useSelector((state) => state.user.info.userName);
  const tuteeName = props.Tutee_userName;
  const reviewId = props.reviewId;

  const [edit, setEdit] = useState(false);
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
    <Wrap>
      {/* 메인페이지 이미지 */}
      <ImageWrap>
        <img className="reviewImg" src="" alt=""></img>
        <img className="userProfileImg" src="" alt=""></img>
      </ImageWrap>
      {/* 상세페이지 이미지 */}
      {/* <ReviewImgWrap1 className="reviewImgWrap">
        <img className="userProfileImg" src="" alt=""></img>
      </ReviewImgWrap1> */}
      <ReviewWrap>
        <Text>Tutee: {props.Tutee_userName}</Text>
        <Text
          styles={{
            fontSize: '28px',
            fontWeight: '700',
          }}
        >
          Tutor: {props.Tutor_userName}
        </Text>
        <RateWrap>
          {Array.from({ length: 5 }, (c, idx) => {
            return edit ? (
              <Rate
                key={idx}
                onClick={() => {
                  setRate(idx + 1);
                }}
                style={{
                  backgroundColor: rate < idx + 1 ? '#ddd' : '#000',
                }}
              />
            ) : (
              <Rate
                key={idx}
                style={{
                  backgroundColor: rate < idx + 1 ? '#ddd' : '#000',
                }}
              />
            );
          })}
        </RateWrap>

        {edit ? (
          <Input multiLine value={text} _onChange={onChange} />
        ) : (
          <Text>{props.text}</Text>
        )}
      </ReviewWrap>
      {/* 메인페이지 BTN */}
      {/* <BtnPosition>나도 선생님 예약하기</BtnPosition> */}
      {/* 상세페이지 BTN */}
      {userName === tuteeName && (
        <Buttons>
          {edit ? (
            <span
              className="edit-review"
              onClick={() => {
                editReview();
                setEdit(!edit);
              }}
            >
              저장
            </span>
          ) : (
            <span
              className="edit-review"
              onClick={() => {
                setEdit(!edit);
              }}
            >
              수정
            </span>
          )}
          &nbsp;/&nbsp;
          <span className="delete-review" onClick={deleteReview}>
            삭제
          </span>
        </Buttons>
      )}
    </Wrap>
  );
};

export default Review;

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0px 2px 12px 0px #00000040;
  margin-bottom: 16px;
  width: 100%;
  height: 230px;
  position: relative;
`;

// const ReviewImgWrap1 = styled.div`
//   width: 140px;
//   height: 140px;
//   border-radius: 50%;
//   margin-right: 32px;
//   overflow: hidden;

//   background-color: #aaa;
// `;

const ImageWrap = styled.div`
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

const ReviewWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  gap: 5px;
`;

const RateWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
`;

const Rate = styled.div`
  display: flex;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  margin: 5px;
`;

const Buttons = styled.div`
  display: flex;
  position: absolute;
  top: 20px;
  right: 20px;

  .edit-review {
    cursor: pointer;
    text-decoration: underline;
    color: #808080;
  }

  .delete-review {
    cursor: pointer;
    text-decoration: underline;
    color: #808080;
  }
`;
