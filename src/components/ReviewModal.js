import React from 'react';
import styled from 'styled-components';
import Portal from '../shared/Portal';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// 모듈
import { actionCreators as reviewActions } from '../redux/modules/review';

// 아이콘
import { Text } from '../elements/index';
import { AiFillStar } from 'react-icons/ai';

const ReviewModal = ({ onClose, tutorName }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // const token = getCookie('token');
  const [rate, setRate] = React.useState('');
  const [text, setText] = React.useState('');
  const onChange = (e) => {
    setText(e.target.value);
  };

  const addReview = () => {
    dispatch(reviewActions.addReviewDB(tutorName, rate, text));
    setRate('');
    setText('');
  };
  return (
    <Portal>
      <Background
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <Content onClick={(e) => e.stopPropagation()}>
          <ReviewWrap>
            <Text>{t('write a review')}</Text>
            <RateWrap>
              {Array.from({ length: 5 }, (c, idx) => {
                return (
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
                );
              })}
            </RateWrap>
            <textarea
              className="review-text"
              placeholder={t('how was tutoring?')}
              onChange={onChange}
              value={text}
            />
            <Buttons>
              <button className="add-review" onClick={addReview}>
                {t('post')}
              </button>
              <p className="back" onClick={() => onClose()}>
                {t('back')}
              </p>
            </Buttons>
          </ReviewWrap>
        </Content>
      </Background>
    </Portal>
  );
};

export default ReviewModal;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 9998;
  background-color: rgba(0, 0, 0, 0.4);
`;

const Content = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 30px;
  width: 400px;
  height: 500px;
  border-radius: 10px;
  background: #f9f9f9;
`;

const ReviewWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 100%;

  .review-text {
    width: 100%;
    height: 100%;
    outline-color: #171b78;
    border: 1px solid #171b78;
  }
`;

const RateWrap = styled.div`
  display: flex;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .add-review {
    background-color: #171b78;
    color: #fff;
    padding: 5px;
    width: 340px;
  }

  .back {
    cursor: pointer;
    text-decoration: underline;
    color: #808080;
    font-size: 14px;
    padding: 5px;
    margin: 0 auto;
  }
`;
