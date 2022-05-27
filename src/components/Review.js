import React, { useState } from 'react';
import { Image, Text, Input } from '../elements/index';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as reviewActions } from '../redux/modules/review';
import styled from 'styled-components';
import { AiFillStar } from 'react-icons/ai';

const Review = (props) => {
  const dispatch = useDispatch();

  const userName = useSelector((state) => state.user.info.userName);
  const tuteeName = props.Tutee_userName;
  const reviewId = props.reviewId;
  const tutorImg = props.Tutor_userProfile;
  const tuteeImg = props.Tutee_userProfile;

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
      <ImageWrap>
        <img className="reviewImg" src={tutorImg} alt="튜터 프로필"></img>
        <img className="userProfileImg" src={tuteeImg} alt="튜티 프로필"></img>
      </ImageWrap>
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
              <AiFillStar
                size={20}
                key={idx}
                onClick={() => {
                  setRate(idx + 1);
                }}
                style={{
                  color: rate < idx + 1 ? '#ddd' : '#ffdf65',
                }}
              />
            ) : (
              <AiFillStar
                size={20}
                key={idx}
                style={{
                  color: rate < idx + 1 ? '#ddd' : '#ffdf65',
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
      <Text
        styles={{
          display: 'flex',
          position: 'absolute',
          top: '20px',
          right: '20px',
        }}
      >
        {props.createdAt.substr(0, 10)}
      </Text>
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
  box-shadow: 0px 2px 8px 0px #00000030;
  margin: 0 auto 20px;
  width: 80%;
  width: 100%;
  height: 190px;
  position: relative;
`;

const ImageWrap = styled.div`
  width: 160px;
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
  margin-bottom: 24px;
`;

const Buttons = styled.div`
  display: flex;
  position: absolute;
  bottom: 20px;
  left: 20px;

  .edit-review {
    cursor: pointer;
    text-decoration: underline;
    color: #808080;
  }

  .delete-review {
    cursor: pointer;
    text-decoration: underline;
    color: #959595;
  }
`;
