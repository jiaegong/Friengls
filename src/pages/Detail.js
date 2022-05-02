import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as reviewActions } from '../redux/modules/review';

const Detail = (props) => {
  const dispatch = useDispatch();
  const reviewList = useSelector((state) => state.review.list);
  const reviewId = reviewList.reviewId;

  const tutorId = props.userName;

  // comment 초기값은 review 내용으로 바꾸기
  const [comment, setComment] = React.useState('');
  const onChange = (e) => {
    setComment(e.target.value);
  };

  React.useEffect(() => {
    if (reviewList[tutorId]) {
      dispatch(reviewActions.getReviewDB(tutorId));
    }
  }, []);

  if (!reviewList[tutorId] || !tutorId) {
    return null;
  }

  const editReview = () => {
    dispatch(reviewActions.editReviewDB(reviewId, comment));
  };

  const deleteReview = () => {
    dispatch(reviewActions.deleteReviewDB(reviewId));
  };

  return (
    // 리뷰 리스트 맵 돌릴 때, 작성자 이름이 접속한 이름과 같으면 수정, 삭제 버튼 보이게
    // 현재 접속한 이름이 없는 경우에 대한 처리도 필요(옵셔널 체이닝)
    <div>
      {/* <image src="유저 프로필 이미지" /> */}
      <p>유저 이름</p>
      <p>작성 시간</p>
      <button onClick={editReview}>수정</button>
      <button onClick={deleteReview}>삭제</button>
      <input type="text" onChange={onChange} />
    </div>
  );
};

export default Detail;
