import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Grid, Flex, Text } from '../elements/index';
import Tutor from '../components/Tutor';
import Review from '../components/Review';
import { actionCreators as tutorActions } from '../redux/modules/tutor';
import { actionCreators as reviewActions } from '../redux/modules/review';
import { history } from '../redux/configureStore';

const Main = () => {
  const dispatch = useDispatch();
  const tutorList = useSelector((state) => state.tutor.list);
  const reviewList = useSelector((state) => state.review.list);

  React.useEffect(() => {
    dispatch(tutorActions.getTutorDB());
    dispatch(reviewActions.getReviewDB());
  }, []);

  return (
    <Grid styles={{ width: '960px', margin: '0 auto' }}>
      <Text>튜터 리스트</Text>
      <Grid>
        {tutorList?.map((t) => {
          return (
            <Flex
              styles={{ width: '960px', flexDirection: 'row' }}
              key={t.userId}
            >
              <Tutor {...t} />
            </Flex>
          );
        })}
      </Grid>
      <Text>리뷰 리스트</Text>
      <Grid>
        {reviewList?.map((r) => {
          return (
            <Flex key={r.reviewId}>
              <Review {...r} />
            </Flex>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default Main;
