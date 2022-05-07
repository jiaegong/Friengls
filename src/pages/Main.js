import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Flex, Text } from '../elements/index';
import Tutor from '../components/Tutor';
import Review from '../components/Review';
import { actionCreators as reviewActions } from '../redux/modules/review';

const Main = () => {
  const dispatch = useDispatch();
  const tutorList = useSelector((state) => state.tutor.list);
  // const reviewList = useSelector((state) => state.review.list);
  console.log(tutorList);
  React.useEffect(() => {
    dispatch(reviewActions.getReviewDB());
  }, []);

  return (
    <Flex styles={{ width: '960px', margin: '0 auto' }}>
      {tutorList.map((t, idx) => {
        return (
          <Flex key={t.id}>
            <Tutor {...t} />
          </Flex>
        );
      })}
      {/* {reviewList.map(r => {
        return <Flex key={r.reviewId}><Review {...r} /></Flex>;
      })} */}
    </Flex>
  );
};

export default Main;
