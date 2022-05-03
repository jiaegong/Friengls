import React from 'react';
import { useDispatch } from 'react-redux';
import { actionCreators as reviewActions } from '../redux/modules/review';

const ReviewModal = () => {
  const [comment, setComment] = React.useState();
  const onChange = (e) => {
    setComment(e.target.value);
  };

  const dispatch = useDispatch();

  // 넘겨줘야 할 것: 작성자 아이디(쿠키), 선생님 아이디, 내용
  const addReview = () => {
    dispatch(reviewActions.addReviewDB(comment));
    setComment('');
  };
  return (
    <div>
      <p>리뷰 남기기</p>
      <input
        type="text"
        placeholder="튜터링은 어땠나요?"
        onChange={onChange}
        value={comment}
      />
      <div>
        <button onClick={addReview}>등록하기</button>
        <button>돌아가기</button>
      </div>
    </div>
  );
};

export default ReviewModal;
