import React from 'react';
import { useDispatch } from 'react-redux';
import { actionCreators as reviewActions } from '../redux/modules/review';

const ReviewModal = () => {
  const [rate, setRate] = React.useState();
  const [text, setText] = React.useState();
  const onChange = (e) => {
    setText(e.target.value);
  };

  const dispatch = useDispatch();

  // 넘겨줘야 할 것: 작성자 아이디(쿠키), 선생님 아이디, 평점, 내용
  const addReview = () => {
    dispatch(reviewActions.addReviewDB(rate, text));
    setText(''); // 작성하고 나서 칸 비워주기
  };
  return (
    <div>
      <p>리뷰 남기기</p>
      {Array.from({ length: 5 }, (c, idx) => {
        return (
          <div
            onClick={() => {
              setRate(idx + 1);
            }}
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '30px',
              margin: '5px',
              backgroundColor: rate < idx + 1 ? '#ddd' : '#ffeb3b',
            }}
          />
        );
      })}
      <textarea
        placeholder="튜터링은 어땠나요?"
        onChange={onChange}
        value={text}
      />
      <div>
        <button onClick={addReview}>등록하기</button>
        <button>돌아가기</button>
      </div>
    </div>
  );
};

export default ReviewModal;
